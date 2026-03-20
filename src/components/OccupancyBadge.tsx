import { OCCUPANCY_COLOURS, getOccupancyLevel, getOccupancyLabel } from '@/constants/occupancy'

interface OccupancyBadgeProps {
  pct: number | null
}

export default function OccupancyBadge({ pct }: OccupancyBadgeProps) {
  const level = getOccupancyLevel(pct)
  const colour = OCCUPANCY_COLOURS[level]
  const label = getOccupancyLabel(pct)
  const text = pct !== null ? `${Math.round(pct)}% · ${label}` : 'No data'

  return (
    <span
      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
      style={{ backgroundColor: `${colour}20`, color: colour }}
    >
      {text}
    </span>
  )
}
