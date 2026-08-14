import { useMemo } from 'react'
import type { GooglePopularTime, OccupancyPrediction, OccupancyReport } from '@/types'
import { getDayPredictions } from '@/lib/predictionInsights'
import { aggregateNoise } from '@/lib/noiseAggregation'

/**
 * The extra data the building sheet needs beyond occupancy itself.
 *
 * Both are derived only for the selected building rather than for all 18 —
 * computing every building's day curve on every render would be wasted work for
 * seventeen sheets nobody has opened.
 */
export function useBuildingSheetData(
  buildingId: string | null,
  predictionRows: OccupancyPrediction[],
  typicalRows: GooglePopularTime[],
  reportsMap: Map<string, OccupancyReport[]>,
) {
  const predictions = useMemo(() => {
    if (!buildingId) return []
    return getDayPredictions(predictionRows, typicalRows, buildingId, new Date().getDay())
  }, [buildingId, predictionRows, typicalRows])

  const noise = useMemo(() => {
    if (!buildingId) return null
    return aggregateNoise(reportsMap.get(buildingId) ?? [])
  }, [buildingId, reportsMap])

  return { predictions, noise }
}
