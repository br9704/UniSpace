import type {
  GooglePopularityCache,
  OccupancyPrediction,
  OccupancyReport,
  ZoneOccupancy,
} from '@/types'
import { isOpenNow } from '@/lib/buildingHours'
import {
  SEED_BUILDINGS,
  SEED_TYPICAL_CURVES,
  SEED_ZONES,
} from './seedData.generated'

/**
 * A local stand-in for the Supabase tables the client reads.
 *
 * Derived from the committed seed SQL, so the 18 buildings, their zones and
 * their typical-occupancy curves are exactly what a real database would hold.
 *
 * ── On honesty ──
 * These fixtures deliberately report **no live occupancy**. Every zone is
 * returned with `data_quality: 'none'`, so blending falls through to the typical
 * curves and the UI shows its estimated-confidence treatment. That is not a
 * limitation to work around — it is the true state of a campus app with no
 * users, and MOTION.md treats that cold-start screen as a first-class design
 * rather than an empty one. Synthesising fake "live" numbers would make the
 * thin-data case look solved when it is the case most in need of design.
 */

/** Zones start empty. Occupancy is estimated from curves until users appear. */
function buildZoneOccupancy(now: Date): ZoneOccupancy[] {
  const timestamp = now.toISOString()
  return SEED_ZONES.map((zone) => ({
    zone_id: zone.id,
    building_id: zone.building_id,
    occupancy_count: 0,
    occupancy_pct: 0,
    trend: 'stable' as const,
    prev_pct: null,
    last_updated: timestamp,
    data_quality: 'none' as const,
  }))
}

/**
 * Open/closed comes from the seeded opening hours.
 *
 * `current_popularity` is null on purpose: Google's public Places API does not
 * expose live busyness at all, so a real cache would have nothing to put here
 * either. Populating it would invent a data source that does not exist.
 */
function buildPopularityCache(now: Date): GooglePopularityCache[] {
  return SEED_BUILDINGS.map((building) => ({
    building_id: building.id,
    current_popularity: null,
    is_open_now: isOpenNow(building, now).open,
    synced_at: now.toISOString(),
  }))
}

const EMPTY_PREDICTIONS: OccupancyPrediction[] = []
const EMPTY_REPORTS: OccupancyReport[] = []

/** Reports submitted this session, so the report loop is testable end to end. */
const sessionReports: OccupancyReport[] = []

type Listener = (row: unknown) => void
const listeners = new Map<string, Set<Listener>>()

export function getFixtureRows<T>(
  table: string,
  options: { unexpiredOnly?: boolean } = {},
): T[] {
  const now = new Date()

  switch (table) {
    case 'buildings':
      return SEED_BUILDINGS as unknown as T[]
    case 'building_zones':
      return SEED_ZONES as unknown as T[]
    case 'zone_occupancy':
      return buildZoneOccupancy(now) as unknown as T[]
    case 'google_popular_times':
      return SEED_TYPICAL_CURVES as unknown as T[]
    case 'google_popularity_cache':
      return buildPopularityCache(now) as unknown as T[]
    case 'occupancy_predictions':
      return EMPTY_PREDICTIONS as unknown as T[]
    case 'occupancy_reports': {
      const rows = options.unexpiredOnly
        ? sessionReports.filter((r) => new Date(r.expires_at).getTime() > now.getTime())
        : sessionReports
      return (rows.length ? [...rows] : EMPTY_REPORTS) as unknown as T[]
    }
    default:
      return [] as T[]
  }
}

export function subscribeToFixtureTable<T>(
  table: string,
  onChange: (row: T) => void,
): () => void {
  const set = listeners.get(table) ?? new Set<Listener>()
  set.add(onChange as Listener)
  listeners.set(table, set)
  return () => { set.delete(onChange as Listener) }
}

/**
 * Record a crowd report locally and notify subscribers.
 *
 * Keeps the most important loop in the app testable without a backend: submit a
 * report, watch your own zone change. MOTION.md calls that the single most
 * important piece of motion in the product, so it must be exercisable offline.
 */
export function submitFixtureReport(
  report: Omit<OccupancyReport, 'id' | 'created_at' | 'expires_at'>,
): OccupancyReport {
  const now = new Date()
  const full: OccupancyReport = {
    ...report,
    id: crypto.randomUUID(),
    created_at: now.toISOString(),
    // Matches the 30-minute report lifespan enforced by the Edge Function.
    expires_at: new Date(now.getTime() + 30 * 60 * 1000).toISOString(),
  }
  sessionReports.push(full)
  listeners.get('occupancy_reports')?.forEach((fn) => fn(full))
  return full
}

/** Reset session state. Exported for tests. */
export function resetFixtureReports(): void {
  sessionReports.length = 0
}
