import type { FilterState } from '@/types'

interface FilterChipsProps {
  filters: FilterState
  onToggle: (key: keyof FilterState) => void
  onOpenSheet: () => void
}

const CHIPS: { key: keyof FilterState; label: string }[] = [
  { key: 'currently_open', label: 'Open Now' },
  { key: 'has_wifi', label: 'WiFi' },
  { key: 'has_power', label: 'Power' },
  { key: 'has_quiet_zone', label: 'Quiet' },
  { key: 'has_group_seating', label: 'Group' },
]

export default function FilterChips({ filters, onToggle, onOpenSheet }: FilterChipsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto px-4 py-3 scrollbar-hide">
      {CHIPS.map(({ key, label }) => {
        const active = Boolean(filters[key])
        return (
          <button
            key={key}
            onClick={() => onToggle(key)}
            className="shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
            style={{
              backgroundColor: active ? 'var(--color-uom-navy)' : 'var(--color-bg-primary)',
              color: active ? '#FFFFFF' : 'var(--color-text-secondary)',
              border: `1px solid ${active ? 'var(--color-uom-navy)' : 'var(--color-border)'}`,
            }}
          >
            {label}
          </button>
        )
      })}
      <button
        onClick={onOpenSheet}
        className="shrink-0 px-3 py-1.5 rounded-full text-xs font-medium"
        style={{
          backgroundColor: 'var(--color-bg-primary)',
          color: 'var(--color-uom-blue)',
          border: '1px solid var(--color-border)',
        }}
      >
        All Filters
      </button>
    </div>
  )
}
