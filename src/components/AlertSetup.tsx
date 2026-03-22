import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { UserAlert } from '@/types'

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

export default function AlertSetup({
  buildingName, currentPct, existingAlert, permissionState, isSupported,
  onCreateAlert, onDeleteAlert, onRequestPermission,
}: AlertSetupProps) {
  const [showPicker, setShowPicker] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  if (!isSupported) return null

  async function handleCreate(threshold: number) {
    setSubmitting(true)
    try {
      if (permissionState !== 'granted') await onRequestPermission()
      await onCreateAlert(threshold)
      setShowPicker(false)
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete() {
    if (!existingAlert) return
    setSubmitting(true)
    try { await onDeleteAlert(existingAlert.id) } finally { setSubmitting(false) }
  }

  if (permissionState === 'denied') {
    return (
      <div style={{ padding: '12px 16px', borderRadius: 14, backgroundColor: '#FFFFFF', border: '2px solid rgba(0,56,101,0.18)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <p style={{ fontSize: 13, color: '#94A3B8', margin: 0 }}>Notifications blocked — enable in browser settings to set alerts</p>
      </div>
    )
  }

  if (existingAlert) {
    return (
      <div style={{ padding: '14px 16px', borderRadius: 14, backgroundColor: '#FFFFFF', border: '2px solid rgba(0,56,101,0.18)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#1E293B', margin: 0 }}>Alert set: below {existingAlert.threshold_pct}%</p>
          <p style={{ fontSize: 11, color: '#94A3B8', margin: '2px 0 0' }}>
            {currentPct !== null && currentPct <= existingAlert.threshold_pct
              ? `Currently ${Math.round(currentPct)}% — below threshold!`
              : `Currently ${currentPct !== null ? Math.round(currentPct) : '--'}%`}
          </p>
        </div>
        <button onClick={handleDelete} disabled={submitting} style={{ fontSize: 12, fontWeight: 600, color: '#E05252', background: 'none', border: 'none', cursor: 'pointer', padding: '6px 12px' }}>
          {submitting ? '...' : 'Remove'}
        </button>
      </div>
    )
  }

  return (
    <div style={{ borderRadius: 14, backgroundColor: '#FFFFFF', border: '2px solid rgba(0,56,101,0.18)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
      <button
        onClick={() => setShowPicker(!showPicker)}
        style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '14px 16px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#003865" strokeWidth="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
        <span style={{ fontSize: 14, fontWeight: 500, color: '#1E293B' }}>Get notified when {buildingName} is quiet</span>
      </button>

      <AnimatePresence>
        {showPicker && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '0 16px 14px', display: 'flex', gap: 8 }}>
              <p style={{ fontSize: 12, color: '#94A3B8', width: '100%', marginBottom: 8 }}>Alert me when below:</p>
              <div style={{ display: 'flex', gap: 8, width: '100%' }}>
                {THRESHOLDS.map((t) => (
                  <button
                    key={t}
                    onClick={() => handleCreate(t)}
                    disabled={submitting}
                    style={{
                      flex: 1, padding: '10px 0', borderRadius: 10, border: 'none',
                      backgroundColor: '#003865', color: '#FFFFFF',
                      fontSize: 14, fontWeight: 600, cursor: submitting ? 'wait' : 'pointer',
                      opacity: submitting ? 0.6 : 1,
                    }}
                  >
                    {t}%
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
