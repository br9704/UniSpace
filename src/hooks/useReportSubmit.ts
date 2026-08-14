import { useCallback, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { isFixtureMode } from '@/lib/dataSource'
import { submitFixtureReport } from '@/lib/fixtures'
import { canReportAgain, markReported } from '@/lib/localStore'
import type { ReportLevel, NoiseLevel } from '@/types'

/** One report per building per 5 minutes, enforced client-side. The Edge
 *  Function applies its own IP-based limit server-side; this one exists to stop
 *  honest double-taps, not abuse. */
const THROTTLE_MS = 5 * 60 * 1000

interface UseReportSubmitResult {
  submit: (buildingId: string, level: ReportLevel, noise?: NoiseLevel) => Promise<boolean>
  isSubmitting: boolean
  error: string | null
  canReport: (buildingId: string) => boolean
}

export function useReportSubmit(): UseReportSubmitResult {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const canReport = useCallback(
    (buildingId: string): boolean => canReportAgain(buildingId, THROTTLE_MS),
    [],
  )

  const submit = useCallback(async (
    buildingId: string,
    level: ReportLevel,
    noise?: NoiseLevel,
  ): Promise<boolean> => {
    setError(null)
    setIsSubmitting(true)

    try {
      // Submit → see your own zone update is the loop that earns contributions,
      // so it has to be exercisable with no backend, not just described.
      if (isFixtureMode) {
        submitFixtureReport({
          building_id: buildingId,
          occupancy_level: level,
          noise_level: noise ?? null,
        })
        markReported(buildingId)
        return true
      }

      const { data, error: fnError } = await supabase.functions.invoke('submit-report', {
        body: {
          building_id: buildingId,
          occupancy_level: level,
          noise_level: noise ?? null,
        },
      })

      if (fnError) {
        setError(fnError.message)
        return false
      }

      if (!data?.success) {
        setError(data?.error ?? 'Report submission failed')
        return false
      }

      markReported(buildingId)
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      return false
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  return { submit, isSubmitting, error, canReport }
}
