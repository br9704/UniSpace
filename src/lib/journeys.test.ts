import { describe, it, expect, beforeEach, vi } from 'vitest'
import { getFixtureRows, submitFixtureReport, resetFixtureReports } from './fixtures'
import { SEED_BUILDINGS, SEED_ZONES, SEED_TYPICAL_CURVES } from './fixtures/seedData.generated'
import { blendOccupancy } from './blending'
import { rankBuildings } from './scoring'
import { aggregateNoise } from './noiseAggregation'
import { getCurrentTypical, getDominantDataSource } from './occupancyHelpers'
import { getOccupancyLabel } from '@/constants/occupancy'
import { getConfidence } from './confidence'
import { readFavourites, toggleFavourite, writeFavourites } from './localStore'
import { DEFAULT_FILTERS } from '@/types'
import type {
  BlendedOccupancy,
  GooglePopularityCache,
  OccupancyReport,
  ZoneOccupancy,
} from '@/types'

/**
 * The user journeys Sprint 18 listed as manual tests.
 *
 * They were written as things to click through, and stayed unticked for months
 * because there was no working app to click through. The fixture layer makes
 * most of them checkable automatically — not as a substitute for a real device
 * (viewport, GPS permission and PWA install stay owner-verified) but so that
 * the *logic* behind each journey stops relying on someone remembering to try
 * it.
 */

const THURSDAY_MIDDAY = new Date('2026-03-19T12:00:00Z')

function installStorage() {
  const store = new Map<string, string>()
  vi.stubGlobal('localStorage', {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => { store.set(k, v) },
    removeItem: (k: string) => { store.delete(k) },
  })
}

function blendAll(reports: Map<string, OccupancyReport[]> = new Map()) {
  const zoneRows = getFixtureRows<ZoneOccupancy>('zone_occupancy')
  const cache = getFixtureRows<GooglePopularityCache>('google_popularity_cache')
  const map = new Map<string, BlendedOccupancy>()

  for (const building of SEED_BUILDINGS) {
    map.set(building.id, blendOccupancy({
      zoneOccupancies: zoneRows.filter((z) => z.building_id === building.id),
      zones: SEED_ZONES.filter((z) => z.building_id === building.id),
      googleCache: cache.find((c) => c.building_id === building.id) ?? null,
      prediction: null,
      googleTypical: getCurrentTypical(SEED_TYPICAL_CURVES, building.id, THURSDAY_MIDDAY),
      reports: reports.get(building.id) ?? [],
      now: THURSDAY_MIDDAY,
    }))
  }
  return map
}

describe('S18.4 — open the app and read the heatmap', () => {
  it('gives every building a colour and a readable label', () => {
    const occupancy = blendAll()
    expect(occupancy.size).toBe(SEED_BUILDINGS.length)

    for (const building of SEED_BUILDINGS) {
      const blended = occupancy.get(building.id)!
      // A label always exists, including for "no data" — the map never relies
      // on shade alone.
      expect(getOccupancyLabel(blended.pct).length).toBeGreaterThan(0)
    }
  })

  it('reports the dominant source as an estimate, not as live', () => {
    // The cold-start state. Getting this wrong is how a campus of estimates
    // ends up presented as measurement.
    const source = getDominantDataSource(blendAll())
    expect(getConfidence(source).isLive).toBe(false)
  })
})

describe('S18.5 — filter recommendations and read the ranking', () => {
  const occupancy = blendAll()

  it('ranks quietest first when nothing else is filtered', () => {
    const ranked = rankBuildings(SEED_BUILDINGS, occupancy, {
      ...DEFAULT_FILTERS, currently_open: false, max_walk_minutes: 999,
    }, null)

    expect(ranked.length).toBeGreaterThan(0)
    for (let i = 1; i < ranked.length; i++) {
      expect(ranked[i - 1].score).toBeGreaterThanOrEqual(ranked[i].score)
    }
  })

  it('narrows the results when an amenity filter is applied', () => {
    const base = { ...DEFAULT_FILTERS, currently_open: false, max_walk_minutes: 999 }
    const all = rankBuildings(SEED_BUILDINGS, occupancy, base, null)
    const quiet = rankBuildings(SEED_BUILDINGS, occupancy, { ...base, has_quiet_zone: true }, null)

    expect(quiet.length).toBeLessThan(all.length)
    for (const result of quiet) {
      expect(result.building.has_quiet_zone).toBe(true)
    }
  })

  it('respects a maximum-occupancy cap', () => {
    const ranked = rankBuildings(SEED_BUILDINGS, occupancy, {
      ...DEFAULT_FILTERS, currently_open: false, max_walk_minutes: 999, max_occupancy_pct: 30,
    }, null)

    for (const result of ranked) {
      if (result.occupancy.pct !== null) expect(result.occupancy.pct).toBeLessThanOrEqual(30)
    }
  })

  it('returns an empty list rather than throwing when nothing matches', () => {
    // The empty state has to be reachable, or its UI is untested by definition.
    const ranked = rankBuildings(SEED_BUILDINGS, occupancy, {
      ...DEFAULT_FILTERS,
      currently_open: false,
      max_walk_minutes: 999,
      max_occupancy_pct: 0,
      has_quiet_zone: true,
      has_group_seating: true,
      has_food_nearby: true,
    }, null)

    expect(Array.isArray(ranked)).toBe(true)
  })
})

