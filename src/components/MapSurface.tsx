import type { BlendedOccupancy, Building, DataQuality } from '@/types'
import Map from './Map'
import MapOverlays from './MapOverlays'
import ErrorBoundary from './ErrorBoundary'
import BuildingListFallback from './BuildingListFallback'
import LocationPrompt from './LocationPrompt'
import StaleDataBanner from './StaleDataBanner'

interface MapSurfaceProps {
  buildings: Building[]
  occupancyMap: Map<string, BlendedOccupancy>
  dominantSource: DataQuality
  lastUpdated: Date | null
  isChanging: boolean
  /** False while a sheet or panel is open. */
  chromeVisible: boolean
  hasPosition: boolean
  locationDenied: boolean
  onSelect: (buildingId: string) => void
  onFind: () => void
  onReport: () => void
}

/**
 * The map and everything layered on it, including its failure modes.
 *
 * Wrapped in an error boundary whose fallback is the building list rather than
 * an apology. Mapbox is the most likely thing here to fail — an expired token,
 * a blocked CDN, an exhausted quota — and none of those affect the occupancy
 * data itself. Losing the map should cost the nicest way to read the answer,
 * not the answer.
 */
export default function MapSurface({
  buildings,
  occupancyMap,
  dominantSource,
  lastUpdated,
  isChanging,
  chromeVisible,
  hasPosition,
  locationDenied,
  onSelect,
  onFind,
  onReport,
}: MapSurfaceProps) {
  const listFallback = (reason: string) => (
    <BuildingListFallback
      buildings={buildings}
      occupancyMap={occupancyMap}
      onSelect={onSelect}
      reason={reason}
    />
  )

  return (
    <>
      <StaleDataBanner lastUpdated={lastUpdated} />

      <ErrorBoundary label="the map" fallback={listFallback('the map failed to render')}>
        <Map
          buildings={buildings}
          occupancyMap={occupancyMap}
          onBuildingClick={onSelect}
          isChanging={isChanging}
        />
      </ErrorBoundary>

      {!hasPosition && chromeVisible && <LocationPrompt denied={locationDenied} />}

      <MapOverlays
        occupancyMap={occupancyMap}
        dominantSource={dominantSource}
        lastUpdated={lastUpdated}
        visible={chromeVisible}
        onFind={onFind}
        onReport={onReport}
      />
    </>
  )
}
