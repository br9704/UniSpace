interface FindTriggerProps {
  onClick: () => void
}

/**
 * Opens the recommendations panel from the map.
 *
 * Bracketed terminal control rather than a filled pill — and amber, because
 * "find me a spot" is the single primary action on the map surface.
 */
export default function FindTrigger({ onClick }: FindTriggerProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mono absolute flex items-center gap-2 text-xs tracking-wide"
      style={{
        top: 12, left: 12, zIndex: 50,
        padding: '10px 14px', minHeight: 44,
        backgroundColor: 'var(--color-bg)',
        border: '1px solid var(--color-amber)',
        borderRadius: 'var(--radius-md)',
        color: 'var(--color-amber)',
        cursor: 'pointer',
      }}
    >
      Find a spot →
    </button>
  )
}
