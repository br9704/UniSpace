import type { CampusItem } from '@/hooks/useCampusOverview'
import { getOccupancyLabel } from '@/constants/occupancy'
import { isOpenNow } from '@/lib/buildingHours'
import OccupancyBar from '../OccupancyBar'
import FavouriteButton from '../FavouriteButton'
import StatusDot from '../ui/StatusDot'

interface BuildingTileProps {
  item: CampusItem
  isFavourite: boolean
  onToggleFavourite: () => void
  onOpen: () => void
}

/**
 * Compact building tile for the home grid.
 *
 * A real `<button>` rather than a div with a role, so keyboard activation,
 * focus and screen-reader semantics come for free instead of being
 * reimplemented with key handlers.
 */
export default function BuildingTile({
  item,
  isFavourite,
  onToggleFavourite,
  onOpen,
}: BuildingTileProps) {
  const pct = item.occupancy?.pct ?? null
  const status = isOpenNow(item.building)

  return (
    <div
      className="relative"
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-hairline)',
        borderRadius: 'var(--radius-md)',
      }}
    >
      <div className="absolute top-0 right-0">
        <FavouriteButton isFavourite={isFavourite} onToggle={onToggleFavourite} size={12} />
      </div>

      <button
        type="button"
        onClick={onOpen}
        className="w-full text-left p-3"
        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
      >
        <p
          className="text-xs truncate pr-8"
          style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}
        >
          {item.building.short_name || item.building.name}
        </p>

        <p
          className="mono text-2xl mt-2 leading-none"
          data-count
          style={{ color: 'var(--color-text-primary)' }}
        >
          {pct !== null ? `${Math.round(pct)}%` : '--'}
        </p>

        <div className="mt-2">
          <OccupancyBar pct={pct} height={3} />
        </div>

        <p className="mono text-xs mt-2" style={{ color: 'var(--color-text-dim)' }}>
          {getOccupancyLabel(pct).toUpperCase()}
        </p>

        <div className="mono flex items-center justify-between mt-2 text-xs" style={{ color: 'var(--color-text-dim)' }}>
          <span className="flex items-center gap-1.5">
            <StatusDot open={status.open} size={5} />
            {status.open ? 'OPEN' : 'CLOSED'}
          </span>
          {item.walkMinutes !== null && <span>~{Math.round(item.walkMinutes)}M</span>}
        </div>
      </button>
    </div>
  )
}
