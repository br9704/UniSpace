import { useEffect, useState } from 'react'

/**
 * Whether the browser believes it has a connection.
 *
 * `navigator.onLine` only reports whether a network interface exists — it is
 * true on captive-portal wifi that goes nowhere. Good enough for the banner,
 * which is a hint rather than a diagnosis, and the data layer's own error
 * handling covers the cases it misses.
 */
export function useOnlineStatus(): boolean {
  const [isOnline, setIsOnline] = useState(() =>
    typeof navigator === 'undefined' ? true : navigator.onLine,
  )

  useEffect(() => {
    const goOnline = () => setIsOnline(true)
    const goOffline = () => setIsOnline(false)

    window.addEventListener('online', goOnline)
    window.addEventListener('offline', goOffline)

    return () => {
      window.removeEventListener('online', goOnline)
      window.removeEventListener('offline', goOffline)
    }
  }, [])

  return isOnline
}
