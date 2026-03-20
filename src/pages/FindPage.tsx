import { useCallback, useState } from 'react'
import { useBuildings } from '@/hooks/useBuildings'
import { useZones } from '@/hooks/useZones'
import { useBlendedOccupancy } from '@/hooks/useBlendedOccupancy'
import { useGeolocation } from '@/hooks/useGeolocation'
import { useRecommendations } from '@/hooks/useRecommendations'
import { DEFAULT_FILTERS } from '@/types'
import type { FilterState } from '@/types'
import FilterChips from '@/components/FilterChips'
import RecommendationCard from '@/components/RecommendationCard'

export default function FindPage() {
  const { buildings } = useBuildings()
  const { zones } = useZones()
  const { occupancyMap } = useBlendedOccupancy(buildings, zones)
  const { position } = useGeolocation()
  const [filters, setFilters] = useState<FilterState>({ ...DEFAULT_FILTERS })

  const results = useRecommendations(buildings, occupancyMap, filters, position)

  const handleToggle = useCallback((key: keyof FilterState) => {
    setFilters((prev) => {
      const val = prev[key]
      if (typeof val === 'boolean') return { ...prev, [key]: !val }
      return prev
    })
  }, [])

  return (
    <div className="h-full flex flex-col" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
      {/* Header */}
      <div className="px-5 pt-12 pb-4" style={{ background: 'linear-gradient(135deg, #003865 0%, #0080A4 100%)' }}>
        <h1 className="text-xl font-bold text-white">Find a Spot</h1>
        <p className="text-xs text-white/60 mt-0.5">Filter by amenities and availability</p>
      </div>

      {/* Filter chips */}
      <FilterChips
        filters={filters}
        onToggle={handleToggle}
        onOpenSheet={() => {/* FilterSheet — future enhancement */}}
      />

      {/* Results */}
      <div className="flex-1 overflow-y-auto px-4 space-y-3 pb-4">
        {results.length > 0 ? (
          results.map((r) => <RecommendationCard key={r.building.id} ranked={r} />)
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--color-bg-primary)', border: '1px solid var(--color-border)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-tertiary)" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </div>
            <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>No spaces match</p>
            <p className="text-xs mt-1" style={{ color: 'var(--color-text-tertiary)' }}>Try removing some filters</p>
            <button
              onClick={() => setFilters({ ...DEFAULT_FILTERS })}
              className="mt-3 px-4 py-1.5 rounded-full text-xs font-medium"
              style={{ backgroundColor: 'var(--color-uom-navy)', color: '#FFFFFF' }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
