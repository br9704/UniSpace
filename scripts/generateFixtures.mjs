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
import { parseInserts, applyUpdates, applyGlobalUpdates, applyKeyedUpdates } from './parseSeedSql.mjs'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = resolve(ROOT, 'src/lib/fixtures/seedData.generated.ts')

const SEED_FILES = [
  'supabase/seed/001_uom_parkville.sql',
  'supabase/seed/002_google_popular_times.sql',
  'supabase/seed/003_additional_buildings.sql',
  'supabase/seed/004_additional_popular_times.sql',
  'supabase/seed/005_verified_accessibility.sql',
  'supabase/seed/006_rooms_uom_campus_map.sql',
  'supabase/seed/007_verified_accessibility_campus_map.sql',
  'supabase/seed/008_verified_hours_source.sql',
]

/**
 * Migrations that change seeded values rather than schema.
 *
 * Applied in order after the seeds, mirroring how a real database ends up:
 * migrations run, then seeds, then later corrective seeds. Fixtures must show
 * the same final state or local development lies about what is deployed.
 */
/**
 * Migrations that correct geometry, applied in order before anything else.
 *
 * These were missing, and their absence is what made every building on the map
 * a box. 010's own header states the problem it exists to fix: "Original
 * polygons were oversized rectangles (~140m x 100m) that were misaligned from
 * actual building positions." 011 then replaces them with real OpenStreetMap
 * outlines. Neither was ever applied here, because both use
 * `WHERE id = '...'` and the generator had no helper for that form — so the
 * fixtures kept the very rectangles 010 was written to remove, and the app
 * rendered them everywhere, since it runs on fixtures everywhere.
 *
 * They also set centroid and entrance coordinates, which is why building
 * centroids looked wrong against UoM's own campus map.
 */
const GEOMETRY_MIGRATIONS = [
  'supabase/migrations/010_fix_building_polygons.sql',
  'supabase/migrations/011_correct_all_polygons.sql',
  // 022 replaces 011's hand-simplified 4-7 point quads with the real
  // OpenStreetMap ways, 14-57 vertices each, and recomputes centroids from the
  // geometry rather than asserting them alongside it.
  'supabase/migrations/022_osm_building_footprints.sql',
]

const CORRECTIVE_MIGRATIONS = [
  'supabase/migrations/018_accessibility_unknown.sql',
  // 021 adds the hours-provenance columns and blanks them for every building.
  // It has to run here rather than be left implicit: without it the 13 buildings
  // seed 008 does not touch would carry `undefined` instead of `null`, and
  // "unverified" would read to the UI as "column missing" rather than as the
  // deliberate statement it is.
  'supabase/migrations/021_hours_source.sql',
]

/** Buildings dropped in R1.7 — belt and braces if a seed reintroduces them. */
const REMOVED_BUILDING_IDS = new Set([
  'b0000000-0000-0000-0000-000000000006',
  'b0000000-0000-0000-0000-000000000007',
])

/**
 * When this seed data was authored.
 *
 * The seed SQL never inserts `created_at`, `updated_at` or `seeded_at` — the
 * columns carry `DEFAULT NOW()`, so a real database fills them at insert time
 * and the parser has nothing to read. Left absent, they arrived as `undefined`
 * behind an `as unknown as Building[]` cast, and `blendOccupancy` handed that
 * `undefined` straight to `last_updated` on the Google-typical path. Every
 * freshness stamp in the app then failed its own truthiness guard and rendered
 * nothing at all.
 *
 * A fixed date rather than `new Date()`, for two reasons. It has to be
 * byte-stable or `seedData.test.ts` — which fails when this file drifts from
 * the seeds — would fail on every regeneration. And it is the honest value:
 * this data really was seeded on this date and has not been refreshed since,
 * so the UI ageing it and eventually applying its stale treatment is the true
 * statement. Stamping it `now` would make months-old seed data claim to be
 * fresh. Update it when the seed data is genuinely re-derived.
 */
const SEED_AUTHORED_AT = '2026-08-15T00:00:00.000Z'

/** Fill DB-default columns the seed SQL omits, without overwriting explicit values. */
function withDefaults(rows, columns) {
  for (const row of rows) {
    for (const column of columns) {
      if (row[column] === undefined) row[column] = SEED_AUTHORED_AT
    }
  }
  return rows
}

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

  // Geometry first, mirroring migration order: 010 tightens the boxes, then 011
  // replaces them with OSM outlines. Zones carry their building's polygon.
  for (const file of GEOMETRY_MIGRATIONS) {
    const sqlText = readFileSync(resolve(ROOT, file), 'utf8')
    applyKeyedUpdates(sqlText, buildings, 'buildings')
    applyKeyedUpdates(sqlText, zones, 'building_zones')
  }

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

  withDefaults(campuses, ['created_at'])
  withDefaults(buildings, ['created_at', 'updated_at'])
  withDefaults(zones, ['created_at'])
  withDefaults(typicalCurves, ['seeded_at'])

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

// Annotated rather than cast. The previous \`as unknown as Building[]\` asserted
// a shape instead of checking one, and hid four missing timestamp columns for
// as long as it existed. A contextual annotation makes tsc verify every row.

export const SEED_CAMPUSES: Campus[] = ${json(campuses)}

export const SEED_BUILDINGS: Building[] = ${json(buildings)}

export const SEED_ZONES: BuildingZone[] = ${json(zones)}

export const SEED_TYPICAL_CURVES: GooglePopularTime[] = ${json(typicalCurves)}
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
