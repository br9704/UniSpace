import { getOccupancyLabel } from '@/constants/occupancy'

interface OccupancyBadgeProps {
  pct: number | null
}

/**
 * The reading itself: `38% · QUIET`.
 *
 * Monospace with tabular figures so the width never shifts as the number
 * counts — a value that jitters reads as a glitch rather than a measurement.
 * The label is not decoration: WCAG forbids conveying occupancy by shade alone,
 * and the ramp here is monochrome, so the word is doing real work.
 */
export default function OccupancyBadge({ pct }: OccupancyBadgeProps) {
  const label = getOccupancyLabel(pct)

  if (pct === null) {
    return (
      <span className="mono text-sm" style={{ color: 'var(--color-text-dim)' }}>
        NO DATA
      </span>
    )
  }

  return (
    <span className="mono text-sm" style={{ color: 'var(--color-text-primary)' }}>
      <span data-count>{Math.round(pct)}%</span>
      <span style={{ color: 'var(--color-text-dim)' }}> · {label.toUpperCase()}</span>
    </span>
  )
}
