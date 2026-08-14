import { useEffect, useState } from 'react'
import { fetchRows, subscribeRows } from '@/lib/dataSource'
import type { OccupancyReport } from '@/types'

/**
 * Fetches non-expired occupancy reports and subscribes to new inserts.
 * Prunes expired reports from local state every 60 seconds.
 * Returns reports grouped by building_id.
 */
export function useRecentReports(): Map<string, OccupancyReport[]> {
  const [reportsMap, setReportsMap] = useState<Map<string, OccupancyReport[]>>(new Map())

  useEffect(() => {
    let cancelled = false

    async function fetchInitial() {
      const { data, error } = await fetchRows<OccupancyReport>('occupancy_reports', {
        unexpiredOnly: true,
      })
      if (cancelled || error) return
      setReportsMap(groupByBuilding(data))
    }

    fetchInitial()

    const unsubscribe = subscribeRows<OccupancyReport>('occupancy_reports', 'INSERT', (report) => {
      if (cancelled) return
      if (report?.id && report?.building_id) {
        setReportsMap((prev) => {
          const next = new Map(prev)
          next.set(report.building_id, [...(next.get(report.building_id) ?? []), report])
          return next
        })
      }
    })

    // Reports carry a 30-minute lifespan; drop them as they lapse so stale
    // crowd data never keeps influencing the blend.
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
      unsubscribe()
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
