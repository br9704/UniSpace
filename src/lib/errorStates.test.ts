import { describe, it, expect } from 'vitest'
import { readFileSync, globSync } from 'node:fs'
import { resolve } from 'node:path'

/**
 * S23: every failure must produce a screen that explains itself.
 *
 * The worst outcome for this app is a blank page. Someone deciding whether to
 * walk fifteen minutes to a library cannot tell "the app broke" apart from
 * "there is nothing here", and the second answer is actively harmful. These
 * tests check the structural guarantees that prevent it.
 */

const ROOT = resolve(__dirname, '../..')
const SRC = resolve(ROOT, 'src')

const FILES = globSync('**/*.{ts,tsx}', { cwd: SRC })
  .filter((f) => !f.includes('.test.') && !f.includes('generated'))
  .map((f) => ({ path: f, code: readFileSync(resolve(SRC, f), 'utf8') }))

const find = (name: string) => FILES.find(({ path }) => path.endsWith(name))!

describe('error states', () => {
  it('wraps the routes in an error boundary', () => {
    expect(find('App.tsx').code).toMatch(/<ErrorBoundary/)
  })

  it('falls back to the building list when the map fails', () => {
    // PRD § 6.1. Mapbox is the likeliest thing to fail here — expired token,
    // blocked CDN, exhausted quota — and none of that touches the occupancy
    // data, so the answer is still available as a list.
    const mapSurface = find('MapSurface.tsx').code
    expect(mapSurface).toMatch(/ErrorBoundary/)
    expect(mapSurface).toMatch(/BuildingListFallback/)
  })

  it('gives every error surface an alert role', () => {
    // Screen readers must be told, not left on a silently changed page.
    for (const name of ['ErrorBoundary.tsx', 'LoadFailure.tsx', 'ConfigError.tsx', 'BuildingListFallback.tsx']) {
      expect(find(name).code, `${name} has no role="alert"`).toMatch(/role="alert"/)
    }
  })

  it('offers a way forward from every dead end', () => {
    // An error with no action is a wall. Each of these gives the user
    // something to do — retry, or continue without the failed part.
    for (const name of ['ErrorBoundary.tsx', 'LoadFailure.tsx', 'LocationPrompt.tsx']) {
      expect(find(name).code, `${name} offers no action`).toMatch(/<button/)
    }
  })

  it('never blocks the app on location permission', () => {
    // PRD § 12.7: browsing without GPS is a first-class path. The prompt is
    // dismissible and explains, rather than gating.
    const prompt = find('LocationPrompt.tsx').code
    // Case-insensitive: the invariant is that the escape hatch exists and is
    // labelled for what it does, not that the label is shouted. It was pinned
    // to the literal 'BROWSE WITHOUT LOCATION' and broke the moment SIGNAL's
    // all-caps copy was rewritten in sentence case — a copy edit failing a
    // behavioural test tells you the test was checking the wrong thing.
    expect(prompt).toMatch(/browse without location/i)
    expect(prompt).toMatch(/dismissed/)
  })

  it('logs errors to the console and nowhere else', () => {
    // PRD § 13.1 rule 6: no third-party error tracking. privacy.test.ts covers
    // the SDKs; this covers the boundary that would be the natural place to
    // wire one in.
    const boundary = find('ErrorBoundary.tsx').code
    expect(boundary).toMatch(/console\.error/)
    expect(boundary).not.toMatch(/fetch\(|navigator\.sendBeacon|captureException/)
  })

  it('retries only failures that could plausibly succeed on a retry', () => {
    // Retrying a 400 or a permissions error just delays the message the user
    // needs. Only transient network conditions are worth a second attempt.
    const dataSource = find('dataSource.ts').code
    expect(dataSource).toMatch(/isTransient/)
    expect(dataSource).toMatch(/RETRY_DELAYS_MS/)
  })

  it('returns no rows rather than partial rows when a page fails', () => {
    // A half-loaded occupancy map reads as "these buildings are empty", which
    // is exactly the wrong thing to tell someone.
    expect(find('dataSource.ts').code).toMatch(/return \{ data: \[\], error: error\.message \}/)
  })
})
