import type { RankedBuilding } from '@/types'
import { isOpenNow } from '@/lib/buildingHours'
import OccupancyBar from './OccupancyBar'
import OccupancyBadge from './OccupancyBadge'
import TrendArrow from './TrendArrow'
import { getActiveAmenities } from './AmenityChip'
import Card from './ui/Card'
import StatusDot from './ui/StatusDot'
import Button from './ui/Button'

interface RecommendationCardProps {
  ranked: RankedBuilding
}

export default function RecommendationCard({ ranked }: RecommendationCardProps) {
  const { building, occupancy, walk_minutes } = ranked
  const status = isOpenNow(building)
  const amenities = getActiveAmenities(building)

  return (
    <Card>
      <div className="flex items-start justify-between mb-3.5">
        <div>
          <h3 className="text-[17px] font-bold text-[var(--color-text-primary)]">{building.name}</h3>
          <div className="flex items-center gap-1.5 mt-1">
            <StatusDot open={status.open} size={6} />
            <span className="text-[13px] text-[var(--color-text-secondary)]">
              {status.open ? `Open · Closes ${status.closesAt}` : 'Officially closed · Keycard access'}
            </span>
          </div>
        </div>
        {walk_minutes !== null && (
          <span className="text-[13px] font-medium px-3 py-1 rounded-lg bg-[var(--color-bg-chip)] text-[var(--color-text-secondary)]">
            ~{Math.round(walk_minutes)} min
          </span>
        )}
      </div>

      <OccupancyBar pct={occupancy.pct} height={7} className="mb-3" />
      <div className="flex items-center justify-between mt-2.5">
        <OccupancyBadge pct={occupancy.pct} />
        <TrendArrow trend={occupancy.trend} size={18} />
      </div>

      {amenities.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3.5">
          {amenities.map((a) => (
            <span key={a.label} className="text-xs px-2.5 py-1 rounded-lg bg-[var(--color-bg-chip)] text-[var(--color-text-secondary)]">{a.label}</span>
          ))}
        </div>
      )}

      <Button
        as="a"
        href={`https://www.google.com/maps/dir/?api=1&destination=${building.entrance_lat},${building.entrance_lng}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full mt-4"
      >
        Get Directions
      </Button>
    </Card>
  )
}
