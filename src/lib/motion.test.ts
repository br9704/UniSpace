import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { globSync } from 'node:fs'

/**
 * Guards the parts of MOTION.md that are checkable in source.
 *
 * The spec's headline acceptance criteria — "breathing invisible in any single
 * frame", "change vs liveness visually distinct in a recording" — need a human
 * with a screen recorder, and this file does not pretend otherwise. What it can
 * enforce are the hard rules that a future edit would otherwise silently break.
 */

const SRC = resolve(__dirname, '..')

function sourceFiles(): string[] {
  return globSync('**/*.{ts,tsx}', { cwd: SRC })
    .filter((f) => !f.endsWith('.test.ts') && !f.endsWith('.test.tsx'))
    .filter((f) => !f.includes('generated'))
    .map((f) => resolve(SRC, f))
}

const FILES = sourceFiles().map((path) => ({ path, code: readFileSync(path, 'utf8') }))

describe('MOTION.md rules', () => {
  it('uses no spring physics anywhere', () => {
    // "Ease-out or linear only. No bounce, no spring." Framer's spring type is
    // the easy thing to reach for, and three surfaces previously used it.
    const offenders = FILES.filter(({ code }) => /type:\s*['"]spring['"]/.test(code))
    expect(offenders.map((o) => o.path.replace(SRC, 'src'))).toEqual([])
  })

  it('keeps every animation at or under 600ms', () => {
    // "Nothing over 600ms."
    const offenders: string[] = []
    for (const { path, code } of FILES) {
      for (const match of code.matchAll(/duration:\s*([\d.]+)/g)) {
        const raw = Number(match[1])
        // Framer takes seconds; CSS and our own helpers take milliseconds.
        const ms = raw <= 5 ? raw * 1000 : raw
        if (ms > 600) offenders.push(`${path.replace(SRC, 'src')}: ${raw}`)
      }
    }
    expect(offenders).toEqual([])
  })

  it('uses no spinners', () => {
    // SIGNAL replaces them with filling block meters.
    // Matches usage, not prose — several files mention spinners to explain why
    // they do not use one.
    const offenders = FILES.filter(({ code }) =>
      /animate-spin/.test(code) || /<Spinner\b/.test(code) || /rotate\(360deg\)/.test(code))
    expect(offenders.map((o) => o.path.replace(SRC, 'src'))).toEqual([])
  })

  it('routes every JS-driven animation through the reduced-motion check', () => {
    // CSS animations are neutralised globally in index.css, but anything driven
    // by requestAnimationFrame or setInterval keeps running unless it asks.
    const offenders: string[] = []
    for (const { path, code } of FILES) {
      if (path.includes('usePrefersReducedMotion')) continue
      const animates = /requestAnimationFrame/.test(code)
      if (animates && !/prefersReducedMotion/.test(code)) {
        offenders.push(path.replace(SRC, 'src'))
      }
    }
    expect(offenders).toEqual([])
  })
})