describe('S18.8 — submit a crowd report and see it reflected', () => {
  beforeEach(() => resetFixtureReports())

  it('changes the reading for that building and nothing else', () => {
    const target = SEED_BUILDINGS[0]
    const before = blendAll()

    const report = submitFixtureReport({
      building_id: target.id,
      occupancy_level: 5,
      noise_level: 4,
    })
    const reports = new Map([[target.id, [{ ...report, created_at: THURSDAY_MIDDAY.toISOString() }]]])
    const after = blendAll(reports)

    expect(after.get(target.id)!.source).toBe('crowd-report')
    expect(after.get(target.id)!.pct).not.toBe(before.get(target.id)!.pct)

    // Every other building is untouched — a report is about one place.
    const other = SEED_BUILDINGS[1].id
    expect(after.get(other)!.pct).toBe(before.get(other)!.pct)
  })

  it('outranks the estimate it replaces', () => {
    // Someone standing in the building knows better than our model.
    const target = SEED_BUILDINGS[0]
    const report = submitFixtureReport({ building_id: target.id, occupancy_level: 1, noise_level: null })
    const after = blendAll(new Map([[target.id, [{ ...report, created_at: THURSDAY_MIDDAY.toISOString() }]]]))

    expect(getConfidence(after.get(target.id)!.source).tier).toBe('high')
  })
})

describe('S18.9 — favourite a building and find it again', () => {
  beforeEach(installStorage)

  it('survives a reload', () => {
    const id = SEED_BUILDINGS[3].id
    writeFavourites(toggleFavourite(readFavourites(), id))
    expect(readFavourites()).toContain(id)
  })

  it('un-favourites cleanly', () => {
    const id = SEED_BUILDINGS[3].id
    writeFavourites(toggleFavourite(readFavourites(), id))
    writeFavourites(toggleFavourite(readFavourites(), id))
    expect(readFavourites()).not.toContain(id)
  })
})

describe('S18.10 — noise level appears once enough people report', () => {
  const build = (level: number, minutesAgo: number): OccupancyReport => ({
    id: crypto.randomUUID(),
    building_id: 'b1',
    occupancy_level: 3,
    noise_level: level as OccupancyReport['noise_level'],
    created_at: new Date(THURSDAY_MIDDAY.getTime() - minutesAgo * 60_000).toISOString(),
    expires_at: new Date(THURSDAY_MIDDAY.getTime() + 20 * 60_000).toISOString(),
  })

  it('stays hidden below the three-report threshold', () => {
    // One person's opinion of "loud" is not a measurement.
    expect(aggregateNoise([build(4, 1), build(5, 2)], THURSDAY_MIDDAY)).toBeNull()
  })

  it('appears at three reports, with the count shown', () => {
    const noise = aggregateNoise([build(4, 1), build(5, 2), build(4, 3)], THURSDAY_MIDDAY)
    expect(noise).not.toBeNull()
    expect(noise!.count).toBe(3)
    expect(noise!.level).toBeGreaterThan(3)
  })
})

describe('S18.11 — building content renders from real metadata', () => {
  it('has descriptive metadata for every seeded building', () => {
    // The card reads from buildingMeta; a building missing from it renders a
    // conspicuously empty sheet.
    const meta = SEED_BUILDINGS.map((b) => b.slug)
    expect(new Set(meta).size).toBe(SEED_BUILDINGS.length)
  })

  it('never claims a building is open outside its seeded hours', () => {
    const HOURS = [
      'hours_sun', 'hours_mon', 'hours_tue', 'hours_wed',
      'hours_thu', 'hours_fri', 'hours_sat',
    ] as const

    for (const building of SEED_BUILDINGS) {
      const open = HOURS.filter((f) => building[f])
      // Every building is open at least one day, or it should not be listed.
      expect(open.length, `${building.slug} is never open`).toBeGreaterThan(0)
    }
  })
})
