import { useCallback, useEffect, useState } from 'react'
import { useRefetchOnReconnect } from './useRefetchOnReconnect'
import { fetchRows, subscribeRows } from '@/lib/dataSource'
import type { ZoneOccupancy } from '@/types'
import { groupByBuildingId, mergeZoneOccupancy } from '@/lib/occupancyHelpers'

interface UseOccupancyRealtimeResult {
  zoneOccupancyMap: Map<string, ZoneOccupancy[]>
  isLoading: boolean
  error: string | null
}

/**
 * Subscribes to zone_occupancy changes.
 * Fetches an initial snapshot on mount, then merges live updates.
 * Returns zone occupancies grouped by building_id.
 */
export function useOccupancyRealtime(): UseOccupancyRealtimeResult {
  const [zoneOccupancyMap, setMap] = useState<Map<string, ZoneOccupancy[]>>(new Map())
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reloadToken, setReloadToken] = useState(0)

  // Losing signal also drops the Realtime subscription, and nothing else
  // re-fetches. Coming back online re-runs the effect below, which re-reads the
  // snapshot and re-subscribes in one pass.
  useRefetchOnReconnect(useCallback(() => setReloadToken((n) => n + 1), []))

  useEffect(() => {
    let cancelled = false

    async function fetchInitial() {
      const { data, error: fetchError } = await fetchRows<ZoneOccupancy>('zone_occupancy')
      if (cancelled) return

      if (fetchError) {
        setError(fetchError)
        setIsLoading(false)
        return
      }

      setMap(groupByBuildingId(data))
      setIsLoading(false)
    }

    fetchInitial()

    const unsubscribe = subscribeRows<ZoneOccupancy>('zone_occupancy', '*', (updated) => {
      if (cancelled) return
      if (updated?.zone_id && updated?.building_id) {
        setMap((prev) => mergeZoneOccupancy(prev, updated))
      }
    })

    return () => {
      cancelled = true
      unsubscribe()
    }
  }, [reloadToken])

  return { zoneOccupancyMap, isLoading, error }
}
