import type { Variants, Transition } from 'framer-motion'

export const SPRING: Transition = { type: 'spring', stiffness: 280, damping: 28 }

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
}

export const cardHover = {
  whileHover: { scale: 1.015, transition: { duration: 0.2 } },
  whileTap: { scale: 0.98 },
}
