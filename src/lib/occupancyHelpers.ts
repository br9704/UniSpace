import type {
  BlendedOccupancy,
  DataQuality,
  GooglePopularTime,
  OccupancyPrediction,
  ZoneOccupancy,
} from '@/types'

/** Group ZoneOccupancy rows by building_id. */
export function groupByBuildingId(rows: ZoneOccupancy[]): Map<string, ZoneOccupancy[]> {
  const map = new Map<string, ZoneOccupancy[]>()
  for (const row of rows) {
    const existing = map.get(row.building_id)
    if (existing) {
      existing.push(row)
    } else {
      map.set(row.building_id, [row])
    }
  }
  return map
}

/**
 * Merge a single updated ZoneOccupancy row into an existing grouped map.
 * Replaces the entry with matching zone_id, or appends if new.
 */
export function mergeZoneOccupancy(
  map: Map<string, ZoneOccupancy[]>,
  updated: ZoneOccupancy,
): Map<string, ZoneOccupancy[]> {
  const next = new Map(map)
  const group = [...(next.get(updated.building_id) ?? [])]
  const idx = group.findIndex((z) => z.zone_id === updated.zone_id)
  if (idx >= 0) {
    group[idx] = updated
  } else {
    group.push(updated)
  }
  next.set(updated.building_id, group)
  return next
}

/** Find the google_popular_times row matching current day+hour for a building.
 *  Falls back to nearest available hour on the same day if exact match not found. */
export function getCurrentTypical(
  rows: GooglePopularTime[],
  buildingId: string,
  now?: Date,
): GooglePopularTime | null {
  const d = now ?? new Date()
  const dow = d.getDay() // 0=Sun
  const hour = d.getHours()

  // Exact match first
  const exact = rows.find(
    (r) => r.building_id === buildingId && r.day_of_week === dow && r.hour_of_day === hour,
  )
  if (exact) return exact

  // Fallback: nearest hour on same day
  const sameDayRows = rows
    .filter((r) => r.building_id === buildingId && r.day_of_week === dow)
    .sort((a, b) => Math.abs(a.hour_of_day - hour) - Math.abs(b.hour_of_day - hour))

  return sameDayRows[0] ?? null
}

/** Find the occupancy_predictions row matching current day+hour for a building. */
export function getCurrentPrediction(
  rows: OccupancyPrediction[],
  buildingId: string,
  now?: Date,
): OccupancyPrediction | null {
  const d = now ?? new Date()
  const dow = d.getDay()
  const hour = d.getHours()
  return rows.find(
    (r) => r.building_id === buildingId && r.day_of_week === dow && r.hour_of_day === hour,
  ) ?? null
}

/** Get the dominant data source across all buildings. 'live' wins any tie. */
export function getDominantDataSource(
  occupancyMap: Map<string, BlendedOccupancy>,
): DataQuality {
  if (occupancyMap.size === 0) return 'none'

  const counts: Record<string, number> = {}
  for (const occ of occupancyMap.values()) {
    counts[occ.source] = (counts[occ.source] ?? 0) + 1
  }

  if (counts['live']) return 'live'
  if (counts['crowd-report']) return 'crowd-report'

  let best: DataQuality = 'none'
  let bestCount = 0
  for (const [source, count] of Object.entries(counts)) {
    if (count > bestCount) {
      best = source as DataQuality
      bestCount = count
    }
  }
  return best
}

/** Get the most recent last_updated timestamp across all buildings. */
export function getLatestUpdate(
  occupancyMap: Map<string, BlendedOccupancy>,
): Date | null {
  if (occupancyMap.size === 0) return null

  let latest = 0
  for (const occ of occupancyMap.values()) {
    const t = new Date(occ.last_updated).getTime()
    if (t > latest) latest = t
  }
  return latest > 0 ? new Date(latest) : null
}
