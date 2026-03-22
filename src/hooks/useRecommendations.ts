import { useMemo, useRef, useState, useEffect } from 'react'
import type { BlendedOccupancy, Building, FilterState, RankedBuilding } from '@/types'
import type { NoiseAggregation } from '@/lib/noiseAggregation'
import { rankBuildings } from '@/lib/scoring'

/** Debounced recommendation ranking. Re-ranks when filters or data change (300ms debounce on filters). */
export function useRecommendations(
  buildings: Building[],
  occupancyMap: Map<string, BlendedOccupancy>,
  filters: FilterState,
  userPosition: { latitude: number; longitude: number } | null,
  noiseMap?: Map<string, NoiseAggregation>,
): RankedBuilding[] {
  const [debouncedFilters, setDebouncedFilters] = useState(filters)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setDebouncedFilters(filters), 300)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [filters])

  return useMemo(
    () => rankBuildings(buildings, occupancyMap, debouncedFilters, userPosition, noiseMap),
    [buildings, occupancyMap, debouncedFilters, userPosition, noiseMap],
  )
}
