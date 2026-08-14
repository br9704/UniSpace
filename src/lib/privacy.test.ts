import { describe, it, expect } from 'vitest'
import { readFileSync, globSync } from 'node:fs'
import { resolve } from 'node:path'

/**
 * Executable guard for the product's central promise.
 *
 * "GPS never leaves your device" is the one-line pitch, and PRD § 13 makes the
 * supporting rules non-negotiable: no raw coordinates transmitted, no
 * `session_id` written to any table, no third-party analytics. Those invariants
 * are currently held by convention and code review — this file makes breaking
 * them fail the build instead.
 *
 * It is deliberately coarse. It cannot prove the app is private; it can prove
 * nobody has casually reintroduced the specific mistakes that would make it not.
 */

const ROOT = resolve(__dirname, '../..')
const SRC = resolve(ROOT, 'src')

function read(dir: string, pattern: string) {
  return globSync(pattern, { cwd: dir })
    .map((f) => ({ path: resolve(dir, f), code: readFileSync(resolve(dir, f), 'utf8') }))
}

const CLIENT = read(SRC, '**/*.{ts,tsx}').filter(({ path }) => !path.includes('.test.'))
const FUNCTIONS = read(resolve(ROOT, 'supabase/functions'), '**/*.ts')

const rel = (path: string) => path.replace(ROOT + '/', '')

describe('privacy invariants', () => {
  it('never persists the session id', () => {
    // PRD § 13.1: session_id rotates every 30 minutes and is never written
    // anywhere. Persisting it would turn a deliberately ephemeral token into
    // exactly the stable identifier this design exists to avoid.
    const offenders = CLIENT.filter(({ path, code }) => {
      if (path.endsWith('sessionId.ts')) return false
      return /(localStorage|sessionStorage|indexedDB)[\s\S]{0,80}session/i.test(code)
    })
    expect(offenders.map((o) => rel(o.path))).toEqual([])
  })

  it('keeps the session id out of every database write in the Edge Functions', () => {
    // It may be counted in memory; it may never be stored. This is the
    // invariant aggregate-occupancy exists to uphold.
    const offenders: string[] = []
    for (const { path, code } of FUNCTIONS) {
      for (const match of code.matchAll(/\.(insert|upsert|update)\(([\s\S]{0,400}?)\)/g)) {
        if (/session_id/.test(match[2])) offenders.push(rel(path))
      }
    }
    expect(offenders).toEqual([])
  })

  it('broadcasts no raw coordinates', () => {
    // Zone detection is the privacy firewall: coordinates go in, a zone id
    // comes out, and only the zone id is ever sent. A latitude appearing in a
    // request body would defeat the entire design.
    const offenders: string[] = []
    for (const { path, code } of CLIENT) {
      for (const match of code.matchAll(/body:\s*\{([\s\S]{0,300}?)\}/g)) {
        if (/\b(latitude|longitude|coords|lat|lng)\b/.test(match[1])) offenders.push(rel(path))
      }
    }
    expect(offenders).toEqual([])
  })

  it('ships no third-party analytics', () => {
    // CLAUDE.md § 4 rule 5 and PRD § 13.1 rule 6. Listed explicitly because
    // these arrive as innocuous-looking one-line additions.
    // Matched as imports, script URLs or global calls rather than as bare
    // words — "amplitude" is also a legitimate variable name in an animation.
    const FORBIDDEN = [
      /from\s+['"](@sentry|@amplitude|mixpanel|posthog|@segment)[^'"]*['"]/,
      /require\(['"](@sentry|@amplitude|mixpanel|posthog|@segment)[^'"]*['"]\)/,
      /googletagmanager\.com|google-analytics\.com|static\.hotjar\.com|cdn\.segment\.com/,
      /\bgtag\s*\(|\bdataLayer\s*\.push|\bmixpanel\s*\.|\bposthog\s*\./,
    ]
    const offenders: string[] = []
    for (const { path, code } of CLIENT) {
      for (const pattern of FORBIDDEN) {
        if (pattern.test(code)) offenders.push(`${rel(path)} — ${pattern}`)
      }
    }
    expect(offenders).toEqual([])
  })

  it('keeps the Google Places key off the client', () => {
    // A VITE_ prefix would inline it into the bundle for anyone to read.
    const offenders = CLIENT.filter(({ code }) => /VITE_GOOGLE[_A-Z]*KEY/.test(code))
    expect(offenders.map((o) => rel(o.path))).toEqual([])
  })

  it('keeps zone detection free of side effects', () => {
    // It receives the user's exact position. It must compute and return, with
    // no logging, no network and no storage — the coordinates are discarded the
    // moment it returns.
    const { code } = CLIENT.find(({ path }) => path.endsWith('zoneDetection.ts'))!
    expect(code).not.toMatch(/console\./)
    expect(code).not.toMatch(/fetch\(|localStorage|supabase/)
  })
})
