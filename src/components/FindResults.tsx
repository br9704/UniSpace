import { motion } from 'framer-motion'
import type { RankedBuilding } from '@/types'
import { staggerContainer, fadeInUp } from '@/constants/animations'
import FindResultRow from './FindResultRow'

interface FindResultsProps {
  results: RankedBuilding[]
  onSelect: (buildingId: string) => void
  onReset: () => void
}

/** Ranked results, or an empty state that offers the way out of it. */
export default function FindResults({ results, onSelect, onReset }: FindResultsProps) {
  if (results.length === 0) {
    return (
      <div className="mono text-center py-8">
        <p className="text-sm" style={{ color: 'var(--color-text-primary)' }}>
          &gt; NO SPOTS MATCH
        </p>
        <button
          type="button"
          onClick={onReset}
          className="mono text-xs mt-3"
          style={{
            minHeight: 44, padding: '0 12px',
            background: 'none',
            border: '1px solid var(--color-steel)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--color-text-primary)',
            cursor: 'pointer',
          }}
        >
          [ RESET FILTERS ]
        </button>
      </div>
    )
  }

  return (
    <motion.ul
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-2"
    >
      {results.map((result, index) => (
        <motion.li key={result.building.id} variants={fadeInUp}>
          <FindResultRow
            building={result.building}
            pct={result.occupancy.pct}
            walkMinutes={result.walk_minutes}
            // Only the top-ranked row is accented; see FindResultRow.
            isTop={index === 0}
            onClick={() => onSelect(result.building.id)}
          />
        </motion.li>
      ))}
    </motion.ul>
  )
}
