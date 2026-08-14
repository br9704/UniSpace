/**
 * Warms the Mapbox chunk during idle time.
 *
 * Mapbox GL is 1.6 MB and lives behind a dynamic import so the home screen
 * never pays for it. But every tile and row on that screen leads to the map, so
 * fetching it while the browser is idle means the split costs nothing in
 * perceived speed — the chunk is already cached by the time anyone taps.
 *
 * Resolves to the same module specifier `MapSurface` lazily imports, so both
 * share one chunk.
 */
export function preloadMap(): void {
  void import('@/components/Map')
}

/**
 * Schedule the preload for the next idle period.
 *
 * @returns a cleanup function.
 */
export function schedulePreloadMap(): () => void {
  if (typeof window === 'undefined') return () => {}

  if (window.requestIdleCallback) {
    const handle = window.requestIdleCallback(preloadMap)
    return () => window.cancelIdleCallback?.(handle)
  }

  // Safari has no requestIdleCallback. A timeout is a blunter instrument, but
  // two seconds is well past first paint.
  const handle = window.setTimeout(preloadMap, 2000)
  return () => window.clearTimeout(handle)
}
