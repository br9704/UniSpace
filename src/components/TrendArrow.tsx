import type { OccupancyTrend } from '@/types'

interface TrendArrowProps {
  trend: OccupancyTrend
  size?: number
}

/**
 * Direction of travel, as a monospace glyph.
 *
 * Deliberately not animated. MOTION.md: "The heatmap never animates attention
 * toward busy-ness — this app sells quiet, not crowds." A bouncing red arrow on
 * a filling building does exactly that. The direction is information; the
 * motion was decoration.
 *
 * Emptying is the positive case, so it takes the live green. Filling is dim
 * grey rather than a warning colour — a busy building is a fact, not an error.
 */
const TREND_CONFIG: Record<OccupancyTrend, { glyph: string; colour: string; label: string }> = {
  filling: { glyph: '↑', colour: 'var(--color-text-secondary)', label: 'Filling' },
  emptying: { glyph: '↓', colour: 'var(--color-live)', label: 'Emptying' },
  stable: { glyph: '→', colour: 'var(--color-text-dim)', label: 'Stable' },
}

export default function TrendArrow({ trend, size = 13 }: TrendArrowProps) {
  const { glyph, colour, label } = TREND_CONFIG[trend]

  return (
    <span className="mono inline-flex items-center gap-1" style={{ color: colour, fontSize: size }}>
      <span aria-hidden="true">{glyph}</span>
      <span className="tracking-wider">{label.toUpperCase()}</span>
    </span>
  )
}
