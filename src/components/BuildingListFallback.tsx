import type { BlendedOccupancy, Building } from '@/types'
import { getOccupancyLabel } from '@/constants/occupancy'
import { isOpenNow, openStatusLabel } from '@/lib/buildingHours'
import OccupancyBar from './OccupancyBar'
import StatusDot from './ui/StatusDot'

interface BuildingListFallbackProps {
  buildings: Building[]
  occupancyMap: Map<string, BlendedOccupancy>
  onSelect: (buildingId: string) => void
  /** Why the map is unavailable, shown so the user is not left guessing. */
  reason: string
}

/**
 * The occupancy data, without the map.
 *
 * PRD § 6.1 requires this: if Mapbox tiles fail — no token, blocked network,
 * quota exhausted — the answer to "where is quiet right now" is still perfectly
 * expressible as a sorted list. The map is the nicest way to read this data,
 * not the only one, and losing it should cost polish rather than function.
 *
 * Sorted quietest-first, because that is the question being asked.
 */
export default function BuildingListFallback({
  buildings,
  occupancyMap,
  onSelect,
  reason,
}: BuildingListFallbackProps) {
  const sorted = [...buildings].sort(
    (a, b) =>
      (occupancyMap.get(a.id)?.pct ?? 100) - (occupancyMap.get(b.id)?.pct ?? 100),
  )

  return (
    <div className="h-full overflow-y-auto" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div
        role="alert"
        className="mono text-xs px-4 py-3"
        style={{
          borderBottom: '1px solid var(--color-hairline)',
          color: 'var(--color-amber)',
        }}
      >
        Map unavailable — {reason}
        <span className="block mt-1" style={{ color: 'var(--color-text-muted)' }}>
          The building list below still works.
        </span>
      </div>

      <ul className="flex flex-col">
        {sorted.map((building) => {
          const occupancy = occupancyMap.get(building.id)
          const pct = occupancy?.pct ?? null
          const status = isOpenNow(building)

          return (
            <li key={building.id}>
              <button
                type="button"
                onClick={() => onSelect(building.id)}
                className="w-full text-left px-4 py-3"
                style={{
                  minHeight: 44,
                  background: 'none',
                  border: 'none',
                  borderBottom: '1px solid var(--color-hairline)',
                  cursor: 'pointer',
                }}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-sm" style={{ color: 'var(--color-text-primary)' }}>
                    {building.short_name || building.name}
                  </span>
                  <span className="mono text-sm" data-count style={{ color: 'var(--color-text-primary)' }}>
                    {pct !== null ? `${Math.round(pct)}%` : '--'}
                  </span>
                </div>

                <div className="mt-2">
                  <OccupancyBar pct={pct} height={3} />
                </div>

                <div
                  className="mono flex items-center gap-2 mt-2 text-xs"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  <StatusDot open={status.open} verified={status.verified} size={5} />
                  <span>{openStatusLabel(status)}</span>
                  <span>· {getOccupancyLabel(pct).toUpperCase()}</span>
                </div>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
