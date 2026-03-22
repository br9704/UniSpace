import { useState } from 'react'

interface TipsListProps {
  tips: string[]
  maxVisible?: number
}

export default function TipsList({ tips, maxVisible = 2 }: TipsListProps) {
  const [expanded, setExpanded] = useState(false)
  const visible = expanded ? tips : tips.slice(0, maxVisible)
  const hasMore = tips.length > maxVisible

  return (
    <div>
      <ul className="space-y-2">
        {visible.map((tip, i) => (
          <li key={i} className="flex gap-2 text-sm text-[var(--color-text-secondary)]">
            <span className="shrink-0 text-[#94A3B8]">-</span>
            <span>{tip}</span>
          </li>
        ))}
      </ul>
      {hasMore && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-[var(--color-text-accent)] mt-2 underline min-h-[44px] flex items-center"
        >
          {expanded ? 'Show less' : `Show ${tips.length - maxVisible} more`}
        </button>
      )}
    </div>
  )
}
