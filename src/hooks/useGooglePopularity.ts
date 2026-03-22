import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type {
  GooglePopularityCache,
  GooglePopularTime,
  OccupancyPrediction,
} from '@/types'

interface UseGooglePopularityResult {
  googleCacheMap: Map<string, GooglePopularityCache>
  allTypicalRows: GooglePopularTime[]
  allPredictionRows: OccupancyPrediction[]
  isLoading: boolean
  error: string | null
}

/**
 * Fetches all Google fallback data + predictions once on mount.
 * Returns indexed maps and raw row arrays for lookup by building + day/hour.
 */
export function useGooglePopularity(): UseGooglePopularityResult {
  const [googleCacheMap, setCacheMap] = useState<Map<string, GooglePopularityCache>>(new Map())
  const [allTypicalRows, setTypicalRows] = useState<GooglePopularTime[]>([])
  const [allPredictionRows, setPredictionRows] = useState<OccupancyPrediction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function fetchAll() {
      // Supabase PostgREST caps at 1000 rows per request.
      // google_popular_times has ~1500 rows, so fetch in two pages.
      const [cacheResult, typicalPage1, typicalPage2, predictionResult] = await Promise.all([
        supabase.from('google_popularity_cache').select('*'),
        supabase.from('google_popular_times').select('*').range(0, 999),
        supabase.from('google_popular_times').select('*').range(1000, 1999),
        supabase.from('occupancy_predictions').select('*'),
      ])

      if (cancelled) return

      const firstError = cacheResult.error || typicalPage1.error || predictionResult.error
      if (firstError) {
        setError(firstError.message)
      }

      // Build google cache map (indexed by building_id)
      if (cacheResult.data) {
        const map = new Map<string, GooglePopularityCache>()
        for (const row of cacheResult.data as GooglePopularityCache[]) {
          map.set(row.building_id, row)
        }
        setCacheMap(map)
      }

      const allTypical = [
        ...((typicalPage1.data as GooglePopularTime[]) ?? []),
        ...((typicalPage2.data as GooglePopularTime[]) ?? []),
      ]
      setTypicalRows(allTypical)

      if (predictionResult.data) {
        setPredictionRows(predictionResult.data as OccupancyPrediction[])
      }

      setIsLoading(false)
    }

    fetchAll()

    return () => { cancelled = true }
  }, [])

  return { googleCacheMap, allTypicalRows, allPredictionRows, isLoading, error }
}
