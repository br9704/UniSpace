import type { Building, FloorOccupancy, HourlyPrediction, UserAlert } from '@/types'
import { BUILDING_META } from '@/constants/buildingMeta'
import Card from './ui/Card'
import SectionLabel from './SectionLabel'
import FloorBreakdown from './FloorBreakdown'
import PredictionSection from './PredictionSection'
import PhotoCarousel from './PhotoCarousel'
import TipsList from './TipsList'
import AlertSetup from './AlertSetup'
import Button from './ui/Button'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import FeedbackSheet from './FeedbackSheet'
import TerminalList from './TerminalList'
import RoomList from './RoomList'
import { useRooms } from '@/hooks/useRooms'

interface BuildingCardDetailsProps {
  building: Building
  floors: FloorOccupancy[]
  predictions?: HourlyPrediction[]
  currentPct: number | null
  onReport?: () => void
  reportCount: number
  existingAlert?: UserAlert
  onCreateAlert?: (threshold: number) => Promise<void>
  onDeleteAlert?: (alertId: string) => Promise<void>
  onRequestPermission?: () => Promise<void>
  notificationPermission: NotificationPermission
  pushSupported: boolean
}

/** Everything below the fold of the building sheet. */
export default function BuildingCardDetails({
  building,
  floors,
  predictions,
  currentPct,
  onReport,
  reportCount,
  existingAlert,
  onCreateAlert,
  onDeleteAlert,
  onRequestPermission,
  notificationPermission,
  pushSupported,
}: BuildingCardDetailsProps) {
  const meta = BUILDING_META[building.slug]
  const [reportingError, setReportingError] = useState(false)
  const { rooms } = useRooms()
  const buildingRooms = rooms.filter((room) => room.building_id === building.id)

  return (
    <>
      {floors.length > 0 && (
        <Card>
          <FloorBreakdown floors={floors} />
        </Card>
      )}

      <RoomList rooms={buildingRooms} />

      {predictions && predictions.length > 0 && (
        <Card>
          <PredictionSection predictions={predictions} />
        </Card>
      )}

      {meta?.photos && meta.photos.length > 0 && (
        <Card>
          <SectionLabel className="mb-3">photos</SectionLabel>
          <PhotoCarousel photos={meta.photos} alt={building.name} />
        </Card>
      )}

      {meta?.tips && meta.tips.length > 0 && (
        <Card>
          <SectionLabel className="mb-3">tips</SectionLabel>
          <TipsList tips={meta.tips} />
        </Card>
      )}

      {meta?.nearbyFood && meta.nearbyFood.length > 0 && (
        <Card>
          <SectionLabel className="mb-3">nearby food</SectionLabel>
          <TerminalList items={meta.nearbyFood} />
        </Card>
      )}

      {onCreateAlert && onDeleteAlert && onRequestPermission && (
        <AlertSetup
          buildingName={building.short_name || building.name}
          currentPct={currentPct}
          existingAlert={existingAlert}
          permissionState={notificationPermission}
          isSupported={pushSupported}
          onCreateAlert={onCreateAlert}
          onDeleteAlert={onDeleteAlert}
          onRequestPermission={onRequestPermission}
        />
      )}

      {onReport && (
        <Button variant="secondary" size="lg" className="w-full" onClick={onReport}>
          <span>HOW BUSY IS IT? REPORT</span>
          {reportCount > 0 && (
            <span style={{ color: 'var(--color-amber)' }}>[{reportCount}]</span>
          )}
        </Button>
      )}

      <Button
        as="a"
        variant="primary"
        size="lg"
        className="w-full"
        href={`https://www.google.com/maps/dir/?api=1&destination=${building.entrance_lat},${building.entrance_lng}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        DIRECTIONS →
      </Button>

      {/*
        Deliberately present on every building, not buried in a settings screen.
        This data is manually maintained and will be wrong sometimes; PRD § 13.4
        treats wrong accessibility data as harmful rather than merely
        inaccurate, so the correction path has to be where the error is seen.
      */}
      <Button variant="ghost" size="sm" className="w-full" onClick={() => setReportingError(true)}>
        [ REPORT AN ERROR ]
      </Button>

      <AnimatePresence>
        {reportingError && (
          <FeedbackSheet
            buildingId={building.id}
            buildingName={building.name}
            onDismiss={() => setReportingError(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
