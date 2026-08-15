/**
 * Reads the app's design tokens as literal values.
 *
 * Almost everything in the app styles itself with `var(--token)` directly. This
 * exists for the handful of consumers that cannot: Recharts and Mapbox both
 * take colours as plain strings and never resolve CSS custom properties.
 *
 * Going through here rather than hardcoding hex is what keeps the palette in
 * one place — which is what made reverting from SIGNAL to the UoM palette a
 * four-file change rather than a hunt. The previous version of this app had 169 hex literals scattered
 * across 17 files, which is how it ended up with a light theme nobody had
 * chosen.
 */

/** Values used when there is no document — SSR, tests, pre-paint Mapbox setup. */
const FALLBACKS: Record<string, string> = {
  '--color-bg': '#F0F2F5',
  '--color-surface': '#FFFFFF',
  '--color-steel': '#AEBBCB',
  '--color-hairline': '#CBD5E1',
  '--color-text-primary': '#08192A',
  '--color-text-secondary': '#374556',
  '--color-text-dim': '#AEBBCB',
  '--color-text-tertiary': '#4E5C6E',
  '--color-amber': '#005875',
  '--color-amber-bright': '#E8C97A',
  '--color-amber-dim': '#00465D',
  '--color-live': '#10472B',
  '--color-border': '#CBD5E1',
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
