import type { Building } from '@/types'

export interface OpenStatus {
  open: boolean
  closesAt: string | null
  opensAt: string | null
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

/** Determine if a building is currently open based on its hours fields. */
export function isOpenNow(building: Building, now?: Date): OpenStatus {
  const d = now ?? new Date()
  const hours = getTodayHours(building, d)

  if (!hours) {
    return { open: false, closesAt: null, opensAt: null }
  }

  const [openStr, closeStr] = hours.split('-')
  if (!openStr || !closeStr) {
    return { open: false, closesAt: null, opensAt: null }
  }

  const [oh, om] = openStr.split(':').map(Number)
  const [ch, cm] = closeStr.split(':').map(Number)
  const currentMinutes = d.getHours() * 60 + d.getMinutes()
  const openMinutes = oh * 60 + om
  const closeMinutes = ch * 60 + cm

  if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
    return { open: true, closesAt: formatTime(closeStr), opensAt: null }
  }

  if (currentMinutes < openMinutes) {
    return { open: false, closesAt: null, opensAt: formatTime(openStr) }
  }

  return { open: false, closesAt: null, opensAt: null }
}
