import { useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
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
import MapSurface from '@/components/MapSurface'
import LoadFailure from '@/components/LoadFailure'
import BuildingListFallback from '@/components/BuildingListFallback'

export default function MapPage() {
  const { buildings, error } = useBuildings()
  const { zones } = useZones()
  const { position, isWatching, error: geoError } = useGeolocation()
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


  // No Mapbox token means no tiles, but the occupancy data is unaffected — so
  // fall back to the list rather than showing an empty screen. PRD § 6.1.
  const mapUnavailable = !import.meta.env.VITE_MAPBOX_TOKEN && buildings.length > 0

  if (error || mapUnavailable) {
    return error ? (
      <LoadFailure message={error} />
    ) : (
      <BuildingListFallback
        buildings={buildings}
        occupancyMap={occupancyMap}
        onSelect={select}
        reason="no Mapbox token configured"
      />
    )
  }

  return (
    <div className="h-full w-full relative">
      <MapSurface
        buildings={buildings}
        occupancyMap={occupancyMap}
        dominantSource={dominantSource}
        lastUpdated={latestUpdate}
        isChanging={isChanging}
        chromeVisible={!selectedBuilding && !showFind}
        hasPosition={position !== null}
        locationDenied={geoError?.code === 1}
        onSelect={select}
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
        // The real number of unexpired reports, not a boolean wearing a count.
        // This was `source === 'crowd-report' ? 1 : 0`, which rendered "[1]"
        // however many people had actually reported.
        reportCount={reportsMap.get(selectedBuildingId ?? '')?.length ?? 0}
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
