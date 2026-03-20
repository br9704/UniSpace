import { useState } from 'react'

const FAQ = [
  { q: 'How does Pulse know how busy a building is?', a: 'Pulse combines crowdsourced location data from active users with Google Maps popularity data. When enough students use Pulse, we show live occupancy. Otherwise, we use Google\'s typical busyness patterns for the current time.' },
  { q: 'Is my location data private?', a: 'Yes. Your GPS coordinates never leave your device. Pulse only detects which building zone you\'re in (using on-device processing), then sends just the zone ID — never your actual location. Session IDs rotate every 30 minutes and are never stored.' },
  { q: 'How accurate is the occupancy data?', a: 'Accuracy depends on the data source. Live crowdsourced data is the most accurate. Google estimates are directional (~15-20% margin). All data shows a source label so you know what you\'re looking at.' },
  { q: 'What does "Google estimate" mean?', a: 'When we don\'t have enough live users in a building, we fall back to Google Maps\' typical popularity data — weekly patterns of how busy each building usually is at this time.' },
  { q: 'Can I use Pulse without sharing my location?', a: 'Absolutely. You can browse all building occupancy data, view the map, and get recommendations without enabling GPS. Walking time estimates just won\'t be available.' },
]

export default function AlertsPage() {
  return (
    <div className="h-full overflow-y-auto" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
      {/* Header */}
      <div className="px-5 pt-12 pb-5" style={{ background: 'linear-gradient(135deg, #003865 0%, #0080A4 100%)' }}>
        <h1 className="text-xl font-bold text-white">More</h1>
        <p className="text-xs text-white/60 mt-0.5">FAQ, alerts, and about Pulse</p>
      </div>

      {/* Alerts preview */}
      <div className="mx-4 mt-4 p-4 rounded-xl" style={{ backgroundColor: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-card)' }}>
        <h2 className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>Occupancy Alerts</h2>
        <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>
          Get notified when a building drops below your chosen occupancy threshold. Set alerts from any building card.
        </p>
        <div className="mt-3 px-3 py-1.5 rounded-full text-xs font-medium inline-block" style={{ backgroundColor: 'var(--color-uom-gold)', color: '#FFFFFF' }}>
          Coming Soon
        </div>
      </div>

      {/* FAQ */}
      <div className="mx-4 mt-6 mb-4">
        <h2 className="text-xs font-semibold tracking-wider mb-3" style={{ color: 'var(--color-text-tertiary)' }}>FREQUENTLY ASKED QUESTIONS</h2>
        <div className="space-y-2">
          {FAQ.map((item) => (
            <FaqItem key={item.q} question={item.q} answer={item.a} />
          ))}
        </div>
      </div>

      {/* About */}
      <div className="mx-4 mb-8 p-4 rounded-xl" style={{ backgroundColor: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)' }}>
        <h2 className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>About Pulse</h2>
        <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>
          Pulse gives university students real-time visibility into campus occupancy so they never waste time walking to a full building again.
        </p>
        <p className="text-xs mt-2" style={{ color: 'var(--color-text-tertiary)' }}>
          Version 0.1.0 · Built by Bruno Jaamaa
        </p>
      </div>
    </div>
  )
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)' }}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-4 py-3 text-left"
      >
        <span className="text-sm font-medium pr-4" style={{ color: 'var(--color-text-primary)' }}>{question}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-tertiary)" strokeWidth="2" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 200ms' }}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div className="px-4 pb-3">
          <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{answer}</p>
        </div>
      )}
    </div>
  )
}
