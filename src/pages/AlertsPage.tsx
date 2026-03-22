import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useWebPush } from '@/hooks/useWebPush'
import { useAlerts } from '@/hooks/useAlerts'
import { useBuildings } from '@/hooks/useBuildings'

const FAQ = [
  { q: 'How does UniSpace know how busy a building is?', a: 'UniSpace combines crowdsourced location data from active users with Google Maps popularity data. When enough students use UniSpace, we show live occupancy. Otherwise, we use Google\'s typical busyness patterns.' },
  { q: 'Is my location data private?', a: 'Yes. Your GPS coordinates never leave your device. UniSpace only detects which building zone you\'re in using on-device processing, then sends just the zone ID — never your actual location.' },
  { q: 'How accurate is the occupancy data?', a: 'Accuracy depends on the data source. Live crowdsourced data is the most accurate. Google estimates are directional (~15-20% margin). All data shows a source label.' },
  { q: 'What does "Google estimate" mean?', a: 'When we don\'t have enough live users, we show Google Maps\' typical popularity data — weekly patterns of how busy each building usually is at this time.' },
  { q: 'Can I use UniSpace without sharing my location?', a: 'Absolutely. You can browse occupancy data, view the map, and get recommendations without GPS. Walking time estimates just won\'t be available.' },
]

export default function AlertsPage() {
  const { isSupported, permission, subscription, subscribe } = useWebPush()
  const { alerts, deleteAlert } = useAlerts(subscription)
  const { buildings } = useBuildings()

  const buildingName = (id: string) => buildings.find((b) => b.id === id)?.short_name ?? buildings.find((b) => b.id === id)?.name ?? 'Unknown'

  return (
    <div className="h-full overflow-y-auto" style={{ backgroundColor: '#F0F2F5' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(145deg, #001F3F 0%, #003865 50%, #005A8C 100%)', padding: '56px 24px 32px' }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.5px' }}>More</h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginTop: 6 }}>Alerts, FAQ, and about</p>
      </div>

      {/* Alerts section */}
      <div style={{ margin: '20px 24px 0', padding: 24, backgroundColor: '#FFFFFF', borderRadius: 20, boxShadow: '0 4px 20px rgba(0,56,101,0.06)', border: '2px solid rgba(0,56,101,0.65)' }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, color: '#1E293B' }}>Occupancy Alerts</h2>

        {!isSupported ? (
          <p style={{ fontSize: 14, color: '#94A3B8', marginTop: 8 }}>Your browser doesn't support push notifications.</p>
        ) : permission === 'denied' ? (
          <p style={{ fontSize: 14, color: '#94A3B8', marginTop: 8 }}>Notifications are blocked. Enable them in your browser settings to use alerts.</p>
        ) : alerts.length === 0 ? (
          <div style={{ marginTop: 12 }}>
            <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.6 }}>
              Get notified when a building drops below your chosen occupancy threshold. Set alerts from any building card on the map.
            </p>
            {permission === 'default' && (
              <button
                onClick={() => subscribe()}
                style={{ marginTop: 14, padding: '10px 20px', borderRadius: 12, border: 'none', backgroundColor: '#003865', color: '#FFFFFF', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
              >
                Enable Notifications
              </button>
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 14 }}>
            {alerts.map((alert) => (
              <div key={alert.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderRadius: 14, backgroundColor: '#F8FAFC', border: '1.5px solid rgba(0,56,101,0.15)' }}>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: '#1E293B', margin: 0 }}>{buildingName(alert.building_id)}</p>
                  <p style={{ fontSize: 12, color: '#94A3B8', margin: '2px 0 0' }}>Alert when below {alert.threshold_pct}%</p>
                </div>
                <button
                  onClick={() => deleteAlert(alert.id)}
                  style={{ fontSize: 12, fontWeight: 600, color: '#E05252', background: 'none', border: 'none', cursor: 'pointer', padding: '6px 12px' }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FAQ */}
      <div style={{ margin: '20px 24px 0' }}>
        <h2 style={{ fontSize: 12, fontWeight: 700, color: '#94A3B8', letterSpacing: '1px', marginBottom: 14 }}>FREQUENTLY ASKED QUESTIONS</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {FAQ.map((item) => <FaqItem key={item.q} question={item.q} answer={item.a} />)}
        </div>
      </div>

      {/* About */}
      <div style={{ margin: '20px 24px 32px', padding: 24, backgroundColor: '#FFFFFF', borderRadius: 20, boxShadow: '0 4px 20px rgba(0,56,101,0.06)', border: '2px solid rgba(0,56,101,0.65)' }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, color: '#1E293B' }}>About UniSpace</h2>
        <p style={{ fontSize: 14, color: '#64748B', marginTop: 8, lineHeight: 1.6 }}>
          UniSpace gives university students real-time visibility into campus occupancy so they never waste time walking to a full building again.
        </p>
        <p style={{ fontSize: 13, color: '#94A3B8', marginTop: 12 }}>
          Version 0.1.0 - Built by Bruno Jaamaa
        </p>
      </div>
    </div>
  )
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ borderRadius: 16, backgroundColor: '#FFFFFF', border: '2px solid rgba(0,56,101,0.65)', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', overflow: 'hidden' }}>
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '18px 20px', textAlign: 'left', cursor: 'pointer', border: 'none', backgroundColor: 'transparent' }}
      >
        <span style={{ fontSize: 14, fontWeight: 500, color: '#1E293B', paddingRight: 16, lineHeight: 1.4 }}>{question}</span>
        <svg
          width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2"
          style={{ flexShrink: 0, transition: 'transform 200ms', transform: open ? 'rotate(180deg)' : 'rotate(0)' }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '0 20px 18px' }}>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: '#64748B' }}>{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
