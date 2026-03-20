import { motion } from 'framer-motion'
import type { FloorOccupancy } from '@/types'
import { getOccupancyLabel } from '@/constants/occupancy'
import OccupancyBar from './OccupancyBar'

interface FloorBreakdownProps {
  floors: FloorOccupancy[]
}

export default function FloorBreakdown({ floors }: FloorBreakdownProps) {
  if (floors.length === 0) return null

  const quietest = floors.reduce((q, f) => f.occupancy_pct < q.occupancy_pct ? f : q)

  return (
    <div className="mb-4">
      <h3 className="text-xs font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>By Floor</h3>
      {floors.map((f, i) => (
        <motion.div
          key={f.zone_id}
          className="flex items-center gap-2 mb-1.5"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          <span className="text-xs w-24 truncate" style={{ color: 'var(--color-text-secondary)' }}>{f.zone_name}</span>
          <div className="flex-1"><OccupancyBar pct={f.occupancy_pct} height={6} /></div>
          <span className="text-xs w-8 text-right" style={{ color: 'var(--color-text-primary)' }}>{Math.round(f.occupancy_pct)}%</span>
          <span className="text-xs w-14" style={{ color: 'var(--color-text-tertiary)' }}>{getOccupancyLabel(f.occupancy_pct)}</span>
          {quietest.zone_id === f.zone_id && (
            <span className="text-xs font-medium whitespace-nowrap" style={{ color: 'var(--color-uom-gold)' }}>→ Recommended</span>
          )}
        </motion.div>
      ))}
    </div>
  )
}
