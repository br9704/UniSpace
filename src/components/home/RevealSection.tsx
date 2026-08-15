import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

interface RevealSectionProps {
  /** Seconds. The home page runs 0.1 → 0.35 in reading order. */
  delay?: number
  /** MOTION.md's standard reveal is 16px; the hero block rose 20px. */
  rise?: number
  className?: string
  children: ReactNode
}

/**
 * One section of the home page arriving.
 *
 * The pre-SIGNAL build revealed the page top-to-bottom in a wave — four blocks
 * fading and rising on hand-set delays — where the current build snaps every
 * panel into existence in a single frame. That wave is most of the felt
 * difference between the two, and MOTION.md's inherited system sanctions the
 * mechanism explicitly: "scroll reveal = fade + 16px up, 400ms".
 *
 * The reduced-motion early return is why this is a component rather than four
 * inline `motion.div`s. framer writes per-frame inline transforms, which
 * index.css's `transition-duration: 0.01ms !important` cannot touch — so a
 * reveal added without a gate would run at full strength for a user who asked
 * for none, and the accessibility story would be worse than before the revert.
 * Returning a plain `<div>` makes "fully static" literal rather than relying on
 * MotionConfig, which suppresses transforms but leaves opacity animating.
 *
 * `empty:hidden` matters more than it looks: TileGrid and RoomSearch render
 * null when they have nothing to show, and without it this wrapper would still
 * be a 0px-tall element contributing its own 16px of margin — a gap where a
 * section is not.
 */
export default function RevealSection({
  delay = 0,
  rise = 16,
  className = '',
  children,
}: RevealSectionProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const classes = `empty:hidden ${className}`

  if (prefersReducedMotion) return <div className={classes}>{children}</div>

  return (
    <motion.div
      className={classes}
      initial={{ opacity: 0, y: rise }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
