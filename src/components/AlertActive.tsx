import type { UserAlert } from '@/types'
import Card from './ui/Card'

interface AlertActiveProps {
  alert: UserAlert
  currentPct: number | null
  busy: boolean
  onDelete: () => void
}

/** The state where an alert is already set for this building. */
export default function AlertActive({ alert, currentPct, busy, onDelete }: AlertActiveProps) {
  const belowThreshold = currentPct !== null && currentPct <= alert.threshold_pct

  return (
    <Card>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="mono text-xs" style={{ color: 'var(--color-amber)' }}>
            ALERT SET · BELOW {alert.threshold_pct}%
          </p>
          <p className="mono text-xs mt-1" style={{ color: 'var(--color-text-dim)' }}>
            NOW {currentPct !== null ? `${Math.round(currentPct)}%` : '--'}
            {belowThreshold && ' · BELOW THRESHOLD'}
          </p>
        </div>
        <button
          type="button"
          onClick={onDelete}
          disabled={busy}
          className="mono text-xs"
          style={{
            minHeight: 44, padding: '0 8px',
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--color-text-secondary)',
          }}
        >
          [ REMOVE ]
        </button>
      </div>
    </Card>
  )
}
