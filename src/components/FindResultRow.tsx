import type { Building } from '@/types'
import { getOccupancyLabel } from '@/constants/occupancy'
import { isOpenNow, openStatusLabel } from '@/lib/buildingHours'
import OccupancyBar from './OccupancyBar'
import CountUpValue from './CountUpValue'
import StatusDot from './ui/StatusDot'

interface FindResultRowProps {
  building: Building
  pct: number | null
  walkMinutes: number | null
  /** The top-ranked result — the one row that gets the accent. */
  isTop: boolean
  onClick: () => void
}

/**
 * One ranked recommendation.
 *
 * Only the top result is amber. That is the entire point of the ranking: if
 * every row is highlighted, the user is back to comparing eighteen buildings by
 * hand, which is the problem this product exists to remove.
 */
export default function FindResultRow({
  building,
  pct,
  walkMinutes,
  isTop,
  onClick,
}: FindResultRowProps) {
  const status = isOpenNow(building)

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-3 w-full text-left px-3 py-3"
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-hairline)',
        borderLeft: `2px solid ${isTop ? 'var(--color-amber)' : 'var(--color-steel)'}`,
        borderRadius: 'var(--radius-md)',
        cursor: 'pointer',
        minHeight: 44,
      }}
    >
      <div className="w-12 shrink-0 text-center">
        <p
          className="mono text-lg leading-none"
          data-count
          style={{ color: isTop ? 'var(--color-amber)' : 'var(--color-text-primary)' }}
        >
          <CountUpValue value={pct} suffix="%" />
        </p>
        <p className="mono text-[10px] mt-1" style={{ color: 'var(--color-text-muted)' }}>
          {getOccupancyLabel(pct).toUpperCase()}
        </p>
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm truncate" style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>
          {building.short_name || building.name}
        </p>
        <div className="mono flex items-center gap-2 mt-1 text-xs" style={{ color: 'var(--color-text-muted)' }}>
          <StatusDot open={status.open} verified={status.verified} size={5} />
          <span>{openStatusLabel(status)}</span>
          {walkMinutes !== null && <span>· ~{Math.round(walkMinutes)} MIN</span>}
        </div>
        <div className="mt-2">
          <OccupancyBar pct={pct} height={3} recommended={isTop} />
        </div>
      </div>
    </button>
  )
}
