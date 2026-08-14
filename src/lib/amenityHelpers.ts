import type { Building } from '@/types'

interface Amenity {
  label: string
}

/**
 * Amenities we state positively.
 *
 * No icons: SIGNAL uses no emoji, and the previous config carried a set that
 * was never rendered anyway. The label is the whole signal.
 */
const AMENITY_KEYS: { key: keyof Building; label: string }[] = [
  { key: 'has_wifi', label: 'WiFi' },
  { key: 'has_power', label: 'Power' },
  { key: 'has_quiet_zone', label: 'Quiet zone' },
  { key: 'has_group_seating', label: 'Group seating' },
  { key: 'has_food_nearby', label: 'Food nearby' },
]

/**
 * Accessibility is kept separate from the amenity list on purpose.
 *
 * Everything above is a nice-to-have, and its absence costs a user nothing.
 * These are the ones somebody plans a trip around — PRD § 3.4's persona loses
 * ten to fifteen minutes per failed attempt — so they are reported with their
 * verification state rather than folded into a flat list of chips where a
 * missing chip is indistinguishable from an unchecked one.
 */
const ACCESSIBILITY_KEYS: { key: keyof Building; label: string }[] = [
  { key: 'is_ground_floor_accessible', label: 'Step-free entry' },
  { key: 'has_elevator', label: 'Lift' },
  { key: 'has_accessible_bathrooms', label: 'Accessible toilet' },
  { key: 'has_accessible_parking', label: 'Accessible parking' },
]

/** Amenities a building positively has. */
export function getActiveAmenities(building: Building): Amenity[] {
  return AMENITY_KEYS.filter(({ key }) => building[key]).map(({ label }) => ({ label }))
}

export type AccessibilityState = 'yes' | 'no' | 'unverified'

export interface AccessibilityFact {
  label: string
  state: AccessibilityState
}

/**
 * Accessibility facts, each with its verification state.
 *
 * `null` becomes `unverified`, never `no`. Reporting "no lift" when nobody has
 * checked could stop someone going somewhere they could have used, which is a
 * different harm from the more obvious one but a harm all the same.
 */
export function getAccessibilityFacts(building: Building): AccessibilityFact[] {
  return ACCESSIBILITY_KEYS.map(({ key, label }) => {
    const value = building[key]
    return {
      label,
      state: value === null || value === undefined ? 'unverified' : value ? 'yes' : 'no',
    }
  })
}

/** True when nothing about this building's accessibility has been verified. */
export function isAccessibilityUnverified(building: Building): boolean {
  return getAccessibilityFacts(building).every((f) => f.state === 'unverified')
}
