import { NavLink } from 'react-router-dom'

function HomeIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
}
function MapIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>
}
function SearchIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
}
function BellIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
}

const TABS = [
  { to: '/', icon: HomeIcon, label: 'Home' },
  { to: '/map', icon: MapIcon, label: 'Map' },
  { to: '/find', icon: SearchIcon, label: 'Find' },
  { to: '/alerts', icon: BellIcon, label: 'More' },
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
      {TABS.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className="flex flex-col items-center justify-center gap-0.5 py-1 px-4 no-underline relative"
          style={({ isActive }) => ({
            color: isActive ? 'var(--color-uom-navy)' : 'var(--color-text-tertiary)',
          })}
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <div className="absolute top-0 left-2 right-2 h-0.5 rounded-full" style={{ backgroundColor: 'var(--color-uom-navy)' }} />
              )}
              <Icon />
              <span className="text-xs" style={{ fontWeight: isActive ? 600 : 400 }}>{label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
