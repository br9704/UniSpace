import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { UserAlert } from '@/types'
import Card from './ui/Card'
import AlertActive from './AlertActive'

interface AlertSetupProps {
  buildingName: string
  currentPct: number | null
  existingAlert: UserAlert | undefined
  permissionState: NotificationPermission
  isSupported: boolean
  onCreateAlert: (threshold: number) => Promise<void>
  onDeleteAlert: (alertId: string) => Promise<void>
  onRequestPermission: () => Promise<void>
}

const THRESHOLDS = [30, 50, 70]

/**
 * "Tell me when this building is quiet."
 *
 * The permission prompt is deliberately not fired on mount — it is requested
 * only once the user has picked a threshold, so the browser dialog arrives
 * after they have expressed intent rather than before. A prompt shown too early
 * is usually a permission denied permanently.
 */
export default function AlertSetup({
  buildingName,
  currentPct,
  existingAlert,
  permissionState,
  isSupported,
  onCreateAlert,
  onDeleteAlert,
  onRequestPermission,
}: AlertSetupProps) {
  const [showPicker, setShowPicker] = useState(false)
  const [busy, setBusy] = useState(false)

  if (!isSupported) return null

  async function handleCreate(threshold: number) {
    setBusy(true)
    try {
      if (permissionState !== 'granted') await onRequestPermission()
      await onCreateAlert(threshold)
      setShowPicker(false)
    } finally {
      setBusy(false)
    }
  }

  if (permissionState === 'denied') {
    return (
      <Card>
        <p className="mono text-xs" style={{ color: 'var(--color-text-muted)' }}>
          &gt; NOTIFICATIONS BLOCKED — enable them in your browser settings to set alerts
        </p>
      </Card>
    )
  }

  if (existingAlert) {
    return (
      <AlertActive
        alert={existingAlert}
        currentPct={currentPct}
        busy={busy}
        onDelete={() => { void onDeleteAlert(existingAlert.id) }}
      />
    )
  }

  return (
    <Card className="p-0 overflow-hidden">
      <button
        type="button"
        onClick={() => setShowPicker(!showPicker)}
        aria-expanded={showPicker}
        className="mono flex items-center gap-2 w-full text-left text-xs px-4"
        style={{
          minHeight: 52,
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--color-text-primary)',
        }}
      >
        <span aria-hidden="true" style={{ color: 'var(--color-text-dim)' }}>
          {showPicker ? '▾' : '▸'}
        </span>
        NOTIFY ME WHEN {buildingName.toUpperCase()} IS QUIET
      </button>

      <AnimatePresence>
        {showPicker && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-4 pb-4">
              <p className="mono text-xs mb-2" style={{ color: 'var(--color-text-muted)' }}>
                ALERT ME WHEN BELOW
              </p>
              <div className="flex gap-2">
                {THRESHOLDS.map((threshold) => (
                  <button
                    key={threshold}
                    type="button"
                    onClick={() => handleCreate(threshold)}
                    disabled={busy}
                    className="mono flex-1 text-xs"
                    style={{
                      minHeight: 44,
                      background: 'none',
                      border: '1px solid var(--color-steel)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--color-text-primary)',
                      cursor: busy ? 'wait' : 'pointer',
                      opacity: busy ? 0.5 : 1,
                    }}
                  >
                    {threshold}%
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}
