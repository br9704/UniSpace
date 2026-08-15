import { z } from 'zod'
import type {
  Building,
  BuildingZone,
  GooglePopularTime,
  GooglePopularityCache,
  OccupancyPrediction,
  OccupancyReport,
  Room,
  ZoneOccupancy,
} from '@/types'
import type { ReadableTable } from '@/lib/dataSource'

/**
 * Runtime shapes for every table the client reads.
 *
 * CLAUDE.md § 3 requires Zod on external data, and a Supabase response is
 * external in the way that matters: the database can be migrated, reseeded or
 * rolled back without this bundle changing. Before these existed, every read
 * was an unchecked `as T[]` cast, so a renamed or dropped column arrived as
 * `undefined` and surfaced somewhere far from the cause — an occupancy bar
 * rendering `NaN%`, a building with no name.
 *
 * Each schema is assigned to `z.ZodType<Interface>` below, which makes tsc fail
 * if a schema and its hand-written interface drift apart. That is the point:
 * the interfaces stay the thing you read, and these stay provably equal to them.
 *
 * Unknown keys are stripped rather than rejected. Adding a column in a migration
 * is routine and must not break a deployed client; removing or renaming one is
 * the actual breakage, and stripping still catches that.
 */

/** GeoJSON position: `[lng, lat]`, optionally with altitude. */
const positionSchema = z.array(z.number()).min(2)

/** A closed linear ring — first and last positions coincide, so at least four. */
const linearRingSchema = z.array(positionSchema).min(4)

const polygonSchema = z.object({
  type: z.literal('Polygon'),
  coordinates: z.array(linearRingSchema),
})

/** Row identifiers. Non-empty rather than strict UUID: the shape is what matters. */
const idSchema = z.string().min(1)

/** Postgres timestamps arrive as ISO-8601 strings. */
const timestampSchema = z.string().min(1)

/** `HH:MM-HH:MM`, or NULL where no source publishes the hours (migration 017). */
const hoursSchema = z.string().nullable()

const dayOfWeekSchema = z.number().int().min(0).max(6)
const hourOfDaySchema = z.number().int().min(0).max(23)
const percentageSchema = z.number().min(0).max(100)

const buildingShape = z.object({
  id: idSchema,
  campus_id: idSchema,
  slug: z.string().min(1),
  name: z.string().min(1),
  short_name: z.string().nullable(),
  estimated_capacity: z.number().int().nullable(),
  entrance_lat: z.number().nullable(),
  entrance_lng: z.number().nullable(),
  centroid_lat: z.number().nullable(),
  centroid_lng: z.number().nullable(),
  polygon: polygonSchema.nullable(),
  google_place_id: z.string().nullable(),
  has_wifi: z.boolean(),
  has_power: z.boolean(),
  has_food_nearby: z.boolean(),
  has_quiet_zone: z.boolean(),
  has_group_seating: z.boolean(),
  // Nullable by migration 018, and NULL means *not verified* rather than "no".
  // `.nullable()` without a `.default(false)` anywhere is load-bearing: a
  // default here would quietly reintroduce the two-state model that migration
  // deliberately replaced, and would do it below the UI's `[?]` rendering.
  is_ground_floor_accessible: z.boolean().nullable(),
  has_elevator: z.boolean().nullable(),
  has_accessible_bathrooms: z.boolean().nullable(),
  has_accessible_parking: z.boolean().nullable(),
  hours_mon: hoursSchema,
  hours_tue: hoursSchema,
  hours_wed: hoursSchema,
  hours_thu: hoursSchema,
  hours_fri: hoursSchema,
  hours_sat: hoursSchema,
  hours_sun: hoursSchema,
  // Nullable for the same reason the accessibility flags are: NULL is the
  // representable form of "no source backs this". Migration 021 adds a CHECK
  // that the two dependent columns are NULL whenever hours_source is.
  hours_source: z.string().nullable(),
  hours_verified_on: z.string().nullable(),
  hours_period: z.string().nullable(),
  created_at: timestampSchema,
  updated_at: timestampSchema,
})

/**
 * Mirrors migration 021's CHECK `hours_provenance_needs_a_source`.
 *
 * A verification date or a validity period without a source URL would be
 * provenance that cites nothing — the shape of a fact with none of the
 * substance, which is precisely what this project keeps finding and removing.
 * The database refuses to store it; this refuses to read it.
 */
export const buildingSchema = buildingShape.refine(
  (b) => b.hours_source !== null || (b.hours_verified_on === null && b.hours_period === null),
  { message: 'hours_verified_on and hours_period require a non-null hours_source' },
)

export const buildingZoneSchema = z.object({
  id: idSchema,
  building_id: idSchema,
  zone_slug: z.string().min(1),
  zone_name: z.string().nullable(),
  polygon: polygonSchema,
  capacity: z.number().int().nullable(),
  floor_level: z.number().int(),
  is_quiet_zone: z.boolean(),
  has_power: z.boolean(),
  is_accessible: z.boolean(),
  created_at: timestampSchema,
})

