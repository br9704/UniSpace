import { describe, expect, it } from 'vitest'
import { getFixtureRows } from '@/lib/fixtures'
import { fetchRows } from '@/lib/dataSource'
import type { ReadableTable } from '@/lib/dataSource'
import { TABLE_SCHEMAS, buildingSchema, zoneOccupancySchema } from '@/lib/schemas'

const READABLE_TABLES: ReadableTable[] = [
  'buildings',
  'building_zones',
  'zone_occupancy',
  'google_popularity_cache',
  'google_popular_times',
  'occupancy_predictions',
  'occupancy_reports',
  'rooms',
]

describe('TABLE_SCHEMAS', () => {
  it('covers every readable table', () => {
    expect(Object.keys(TABLE_SCHEMAS).sort()).toEqual([...READABLE_TABLES].sort())
  })

  // The fixtures are generated from the committed seed SQL, so this is really a
  // test that the seeds, the generator and the types still agree. It is the
  // check that would have caught a column renamed in a migration but not in the
  // TypeScript, back when every read was an unchecked cast.
  describe.each(READABLE_TABLES)('%s fixtures', (table) => {
    it('every row satisfies the schema', () => {
      const schema = TABLE_SCHEMAS[table]
      const rows = getFixtureRows<unknown>(table)

      const failures = rows.flatMap((row, index) => {
        const result = schema.safeParse(row)
        return result.success ? [] : [{ index, issues: result.error.issues }]
      })

      expect(failures).toEqual([])
    })
  })
})

describe('accessibility flags survive validation as three-state', () => {
  // Migration 018 made these nullable because NULL means "nobody has checked",
  // which must render as [?] rather than as "no". A schema that defaulted them
  // to false would undo that below the UI, silently and everywhere at once.
  const base = getFixtureRows<Record<string, unknown>>('buildings')[0]

  it('preserves null rather than coercing it to false', () => {
    const parsed = buildingSchema.parse({
      ...base,
      is_ground_floor_accessible: null,
      has_elevator: null,
      has_accessible_bathrooms: null,
      has_accessible_parking: null,
    })

    expect(parsed.is_ground_floor_accessible).toBeNull()
    expect(parsed.has_elevator).toBeNull()
    expect(parsed.has_accessible_bathrooms).toBeNull()
    expect(parsed.has_accessible_parking).toBeNull()
  })

  it('rejects a missing flag rather than treating it as unverified', () => {
    const { has_elevator: _omitted, ...withoutFlag } = base
    expect(buildingSchema.safeParse(withoutFlag).success).toBe(false)
  })
})

describe('zone_occupancy data_quality', () => {
  const valid = getFixtureRows<Record<string, unknown>>('zone_occupancy')[0]

  it.each(['live', 'google', 'predicted', 'stale', 'none'])('accepts %s', (quality) => {
    expect(zoneOccupancySchema.safeParse({ ...valid, data_quality: quality }).success).toBe(true)
  })

  // 'crowd-report' is produced by blendOccupancy on the client and forbidden by
  // migration 009's CHECK constraint. If it ever arrives from the database,
  // something upstream is writing a value the column should not hold.
  it("rejects 'crowd-report', which this column cannot hold", () => {
    expect(
      zoneOccupancySchema.safeParse({ ...valid, data_quality: 'crowd-report' }).success,
    ).toBe(false)
  })

  it('rejects an out-of-range percentage', () => {
    expect(zoneOccupancySchema.safeParse({ ...valid, occupancy_pct: 140 }).success).toBe(false)
  })
})

describe('fetchRows in fixture mode', () => {
  it('returns validated rows with no error', async () => {
    const result = await fetchRows('buildings')
    expect(result.error).toBeNull()
    expect(result.data.length).toBeGreaterThan(0)
  })

  it('strips columns the build does not model', () => {
    // Adding a column in a migration must not break a deployed client, so
    // unknown keys are dropped rather than rejected.
    const parsed = buildingSchema.parse({
      ...getFixtureRows<Record<string, unknown>>('buildings')[0],
      a_column_added_in_a_later_migration: 'ignored',
    })
    expect(parsed).not.toHaveProperty('a_column_added_in_a_later_migration')
  })
})
