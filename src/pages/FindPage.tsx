import { useCallback, useMemo, useState } from 'react'
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
import PageHeader from '@/components/ui/PageHeader'
import Button from '@/components/ui/Button'
import { SkeletonBuildingRow } from '@/components/ui/SkeletonLoader'

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
    <div className="h-full flex flex-col bg-[var(--color-bg-page)]">
      <PageHeader title="Find a Spot" subtitle="Filter by amenities, distance, and availability" />

      <div className="py-4 px-5 bg-[var(--color-bg-elevated)] border-b border-[var(--color-border)]">
        <FilterChips filters={filters} onToggle={handleToggle} onOpenSheet={() => {}} />
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 pb-6 max-w-2xl mx-auto w-full">
        {isLoading ? (
          <div className="flex flex-col gap-3.5">
            <p className="text-[13px] text-[var(--color-text-tertiary)] font-semibold">Loading...</p>
            {Array.from({ length: 3 }).map((_, i) => <SkeletonBuildingRow key={i} />)}
          </div>
        ) : results.length > 0 ? (
          <div className="flex flex-col gap-3.5">
            <p className="text-[13px] text-[var(--color-text-tertiary)] font-semibold">{results.length} RESULTS</p>
            {results.map((r) => <RecommendationCard key={r.building.id} ranked={r} />)}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center pt-20">
            <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center bg-[var(--color-bg-elevated)] border border-[var(--color-border)] shadow-card mb-5">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-tertiary)" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </div>
            <p className="text-[17px] font-semibold text-[var(--color-text-primary)]">No spaces match</p>
            <p className="text-sm text-[var(--color-text-tertiary)] mt-1.5 text-center">Try removing some filters to see more results</p>
            <Button onClick={() => setFilters({ ...DEFAULT_FILTERS })} className="mt-5">
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
