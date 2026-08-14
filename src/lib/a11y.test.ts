import { describe, it, expect } from 'vitest'
import { readFileSync, globSync } from 'node:fs'
import { resolve } from 'node:path'

/**
 * S19: WCAG 2.1 AA structural checks.
 *
 * These catch the mistakes that are easy to reintroduce and invisible in
 * review — an icon button with no label, a div pretending to be a button, a
 * touch target too small to hit. They do not replace testing with an actual
 * screen reader, which stays an owner-verified item in the Ship Runbook.
 *
 * This app has a specific obligation here. PRD § 3.4's persona uses a
 * wheelchair, and every failed trip costs them ten to fifteen minutes — the
 * accessibility of the tool that tells them where to go is not a side concern.
 */

const SRC = resolve(__dirname, '..')

const FILES = globSync('**/*.tsx', { cwd: SRC })
  .filter((f) => !f.includes('.test.'))
  .map((f) => ({ path: `src/${f}`, code: readFileSync(resolve(SRC, f), 'utf8') }))

describe('accessibility', () => {
  it('gives every icon-only button an accessible name', () => {
    // A button whose only content is a glyph announces as "button" and nothing
    // else. Every one here has to say what it does.
    const offenders: string[] = []

    for (const { path, code } of FILES) {
      for (const match of code.matchAll(/<button[\s\S]{0,700}?<\/button>/g)) {
        const button = match[0]
        if (/aria-label=/.test(button)) continue

        // Text content between the tags, stripped of markup and expressions.
        const inner = button.replace(/<[^>]+>/g, '').replace(/\{[^}]*\}/g, '').trim()
        const hasWords = /[A-Za-z]{3,}/.test(inner)
        if (!hasWords) offenders.push(`${path}: ${inner.slice(0, 24) || '(glyph only)'}`)
      }
    }

    expect(offenders).toEqual([])
  })

  it('uses real buttons rather than clickable divs', () => {
    // A div with onClick is not focusable, not keyboard-activatable and not
    // announced as interactive. Every one of those has to be hand-rebuilt, and
    // usually is not.
    const offenders = FILES.filter(({ code }) => /<div[^>]*\srole="button"/.test(code))
    expect(offenders.map((o) => o.path)).toEqual([])
  })

  it('meets the 44px touch target minimum wherever a size is set', () => {
    // PRD § 10.2. `minWidth: 0` is excluded: that is the standard flexbox
    // idiom for letting a child shrink, not a target size.
    const offenders: string[] = []
    for (const { path, code } of FILES) {
      for (const match of code.matchAll(/min(?:Height|Width):\s*(\d+)/g)) {
        const px = Number(match[1])
        if (px === 0) continue
        if (px < 44) offenders.push(`${path}: ${match[1]}px`)
      }
    }
    expect(offenders).toEqual([])
  })

  it('marks decorative glyphs as hidden from assistive tech', () => {
    // Brackets, carets and box-drawing characters are visual grammar. Read
    // aloud they are noise, and they surround almost every label in this UI.
    const offenders: string[] = []
    for (const { path, code } of FILES) {
      const lines = code.split('\n')
      lines.forEach((line, i) => {
        if (!/[█░◆▸▾↗]/.test(line)) return
        // Skip comments — several explain the glyph vocabulary in prose.
        if (/^\s*(\*|\/\/|\/\*)/.test(line)) return
        // Wide enough to reach the opening tag of the wrapping element, which
        // is where the attribute lives.
        const context = lines.slice(Math.max(0, i - 12), i + 3).join('\n')
        if (!/aria-hidden|aria-label|sr-only/.test(context)) {
          offenders.push(`${path}:${i + 1}`)
        }
      })
    }
    expect(offenders).toEqual([])
  })

  it('announces occupancy changes without reading out every counted frame', () => {
    // The visible number animates; announcing each step would flood a screen
    // reader with values that were never real readings.
    const announcer = FILES.find(({ path }) => path.endsWith('OccupancyAnnouncer.tsx'))!
    expect(announcer.code).toMatch(/aria-live="polite"/)

    const countUp = FILES.find(({ path }) => path.endsWith('CountUpValue.tsx'))!
    expect(countUp.code).toMatch(/aria-live="off"/)
  })

  it('states occupancy in words, never in shade alone', () => {
    // WCAG 1.4.1, and doubly important here: the ramp is monochrome, so anyone
    // who cannot distinguish two greys has only the label to go on.
    const badge = FILES.find(({ path }) => path.endsWith('OccupancyBadge.tsx'))!
    expect(badge.code).toMatch(/getOccupancyLabel/)

    const bar = FILES.find(({ path }) => path.endsWith('OccupancyBar.tsx'))!
    expect(bar.code).toMatch(/role="meter"/)
    expect(bar.code).toMatch(/aria-valuetext/)
  })

  it('labels every form control', () => {
    const offenders: string[] = []
    for (const { path, code } of FILES) {
      for (const match of code.matchAll(/<input[\s\S]{0,400}?\/>/g)) {
        const input = match[0]
        if (/aria-label|aria-labelledby|id=/.test(input)) continue
        offenders.push(path)
      }
    }
    expect(offenders).toEqual([])
  })

  it('gives every sheet a dialog role and an accessible name', () => {
    // Sheets either declare the semantics themselves or delegate to
    // `BottomSheet`, which requires a `label` prop — so both routes guarantee a
    // named dialog. Checked as an either/or rather than pinned to one shape,
    // so extracting shared chrome does not look like a regression.
    const SHEETS = [
      'BuildingCard.tsx',
      'ReportSheet.tsx',
      'FeedbackSheet.tsx',
      'FindPanel.tsx',
    ]

    for (const name of SHEETS) {
      const file = FILES.find(({ path }) => path.endsWith(name))!
      const declaresOwn = /role="dialog"/.test(file.code) && /aria-label/.test(file.code)
      const delegates = /<BottomSheet[\s\S]{0,200}?label=/.test(file.code)
      expect(
        declaresOwn || delegates,
        `${name} is neither a labelled dialog nor a labelled BottomSheet`,
      ).toBe(true)
    }
  })

  it('makes the shared sheet require a label rather than defaulting to none', () => {
    // A `label?:` here would let a caller silently ship an unnamed dialog.
    const sheet = FILES.find(({ path }) => path.endsWith('ui/BottomSheet.tsx'))!
    expect(sheet.code).toMatch(/label:\s*string/)
    expect(sheet.code).toMatch(/aria-label=\{label\}/)
  })
})
