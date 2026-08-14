import { useEffect, useState } from 'react'
import { STALE_DATA_THRESHOLD_MS } from '@/constants/occupancy'

interface StaleDataBannerProps {
  lastUpdated: Date | null
}

/**
 * Only surface staleness for data that was recently live. Seed data is hours or
 * days old by definition, and banner-ing it would call a working app broken.
 */
const MAX_STALE_DISPLAY_MS = 60 * 60 * 1000

export default function StaleDataBanner({ lastUpdated }: StaleDataBannerProps) {
  // Staleness is a pure function of (lastUpdated, now), so it is derived rather
  // than mirrored into state by an effect. The clock is the one genuinely
  // external input, so it — and only it — lives in state, sampled on a timer.
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 10_000)
    return () => clearInterval(interval)
  }, [])

  const age = lastUpdated ? now - lastUpdated.getTime() : null
  const isStale = age !== null && age > STALE_DATA_THRESHOLD_MS && age < MAX_STALE_DISPLAY_MS

  if (!isStale) return null

  const mins = Math.floor(age / 60_000)
  const agoText = mins < 1 ? 'just now' : `${mins} min ago`

  return (
    <div
      className="px-4 py-2 text-xs text-center"
      style={{
        backgroundColor: 'rgba(245, 166, 35, 0.15)',
        color: 'var(--color-moderate)',
        borderBottom: '1px solid rgba(245, 166, 35, 0.3)',
      }}
    >
      Data last updated {agoText}
    </div>
  )
}
