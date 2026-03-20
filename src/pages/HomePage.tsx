import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBuildings } from '@/hooks/useBuildings'
import { useZones } from '@/hooks/useZones'
import { useBlendedOccupancy } from '@/hooks/useBlendedOccupancy'
import { useGeolocation } from '@/hooks/useGeolocation'
import { calculateWalkingTime } from '@/lib/scoring'
import { isOpenNow } from '@/lib/buildingHours'
import OccupancyBar from '@/components/OccupancyBar'
import { getOccupancyLabel, getOccupancyLevel, OCCUPANCY_COLOURS } from '@/constants/occupancy'
import type { BlendedOccupancy, Building } from '@/types'
import { BUILDING_META } from '@/constants/buildingMeta'

function getGreeting(): string {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning, student'
  if (h < 17) return 'Good afternoon, student'
  return 'Good evening, student'
}

export default function HomePage() {
  const { buildings } = useBuildings()
  const { zones } = useZones()
  const { occupancyMap } = useBlendedOccupancy(buildings, zones)
  const { position } = useGeolocation()
  const navigate = useNavigate()

  const sorted = useMemo(() => {
    return buildings
      .map((b) => ({ building: b, occ: occupancyMap.get(b.id) ?? null, walk: calculateWalkingTime(position, b.entrance_lat, b.entrance_lng) }))
      .filter((x) => x.occ?.pct !== null && x.occ?.pct !== undefined)
      .sort((a, b) => (a.occ?.pct ?? 100) - (b.occ?.pct ?? 100))
  }, [buildings, occupancyMap, position])

  const quiet = sorted.filter((x) => (x.occ?.pct ?? 100) <= 40)
  const filling = sorted.filter((x) => x.occ?.trend === 'filling')
  const quietCount = sorted.filter((x) => (x.occ?.pct ?? 100) < 50).length
  const campusLabel = quietCount > sorted.length / 2 ? 'Quiet' : 'Moderate'
  const campusColor = campusLabel === 'Quiet' ? '#4CAF7D' : '#F5A623'

  return (
    <div className="h-full overflow-y-auto" style={{ backgroundColor: '#F0F2F5' }}>

      {/* ── Header ── */}
      <div style={{ background: 'linear-gradient(145deg, #001F3F 0%, #003865 50%, #005A8C 100%)', padding: '56px 24px 40px' }}>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', fontWeight: 400, marginBottom: 2 }}>{getGreeting()}</p>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#FFFFFF', letterSpacing: '-1px', lineHeight: 1.1 }}>UniSpace</h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginTop: 8 }}>University of Melbourne · Parkville</p>
      </div>

      {/* ── Campus Status ── */}
      <div style={{ margin: '-20px 24px 0', padding: 24, backgroundColor: '#FFFFFF', borderRadius: 20, boxShadow: '0 8px 32px rgba(0,56,101,0.08), 0 2px 8px rgba(0,0,0,0.03)', border: '1px solid rgba(0,56,101,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: campusColor, boxShadow: `0 0 10px ${campusColor}50` }} />
          <span style={{ fontSize: 20, fontWeight: 700, color: '#1E293B' }}>Campus is {campusLabel}</span>
        </div>
        <p style={{ fontSize: 14, color: '#64748B', marginTop: 8, lineHeight: 1.5 }}>
          {quietCount} of {sorted.length} buildings are under 50% capacity right now
        </p>
      </div>

      {/* ── Quiet Right Now ── */}
      {quiet.length > 0 && (
        <SectionCard title="QUIET RIGHT NOW" style={{ margin: '20px 24px 0' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
            {quiet.slice(0, 8).map((x) => (
              <CompactCard key={x.building.id} building={x.building} occ={x.occ} walkMin={x.walk?.minutes ?? null} onClick={() => navigate(`/map?building=${x.building.id}`)} />
            ))}
          </div>
        </SectionCard>
      )}

      {/* ── Filling Up ── */}
      {filling.length > 0 && (
        <SectionCard title="FILLING UP" style={{ margin: '16px 24px 0' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
            {filling.slice(0, 8).map((x) => (
              <CompactCard key={x.building.id} building={x.building} occ={x.occ} walkMin={x.walk?.minutes ?? null} onClick={() => navigate(`/map?building=${x.building.id}`)} />
            ))}
          </div>
        </SectionCard>
      )}

      {/* ── All Buildings ── */}
      <AllBuildingsSection sorted={sorted} navigate={navigate} />
    </div>
  )
}

function SectionCard({ title, children, style }: { title: string; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ padding: 24, backgroundColor: '#FFFFFF', borderRadius: 20, boxShadow: '0 4px 20px rgba(0,56,101,0.06)', border: '1px solid rgba(0,56,101,0.06)', ...style }}>
      <h2 style={{ fontSize: 12, fontWeight: 700, color: '#94A3B8', letterSpacing: '1px', marginBottom: 16 }}>{title}</h2>
      {children}
    </div>
  )
}

function CompactCard({ building, occ, walkMin, onClick }: { building: Building; occ: BlendedOccupancy | null; walkMin: number | null; onClick: () => void }) {
  const pct = occ?.pct ?? null
  const colour = OCCUPANCY_COLOURS[getOccupancyLevel(pct)]
  const status = isOpenNow(building)

  return (
    <button onClick={onClick} style={{ flexShrink: 0, width: 152, padding: 18, backgroundColor: '#FAFBFD', borderRadius: 16, border: '1px solid #EDF0F4', borderLeft: `4px solid ${colour}`, textAlign: 'left', transition: 'transform 150ms', cursor: 'pointer' }}>
      <p style={{ fontSize: 14, fontWeight: 600, color: '#1E293B', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{building.short_name || building.name}</p>
      <p style={{ fontSize: 32, fontWeight: 800, color: colour, marginTop: 10, lineHeight: 1 }}>{pct !== null ? `${Math.round(pct)}%` : '—'}</p>
      <div style={{ marginTop: 10 }}><OccupancyBar pct={pct} height={5} /></div>
      <p style={{ fontSize: 13, color: '#64748B', marginTop: 8 }}>{getOccupancyLabel(pct)}</p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: status.open ? '#4CAF7D' : '#E05252' }} />
          <span style={{ fontSize: 12, color: '#94A3B8' }}>{status.open ? 'Open' : 'After hours'}</span>
        </div>
        {walkMin !== null && <span style={{ fontSize: 12, color: '#94A3B8' }}>~{Math.round(walkMin)}m</span>}
      </div>
    </button>
  )
}

type SortedItem = { building: Building; occ: BlendedOccupancy | null; walk: { minutes: number; meters: number } | null }

function AllBuildingsSection({ sorted, navigate }: { sorted: SortedItem[]; navigate: (path: string) => void }) {
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
    <div style={{ margin: '16px 24px 24px', padding: 24, backgroundColor: '#FFFFFF', borderRadius: 20, boxShadow: '0 4px 20px rgba(0,56,101,0.06)', border: '1px solid rgba(0,56,101,0.06)' }}>
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.map((x) => (
          <BuildingRow key={x.building.id} building={x.building} occ={x.occ} walkMin={x.walk?.minutes ?? null} onClick={() => navigate(`/map?building=${x.building.id}`)} />
        ))}
        {filtered.length === 0 && <p style={{ fontSize: 14, color: '#94A3B8', textAlign: 'center', padding: 20 }}>No buildings match your search</p>}
      </div>
    </div>
  )
}