export const zoneOccupancySchema = z.object({
  zone_id: idSchema,
  building_id: idSchema,
  occupancy_count: z.number().int().min(0),
  occupancy_pct: percentageSchema,
  trend: z.enum(['filling', 'emptying', 'stable']),
  prev_pct: percentageSchema.nullable(),
  last_updated: timestampSchema,
  // Exactly migration 009's CHECK constraint. 'crowd-report' is absent on
  // purpose — it is produced by blendOccupancy on the client and can never be
  // returned by this table.
  data_quality: z.enum(['live', 'google', 'predicted', 'stale', 'none']),
})

export const googlePopularityCacheSchema = z.object({
  building_id: idSchema,
  current_popularity: percentageSchema.nullable(),
  is_open_now: z.boolean().nullable(),
  synced_at: timestampSchema,
})

export const googlePopularTimeSchema = z.object({
  building_id: idSchema,
  day_of_week: dayOfWeekSchema,
  hour_of_day: hourOfDaySchema,
  typical_popularity: percentageSchema,
  seeded_at: timestampSchema,
})

export const occupancyPredictionSchema = z.object({
  id: idSchema,
  building_id: idSchema,
  day_of_week: dayOfWeekSchema,
  hour_of_day: hourOfDaySchema,
  predicted_pct: percentageSchema,
  confidence: z.enum(['high', 'medium', 'low', 'google-estimated']),
  sample_count: z.number().int().min(0),
  data_source: z.enum(['pulse', 'google']),
  computed_at: timestampSchema,
})

export const occupancyReportSchema = z.object({
  id: idSchema,
  building_id: idSchema,
  occupancy_level: z.union([
    z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5),
  ]),
  noise_level: z.union([
    z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5),
  ]).nullable(),
  created_at: timestampSchema,
  expires_at: timestampSchema,
})

export const roomSchema = z.object({
  id: idSchema,
  building_id: idSchema,
  code: z.string().min(1),
  name: z.string().nullable(),
  floor_level: z.number().int(),
  room_type: z.enum(['lecture', 'tutorial', 'lab', 'study', 'meeting', 'library', 'other']),
  capacity: z.number().int().nullable(),
  // Nullable per migration 019, same three-state rule as everything else here:
  // NULL is "not checked", and no room fact may read false without a source.
  has_power: z.boolean().nullable(),
  is_bookable: z.boolean().nullable(),
  is_accessible: z.boolean().nullable(),
  created_at: timestampSchema,
})

/**
 * Compile-time proof that each schema still describes its interface.
 *
 * If a field is added to an interface and not to the schema, or the two
 * disagree on nullability, `tsc` fails here rather than at the call site — or,
 * worse, not at all.
 */
const _pinBuilding: z.ZodType<Building> = buildingSchema
const _pinBuildingZone: z.ZodType<BuildingZone> = buildingZoneSchema
const _pinZoneOccupancy: z.ZodType<ZoneOccupancy> = zoneOccupancySchema
const _pinGooglePopularityCache: z.ZodType<GooglePopularityCache> = googlePopularityCacheSchema
const _pinGooglePopularTime: z.ZodType<GooglePopularTime> = googlePopularTimeSchema
const _pinOccupancyPrediction: z.ZodType<OccupancyPrediction> = occupancyPredictionSchema
const _pinOccupancyReport: z.ZodType<OccupancyReport> = occupancyReportSchema
const _pinRoom: z.ZodType<Room> = roomSchema
void [
  _pinBuilding, _pinBuildingZone, _pinZoneOccupancy, _pinGooglePopularityCache,
  _pinGooglePopularTime, _pinOccupancyPrediction, _pinOccupancyReport, _pinRoom,
]

/**
 * The schema for every readable table.
 *
 * Typed as a total `Record<ReadableTable, ...>`, so adding a table to
 * `ReadableTable` without adding its schema is a compile error. A new table
 * cannot slip through unvalidated.
 */
export const TABLE_SCHEMAS: Record<ReadableTable, z.ZodType<unknown>> = {
  buildings: buildingSchema,
  building_zones: buildingZoneSchema,
  zone_occupancy: zoneOccupancySchema,
  google_popularity_cache: googlePopularityCacheSchema,
  google_popular_times: googlePopularTimeSchema,
  occupancy_predictions: occupancyPredictionSchema,
  occupancy_reports: occupancyReportSchema,
  rooms: roomSchema,
}

/** A one-line, human-readable summary of why a row failed. */
export function describeIssue(error: z.ZodError): string {
  const first = error.issues[0]
  if (!first) return 'unknown validation error'
  const path = first.path.join('.')
  return path ? `${path}: ${first.message}` : first.message
}
