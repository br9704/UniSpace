import { motion, useMotionValue, animate } from 'framer-motion'
import type { PanInfo } from 'framer-motion'
import type { BlendedOccupancy, Building, HourlyPrediction, UserAlert } from '@/types'
import BuildingCardHeader from './BuildingCardHeader'
import BuildingCardSummary from './BuildingCardSummary'
import BuildingCardDetails from './BuildingCardDetails'

interface BuildingCardProps {
  building: Building
  occupancy: BlendedOccupancy | null
  predictions?: HourlyPrediction[]
  onDismiss: () => void
  onReport?: () => void
  reportCount?: number
  noiseLevel?: number | null
  noiseCount?: number
  isFavourite?: boolean
  onToggleFavourite?: () => void
  existingAlert?: UserAlert
  onCreateAlert?: (threshold: number) => Promise<void>
  onDeleteAlert?: (alertId: string) => Promise<void>
  onRequestPermission?: () => Promise<void>
  notificationPermission?: NotificationPermission
  pushSupported?: boolean
}

/** Ease-out, 280ms. SIGNAL permits no spring or bounce anywhere. */
const SHEET_TRANSITION = { duration: 0.28, ease: [0.16, 1, 0.3, 1] as const }

/**
 * The building detail sheet.
 *
 * A shell: drag-to-dismiss, the overlay, and the scroll container. Content is
 * split across header / summary / details so each stays readable and this file
 * stays about behaviour rather than layout.
 */
export default function BuildingCard({
  building,
  occupancy,
  predictions,
  onDismiss,
  onReport,
  reportCount = 0,
  noiseLevel,
  noiseCount,
  isFavourite = false,
  onToggleFavourite,
  existingAlert,
  onCreateAlert,
  onDeleteAlert,
  onRequestPermission,
  notificationPermission = 'default',
  pushSupported = false,
}: BuildingCardProps) {
  const y = useMotionValue(0)

  function handleDragEnd(_: never, info: PanInfo) {
    // Distance or flick — either should dismiss, so a quick swipe works without
    // having to drag the sheet all the way down.
    if (info.offset.y > 100 || info.velocity.y > 400) {
      onDismiss()
    } else {
      animate(y, 0, SHEET_TRANSITION)
    }
  }

  return (
    <>
      <motion.div
        style={{ position: 'fixed', inset: 0, backgroundColor: 'var(--color-bg-overlay)', zIndex: 90 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onDismiss}
      />

      <motion.div
        role="dialog"
        aria-label={building.name}
        style={{
          position: 'fixed', left: 0, right: 0, bottom: 0, y,
          height: '72vh', zIndex: 100,
          maxWidth: 480, marginInline: 'auto',
          backgroundColor: 'var(--color-bg)',
          borderTop: '1px solid var(--color-steel)',
          overflowY: 'auto',
        }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 300 }}
        dragElastic={0.15}
        onDragEnd={handleDragEnd}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={SHEET_TRANSITION}
      >
        <BuildingCardHeader
          buildingId={building.id}
          buildingName={building.name}
          isFavourite={isFavourite}
          onToggleFavourite={onToggleFavourite}
          onDismiss={onDismiss}
        />

        <div className="flex flex-col gap-3 px-4 pb-8">
          <BuildingCardSummary
            building={building}
            occupancy={occupancy}
            noiseLevel={noiseLevel}
            noiseCount={noiseCount}
          />

          <BuildingCardDetails
            building={building}
            floors={occupancy?.floor_occupancies ?? []}
            predictions={predictions}
            currentPct={occupancy?.pct ?? null}
            onReport={onReport}
            reportCount={reportCount}
            existingAlert={existingAlert}
            onCreateAlert={onCreateAlert}
            onDeleteAlert={onDeleteAlert}
            onRequestPermission={onRequestPermission}
            notificationPermission={notificationPermission}
            pushSupported={pushSupported}
          />
        </div>
      </motion.div>
    </>
  )
}
