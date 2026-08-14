import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Map from '@/components/Map'
import DataSourcePill from '@/components/DataSourcePill'
import StaleDataBanner from '@/components/StaleDataBanner'
import ReportFAB from '@/components/ReportFAB'
import ReportSheet from '@/components/ReportSheet'
import { useBuildings } from '@/hooks/useBuildings'
import { useZones } from '@/hooks/useZones'
import { useGeolocation } from '@/hooks/useGeolocation'
import { usePositionBroadcast } from '@/hooks/usePositionBroadcast'
import { useBlendedOccupancy } from '@/hooks/useBlendedOccupancy'
import { useBuildingCard } from '@/hooks/useBuildingCard'
import { useRecentReports } from '@/hooks/useRecentReports'
import { useCrowdReporting } from '@/hooks/useCrowdReporting'
import { useFavourites } from '@/hooks/useFavourites'
import { detectZone } from '@/lib/zoneDetection'
import { getDominantDataSource, getLatestUpdate } from '@/lib/occupancyHelpers'
import { getDayPredictions } from '@/lib/predictionInsights'
import { aggregateNoise } from '@/lib/noiseAggregation'
import FindPanel from '@/components/FindPanel'
import FindTrigger from '@/components/FindTrigger'
import MapBuildingSheet from '@/components/MapBuildingSheet'

export default function MapPage() {
  const { buildings, error } = useBuildings()
  const { zones } = useZones()
  const { position, isWatching } = useGeolocation()
  const { occupancyMap, allTypicalRows, allPredictionRows } = useBlendedOccupancy(buildings, zones)
  const reportsMap = useRecentReports()
  const { toggle: toggleFavourite, isFavourite } = useFavourites()
  const report = useCrowdReporting(buildings, position)
  const [searchParams, setSearchParams] = useSearchParams()
  // A `?building=` deep link (from a Share link) seeds the selection directly,
  // rather than being copied into state by an effect after first paint.
  const [selectedBuildingId, setSelectedBuildingId] = useState<string | null>(
    () => searchParams.get('building'),
  )
  const [showFind, setShowFind] = useState(false)

  // Clear the param once consumed so dismissing the card doesn't reopen it, and
  // so the URL is shareable as the plain map. The router is an external system,
  // which is what an effect is for.
  useEffect(() => {
    if (searchParams.has('building')) setSearchParams({}, { replace: true })
  }, [searchParams, setSearchParams])

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

  const dayPredictions = useMemo(() => {
    if (!selectedBuildingId) return []
    return getDayPredictions(allPredictionRows, allTypicalRows, selectedBuildingId, new Date().getDay())
  }, [selectedBuildingId, allPredictionRows, allTypicalRows])

  const selectedNoise = useMemo(() => {
    if (!selectedBuildingId) return null
    return aggregateNoise(reportsMap.get(selectedBuildingId) ?? [])
  }, [selectedBuildingId, reportsMap])

  const dominantSource = useMemo(() => getDominantDataSource(occupancyMap), [occupancyMap])
  const latestUpdate = useMemo(() => getLatestUpdate(occupancyMap), [occupancyMap])

  const handleBuildingClick = useCallback((id: string) => {
    setSelectedBuildingId(id)
  }, [])

  const handleDismiss = useCallback(() => {
    setSelectedBuildingId(null)
  }, [])


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
      <Map buildings={buildings} occupancyMap={occupancyMap} onBuildingClick={handleBuildingClick} />
      <div className="absolute bottom-2 left-4" style={{ zIndex: 50 }}>
        <DataSourcePill source={dominantSource} lastUpdated={latestUpdate} />
      </div>
      <ReportFAB visible={!selectedBuilding && !showFind} onClick={report.reportNearest} />

      {!selectedBuilding && !showFind && <FindTrigger onClick={() => setShowFind(true)} />}

      {/* Find panel */}
      <FindPanel
        visible={showFind}
        onDismiss={() => setShowFind(false)}
        buildings={buildings}
        occupancyMap={occupancyMap}
        userPosition={position}
        onBuildingSelect={handleBuildingClick}
      />
      <MapBuildingSheet
        building={selectedBuilding}
        occupancy={selectedOccupancy}
        predictions={dayPredictions}
        reportCount={occupancyMap.get(selectedBuildingId ?? '')?.source === 'crowd-report' ? 1 : 0}
        noiseLevel={selectedNoise?.level ?? null}
        noiseCount={selectedNoise?.count}
        isFavourite={selectedBuildingId ? isFavourite(selectedBuildingId) : false}
        onToggleFavourite={() => { if (selectedBuildingId) toggleFavourite(selectedBuildingId) }}
        onDismiss={handleDismiss}
        onReport={report.reportBuilding}
      />
      <AnimatePresence>
        {report.target && (
          <ReportSheet
            building={report.target}
            canReport={report.canReport(report.target.id)}
            isSubmitting={report.isSubmitting}
            error={report.error}
            onSubmit={report.handleSubmit}
            onDismiss={report.dismiss}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
