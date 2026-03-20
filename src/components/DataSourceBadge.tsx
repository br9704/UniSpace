import type { DataQuality } from '@/types'

interface DataSourceBadgeProps {
  source: DataQuality
}

const CONFIG: Record<DataQuality, { icon: string; label: string; color: string }> = {
  live: { icon: '●', label: 'Live', color: 'var(--color-source-live)' },
  google: { icon: '🌐', label: 'Google estimate', color: 'var(--color-source-google)' },
  predicted: { icon: '◆', label: 'Predicted', color: 'var(--color-source-predicted)' },
  stale: { icon: '●', label: 'Stale data', color: 'var(--color-source-stale)' },
  none: { icon: '○', label: 'No data', color: 'var(--color-text-tertiary)' },
}

export default function DataSourceBadge({ source }: DataSourceBadgeProps) {
  const { icon, label, color } = CONFIG[source]

  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs"
      style={{ backgroundColor: 'var(--color-bg-secondary)', color }}
    >
      {icon} {label}
    </span>
  )
}
