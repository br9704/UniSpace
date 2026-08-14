interface TerminalListProps {
  items: string[]
}

/** A plain list in the system's terminal voice — `>` prefixes, no bullets. */
export default function TerminalList({ items }: TerminalListProps) {
  return (
    <ul className="space-y-1">
      {items.map((item) => (
        <li key={item} className="text-sm flex gap-2" style={{ color: 'var(--color-text-secondary)' }}>
          <span className="mono shrink-0" aria-hidden="true" style={{ color: 'var(--color-text-dim)' }}>
            &gt;
          </span>
          {item}
        </li>
      ))}
    </ul>
  )
}
