import type { DataQuality } from '@/types'

interface DataSourceBadgeProps {
  source: DataQuality
}

const CONFIG: Record<DataQuality, { icon: string; label: string; color: string }> = {
  live: { icon: '\u25CF', label: 'Live', color: '#4CAF7D' },
  'crowd-report': { icon: '\u25CF', label: 'Crowd report', color: '#4CAF7D' },
  google: { icon: '\u25CF', label: 'Google data', color: '#0080A4' },
  predicted: { icon: '\u25C6', label: 'Predicted', color: '#C8A951' },
  stale: { icon: '\u25CF', label: 'Stale data', color: '#94A3B8' },
  none: { icon: '\u25CB', label: 'No data', color: '#94A3B8' },
}

export default function DataSourceBadge({ source }: DataSourceBadgeProps) {
  const { icon, label, color } = CONFIG[source]

  return (
    <span
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs"
      style={{ backgroundColor: '#F0F2F5', color }}
    >
      {icon} {label}
    </span>
  )
}
