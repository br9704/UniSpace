import { motion } from 'framer-motion'
import type { FloorOccupancy } from '@/types'
import { getOccupancyLabel } from '@/constants/occupancy'
import OccupancyBar from './OccupancyBar'
import SectionLabel from './SectionLabel'

interface FloorBreakdownProps {
  floors: FloorOccupancy[]
}

/**
 * Per-floor readout, quietest floor marked.
 *
 * The recommendation is the one amber element here, which is the whole reason
 * the occupancy ramp itself is monochrome: with every bar competing for
 * attention, the answer to "where should I actually go" would be lost among
 * them.
 *
 * Rows reveal on a 60ms stagger, per MOTION.md.
 */
export default function FloorBreakdown({ floors }: FloorBreakdownProps) {
  if (floors.length === 0) return null

  const quietest = floors.reduce((a, b) => (b.occupancy_pct < a.occupancy_pct ? b : a))

  return (
    <div>
      <SectionLabel className="mb-3">by floor</SectionLabel>
      <ul>
        {floors.map((floor, i) => {
          const recommended = floor.zone_id === quietest.zone_id
          return (
            <motion.li
              key={floor.zone_id}
              className="flex items-center gap-2 mb-2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.25, ease: 'easeOut' }}
            >
              <span
                className="mono text-xs w-20 truncate shrink-0"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {floor.zone_name}
              </span>
              <div className="flex-1 min-w-0">
                <OccupancyBar pct={floor.occupancy_pct} height={4} recommended={recommended} />
              </div>
              <span
                className="mono text-xs w-9 text-right shrink-0"
                data-count
                style={{ color: 'var(--color-text-primary)' }}
              >
                {Math.round(floor.occupancy_pct)}%
              </span>
              <span
                className="mono text-xs w-16 shrink-0"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {getOccupancyLabel(floor.occupancy_pct).toUpperCase()}
              </span>
              {recommended && (
                <span
                  className="mono text-xs whitespace-nowrap shrink-0"
                  style={{ color: 'var(--color-amber)' }}
                >
                  ← BEST
                </span>
              )}
            </motion.li>
          )
        })}
      </ul>
    </div>
  )
}
