import { useEffect, useRef, useState, useCallback } from 'react'

interface Position {
  latitude: number
  longitude: number
  accuracy: number
}

export interface GeolocationState {
  position: Position | null
  error: GeolocationPositionError | null
  isWatching: boolean
}

/** Synthetic error for browsers without the Geolocation API. */
const UNSUPPORTED_ERROR = {
  code: 2,
  message: 'Geolocation not supported',
  PERMISSION_DENIED: 1,
  POSITION_UNAVAILABLE: 2,
  TIMEOUT: 3,
} as GeolocationPositionError

/**
 * Subscribes to the Geolocation API via watchPosition.
 *
 * - Pauses when the page is hidden (app backgrounded)
 * - Resumes when the page becomes visible again
 * - Cleans up on unmount
 *
 * `isWatching` means "a position fix is arriving", not "a watch is registered".
 */
export function useGeolocation(): GeolocationState {
  const [position, setPosition] = useState<Position | null>(null)
  // Browser support never changes over the life of the hook, so the
  // unsupported error is the initial state rather than something an effect
  // assigns after the first paint.
  const [error, setError] = useState<GeolocationPositionError | null>(
    () => (navigator.geolocation ? null : UNSUPPORTED_ERROR),
  )
  const [isWatching, setIsWatching] = useState(false)
  const watchIdRef = useRef<number | null>(null)

  const startWatching = useCallback(() => {
    if (!navigator.geolocation) return

    const id = navigator.geolocation.watchPosition(
      (pos) => {
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        })
        setError(null)
        setIsWatching(true)
      },
      (err) => {
        setError(err)
        setPosition(null)
        setIsWatching(false)
      },
      { enableHighAccuracy: true },
    )

    watchIdRef.current = id
    // `isWatching` is deliberately NOT set here. Registering a watch is not the
    // same as having a fix — between the two sits the permission prompt, which
    // the user may never answer. It flips true in the success callback above,
    // so consumers gating on it (position broadcasting) never act on a watch
    // that has not produced a position.
  }, [])

  const stopWatching = useCallback(() => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current)
      watchIdRef.current = null
    }
    setIsWatching(false)
  }, [])

  useEffect(() => {
    // Unsupported is already reflected in the initial error state.
    if (!navigator.geolocation) return

    startWatching()

    const handleVisibility = () => {
      if (document.visibilityState === 'hidden') {
        stopWatching()
      } else {
        startWatching()
      }
    }

    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      stopWatching()
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [startWatching, stopWatching])

  return { position, error, isWatching }
}
