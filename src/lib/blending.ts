import type {
  BlendedOccupancy,
  BuildingZone,
  DataQuality,
  FloorOccupancy,
  GooglePopularityCache,
  GooglePopularTime,
  OccupancyPrediction,
  OccupancyTrend,
  ZoneOccupancy,
} from '@/types'
import { GOOGLE_CACHE_TTL_MS, STALE_DATA_THRESHOLD_MS } from '@/constants/occupancy'

// ── Public types ─────────────────────────────────────────────────────

export interface BlendingInput {
  zoneOccupancies: ZoneOccupancy[]
  zones: BuildingZone[]
  googleCache: GooglePopularityCache | null
  prediction: OccupancyPrediction | null
  googleTypical: GooglePopularTime | null
  now?: Date // injectable for testing
}

// ── Helpers (exported for unit testing) ──────────────────────────────

/** Returns true if `timestamp` is within `thresholdMs` of `now`. */
export function isDataFresh(timestamp: string, thresholdMs: number, now: Date): boolean {
  const age = now.getTime() - new Date(timestamp).getTime()
  return age >= 0 && age < thresholdMs
}

/** Majority-vote trend across zone occupancies. */
export function determineTrend(zoneOccupancies: ZoneOccupancy[]): OccupancyTrend {
  if (zoneOccupancies.length === 0) return 'stable'

  let filling = 0
  let emptying = 0

  for (const z of zoneOccupancies) {
    if (z.trend === 'filling') filling++
    else if (z.trend === 'emptying') emptying++
  }

  if (filling > emptying) return 'filling'
  if (emptying > filling) return 'emptying'
  return 'stable'
}

/**
 * Capacity-weighted aggregation of zone occupancies to a single building percentage.
 * Zones with null capacity are given a default weight of 100.
 */
export function aggregateZoneOccupancies(
  zones: BuildingZone[],
  zoneOccupancies: ZoneOccupancy[],
): { pct: number; trend: OccupancyTrend; floorBreakdown: FloorOccupancy[] } {
  const occMap = new Map<string, ZoneOccupancy>()
  for (const zo of zoneOccupancies) {
    occMap.set(zo.zone_id, zo)
  }

  let totalWeightedPct = 0
  let totalCapacity = 0
  const floorBreakdown: FloorOccupancy[] = []

  for (const zone of zones) {
    const occ = occMap.get(zone.id)
    if (!occ) continue

    const capacity = zone.capacity ?? 100
    totalWeightedPct += occ.occupancy_pct * capacity
    totalCapacity += capacity

    floorBreakdown.push({
      zone_id: zone.id,
      floor_level: zone.floor_level,
      zone_name: zone.zone_name ?? `Floor ${zone.floor_level}`,
      occupancy_pct: occ.occupancy_pct,
      trend: occ.trend,
    })
  }

  const pct = totalCapacity > 0
    ? Math.round((totalWeightedPct / totalCapacity) * 100) / 100
    : 0

  const trend = determineTrend(zoneOccupancies)

  return { pct, trend, floorBreakdown }
}

// ── Main blending function ───────────────────────────────────────────

/**
 * Blends multiple occupancy data sources into a single `BlendedOccupancy`
 * following the PRD fallback hierarchy:
 *
 *   1. Live crowdsourced  → 'live'
 *   2. Google cache       → 'google'  (current_popularity, when available)
 *   3. Pulse predicted    → 'predicted'
 *   4. Google typical     → 'google'  (weekly histogram)
 *   5. No data            → 'none'
 */
export function blendOccupancy(input: BlendingInput): BlendedOccupancy {
  const { zoneOccupancies, zones, googleCache, prediction, googleTypical } = input
  const now = input.now ?? new Date()

  // ── Priority 1: Live crowdsourced data ──
  const freshZones = zoneOccupancies.filter(
    (zo) => isDataFresh(zo.last_updated, STALE_DATA_THRESHOLD_MS, now),
  )

  if (freshZones.length > 0) {
    const { pct, trend, floorBreakdown } = aggregateZoneOccupancies(zones, freshZones)
    return {
      pct,
      source: 'live' as DataQuality,
      trend,
      floor_occupancies: floorBreakdown,
      last_updated: now.toISOString(),
    }
  }

  // ── Priority 2: Google current popularity cache ──
  if (
    googleCache &&
    googleCache.current_popularity !== null &&
    isDataFresh(googleCache.synced_at, GOOGLE_CACHE_TTL_MS, now)
  ) {
    return {
      pct: googleCache.current_popularity,
      source: 'google' as DataQuality,
      trend: 'stable',
      floor_occupancies: [],
      last_updated: googleCache.synced_at,
    }
  }

  // ── Priority 3: Pulse historical prediction ──
  if (prediction) {
    return {
      pct: prediction.predicted_pct,
      source: 'predicted' as DataQuality,
      trend: 'stable',
      floor_occupancies: [],
      last_updated: prediction.computed_at,
    }
  }

  // ── Priority 4: Google typical popularity (weekly histogram) ──
  if (googleTypical && googleTypical.typical_popularity !== null) {
    return {
      pct: googleTypical.typical_popularity,
      source: 'google' as DataQuality,
      trend: 'stable',
      floor_occupancies: [],
      last_updated: googleTypical.seeded_at,
    }
  }

  // ── Priority 5: No data ──
  return {
    pct: null,
    source: 'none' as DataQuality,
    trend: 'stable',
    floor_occupancies: [],
    last_updated: now.toISOString(),
  }
}
