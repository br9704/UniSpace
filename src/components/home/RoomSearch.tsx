import { useMemo, useState } from 'react'
import type { Building } from '@/types'
import { useRooms, searchRooms } from '@/hooks/useRooms'
import Card from '../ui/Card'
import SectionLabel from '../SectionLabel'

interface RoomSearchProps {
  buildings: Building[]
  onOpenBuilding: (buildingId: string) => void
}

/**
 * Find a room by its code, across every building.
 *
 * The gap this closes: a student is told to go to "Redmond Barry 101" and has
 * no idea which building that is or where it stands. UniMelb's own map answers
 * that; until now this app could not.
 *
 * Renders nothing until the room directory is seeded — an empty search box that
 * never returns anything is worse than no search box.
 */
export default function RoomSearch({ buildings, onOpenBuilding }: RoomSearchProps) {
  const { rooms } = useRooms()
  const [query, setQuery] = useState('')

  const results = useMemo(() => searchRooms(rooms, query), [rooms, query])
  const buildingName = (id: string) => {
    const building = buildings.find((b) => b.id === id)
    return building?.short_name || building?.name || 'Unknown building'
  }

  if (rooms.length === 0) return null

  return (
    <Card variant="elevated">
      <SectionLabel className="mb-4">find a room</SectionLabel>

      <label className="sr-only" htmlFor="room-search">Search rooms by code</label>
      <input
        id="room-search"
        type="search"
        placeholder="> e.g. 101, G12"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mono w-full text-sm px-3"
        style={{
          minHeight: 44,
          // #FAFBFD, so the field sits below the white panel rather than
          // matching the page behind it — same treatment as the directory
          // search above.
          backgroundColor: 'var(--color-bg-input)',
          border: '1px solid var(--color-hairline)',
          borderRadius: 'var(--radius-md)',
          color: 'var(--color-text-primary)',
          outline: 'none',
        }}
      />

      {query.trim().length >= 2 && (
        <div aria-live="polite">
          {results.length === 0 ? (
            <p className="mono text-sm mt-3" style={{ color: 'var(--color-text-muted)' }}>
              &gt; no room matches “{query}”
            </p>
          ) : (
            <ul className="mt-3 flex flex-col gap-2">
              {results.map((room) => (
                <li key={room.id}>
                  <button
                    type="button"
                    onClick={() => onOpenBuilding(room.building_id)}
                    className="mono flex items-center justify-between gap-3 w-full text-sm text-left px-3"
                    style={{
                      minHeight: 44,
                      background: 'none',
                      border: '1px solid var(--color-hairline)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--color-text-primary)',
                      cursor: 'pointer',
                    }}
                  >
                    <span>{room.code}</span>
                    <span style={{ color: 'var(--color-text-muted)' }}>
                      {buildingName(room.building_id)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </Card>
  )
}
