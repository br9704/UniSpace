import { describe, it, expect } from 'vitest'
import {
  getAccessibilityFacts,
  getActiveAmenities,
  isAccessibilityUnverified,
} from './amenityHelpers'
import { SEED_BUILDINGS } from './fixtures/seedData.generated'
import type { Building } from '@/types'

function building(overrides: Partial<Building> = {}): Building {
  return { ...SEED_BUILDINGS[0], ...overrides }
}

/**
 * PRD § 13.4: "Accessibility data accuracy: Incorrect data is harmful."
 *
 * These tests exist because every accessibility flag in this project was
 * originally invented, and the schema could only express "yes" or "no" — so the
 * true answer for most buildings, "nobody has checked", was unrepresentable and
 * silently rendered as one of the two claims.
 */
describe('accessibility facts', () => {
  it('reports an unset flag as unverified, never as no', () => {
    // The load-bearing assertion. "No lift" could stop someone going somewhere
    // they could have used; "not checked" tells them to ring ahead.
    const facts = getAccessibilityFacts(building({ has_elevator: null }))
    expect(facts.find((f) => f.label === 'Lift')!.state).toBe('unverified')
  })

  it('distinguishes all three states', () => {
    const facts = getAccessibilityFacts(building({
      has_elevator: true,
      has_accessible_bathrooms: false,
      is_ground_floor_accessible: null,
    }))
    expect(facts.find((f) => f.label === 'Lift')!.state).toBe('yes')
    expect(facts.find((f) => f.label === 'Accessible toilet')!.state).toBe('no')
    expect(facts.find((f) => f.label === 'Step-free entry')!.state).toBe('unverified')
  })

  it('always reports every accessibility dimension', () => {
    // Omitting a row would read as "not applicable" rather than "unknown".
    const facts = getAccessibilityFacts(building({
      has_elevator: null,
      has_accessible_bathrooms: null,
      is_ground_floor_accessible: null,
      has_accessible_parking: null,
    }))
    expect(facts).toHaveLength(4)
    expect(facts.every((f) => f.state === 'unverified')).toBe(true)
  })

  it('keeps accessibility out of the amenity chip list', () => {
    // Amenities render only when true, so an absent chip is ambiguous. That is
    // fine for "food nearby" and unacceptable for "step-free entry".
    const labels = getActiveAmenities(building({
      has_elevator: true,
      is_ground_floor_accessible: true,
    })).map((a) => a.label)

    expect(labels).not.toContain('Lift')
    expect(labels).not.toContain('Step-free entry')
  })

  it('flags a building with nothing verified', () => {
    expect(isAccessibilityUnverified(building({
      has_elevator: null,
      has_accessible_bathrooms: null,
      is_ground_floor_accessible: null,
      has_accessible_parking: null,
    }))).toBe(true)

    expect(isAccessibilityUnverified(building({ has_elevator: true }))).toBe(false)
  })
})

describe('seeded accessibility data', () => {
  const LIBRARIES = [
    'baillieu-library', 'erc-library', 'law-school',
    'fbe-building', 'melbourne-school-of-design',
  ]

  it('claims a lift and accessible toilet only for the library buildings', () => {
    // The single unambiguous statement in UoM's guide: "All libraries are
    // accessible with lifts and an accessible toilet." Everything else in that
    // source is hedged with "most" or "some", which is not a fact about any
    // particular building.
    for (const b of SEED_BUILDINGS) {
      const expected = LIBRARIES.includes(b.slug) ? true : null
      expect(b.has_elevator, `${b.slug} lift`).toBe(expected)
      expect(b.has_accessible_bathrooms, `${b.slug} accessible toilet`).toBe(expected)
    }
  })

  it('claims step-free entry for nothing', () => {
    // A lift inside says nothing about getting in, and the source warns the
    // accessible entrance is sometimes elsewhere than the main door.
    for (const b of SEED_BUILDINGS) {
      expect(b.is_ground_floor_accessible, `${b.slug} step-free entry`).toBeNull()
    }
  })

  it('claims accessible parking for nothing', () => {
    for (const b of SEED_BUILDINGS) {
      expect(b.has_accessible_parking, `${b.slug} accessible parking`).toBeNull()
    }
  })

  it('never states an accessibility flag as false', () => {
    // `false` asserts absence, which needs a source just as much as `true`
    // does. Nothing here has one, so nothing should say it.
    for (const b of SEED_BUILDINGS) {
      for (const fact of getAccessibilityFacts(b)) {
        expect(fact.state, `${b.slug} — ${fact.label}`).not.toBe('no')
      }
    }
  })
})
