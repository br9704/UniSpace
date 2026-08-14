import { useEffect, useState } from 'react'
import type { BlendedOccupancy } from '@/types'
import { getOccupancyLabel } from '@/constants/occupancy'
import { getConfidence } from '@/lib/confidence'

interface OccupancyAnnouncerProps {
  buildingName: string
  occupancy: BlendedOccupancy | null
}

/** Wait for the value to settle before announcing it. */
const SETTLE_MS = 600

/**
 * Announces the occupancy reading to screen readers when it changes.
 *
 * The number on screen animates as it counts, and announcing every frame would
 * read out a stream of values that were never real. So the visible figure is
 * `aria-live="off"` and this region announces once, after the count settles.
 *
 * It deliberately speaks the confidence too. A sighted user gets that from the
 * dashed border and the dimmed intensity; without it, "38%" alone would sound
 * like a measurement when it may be an estimate — which is exactly the
 * misreading the whole confidence system exists to prevent.
 *
 * `polite`, not `assertive`: an occupancy update is never urgent enough to
 * interrupt whatever someone is currently reading.
 */
export default function OccupancyAnnouncer({
  buildingName,
  occupancy,
}: OccupancyAnnouncerProps) {
  const [announcement, setAnnouncement] = useState('')

  const pct = occupancy?.pct ?? null
  const source = occupancy?.source ?? 'none'

  useEffect(() => {
    const timer = setTimeout(() => {
      if (pct === null) {
        setAnnouncement(`${buildingName}: no occupancy data available.`)
        return
      }

      const { isLive, qualifier } = getConfidence(source)
      const provenance = isLive ? 'live reading' : qualifier || 'estimate'
      setAnnouncement(
        `${buildingName}: ${Math.round(pct)} percent full, ${getOccupancyLabel(pct)}. ${provenance}.`,
      )
    }, SETTLE_MS)

    return () => clearTimeout(timer)
  }, [buildingName, pct, source])

  return (
    <span role="status" aria-live="polite" className="sr-only">
      {announcement}
    </span>
  )
}
