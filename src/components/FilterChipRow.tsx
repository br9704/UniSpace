interface Chip<K extends string> {
  key: K
  label: string
}

interface FilterChipRowProps<K extends string> {
  chips: Chip<K>[]
  isActive: (key: K) => boolean
  onToggle: (key: K) => void
}

/**
 * Filter toggles, as bracketed terminal switches.
 *
 * `[x]` / `[ ]` states the toggle in text as well as colour, so the active set
 * is legible without relying on the accent — which matters here because amber
 * is the only colour available to mark it.
 */
export default function FilterChipRow<K extends string>({
  chips,
  isActive,
  onToggle,
}: FilterChipRowProps<K>) {
  return (
    <>
      {chips.map(({ key, label }) => {
        const active = isActive(key)
        return (
          <button
            key={key}
            type="button"
            onClick={() => onToggle(key)}
            aria-pressed={active}
            className="mono flex items-center gap-1.5 text-xs px-2.5"
            style={{
              minHeight: 44,
              backgroundColor: 'transparent',
              border: `1px solid ${active ? 'var(--color-amber)' : 'var(--color-hairline)'}`,
              borderRadius: 'var(--radius-md)',
              color: active ? 'var(--color-amber)' : 'var(--color-text-secondary)',
              cursor: 'pointer',
              transition: 'border-color var(--dur-fast) linear, color var(--dur-fast) linear',
            }}
          >
            <span aria-hidden="true">{active ? '[x]' : '[ ]'}</span>
            {label.toUpperCase()}
          </button>
        )
      })}
    </>
  )
}
