import type {
  GooglePopularTime,
  HourlyPrediction,
  OccupancyPrediction,
} from '@/types'

/** Build a 24-hour prediction curve for a building on a given day.
 *  Tries occupancy_predictions first, falls back to google_popular_times. */
export function getDayPredictions(
  predictionRows: OccupancyPrediction[],
  typicalRows: GooglePopularTime[],
  buildingId: string,
  dayOfWeek: number,
): HourlyPrediction[] {
  // Try prediction rows first
  const preds = predictionRows.filter(
    (r) => r.building_id === buildingId && r.day_of_week === dayOfWeek,
  )

  if (preds.length > 0) {
    const byHour = new Map(preds.map((r) => [r.hour_of_day, r]))
    return Array.from({ length: 24 }, (_, hour) => {
      const row = byHour.get(hour)
      return {
        hour,
        pct: row?.predicted_pct ?? 0,
        source: row?.data_source ?? 'google',
        confidence: row?.confidence ?? 'google-estimated',
      }
    })
  }

  // Fallback to Google typical
  const typical = typicalRows.filter(
    (r) => r.building_id === buildingId && r.day_of_week === dayOfWeek,
  )

  if (typical.length > 0) {
    const byHour = new Map(typical.map((r) => [r.hour_of_day, r]))
    return Array.from({ length: 24 }, (_, hour) => ({
      hour,
      pct: byHour.get(hour)?.typical_popularity ?? 0,
      source: 'google' as const,
      confidence: 'google-estimated' as const,
    }))
  }

  return []
}

/** Find the hour with the highest predicted occupancy. */
export function getPeakHour(
  predictions: HourlyPrediction[],
): { hour: number; pct: number } | null {
  const withData = predictions.filter((p) => p.pct > 0)
  if (withData.length === 0) return null

  const peak = withData.reduce((best, curr) =>
    curr.pct > best.pct ? curr : best,
  )
  return { hour: peak.hour, pct: peak.pct }
}

/** Find the quietest remaining hour today (up to 9 PM). */
export function getBestTimeToGo(
  predictions: HourlyPrediction[],
  currentHour: number,
): { hour: number; pct: number } | null {
  const remaining = predictions.filter(
    (p) => p.hour > currentHour && p.hour <= 21 && p.pct > 0,
  )
  if (remaining.length === 0) return null

  const best = remaining.reduce((min, curr) =>
    curr.pct < min.pct ? curr : min,
  )
  return { hour: best.hour, pct: best.pct }
}

/** Find a contiguous block of busy hours (≥70%) after current hour. */
export function getAvoidWindow(
  predictions: HourlyPrediction[],
  currentHour: number,
): { start: number; end: number; pct: number } | null {
  const future = predictions
    .filter((p) => p.hour > currentHour)
    .sort((a, b) => a.hour - b.hour)

  let bestStart = -1
  let bestEnd = -1
  let bestLen = 0
  let runStart = -1
  let runLen = 0

  for (const p of future) {
    if (p.pct >= 70) {
      if (runStart === -1) runStart = p.hour
      runLen++
      if (runLen > bestLen) {
        bestStart = runStart
        bestEnd = p.hour
        bestLen = runLen
      }
    } else {
      runStart = -1
      runLen = 0
    }
  }

  if (bestLen === 0) return null

  // Average pct across the window
  const windowPcts = predictions.filter(
    (p) => p.hour >= bestStart && p.hour <= bestEnd,
  )
  const avgPct = Math.round(
    windowPcts.reduce((sum, p) => sum + p.pct, 0) / windowPcts.length,
  )

  return { start: bestStart, end: bestEnd, pct: avgPct }
}

/** Get sparkline data for the last 6 hours. */
export function getSparklineData(
  predictions: HourlyPrediction[],
  currentHour: number,
): { hour: number; pct: number }[] {
  const startHour = Math.max(0, currentHour - 5)
  return predictions
    .filter((p) => p.hour >= startHour && p.hour <= currentHour)
    .sort((a, b) => a.hour - b.hour)
    .map((p) => ({ hour: p.hour, pct: p.pct }))
}

/** Format an hour number to display string. */
export function formatHour(hour: number): string {
  if (hour === 0 || hour === 24) return '12 AM'
  if (hour === 12) return '12 PM'
  if (hour < 12) return `${hour} AM`
  return `${hour - 12} PM`
}
