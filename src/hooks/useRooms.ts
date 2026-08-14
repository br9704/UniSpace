import { useEffect, useState } from 'react'
import { fetchRows } from '@/lib/dataSource'
import type { Room } from '@/types'

/**
 * The room directory, fetched once.
 *
 * Cross-building room search is the one thing UniMelb's own map does that this
 * app cannot: a student told to go to "Redmond Barry 101" currently has no way
 * to find out where that is from here.
 *
 * Rooms are static reference data — a few hundred rows that never change during
 * a session — so this fetches the lot once rather than per building. It returns
 * an empty list until the directory is seeded, and every consumer treats that
 * as "no room directory" rather than as an error.
 */
export function useRooms(): { rooms: Room[]; isLoading: boolean } {
  const [rooms, setRooms] = useState<Room[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    fetchRows<Room>('rooms').then(({ data }) => {
      if (cancelled) return
      setRooms(data)
      setIsLoading(false)
    })

    return () => { cancelled = true }
  }, [])

  return { rooms, isLoading }
}

/**
 * Rooms matching a search, across every building.
 *
 * Matches the code first and most strictly — someone searching "101" wants room
 * 101, not every room in a building whose description happens to contain it.
 */
export function searchRooms(rooms: Room[], query: string, limit = 8): Room[] {
  const needle = query.trim().toLowerCase()
  if (needle.length < 2) return []

  const exact: Room[] = []
  const partial: Room[] = []

  for (const room of rooms) {
    const code = room.code.toLowerCase()
    if (code === needle) exact.push(room)
    else if (code.startsWith(needle) || room.name?.toLowerCase().includes(needle)) {
      partial.push(room)
    }
  }

  return [...exact, ...partial].slice(0, limit)
}
