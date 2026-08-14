import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

interface TypedLineProps {
  text: string
  /** MOTION.md: 40ms per character. */
  speedMs?: number
  className?: string
}

/**
 * Types a line out one character at a time, with a blinking caret.
 *
 * Used once, on the cold-start message under the map. MOTION.md treats the
 * zero-user screen as a first-class design rather than an empty state: the
 * campus genuinely has no live data yet, and typing that sentence out makes it
 * read as the system reporting a fact rather than as a page that failed to
 * load.
 *
 * The full text is always in the DOM for screen readers — the animation is
 * purely visual, and `aria-label` carries the complete sentence from the first
 * frame.
 */
export default function TypedLine({ text, speedMs = 40, className = '' }: TypedLineProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  // Progress is stored together with the text it belongs to, so a new line
  // resets by derivation rather than by an effect writing zero back into state.
  const [progress, setProgress] = useState({ text, count: 0 })

  const count = prefersReducedMotion
    ? text.length
    : progress.text === text
      ? progress.count
      : 0

  useEffect(() => {
    if (prefersReducedMotion) return

    const timer = setInterval(() => {
      setProgress((current) => {
        const count = current.text === text ? current.count : 0
        if (count >= text.length) {
          clearInterval(timer)
          return current
        }
        return { text, count: count + 1 }
      })
    }, speedMs)

    return () => clearInterval(timer)
  }, [text, speedMs, prefersReducedMotion])

  const done = count >= text.length

  return (
    <span className={`mono ${className}`} aria-label={text}>
      <span aria-hidden="true">{text.slice(0, count)}</span>
      {!done && !prefersReducedMotion && (
        <span
          aria-hidden="true"
          style={{
            color: 'var(--color-amber)',
            animation: 'unispace-status-pulse 1s steps(1) infinite',
          }}
        >
          █
        </span>
      )}
    </span>
  )
}
