import type { Variants, Transition } from 'framer-motion'

/**
 * Shared motion values.
 *
 * MOTION.md permits ease-out or linear only — no bounce, no spring, nothing
 * over 600ms. `src/lib/motion.test.ts` enforces both rules across the codebase.
 *
 * The scroll reveal below is the spec's standard: fade plus a 16px rise over
 * 400ms, staggered 60ms.
 */

/** Ease-out. Replaces the spring this file previously exported. */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const

export const SHEET_TRANSITION: Transition = { duration: 0.28, ease: EASE_OUT }

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: 'easeOut' } },
}

/**
 * Press feedback only — no hover scale.
 *
 * A card that grows under the cursor is decoration, and on the map it would
 * compete with the breathing that means "live". Touch feedback stays, because
 * it confirms a tap registered.
 */
export const cardPress = {
  whileTap: { scale: 0.99, transition: { duration: 0.1, ease: 'easeOut' } },
}
