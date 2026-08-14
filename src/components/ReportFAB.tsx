interface ReportFABProps {
  visible: boolean
  onClick: () => void
}

/**
 * Opens the crowd-report sheet for wherever the user is standing.
 *
 * Square and steel rather than a circular filled FAB — SIGNAL caps radius at
 * 2px, and amber is reserved for the map's primary action, which is finding a
 * spot rather than reporting one.
 */
export default function ReportFAB({ visible, onClick }: ReportFABProps) {
  if (!visible) return null

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Report how busy this building is"
      className="mono fixed flex items-center justify-center text-xs tracking-wide"
      style={{
        bottom: 72, right: 12, zIndex: 75,
        minWidth: 44, minHeight: 44, padding: '10px 14px',
        backgroundColor: 'var(--color-bg)',
        border: '1px solid var(--color-steel)',
        borderRadius: 'var(--radius-md)',
        color: 'var(--color-text-primary)',
        cursor: 'pointer',
      }}
    >
      [ REPORT ]
    </button>
  )
}
