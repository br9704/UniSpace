export const OCCUPANCY_THRESHOLDS = {
  EMPTY: 25,
  QUIET: 50,
  MODERATE: 70,
  BUSY: 85,
} as const

export const OCCUPANCY_COLOURS = {
  empty: '#4CAF7D',
  quiet: '#A8C44E',
  moderate: '#F5A623',
  busy: '#E87040',
  packed: '#E05252',
  none: '#1A3A5C',
} as const

export type OccupancyLevel = keyof typeof OCCUPANCY_COLOURS

export function getOccupancyLevel(pct: number | null): OccupancyLevel {
  if (pct === null) return 'none'
  if (pct <= OCCUPANCY_THRESHOLDS.EMPTY) return 'empty'
  if (pct <= OCCUPANCY_THRESHOLDS.QUIET) return 'quiet'
  if (pct <= OCCUPANCY_THRESHOLDS.MODERATE) return 'moderate'
  if (pct <= OCCUPANCY_THRESHOLDS.BUSY) return 'busy'
  return 'packed'
}

export function getOccupancyLabel(pct: number | null): string {
  const level = getOccupancyLevel(pct)
  const labels: Record<OccupancyLevel, string> = {
    empty: 'Empty', quiet: 'Quiet', moderate: 'Moderate',
    busy: 'Busy', packed: 'Packed', none: 'No data'
  }
  return labels[level]
}

export function getOccupancyColour(pct: number | null): string {
  return OCCUPANCY_COLOURS[getOccupancyLevel(pct)]
}

export const REALTIME_UPDATE_INTERVAL_MS = 10_000
export const STALE_DATA_THRESHOLD_MS = 60_000
export const SESSION_ROTATION_MS = 30 * 60 * 1000  // 30 minutes
export const POSITION_EXPIRY_MS = 30 * 60 * 1000
export const GOOGLE_CACHE_TTL_MS = 30 * 60 * 1000
