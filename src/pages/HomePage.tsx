import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBuildings } from '@/hooks/useBuildings'
import { useZones } from '@/hooks/useZones'
import { useBlendedOccupancy } from '@/hooks/useBlendedOccupancy'
import OccupancyBar from '@/components/OccupancyBar'
import { getOccupancyLabel, getOccupancyLevel, OCCUPANCY_COLOURS } from '@/constants/occupancy'
import type { BlendedOccupancy, Building } from '@/types'

export default function HomePage() {
  const { buildings } = useBuildings()
  const { zones } = useZones()
  const { occupancyMap } = useBlendedOccupancy(buildings, zones)
  const navigate = useNavigate()

  const sorted = useMemo(() => {
    return buildings
      .map((b) => ({ building: b, occ: occupancyMap.get(b.id) ?? null }))
      .filter((x) => x.occ?.pct !== null && x.occ?.pct !== undefined)
      .sort((a, b) => (a.occ?.pct ?? 100) - (b.occ?.pct ?? 100))
  }, [buildings, occupancyMap])

  const quiet = sorted.filter((x) => (x.occ?.pct ?? 100) <= 40)
  const filling = sorted.filter((x) => (x.occ?.pct ?? 0) > 40 && x.occ?.trend === 'filling')
  const quietCount = sorted.filter((x) => (x.occ?.pct ?? 100) < 50).length

  return (
    <div className="h-full overflow-y-auto" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
      {/* Header */}
      <div className="px-4 pt-6 pb-4" style={{ backgroundColor: 'var(--color-uom-navy)' }}>
        <h1 className="text-xl font-bold text-white">PULSE</h1>
        <p className="text-sm text-white/70">University of Melbourne · Parkville</p>
      </div>

      {/* Campus status */}
      <div className="mx-4 -mt-3 p-4 rounded-xl" style={{ backgroundColor: 'var(--color-bg-elevated)', boxShadow: 'var(--shadow-card)' }}>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: quietCount > sorted.length / 2 ? 'var(--color-empty)' : 'var(--color-moderate)' }} />
          <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
            Campus is {quietCount > sorted.length / 2 ? 'Quiet' : 'Moderate'}
          </span>
        </div>
        <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>
          {quietCount} of {sorted.length} buildings under 50% occupancy
        </p>
      </div>

      {/* Quiet right now */}
      {quiet.length > 0 && (
        <Section title="Quiet Right Now">
          <div className="flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide">
            {quiet.slice(0, 8).map(({ building, occ }) => (
              <SummaryCard key={building.id} building={building} occ={occ} onClick={() => navigate('/map')} />
            ))}
          </div>
        </Section>
      )}

      {/* Filling up */}
      {filling.length > 0 && (
        <Section title="Filling Up">
          <div className="flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide">
            {filling.slice(0, 8).map(({ building, occ }) => (
              <SummaryCard key={building.id} building={building} occ={occ} onClick={() => navigate('/map')} />
            ))}
          </div>
        </Section>
      )}

      {/* All buildings */}
      <Section title="All Buildings">
        <div className="px-4 space-y-2 pb-4">
          {sorted.map(({ building, occ }) => (
            <BuildingRow key={building.id} building={building} occ={occ} onClick={() => navigate('/map')} />
          ))}
        </div>
      </Section>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-5">
      <h2 className="text-sm font-semibold px-4 mb-2" style={{ color: 'var(--color-text-secondary)' }}>{title}</h2>
      {children}
    </div>
  )
}

function SummaryCard({ building, occ, onClick }: { building: Building; occ: BlendedOccupancy | null; onClick: () => void }) {
  const pct = occ?.pct ?? null
  const level = getOccupancyLevel(pct)
  const colour = OCCUPANCY_COLOURS[level]

  return (
    <button onClick={onClick} className="shrink-0 w-32 p-3 rounded-xl text-left" style={{ backgroundColor: 'var(--color-bg-elevated)', boxShadow: 'var(--shadow-card)' }}>
      <p className="text-xs font-medium truncate" style={{ color: 'var(--color-text-primary)' }}>{building.short_name || building.name}</p>
      <p className="text-2xl font-bold mt-1" style={{ color: colour }}>{pct !== null ? `${Math.round(pct)}%` : '—'}</p>
      <OccupancyBar pct={pct} height={4} className="mt-1" />
      <p className="text-xs mt-1" style={{ color: 'var(--color-text-tertiary)' }}>{getOccupancyLabel(pct)}</p>
    </button>
  )
}

function BuildingRow({ building, occ, onClick }: { building: Building; occ: BlendedOccupancy | null; onClick: () => void }) {
  const pct = occ?.pct ?? null
  const level = getOccupancyLevel(pct)
  const colour = OCCUPANCY_COLOURS[level]

  return (
    <button onClick={onClick} className="flex items-center w-full gap-3 p-3 rounded-lg text-left" style={{ backgroundColor: 'var(--color-bg-elevated)' }}>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate" style={{ color: 'var(--color-text-primary)' }}>{building.name}</p>
        <p className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>{getOccupancyLabel(pct)}</p>
      </div>
      <span className="text-lg font-bold" style={{ color: colour }}>{pct !== null ? `${Math.round(pct)}%` : '—'}</span>
      <div className="w-16"><OccupancyBar pct={pct} height={6} /></div>
    </button>
  )
}
