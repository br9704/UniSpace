import { useCallback, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { ReportLevel, NoiseLevel } from '@/types'

const THROTTLE_MS = 5 * 60 * 1000 // 5 minutes

function throttleKey(buildingId: string): string {
  return `pulse_report_${buildingId}`
}

interface UseReportSubmitResult {
  submit: (buildingId: string, level: ReportLevel, noise?: NoiseLevel) => Promise<boolean>
  isSubmitting: boolean
  error: string | null
  canReport: (buildingId: string) => boolean
}

export function useReportSubmit(): UseReportSubmitResult {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const canReport = useCallback((buildingId: string): boolean => {
    const lastReport = localStorage.getItem(throttleKey(buildingId))
    if (!lastReport) return true
    return Date.now() - Number(lastReport) >= THROTTLE_MS
  }, [])

  const submit = useCallback(async (
    buildingId: string,
    level: ReportLevel,
    noise?: NoiseLevel,
  ): Promise<boolean> => {
    setError(null)
    setIsSubmitting(true)

    try {
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

      localStorage.setItem(throttleKey(buildingId), String(Date.now()))
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
