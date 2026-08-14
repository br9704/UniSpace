import { useEffect, useRef } from 'react'
import type { Map as MapboxMap } from 'mapbox-gl'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

/** Full breath, in milliseconds. MOTION.md specifies a 4s ease-in-out loop. */
const PERIOD_MS = 4000

/** Amplitude around the base opacity. Subtle enough to vanish in a still frame. */
const AMPLITUDE = 0.08

/**
 * The signature motif: occupancy zones breathe.
 *
 * MOTION.md — "Occupancy zones breathe: a slow opacity oscillation that says
 * *live* without saying *changing*." The test it sets is precise: a screenshot
 * of any single frame should look identical to any other, while four seconds of
 * recording clearly shows movement. If a recording looks like blinking, the
 * amplitude is wrong.
 *
 * That is why this modulates opacity and nothing else. Anything that moved
 * position or colour would compete with the 800ms cross-fade that signals a
 * genuine value change, and MOTION.md is explicit that change must read
 * differently from liveness.
 *
 * The oscillation pauses while `paused` is true — used to hold the breath
 * during a real value change so the two never overlap.
 *
 * @param getMap    Accessor for the map, which is created asynchronously.
 * @param layerId   Fill layer to modulate.
 * @param baseOpacity Opacity to oscillate around.
 * @param enabled   False when no zone has live data — nothing is live, so
 *                  nothing should claim to be.
 * @param paused    True while a value change is cross-fading.
 */
export function useBreathingLayer(
  getMap: () => MapboxMap | null,
  layerId: string,
  baseOpacity: number,
  enabled: boolean,
  paused: boolean,
): void {
  const prefersReducedMotion = usePrefersReducedMotion()
  const frameRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const map = getMap()
    if (!map) return

    const setOpacity = (value: number) => {
      // The layer may not exist yet, or the style may be mid-reload.
      if (!map.getLayer(layerId)) return
      try {
        map.setPaintProperty(layerId, 'fill-opacity', value)
      } catch {
        // Style reloading — the next frame will pick it up.
      }
    }

    // Reduced motion drops the oscillation entirely. No information is lost:
    // the `● LIVE` dot carries liveness in text, and MOTION.md makes that dot
    // static under the same preference.
    if (prefersReducedMotion || !enabled || paused) {
      setOpacity(baseOpacity)
      return
    }

    const startedAt = performance.now()

    const tick = (now: number) => {
      const phase = ((now - startedAt) % PERIOD_MS) / PERIOD_MS
      // Cosine gives ease-in-out for free, with no discontinuity at the loop
      // boundary — a linear sawtooth would snap once per cycle.
      const eased = (1 - Math.cos(phase * 2 * Math.PI)) / 2
      setOpacity(baseOpacity - AMPLITUDE / 2 + AMPLITUDE * eased)
      frameRef.current = requestAnimationFrame(tick)
    }

    frameRef.current = requestAnimationFrame(tick)

    return () => {
      if (frameRef.current !== undefined) cancelAnimationFrame(frameRef.current)
      setOpacity(baseOpacity)
    }
  }, [getMap, layerId, baseOpacity, enabled, paused, prefersReducedMotion])
}
