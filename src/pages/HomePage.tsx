import { useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { staggerContainer, fadeInUp } from '@/constants/animations'
import { useBuildings } from '@/hooks/useBuildings'
import { useZones } from '@/hooks/useZones'
import { useBlendedOccupancy } from '@/hooks/useBlendedOccupancy'
import { useGeolocation } from '@/hooks/useGeolocation'
import { useFavourites } from '@/hooks/useFavourites'
import FavouriteButton from '@/components/FavouriteButton'
import { calculateWalkingTime } from '@/lib/scoring'
import { isOpenNow } from '@/lib/buildingHours'
import OccupancyBar from '@/components/OccupancyBar'
import { getOccupancyLabel, getOccupancyLevel, OCCUPANCY_COLOURS } from '@/constants/occupancy'
import type { BlendedOccupancy, Building, GooglePopularTime } from '@/types'
import { BUILDING_META } from '@/constants/buildingMeta'
import { getCurrentTypical } from '@/lib/occupancyHelpers'
import { formatHour } from '@/lib/predictionInsights'

type SortedItem = { building: Building; occ: BlendedOccupancy | null; walk: { minutes: number; meters: number } | null }

function getGreeting(): string {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning, student'
  if (h < 17) return 'Good afternoon, student'
  return 'Good evening, student'
}

export default function HomePage() {
  const { buildings } = useBuildings()
  const { zones } = useZones()
  const { occupancyMap, allTypicalRows } = useBlendedOccupancy(buildings, zones)
  const { position } = useGeolocation()
  const { favouriteIds, toggle: toggleFavourite, isFavourite } = useFavourites()
  const navigate = useNavigate()

  const sorted = useMemo(() => {
    return buildings
      .map((b) => ({ building: b, occ: occupancyMap.get(b.id) ?? null, walk: calculateWalkingTime(position, b.entrance_lat, b.entrance_lng) }))
      .sort((a, b) => (a.occ?.pct ?? 100) - (b.occ?.pct ?? 100))
  }, [buildings, occupancyMap, position])

  const favouriteSet = useMemo(() => new Set(favouriteIds), [favouriteIds])
  const favourites = sorted.filter((x) => favouriteSet.has(x.building.id))
  const quiet = sorted.filter((x) => (x.occ?.pct ?? 100) <= 40)
  const filling = sorted.filter((x) => x.occ?.trend === 'filling')
  const quietCount = sorted.filter((x) => (x.occ?.pct ?? 100) < 50).length
  const campusLabel = quietCount > sorted.length / 2 ? 'Quiet' : 'Moderate'
  const campusColor = campusLabel === 'Quiet' ? '#4CAF7D' : '#F5A623'

  const scrollRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ container: scrollRef })
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -20])

  return (
    <div ref={scrollRef} className="h-full overflow-y-auto" style={{ backgroundColor: '#F0F2F5' }}>

      {/* Header */}
      <div style={{ background: 'linear-gradient(145deg, #001F3F 0%, #003865 50%, #005A8C 100%)', padding: '56px 24px 40px', position: 'relative' }}>
        <img src="/unimelb-logo.svg" alt="University of Melbourne" style={{ position: 'absolute', top: '50%', right: 24, height: 80, transform: 'translateY(-50%)', opacity: 0.85 }} />
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', fontWeight: 400, marginBottom: 2 }}>{getGreeting()}</p>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#FFFFFF', letterSpacing: '-1px', lineHeight: 1.1 }}>UniSpace</h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginTop: 8 }}>University of Melbourne - Parkville</p>
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 6 }}>Not affiliated with the University of Melbourne</p>
      </div>

      {/* Campus At a Glance + Quiet Right Now — side by side */}
      <motion.div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 20, margin: '20px 24px 0', y: parallaxY }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>

        {/* Left: Campus At a Glance */}
        <CampusAtAGlance sorted={sorted} quietCount={quietCount} campusLabel={campusLabel} campusColor={campusColor} allTypicalRows={allTypicalRows} />

        {/* Right: Quiet Right Now */}
        {quiet.length > 0 && (
          <SectionCard title="QUIET RIGHT NOW">
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {quiet.slice(0, 9).map((x) => (
                <motion.div key={x.building.id} variants={fadeInUp}>
                  <CompactCard building={x.building} occ={x.occ} walkMin={x.walk?.minutes ?? null} onClick={() => navigate(`/map?building=${x.building.id}`)} isFav={isFavourite(x.building.id)} onToggleFav={() => toggleFavourite(x.building.id)} />
                </motion.div>
              ))}
            </motion.div>
          </SectionCard>
        )}
      </motion.div>

      {/* Your Favourites */}
      {favourites.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }} style={{ margin: '20px 24px 0' }}>
          <SectionCard title="YOUR FAVOURITES">
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
              {favourites.slice(0, 8).map((x) => (
                <motion.div key={x.building.id} variants={fadeInUp}>
                  <CompactCard building={x.building} occ={x.occ} walkMin={x.walk?.minutes ?? null} onClick={() => navigate(`/map?building=${x.building.id}`)} isFav={isFavourite(x.building.id)} onToggleFav={() => toggleFavourite(x.building.id)} />
                </motion.div>
              ))}
            </motion.div>
          </SectionCard>
        </motion.div>
      )}

      {/* Filling Up */}
      {filling.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }} style={{ margin: '16px 24px 0' }}>
          <SectionCard title="FILLING UP">
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
              {filling.slice(0, 8).map((x) => (
                <motion.div key={x.building.id} variants={fadeInUp}>
                  <CompactCard building={x.building} occ={x.occ} walkMin={x.walk?.minutes ?? null} onClick={() => navigate(`/map?building=${x.building.id}`)} isFav={isFavourite(x.building.id)} onToggleFav={() => toggleFavourite(x.building.id)} />
                </motion.div>
              ))}
            </motion.div>
          </SectionCard>
        </motion.div>
      )}

      {/* All Buildings */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.35 }}>
        <AllBuildingsSection sorted={sorted} navigate={navigate} isFavourite={isFavourite} toggleFavourite={toggleFavourite} allTypicalRows={allTypicalRows} />
      </motion.div>
    </div>
  )
}

