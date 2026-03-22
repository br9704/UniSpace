import { useCallback, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Building, BlendedOccupancy, FilterState } from '@/types'
import { DEFAULT_FILTERS } from '@/types'
import { useRecommendations } from '@/hooks/useRecommendations'
import { useRecentReports } from '@/hooks/useRecentReports'
import { aggregateNoise } from '@/lib/noiseAggregation'
import { isOpenNow } from '@/lib/buildingHours'
import OccupancyBar from './OccupancyBar'
import { getOccupancyLevel, OCCUPANCY_COLOURS, getOccupancyLabel } from '@/constants/occupancy'
import { staggerContainer, fadeInUp } from '@/constants/animations'

interface FindPanelProps {
  visible: boolean
  onDismiss: () => void
  buildings: Building[]
  occupancyMap: Map<string, BlendedOccupancy>
  userPosition: { latitude: number; longitude: number } | null
  onBuildingSelect: (id: string) => void
}

type CustomFilter = 'under50' | 'under30'

const AMENITY_CHIPS: { key: keyof FilterState; label: string }[] = [
  { key: 'currently_open', label: 'Open Now' },
  { key: 'has_quiet_zone', label: 'Quiet Zone' },
  { key: 'has_food_nearby', label: 'Food Nearby' },
]

const OCCUPANCY_CHIPS: { key: CustomFilter; label: string }[] = [
  { key: 'under50', label: 'Under 50%' },
  { key: 'under30', label: 'Under 30%' },
]

