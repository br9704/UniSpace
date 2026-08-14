import type { HourlyPrediction } from '@/types'
import PredictionChart from './PredictionChart'
import SparklineChart from './SparklineChart'
import PredictionSourceBadge from './PredictionSourceBadge'
import SectionLabel from './SectionLabel'
import {
  formatHour,
  getAvoidWindow,
  getBestTimeToGo,
  getPeakHour,
  getSparklineData,
} from '@/lib/predictionInsights'

interface PredictionSectionProps {
  predictions: HourlyPrediction[]
}

export default function PredictionSection({ predictions }: PredictionSectionProps) {
  if (predictions.length === 0) return null

  const currentHour = new Date().getHours()
  const peak = getPeakHour(predictions)
  const bestTime = getBestTimeToGo(predictions, currentHour)
  const avoidWindow = getAvoidWindow(predictions, currentHour)
  const sparklineData = getSparklineData(predictions, currentHour)

  const dominantSource = predictions.find((p) => p.pct > 0)?.source ?? 'google'
  const dominantConfidence = predictions.find((p) => p.pct > 0)?.confidence ?? 'google-estimated'

  return (
    <div className="mb-2">
      <SectionLabel className="mb-3">today</SectionLabel>

      <PredictionChart predictions={predictions} currentHour={currentHour} />

      <dl className="mono mt-3 flex flex-col gap-1 text-xs">
        {peak && (
          <div className="flex justify-between gap-4">
            <dt style={{ color: 'var(--color-text-muted)' }}>PEAK</dt>
            <dd style={{ color: 'var(--color-text-primary)' }}>
              {formatHour(peak.hour)} · {peak.pct}%
            </dd>
          </div>
        )}
        {bestTime && (
          <div className="flex justify-between gap-4">
            <dt style={{ color: 'var(--color-text-muted)' }}>BEST TIME</dt>
            {/* The one recommendation on this panel, so the one amber value. */}
            <dd style={{ color: 'var(--color-amber)' }}>
              {formatHour(bestTime.hour)} · {bestTime.pct}%
            </dd>
          </div>
        )}
        {avoidWindow && (
          <div className="flex justify-between gap-4">
            <dt style={{ color: 'var(--color-text-muted)' }}>AVOID</dt>
            <dd style={{ color: 'var(--color-text-secondary)' }}>
              {formatHour(avoidWindow.start)}–{formatHour(avoidWindow.end)} · ~{avoidWindow.pct}%
            </dd>
          </div>
        )}
      </dl>

      {sparklineData.length > 1 && (
        <div className="mt-4">
          <p className="mono text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>
            NEXT 6 HRS
          </p>
          <SparklineChart data={sparklineData} />
        </div>
      )}

      <div className="mt-3">
        <PredictionSourceBadge source={dominantSource} confidence={dominantConfidence} />
      </div>
    </div>
  )
}
