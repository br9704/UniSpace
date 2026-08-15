import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { SEED_BUILDINGS } from './seedData.generated'

const ROOT = resolve(__dirname, '../../..')
const MIGRATION_021 = resolve(ROOT, 'supabase/migrations/021_hours_source.sql')
const SEED_008 = resolve(ROOT, 'supabase/seed/008_verified_hours_source.sql')

/**
 * The five buildings whose hours came from a published page (migration 017).
 * Two of them are a library; three contain one and take the library's hours,
 * because "can I study there right now" is the question this app answers.
 */
const SOURCED = [
  'baillieu-library',
  'erc-library',
  'law-school',
  'fbe-building',
  'melbourne-school-of-design',
]

const HOURS_SOURCE_URL = 'https://library.unimelb.edu.au/library-locations-and-opening-hours'

/**
 * PRD § 13.4's rule, applied to opening hours.
 *
 * `isOpenNow()` renders a flat OPEN or CLOSED, which is a two-state model over a
 * three-state fact: 5 buildings have published hours, 13 carry the values
 * invented in seeds 001 and 003. Migration 021 adds the third state as
 * something a client can actually query — NULL `hours_source` means nobody has
 * checked — and these tests keep it honest in both directions, the same way
 * `amenityHelpers.test.ts` does for the accessibility flags.
 */
describe('seeded hours provenance', () => {
  it('claims a source for exactly the five buildings that have one', () => {
    for (const b of SEED_BUILDINGS) {
      const expected = SOURCED.includes(b.slug) ? HOURS_SOURCE_URL : null
      expect(b.hours_source, `${b.slug} hours source`).toBe(expected)
    }
  })

  it('leaves hours_source null rather than absent for the unverified 13', () => {
    // `undefined` reads to the UI as "column missing", which is a bug report.
    // `null` reads as "nobody has checked", which is the deliberate statement.
    // The fixture layer has confused those two before.
    for (const b of SEED_BUILDINGS) {
      expect(b.hours_source, `${b.slug}`).not.toBeUndefined()
      expect(b.hours_verified_on, `${b.slug}`).not.toBeUndefined()
      expect(b.hours_period, `${b.slug}`).not.toBeUndefined()
    }
    expect(SEED_BUILDINGS.filter((b) => b.hours_source === null)).toHaveLength(13)
  })

  it('never records provenance for hours that have no source', () => {
    // The mirror of "no accessibility flag may read false without a source": a
    // verification date or a validity period without a URL is provenance
    // theatre. The database enforces this too, via the CHECK constraint added
    // in 021 — this test is the same rule where a reviewer can see it.
    for (const b of SEED_BUILDINGS) {
      if (b.hours_source !== null) continue
      expect(b.hours_verified_on, `${b.slug} dated unsourced hours`).toBeNull()
      expect(b.hours_period, `${b.slug} scoped unsourced hours`).toBeNull()
    }
  })

  it('gives every sourced building a real URL, a date and a stated period', () => {
    for (const slug of SOURCED) {
      const b = SEED_BUILDINGS.find((x) => x.slug === slug)!
      expect(b.hours_source, `${slug}`).toMatch(/^https:\/\/\S+unimelb\.edu\.au\//)
      expect(b.hours_verified_on, `${slug}`).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(b.hours_period!.length, `${slug}`).toBeGreaterThan(20)
    }
  })

  it('states in hours_period what the hours are NOT known to cover', () => {
    // The source is a current-week table, not a year-round one. A period that
    // only said when the hours DO hold would read as a guarantee for the rest
    // of the year by omission.
    const period = SEED_BUILDINGS.find((b) => b.slug === 'baillieu-library')!.hours_period!
    expect(period).toMatch(/not known to hold/i)
    expect(period).toMatch(/examinations/i)
  })

  it('backs the CHECK constraint with the schema, not just with a comment', () => {
    // Migration 020 recorded all of this in COMMENT ON COLUMN, which no client
    // can read. That is why 021 exists; this pins that it stayed structural.
    const sql = readFileSync(MIGRATION_021, 'utf8')
    for (const column of ['hours_source', 'hours_verified_on', 'hours_period']) {
      expect(sql).toMatch(new RegExp(`ADD COLUMN IF NOT EXISTS ${column}\\b`))
    }
    expect(sql).toMatch(/ADD CONSTRAINT hours_provenance_needs_a_source CHECK/)
    expect(sql).toMatch(/hours_source IS NOT NULL\s*\n?\s*OR \(hours_verified_on IS NULL AND hours_period IS NULL\)/)
  })

  it('cites its source and retrieval date in the seed itself', () => {
    const sql = readFileSync(SEED_008, 'utf8')
    expect(sql).toContain(HOURS_SOURCE_URL)
    expect(sql).toMatch(/RETRIEVED:\s*2026-08-15/)
    // The 2026 key-dates page is what turns "this week" into a named period.
    expect(sql).toContain('students.unimelb.edu.au/your-course/manage-your-course/key-dates')
  })
})
