import { useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Map from '@/components/Map'
import StaleDataBanner from '@/components/StaleDataBanner'
import ReportSheet from '@/components/ReportSheet'
import { useBuildings } from '@/hooks/useBuildings'
import { useZones } from '@/hooks/useZones'
import { useGeolocation } from '@/hooks/useGeolocation'
import { usePositionBroadcast } from '@/hooks/usePositionBroadcast'
import { useBlendedOccupancy } from '@/hooks/useBlendedOccupancy'
import { useBuildingCard } from '@/hooks/useBuildingCard'
import { useRecentReports } from '@/hooks/useRecentReports'
import { useCrowdReporting } from '@/hooks/useCrowdReporting'
import { useBatchedOccupancy } from '@/hooks/useBatchedOccupancy'
import { useBuildingSheetData } from '@/hooks/useBuildingSheetData'
import { useBuildingSelection } from '@/hooks/useBuildingSelection'
import { useFavourites } from '@/hooks/useFavourites'
import { detectZone } from '@/lib/zoneDetection'
import { getDominantDataSource, getLatestUpdate } from '@/lib/occupancyHelpers'
import FindPanel from '@/components/FindPanel'
import MapBuildingSheet from '@/components/MapBuildingSheet'
import MapOverlays from '@/components/MapOverlays'

export default function MapPage() {
  const { buildings, error } = useBuildings()
  const { zones } = useZones()
  const { position, isWatching } = useGeolocation()
  const { occupancyMap: liveOccupancy, allTypicalRows, allPredictionRows } =
    useBlendedOccupancy(buildings, zones)
  const reportsMap = useRecentReports()
  const { toggle: toggleFavourite, isFavourite } = useFavourites()
  const report = useCrowdReporting(buildings, position)
  const { selectedId: selectedBuildingId, select, clear } = useBuildingSelection()

  /*
   * PRD § 12.5 specifies a `/find` route; commit daf18af replaced it with a
   * panel over the map without updating the spec, and the plan claimed a
   * FindPage.tsx that has never existed (see MASTERPLAN S10.1).
   *
   * Resolved in favour of both: the panel stays — on a phone, sliding it over
   * the map beats a full navigation away from the thing you are choosing
   * between — and `/find` renders this same page with it already open, so the
   * route is real, deep-linkable and shareable.
   */
  const isFindRoute = useLocation().pathname === '/find'
  const [showFind, setShowFind] = useState(isFindRoute)

  // Batched to one visual pass per 5s, and frozen entirely while a card is
  // open — MOTION.md forbids the map reflowing under something being read.
  const { occupancyMap, isChanging } = useBatchedOccupancy(
    liveOccupancy,
    selectedBuildingId !== null,
  )

  const { building: selectedBuilding, occupancy: selectedOccupancy } = useBuildingCard(
    selectedBuildingId, buildings, occupancyMap,
  )

  const zoneId = useMemo(
    () => position && zones.length > 0 ? detectZone(position, zones) : null,
    [position, zones],
  )

  usePositionBroadcast({
    zoneId,
    campusSlug: 'unimelb',
    enabled: isWatching && zones.length > 0,
  })

  const { predictions, noise } = useBuildingSheetData(
    selectedBuildingId, allPredictionRows, allTypicalRows, reportsMap,
  )

  const dominantSource = useMemo(() => getDominantDataSource(occupancyMap), [occupancyMap])
  const latestUpdate = useMemo(() => getLatestUpdate(occupancyMap), [occupancyMap])


  if (error) {
    return (
      <div
        className="mono h-full w-full flex items-center justify-center p-6 text-center text-sm"
        style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text-secondary)' }}
        role="alert"
      >
        <p>&gt; could not load buildings — {error}</p>
      </div>
    )
  }

  return (
    <div className="h-full w-full relative">
      <StaleDataBanner lastUpdated={latestUpdate} />
      <Map
        buildings={buildings}
        occupancyMap={occupancyMap}
        onBuildingClick={select}
        isChanging={isChanging}
      />
      <MapOverlays
        occupancyMap={occupancyMap}
        dominantSource={dominantSource}
        lastUpdated={latestUpdate}
        visible={!selectedBuilding && !showFind}
        onFind={() => setShowFind(true)}
        onReport={report.reportNearest}
      />

      {/* Find panel */}
      <FindPanel
        visible={showFind}
        onDismiss={() => setShowFind(false)}
        buildings={buildings}
        occupancyMap={occupancyMap}
        userPosition={position}
        onBuildingSelect={select}
      />
      <MapBuildingSheet
        building={selectedBuilding}
        occupancy={selectedOccupancy}
        predictions={predictions}
        reportCount={occupancyMap.get(selectedBuildingId ?? '')?.source === 'crowd-report' ? 1 : 0}
        noiseLevel={noise?.level ?? null}
        noiseCount={noise?.count}
        isFavourite={selectedBuildingId ? isFavourite(selectedBuildingId) : false}
        onToggleFavourite={() => { if (selectedBuildingId) toggleFavourite(selectedBuildingId) }}
        onDismiss={clear}
        onReport={report.reportBuilding}
      />
      <AnimatePresence>
        {report.target && (
          <ReportSheet
            building={report.target}
            canReport={report.canReport(report.target.id)}
            isSubmitting={report.isSubmitting}
            confirmed={report.confirmed}
            error={report.error}
            onSubmit={report.handleSubmit}
            onDismiss={report.dismiss}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
