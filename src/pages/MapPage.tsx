import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from 'react'
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
import { useReportSubmit } from '@/hooks/useReportSubmit'
import { useRecentReports } from '@/hooks/useRecentReports'
import { useFavourites } from '@/hooks/useFavourites'
import { detectZone } from '@/lib/zoneDetection'
import { getDominantDataSource, getLatestUpdate } from '@/lib/occupancyHelpers'
import { getDayPredictions } from '@/lib/predictionInsights'
import { aggregateNoise } from '@/lib/noiseAggregation'
import type { Building } from '@/types'

const BuildingCard = lazy(() => import('@/components/BuildingCard'))

export default function MapPage() {
  const { buildings, error } = useBuildings()
  const { zones } = useZones()
  const { position, isWatching } = useGeolocation()
  const { occupancyMap, allTypicalRows, allPredictionRows } = useBlendedOccupancy(buildings, zones)
  const { submit, isSubmitting, error: reportError, canReport } = useReportSubmit()
  const reportsMap = useRecentReports()
  const { toggle: toggleFavourite, isFavourite } = useFavourites()
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedBuildingId, setSelectedBuildingId] = useState<string | null>(null)
  const [reportTarget, setReportTarget] = useState<Building | null>(null)

  useEffect(() => {
    const bid = searchParams.get('building')
    if (bid && buildings.length > 0) {
      setSelectedBuildingId(bid)
      setSearchParams({}, { replace: true })
    }
  }, [searchParams, buildings, setSearchParams])

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

  const handleFABClick = useCallback(() => {
    if (!position || buildings.length === 0) return
    // Find nearest building to user position
    let nearest: Building | null = null
    let minDist = Infinity
    for (const b of buildings) {
      const lat = b.entrance_lat ?? b.centroid_lat
      const lng = b.entrance_lng ?? b.centroid_lng
      if (lat == null || lng == null) continue
      const d = (lat - position.latitude) ** 2 + (lng - position.longitude) ** 2
      if (d < minDist) { minDist = d; nearest = b }
    }
    if (nearest) setReportTarget(nearest)
  }, [position, buildings])

  const handleReportFromCard = useCallback((building: Building) => {
    setReportTarget(building)
  }, [])

  const handleReportSubmit = useCallback(async (level: import('@/types').ReportLevel, noise?: import('@/types').NoiseLevel) => {
    if (!reportTarget) return
    const success = await submit(reportTarget.id, level, noise)
    if (success) setReportTarget(null)
  }, [reportTarget, submit])

  if (error) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)]">
        <p>Failed to load buildings: {error}</p>
      </div>
    )
  }

  return (
    <div className="h-full w-full relative">
      <StaleDataBanner lastUpdated={latestUpdate} />
      <Map buildings={buildings} occupancyMap={occupancyMap} onBuildingClick={handleBuildingClick} />
      <div className="absolute bottom-2 left-4" style={{ zIndex: 50 }}>
        <DataSourcePill source={dominantSource} />
      </div>
      <ReportFAB visible={!selectedBuilding} onClick={handleFABClick} />
      <AnimatePresence>
        {selectedBuilding && (
          <Suspense fallback={null}>
            <BuildingCard
              key={selectedBuilding.id}
              building={selectedBuilding}
              occupancy={selectedOccupancy}
              predictions={dayPredictions}
              onDismiss={handleDismiss}
              onReport={() => handleReportFromCard(selectedBuilding)}
              reportCount={occupancyMap.get(selectedBuilding.id)?.source === 'crowd-report' ? 1 : 0}
              noiseLevel={selectedNoise?.level ?? null}
              noiseCount={selectedNoise?.count}
              isFavourite={isFavourite(selectedBuilding.id)}
              onToggleFavourite={() => toggleFavourite(selectedBuilding.id)}
            />
          </Suspense>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {reportTarget && (
          <ReportSheet
            building={reportTarget}
            canReport={canReport(reportTarget.id)}
            isSubmitting={isSubmitting}
            error={reportError}
            onSubmit={handleReportSubmit}
            onDismiss={() => setReportTarget(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
