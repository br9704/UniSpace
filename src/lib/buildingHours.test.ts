import { describe, expect, it } from 'vitest'
import { isOpenNow, getTodayHours, openStatusLabel } from './buildingHours'
import type { Building } from '@/types'

function makeBuilding(hours: Partial<Record<string, string | null>> = {}): Building {
  return {
    id: 'b-1', campus_id: 'c-1', slug: 'test', name: 'Test', short_name: 'T',
    estimated_capacity: 100, entrance_lat: 0, entrance_lng: 0,
    centroid_lat: 0, centroid_lng: 0, polygon: null, google_place_id: null,
    has_wifi: true, has_power: false, has_food_nearby: false, has_quiet_zone: false,
    has_group_seating: false, is_ground_floor_accessible: false, has_elevator: false,
    has_accessible_bathrooms: false, has_accessible_parking: false,
    hours_mon: hours.hours_mon ?? '08:00-22:00',
    hours_tue: hours.hours_tue ?? '08:00-22:00',
    hours_wed: hours.hours_wed ?? '08:00-22:00',
    hours_thu: hours.hours_thu ?? '08:00-22:00',
    hours_fri: hours.hours_fri ?? '08:00-18:00',
    hours_sat: hours.hours_sat ?? '10:00-17:00',
    hours_sun: hours.hours_sun ?? null,
    // NULL = these hours have no published source (migration 021), which is the
    // default because it is true for 13 of the 18 seeded buildings. Tests that
    // care about the verified case override it explicitly.
    hours_source: null, hours_verified_on: null, hours_period: null,
    created_at: '', updated_at: '',
  }
}

describe('getTodayHours', () => {
  it('returns correct hours for Monday', () => {
    const b = makeBuilding()
    const mon = new Date('2026-03-16T10:00:00') // Monday
    expect(getTodayHours(b, mon)).toBe('08:00-22:00')
  })

  it('returns null for Sunday when closed', () => {
    const b = makeBuilding()
    const sun = new Date('2026-03-22T10:00:00') // Sunday
    expect(getTodayHours(b, sun)).toBeNull()
  })
})

describe('isOpenNow', () => {
  it('returns open during hours', () => {
    const b = makeBuilding()
    const mon10am = new Date('2026-03-16T10:00:00')
    const result = isOpenNow(b, mon10am)
    expect(result.open).toBe(true)
    expect(result.closesAt).toBe('10 PM')
  })

  it('returns closed after hours', () => {
    const b = makeBuilding()
    const mon11pm = new Date('2026-03-16T23:00:00')
    const result = isOpenNow(b, mon11pm)
    expect(result.open).toBe(false)
  })

  it('returns closed before opening with opensAt', () => {
    const b = makeBuilding()
    const mon7am = new Date('2026-03-16T07:00:00')
    const result = isOpenNow(b, mon7am)
    expect(result.open).toBe(false)
    expect(result.opensAt).toBe('8 AM')
  })

  it('returns closed for null hours (Sunday)', () => {
    const b = makeBuilding()
    const sun = new Date('2026-03-22T12:00:00')
    expect(isOpenNow(b, sun).open).toBe(false)
  })

  it('formats afternoon closing time correctly', () => {
    const b = makeBuilding({ hours_fri: '08:00-17:30' })
    const fri2pm = new Date('2026-03-20T14:00:00') // Friday
    const result = isOpenNow(b, fri2pm)
    expect(result.open).toBe(true)
    expect(result.closesAt).toBe('5:30 PM')
  })
})

describe('hours provenance', () => {
  const SOURCE = 'https://library.unimelb.edu.au/library-locations-and-opening-hours'
  const sourced = (): Building => ({ ...makeBuilding(), hours_source: SOURCE })
  const monMorning = new Date('2026-03-16T10:00:00') // Monday, inside 08:00-22:00
  const monNight = new Date('2026-03-16T23:00:00')   // Monday, after close

  it('reports hours as unverified when no source backs them', () => {
    expect(isOpenNow(makeBuilding(), monMorning).verified).toBe(false)
  })

  it('reports hours as verified when a source backs them', () => {
    expect(isOpenNow(sourced(), monMorning).verified).toBe(true)
  })

  // The whole point of the three-state model: an unverified building must not
  // read as OPEN or as CLOSED, because both are claims the data cannot support.
  it('never labels an unverified building OPEN or CLOSED', () => {
    for (const now of [monMorning, monNight]) {
      for (const detailed of [false, true]) {
        const label = openStatusLabel(isOpenNow(makeBuilding(), now), detailed)
        // The label must name the uncertainty. Pinned on the word rather than
        // on SIGNAL's '[?]' glyph, so a copy change cannot quietly turn an
        // unverified building back into a confident one.
        expect(label.toLowerCase()).toContain('verified')
        expect(label).not.toMatch(/\bOPEN\b/)
        expect(label).not.toMatch(/\bCLOSED\b/)
      }
    }
  })

  it('still labels a verified building OPEN or CLOSED', () => {
    expect(openStatusLabel(isOpenNow(sourced(), monMorning))).toBe('OPEN')
    expect(openStatusLabel(isOpenNow(sourced(), monNight))).toBe('CLOSED')
  })

  it('includes the closing time when detailed and open', () => {
    expect(openStatusLabel(isOpenNow(sourced(), monMorning), true)).toBe('OPEN · CLOSES 10 PM')
  })

  // `open` is still computed for unverified buildings so ordering and filtering
  // have something to work with — it just must never be rendered as fact.
  it('still computes open for unverified buildings, for internal use', () => {
    expect(isOpenNow(makeBuilding(), monMorning).open).toBe(true)
  })
})
