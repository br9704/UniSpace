import type { Building } from '@/types'

interface Coords {
  latitude: number
  longitude: number
}

/**
 * The building closest to a position, or null if none can be located.
 *
 * Compares squared degree distance rather than true great-circle distance. Over
 * a single campus — under 2km across — the two rank identically, and skipping
 * the trigonometry keeps this cheap enough to call on every position update.
 * Use Turf's distance where an actual measurement in metres is needed; this
 * only ever answers "which one".
 *
 * Prefers the entrance over the centroid, since that is where a person
 * physically arrives.
 */
export function findNearestBuilding(
  position: Coords,
  buildings: Building[],
): Building | null {
  let nearest: Building | null = null
  let smallest = Infinity

  for (const building of buildings) {
    const lat = building.entrance_lat ?? building.centroid_lat
    const lng = building.entrance_lng ?? building.centroid_lng
    if (lat == null || lng == null) continue

    const distance =
      (lat - position.latitude) ** 2 + (lng - position.longitude) ** 2

    if (distance < smallest) {
      smallest = distance
      nearest = building
    }
  }

  return nearest
}
