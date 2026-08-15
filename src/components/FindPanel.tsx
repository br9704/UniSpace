import { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Building, BlendedOccupancy, FilterState } from '@/types'
import { useRecommendations } from '@/hooks/useRecommendations'
import { useRecentReports } from '@/hooks/useRecentReports'
import { aggregateNoise } from '@/lib/noiseAggregation'
import FindResults from './FindResults'
import FilterChipRow from './FilterChipRow'
import { useFindFilters, type OccupancyFilter } from '@/hooks/useFindFilters'
import { useDismissOnEscape } from '@/hooks/useDismissOnEscape'

interface FindPanelProps {
  visible: boolean
  onDismiss: () => void
  buildings: Building[]
  occupancyMap: Map<string, BlendedOccupancy>
  userPosition: { latitude: number; longitude: number } | null
  onBuildingSelect: (id: string) => void
}

const AMENITY_CHIPS: { key: keyof FilterState & string; label: string }[] = [
  { key: 'currently_open', label: 'Open now' },
  { key: 'has_quiet_zone', label: 'Quiet zone' },
  { key: 'has_food_nearby', label: 'Food nearby' },
]

const OCCUPANCY_CHIPS: { key: OccupancyFilter; label: string }[] = [
  { key: 'under50', label: 'Under 50%' },
  { key: 'under30', label: 'Under 30%' },
]

export default function FindPanel({
  visible, onDismiss, buildings, occupancyMap, userPosition, onBuildingSelect,
}: FindPanelProps) {
  // Gated on `visible`: this panel stays mounted when closed, so an ungated
  // listener would swallow Escape for whatever is actually open.
  useDismissOnEscape(onDismiss, visible)

  const { effectiveFilters, isFilterActive, isCapActive, toggleFilter, toggleCap, reset } =
    useFindFilters()
  const reportsMap = useRecentReports()

  const noiseMap = useMemo(() => {
    const map = new Map<string, { level: number; count: number }>()
    for (const [buildingId, reports] of reportsMap) {
      const noise = aggregateNoise(reports)
      if (noise) map.set(buildingId, noise)
    }
    return map
  }, [reportsMap])

  const results = useRecommendations(
    buildings, occupancyMap, effectiveFilters, userPosition, noiseMap,
  )

  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onDismiss}
            style={{ position: 'fixed', inset: 0, backgroundColor: 'var(--color-bg-overlay)', zIndex: 80 }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Find a spot"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 85,
              maxHeight: '72vh', maxWidth: 480, marginInline: 'auto',
              backgroundColor: 'var(--color-bg)',
              borderTop: '1px solid var(--color-steel)',
              display: 'flex', flexDirection: 'column',
            }}
          >
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ borderBottom: '1px solid var(--color-hairline)' }}
            >
              <h2 className="mono text-sm tracking-wide" style={{ color: 'var(--color-text-primary)' }}>
                Find a spot
              </h2>
              <button
                type="button"
                onClick={onDismiss}
                aria-label="Close"
                className="mono flex items-center justify-center text-sm"
                style={{
                  minWidth: 44, minHeight: 44,
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--color-text-secondary)',
                }}
              >
                ✕
              </button>
            </div>

            <div className="flex gap-2 flex-wrap px-4 py-3">
              <FilterChipRow
                chips={AMENITY_CHIPS}
                isActive={isFilterActive}
                onToggle={toggleFilter}
              />
              <FilterChipRow chips={OCCUPANCY_CHIPS} isActive={isCapActive} onToggle={toggleCap} />
            </div>

            <div className="flex-1 overflow-y-auto px-4 pb-6">
              <p className="mono text-xs mb-3" style={{ color: 'var(--color-text-muted)' }}>
                {results.length} {results.length === 1 ? 'RESULT' : 'RESULTS'}
              </p>

              <FindResults
                results={results}
                onSelect={(id) => { onBuildingSelect(id); onDismiss() }}
                onReset={reset}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