export default function FindPanel({ visible, onDismiss, buildings, occupancyMap, userPosition, onBuildingSelect }: FindPanelProps) {
  const [filters, setFilters] = useState<FilterState>({ ...DEFAULT_FILTERS, currently_open: false, max_walk_minutes: 999 })
  const [customFilters, setCustomFilters] = useState<Record<CustomFilter, boolean>>({ under50: false, under30: false })
  const reportsMap = useRecentReports()

  const noiseMap = useMemo(() => {
    const map = new Map<string, { level: number; count: number }>()
    for (const [buildingId, reports] of reportsMap) {
      const noise = aggregateNoise(reports)
      if (noise) map.set(buildingId, noise)
    }
    return map
  }, [reportsMap])

  // Apply occupancy cap from custom filters
  const effectiveFilters = useMemo(() => {
    const f = { ...filters }
    if (customFilters.under30) f.max_occupancy_pct = 30
    else if (customFilters.under50) f.max_occupancy_pct = 50
    else f.max_occupancy_pct = 100
    return f
  }, [filters, customFilters])

  const results = useRecommendations(buildings, occupancyMap, effectiveFilters, userPosition, noiseMap)

  const handleToggle = useCallback((key: keyof FilterState) => {
    setFilters((prev) => {
      const val = prev[key]
      if (typeof val === 'boolean') return { ...prev, [key]: !val }
      return prev
    })
  }, [])

  const handleCustomToggle = useCallback((key: CustomFilter) => {
    setCustomFilters((prev) => {
      // Mutually exclusive: under30 and under50
      if (key === 'under30') return { under50: false, under30: !prev.under30 }
      if (key === 'under50') return { under30: false, under50: !prev.under50 }
      return prev
    })
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onDismiss}
            style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.3)', zIndex: 80 }}
          />

          {/* Panel */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            style={{
              position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 85,
              maxHeight: '70vh',
              backgroundColor: '#F0F2F5',
              borderTopLeftRadius: 20, borderTopRightRadius: 20,
              boxShadow: '0 -8px 40px rgba(0,0,0,0.15)',
              display: 'flex', flexDirection: 'column',
            }}
          >
            {/* Header */}
            <div style={{ padding: '14px 20px 12px', borderBottom: '1px solid rgba(0,56,101,0.1)', backgroundColor: '#FFFFFF', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ width: 36, height: 4, borderRadius: 2, backgroundColor: '#CBD5E1', margin: '0 auto' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1E293B', margin: 0 }}>Find a Spot</h2>
                <button onClick={onDismiss} aria-label="Close" style={{ width: 32, height: 32, borderRadius: 16, border: 'none', backgroundColor: '#F0F2F5', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
            </div>

            {/* Filter chips */}
            <div style={{ padding: '12px 20px', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {AMENITY_CHIPS.map(({ key, label }) => {
                const active = Boolean(filters[key])
                return (
                  <button
                    key={key}
                    onClick={() => handleToggle(key)}
                    style={{
                      padding: '6px 14px', borderRadius: 20, fontSize: 13, fontWeight: 500, cursor: 'pointer',
                      backgroundColor: active ? '#003865' : '#FFFFFF',
                      color: active ? '#FFFFFF' : '#64748B',
                      border: `1.5px solid ${active ? '#003865' : 'rgba(0,56,101,0.2)'}`,
                    }}
                  >
                    {label}
                  </button>
                )
              })}
              {OCCUPANCY_CHIPS.map(({ key, label }) => {
                const active = customFilters[key]
                return (
                  <button
                    key={key}
                    onClick={() => handleCustomToggle(key)}
                    style={{
                      padding: '6px 14px', borderRadius: 20, fontSize: 13, fontWeight: 500, cursor: 'pointer',
                      backgroundColor: active ? '#4CAF7D' : '#FFFFFF',
                      color: active ? '#FFFFFF' : '#64748B',
                      border: `1.5px solid ${active ? '#4CAF7D' : 'rgba(0,56,101,0.2)'}`,
                    }}
                  >
                    {label}
                  </button>
                )
              })}
            </div>

            {/* Results */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 20px' }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#94A3B8', letterSpacing: '1px', marginBottom: 12 }}>
                {results.length} RESULTS
              </p>
              {results.length > 0 ? (
                <motion.div variants={staggerContainer} initial="hidden" animate="visible" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {results.map((r) => (
                    <motion.div key={r.building.id} variants={fadeInUp}>
                      <FindResultRow
                        building={r.building}
                        pct={r.occupancy.pct}
                        walkMin={r.walk_minutes}
                        onClick={() => { onBuildingSelect(r.building.id); onDismiss() }}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div style={{ textAlign: 'center', padding: '32px 0' }}>
                  <p style={{ fontSize: 15, fontWeight: 600, color: '#1E293B' }}>No spots match</p>
                  <p style={{ fontSize: 13, color: '#94A3B8', marginTop: 4 }}>Try removing some filters</p>
                  <button onClick={() => { setFilters({ ...DEFAULT_FILTERS, currently_open: false, max_walk_minutes: 999 }); setCustomFilters({ under50: false, under30: false }) }} style={{ marginTop: 12, padding: '8px 20px', borderRadius: 10, border: 'none', backgroundColor: '#003865', color: '#FFFFFF', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function FindResultRow({ building, pct, walkMin, onClick }: { building: Building; pct: number | null; walkMin: number | null; onClick: () => void }) {
  const colour = OCCUPANCY_COLOURS[getOccupancyLevel(pct)]
  const status = isOpenNow(building)

  return (
    <button onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 14, width: '100%', padding: '14px 16px',
      backgroundColor: '#FFFFFF', borderRadius: 14, border: '1.5px solid rgba(0,56,101,0.15)',
      borderLeft: `4px solid ${colour}`, cursor: 'pointer', textAlign: 'left',
      boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
    }}>
      {/* Percentage */}
      <div style={{ width: 52, textAlign: 'center', flexShrink: 0 }}>
        <p style={{ fontSize: 22, fontWeight: 800, color: colour, lineHeight: 1, margin: 0 }}>
          {pct !== null ? `${Math.round(pct)}%` : '--'}
        </p>
        <p style={{ fontSize: 10, color: '#94A3B8', margin: '2px 0 0' }}>{getOccupancyLabel(pct)}</p>
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 15, fontWeight: 600, color: '#1E293B', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {building.short_name || building.name}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
          <span style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: status.open ? '#4CAF7D' : '#E05252' }} />
          <span style={{ fontSize: 12, color: '#94A3B8' }}>{status.open ? 'Open' : 'Closed'}</span>
          {walkMin !== null && <span style={{ fontSize: 12, color: '#94A3B8' }}>· ~{Math.round(walkMin)} min</span>}
        </div>
        <div style={{ marginTop: 6 }}><OccupancyBar pct={pct} height={4} /></div>
      </div>
    </button>
  )
}
