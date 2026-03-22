import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { OccupancyReport } from '@/types'

/**
 * Fetches non-expired occupancy reports and subscribes to new inserts via Realtime.
 * Prunes expired reports from local state every 60 seconds.
 * Returns reports grouped by building_id.
 */
export function useRecentReports(): Map<string, OccupancyReport[]> {
  const [reportsMap, setReportsMap] = useState<Map<string, OccupancyReport[]>>(new Map())

  useEffect(() => {
    let cancelled = false

    async function fetchInitial() {
      const { data, error } = await supabase
        .from('occupancy_reports')
        .select('id, building_id, occupancy_level, noise_level, created_at, expires_at')
        .gt('expires_at', new Date().toISOString())

      if (cancelled || error) return
      setReportsMap(groupByBuilding(data as OccupancyReport[]))
    }

    fetchInitial()

    // Realtime subscription for new inserts
    const channel = supabase
      .channel('occupancy-reports-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'occupancy_reports' },
        (payload) => {
          if (cancelled) return
          const report = payload.new as OccupancyReport
          if (report?.id && report?.building_id) {
            setReportsMap((prev) => {
              const next = new Map(prev)
              const group = [...(next.get(report.building_id) ?? []), report]
              next.set(report.building_id, group)
              return next
            })
          }
        },
      )
      .subscribe()

    // Prune expired reports every 60 seconds
    const pruneInterval = setInterval(() => {
      setReportsMap((prev) => {
        const now = Date.now()
        const next = new Map<string, OccupancyReport[]>()
        for (const [buildingId, reports] of prev) {
          const valid = reports.filter((r) => new Date(r.expires_at).getTime() > now)
          if (valid.length > 0) next.set(buildingId, valid)
        }
        return next
      })
    }, 60_000)

    return () => {
      cancelled = true
      supabase.removeChannel(channel)
      clearInterval(pruneInterval)
    }
  }, [])

  return reportsMap
}

function groupByBuilding(reports: OccupancyReport[]): Map<string, OccupancyReport[]> {
  const map = new Map<string, OccupancyReport[]>()
  for (const r of reports) {
    const group = map.get(r.building_id)
    if (group) group.push(r)
    else map.set(r.building_id, [r])
  }
  return map
}
