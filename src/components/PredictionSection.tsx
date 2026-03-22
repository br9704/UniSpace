import type { HourlyPrediction } from '@/types'
import PredictionChart from './PredictionChart'
import SparklineChart from './SparklineChart'
import PredictionSourceBadge from './PredictionSourceBadge'
import SectionHeader from './ui/SectionHeader'
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
      <h3 style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', letterSpacing: '1px', margin: '0 0 10px' }}>TODAY&apos;S PREDICTION</h3>

      <PredictionChart predictions={predictions} currentHour={currentHour} />

      <div className="mt-2.5 flex flex-col gap-1">
        {peak && (
          <p className="text-[13px] text-[var(--color-text-secondary)] leading-relaxed">
            Peak at <strong className="text-[var(--color-text-primary)]">{formatHour(peak.hour)}</strong> ({peak.pct}%)
          </p>
        )}
        {bestTime && (
          <p className="text-[13px] text-[var(--color-text-secondary)] leading-relaxed">
            Best time: <strong className="text-[var(--color-empty)]">{formatHour(bestTime.hour)}</strong> ({bestTime.pct}%)
          </p>
        )}
        {avoidWindow && (
          <p className="text-[13px] text-[var(--color-text-secondary)] leading-relaxed">
            Avoid <strong className="text-[var(--color-busy)]">{formatHour(avoidWindow.start)}–{formatHour(avoidWindow.end)}</strong> (~{avoidWindow.pct}%)
          </p>
        )}
      </div>

      {sparklineData.length > 1 && (
        <div className="mt-3">
          <p className="text-[11px] text-[var(--color-text-tertiary)] mb-1">Predicted trend (last 6 hrs)</p>
          <SparklineChart data={sparklineData} />
        </div>
      )}

      <div className="mt-2.5">
        <PredictionSourceBadge source={dominantSource} confidence={dominantConfidence} />
      </div>
    </div>
  )
}
