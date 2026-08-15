import { describe, expect, it } from 'vitest'
import { BUILDING_META } from './buildingMeta'

/**
 * Guards on descriptive copy.
 *
 * This file is prose, so nothing about it type-checks and nothing about it
 * fails a build. It had accumulated invented precision ("500+ study seats",
 * "2,800+ power outlets", "25,851 sqm"), opinions rendered as facts ("best
 * value on campus"), an unsourced wheelchair-access claim sitting above an
 * accessibility panel that reads "not verified" for the same building, and a
 * card-access window presented as opening hours.
 *
 * Each of those is cheap to reintroduce and invisible once it is in, so they
 * are checked rather than merely asked for in a comment.
 */

/** Fields that are free prose. Addresses and food listings hold street numbers. */
const PROSE = Object.entries(BUILDING_META).flatMap(([slug, meta]) => [
  { slug, field: 'description', text: meta.description },
  { slug, field: 'capacityNote', text: meta.capacityNote },
  ...meta.tips.map((text, i) => ({ slug, field: `tips[${i}]`, text })),
])

const ALL_TEXT = Object.entries(BUILDING_META).flatMap(([slug, meta]) => [
  ...PROSE.filter((p) => p.slug === slug),
  { slug, field: 'address', text: meta.address },
  ...meta.nearbyFood.map((text, i) => ({ slug, field: `nearbyFood[${i}]`, text })),
])

function offenders(entries: typeof PROSE, pattern: RegExp) {
  return entries
    .filter(({ text }) => pattern.test(text))
    .map(({ slug, field, text }) => `${slug}.${field}: "${text}"`)
}

describe('building metadata copy', () => {
  it('states no quantity it cannot source', () => {
    // "500+", "2,800", "25,851". Level numbers and room codes are fine — they
    // are locations, not measurements — so only these two shapes are caught.
    expect(offenders(PROSE, /\d[\d,]*\+|\d{1,3},\d{3}/)).toEqual([])
  })

  it('states no opinion as fact', () => {
    // "the most", not every "most" — "power at most seats" is a hedge, and a
    // hedge is the opposite of the problem being guarded against.
    const superlatives = /\b(the (most|best)|one of the \w+|best[- ](value|views?)|oldest|largest|finest|award[- ]winning|world[- ]leading|iconic|state[- ]of[- ]the[- ]art)\b/i
    expect(offenders(PROSE, superlatives)).toEqual([])
  })

  // Accessibility has a three-state data model and a panel wired to it that can
  // say "nobody has checked". A sentence here saying otherwise overrides that
  // with something nobody verified. PRD § 13.4 treats this as harmful rather
  // than merely inaccurate.
  it('makes no accessibility claim', () => {
    expect(offenders(ALL_TEXT, /wheelchair|step[- ]free|accessible entrance|disabled (access|parking)/i))
      .toEqual([])
  })

  // Hours have a provenance model (migration 021) and a source for 5 of 18
  // buildings. A time mentioned in passing here bypasses all of it — and the
  // one that used to be here, "open 7am-1am", was a card-access window, exactly
  // the kind of figure migration 020 records as unusable.
  it('quotes no opening hours', () => {
    expect(offenders(ALL_TEXT, /\d\s?(am|pm)\b|\d{1,2}:\d{2}/i)).toEqual([])
  })

  it('marks walking times as approximate', () => {
    const unmarked = ALL_TEXT
      .filter(({ text }) => /\d+\s*min/i.test(text) && !/~\s*\d+\s*min/i.test(text))
      .map(({ slug, field, text }) => `${slug}.${field}: "${text}"`)
    expect(unmarked).toEqual([])
  })

  it('gives every building the full set of fields', () => {
    for (const [slug, meta] of Object.entries(BUILDING_META)) {
      expect(meta.description.length, `${slug} has no description`).toBeGreaterThan(0)
      expect(meta.address.length, `${slug} has no address`).toBeGreaterThan(0)
      expect(meta.tips.length, `${slug} has no tips`).toBeGreaterThan(0)
      expect(meta.capacityNote.length, `${slug} has no capacityNote`).toBeGreaterThan(0)
    }
  })
})
