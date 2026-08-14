#!/usr/bin/env node
/**
 * Generates `src/lib/fixtures/seedData.generated.ts` from the committed seed SQL.
 *
 * Run with `pnpm generate:fixtures`. `src/lib/fixtures/seedData.test.ts` fails if
 * the committed output no longer matches the seeds, so the two cannot drift
 * apart unnoticed.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseInserts, applyUpdates, applyGlobalUpdates } from './parseSeedSql.mjs'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = resolve(ROOT, 'src/lib/fixtures/seedData.generated.ts')

const SEED_FILES = [
  'supabase/seed/001_uom_parkville.sql',
  'supabase/seed/002_google_popular_times.sql',
  'supabase/seed/003_additional_buildings.sql',
  'supabase/seed/004_additional_popular_times.sql',
  'supabase/seed/005_verified_accessibility.sql',
]

/**
 * Migrations that change seeded values rather than schema.
 *
 * Applied in order after the seeds, mirroring how a real database ends up:
 * migrations run, then seeds, then later corrective seeds. Fixtures must show
 * the same final state or local development lies about what is deployed.
 */
const CORRECTIVE_MIGRATIONS = [
  'supabase/migrations/018_accessibility_unknown.sql',
]

/** Buildings dropped in R1.7 — belt and braces if a seed reintroduces them. */
const REMOVED_BUILDING_IDS = new Set([
  'b0000000-0000-0000-0000-000000000006',
  'b0000000-0000-0000-0000-000000000007',
])

export function buildSeedData() {
  const sql = SEED_FILES.map((f) => readFileSync(resolve(ROOT, f), 'utf8')).join('\n')

  const campuses = parseInserts(sql, 'campuses')
  const buildings = parseInserts(sql, 'buildings').filter((b) => !REMOVED_BUILDING_IDS.has(b.id))
  const zones = parseInserts(sql, 'building_zones').filter(
    (z) => !REMOVED_BUILDING_IDS.has(z.building_id),
  )
  const typicalCurves = parseInserts(sql, 'google_popular_times').filter(
    (t) => !REMOVED_BUILDING_IDS.has(t.building_id),
  )

  // 018 blanks every accessibility flag to "unverified", then seed 005 restores
  // only what a published source supports.
  for (const file of CORRECTIVE_MIGRATIONS) {
    applyGlobalUpdates(readFileSync(resolve(ROOT, file), 'utf8'), buildings)
  }
  applyUpdates(sql, buildings)

  const buildingIds = new Set(buildings.map((b) => b.id))

  // Referential integrity: a zone or curve pointing at a building that no longer
  // exists means the seeds are inconsistent, which is exactly the class of bug
  // that let the database describe 20 buildings while the UI described 18.
  for (const zone of zones) {
    if (!buildingIds.has(zone.building_id)) {
      throw new Error(`Zone ${zone.zone_slug} references unknown building ${zone.building_id}`)
    }
  }
  for (const curve of typicalCurves) {
    if (!buildingIds.has(curve.building_id)) {
      throw new Error(`Typical curve references unknown building ${curve.building_id}`)
    }
  }

  return { campuses, buildings, zones, typicalCurves }
}

export function renderModule(data) {
  const { campuses, buildings, zones, typicalCurves } = data
  const json = (value) => JSON.stringify(value, null, 2).replace(/\n/g, '\n')

  return `// ============================================================================
// GENERATED FILE — DO NOT EDIT BY HAND
//
// Produced by \`pnpm generate:fixtures\` from the committed seed SQL in
// supabase/seed/. Edit the SQL and regenerate; \`seedData.test.ts\` fails if this
// file falls out of step with the seeds.
//
// Counts below are derived, not asserted — they are whatever the seeds contain:
//   campuses ${campuses.length} · buildings ${buildings.length} · zones ${zones.length} · typical curve rows ${typicalCurves.length}
// ============================================================================

import type { Building, BuildingZone, Campus, GooglePopularTime } from '@/types'

export const SEED_CAMPUSES = ${json(campuses)} as unknown as Campus[]

export const SEED_BUILDINGS = ${json(buildings)} as unknown as Building[]

export const SEED_ZONES = ${json(zones)} as unknown as BuildingZone[]

export const SEED_TYPICAL_CURVES = ${json(typicalCurves)} as unknown as GooglePopularTime[]
`
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))) {
  const data = buildSeedData()
  mkdirSync(dirname(OUT), { recursive: true })
  writeFileSync(OUT, renderModule(data))
  console.log(
    `Wrote ${OUT}\n  campuses ${data.campuses.length}` +
      ` · buildings ${data.buildings.length}` +
      ` · zones ${data.zones.length}` +
      ` · typical curve rows ${data.typicalCurves.length}`,
  )
}
