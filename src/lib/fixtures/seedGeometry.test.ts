import { describe, expect, it } from 'vitest'
import { SEED_BUILDINGS } from './seedData.generated'

/**
 * Building geometry, pinned.
 *
 * Every building on the map was a four-cornered slab, because the fixture
 * generator silently skipped migrations 010 and 011 — both use
 * `WHERE id = '...'`, a form the SQL parser had no helper for — and because
 * even 011's shapes were hand-simplified to 4-7 points. Migration 022 replaces
 * them with the real OpenStreetMap ways.
 *
 * These tests exist so a parser change or a lost migration registration cannot
 * quietly flatten the campus again. That failure was invisible for months: the
 * build passed, the types checked, and the map just looked wrong.
 */

/** Identified in OSM by name and carrying a real footprint (migration 022). */
const WITH_FOOTPRINTS = [
  'baillieu-library', 'erc-library', 'arts-west', 'law-school', 'fbe-building',
  'the-spot', 'melbourne-school-of-design', 'old-arts', 'redmond-barry',
  'john-medley', 'chemistry-building', 'peter-hall', 'alan-gilbert',
  'student-pavilion', 'david-caro',
]

/**
 * Not identifiable in OSM, so deliberately left as rectangles.
 *
 * Listed explicitly rather than merely excluded: if one of these ever gains a
 * real footprint, this list must be updated consciously, and if a building
 * silently *drops* to a rectangle it fails the test above instead of joining
 * this list by accident.
 */
const UNIDENTIFIED = ['engineering-1', 'ict-building', 'kwong-lee-dow']

describe('building footprints', () => {
  it('covers every seeded building between the two lists', () => {
    expect([...WITH_FOOTPRINTS, ...UNIDENTIFIED].sort())
      .toEqual(SEED_BUILDINGS.map((b) => b.slug).sort())
  })

  describe.each(WITH_FOOTPRINTS)('%s', (slug) => {
    const building = () => SEED_BUILDINGS.find((b) => b.slug === slug)!

    // Seven is the ceiling migration 011's hand-simplified quads reached. A
    // real footprint clears it comfortably; anything at or below it means the
    // simplified geometry has come back.
    it('has a real footprint, not a simplified quad', () => {
      const ring = building().polygon!.coordinates[0]
      expect(ring.length - 1).toBeGreaterThan(7)
    })

    it('is a closed ring', () => {
      const ring = building().polygon!.coordinates[0]
      expect(ring[0]).toEqual(ring[ring.length - 1])
    })

    // Migration 022 derives the centroid from the geometry instead of asserting
    // it alongside. Melbourne School of Design was seeded 428 m from the
    // building it occupies, which is how a building ends up drawn on the map
    // nowhere near where it stands.
    it('has a centroid inside its own footprint bounds', () => {
      const b = building()
      const ring = b.polygon!.coordinates[0]
      const lngs = ring.map((p) => p[0])
      const lats = ring.map((p) => p[1])

      expect(b.centroid_lng!).toBeGreaterThanOrEqual(Math.min(...lngs))
      expect(b.centroid_lng!).toBeLessThanOrEqual(Math.max(...lngs))
      expect(b.centroid_lat!).toBeGreaterThanOrEqual(Math.min(...lats))
      expect(b.centroid_lat!).toBeLessThanOrEqual(Math.max(...lats))
    })
  })

  it('leaves unidentified buildings alone rather than guessing', () => {
    for (const slug of UNIDENTIFIED) {
      const ring = SEED_BUILDINGS.find((b) => b.slug === slug)!.polygon!.coordinates[0]
      expect(ring.length - 1).toBeLessThanOrEqual(7)
    }
  })

  // A generous precinct box, not a tight campus one. Kwong Lee Dow sits on
  // Leicester Street in Carlton, south of the main campus, so a box drawn
  // around Parkville alone would fail on correct data. This is here to catch
  // a building landing in the wrong suburb, which is the failure mode that
  // actually occurred — not to assert precision the source cannot support.
  it('places every building inside the campus precinct', () => {
    for (const b of SEED_BUILDINGS) {
      expect(b.centroid_lat!).toBeGreaterThan(-37.807)
      expect(b.centroid_lat!).toBeLessThan(-37.790)
      expect(b.centroid_lng!).toBeGreaterThan(144.953)
      expect(b.centroid_lng!).toBeLessThan(144.970)
    }
  })
})
