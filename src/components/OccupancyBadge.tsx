import { getOccupancyLabel } from '@/constants/occupancy'
import { getConfidence } from '@/lib/confidence'
import CountUpValue from './CountUpValue'
import type { DataQuality } from '@/types'

interface OccupancyBadgeProps {
  pct: number | null
  /** Where the reading came from, so its confidence can be shown alongside it. */
  source?: DataQuality
}

/**
 * The reading itself: `38% · QUIET`, with its confidence attached.
 *
 * The number counts rather than jumping — MOTION.md: "A number that teleports
 * reads as a glitch; a number that counts reads as measurement." Monospace
 * tabular figures keep the width fixed while it runs.
 *
 * The label is not decoration: WCAG forbids conveying occupancy by shade alone,
 * and the ramp here is monochrome, so the word carries real weight.
 */
export default function OccupancyBadge({ pct, source }: OccupancyBadgeProps) {
  const confidence = source ? getConfidence(source) : null

  if (pct === null) {
    return (
      <span className="mono text-sm" style={{ color: 'var(--color-text-muted)' }}>
        NO DATA
      </span>
    )
  }

  return (
    <span className="mono text-sm" style={{ color: 'var(--color-text-primary)' }}>
      <CountUpValue value={pct} suffix="%" />
      <span style={{ color: 'var(--color-text-muted)' }}> · {getOccupancyLabel(pct).toUpperCase()}</span>
      {confidence?.qualifier && (
        <span style={{ color: 'var(--color-text-muted)' }}> · {confidence.qualifier}</span>
      )}
    </span>
  )
}
