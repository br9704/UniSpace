import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
// @ts-expect-error — plain .mjs build script, intentionally untyped
import { buildSeedData, renderModule } from '../../../scripts/generateFixtures.mjs'
import {
  SEED_BUILDINGS,
  SEED_CAMPUSES,
  SEED_TYPICAL_CURVES,
  SEED_ZONES,
} from './seedData.generated'
import { BUILDING_META } from '@/constants/buildingMeta'

const GENERATED = resolve(__dirname, 'seedData.generated.ts')

/**
 * The fixture layer is only trustworthy while it matches the SQL that seeds the
 * real database. A fixture that has drifted is worse than no fixture: it makes
 * broken things look fine locally, which is how the database came to describe
 * 20 buildings while the UI and README both said 18.
 */
describe('generated seed fixtures', () => {
  it('is up to date with the seed SQL', () => {
    const expected = renderModule(buildSeedData())
    const actual = readFileSync(GENERATED, 'utf8')
    expect(
      actual,
      'src/lib/fixtures/seedData.generated.ts is stale. Run `pnpm generate:fixtures`.',
    ).toBe(expected)
  })

  it('agrees with buildingMeta on which buildings exist', () => {
    // These two lists disagreed for five sprints. buildingMeta drives the UI,
    // the seeds drive the database, and nothing compared them.
    const seedSlugs = SEED_BUILDINGS.map((b) => b.slug).sort()
    const metaSlugs = Object.keys(BUILDING_META).sort()
    expect(seedSlugs).toEqual(metaSlugs)
  })

  it('has exactly one campus, and every building belongs to it', () => {
    expect(SEED_CAMPUSES).toHaveLength(1)
    const campusId = SEED_CAMPUSES[0].id
    for (const building of SEED_BUILDINGS) {
      expect(building.campus_id, `${building.slug} has the wrong campus`).toBe(campusId)
    }
  })

  it('gives every building at least one zone', () => {
    // A building with no zones renders as permanently empty rather than as
    // unknown, which reads to a user as "this place is free".
    for (const building of SEED_BUILDINGS) {
      const zones = SEED_ZONES.filter((z) => z.building_id === building.id)
      expect(zones.length, `${building.slug} has no zones`).toBeGreaterThan(0)
    }
  })

  it('never has occupancy curves for a day a building is closed', () => {
    // Hours are the manually maintained source of truth (PRD Q8). Showing an
    // occupancy estimate for a building that is shut is worse than showing
    // nothing — a user could walk to a locked door. The reverse (open, but no
    // curve yet) is only thin data, which the confidence tiers already present
    // honestly, so it is deliberately not asserted here.
    const HOURS_BY_DAY = [
      'hours_sun', 'hours_mon', 'hours_tue', 'hours_wed',
      'hours_thu', 'hours_fri', 'hours_sat',
    ] as const

    for (const building of SEED_BUILDINGS) {
      const curveDays = new Set(
        SEED_TYPICAL_CURVES.filter((c) => c.building_id === building.id).map((c) => c.day_of_week),
      )
      for (const day of curveDays) {
        expect(
          building[HOURS_BY_DAY[day]],
          `${building.slug} has curve data for day ${day}, but its hours say it is closed`,
        ).toBeTruthy()
      }
    }
  })

  it('keeps every polygon a closed GeoJSON ring', () => {
    // Turf's point-in-polygon silently misbehaves on unclosed rings, and zone
    // detection is the privacy firewall — it must not be quietly wrong.
    for (const zone of SEED_ZONES) {
      const ring = zone.polygon?.coordinates?.[0]
      expect(ring, `${zone.zone_slug} has no polygon ring`).toBeDefined()
      expect(ring!.length, `${zone.zone_slug} ring is too short`).toBeGreaterThanOrEqual(4)
      expect(ring![0], `${zone.zone_slug} ring is not closed`).toEqual(ring![ring!.length - 1])
    }
  })
})
