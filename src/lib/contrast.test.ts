import { describe, it, expect } from 'vitest'
import { readFileSync, globSync } from 'node:fs'
import { resolve } from 'node:path'

/**
 * WCAG 2.1 AA contrast, computed rather than assumed.
 *
 * PRD § 10.2 requires 4.5:1 on text. A monochrome palette on a warm-black
 * ground makes it easy to pick a grey that looks right and measures badly —
 * `--color-text-dim` was exactly that, at 2.56:1, and it took a calculation to
 * notice.
 */

const SRC = resolve(__dirname, '..')
const CSS = readFileSync(resolve(SRC, 'index.css'), 'utf8')

function token(name: string): string {
  const match = CSS.match(new RegExp(`${name}:\\s*(#[0-9a-fA-F]{6})`))
  if (!match) throw new Error(`${name} is not declared in index.css`)
  return match[1]
}

function channel(value: number): number {
  const c = value / 255
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
}

function luminance(hex: string): number {
  const n = parseInt(hex.slice(1), 16)
  return (
    0.2126 * channel((n >> 16) & 255) +
    0.7152 * channel((n >> 8) & 255) +
    0.0722 * channel(n & 255)
  )
}

/** WCAG relative contrast ratio, 1–21. */
export function contrastRatio(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

const BG = token('--color-bg')
const SURFACE = token('--color-surface')

/** Tokens used for text that a user is expected to read. */
const TEXT_TOKENS = [
  '--color-text-primary',
  '--color-text-secondary',
  '--color-text-muted',
  '--color-text-tertiary',
  '--color-amber',
  '--color-live',
]

describe('contrast', () => {
  it.each(TEXT_TOKENS)('%s meets AA (4.5:1) on the background', (name) => {
    expect(contrastRatio(token(name), BG)).toBeGreaterThanOrEqual(4.5)
  })

  it.each(TEXT_TOKENS)('%s meets AA (4.5:1) on raised surfaces', (name) => {
    // Cards sit one step off the ground; text on them must still clear the bar.
    expect(contrastRatio(token(name), SURFACE)).toBeGreaterThanOrEqual(4.5)
  })

  it('keeps the focus indicator well above the 3:1 minimum', () => {
    // WCAG 2.4.11. Focus is the only way a keyboard user knows where they are.
    expect(contrastRatio(token('--color-amber'), BG)).toBeGreaterThanOrEqual(3)
  })

  it('distinguishes the live indicator from the inactive one', () => {
    // Green vs muted grey is the difference between "this is real right now"
    // and "this is an estimate" — it has to be visible, not just present.
    expect(contrastRatio(token('--color-live'), token('--color-text-muted')))
      .toBeGreaterThanOrEqual(1.5)
  })

  it('reserves --color-text-dim for decoration only', () => {
    // It measures 2.56:1 and cannot carry readable text. It is kept because it
    // is part of the locked SIGNAL palette, but every use must be inside an
    // aria-hidden element — a glyph, a bracket, the unfilled half of a meter.
    const offenders: string[] = []
    const files = globSync('**/*.tsx', { cwd: SRC }).filter((f) => !f.includes('.test.'))

    for (const file of files) {
      const lines = readFileSync(resolve(SRC, file), 'utf8').split('\n')
      lines.forEach((line, i) => {
        if (!line.includes('--color-text-dim')) return
        const context = lines.slice(Math.max(0, i - 3), i + 2).join('\n')
        if (!context.includes('aria-hidden')) offenders.push(`src/${file}:${i + 1}`)
      })
    }

    expect(offenders).toEqual([])
  })

  it('makes each occupancy step visually distinct from its neighbour', () => {
    // The ramp is monochrome, so adjacent levels have to be separable by eye.
    // They are never the sole signal — a text label always accompanies them,
    // per WCAG 1.4.1 — but a ramp whose steps are indistinguishable is
    // decoration pretending to be information.
    const ramp = ['empty', 'quiet', 'moderate', 'busy', 'packed']
      .map((level) => token(`--color-occ-${level}`))

    for (let i = 1; i < ramp.length; i++) {
      expect(contrastRatio(ramp[i], ramp[i - 1]), `steps ${i - 1}→${i} are too close`)
        .toBeGreaterThanOrEqual(1.2)
    }
  })

  it('keeps "no data" distinguishable from the emptiest real reading', () => {
    // Unknown must not be mistaken for empty — the single most consequential
    // confusion this app can cause.
    expect(contrastRatio(token('--color-occ-none'), token('--color-occ-empty')))
      .toBeGreaterThanOrEqual(1.2)
  })
})
