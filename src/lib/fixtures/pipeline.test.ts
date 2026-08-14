import { describe, it, expect, beforeEach } from 'vitest'
import {
  getFixtureRows,
  submitFixtureReport,
  resetFixtureReports,
  subscribeToFixtureTable,
} from './index'
import { SEED_BUILDINGS, SEED_ZONES, SEED_TYPICAL_CURVES } from './seedData.generated'
import { blendOccupancy } from '@/lib/blending'
import { getCurrentTypical } from '@/lib/occupancyHelpers'
import { detectZone } from '@/lib/zoneDetection'
import type { GooglePopularityCache, OccupancyReport, ZoneOccupancy } from '@/types'

/**
 * End-to-end check of the read path the app actually uses:
 *
 *   fixtures → zone occupancy + curves → blendOccupancy → what the UI renders
 *
 * The point is not to test blending again (blending.test.ts does that with
 * synthetic inputs) but to run it over the *real* 18 buildings and assert the
 * numbers a user would see are sane. Every claim about this app working has so
 * far been made without anything like this running.
 */

const CAMPUS_HOURS = new Date('2026-03-19T12:00:00Z') // a Thursday, midday

function blendFor(buildingId: string, overrides: {
  zoneOccupancies?: ZoneOccupancy[]
  reports?: OccupancyReport[]
} = {}) {
  const zoneOccupancies =
    overrides.zoneOccupancies ??
    getFixtureRows<ZoneOccupancy>('zone_occupancy').filter((z) => z.building_id === buildingId)

  return blendOccupancy({
    zoneOccupancies,
    zones: SEED_ZONES.filter((z) => z.building_id === buildingId),
    googleCache:
      getFixtureRows<GooglePopularityCache>('google_popularity_cache').find(
        (c) => c.building_id === buildingId,
      ) ?? null,
    prediction: null,
    googleTypical: getCurrentTypical(SEED_TYPICAL_CURVES, buildingId, CAMPUS_HOURS),
    reports: overrides.reports ?? [],
    now: CAMPUS_HOURS,
  })
}

describe('fixture data pipeline', () => {
  beforeEach(() => resetFixtureReports())

  it('serves one occupancy row per zone', () => {
    expect(getFixtureRows<ZoneOccupancy>('zone_occupancy')).toHaveLength(SEED_ZONES.length)
  })

  describe('cold start — no users, no reports', () => {
    it('never claims live data for any building', () => {
      // The whole point of the cold-start design. If this regresses, the map
      // tells students that every building on campus is empty.
      for (const building of SEED_BUILDINGS) {
        expect(blendFor(building.id).source, `${building.slug} claims live data`).not.toBe('live')
      }
    })

    it('produces an in-range percentage or an explicit null for every building', () => {
      for (const building of SEED_BUILDINGS) {
        const { pct } = blendFor(building.id)
        if (pct === null) continue
        expect(pct, `${building.slug} is out of range`).toBeGreaterThanOrEqual(0)
        expect(pct, `${building.slug} is out of range`).toBeLessThanOrEqual(100)
      }
    })

    it('gives most buildings an estimate at midday on a weekday', () => {
      // Thin data is honest; a map that is blank everywhere is not useful.
      const withEstimate = SEED_BUILDINGS.filter((b) => blendFor(b.id).pct !== null)
      expect(withEstimate.length).toBeGreaterThanOrEqual(SEED_BUILDINGS.length - 1)
    })
  })

  describe('a crowd report arriving', () => {
    it('overrides the estimate and marks the source as a crowd report', () => {
      const building = SEED_BUILDINGS[0]
      const report = submitFixtureReport({
        building_id: building.id,
        occupancy_level: 5,
        noise_level: 3,
      })

      const blended = blendFor(building.id, { reports: [{ ...report, created_at: CAMPUS_HOURS.toISOString() }] })

      expect(blended.source).toBe('crowd-report')
      expect(blended.pct).toBeGreaterThan(0)
    })

    it('reaches subscribers so the map can update without a refresh', () => {
      const received: OccupancyReport[] = []
      const stop = subscribeToFixtureTable<OccupancyReport>('occupancy_reports', (r) => {
        received.push(r)
      })

      submitFixtureReport({
        building_id: SEED_BUILDINGS[0].id,
        occupancy_level: 4,
        noise_level: null,
      })

      stop()
      expect(received).toHaveLength(1)
      expect(received[0].building_id).toBe(SEED_BUILDINGS[0].id)
    })
  })

  describe('zone detection against real polygons', () => {
    it('places a point inside a building in one of that building’s zones', () => {
      const building = SEED_BUILDINGS.find((b) => b.centroid_lat && b.centroid_lng)!
      const zoneId = detectZone(
        { latitude: building.centroid_lat!, longitude: building.centroid_lng! },
        SEED_ZONES,
      )

      expect(zoneId, `no zone matched the centroid of ${building.slug}`).not.toBeNull()
      const matched = SEED_ZONES.find((z) => z.id === zoneId)!
      expect(matched.building_id).toBe(building.id)
    })

    it('returns null well outside campus', () => {
      // Melbourne CBD, ~2km away.
      expect(detectZone({ latitude: -37.8136, longitude: 144.9631 }, SEED_ZONES)).toBeNull()
    })
  })
})
