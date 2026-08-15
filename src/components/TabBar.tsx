import { NavLink } from 'react-router-dom'

/**
 * Navigation as a directory listing.
 *
 * SIGNAL's voice is terminal/instrument: paths rather than labels, an amber
 * caret marking position rather than a filled pill. The icons stay for scan
 * speed at a glance, but the text is what carries the state.
 */
const TABS = [
  { to: '/', label: 'Home', icon: HomeIcon },
  { to: '/map', label: 'Map', icon: MapIcon },
  { to: '/alerts', label: 'More', icon: MoreIcon },
]

function HomeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" aria-hidden="true">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

function MapIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" aria-hidden="true">
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
      <line x1="8" y1="2" x2="8" y2="18" />
      <line x1="16" y1="6" x2="16" y2="22" />
    </svg>
  )
}

function MoreIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" aria-hidden="true">
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  )
}

export default function TabBar() {
  return (
    <nav
      className="flex items-stretch justify-around shrink-0"
      style={{
        height: 56,
        backgroundColor: 'var(--color-bg)',
        borderTop: '1px solid var(--color-hairline)',
      }}
    >
      {TABS.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          // 44px minimum touch target (WCAG 2.1 AA) — the row is 56px tall and
          // each link fills it.
          className="mono flex flex-1 flex-col items-center justify-center gap-1 no-underline relative text-xs"
          style={({ isActive }) => ({
            color: isActive ? 'var(--color-amber)' : 'var(--color-text-muted)',
          })}
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-0 right-0"
                  style={{ height: 1, backgroundColor: 'var(--color-amber)' }}
                />
              )}
              <Icon />
              <span>{label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
