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
        {/* Top bar: drag handle + close button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px 20px 8px', position: 'relative' }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, backgroundColor: '#CBD5E1' }} className="cursor-grab active:cursor-grabbing" />
          <button
            onClick={onDismiss}
            style={{ position: 'absolute', right: 16, top: 10, width: 32, height: 32, borderRadius: 16, backgroundColor: '#F0F2F5', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <div style={{ padding: '0 20px 20px' }}>
          {/* Collapsed content */}
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1E293B' }}>{building.name}</h2>
          <p style={{ fontSize: 13, color: '#64748B', marginTop: 2 }}>University of Melbourne · Parkville</p>

          <div style={{ marginTop: 14 }}><OccupancyBar pct={pct} height={8} /></div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
            <OccupancyBadge pct={pct} />
            <TrendArrow trend={trend} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10 }}>
            <span style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: status.open ? '#4CAF7D' : '#E05252' }} />
            <span style={{ fontSize: 13, color: '#64748B' }}>
              {status.open ? `Open · Closes ${status.closesAt}` : status.opensAt ? `Officially closed · Opens ${status.opensAt} · Keycard access may be available` : 'Officially closed · Keycard access may be available'}
            </span>
          </div>

          {building.estimated_capacity && (
            <p style={{ fontSize: 13, color: '#94A3B8', marginTop: 6 }}>Capacity: ~{building.estimated_capacity} people</p>
          )}

          {/* Amenity chips always visible */}
          {amenities.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
              {amenities.map((a) => (
                <span key={a.label} style={{ fontSize: 12, padding: '3px 10px', borderRadius: 8, backgroundColor: '#F0F2F5', color: '#64748B' }}>{a.label}</span>
              ))}
            </div>
          )}

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

              {/* Quick Links */}
              <div style={{ marginTop: 16 }}>
                <h3 style={{ fontSize: 12, fontWeight: 700, color: '#94A3B8', letterSpacing: '0.5px', marginBottom: 10 }}>QUICK LINKS</h3>
                <a href={`https://www.google.com/maps/dir/?api=1&destination=${building.entrance_lat},${building.entrance_lng}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderRadius: 12, backgroundColor: '#FAFBFD', border: '1px solid #EDF0F4', textDecoration: 'none', marginBottom: 8, fontSize: 14, color: '#1E293B', fontWeight: 500 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#003865" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  Get Directions
                </a>
                <a href={`https://maps.unimelb.edu.au/parkville/building`}
                  target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderRadius: 12, backgroundColor: '#FAFBFD', border: '1px solid #EDF0F4', textDecoration: 'none', marginBottom: 8, fontSize: 14, color: '#1E293B', fontWeight: 500 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#003865" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/></svg>
                  Building Info
                </a>
              </div>

              {/* Main Action */}
              <a href={`https://www.google.com/maps/dir/?api=1&destination=${building.entrance_lat},${building.entrance_lng}`}
                target="_blank" rel="noopener noreferrer"
                style={{ display: 'block', textAlign: 'center', padding: '14px 0', borderRadius: 14, fontSize: 16, fontWeight: 600, backgroundColor: '#003865', color: '#FFFFFF', textDecoration: 'none', marginTop: 16 }}>
                Navigate to {building.short_name || building.name}
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </>
  )
}
