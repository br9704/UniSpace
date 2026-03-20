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
    <div style={{ padding: 22, backgroundColor: '#FFFFFF', borderRadius: 20, border: '1px solid rgba(0,56,101,0.06)', boxShadow: '0 4px 20px rgba(0,56,101,0.06)' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
        <div>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: '#1E293B' }}>{building.name}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
            <span style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: status.open ? '#4CAF7D' : '#E05252' }} />
            <span style={{ fontSize: 13, color: '#64748B' }}>
              {status.open ? `Open · Closes ${status.closesAt}` : 'Officially closed · Keycard access'}
            </span>
          </div>
        </div>
        {walk_minutes !== null && (
          <span style={{ fontSize: 13, fontWeight: 500, padding: '4px 12px', borderRadius: 8, backgroundColor: '#F0F2F5', color: '#64748B' }}>
            ~{Math.round(walk_minutes)} min
          </span>
        )}
      </div>

      {/* Occupancy */}
      <OccupancyBar pct={occupancy.pct} height={7} className="mb-3" />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
        <OccupancyBadge pct={occupancy.pct} />
        <TrendArrow trend={occupancy.trend} size={18} />
      </div>

      {/* Amenities */}
      {amenities.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 14 }}>
          {amenities.map((a) => (
            <span key={a.label} style={{ fontSize: 12, padding: '4px 10px', borderRadius: 8, backgroundColor: '#F0F2F5', color: '#64748B' }}>{a.label}</span>
          ))}
        </div>
      )}

      {/* Action */}
      <a
        href={`https://www.google.com/maps/dir/?api=1&destination=${building.entrance_lat},${building.entrance_lng}`}
        target="_blank" rel="noopener noreferrer"
        style={{ display: 'block', textAlign: 'center', padding: '12px 0', borderRadius: 12, fontSize: 15, fontWeight: 600, backgroundColor: '#003865', color: '#FFFFFF', textDecoration: 'none', marginTop: 16 }}
      >
        Get Directions
      </a>
    </div>
  )
}
