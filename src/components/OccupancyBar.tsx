import { OCCUPANCY_COLOURS, getOccupancyLevel } from '@/constants/occupancy'

interface OccupancyBarProps {
  pct: number | null
  height?: number
  className?: string
}

export default function OccupancyBar({ pct, height = 8, className = '' }: OccupancyBarProps) {
  const level = getOccupancyLevel(pct)
  const colour = OCCUPANCY_COLOURS[level]
  const width = pct !== null ? Math.min(100, Math.max(0, pct)) : 0

  return (
    <div
      className={`w-full rounded-full overflow-hidden ${className}`}
      style={{ height, backgroundColor: 'var(--color-border)' }}
    >
      <div
        className="h-full rounded-full transition-all duration-500 ease-out"
        style={{ width: `${width}%`, backgroundColor: colour }}
      />
    </div>
  )
}
