import { describe, it, expect, beforeAll } from 'vitest'
import { build } from 'vite'
import { mkdtempSync, writeFileSync, readdirSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'

/**
 * Regression gate for WIRING-AUDIT.md RC-2.
 *
 * Tailwind v4 was installed while `src/index.css` still used v3's
 * `@tailwind base/components/utilities` directives. Tailwind kept building
 * without error, but the theme scale never loaded, so every utility whose
 * value comes from the theme — all spacing, font sizes, font weights, radii —
 * silently emitted NOTHING. `.flex` worked; `.p-4` did not. The app rendered
 * with no padding and no type scale for an unknown number of sprints, and no
 * gate caught it, because every check ran against the *source* and never
 * against the *build output*.
 *
 * So this test asserts on compiled CSS produced by the real Vite + PostCSS
 * pipeline. That is the whole point — a source-level assertion would have
 * passed happily throughout the outage. Keep it that way.
 */

const PROJECT_ROOT = resolve(__dirname, '..')

/**
 * Utilities that exist only when the theme scale loads, one per Tailwind v4
 * namespace, so a break in any single namespace is caught.
 *
 * Every entry must also be used somewhere in `src/` — Tailwind only emits
 * classes it finds in scanned sources, so an unused probe would fail for the
 * wrong reason.
 */
const THEME_SCALED_UTILITIES = [
  { cls: 'p-4', namespace: 'spacing' },
  { cls: 'px-4', namespace: 'spacing' },
  { cls: 'gap-2', namespace: 'spacing' },
  { cls: 'text-sm', namespace: 'font size (--text-*)' },
  { cls: 'text-2xl', namespace: 'font size (--text-*)' },
  { cls: 'font-semibold', namespace: 'font weight' },
  { cls: 'rounded-lg', namespace: 'radius (--radius-*)' },
  { cls: 'shadow-elevated', namespace: 'shadow (--shadow-*)' },
  { cls: 'bg-bg-primary', namespace: 'color (--color-*)' },
  { cls: 'font-mono', namespace: 'font family (--font-*)' },
]

/**
 * Static utilities, which carry no theme value. These kept working right
 * through the outage, so on their own they prove only that Tailwind ran at
 * all — never that it ran correctly.
 */
const STATIC_UTILITIES = ['flex', 'absolute', 'w-full']

/** Compile `src/index.css` through the real pipeline and return the output. */
async function buildStylesheet(): Promise<string> {
  const dir = mkdtempSync(join(tmpdir(), 'unispace-css-'))
  try {
    const entry = join(dir, 'entry.js')
    writeFileSync(entry, `import ${JSON.stringify(resolve(PROJECT_ROOT, 'src/index.css'))}`)

    await build({
      root: dir,
      configFile: false,
      logLevel: 'silent',
      // Resolve postcss.config.js from the project root so Tailwind's plugin
      // and its source auto-detection behave exactly as they do in `pnpm build`.
      css: { postcss: PROJECT_ROOT },
      build: {
        outDir: join(dir, 'out'),
        emptyOutDir: true,
        rollupOptions: { input: entry },
      },
    })

    const assets = join(dir, 'out', 'assets')
    const cssFile = readdirSync(assets).find((f) => f.endsWith('.css'))
    if (!cssFile) throw new Error('Vite emitted no stylesheet at all')
    return readFileSync(join(assets, cssFile), 'utf8')
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

describe('Tailwind build output', () => {
  let css = ''
  beforeAll(async () => {
    css = await buildStylesheet()
  }, 60_000)

  it.each(STATIC_UTILITIES)('emits the static utility .%s', (cls) => {
    expect(css, `.${cls} is missing — Tailwind is not running at all`).toContain(`.${cls}{`)
  })

  it.each(THEME_SCALED_UTILITIES)(
    'emits .$cls, proving the $namespace scale is loaded',
    ({ cls, namespace }) => {
      expect(
        css,
        `.${cls} produced no CSS, so the "${namespace}" scale is not loading. ` +
          'This is WIRING-AUDIT.md RC-2 recurring: the app will render without it and ' +
          'nothing else will fail. Check that src/index.css begins with `@import "tailwindcss"` ' +
          'and that the token is declared inside `@theme` under a Tailwind v4 namespace.',
      ).toContain(`.${cls}{`)
    },
  )

  it('exposes the design tokens as CSS custom properties', () => {
    // Most components style themselves via `var(--color-*)` rather than named
    // utilities, so the tokens must survive the build independently.
    for (const token of ['--color-text-primary', '--color-bg-primary', '--font-mono']) {
      expect(css, `${token} is missing from the compiled stylesheet`).toContain(token)
    }
  })
})