function SectionCard({ title, children, style }: { title: string; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ padding: 24, backgroundColor: '#FFFFFF', borderRadius: 20, boxShadow: '0 4px 20px rgba(0,56,101,0.06)', border: '2px solid rgba(0,56,101,0.65)', ...style }}>
      <h2 style={{ fontSize: 12, fontWeight: 700, color: '#94A3B8', letterSpacing: '1px', marginBottom: 16 }}>{title}</h2>
      {children}
    </div>
  )
}

function CampusAtAGlance({ sorted, quietCount, campusLabel, campusColor, allTypicalRows }: { sorted: SortedItem[]; quietCount: number; campusLabel: string; campusColor: string; allTypicalRows: GooglePopularTime[] }) {
  const openCount = sorted.filter((x) => isOpenNow(x.building).open).length
  const withData = sorted.filter((x) => x.occ?.pct !== null && x.occ?.pct !== undefined)
  const avgOccupancy = withData.length > 0
    ? Math.round(withData.reduce((sum, x) => sum + (x.occ?.pct ?? 0), 0) / withData.length)
    : null

  const quietest = withData.length > 0
    ? withData.reduce((min, x) => (x.occ!.pct! < min.occ!.pct! ? x : min))
    : null
  const busiest = withData.length > 0
    ? withData.reduce((max, x) => (x.occ!.pct! > max.occ!.pct! ? x : max))
    : null

  // Find peak hour today across all buildings
  const today = new Date().getDay()
  const todayRows = allTypicalRows.filter((r) => r.day_of_week === today)
  const hourTotals = new Map<number, number>()
  for (const row of todayRows) {
    hourTotals.set(row.hour_of_day, (hourTotals.get(row.hour_of_day) ?? 0) + row.typical_popularity)
  }
  let peakHour: number | null = null
  let peakVal = 0
  for (const [hour, total] of hourTotals) {
    if (total > peakVal) { peakVal = total; peakHour = hour }
  }

  return (
    <div style={{ padding: 24, backgroundColor: '#FFFFFF', borderRadius: 20, boxShadow: '0 4px 20px rgba(0,56,101,0.06)', border: '2px solid rgba(0,56,101,0.65)', display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Campus status header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
          <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: campusColor, boxShadow: `0 0 8px ${campusColor}50` }} />
          <span style={{ fontSize: 18, fontWeight: 700, color: '#1E293B' }}>Campus is {campusLabel}</span>
        </div>
        <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.5 }}>
          {quietCount} of {sorted.length} buildings under 50%
        </p>
      </div>

      {/* Divider */}
      <div style={{ height: 1, backgroundColor: 'rgba(0,56,101,0.1)' }} />

      {/* Stats */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <h3 style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', letterSpacing: '1px', margin: 0 }}>AT A GLANCE</h3>

        <StatRow label="Buildings" value={`${sorted.length} total · ${openCount} open`} />
        {avgOccupancy !== null && <StatRow label="Avg occupancy" value={`${avgOccupancy}%`} />}
        {quietest && <StatRow label="Quietest" value={`${quietest.building.short_name || quietest.building.name} (${Math.round(quietest.occ!.pct!)}%)`} color="#4CAF7D" />}
        {busiest && <StatRow label="Busiest" value={`${busiest.building.short_name || busiest.building.name} (${Math.round(busiest.occ!.pct!)}%)`} color="#E05252" />}
        {peakHour !== null && <StatRow label="Peak hour today" value={formatHour(peakHour)} />}
      </div>
    </div>
  )
}

