import { motion, AnimatePresence } from 'framer-motion'
import { useInstallPrompt } from '@/hooks/useInstallPrompt'

export default function InstallBanner() {
  const { showBanner, isIOSDevice, canInstallNative, install, dismiss } = useInstallPrompt()

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 280, damping: 28 }}
          style={{
            position: 'fixed', bottom: 64, left: 16, right: 16, zIndex: 80,
            padding: '16px 20px',
            backgroundColor: '#003865', borderRadius: 16,
            boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
            display: 'flex', alignItems: 'center', gap: 14,
          }}
        >
          {/* Icon */}
          <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: 20, fontWeight: 800, color: '#FFFFFF' }}>U</span>
          </div>

          {/* Text */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: '#FFFFFF', margin: 0 }}>Install UniSpace</p>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', margin: '2px 0 0' }}>
              {isIOSDevice
                ? 'Tap Share → "Add to Home Screen"'
                : 'Add to your home screen for quick access'}
            </p>
          </div>

          {/* Actions */}
          {!isIOSDevice && canInstallNative && (
            <button
              onClick={install}
              style={{
                padding: '8px 16px', borderRadius: 10, border: 'none',
                backgroundColor: '#FFFFFF', color: '#003865',
                fontSize: 13, fontWeight: 600, cursor: 'pointer', flexShrink: 0,
              }}
            >
              Install
            </button>
          )}

          <button
            onClick={dismiss}
            aria-label="Dismiss"
            style={{
              width: 28, height: 28, borderRadius: 14, border: 'none',
              backgroundColor: 'rgba(255,255,255,0.15)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
