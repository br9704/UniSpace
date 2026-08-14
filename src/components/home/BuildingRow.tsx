import type { CampusItem } from '@/hooks/useCampusOverview'
import type { GooglePopularTime } from '@/types'
import { BUILDING_META } from '@/constants/buildingMeta'
import { getActiveAmenities } from '@/lib/amenityHelpers'
import { getCurrentTypical } from '@/lib/occupancyHelpers'
import { formatHour } from '@/lib/predictionInsights'
import { isOpenNow } from '@/lib/buildingHours'
import OccupancyBar from '../OccupancyBar'
import CountUpValue from '../CountUpValue'
import FavouriteButton from '../FavouriteButton'
import StatusDot from '../ui/StatusDot'

interface BuildingRowProps {
  item: CampusItem
  typicalRows: GooglePopularTime[]
  isFavourite: boolean
  onToggleFavourite: () => void
  onOpen: () => void
}

/** Full-width building row for the searchable "all buildings" list. */
export default function BuildingRow({
  item,
  typicalRows,
  isFavourite,
  onToggleFavourite,
  onOpen,
}: BuildingRowProps) {
  const { building } = item
  const pct = item.occupancy?.pct ?? null
  const status = isOpenNow(building)
  const meta = BUILDING_META[building.slug]
  const amenities = getActiveAmenities(building)
  const typical = getCurrentTypical(typicalRows, building.id)

  const peak = typicalRows
    .filter((r) => r.building_id === building.id && r.day_of_week === new Date().getDay())
    .sort((a, b) => b.typical_popularity - a.typical_popularity)[0]

  return (
    <div
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-hairline)',
        borderRadius: 'var(--radius-md)',
      }}
    >
      <button
        type="button"
        onClick={onOpen}
        className="w-full text-left p-4"
        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-base" style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>
              {building.name}
            </p>
            {meta && (
              <p className="mono text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
                {meta.address}
              </p>
            )}
          </div>
          <span
            className="mono text-lg shrink-0"
            data-count
            style={{ color: 'var(--color-text-primary)' }}
          >
            <CountUpValue value={pct} suffix="%" />
          </span>
        </div>

        <div className="mt-3">
          <OccupancyBar pct={pct} height={4} />
        </div>

        <div className="mono flex items-center gap-2 mt-2 text-xs" style={{ color: 'var(--color-text-muted)' }}>
          <StatusDot open={status.open} size={5} />
          <span>{status.open ? `OPEN · CLOSES ${status.closesAt}` : 'AFTER HOURS'}</span>
          {item.walkMinutes !== null && <span>· ~{Math.round(item.walkMinutes)} MIN</span>}
        </div>

        {typical && (
          // Phrased as an estimate on purpose — these curves are modelled, not
          // measured, and must never read as a live number.
          <p className="mono text-xs mt-2" style={{ color: 'var(--color-text-muted)' }}>
            ~ USUALLY {typical.typical_popularity}% NOW
            {peak && ` · PEAKS ${formatHour(peak.hour_of_day).toUpperCase()}`}
          </p>
        )}

        {amenities.length > 0 && (
          <ul className="flex flex-wrap gap-1.5 mt-3">
            {amenities.map((amenity) => (
              <li
                key={amenity.label}
                className="mono text-xs px-1.5 py-0.5"
                style={{
                  border: '1px solid var(--color-hairline)',
                  color: 'var(--color-text-muted)',
                }}
              >
                {amenity.label}
              </li>
            ))}
          </ul>
        )}
      </button>

      <div
        className="flex items-center justify-between px-2"
        style={{ borderTop: '1px solid var(--color-hairline)' }}
      >
        <FavouriteButton isFavourite={isFavourite} onToggle={onToggleFavourite} size={12} />
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${building.entrance_lat},${building.entrance_lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mono text-xs no-underline flex items-center"
          style={{ color: 'var(--color-text-secondary)', minHeight: 44, padding: '0 8px' }}
        >
          [ DIRECTIONS → ]
        </a>
      </div>
    </div>
  )
}
