import type { DataQuality } from '@/types'

interface DataSourceBadgeProps {
  source: DataQuality
}

/**
 * Says where a reading came from, and how much to trust it.
 *
 * Confidence is a first-class visual state here, not a footnote — the whole
 * point of the product is a number you can act on, and an estimate presented
 * like a measurement is worse than no number at all.
 *
 * Only `live` and `crowd-report` get the green dot; MOTION.md reserves green
 * exclusively for genuinely live/positive state. Everything else is dim
 * grayscale, so an estimate never borrows the authority of a measurement.
 *
 * The labels avoid the word "Google" deliberately: the weekly curves are
 * UniSpace's own modelled estimates, and Google's API does not publish busyness
 * at all.
 */
const CONFIG: Record<DataQuality, { glyph: string; label: string; live: boolean }> = {
  live: { glyph: '●', label: 'LIVE', live: true },
  'crowd-report': { glyph: '●', label: 'REPORTED', live: true },
  google: { glyph: '~', label: 'ESTIMATED', live: false },
  predicted: { glyph: '~', label: 'PREDICTED', live: false },
  stale: { glyph: '·', label: 'STALE', live: false },
  none: { glyph: '○', label: 'NO DATA', live: false },
}

export default function DataSourceBadge({ source }: DataSourceBadgeProps) {
  const { glyph, label, live } = CONFIG[source]

  return (
    <span
      className="mono inline-flex items-center gap-1.5 px-2 py-0.5 text-xs tracking-wider"
      style={{
        border: '1px solid var(--color-hairline)',
        color: live ? 'var(--color-text-primary)' : 'var(--color-text-dim)',
      }}
    >
      <span
        aria-hidden="true"
        style={{ color: live ? 'var(--color-live)' : 'var(--color-text-dim)' }}
      >
        {glyph}
      </span>
      {label}
    </span>
  )
}
