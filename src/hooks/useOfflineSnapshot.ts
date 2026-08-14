import { useEffect, useRef, useState } from 'react'
import type { BlendedOccupancy } from '@/types'
import { readSnapshot, writeSnapshot } from '@/lib/localStore'

/** Don't write on every render — once a minute is ample for a fallback. */
const WRITE_INTERVAL_MS = 60_000

/**
 * Keeps the last-known occupancy on the device, and serves it when there is
 * nothing else.
 *
 * The service worker already caches the app shell, so UniSpace opens offline —
 * but opening to a blank map is barely better than not opening. This fills the
 * gap between "the app loaded" and "the data arrived".
 *
 * Restored readings are always marked `stale`, never the source they originally
 * had. That is the whole point: cached data then picks up the low-confidence
 * treatment automatically — 40% intensity, dashed border, no green dot — so an
 * hour-old number can never be mistaken for a live one. MOTION.md: "Cached data
 * gets the low-confidence treatment automatically."
 */
export function useOfflineSnapshot(
  live: Map<string, BlendedOccupancy>,
): Map<string, BlendedOccupancy> {
  const lastWriteRef = useRef(0)
  // Read once at mount, via the lazy initialiser, so a cold start has something
  // to render on the first frame rather than after an effect.
  const [restored] = useState(restoreSnapshot)

  useEffect(() => {
    if (live.size === 0) return

    const now = Date.now()
    if (now - lastWriteRef.current < WRITE_INTERVAL_MS) return
    lastWriteRef.current = now

    const buildings: Record<string, { pct: number | null; source: string }> = {}
    for (const [id, occupancy] of live) {
      buildings[id] = { pct: occupancy.pct, source: occupancy.source }
    }

    writeSnapshot({ capturedAt: new Date(now).toISOString(), buildings })
  }, [live])

  // Live data always wins. The snapshot only covers the window before it lands.
  return live.size > 0 ? live : restored
}

function restoreSnapshot(): Map<string, BlendedOccupancy> {
  const snapshot = readSnapshot()
  const restored = new Map<string, BlendedOccupancy>()
  if (!snapshot) return restored

  for (const [id, entry] of Object.entries(snapshot.buildings)) {
    restored.set(id, {
      pct: entry.pct,
      // Deliberately not the original source. Whatever this was when captured,
      // right now it is old.
      source: 'stale',
      trend: 'stable',
      floor_occupancies: [],
      last_updated: snapshot.capturedAt,
    })
  }

  return restored
}
