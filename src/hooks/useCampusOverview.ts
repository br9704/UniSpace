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
  /** Buildings currently open, counted only among those with published hours. */
  openCount: number
  /** Buildings whose hours a published source backs (migration 021). */
  verifiedHoursCount: number
  quietCount: number
  /** Buildings with an actual occupancy reading — the denominator for quietCount. */
  readingCount: number
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
      // `?? 100` would count a building with no reading as completely full.
      // Absence of data is not evidence of a crowd.
      quiet: withData.filter((item) => item.occupancy!.pct! <= QUIET_THRESHOLD),
      filling: items.filter((item) => item.occupancy?.trend === 'filling'),
      // Only buildings with sourced hours are counted, in either direction. The
      // other 13 carry invented hours, so counting them as open would inflate
      // this and counting them as closed would deflate it — both would be
      // asserting a fact the data does not contain.
      openCount: items.filter((item) => {
        const status = isOpenNow(item.building)
        return status.verified && status.open
      }).length,
      verifiedHoursCount: items.filter((item) => isOpenNow(item.building).verified).length,
      // Counted among buildings that actually have a reading, not among all 18.
      // The old form defaulted a missing pct to 100, so the 13 buildings with no
      // reading were each counted as packed — which is how the headline came to
      // announce "CAMPUS IS BUSY" while average occupancy read 14% and every
      // building on screen said EMPTY.
      quietCount: withData.filter((item) => item.occupancy!.pct! < 50).length,
      readingCount: withData.length,
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
