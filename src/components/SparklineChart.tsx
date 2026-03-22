import {
  AreaChart,
  Area,
  ResponsiveContainer,
} from 'recharts'

interface SparklineChartProps {
  data: { hour: number; pct: number }[]
  height?: number
}

export default function SparklineChart({ data, height = 40 }: SparklineChartProps) {
  const uomGold = '#C8A951'

  if (data.length === 0) return null

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
        <Area
          type="monotone"
          dataKey="pct"
          stroke={uomGold}
          strokeWidth={2}
          fill={uomGold}
          fillOpacity={0.15}
          dot={false}
          activeDot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
