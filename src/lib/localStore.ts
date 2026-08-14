/**
 * Client-side storage.
 *
 * Everything the app remembers about a person — favourites, report throttles —
 * lives here, on their device, and nowhere else. PRD § 13.1: no accounts, no
 * persistent identifiers, nothing server-side. That is a product guarantee, so
 * the storage layer is deliberately small enough to audit at a glance.
 *
 * Keys are prefixed `unispace:`. They were previously `pulse_*`, from the
 * project's earlier name; `readLegacy` migrates those once so nobody silently
 * loses their favourites to a rename.
 */

const PREFIX = 'unispace:'
const LEGACY_PREFIX = 'pulse_'

/** localStorage throws in private mode and when quota is exhausted. */
function safeGet(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function safeSet(key: string, value: string): void {
  try {
    localStorage.setItem(key, value)
  } catch {
    // Storage unavailable. Favourites are a convenience, not a correctness
    // requirement — losing them is preferable to breaking the page.
  }
}

function safeRemove(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch {
    // As above.
  }
}

/** Read a JSON value, migrating from the legacy key name if needed. */
export function readJson<T>(key: string, fallback: T): T {
  const raw = safeGet(PREFIX + key) ?? migrate(key)
  if (raw === null) return fallback
  try {
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function writeJson(key: string, value: unknown): void {
  safeSet(PREFIX + key, JSON.stringify(value))
}

/** Move a value from the old `pulse_` key to the new one, once. */
function migrate(key: string): string | null {
  const legacy = safeGet(LEGACY_PREFIX + key)
  if (legacy === null) return null
  safeSet(PREFIX + key, legacy)
  safeRemove(LEGACY_PREFIX + key)
  return legacy
}

export const FAVOURITES_KEY = 'favourites'

/** Add or remove a building, returning the new list. Pure. */
export function toggleFavourite(current: string[], buildingId: string): string[] {
  return current.includes(buildingId)
    ? current.filter((id) => id !== buildingId)
    : [...current, buildingId]
}

export function readFavourites(): string[] {
  const value = readJson<unknown>(FAVOURITES_KEY, [])
  // Guard the shape: this is user-editable storage, and a malformed value must
  // not be able to crash the home screen.
  if (!Array.isArray(value)) return []
  return value.filter((id): id is string => typeof id === 'string')
}

export function writeFavourites(ids: string[]): void {
  writeJson(FAVOURITES_KEY, ids)
}

/** Report throttle: one report per building per window. */
export function reportThrottleKey(buildingId: string): string {
  return `report:${buildingId}`
}

/**
 * Whether enough time has passed to report on this building again.
 *
 * @param now - Injectable for testing.
 */
export function canReportAgain(buildingId: string, windowMs: number, now = Date.now()): boolean {
  const last = readJson<number | null>(reportThrottleKey(buildingId), null)
  if (typeof last !== 'number') return true
  return now - last >= windowMs
}

export function markReported(buildingId: string, now = Date.now()): void {
  writeJson(reportThrottleKey(buildingId), now)
}
