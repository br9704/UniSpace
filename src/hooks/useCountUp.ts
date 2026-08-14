import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

/** MOTION.md caps the count at 400ms. */
const DURATION_MS = 400

/**
 * Animates a number toward its target in whole steps.
 *
 * MOTION.md: "A number that teleports reads as a glitch; a number that counts
 * reads as measurement." On first load values rise from zero as part of the
 * reveal; on update they count from the previous value to the new one.
 *
 * Integer steps only — a percentage flickering through decimals looks like
 * noise rather than counting. Pair with tabular figures (the `data-count`
 * attribute, see index.css) so the width cannot jitter while it runs.
 *
 * The two static cases — no value, and reduced motion — are returned directly
 * rather than pushed through state, so nothing has to be assigned in an effect
 * and there is no frame where the wrong number is on screen.
 */
export function useCountUp(target: number | null): number | null {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [animated, setAnimated] = useState(0)
  /** Latest displayed value. Written only from the animation frame below. */
  const currentRef = useRef(0)
  const frameRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (target === null || prefersReducedMotion) {
      // Keep the ref in step so a later animation counts from the right place.
      currentRef.current = target ?? 0
      return
    }

    // Start from whatever is on screen, so an update counts from the previous
    // value rather than restarting at zero.
    const from = currentRef.current
    if (from === target) return

    const startedAt = performance.now()

    const step = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / DURATION_MS)
      const value = Math.round(from + (target - from) * progress)
      currentRef.current = value
      setAnimated(value)
      if (progress < 1) frameRef.current = requestAnimationFrame(step)
    }

    frameRef.current = requestAnimationFrame(step)

    return () => {
      if (frameRef.current !== undefined) cancelAnimationFrame(frameRef.current)
    }
  }, [target, prefersReducedMotion])

  if (target === null) return null
  if (prefersReducedMotion) return target
  return animated
}
