import { motion, AnimatePresence } from 'framer-motion'
import { useOnlineStatus } from '@/hooks/useOnlineStatus'

/**
 * Slides down once when the connection drops, and stays put.
 *
 * MOTION.md: the banner is static once shown — a persistent condition should
 * not keep animating, or it reads as a fault repeating rather than a state
 * holding. Cached data underneath picks up the low-confidence treatment on its
 * own, so this bar only has to name the condition.
 */
export default function OfflineBanner() {
  const isOnline = useOnlineStatus()

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          role="status"
          className="mono"
          initial={{ y: -40 }}
          animate={{ y: 0 }}
          exit={{ y: -40 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
            padding: '8px 24px',
            backgroundColor: 'var(--color-bg)',
            borderBottom: '1px solid var(--color-amber-dim)',
            color: 'var(--color-amber)',
            fontSize: 12, letterSpacing: '0.05em', textAlign: 'center',
          }}
        >
          Offline — showing last known data
        </motion.div>
      )}
    </AnimatePresence>
  )
}
