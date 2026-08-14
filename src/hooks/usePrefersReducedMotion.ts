import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

/**
 * Whether the user has asked for reduced motion.
 *
 * `index.css` already neutralises CSS animations and transitions globally. This
 * hook exists for the motion CSS cannot reach — the Mapbox breathing loop, the
 * count-up on numbers, FLIP reordering — all of which are driven from
 * JavaScript and would otherwise keep running.
 *
 * MOTION.md treats this as a hard rule rather than a preference: reduced motion
 * means fully static, and no information may be lost in the process. Every
 * animated value in this app is also readable as text, which is what makes that
 * possible.
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(QUERY).matches,
  )

  useEffect(() => {
    const media = window.matchMedia(QUERY)
    const onChange = (event: MediaQueryListEvent) => setPrefersReduced(event.matches)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  return prefersReduced
}
