import { useMemo } from 'react'
import type { BlendedOccupancy, Building, GooglePopularTime } from '@/types'
import { calculateWalkingTime } from '@/lib/scoring'
import { isOpenNow } from '@/lib/buildingHours'

export interface CampusItem {
  building: Building
  occupancy: BlendedOccupancy | null
  walkMinutes: number | null
}

export interface CampusOverview {
  /** Every building, quietest first. */
  items: CampusItem[]
  quiet: CampusItem[]
  filling: CampusItem[]
  openCount: number
  quietCount: number
  averagePct: number | null
  quietest: CampusItem | null
  busiest: CampusItem | null
  peakHourToday: number | null
  lastUpdated: string | null
}

/** Buildings at or below this are worth surfacing as "quiet right now". */
const QUIET_THRESHOLD = 40

/**
 * Derives everything the home screen reports about the campus as a whole.
 *
 * Kept out of the page so the numbers are computed once, in one place, from one
 * definition — the same figure was previously recomputed inline in three
 * components with slightly different rules about missing data.
 *
 * Buildings with no reading are excluded from averages and extremes rather than
 * counted as zero. Treating "unknown" as "empty" is the failure mode this whole
 * product has to avoid.
 */
export function useCampusOverview(
  buildings: Building[],
  occupancyMap: Map<string, BlendedOccupancy>,
  typicalRows: GooglePopularTime[],
  position: { latitude: number; longitude: number } | null,
): CampusOverview {
  return useMemo(() => {
    const items: CampusItem[] = buildings
      .map((building) => ({
        building,
        occupancy: occupancyMap.get(building.id) ?? null,
        walkMinutes:
          calculateWalkingTime(position, building.entrance_lat, building.entrance_lng)?.minutes ??
          null,
      }))
      .sort((a, b) => (a.occupancy?.pct ?? 100) - (b.occupancy?.pct ?? 100))

    const withData = items.filter((item) => item.occupancy?.pct != null)

    const today = new Date().getDay()
    const hourTotals = new Map<number, number>()
    for (const row of typicalRows) {
      if (row.day_of_week !== today) continue
      hourTotals.set(
        row.hour_of_day,
        (hourTotals.get(row.hour_of_day) ?? 0) + row.typical_popularity,
      )
    }

    let peakHourToday: number | null = null
    let peakTotal = 0
    for (const [hour, total] of hourTotals) {
      if (total > peakTotal) {
        peakTotal = total
        peakHourToday = hour
      }
    }

    const lastUpdated = withData.reduce<string | null>((latest, item) => {
      const stamp = item.occupancy!.last_updated
      if (!latest) return stamp
      return new Date(stamp) > new Date(latest) ? stamp : latest
    }, null)

    return {
      items,
      quiet: items.filter((item) => (item.occupancy?.pct ?? 100) <= QUIET_THRESHOLD),
      filling: items.filter((item) => item.occupancy?.trend === 'filling'),
      openCount: items.filter((item) => isOpenNow(item.building).open).length,
      quietCount: items.filter((item) => (item.occupancy?.pct ?? 100) < 50).length,
      averagePct: withData.length
        ? Math.round(withData.reduce((sum, item) => sum + item.occupancy!.pct!, 0) / withData.length)
        : null,
      quietest: withData.length
        ? withData.reduce((min, item) => (item.occupancy!.pct! < min.occupancy!.pct! ? item : min))
        : null,
      busiest: withData.length
        ? withData.reduce((max, item) => (item.occupancy!.pct! > max.occupancy!.pct! ? item : max))
        : null,
      peakHourToday,
      lastUpdated,
    }
  }, [buildings, occupancyMap, typicalRows, position])
}
