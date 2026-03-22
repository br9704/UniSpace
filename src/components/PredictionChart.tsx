import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from 'recharts'
import type { HourlyPrediction } from '@/types'
import { getOccupancyColour, getOccupancyLabel } from '@/constants/occupancy'
import { formatHour } from '@/lib/predictionInsights'

interface PredictionChartProps {
  predictions: HourlyPrediction[]
  currentHour: number
}

const TICK_HOURS = [0, 6, 12, 18]

function tickFormatter(hour: number): string {
  if (hour === 0) return '12a'
  if (hour === 6) return '6a'
  if (hour === 12) return '12p'
  if (hour === 18) return '6p'
  return ''
}

interface TooltipPayloadItem {
  payload: HourlyPrediction
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: TooltipPayloadItem[] }) {
  if (!active || !payload?.[0]) return null
  const d = payload[0].payload
  return (
    <div
      className="px-2.5 py-1.5 rounded-lg text-xs leading-snug shadow-elevated"
      style={{
        backgroundColor: 'var(--color-text-primary)',
        color: 'var(--color-bg-primary)',
      }}
    >
      <div className="font-semibold">{formatHour(d.hour)}</div>
      <div>{d.pct}% · {getOccupancyLabel(d.pct)}</div>
    </div>
  )
}

export default function PredictionChart({ predictions, currentHour }: PredictionChartProps) {
  const textTertiary = '#94A3B8'
  const uomNavy = '#003865'

  if (predictions.length === 0) return null

  return (
    <ResponsiveContainer width="100%" height={150}>
      <BarChart data={predictions} margin={{ top: 4, right: 4, bottom: 0, left: 4 }}>
        <XAxis
          dataKey="hour"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 11, fill: textTertiary }}
          ticks={TICK_HOURS}
          tickFormatter={tickFormatter}
        />
        <YAxis hide domain={[0, 100]} />
        <Tooltip content={<CustomTooltip />} cursor={false} />
        <ReferenceLine
          x={currentHour}
          stroke={uomNavy}
          strokeDasharray="3 3"
          strokeOpacity={0.4}
        />
        <Bar dataKey="pct" radius={[3, 3, 0, 0]} maxBarSize={14}>
          {predictions.map((entry) => (
            <Cell
              key={entry.hour}
              fill={getOccupancyColour(entry.pct)}
              stroke={entry.hour === currentHour ? uomNavy : 'none'}
              strokeWidth={entry.hour === currentHour ? 2 : 0}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
