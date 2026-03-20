import { useMemo } from 'react'
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

function getGreeting(): string {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

export default function HomePage() {
  const { buildings } = useBuildings()
  const { zones } = useZones()
  const { occupancyMap } = useBlendedOccupancy(buildings, zones)
  const { position } = useGeolocation()
  const navigate = useNavigate()

  const sorted = useMemo(() => {
    return buildings
      .map((b) => ({
        building: b,
        occ: occupancyMap.get(b.id) ?? null,
        walk: calculateWalkingTime(position, b.entrance_lat, b.entrance_lng),
      }))
      .filter((x) => x.occ?.pct !== null && x.occ?.pct !== undefined)
      .sort((a, b) => (a.occ?.pct ?? 100) - (b.occ?.pct ?? 100))
  }, [buildings, occupancyMap, position])

  const quiet = sorted.filter((x) => (x.occ?.pct ?? 100) <= 40)
  const filling = sorted.filter((x) => x.occ?.trend === 'filling')
  const quietCount = sorted.filter((x) => (x.occ?.pct ?? 100) < 50).length

  return (
    <div className="h-full overflow-y-auto" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
      {/* Header */}
      <div className="px-5 pt-12 pb-5" style={{ background: 'linear-gradient(135deg, #003865 0%, #0080A4 100%)' }}>
        <p className="text-sm text-white/70">{getGreeting()}</p>
        <h1 className="text-2xl font-bold text-white tracking-tight">PULSE</h1>
        <p className="text-xs text-white/50 mt-0.5">University of Melbourne · Parkville</p>
      </div>

      {/* Campus status */}
      <div className="mx-4 -mt-4 p-4 rounded-xl" style={{ backgroundColor: 'var(--color-bg-elevated)', boxShadow: 'var(--shadow-card)', border: '1px solid var(--color-border)' }}>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: quietCount > sorted.length / 2 ? 'var(--color-empty)' : 'var(--color-moderate)' }} />
          <span className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
            Campus is {quietCount > sorted.length / 2 ? 'Quiet' : 'Moderate'}
          </span>
        </div>
        <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>
          {quietCount} of {sorted.length} buildings under 50% capacity
        </p>
      </div>

      {/* Quiet right now */}
      {quiet.length > 0 && (
        <Section title="QUIET RIGHT NOW">
          <div className="flex gap-3 overflow-x-auto px-4 pb-1 scrollbar-hide">
            {quiet.slice(0, 8).map((x) => (
              <SummaryCard key={x.building.id} building={x.building} occ={x.occ} walkMin={x.walk?.minutes ?? null} onClick={() => navigate('/map')} />
            ))}
          </div>
        </Section>
      )}

      {/* Filling up */}
      {filling.length > 0 && (
        <Section title="FILLING UP">
          <div className="flex gap-3 overflow-x-auto px-4 pb-1 scrollbar-hide">
            {filling.slice(0, 8).map((x) => (
              <SummaryCard key={x.building.id} building={x.building} occ={x.occ} walkMin={x.walk?.minutes ?? null} onClick={() => navigate('/map')} />
            ))}
          </div>
        </Section>
      )}

      {/* All buildings */}
      <Section title="ALL BUILDINGS">
        <div className="px-4 space-y-2 pb-6">
          {sorted.map((x) => (
            <BuildingRow key={x.building.id} building={x.building} occ={x.occ} walkMin={x.walk?.minutes ?? null} onClick={() => navigate('/map')} />
          ))}
        </div>
      </Section>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-5">
      <h2 className="text-xs font-semibold px-4 mb-2 tracking-wider" style={{ color: 'var(--color-text-tertiary)' }}>{title}</h2>
      {children}
    </div>
  )
}

function SummaryCard({ building, occ, walkMin, onClick }: { building: Building; occ: BlendedOccupancy | null; walkMin: number | null; onClick: () => void }) {
  const pct = occ?.pct ?? null
  const level = getOccupancyLevel(pct)
  const colour = OCCUPANCY_COLOURS[level]
  const status = isOpenNow(building)

  return (
    <button onClick={onClick} className="shrink-0 w-36 p-3 rounded-xl text-left" style={{ backgroundColor: 'var(--color-bg-elevated)', boxShadow: 'var(--shadow-card)', border: '1px solid var(--color-border)' }}>
      <p className="text-xs font-semibold truncate" style={{ color: 'var(--color-text-primary)' }}>{building.short_name || building.name}</p>
      <p className="text-2xl font-bold mt-1" style={{ color: colour }}>{pct !== null ? `${Math.round(pct)}%` : '—'}</p>
      <OccupancyBar pct={pct} height={4} className="mt-1" />
      <p className="text-xs mt-1" style={{ color: 'var(--color-text-tertiary)' }}>{getOccupancyLabel(pct)}</p>
      <div className="flex items-center justify-between mt-1.5">
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: status.open ? 'var(--color-empty)' : 'var(--color-packed)' }} />
          <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>{status.open ? 'Open' : 'Closed'}</span>
        </div>
        {walkMin !== null && <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>~{Math.round(walkMin)}m</span>}
      </div>
    </button>
  )
}

function BuildingRow({ building, occ, walkMin, onClick }: { building: Building; occ: BlendedOccupancy | null; walkMin: number | null; onClick: () => void }) {
  const pct = occ?.pct ?? null
  const level = getOccupancyLevel(pct)
  const colour = OCCUPANCY_COLOURS[level]
  const status = isOpenNow(building)

  return (
    <button onClick={onClick} className="flex items-center w-full gap-3 p-3 rounded-xl text-left" style={{ backgroundColor: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)' }}>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate" style={{ color: 'var(--color-text-primary)' }}>{building.name}</p>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: status.open ? 'var(--color-empty)' : 'var(--color-packed)' }} />
          <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
            {status.open ? `Open` : 'Closed'} · {getOccupancyLabel(pct)}
          </span>
        </div>
      </div>
      <span className="text-base font-bold" style={{ color: colour }}>{pct !== null ? `${Math.round(pct)}%` : '—'}</span>
      <div className="w-16"><OccupancyBar pct={pct} height={6} /></div>
      {walkMin !== null && <span className="text-xs w-10 text-right" style={{ color: 'var(--color-text-tertiary)' }}>~{Math.round(walkMin)}m</span>}
    </button>
  )
}
