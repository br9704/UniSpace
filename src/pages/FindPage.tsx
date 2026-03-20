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
    <div className="h-full flex flex-col" style={{ backgroundColor: '#F0F2F5' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(145deg, #001F3F 0%, #003865 50%, #005A8C 100%)', padding: '56px 24px 32px' }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.5px' }}>Find a Spot</h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginTop: 6 }}>Filter by amenities, distance, and availability</p>
      </div>

      {/* Filter chips */}
      <div style={{ padding: '16px 20px', backgroundColor: '#FFFFFF', borderBottom: '1px solid #EDF0F4' }}>
        <FilterChips filters={filters} onToggle={handleToggle} onOpenSheet={() => {}} />
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto" style={{ padding: '16px 20px 24px' }}>
        {results.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <p style={{ fontSize: 13, color: '#94A3B8', fontWeight: 600 }}>{results.length} RESULTS</p>
            {results.map((r) => <RecommendationCard key={r.building.id} ranked={r} />)}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: 80 }}>
            <div style={{ width: 72, height: 72, borderRadius: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF', border: '1px solid #EDF0F4', boxShadow: '0 4px 16px rgba(0,0,0,0.04)', marginBottom: 20 }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </div>
            <p style={{ fontSize: 17, fontWeight: 600, color: '#1E293B' }}>No spaces match</p>
            <p style={{ fontSize: 14, color: '#94A3B8', marginTop: 6, textAlign: 'center' }}>Try removing some filters to see more results</p>
            <button
              onClick={() => setFilters({ ...DEFAULT_FILTERS })}
              style={{ marginTop: 20, padding: '10px 24px', borderRadius: 12, fontSize: 14, fontWeight: 600, backgroundColor: '#003865', color: '#FFFFFF', border: 'none', cursor: 'pointer' }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
