import { useCallback, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBuildings } from '@/hooks/useBuildings'
import { useZones } from '@/hooks/useZones'
import { useBlendedOccupancy } from '@/hooks/useBlendedOccupancy'
import { useGeolocation } from '@/hooks/useGeolocation'
import { useRecommendations } from '@/hooks/useRecommendations'
import { useRecentReports } from '@/hooks/useRecentReports'
import { aggregateNoise } from '@/lib/noiseAggregation'
import { DEFAULT_FILTERS } from '@/types'
import type { FilterState } from '@/types'
import FilterChips from '@/components/FilterChips'
import RecommendationCard from '@/components/RecommendationCard'
import { SkeletonBuildingRow } from '@/components/ui/SkeletonLoader'
import Button from '@/components/ui/Button'
import { staggerContainer, fadeInUp } from '@/constants/animations'

export default function FindPage() {
  const { buildings } = useBuildings()
  const { zones } = useZones()
  const { occupancyMap } = useBlendedOccupancy(buildings, zones)
  const { position } = useGeolocation()
  const [filters, setFilters] = useState<FilterState>({ ...DEFAULT_FILTERS })
  const reportsMap = useRecentReports()

  const noiseMap = useMemo(() => {
    const map = new Map<string, { level: number; count: number }>()
    for (const [buildingId, reports] of reportsMap) {
      const noise = aggregateNoise(reports)
      if (noise) map.set(buildingId, noise)
    }
    return map
  }, [reportsMap])

  const results = useRecommendations(buildings, occupancyMap, filters, position, noiseMap)
  const isLoading = buildings.length === 0

  const handleToggle = useCallback((key: keyof FilterState) => {
    setFilters((prev) => {
      const val = prev[key]
      if (typeof val === 'boolean') return { ...prev, [key]: !val }
      return prev
    })
  }, [])

  return (
    <div className="h-full flex flex-col" style={{ backgroundColor: '#F0F2F5' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(145deg, #001F3F 0%, #003865 50%, #005A8C 100%)', padding: '56px 24px 32px' }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.5px' }}>Find a Spot</h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginTop: 6 }}>Filter by amenities, distance, and availability</p>
      </div>

      {/* Filters */}
      <div style={{ padding: '16px 24px', backgroundColor: '#FFFFFF', borderBottom: '2px solid rgba(0,56,101,0.15)' }}>
        <FilterChips filters={filters} onToggle={handleToggle} onOpenSheet={() => {}} />
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto" style={{ padding: '20px 24px 32px' }}>
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {Array.from({ length: 3 }).map((_, i) => <SkeletonBuildingRow key={i} />)}
            </motion.div>
          ) : results.length > 0 ? (
            <motion.div key="results" variants={staggerContainer} initial="hidden" animate="visible" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#94A3B8', letterSpacing: '1px' }}>{results.length} RESULTS</p>
              {results.map((r) => (
                <motion.div key={r.building.id} variants={fadeInUp}>
                  <RecommendationCard ranked={r} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: 80 }}>
              <div style={{ width: 72, height: 72, borderRadius: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF', border: '2px solid rgba(0,56,101,0.65)', marginBottom: 20 }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </div>
              <p style={{ fontSize: 17, fontWeight: 600, color: '#1E293B' }}>No spaces match</p>
              <p style={{ fontSize: 14, color: '#94A3B8', marginTop: 6, textAlign: 'center' }}>Try removing some filters to see more results</p>
              <Button onClick={() => setFilters({ ...DEFAULT_FILTERS })} className="mt-5">
                Reset Filters
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
