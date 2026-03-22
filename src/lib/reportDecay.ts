import type { OccupancyReport, ReportLevel } from '@/types'

/** Midpoints of occupancy thresholds for each report level. */
export const REPORT_LEVEL_TO_PCT: Record<ReportLevel, number> = {
  1: 12,  // Empty
  2: 37,  // Quiet
  3: 60,  // Moderate
  4: 77,  // Busy
  5: 93,  // Packed
}

/** Report decay duration in milliseconds (30 minutes). */
export const REPORT_TTL_MS = 30 * 60 * 1000

/**
 * Linear decay weight: 1.0 at creation, 0.0 at expiry.
 * Returns 0 for expired or future reports.
 */
export function reportWeight(report: OccupancyReport, now?: Date): number {
  const n = now ?? new Date()
  const created = new Date(report.created_at).getTime()
  const expires = new Date(report.expires_at).getTime()
  const nowMs = n.getTime()

  if (nowMs < created || nowMs >= expires) return 0
  return (expires - nowMs) / (expires - created)
}

/**
 * Weighted average of non-expired reports.
 * Returns null if no valid (weight > 0) reports exist.
 */
export function aggregateReports(
  reports: OccupancyReport[],
  now?: Date,
): { pct: number; count: number } | null {
  let totalWeightedPct = 0
  let totalWeight = 0
  let count = 0

  for (const report of reports) {
    const w = reportWeight(report, now)
    if (w <= 0) continue
    totalWeightedPct += REPORT_LEVEL_TO_PCT[report.occupancy_level] * w
    totalWeight += w
    count++
  }

  if (count === 0) return null
  return { pct: Math.round(totalWeightedPct / totalWeight), count }
}
