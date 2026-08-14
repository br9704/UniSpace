import type { PredictionConfidence, PredictionSource } from '@/types'

interface PredictionSourceBadgeProps {
  source: PredictionSource
  confidence: PredictionConfidence
}

/**
 * Names the provenance of a prediction, and how much data stands behind it.
 *
 * The `google` source label deliberately does not say "Google". Those weekly
 * curves are UniSpace's own modelled estimates of campus rhythm — Google's
 * public Places API does not expose busyness at all — and this component
 * previously read "Based on Google historical patterns", which was not true.
 * See MASTERPLAN's decision log, 2026-08-14.
 */
export default function PredictionSourceBadge({ source, confidence }: PredictionSourceBadgeProps) {
  const isModelled = source === 'google'

  const label = isModelled ? 'MODELLED ESTIMATE' : 'UNISPACE PREDICTION'
  const detail = isModelled
    ? 'typical weekly pattern for this building'
    : confidence === 'high' ? 'high confidence · 4+ weeks of data'
    : confidence === 'medium' ? 'medium confidence · 2+ weeks of data'
    : 'low confidence · limited data'

  return (
    <div
      className="mono inline-flex flex-wrap items-center gap-x-2 gap-y-0.5 px-2 py-1 text-[11px]"
      style={{
        border: '1px solid var(--color-hairline)',
        color: 'var(--color-text-secondary)',
      }}
    >
      <span aria-hidden="true" style={{ color: 'var(--color-text-dim)' }}>
        {isModelled ? '~' : '◆'}
      </span>
      <span className="tracking-wider">{label}</span>
      <span style={{ color: 'var(--color-text-dim)' }}>· {detail}</span>
    </div>
  )
}
