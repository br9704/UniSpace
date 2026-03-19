import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { ZoneOccupancy } from '@/types'
import { groupByBuildingId, mergeZoneOccupancy } from '@/lib/occupancyHelpers'

interface UseOccupancyRealtimeResult {
  zoneOccupancyMap: Map<string, ZoneOccupancy[]>
  isLoading: boolean
  error: string | null
}

/**
 * Subscribes to zone_occupancy changes via Supabase Realtime.
 * Fetches initial snapshot on mount, then merges live updates.
 * Returns zone occupancies grouped by building_id.
 */
export function useOccupancyRealtime(): UseOccupancyRealtimeResult {
  const [zoneOccupancyMap, setMap] = useState<Map<string, ZoneOccupancy[]>>(new Map())
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    // 1. Initial fetch
    async function fetchInitial() {
      const { data, error: fetchError } = await supabase
        .from('zone_occupancy')
        .select('*')

      if (cancelled) return

      if (fetchError) {
        setError(fetchError.message)
        setIsLoading(false)
        return
      }

      setMap(groupByBuildingId((data as ZoneOccupancy[]) ?? []))
      setIsLoading(false)
    }

    fetchInitial()

    // 2. Realtime subscription
    const channel = supabase
      .channel('zone-occupancy-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'zone_occupancy' },
        (payload) => {
          if (cancelled) return
          const updated = payload.new as ZoneOccupancy
          if (updated?.zone_id && updated?.building_id) {
            setMap((prev) => mergeZoneOccupancy(prev, updated))
          }
        },
      )
      .subscribe()

    return () => {
      cancelled = true
      supabase.removeChannel(channel)
    }
  }, [])

  return { zoneOccupancyMap, isLoading, error }
}
