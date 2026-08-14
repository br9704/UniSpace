import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine,
} from 'recharts'
import type { HourlyPrediction } from '@/types'
import { getOccupancyColour, getOccupancyLabel } from '@/constants/occupancy'
import { formatHour } from '@/lib/predictionInsights'
import { CHART_COLOURS } from '@/lib/tokens'

interface PredictionChartProps {
  predictions: HourlyPrediction[]
  currentHour: number
}

const TICK_HOURS = [0, 6, 12, 18]

function tickFormatter(hour: number): string {
  const labels: Record<number, string> = { 0: '00', 6: '06', 12: '12', 18: '18' }
  return labels[hour] ?? ''
}

interface TooltipPayloadItem {
  payload: HourlyPrediction
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: TooltipPayloadItem[] }) {
  if (!active || !payload?.[0]) return null
  const d = payload[0].payload

  return (
    <div
      className="mono px-2 py-1.5 text-xs leading-snug"
      style={{
        backgroundColor: 'var(--color-bg)',
        border: '1px solid var(--color-steel)',
        color: 'var(--color-text-primary)',
      }}
    >
      <div>{formatHour(d.hour)}</div>
      <div style={{ color: 'var(--color-text-secondary)' }}>
        {d.pct}% · {getOccupancyLabel(d.pct).toUpperCase()}
      </div>
    </div>
  )
}

/**
 * Twenty-four hour typical-occupancy bar chart.
 *
 * Bars carry the occupancy ramp's luminance; the current hour is the one bar
 * marked in amber, which is exactly the kind of "key data" the accent is
 * reserved for. Square corners, per the system.
 */
export default function PredictionChart({ predictions, currentHour }: PredictionChartProps) {
  if (predictions.length === 0) return null

  return (
    <ResponsiveContainer width="100%" height={140}>
      <BarChart data={predictions} margin={{ top: 4, right: 4, bottom: 0, left: 4 }}>
        <XAxis
          dataKey="hour"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 10, fill: CHART_COLOURS.textDim, fontFamily: 'JetBrains Mono, monospace' }}
          ticks={TICK_HOURS}
          tickFormatter={tickFormatter}
        />
        <YAxis hide domain={[0, 100]} />
        <Tooltip content={<CustomTooltip />} cursor={false} />
        <ReferenceLine x={currentHour} stroke={CHART_COLOURS.accentDim} strokeDasharray="2 3" />
        <Bar dataKey="pct" maxBarSize={12} isAnimationActive={false}>
          {predictions.map((entry) => (
            <Cell
              key={entry.hour}
              fill={entry.hour === currentHour ? CHART_COLOURS.accent : getOccupancyColour(entry.pct)}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