function BuildingRow({ building, occ, walkMin, onClick }: { building: Building; occ: BlendedOccupancy | null; walkMin: number | null; onClick: () => void }) {
  const pct = occ?.pct ?? null
  const colour = OCCUPANCY_COLOURS[getOccupancyLevel(pct)]
  const status = isOpenNow(building)
  const meta = BUILDING_META[building.slug]
  const amenities = [
    building.has_wifi ? 'WiFi' : null, building.has_power ? 'Power' : null,
    building.has_quiet_zone ? 'Quiet' : null, building.has_group_seating ? 'Group' : null,
  ].filter((a): a is string => a !== null)

  return (
    <button onClick={onClick} style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: 22, textAlign: 'left', borderRadius: 18, backgroundColor: '#FAFBFD', border: '1px solid #EDF0F4', borderLeft: `4px solid ${colour}`, cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
      {/* Header: name + percentage */}
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
        <span style={{ fontSize: 22, fontWeight: 700, color: colour, flexShrink: 0 }}>{pct !== null ? `${Math.round(pct)}%` : '—'}</span>
      </div>

      {/* Occupancy bar */}
      <div style={{ marginTop: 12, width: '100%' }}><OccupancyBar pct={pct} height={6} /></div>

      {/* Status row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
        <span style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: status.open ? '#4CAF7D' : '#E05252' }} />
        <span style={{ fontSize: 13, color: '#64748B' }}>
          {status.open ? `Open · Closes ${status.closesAt}` : 'After hours · Keycard access'}
          {walkMin !== null ? ` · ~${Math.round(walkMin)} min walk` : ''}
        </span>
      </div>

      {/* Nearby food */}
      {meta?.nearbyFood?.[0] && (
        <p style={{ fontSize: 12, color: '#94A3B8', marginTop: 6 }}>Nearby: {meta.nearbyFood[0]}</p>
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
          Directions →
        </a>
      </div>
    </button>
  )
}
