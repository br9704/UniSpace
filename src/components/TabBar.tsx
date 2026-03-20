import { NavLink } from 'react-router-dom'

const TABS = [
  { to: '/', icon: '🏠', label: 'Home' },
  { to: '/map', icon: '🗺️', label: 'Map' },
  { to: '/find', icon: '🔍', label: 'Find' },
  { to: '/alerts', icon: '🔔', label: 'Alerts' },
]

export default function TabBar() {
  return (
    <nav
      className="flex items-center justify-around shrink-0"
      style={{
        height: 56,
        backgroundColor: 'var(--color-bg-primary)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      {TABS.map(({ to, icon, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className="flex flex-col items-center justify-center gap-0.5 py-1 px-3 no-underline"
          style={({ isActive }) => ({
            color: isActive ? 'var(--color-uom-navy)' : 'var(--color-text-tertiary)',
            fontWeight: isActive ? 600 : 400,
          })}
        >
          <span className="text-lg">{icon}</span>
          <span className="text-xs">{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
