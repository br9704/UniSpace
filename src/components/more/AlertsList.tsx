import type { Building, UserAlert } from '@/types'
import Card from '../ui/Card'
import SectionLabel from '../SectionLabel'

interface AlertsListProps {
  alerts: UserAlert[]
  buildings: Building[]
  isSupported: boolean
  permission: NotificationPermission
  onEnable: () => void
  onDelete: (alertId: string) => void
}

/** Active occupancy alerts, and the states where there are none to show. */
export default function AlertsList({
  alerts, buildings, isSupported, permission, onEnable, onDelete,
}: AlertsListProps) {
  const nameFor = (id: string) => {
    const building = buildings.find((b) => b.id === id)
    return building?.short_name ?? building?.name ?? 'Unknown building'
  }

  return (
    <Card variant="elevated">
      <SectionLabel className="mb-3">alerts</SectionLabel>

      {!isSupported ? (
        <p className="mono text-xs" style={{ color: 'var(--color-text-muted)' }}>
          &gt; This browser does not support push notifications.
          {/* On iOS this is the expected state until the app is installed to the
              Home Screen — Safari tabs cannot receive Web Push at all. */}
        </p>
      ) : permission === 'denied' ? (
        <p className="mono text-xs" style={{ color: 'var(--color-text-muted)' }}>
          &gt; Notifications are blocked. Enable them in your browser settings to use alerts.
        </p>
      ) : alerts.length === 0 ? (
        <div>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
            Get notified when a building drops below the occupancy you choose. Set one from any
            building on the map.
          </p>
          {permission === 'default' && (
            <button
              type="button"
              onClick={onEnable}
              className="mono text-xs mt-3 px-3"
              style={{
                minHeight: 44,
                background: 'none',
                border: '1px solid var(--color-amber)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--color-amber)',
                cursor: 'pointer',
              }}
            >
              [ ENABLE NOTIFICATIONS ]
            </button>
          )}
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          {alerts.map((alert) => (
            <li
              key={alert.id}
              className="flex items-center justify-between gap-3 px-3"
              style={{
                border: '1px solid var(--color-hairline)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <div className="py-3">
                <p className="text-sm" style={{ color: 'var(--color-text-primary)' }}>
                  {nameFor(alert.building_id)}
                </p>
                <p className="mono text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                  BELOW {alert.threshold_pct}%
                </p>
              </div>
              <button
                type="button"
                onClick={() => onDelete(alert.id)}
                className="mono text-xs"
                style={{
                  minHeight: 44, padding: '0 8px',
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--color-text-secondary)',
                }}
              >
                [ REMOVE ]
              </button>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}
