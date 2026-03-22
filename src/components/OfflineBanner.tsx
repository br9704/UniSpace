import { motion, AnimatePresence } from 'framer-motion'
import { useOnlineStatus } from '@/hooks/useOnlineStatus'

export default function OfflineBanner() {
  const isOnline = useOnlineStatus()

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
            padding: '10px 24px',
            backgroundColor: '#D97706', color: '#FFFFFF',
            fontSize: 13, fontWeight: 600, textAlign: 'center',
          }}
        >
          You&apos;re offline — showing cached data
        </motion.div>
      )}
    </AnimatePresence>
  )
}
