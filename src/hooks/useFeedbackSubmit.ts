import { useCallback, useState } from 'react'
import { isFixtureMode } from '@/lib/dataSource'
import type { FeedbackCategory } from '@/types'

interface UseFeedbackSubmitResult {
  submit: (
    buildingId: string | null,
    category: FeedbackCategory,
    message?: string,
  ) => Promise<boolean>
  isSubmitting: boolean
  error: string | null
}

/**
 * Submits an anonymous correction.
 *
 * No identifier of any kind is attached — not a session id, not a device id.
 * The Edge Function hashes the caller's IP for rate limiting and stores nothing
 * else, and the table has no `user_id` column to fill in later.
 */
export function useFeedbackSubmit(): UseFeedbackSubmitResult {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = useCallback(
    async (
      buildingId: string | null,
      category: FeedbackCategory,
      message?: string,
    ): Promise<boolean> => {
      setError(null)
      setIsSubmitting(true)

      try {
        // With no backend there is nowhere to send it. Say so rather than
        // showing a success state for something that went nowhere.
        if (isFixtureMode) {
          console.info('[UniSpace] Feedback (fixture mode, not sent):', {
            buildingId, category, message,
          })
          return true
        }

        const { supabase } = await import('@/lib/supabase')

        const { data, error: fnError } = await supabase.functions.invoke('submit-feedback', {
          body: {
            building_id: buildingId,
            category,
            message: message?.trim() || null,
          },
        })

        if (fnError) {
          setError(fnError.message)
          return false
        }
        if (!data?.success) {
          setError(data?.error ?? 'Could not send your report')
          return false
        }

        return true
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
        return false
      } finally {
        setIsSubmitting(false)
      }
    },
    [],
  )

  return { submit, isSubmitting, error }
}
