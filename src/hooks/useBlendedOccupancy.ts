import { useMemo } from 'react'
import type { BlendedOccupancy, Building, BuildingZone } from '@/types'
import { blendOccupancy } from '@/lib/blending'
import { getCurrentPrediction, getCurrentTypical } from '@/lib/occupancyHelpers'
import { useOccupancyRealtime } from './useOccupancyRealtime'
import { useGooglePopularity } from './useGooglePopularity'

interface UseBlendedOccupancyResult {
  occupancyMap: Map<string, BlendedOccupancy>
  isLoading: boolean
  error: string | null
}

/**
 * Composes Realtime zone occupancy, Google fallback data, and predictions
 * through the blendOccupancy() function for every building.
 *
 * Returns a Map<buildingId, BlendedOccupancy> that re-computes whenever
 * Realtime delivers zone_occupancy updates (~every 10s).
 */
export function useBlendedOccupancy(
  buildings: Building[],
  zones: BuildingZone[],
): UseBlendedOccupancyResult {
  const {
    zoneOccupancyMap,
    isLoading: rtLoading,
    error: rtError,
  } = useOccupancyRealtime()

  const {
    googleCacheMap,
    allTypicalRows,
    allPredictionRows,
    isLoading: gLoading,
    error: gError,
  } = useGooglePopularity()

  const occupancyMap = useMemo(() => {
    const map = new Map<string, BlendedOccupancy>()
    if (buildings.length === 0) return map

    for (const building of buildings) {
      const zonesForBuilding = zones.filter((z) => z.building_id === building.id)
      const zoneOccupancies = zoneOccupancyMap.get(building.id) ?? []
      const googleCache = googleCacheMap.get(building.id) ?? null
      const prediction = getCurrentPrediction(allPredictionRows, building.id)
      const googleTypical = getCurrentTypical(allTypicalRows, building.id)

      map.set(building.id, blendOccupancy({
        zoneOccupancies,
        zones: zonesForBuilding,
        googleCache,
        prediction,
        googleTypical,
      }))
    }

    return map
  }, [buildings, zones, zoneOccupancyMap, googleCacheMap, allTypicalRows, allPredictionRows])

  return {
    occupancyMap,
    isLoading: rtLoading || gLoading,
    error: rtError || gError,
  }
}
