import { getOccupancyColourVar, getOccupancyLabel } from '@/constants/occupancy'

interface OccupancyBarProps {
  pct: number | null
  height?: number
  className?: string
  /** Marks this as the recommended option — the one place amber is spent. */
  recommended?: boolean
}

/**
 * A terminal-style fill meter.
 *
 * Square, hairline-tracked, filling with the occupancy ramp's luminance. Amber
 * appears only when this row is the recommended one, which is the single place
 * on a screen full of buildings where a user's eye is genuinely useful.
 */
export default function OccupancyBar({
  pct,
  height = 6,
  className = '',
  recommended = false,
}: OccupancyBarProps) {
  const width = pct !== null ? Math.min(100, Math.max(0, pct)) : 0
  const fill = recommended ? 'var(--color-amber)' : getOccupancyColourVar(pct)

  return (
    <div
      className={`w-full overflow-hidden ${className}`}
      style={{ height, backgroundColor: 'var(--color-hairline)' }}
      role="meter"
      aria-valuenow={pct ?? undefined}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuetext={pct !== null ? `${Math.round(pct)} percent, ${getOccupancyLabel(pct)}` : 'No data'}
    >
      <div
        className="h-full"
        style={{
          width: `${width}%`,
          backgroundColor: fill,
          // Linear, matching the count-up that runs alongside it. Easing here
          // would make the bar and the number disagree about where they are.
          transition: 'width 500ms linear, background-color var(--dur-slow) linear',
        }}
      />
    </div>
  )
}
