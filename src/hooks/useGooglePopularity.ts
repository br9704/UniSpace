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
      const [cacheResult, typicalResult, predictionResult] = await Promise.all([
        supabase.from('google_popularity_cache').select('*'),
        supabase.from('google_popular_times').select('*'),
        supabase.from('occupancy_predictions').select('*'),
      ])

      if (cancelled) return

      const firstError = cacheResult.error || typicalResult.error || predictionResult.error
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

      if (typicalResult.data) {
        setTypicalRows(typicalResult.data as GooglePopularTime[])
      }

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
