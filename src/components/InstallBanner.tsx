import { motion, AnimatePresence } from 'framer-motion'
import { useInstallPrompt } from '@/hooks/useInstallPrompt'

/**
 * Home-screen install prompt.
 *
 * iOS has no programmatic install API — on any iPhone this can only ever be an
 * instruction to use Share → Add to Home Screen. That is also the gate for Web
 * Push on iOS, which still requires the app to be installed rather than open in
 * a Safari tab, so the wording matters more here than the button does.
 */
export default function InstallBanner() {
  const { showBanner, isIOSDevice, canInstallNative, install, dismiss } = useInstallPrompt()

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          exit={{ y: 80 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          style={{
            position: 'fixed', bottom: 64, left: 12, right: 12, zIndex: 80,
            padding: '14px 16px',
            backgroundColor: 'var(--color-bg)',
            border: '1px solid var(--color-steel)',
            borderRadius: 'var(--radius-md)',
            display: 'flex', alignItems: 'center', gap: 14,
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <p
              className="mono text-sm tracking-wide"
              style={{ color: 'var(--color-text-primary)', margin: 0 }}
            >
              ADD UNISPACE TO HOME SCREEN
            </p>
            <p
              className="text-xs"
              style={{ color: 'var(--color-text-secondary)', margin: '4px 0 0' }}
            >
              {isIOSDevice
                ? 'Tap Share, then “Add to Home Screen”. On iOS this is also required for alerts to reach you.'
                : 'Check occupancy in one tap.'}
            </p>
          </div>

          {!isIOSDevice && canInstallNative && (
            <button
              type="button"
              onClick={install}
              className="mono text-xs tracking-wide shrink-0"
              style={{
                padding: '10px 14px', minHeight: 44,
                border: '1px solid var(--color-amber)',
                background: 'none', color: 'var(--color-amber)',
                cursor: 'pointer', borderRadius: 'var(--radius-md)',
              }}
            >
              [ INSTALL → ]
            </button>
          )}

          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss install prompt"
            className="mono shrink-0 flex items-center justify-center"
            style={{
              minWidth: 44, minHeight: 44,
              border: 'none', background: 'none',
              color: 'var(--color-text-dim)', cursor: 'pointer', fontSize: 14,
            }}
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
