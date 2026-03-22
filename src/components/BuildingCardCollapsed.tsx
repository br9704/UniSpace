import type { BlendedOccupancy, Building } from '@/types'
import { isOpenNow } from '@/lib/buildingHours'
import { BUILDING_META } from '@/constants/buildingMeta'
import OccupancyBar from './OccupancyBar'
import OccupancyBadge from './OccupancyBadge'
import TrendArrow from './TrendArrow'
import StatusDot from './ui/StatusDot'
import Button from './ui/Button'
import { getActiveAmenities } from './AmenityChip'
import NoiseIndicator from './NoiseIndicator'

interface BuildingCardCollapsedProps {
  building: Building
  occupancy: BlendedOccupancy | null
  onExpand: () => void
  onReport?: () => void
  reportCount?: number
  noiseLevel?: number | null
  noiseCount?: number
}

export default function BuildingCardCollapsed({ building, occupancy, onExpand, onReport, reportCount = 0, noiseLevel, noiseCount }: BuildingCardCollapsedProps) {
  const status = isOpenNow(building)
  const amenities = getActiveAmenities(building)
  const meta = BUILDING_META[building.slug]
  const pct = occupancy?.pct ?? null
  const trend = occupancy?.trend ?? 'stable'

  return (
    <div className="px-5 pb-5">
      <h2 className="text-[22px] font-bold text-[var(--color-text-primary)]">{building.name}</h2>

      {meta && (
        <span className="inline-block text-[11px] px-2.5 py-0.5 rounded-md bg-[var(--color-bg-chip)] text-[var(--color-text-secondary)] mt-1.5">
          {meta.address}
        </span>
      )}

      {meta ? (
        <p className="text-sm text-[var(--color-text-secondary)] mt-2 leading-relaxed">{meta.description}</p>
      ) : (
        <p className="text-[13px] text-[var(--color-text-secondary)] mt-1">University of Melbourne · Parkville</p>
      )}

      <div className="mt-3.5"><OccupancyBar pct={pct} height={8} /></div>

      <div className="flex items-center justify-between mt-2.5">
        <OccupancyBadge pct={pct} />
        <TrendArrow trend={trend} />
      </div>

      {noiseLevel != null && noiseCount != null && noiseCount > 0 && (
        <div className="mt-2">
          <NoiseIndicator level={noiseLevel} count={noiseCount} />
        </div>
      )}

      <div className="flex items-center gap-1.5 mt-2.5">
        <StatusDot open={status.open} />
        <span className="text-[13px] text-[var(--color-text-secondary)]">
          {status.open ? `Open · Closes ${status.closesAt}` : status.opensAt ? `Officially closed · Opens ${status.opensAt} · Keycard access may be available` : 'Officially closed · Keycard access may be available'}
        </span>
      </div>

      {building.estimated_capacity && (
        <p className="text-[13px] text-[var(--color-text-tertiary)] mt-1.5">Capacity: ~{building.estimated_capacity} people</p>
      )}

      {amenities.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {amenities.map((a) => (
            <span key={a.label} className="text-xs px-2.5 py-0.5 rounded-lg bg-[var(--color-bg-chip)] text-[var(--color-text-secondary)]">{a.label}</span>
          ))}
        </div>
      )}

      {meta?.nearbyFood?.[0] && (
        <p className="text-[13px] text-[var(--color-text-tertiary)] mt-2">Nearby: {meta.nearbyFood[0]}</p>
      )}

      {onReport && (
        <button
          onClick={onReport}
          className="w-full flex items-center justify-between px-3 py-2.5 mt-3 rounded-xl bg-[var(--color-bg-chip)] text-[var(--color-text-secondary)] text-sm transition-colors hover:bg-[var(--color-border)] min-h-[44px]"
        >
          <span>How busy is it? Report now</span>
          {reportCount > 0 && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--color-uom-navy)] text-white">
              {reportCount}
            </span>
          )}
        </button>
      )}

      <div className="flex gap-2 mt-3.5">
        <Button
          as="a"
          href={`https://www.google.com/maps/dir/?api=1&destination=${building.entrance_lat},${building.entrance_lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1"
          size="md"
        >
          Directions
        </Button>
        <Button variant="secondary" onClick={onExpand} className="flex-1" size="md">
          More Info
        </Button>
      </div>
    </div>
  )
}
