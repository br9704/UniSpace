import type { PredictionConfidence, PredictionSource } from '@/types'

interface PredictionSourceBadgeProps {
  source: PredictionSource
  confidence: PredictionConfidence
}

export default function PredictionSourceBadge({ source, confidence }: PredictionSourceBadgeProps) {
  const isGoogle = source === 'google'
  const color = isGoogle ? '#0080A4' : '#C8A951'
  const label = isGoogle ? 'Based on Google data' : 'Pulse prediction'
  const confidenceLabel = confidence === 'high' ? 'High confidence'
    : confidence === 'medium' ? 'Medium confidence'
    : 'Estimated'

  return (
    <div
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium"
      style={{ backgroundColor: '#F0F2F5', color }}
    >
      <span className="text-[10px]">{isGoogle ? '\u25CF' : '\u25C6'}</span>
      <span>{label}</span>
      <span className="text-[#94A3B8] font-normal">- {confidenceLabel}</span>
    </div>
  )
}
