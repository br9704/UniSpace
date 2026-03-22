import type { DataQuality } from '@/types'

interface DataSourcePillProps {
  source: DataQuality
}

const CONFIG: Record<DataQuality, { label: string; color: string }> = {
  live: { label: 'Live', color: 'var(--color-source-live)' },
  'crowd-report': { label: 'Crowd reports', color: 'var(--color-source-live)' },
  google: { label: 'Google data', color: 'var(--color-source-google)' },
  predicted: { label: 'Predicted', color: 'var(--color-source-predicted)' },
  stale: { label: 'Stale data', color: 'var(--color-source-stale)' },
  none: { label: 'No data', color: 'var(--color-source-stale)' },
}

export default function DataSourcePill({ source }: DataSourcePillProps) {
  const { label, color } = CONFIG[source]

  return (
    <div
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs"
      style={{ backgroundColor: 'var(--color-bg-elevated)', color: 'var(--color-text-primary)' }}
    >
      <span
        className="w-2 h-2 rounded-full inline-block"
        style={{ backgroundColor: color }}
      />
      {label}
    </div>
  )
}