function StatRow({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontSize: 13, color: '#64748B' }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 600, color: color ?? '#1E293B' }}>{value}</span>
    </div>
  )
}

function CompactCard({ building, occ, walkMin, onClick, isFav, onToggleFav }: { building: Building; occ: BlendedOccupancy | null; walkMin: number | null; onClick: () => void; isFav: boolean; onToggleFav: () => void }) {
  const pct = occ?.pct ?? null
  const colour = OCCUPANCY_COLOURS[getOccupancyLevel(pct)]
  const status = isOpenNow(building)

  return (
    <motion.div role="button" tabIndex={0} onClick={onClick} onKeyDown={(e: React.KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick() } }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.15 }} style={{ width: '100%', padding: 18, backgroundColor: '#FAFBFD', borderRadius: 16, border: '2px solid rgba(0,56,101,0.65)', borderLeft: `4px solid ${colour}`, textAlign: 'left', cursor: 'pointer', position: 'relative', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
      <div style={{ position: 'absolute', top: 6, right: 2 }}>
        <FavouriteButton isFavourite={isFav} onToggle={onToggleFav} size={16} />
      </div>
      <p style={{ fontSize: 14, fontWeight: 600, color: '#1E293B', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: 20 }}>{building.short_name || building.name}</p>
      <p style={{ fontSize: 32, fontWeight: 800, color: colour, marginTop: 10, lineHeight: 1 }}>{pct !== null ? `${Math.round(pct)}%` : '--'}</p>
      <div style={{ marginTop: 10 }}><OccupancyBar pct={pct} height={5} /></div>
      <p style={{ fontSize: 13, color: '#64748B', marginTop: 8 }}>{getOccupancyLabel(pct)}</p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: status.open ? '#4CAF7D' : '#E05252' }} />
          <span style={{ fontSize: 12, color: '#94A3B8' }}>{status.open ? 'Open' : 'After hours'}</span>
        </div>
        {walkMin !== null && <span style={{ fontSize: 12, color: '#94A3B8' }}>~{Math.round(walkMin)}m</span>}
      </div>
    </motion.div>
  )
}

