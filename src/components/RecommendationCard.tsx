import type { RankedBuilding } from '@/types'
import { isOpenNow } from '@/lib/buildingHours'
import OccupancyBar from './OccupancyBar'
import OccupancyBadge from './OccupancyBadge'
import TrendArrow from './TrendArrow'
import { getActiveAmenities } from './AmenityChip'

interface RecommendationCardProps {
  ranked: RankedBuilding
}

export default function RecommendationCard({ ranked }: RecommendationCardProps) {
  const { building, occupancy, walk_minutes } = ranked
  const status = isOpenNow(building)
  const amenities = getActiveAmenities(building)

  return (
    <div
      className="p-4 rounded-xl"
      style={{ backgroundColor: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-card)' }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>{building.name}</h3>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: status.open ? 'var(--color-empty)' : 'var(--color-packed)' }} />
            <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
              {status.open ? `Open · Closes ${status.closesAt}` : 'Closed'}
            </span>
          </div>
        </div>
        {walk_minutes !== null && (
          <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text-secondary)' }}>
            ~{Math.round(walk_minutes)} min
          </span>
        )}
      </div>

      {/* Occupancy */}
      <OccupancyBar pct={occupancy.pct} className="mb-2" />
      <div className="flex items-center justify-between mb-3">
        <OccupancyBadge pct={occupancy.pct} />
        <TrendArrow trend={occupancy.trend} size={16} />
      </div>

      {/* Amenities */}
      {amenities.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {amenities.slice(0, 4).map((a) => (
            <span key={a.label} className="text-xs px-1.5 py-0.5 rounded" style={{ backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text-secondary)' }}>
              {a.label}
            </span>
          ))}
        </div>
      )}

      {/* Action */}
      <a
        href={`https://www.google.com/maps/dir/?api=1&destination=${building.entrance_lat},${building.entrance_lng}`}
        target="_blank" rel="noopener noreferrer"
        className="block text-center py-2 rounded-lg text-sm font-medium"
        style={{ backgroundColor: 'var(--color-uom-navy)', color: '#FFFFFF' }}
      >
        Get Directions
      </a>
    </div>
  )
}
