import { useEffect, useRef } from 'react'
import { useOnlineStatus } from './useOnlineStatus'

/**
 * Runs a refresh when the connection comes back.
 *
 * Without this, a user who loses signal on a train keeps looking at whatever
 * was on screen when it dropped, indefinitely — the Realtime channel does not
 * reconnect on its own and nothing else re-fetches. Coming back above ground
 * should bring the data back with it.
 *
 * MOTION.md treats this as a designed moment rather than a technicality: the
 * banner slides away and zones cross-fade to fresh values in one coordinated
 * pass. Refreshing everything at once, rather than piecemeal as each request
 * happens to land, is what makes it read as the app coming back to life.
 */
export function useRefetchOnReconnect(refresh: () => void): void {
  const isOnline = useOnlineStatus()
  const wasOffline = useRef(!isOnline)

  useEffect(() => {
    if (isOnline && wasOffline.current) {
      refresh()
    }
    wasOffline.current = !isOnline
  }, [isOnline, refresh])
}
