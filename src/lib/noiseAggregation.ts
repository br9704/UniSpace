import type { OccupancyReport } from '@/types'
import { reportWeight } from '@/lib/reportDecay'

const MIN_NOISE_REPORTS = 3

export interface NoiseAggregation {
  level: number
  count: number
}

/**
 * Weighted average of noise levels from non-expired reports.
 * Returns null if fewer than 3 reports have noise data (insufficient signal).
 */
export function aggregateNoise(
  reports: OccupancyReport[],
  now?: Date,
): NoiseAggregation | null {
  let totalWeighted = 0
  let totalWeight = 0
  let count = 0

  for (const report of reports) {
    if (report.noise_level === null) continue
    const w = reportWeight(report, now)
    if (w <= 0) continue
    totalWeighted += report.noise_level * w
    totalWeight += w
    count++
  }

  if (count < MIN_NOISE_REPORTS) return null
  return { level: Math.round((totalWeighted / totalWeight) * 10) / 10, count }
}
