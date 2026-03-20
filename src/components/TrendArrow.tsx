import { motion } from 'framer-motion'
import type { OccupancyTrend } from '@/types'

interface TrendArrowProps {
  trend: OccupancyTrend
  size?: number
}

const TREND_CONFIG: Record<OccupancyTrend, { color: string; rotation: number; animate: boolean; label: string }> = {
  filling: { color: 'var(--color-busy)', rotation: -90, animate: true, label: 'Filling' },
  emptying: { color: 'var(--color-empty)', rotation: 90, animate: true, label: 'Emptying' },
  stable: { color: 'var(--color-text-tertiary)', rotation: 0, animate: false, label: 'Stable' },
}

export default function TrendArrow({ trend, size = 20 }: TrendArrowProps) {
  const { color, rotation, animate, label } = TREND_CONFIG[trend]

  return (
    <div className="flex items-center gap-1">
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        style={{ color, transform: `rotate(${rotation}deg)` }}
        animate={animate ? { y: [0, -2, 0] } : undefined}
        transition={animate ? { repeat: Infinity, duration: 1.5 } : undefined}
      >
        <path d="M12 4l-6 8h4v8h4v-8h4z" fill="currentColor" />
      </motion.svg>
      <span className="text-xs" style={{ color }}>{label}</span>
    </div>
  )
}
