import { useMemo, useState } from 'react'
import type { Room } from '@/types'
import SectionLabel from './SectionLabel'
import Card from './ui/Card'

interface RoomListProps {
  rooms: Room[]
}

const TYPE_LABELS: Record<Room['room_type'], string> = {
  lecture: 'Lecture',
  tutorial: 'Tutorial',
  lab: 'Lab',
  study: 'Study',
  meeting: 'Meeting',
  library: 'Library',
  other: '',
}

function floorLabel(level: number): string {
  if (level === 0) return 'GROUND'
  if (level < 0) return `BASEMENT ${Math.abs(level)}`
  return `LEVEL ${level}`
}

/**
 * Rooms in this building, grouped by floor.
 *
 * Renders nothing when the directory has not been seeded — an empty "Rooms"
 * heading would imply the building has none, which is worse than not mentioning
 * rooms at all.
 */
export default function RoomList({ rooms }: RoomListProps) {
  const [expanded, setExpanded] = useState(false)

  const byFloor = useMemo(() => {
    const groups = new Map<number, Room[]>()
    for (const room of rooms) {
      const group = groups.get(room.floor_level)
      if (group) group.push(room)
      else groups.set(room.floor_level, [room])
    }
    return [...groups.entries()]
      .sort(([a], [b]) => a - b)
      .map(([level, list]) => [level, [...list].sort((a, b) => a.code.localeCompare(b.code))] as const)
  }, [rooms])

  if (rooms.length === 0) return null

  return (
    <Card>
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        className="flex items-center justify-between w-full"
        style={{ background: 'none', border: 'none', cursor: 'pointer', minHeight: 44 }}
      >
        <SectionLabel>rooms</SectionLabel>
        <span className="mono text-xs" style={{ color: 'var(--color-text-muted)' }}>
          {rooms.length} <span aria-hidden="true">{expanded ? '−' : '+'}</span>
        </span>
      </button>

      {expanded && (
        <div className="mt-3 flex flex-col gap-3">
          {byFloor.map(([level, list]) => (
            <div key={level}>
              <p className="mono text-xs mb-1.5" style={{ color: 'var(--color-text-muted)' }}>
                {floorLabel(level)}
              </p>
              <ul className="flex flex-wrap gap-1.5">
                {list.map((room) => (
                  <li
                    key={room.id}
                    className="mono text-xs px-2 py-1"
                    style={{
                      border: '1px solid var(--color-hairline)',
                      color: 'var(--color-text-secondary)',
                    }}
                    title={[room.name, TYPE_LABELS[room.room_type]].filter(Boolean).join(' · ')}
                  >
                    {room.code}
                    {room.is_accessible && (
                      <>
                        {/* No emoji anywhere in this system. A monospace marker
                            carries it visually; the label carries it aloud. */}
                        <span className="ml-1" aria-hidden="true" style={{ color: 'var(--color-live)' }}>
                          [A]
                        </span>
                        <span className="sr-only"> — step-free access</span>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}
