import { point, distance } from '@turf/turf'
import type { BlendedOccupancy, Building, FilterState, RankedBuilding } from '@/types'
import { isOpenNow } from './buildingHours'

const WALK_SPEED_MS = 1.4 // metres per second
const MAX_WALK_MINUTES = 15

/** Calculate walking time from user position to building entrance. */
export function calculateWalkingTime(
  userPos: { latitude: number; longitude: number } | null,
  entranceLat: number | null,
  entranceLng: number | null,
): { minutes: number; meters: number } | null {
  if (!userPos || entranceLat === null || entranceLng === null) return null

  const from = point([userPos.longitude, userPos.latitude])
  const to = point([entranceLng, entranceLat])
  const meters = distance(from, to, { units: 'meters' })
  const minutes = meters / (WALK_SPEED_MS * 60)

  return { minutes: Math.round(minutes * 10) / 10, meters: Math.round(meters) }
}

/** Calculate what fraction of active amenity filters a building matches (0-1). */
export function calculateAmenityMatch(building: Building, filters: FilterState): number {
  const amenityKeys: (keyof FilterState & keyof Building)[] = [
    'has_wifi', 'has_power', 'has_food_nearby', 'has_quiet_zone',
    'has_group_seating', 'is_ground_floor_accessible', 'has_elevator',
  ]

  const activeFilters = amenityKeys.filter((k) => filters[k])
  if (activeFilters.length === 0) return 1 // no penalty when no filters active

  const matched = activeFilters.filter((k) => building[k])
  return matched.length / activeFilters.length
}

const TREND_ORDER: Record<string, number> = { emptying: 0, stable: 1, filling: 2 }

/** Score and rank buildings based on occupancy, distance, and amenity match. */
export function rankBuildings(
  buildings: Building[],
  occupancyMap: Map<string, BlendedOccupancy>,
  filters: FilterState,
  userPosition: { latitude: number; longitude: number } | null,
): RankedBuilding[] {
  const results: RankedBuilding[] = []

  for (const building of buildings) {
    const occupancy = occupancyMap.get(building.id) ?? {
      pct: null, source: 'none' as const, trend: 'stable' as const,
      floor_occupancies: [], last_updated: new Date().toISOString(),
    }

    // Filter: currently open
    if (filters.currently_open && !isOpenNow(building).open) continue

    // Filter: max occupancy
    if (occupancy.pct !== null && occupancy.pct > filters.max_occupancy_pct) continue

    // Filter: amenity requirements (must have ALL active filters)
    const amenityMatch = calculateAmenityMatch(building, filters)
    const amenityKeys: (keyof FilterState & keyof Building)[] = [
      'has_wifi', 'has_power', 'has_food_nearby', 'has_quiet_zone',
      'has_group_seating', 'is_ground_floor_accessible', 'has_elevator',
    ]
    const activeFilters = amenityKeys.filter((k) => filters[k])
    const hasAll = activeFilters.every((k) => building[k])
    if (activeFilters.length > 0 && !hasAll) continue

    // Walking time
    const walkResult = calculateWalkingTime(userPosition, building.entrance_lat, building.entrance_lng)
    const walkMinutes = walkResult?.minutes ?? null

    // Filter: max walking time
    if (walkMinutes !== null && walkMinutes > filters.max_walk_minutes) continue

    // Score
    const occNorm = occupancy.pct !== null ? occupancy.pct / 100 : 0.5
    const walkNorm = walkMinutes !== null ? Math.min(1, walkMinutes / MAX_WALK_MINUTES) : 0.5
    const score = (1 - occNorm) * 0.5 + (1 - walkNorm) * 0.3 + amenityMatch * 0.2

    results.push({
      building,
      score,
      occupancy,
      walk_minutes: walkMinutes,
      distance_m: walkResult?.meters ?? null,
      amenity_match_pct: Math.round(amenityMatch * 100),
    })
  }

  // Sort by score DESC, tie-break by trend (emptying > stable > filling)
  results.sort((a, b) => {
    if (Math.abs(a.score - b.score) > 0.001) return b.score - a.score
    return (TREND_ORDER[a.occupancy.trend] ?? 1) - (TREND_ORDER[b.occupancy.trend] ?? 1)
  })

  return results
}
