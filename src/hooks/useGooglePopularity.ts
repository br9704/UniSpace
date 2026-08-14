import { useEffect, useState } from 'react'
import { fetchRows } from '@/lib/dataSource'
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
 * Fetches the fallback occupancy data used when no live signal exists:
 * typical-occupancy curves, computed predictions, and cached open/closed state.
 *
 * Despite the table names, the curves are UniSpace's own modelled estimates of
 * campus rhythm — Google's public API does not expose live or typical busyness.
 * The UI must present them as estimates, never as Google data.
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
        fetchRows<GooglePopularityCache>('google_popularity_cache'),
        // Paginates internally — the curves already exceed one PostgREST page.
        fetchRows<GooglePopularTime>('google_popular_times'),
        fetchRows<OccupancyPrediction>('occupancy_predictions'),
      ])

      if (cancelled) return

      const firstError = cacheResult.error || typicalResult.error || predictionResult.error
      if (firstError) setError(firstError)

      const map = new Map<string, GooglePopularityCache>()
      for (const row of cacheResult.data) map.set(row.building_id, row)
      setCacheMap(map)

      setTypicalRows(typicalResult.data)
      setPredictionRows(predictionResult.data)
      setIsLoading(false)
    }

    fetchAll()

    return () => { cancelled = true }
  }, [])

  return { googleCacheMap, allTypicalRows, allPredictionRows, isLoading, error }
}
