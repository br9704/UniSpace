import { useState } from 'react'

interface TipsListProps {
  tips: string[]
  maxVisible?: number
}

/**
 * Building tips as a terminal list — `>` prefixes, expand in place.
 */
export default function TipsList({ tips, maxVisible = 2 }: TipsListProps) {
  const [expanded, setExpanded] = useState(false)
  const visible = expanded ? tips : tips.slice(0, maxVisible)
  const hasMore = tips.length > maxVisible

  return (
    <div>
      <ul className="space-y-2">
        {visible.map((tip, i) => (
          <li
            key={i}
            className="flex gap-2 text-sm"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            <span className="mono shrink-0" aria-hidden="true" style={{ color: 'var(--color-text-dim)' }}>
              &gt;
            </span>
            <span>{tip}</span>
          </li>
        ))}
      </ul>
      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="mono text-xs mt-2 min-h-[44px] flex items-center"
          style={{ color: 'var(--color-amber)', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          {expanded ? '[ show less ]' : `[ ${tips.length - maxVisible} more → ]`}
        </button>
      )}
    </div>
  )
}
