import { AreaChart, Area, ResponsiveContainer } from 'recharts'
import { CHART_COLOURS } from '@/lib/tokens'

interface SparklineChartProps {
  data: { hour: number; pct: number }[]
  height?: number
}

/**
 * Six-hour trend line.
 *
 * Recharts takes literal colour strings and cannot resolve CSS custom
 * properties, so the palette comes through `CHART_COLOURS` rather than being
 * hardcoded here.
 */
export default function SparklineChart({ data, height = 36 }: SparklineChartProps) {
  if (data.length === 0) return null

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
        <Area
          type="linear"
          dataKey="pct"
          stroke={CHART_COLOURS.accent}
          strokeWidth={1}
          fill={CHART_COLOURS.accent}
          fillOpacity={0.08}
          dot={false}
          activeDot={false}
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
