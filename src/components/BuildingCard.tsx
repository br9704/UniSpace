import { useState } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import type { PanInfo } from 'framer-motion'
import type { BlendedOccupancy, Building } from '@/types'
import FloorBreakdown from './FloorBreakdown'
import { isOpenNow } from '@/lib/buildingHours'
import OccupancyBar from './OccupancyBar'
import OccupancyBadge from './OccupancyBadge'
import TrendArrow from './TrendArrow'
import DataSourceBadge from './DataSourceBadge'
import AmenityChip, { getActiveAmenities } from './AmenityChip'

interface BuildingCardProps {
  building: Building
  occupancy: BlendedOccupancy | null
  onDismiss: () => void
}

const COLLAPSED = 220
const SPRING = { type: 'spring' as const, stiffness: 280, damping: 28 }

export default function BuildingCard({ building, occupancy, onDismiss }: BuildingCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const y = useMotionValue(0)
  const expandedH = typeof window !== 'undefined' ? window.innerHeight * 0.75 : 500
  const bgOpacity = useTransform(y, [-expandedH + COLLAPSED, 0], [0.6, 0])

  const status = isOpenNow(building)
  const amenities = getActiveAmenities(building)
  const pct = occupancy?.pct ?? null
  const trend = occupancy?.trend ?? 'stable'
  const floors = occupancy?.floor_occupancies ?? []
  // quietestFloor logic moved to FloorBreakdown component

  function handleDragEnd(_: never, info: PanInfo) {
    const offset = info.offset.y
    const velocity = info.velocity.y
    if (offset > 80 || velocity > 500) {
      onDismiss()
    } else if (offset < -60 || velocity < -300) {
      setIsExpanded(true)
      animate(y, -(expandedH - COLLAPSED), SPRING)
    } else {
      setIsExpanded(false)
      animate(y, 0, SPRING)
    }
  }

  return (
    <>
      {/* Overlay */}
      <motion.div
        className="fixed inset-0"
        style={{ backgroundColor: 'rgba(0,0,0,0.3)', opacity: bgOpacity, pointerEvents: isExpanded ? 'auto' : 'none', zIndex: 90 }}
        onClick={() => { setIsExpanded(false); animate(y, 0, SPRING) }}
      />

      {/* Card */}
      <motion.div
        className="fixed left-0 right-0 overflow-y-auto"
        style={{
          bottom: 0, y, height: expandedH, zIndex: 100,
          backgroundColor: 'var(--color-bg-elevated)',
          borderTopLeftRadius: 'var(--radius-lg)', borderTopRightRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-elevated)',
        }}
        drag="y"
        dragConstraints={{ top: -(expandedH - COLLAPSED), bottom: COLLAPSED }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        initial={{ y: COLLAPSED }}
        animate={{ y: 0 }}
        exit={{ y: COLLAPSED + 50 }}
        transition={SPRING}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing">
          <div className="w-9 h-1 rounded-full" style={{ backgroundColor: 'var(--color-border)' }} />
        </div>

        <div className="px-4 pb-4">
          {/* Collapsed content */}
          <h2 className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>{building.name}</h2>

          <div className="mt-2"><OccupancyBar pct={pct} /></div>

          <div className="flex items-center justify-between mt-2">
            <OccupancyBadge pct={pct} />
            <TrendArrow trend={trend} />
          </div>

          <div className="flex items-center gap-1.5 mt-2 text-xs">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: status.open ? 'var(--color-empty)' : 'var(--color-packed)' }} />
            <span style={{ color: 'var(--color-text-secondary)' }}>
              {status.open ? `Open · Closes ${status.closesAt}` : status.opensAt ? `Closed · Opens ${status.opensAt}` : 'Closed today'}
            </span>
          </div>

          {/* Expanded content */}
          {isExpanded && (
            <div className="mt-4 border-t pt-4" style={{ borderColor: 'var(--color-border)' }}>
              {occupancy && <div className="mb-3"><DataSourceBadge source={occupancy.source} /></div>}

              <FloorBreakdown floors={floors} />

              {amenities.length > 0 && (<div className="mb-4">
                <h3 className="text-xs font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>Amenities</h3>
                <div className="flex flex-wrap gap-1.5">
                  {amenities.map((a) => <AmenityChip key={a.label} icon={a.icon} label={a.label} />)}
                </div>
              </div>)}

              {/* Actions */}
              <div className="flex gap-2 mt-4">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${building.entrance_lat},${building.entrance_lng}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex-1 text-center py-2 rounded-full text-sm font-medium"
                  style={{ backgroundColor: 'var(--color-uom-blue)', color: 'var(--color-text-primary)' }}
                >
                  Navigate
                </a>
                <button
                  className="flex-1 py-2 rounded-full text-sm font-medium"
                  style={{ backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-uom-gold)', border: '1px solid var(--color-border)' }}
                  onClick={() => console.log('[Pulse] Alert for:', building.name)}
                >
                  Alert
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </>
  )
}