function AllBuildingsSection({ sorted, navigate, isFavourite, toggleFavourite, allTypicalRows }: { sorted: SortedItem[]; navigate: (path: string) => void; isFavourite: (id: string) => boolean; toggleFavourite: (id: string) => void; allTypicalRows: GooglePopularTime[] }) {
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<'occupancy' | 'name' | 'distance'>('occupancy')

  const filtered = useMemo(() => {
    let list = sorted
    if (search) {
      const q = search.toLowerCase()
      list = list.filter((x) => x.building.name.toLowerCase().includes(q) || (x.building.short_name?.toLowerCase().includes(q) ?? false))
    }
    if (sortBy === 'name') list = [...list].sort((a, b) => a.building.name.localeCompare(b.building.name))
    else if (sortBy === 'distance') list = [...list].sort((a, b) => (a.walk?.minutes ?? 999) - (b.walk?.minutes ?? 999))
    return list
  }, [sorted, search, sortBy])

  return (
    <div style={{ margin: '16px 24px 24px', padding: 24, backgroundColor: '#FFFFFF', borderRadius: 20, boxShadow: '0 4px 20px rgba(0,56,101,0.06)', border: '2px solid rgba(0,56,101,0.65)' }}>
      <h2 style={{ fontSize: 12, fontWeight: 700, color: '#94A3B8', letterSpacing: '1px', marginBottom: 14 }}>ALL BUILDINGS</h2>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: 12 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" style={{ position: 'absolute', left: 12, top: 11 }}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input
          type="text"
          placeholder="Search buildings..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: '100%', padding: '10px 12px 10px 36px', borderRadius: 12, border: '1px solid #EDF0F4', fontSize: 14, color: '#1E293B', backgroundColor: '#FAFBFD', outline: 'none' }}
        />
      </div>

      {/* Sort buttons */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        {(['occupancy', 'name', 'distance'] as const).map((s) => (
          <button key={s} onClick={() => setSortBy(s)} style={{ fontSize: 12, fontWeight: sortBy === s ? 600 : 400, padding: '5px 12px', borderRadius: 8, backgroundColor: sortBy === s ? '#003865' : '#F0F2F5', color: sortBy === s ? '#FFFFFF' : '#64748B', border: 'none', cursor: 'pointer', textTransform: 'capitalize' }}>
            {s}
          </button>
        ))}
      </div>

      {/* List */}
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {filtered.map((x) => (
          <motion.div key={x.building.id} variants={fadeInUp}>
            <BuildingRow building={x.building} occ={x.occ} walkMin={x.walk?.minutes ?? null} onClick={() => navigate(`/map?building=${x.building.id}`)} isFav={isFavourite(x.building.id)} onToggleFav={() => toggleFavourite(x.building.id)} allTypicalRows={allTypicalRows} />
          </motion.div>
        ))}
        {filtered.length === 0 && <p style={{ fontSize: 14, color: '#94A3B8', textAlign: 'center', padding: 20 }}>No buildings match your search</p>}
      </motion.div>
    </div>
  )
}

function BuildingRow({ building, occ, walkMin, onClick, isFav, onToggleFav, allTypicalRows }: { building: Building; occ: BlendedOccupancy | null; walkMin: number | null; onClick: () => void; isFav: boolean; onToggleFav: () => void; allTypicalRows: GooglePopularTime[] }) {
  const pct = occ?.pct ?? null
  const colour = OCCUPANCY_COLOURS[getOccupancyLevel(pct)]
  const status = isOpenNow(building)
  const meta = BUILDING_META[building.slug]
  const amenities = [
    building.has_wifi ? 'WiFi' : null, building.has_power ? 'Power' : null,
    building.has_food_nearby ? 'Food nearby' : null,
    building.has_quiet_zone ? 'Quiet zones' : null, building.has_group_seating ? 'Group seating' : null,
    building.is_ground_floor_accessible ? 'Accessible' : null,
  ].filter((a): a is string => a !== null)

  // Prediction hint: what's typical right now
  const typical = getCurrentTypical(allTypicalRows, building.id)
  const typicalPct = typical?.typical_popularity ?? null

  // Find peak hour today
  const todayRows = allTypicalRows
    .filter((r) => r.building_id === building.id && r.day_of_week === new Date().getDay())
    .sort((a, b) => b.typical_popularity - a.typical_popularity)
  const peakRow = todayRows[0]

  return (
    <motion.div role="button" tabIndex={0} onClick={onClick} onKeyDown={(e: React.KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick() } }} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} transition={{ duration: 0.15 }} style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: 22, textAlign: 'left', borderRadius: 18, backgroundColor: '#FAFBFD', border: '2px solid rgba(0,56,101,0.65)', borderLeft: `4px solid ${colour}`, cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
      {/* Header: name + percentage + heart */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', width: '100%' }}>
        <div style={{ flex: 1, minWidth: 0, paddingRight: 12 }}>
          <p style={{ fontSize: 20, fontWeight: 700, color: '#1E293B', lineHeight: 1.2 }}>{building.name}</p>
          {meta && (
            <>
              <span style={{ display: 'inline-block', fontSize: 11, padding: '3px 10px', borderRadius: 6, backgroundColor: '#EDF0F4', color: '#64748B', marginTop: 6 }}>{meta.address}</span>
              <p style={{ fontSize: 14, color: '#64748B', marginTop: 8, lineHeight: 1.6 }}>{meta.description}</p>
            </>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
          <span style={{ fontSize: 22, fontWeight: 700, color: colour }}>{pct !== null ? `${Math.round(pct)}%` : '--'}</span>
          <FavouriteButton isFavourite={isFav} onToggle={onToggleFav} size={18} />
        </div>
      </div>

      {/* Occupancy bar */}
      <div style={{ marginTop: 12, width: '100%' }}><OccupancyBar pct={pct} height={6} /></div>

      {/* Status + walk time */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
        <span style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: status.open ? '#4CAF7D' : '#E05252' }} />
        <span style={{ fontSize: 13, color: '#64748B' }}>
          {status.open ? `Open - Closes ${status.closesAt}` : 'After hours - Keycard access'}
          {walkMin !== null ? ` - ~${Math.round(walkMin)} min walk` : ''}
        </span>
      </div>

      {/* Prediction hint + capacity */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
        {typicalPct !== null && (
          <span style={{ fontSize: 12, color: '#0080A4', fontWeight: 500 }}>
            Usually {typicalPct}% at this time
          </span>
        )}
        {peakRow && (
          <span style={{ fontSize: 12, color: '#94A3B8' }}>
            - Peaks at {formatHour(peakRow.hour_of_day)} ({peakRow.typical_popularity}%)
          </span>
        )}
      </div>

      {/* Capacity */}
      {building.estimated_capacity && (
        <p style={{ fontSize: 12, color: '#94A3B8', marginTop: 4 }}>~{building.estimated_capacity} seats</p>
      )}

      {/* Nearby food */}
      {meta?.nearbyFood?.[0] && (
        <p style={{ fontSize: 12, color: '#94A3B8', marginTop: 4 }}>Nearby: {meta.nearbyFood[0]}</p>
      )}

      {/* Amenities + directions */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {amenities.map((a) => (
            <span key={a} style={{ fontSize: 11, padding: '2px 8px', borderRadius: 6, backgroundColor: '#EDF0F4', color: '#64748B' }}>{a}</span>
          ))}
        </div>
        <a href={`https://www.google.com/maps/dir/?api=1&destination=${building.entrance_lat},${building.entrance_lng}`}
          target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
          style={{ fontSize: 12, fontWeight: 600, color: '#003865', textDecoration: 'none', flexShrink: 0 }}>
          Directions
        </a>
      </div>
    </motion.div>
  )
}
