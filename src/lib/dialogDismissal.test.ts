import { describe, expect, it } from 'vitest'
import { readFileSync, globSync } from 'node:fs'
import { resolve } from 'node:path'

const SRC = resolve(__dirname, '..')

/**
 * Every dialog must be closable from the keyboard.
 *
 * Both sheets in this app were dismissible only by tapping the backdrop or
 * dragging them down — pointer gestures on elements marked `role="dialog"`.
 * They cover the tab bar, so a keyboard user who opened a building card was
 * stuck behind it with no way out. WCAG 2.1.2 requires focus to be escapable
 * by keyboard alone.
 *
 * Nothing caught it. The suite runs in a node environment and asserts on source
 * text rather than rendering, so a missing key handler is invisible unless it
 * is asserted directly — which is what this does. It was found by driving the
 * real app in Playwright: after pressing Escape, `elementFromPoint` over the
 * tab bar still returned the sheet's own heading.
 */
const files = globSync('**/*.tsx', { cwd: SRC })
  .filter((f) => !f.includes('.test.'))
  .map((f) => ({ file: `src/${f}`, code: readFileSync(resolve(SRC, f), 'utf8') }))

const dialogs = files.filter(({ code }) => /role=["']dialog["']/.test(code))

describe('dialog dismissal', () => {
  it('finds the dialogs to check', () => {
    // A guard on the guard: if this drops to zero because the attribute is
    // written differently, every assertion below would vacuously pass.
    expect(dialogs.length).toBeGreaterThan(0)
  })

  it.each(dialogs.map((d) => d.file))('%s closes on Escape', (file) => {
    const { code } = dialogs.find((d) => d.file === file)!
    expect(code).toMatch(/useDismissOnEscape/)
  })

  it.each(dialogs.map((d) => d.file))('%s is marked aria-modal', (file) => {
    const { code } = dialogs.find((d) => d.file === file)!
    expect(code).toMatch(/aria-modal=["{]/)
  })

  it('routes every dialog through the one shared hook', () => {
    // Not per-component keydown handlers: the reason the sheets diverged in the
    // first place was two copies of the same overlay, one of which gained a fix
    // the other never did.
    const adhoc = files
      .filter(({ code }) => /addEventListener\(\s*['"]keydown/.test(code))
      .map(({ file }) => file)
    expect(adhoc).toEqual([])
  })
})
