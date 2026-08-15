import type { Variants, Transition, TargetAndTransition } from 'framer-motion'

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
 * it confirms a tap registered. Hover is handled instead by the `.card-lift`
 * box-shadow transition in index.css, which moves nothing.
 *
 * Consumed by BuildingRow; BuildingTile uses `tilePress`.
 *
 * The `TargetAndTransition` annotation is load-bearing, not decoration. Without
 * it `ease: 'easeOut'` widens to `string`, and spreading the object into a
 * `motion.button` fails to compile (TS2322: `Type 'string' is not assignable to
 * type 'Easing'`). Nothing imported this until now, so nothing had ever
 * type-checked it against a motion element.
 */
const PRESS: Transition = { duration: 0.1, ease: 'easeOut' }

export const cardPress: { whileTap: TargetAndTransition } = {
  whileTap: { scale: 0.99, transition: PRESS },
}

/**
 * Tiles press deeper than rows.
 *
 * 1% of a full-width row travels several pixels; 1% of a 150px tile travels
 * one and a half, which reads as nothing. The pre-SIGNAL build made the same
 * inverse distinction — 0.98 on a tile, 0.99 on a row.
 */
export const tilePress: { whileTap: TargetAndTransition } = {
  whileTap: { scale: 0.98, transition: PRESS },
}
