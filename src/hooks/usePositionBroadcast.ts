import { useEffect, useRef } from 'react'
import { getSessionId } from '@/lib/sessionId'
import { REALTIME_UPDATE_INTERVAL_MS } from '@/constants/occupancy'

interface UsePositionBroadcastOptions {
  /** Zone ID from detectZone(). null = outside all zones. */
  zoneId: string | null
  /** Campus slug for the broadcast channel. */
  campusSlug: string
  /** Set to false to disable broadcasting (GPS off, zones not loaded). */
  enabled: boolean
}

/**
 * Broadcasts the user's detected zone to the aggregate-occupancy Edge Function.
 *
 * PRIVACY: This hook accepts ONLY a zone_id — no coordinates.
 * The function signature makes it structurally impossible to include lat/lng.
 *
 * - Throttled: broadcasts at most once per REALTIME_UPDATE_INTERVAL_MS (10s)
 * - Keepalive: re-broadcasts current zone every 10s so Edge Function doesn't expire the position
 * - Skips when zoneId is null or enabled is false
 */
export function usePositionBroadcast({ zoneId, campusSlug, enabled }: UsePositionBroadcastOptions): void {
  const lastBroadcastRef = useRef<number>(0)
  // Read by the keepalive interval below, which outlives the render that
  // scheduled it. Written in an effect rather than during render — mutating a
  // ref while rendering is unsafe under concurrent React. Declared first so it
  // commits before the broadcast effect reads it.
  const zoneIdRef = useRef(zoneId)
  useEffect(() => {
    zoneIdRef.current = zoneId
  })

  useEffect(() => {
    if (!enabled || !zoneId) return

    const broadcast = async () => {
      const currentZone = zoneIdRef.current
      if (!currentZone) return

      const now = Date.now()
      if (now - lastBroadcastRef.current < REALTIME_UPDATE_INTERVAL_MS) return

      lastBroadcastRef.current = now
      const sessionId = getSessionId()

      try {
        const { supabase } = await import('@/lib/supabase')
        await supabase.functions.invoke('aggregate-occupancy', {
          body: {
            positions: [{
              zone_id: currentZone,
              session_id: sessionId,
            }],
          },
        })
      } catch (err) {
        // Non-fatal — log and continue. Next interval will retry.
        console.error('[UniSpace] Broadcast failed:', err)
      }
    }

    // Broadcast immediately on zone change
    broadcast()

    // Keepalive interval
    const intervalId = setInterval(broadcast, REALTIME_UPDATE_INTERVAL_MS)

    return () => clearInterval(intervalId)
  }, [zoneId, campusSlug, enabled])
}
