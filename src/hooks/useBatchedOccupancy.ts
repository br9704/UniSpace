import { useEffect, useRef, useState } from 'react'
import type { BlendedOccupancy } from '@/types'

/** MOTION.md: at most one visual pass per 5 seconds. */
const BATCH_INTERVAL_MS = 5000

/** How long a value change is allowed to cross-fade before breathing resumes. */
const CHANGE_SETTLE_MS = 400

interface BatchedOccupancy {
  /** Occupancy to render — updated at most once per batch interval. */
  occupancyMap: Map<string, BlendedOccupancy>
  /** True while a genuine value change is cross-fading. */
  isChanging: boolean
}

/**
 * Throttles occupancy updates to one visual pass per 5 seconds.
 *
 * MOTION.md: "Realtime updates are batched to at most one visual pass per 5s.
 * Sub-second heatmap flicker reads as broken, not live." The aggregator writes
 * every 10 seconds and Realtime can deliver several rows in quick succession,
 * so without this the map repaints in bursts.
 *
 * It also reports *whether the numbers actually moved*, which the breathing
 * animation needs. MOTION.md requires change to read differently from liveness:
 * on a real change the breath pauses, the zone cross-fades, and only then does
 * breathing resume. A repaint carrying identical values is not a change and
 * must not interrupt anything.
 *
 * @param source - Live occupancy, updated as often as the data arrives.
 * @param holdUpdates - Freeze rendering entirely. Used while a card is open:
 *   MOTION.md forbids the map reflowing under content the user is mid-read.
 */
export function useBatchedOccupancy(
  source: Map<string, BlendedOccupancy>,
  holdUpdates = false,
): BatchedOccupancy {
  const [rendered, setRendered] = useState(source)
  const [isChanging, setIsChanging] = useState(false)
  const lastFlushRef = useRef(0)

  useEffect(() => {
    if (holdUpdates) return

    const flush = () => {
      // `source` is captured fresh: the effect re-runs whenever it changes, and
      // the cleanup below cancels any timer scheduled against the old value.
      const next = source
      setRendered((prev) => {
        if (!hasChanged(prev, next)) return prev
        // Only a genuine value change pauses the breath.
        setIsChanging(true)
        setTimeout(() => setIsChanging(false), CHANGE_SETTLE_MS)
        return next
      })
      lastFlushRef.current = Date.now()
    }

    // First data after mount should paint immediately — waiting five seconds to
    // show anything would read as a broken app, not a considered one.
    const elapsed = Date.now() - lastFlushRef.current
    if (lastFlushRef.current === 0 || elapsed >= BATCH_INTERVAL_MS) {
      flush()
      return
    }

    const timer = setTimeout(flush, BATCH_INTERVAL_MS - elapsed)
    return () => clearTimeout(timer)
  }, [source, holdUpdates])

  return { occupancyMap: rendered, isChanging }
}

/** Whether any building's rendered percentage or source has actually moved. */
function hasChanged(
  previous: Map<string, BlendedOccupancy>,
  next: Map<string, BlendedOccupancy>,
): boolean {
  if (previous === next) return false
  if (previous.size !== next.size) return true

  for (const [id, value] of next) {
    const before = previous.get(id)
    if (!before) return true
    // Compare what is displayed, not the raw float: a shift from 42.3 to 42.4
    // renders identically and should not trigger a cross-fade.
    if (roundedPct(before) !== roundedPct(value)) return true
    if (before.source !== value.source) return true
  }

  return false
}

function roundedPct(occupancy: BlendedOccupancy): number | null {
  return occupancy.pct === null ? null : Math.round(occupancy.pct)
}
