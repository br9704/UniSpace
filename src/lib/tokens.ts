/**
 * Reads SIGNAL design tokens as literal values.
 *
 * Almost everything in the app styles itself with `var(--token)` directly. This
 * exists for the handful of consumers that cannot: Recharts and Mapbox both
 * take colours as plain strings and never resolve CSS custom properties.
 *
 * Going through here rather than hardcoding hex is what keeps the palette in
 * one place. The previous version of this app had 169 hex literals scattered
 * across 17 files, which is how it ended up with a light theme nobody had
 * chosen.
 */

/** Values used when there is no document — SSR, tests, pre-paint Mapbox setup. */
const FALLBACKS: Record<string, string> = {
  '--color-bg': '#050505',
  '--color-surface': '#0b0a09',
  '--color-steel': '#2c2925',
  '--color-hairline': '#1b1916',
  '--color-text-primary': '#f0ece4',
  '--color-text-secondary': '#98928a',
  '--color-text-dim': '#55504a',
  '--color-text-tertiary': '#55504a',
  '--color-amber': '#ffb000',
  '--color-amber-bright': '#ffc94d',
  '--color-amber-dim': '#8f6300',
  '--color-live': '#4caf7d',
  '--color-border': '#2c2925',
}

/**
 * Resolve a CSS custom property to its literal value.
 *
 * @param name - Token name including the leading `--`.
 */
export function readToken(name: string): string {
  if (typeof document !== 'undefined') {
    const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
    if (value) return value
  }
  return FALLBACKS[name] ?? '#000000'
}

/**
 * The palette charts need, resolved once.
 *
 * There is a single theme, so unlike the hook this replaces there is nothing to
 * observe or re-read — reading on every render would just cost a layout flush.
 */
export const CHART_COLOURS = {
  get text() { return readToken('--color-text-secondary') },
  get textDim() { return readToken('--color-text-dim') },
  get grid() { return readToken('--color-hairline') },
  get border() { return readToken('--color-steel') },
  get surface() { return readToken('--color-surface') },
  get accent() { return readToken('--color-amber') },
  get accentDim() { return readToken('--color-amber-dim') },
} as const
