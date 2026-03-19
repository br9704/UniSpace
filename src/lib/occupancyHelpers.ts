import type {
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

/** Find the google_popular_times row matching current day+hour for a building. */
export function getCurrentTypical(
  rows: GooglePopularTime[],
  buildingId: string,
  now?: Date,
): GooglePopularTime | null {
  const d = now ?? new Date()
  const dow = d.getDay() // 0=Sun
  const hour = d.getHours()
  return rows.find(
    (r) => r.building_id === buildingId && r.day_of_week === dow && r.hour_of_day === hour,
  ) ?? null
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
