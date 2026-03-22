import { useMemo } from 'react'
import type { BlendedOccupancy, Building, BuildingZone, GooglePopularTime, OccupancyPrediction } from '@/types'
import { blendOccupancy } from '@/lib/blending'
import { getCurrentPrediction, getCurrentTypical } from '@/lib/occupancyHelpers'
import { useOccupancyRealtime } from './useOccupancyRealtime'
import { useGooglePopularity } from './useGooglePopularity'
import { useRecentReports } from './useRecentReports'

interface UseBlendedOccupancyResult {
  occupancyMap: Map<string, BlendedOccupancy>
  allTypicalRows: GooglePopularTime[]
  allPredictionRows: OccupancyPrediction[]
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

  const reportsMap = useRecentReports()

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
        reports: reportsMap.get(building.id) ?? [],
      }))
    }

    return map
  }, [buildings, zones, zoneOccupancyMap, googleCacheMap, allTypicalRows, allPredictionRows, reportsMap])

  return {
    occupancyMap,
    allTypicalRows,
    allPredictionRows,
    isLoading: rtLoading || gLoading,
    error: rtError || gError,
  }
}
