import { motion, useMotionValue, animate } from 'framer-motion'
import type { PanInfo } from 'framer-motion'
import type { BlendedOccupancy, Building, HourlyPrediction } from '@/types'
import { isOpenNow } from '@/lib/buildingHours'
import { BUILDING_META } from '@/constants/buildingMeta'
import OccupancyBar from './OccupancyBar'
import OccupancyBadge from './OccupancyBadge'
import TrendArrow from './TrendArrow'
import DataSourceBadge from './DataSourceBadge'
import FloorBreakdown from './FloorBreakdown'
import NoiseIndicator from './NoiseIndicator'
import FavouriteButton from './FavouriteButton'
import PredictionSection from './PredictionSection'
import PhotoCarousel from './PhotoCarousel'
import TipsList from './TipsList'
import { getActiveAmenities } from './AmenityChip'

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
}

const SPRING = { type: 'spring' as const, stiffness: 280, damping: 28 }

export default function BuildingCard({
  building, occupancy, predictions, onDismiss, onReport,
  reportCount = 0, noiseLevel, noiseCount, isFavourite, onToggleFavourite,
}: BuildingCardProps) {
  const y = useMotionValue(0)

  function handleDragEnd(_: never, info: PanInfo) {
    if (info.offset.y > 100 || info.velocity.y > 400) {
      onDismiss()
    } else {
      animate(y, 0, SPRING)
    }
  }

  const status = isOpenNow(building)
  const amenities = getActiveAmenities(building)
  const meta = BUILDING_META[building.slug]
  const pct = occupancy?.pct ?? null
  const trend = occupancy?.trend ?? 'stable'
  const floors = occupancy?.floor_occupancies ?? []

  return (
    <>
      {/* Overlay */}
      <motion.div
        style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.25)', zIndex: 90 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onDismiss}
      />

      {/* Card */}
      <motion.div
        style={{
          position: 'fixed', left: 0, right: 0, bottom: 0, y,
          height: '65vh', zIndex: 100,
          backgroundColor: '#F0F2F5',
          borderTopLeftRadius: 20, borderTopRightRadius: 20,
          boxShadow: '0 -8px 40px rgba(0,0,0,0.12)',
          overflowY: 'auto',
        }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 300 }}
        dragElastic={0.15}
        onDragEnd={handleDragEnd}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={SPRING}
      >
        {/* Sticky header: drag handle + actions */}
        <div style={{
          position: 'sticky', top: 0, zIndex: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 20px 8px',
          backgroundColor: '#F0F2F5',
          borderTopLeftRadius: 20, borderTopRightRadius: 20,
        }}>
          {onToggleFavourite ? (
            <FavouriteButton isFavourite={isFavourite ?? false} onToggle={onToggleFavourite} />
          ) : <div />}
          <div style={{ width: 36, height: 4, borderRadius: 2, backgroundColor: '#CBD5E1', cursor: 'grab' }} />
          <button
            onClick={onDismiss}
            aria-label="Close"
            style={{
              width: 40, height: 40, borderRadius: 20, border: 'none',
              backgroundColor: '#E2E6EB', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1E293B" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '0 20px 32px', display: 'flex', flexDirection: 'column', gap: 14 }}>

          {/* Building name + address */}
          <div style={{ padding: 16, borderRadius: 14, backgroundColor: '#FFFFFF', border: '2px solid rgba(0,56,101,0.18)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: '#1E293B', lineHeight: 1.2, margin: 0 }}>{building.name}</h2>
            {meta && (
              <span style={{ display: 'inline-block', fontSize: 11, padding: '3px 10px', borderRadius: 6, backgroundColor: '#EDF0F4', color: '#64748B', marginTop: 6 }}>
                {meta.address}
              </span>
            )}
            {meta ? (
              <p style={{ fontSize: 14, color: '#64748B', marginTop: 8, lineHeight: 1.6, marginBottom: 0 }}>{meta.description}</p>
            ) : (
              <p style={{ fontSize: 13, color: '#64748B', marginTop: 4, marginBottom: 0 }}>University of Melbourne - Parkville</p>
            )}
          </div>

          {/* Occupancy container */}
          <div style={{ padding: 16, borderRadius: 14, backgroundColor: '#FFFFFF', border: '2px solid rgba(0,56,101,0.18)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <OccupancyBar pct={pct} height={8} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
              <OccupancyBadge pct={pct} />
              <TrendArrow trend={trend} />
            </div>
            {noiseLevel != null && noiseCount != null && noiseCount > 0 && (
              <div style={{ marginTop: 8 }}>
                <NoiseIndicator level={noiseLevel} count={noiseCount} />
              </div>
            )}
          </div>

          {/* Status + capacity container */}
          <div style={{ padding: 14, borderRadius: 14, backgroundColor: '#FFFFFF', border: '2px solid rgba(0,56,101,0.18)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: status.open ? '#4CAF7D' : '#E05252' }} />
              <span style={{ fontSize: 13, color: '#64748B' }}>
                {status.open ? `Open - Closes ${status.closesAt}` : status.opensAt ? `Closed - Opens ${status.opensAt}` : 'Closed'}
              </span>
            </div>
            {building.estimated_capacity && (
              <p style={{ fontSize: 13, color: '#94A3B8', margin: 0 }}>Capacity: ~{building.estimated_capacity} people</p>
            )}
            {occupancy && <DataSourceBadge source={occupancy.source} />}
          </div>

          {/* Amenities container */}
          {amenities.length > 0 && (
            <div style={{ padding: 14, borderRadius: 14, backgroundColor: '#FFFFFF', border: '2px solid rgba(0,56,101,0.18)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <h3 style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', letterSpacing: '1px', marginBottom: 10, margin: '0 0 10px' }}>AMENITIES</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {amenities.map((a) => (
                  <span key={a.label} style={{ fontSize: 11, padding: '3px 10px', borderRadius: 6, backgroundColor: '#FFFFFF', color: '#64748B', border: '1px solid #EDF0F4' }}>
                    {a.label}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Photos */}
          {meta?.photos && meta.photos.length > 0 && (
            <div style={{ padding: 14, borderRadius: 14, backgroundColor: '#FFFFFF', border: '2px solid rgba(0,56,101,0.18)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <h3 style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', letterSpacing: '1px', margin: '0 0 10px' }}>PHOTOS</h3>
              <PhotoCarousel photos={meta.photos} alt={building.name} />
            </div>
          )}

          {/* Floor breakdown */}
          {floors.length > 0 && (
            <div style={{ padding: 14, borderRadius: 14, backgroundColor: '#FFFFFF', border: '2px solid rgba(0,56,101,0.18)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <FloorBreakdown floors={floors} />
            </div>
          )}

          {/* Predictions container */}
          {predictions && predictions.length > 0 && (
            <div style={{ padding: 14, borderRadius: 14, backgroundColor: '#FFFFFF', border: '2px solid rgba(0,56,101,0.18)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <PredictionSection predictions={predictions} />
            </div>
          )}

          {/* Tips */}
          {meta?.tips && meta.tips.length > 0 && (
            <div style={{ padding: 14, borderRadius: 14, backgroundColor: '#FFFFFF', border: '2px solid rgba(0,56,101,0.18)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <h3 style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', letterSpacing: '1px', margin: '0 0 10px' }}>TIPS</h3>
              <TipsList tips={meta.tips} />
            </div>
          )}

          {/* Nearby food */}
          {meta?.nearbyFood && meta.nearbyFood.length > 0 && (
            <div style={{ padding: 14, borderRadius: 14, backgroundColor: '#FFFFFF', border: '2px solid rgba(0,56,101,0.18)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <h3 style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', letterSpacing: '1px', margin: '0 0 10px' }}>NEARBY FOOD</h3>
              {meta.nearbyFood.map((food, i) => (
                <p key={i} style={{ fontSize: 13, color: '#64748B', lineHeight: 1.6, marginBottom: 4 }}>- {food}</p>
              ))}
            </div>
          )}

          {/* Report button */}
          {onReport && (
            <button
              onClick={onReport}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                width: '100%', padding: '14px 16px',
                borderRadius: 14, backgroundColor: '#FFFFFF', border: '2px solid rgba(0,56,101,0.18)',
                fontSize: 14, color: '#64748B', cursor: 'pointer',
              }}
            >
              <span>How busy is it? Report now</span>
              {reportCount > 0 && (
                <span style={{ fontSize: 12, padding: '2px 8px', borderRadius: 12, backgroundColor: '#003865', color: '#FFFFFF' }}>
                  {reportCount}
                </span>
              )}
            </button>
          )}

          {/* Directions button */}
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${building.entrance_lat},${building.entrance_lng}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '100%', padding: '14px 0',
              borderRadius: 14, backgroundColor: '#003865', color: '#FFFFFF',
              fontSize: 15, fontWeight: 600, textDecoration: 'none',
            }}
          >
            Directions
          </a>
        </div>
      </motion.div>
    </>
  )
}
