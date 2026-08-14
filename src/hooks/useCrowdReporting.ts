import { useCallback, useState } from 'react'
import { useReportSubmit } from './useReportSubmit'
import { findNearestBuilding } from '@/lib/geoHelpers'
import type { Building, NoiseLevel, ReportLevel } from '@/types'

interface Position {
  latitude: number
  longitude: number
}

/**
 * Owns the "how busy is it?" reporting flow.
 *
 * Reporting is the loop that makes the crowdsourced half of this product work
 * at all, and it is reachable from two places — the map's floating button,
 * which targets wherever the user physically is, and the building card, which
 * targets whatever they are looking at. Keeping both entry points and the
 * throttle in one hook stops that logic being duplicated across surfaces.
 */
export function useCrowdReporting(buildings: Building[], position: Position | null) {
  const { submit, isSubmitting, error, canReport } = useReportSubmit()
  const [target, setTarget] = useState<Building | null>(null)

  /** Open the sheet for the building the user is standing closest to. */
  const reportNearest = useCallback(() => {
    if (!position) return
    const nearest = findNearestBuilding(position, buildings)
    if (nearest) setTarget(nearest)
  }, [position, buildings])

  const handleSubmit = useCallback(
    async (level: ReportLevel, noise?: NoiseLevel) => {
      if (!target) return
      const succeeded = await submit(target.id, level, noise)
      // Only close on success — a failed report that silently vanishes looks
      // exactly like one that worked.
      if (succeeded) setTarget(null)
    },
    [target, submit],
  )

  return {
    target,
    reportNearest,
    reportBuilding: setTarget,
    dismiss: useCallback(() => setTarget(null), []),
    handleSubmit,
    isSubmitting,
    error,
    canReport,
  }
}
