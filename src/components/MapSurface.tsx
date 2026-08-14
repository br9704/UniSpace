import { lazy, Suspense } from 'react'
import type { BlendedOccupancy, Building, DataQuality } from '@/types'

/**
 * Mapbox GL is 1.6 MB — by a wide margin the largest thing this app ships, and
 * the home screen never renders it. Loading it here rather than in the entry
 * chunk keeps the landing route light for the commuter checking their phone on
 * a train, which is the exact scenario in PRD § 3.1.
 *
 * `lib/preloadMap` warms it during idle time, so navigating to the map is still
 * instant despite the split.
 */
const Map = lazy(() => import('@/components/Map'))
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
        <Suspense fallback={<MapLoading />}>
          <Map
            buildings={buildings}
            occupancyMap={occupancyMap}
            onBuildingClick={onSelect}
            isChanging={isChanging}
          />
        </Suspense>
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

/** Terminal loader, matching the rest of the system — never a spinner. */
function MapLoading() {
  return (
    <div
      className="mono h-full w-full flex items-center justify-center text-xs"
      style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text-muted)' }}
      role="status"
    >
      &gt; loading map&hellip;
    </div>
  )
}
