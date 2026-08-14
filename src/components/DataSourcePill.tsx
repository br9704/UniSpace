import { useState, useEffect } from 'react'
import type { DataQuality } from '@/types'
import { formatRelativeTime } from '@/lib/relativeTime'

interface DataSourcePillProps {
  source: DataQuality
  lastUpdated?: Date | null
}

/**
 * Bottom-left readout: what the map as a whole is currently showing.
 *
 * Green and the pulse are reserved for genuinely live data. An estimate gets
 * the dim `~` treatment, so a quiet campus never masquerades as a measured one.
 */
const CONFIG: Record<DataQuality, { glyph: string; label: string; live: boolean }> = {
  live: { glyph: '●', label: 'LIVE', live: true },
  'crowd-report': { glyph: '●', label: 'CROWD REPORTS', live: true },
  google: { glyph: '~', label: 'ESTIMATED', live: false },
  predicted: { glyph: '~', label: 'PREDICTED', live: false },
  stale: { glyph: '·', label: 'STALE', live: false },
  none: { glyph: '○', label: 'NO DATA', live: false },
}

export default function DataSourcePill({ source, lastUpdated }: DataSourcePillProps) {
  const { glyph, label, live } = CONFIG[source]
  const [timeLabel, setTimeLabel] = useState('')

  useEffect(() => {
    if (!lastUpdated) return
    const update = () => setTimeLabel(formatRelativeTime(lastUpdated.toISOString()))
    update()
    const interval = setInterval(update, 10_000)
    return () => clearInterval(interval)
  }, [lastUpdated])

  return (
    <div
      className="mono flex items-center gap-2 px-2.5 py-1.5 text-xs tracking-wider"
      style={{
        backgroundColor: 'var(--color-bg)',
        border: '1px solid var(--color-hairline)',
        color: 'var(--color-text-secondary)',
      }}
    >
      <span
        aria-hidden="true"
        style={{
          color: live ? 'var(--color-live)' : 'var(--color-text-dim)',
          animation: live ? 'unispace-status-pulse 2s ease-in-out infinite' : undefined,
        }}
      >
        {glyph}
      </span>
      <span style={{ color: live ? 'var(--color-text-primary)' : 'var(--color-text-secondary)' }}>
        {label}
      </span>
      {timeLabel && <span style={{ color: 'var(--color-text-dim)' }}>· {timeLabel}</span>}
    </div>
  )
}
