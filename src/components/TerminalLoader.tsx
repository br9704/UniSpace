import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

interface TerminalLoaderProps {
  /** Characters wide. MOTION.md specifies 12 for the report submit button. */
  width?: number
  /** Fill duration in ms. */
  durationMs?: number
  label?: string
}

/**
 * A filling block meter: `[████░░░░░░░░]`.
 *
 * SIGNAL never uses spinners. A spinner says "something is happening"; a filling
 * bar says "this much of it has happened", which is both more honest and more
 * legible at a glance.
 *
 * Deliberately not tied to real progress — the request has no measurable
 * stages, and faking granular progress would be a lie about a thing this app
 * otherwise takes care to be honest about. It is a duration hint, and it says
 * so by simply running to completion.
 */
export default function TerminalLoader({
  width = 12,
  durationMs = 600,
  label,
}: TerminalLoaderProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [animated, setAnimated] = useState(0)
  // Reduced motion shows the finished bar rather than animating to it — derived,
  // so no effect has to write it.
  const filled = prefersReducedMotion ? width : animated

  useEffect(() => {
    if (prefersReducedMotion) return

    const startedAt = performance.now()
    let frame: number

    const tick = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / durationMs)
      setAnimated(Math.round(progress * width))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [width, durationMs, prefersReducedMotion])

  return (
    <span className="mono inline-flex items-center gap-2" role="status" aria-live="polite">
      <span aria-hidden="true" style={{ letterSpacing: '0.05em' }}>
        [{'█'.repeat(filled)}
        <span style={{ color: 'var(--color-text-dim)' }}>{'░'.repeat(width - filled)}</span>]
      </span>
      {label && <span className="sr-only">{label}</span>}
    </span>
  )
}
