import { lazy, Suspense } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useWebPush } from '@/hooks/useWebPush'
import { useAlerts } from '@/hooks/useAlerts'
import type { BlendedOccupancy, Building, HourlyPrediction } from '@/types'

// Kept out of the initial bundle: the card only exists once a building is
// tapped, and it pulls in Recharts.
const BuildingCard = lazy(() => import('@/components/BuildingCard'))

interface MapBuildingSheetProps {
  building: Building | null
  occupancy: BlendedOccupancy | null
  predictions: HourlyPrediction[]
  reportCount: number
  noiseLevel: number | null
  noiseCount?: number
  isFavourite: boolean
  onToggleFavourite: () => void
  onDismiss: () => void
  onReport: (building: Building) => void
}

/**
 * The building detail sheet, plus the push/alert wiring it needs.
 *
 * Alerts and Web Push are owned here rather than by MapPage because nothing
 * else on the map uses them — keeping them alongside their only consumer stops
 * the page component from accumulating concerns it does not act on.
 */
export default function MapBuildingSheet({
  building,
  occupancy,
  predictions,
  reportCount,
  noiseLevel,
  noiseCount,
  isFavourite,
  onToggleFavourite,
  onDismiss,
  onReport,
}: MapBuildingSheetProps) {
  const {
    isSupported: pushSupported,
    permission: notifPermission,
    subscription: pushSub,
    subscribe: subscribePush,
  } = useWebPush()
  const { createAlert, deleteAlert, getAlertForBuilding } = useAlerts(pushSub)

  return (
    <AnimatePresence>
      {building && (
        <Suspense fallback={null}>
          <BuildingCard
            key={building.id}
            building={building}
            occupancy={occupancy}
            predictions={predictions}
            onDismiss={onDismiss}
            onReport={() => onReport(building)}
            reportCount={reportCount}
            noiseLevel={noiseLevel}
            noiseCount={noiseCount}
            isFavourite={isFavourite}
            onToggleFavourite={onToggleFavourite}
            existingAlert={getAlertForBuilding(building.id)}
            onCreateAlert={async (threshold) => { await createAlert(building.id, threshold) }}
            onDeleteAlert={async (id) => { await deleteAlert(id) }}
            onRequestPermission={async () => { await subscribePush() }}
            notificationPermission={notifPermission}
            pushSupported={pushSupported}
          />
        </Suspense>
      )}
    </AnimatePresence>
  )
}
