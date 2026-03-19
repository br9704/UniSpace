import { useCallback, useMemo, useState } from 'react'
import Map from '@/components/Map'
import { useBuildings } from '@/hooks/useBuildings'
import { useZones } from '@/hooks/useZones'
import { useGeolocation } from '@/hooks/useGeolocation'
import { usePositionBroadcast } from '@/hooks/usePositionBroadcast'
import { useBlendedOccupancy } from '@/hooks/useBlendedOccupancy'
import { detectZone } from '@/lib/zoneDetection'

export default function MapPage() {
  const { buildings, error } = useBuildings()
  const { zones } = useZones()
  const { position, isWatching } = useGeolocation()
  const { occupancyMap } = useBlendedOccupancy(buildings, zones)
  const [_selectedBuildingId, setSelectedBuildingId] = useState<string | null>(null)

  // Zone detection — coordinates consumed here, only zone_id exits
  const zoneId = useMemo(
    () => position && zones.length > 0 ? detectZone(position, zones) : null,
    [position, zones],
  )

  // Broadcasting — receives ONLY zone_id, never coordinates
  usePositionBroadcast({
    zoneId,
    campusSlug: 'unimelb',
    enabled: isWatching && zones.length > 0,
  })

  const handleBuildingClick = useCallback((id: string) => {
    setSelectedBuildingId(id)
    console.log('[Pulse] Building selected:', id)
  }, [])

  if (error) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-bg-primary text-[var(--color-text-secondary)]">
        <p>Failed to load buildings: {error}</p>
      </div>
    )
  }

  return (
    <div className="h-full w-full relative">
      <Map buildings={buildings} occupancyMap={occupancyMap} onBuildingClick={handleBuildingClick} />
    </div>
  )
}
