import { useMemo } from 'react'
import type { BlendedOccupancy, Building } from '@/types'

export function useBuildingCard(
  buildingId: string | null,
  buildings: Building[],
  occupancyMap: Map<string, BlendedOccupancy>,
): { building: Building | null; occupancy: BlendedOccupancy | null } {
  const building = useMemo(
    () => buildingId ? buildings.find((b) => b.id === buildingId) ?? null : null,
    [buildingId, buildings],
  )

  const occupancy = useMemo(
    () => buildingId ? occupancyMap.get(buildingId) ?? null : null,
    [buildingId, occupancyMap],
  )

  return { building, occupancy }
}
