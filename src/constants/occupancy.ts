export const OCCUPANCY_THRESHOLDS = {
  EMPTY: 25,
  QUIET: 50,
  MODERATE: 70,
  BUSY: 85,
} as const

/**
 * The occupancy ramp, as CSS custom property names.
 *
 * Deliberately luminance rather than hue: fuller buildings render lighter and
 * denser, emptier ones recede toward the warm-black ground. SIGNAL permits one
 * accent colour, and MOTION.md forbids the map drawing attention toward
 * busyness — "this app sells quiet, not crowds" — so amber is spent on the
 * recommended result instead of on the fullest building.
 *
 * Shade is never the only signal: `getOccupancyLabel` accompanies it everywhere,
 * which WCAG 2.1 AA requires (no colour-only information).
 *
 * Referenced as tokens rather than hex so the palette lives in exactly one
 * place — see index.css. Mapbox needs literal values, which `resolveCssVar`
 * below reads back from the document.
 */
export const OCCUPANCY_COLOUR_VARS = {
  empty: '--color-occ-empty',
  quiet: '--color-occ-quiet',
  moderate: '--color-occ-moderate',
  busy: '--color-occ-busy',
  packed: '--color-occ-packed',
  none: '--color-occ-none',
} as const

export type OccupancyLevel = keyof typeof OCCUPANCY_COLOUR_VARS

/**
 * Fallbacks for contexts with no document to read from — Mapbox paint
 * expressions built before first paint, and unit tests. Kept in step with
 * index.css by `occupancy.test.ts`.
 */
export const OCCUPANCY_COLOURS: Record<OccupancyLevel, string> = {
  empty: '#94D0B2',
  quiet: '#9DBB3E',
  moderate: '#DA8C0A',
  busy: '#E6622D',
  packed: '#DD4141',
  none: '#E2E8F0',
}

export function getOccupancyLevel(pct: number | null): OccupancyLevel {
  if (pct === null) return 'none'
  if (pct <= OCCUPANCY_THRESHOLDS.EMPTY) return 'empty'
  if (pct <= OCCUPANCY_THRESHOLDS.QUIET) return 'quiet'
  if (pct <= OCCUPANCY_THRESHOLDS.MODERATE) return 'moderate'
  if (pct <= OCCUPANCY_THRESHOLDS.BUSY) return 'busy'
  return 'packed'
}

export function getOccupancyLabel(pct: number | null): string {
  const labels: Record<OccupancyLevel, string> = {
    empty: 'Empty',
    quiet: 'Quiet',
    moderate: 'Moderate',
    busy: 'Busy',
    packed: 'Packed',
    none: 'No data',
  }
  return labels[getOccupancyLevel(pct)]
}

export function getOccupancyColour(pct: number | null): string {
  return OCCUPANCY_COLOURS[getOccupancyLevel(pct)]
}

/** The CSS custom property for a percentage, for use in `var()`. */
export function getOccupancyColourVar(pct: number | null): string {
  return `var(${OCCUPANCY_COLOUR_VARS[getOccupancyLevel(pct)]})`
}

export const REALTIME_UPDATE_INTERVAL_MS = 10_000
export const STALE_DATA_THRESHOLD_MS = 60_000
export const SESSION_ROTATION_MS = 30 * 60 * 1000 // 30 minutes
export const POSITION_EXPIRY_MS = 30 * 60 * 1000
export const GOOGLE_CACHE_TTL_MS = 30 * 60 * 1000
