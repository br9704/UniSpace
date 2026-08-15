import type { Building } from '@/types'

export interface OpenStatus {
  open: boolean
  closesAt: string | null
  opensAt: string | null
  /**
   * Whether a published source backs this building's hours (migration 021).
   *
   * False for 13 of 18 buildings, whose hours are the invented values seeded in
   * 001/003. `open` is still computed from them so ordering and filtering have
   * something to work with, but **it must never be rendered as a confident
   * OPEN or CLOSED when this is false** — that would state a fabricated number
   * as fact, which is the same defect migration 018 fixed for accessibility.
   */
  verified: boolean
}

const DAY_FIELDS: (keyof Building)[] = [
  'hours_sun', 'hours_mon', 'hours_tue', 'hours_wed',
  'hours_thu', 'hours_fri', 'hours_sat',
]

/** Get today's hours string (e.g. "08:00-22:00") or null if closed. */
export function getTodayHours(building: Building, now?: Date): string | null {
  const day = (now ?? new Date()).getDay() // 0=Sun
  return (building[DAY_FIELDS[day]] as string | null) ?? null
}

/** Format "22:00" → "10 PM", "17:30" → "5:30 PM" */
function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(':').map(Number)
  const period = h >= 12 ? 'PM' : 'AM'
  const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h
  return m === 0 ? `${hour12} ${period}` : `${hour12}:${m.toString().padStart(2, '0')} ${period}`
}

/**
 * How the open state should read on screen.
 *
 * Every surface goes through here so the unverified case cannot be forgotten at
 * one call site — which is how 13 buildings came to advertise a confident
 * "OPEN" derived from a made-up timetable. `[?]` matches the marker
 * `AccessibilityPanel` already uses for the same idea.
 *
 * @param detailed include the closing/opening time, where there is room for it.
 */
export function openStatusLabel(status: OpenStatus, detailed = false): string {
  if (!status.verified) return detailed ? '[?] HOURS NOT VERIFIED' : '[?] HOURS'
  if (!detailed) return status.open ? 'OPEN' : 'CLOSED'
  if (status.open) return `OPEN · CLOSES ${status.closesAt}`
  return status.opensAt ? `CLOSED · OPENS ${status.opensAt}` : 'CLOSED'
}

/** Determine if a building is currently open based on its hours fields. */
export function isOpenNow(building: Building, now?: Date): OpenStatus {
  const d = now ?? new Date()
  const hours = getTodayHours(building, d)
  const verified = building.hours_source !== null && building.hours_source !== undefined

  if (!hours) {
    return { open: false, closesAt: null, opensAt: null, verified }
  }

  const [openStr, closeStr] = hours.split('-')
  if (!openStr || !closeStr) {
    return { open: false, closesAt: null, opensAt: null, verified }
  }

  const [oh, om] = openStr.split(':').map(Number)
  const [ch, cm] = closeStr.split(':').map(Number)
  const currentMinutes = d.getHours() * 60 + d.getMinutes()
  const openMinutes = oh * 60 + om
  const closeMinutes = ch * 60 + cm

  if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
    return { open: true, closesAt: formatTime(closeStr), opensAt: null, verified }
  }

  if (currentMinutes < openMinutes) {
    return { open: false, closesAt: null, opensAt: formatTime(openStr), verified }
  }

  return { open: false, closesAt: null, opensAt: null, verified }
}
