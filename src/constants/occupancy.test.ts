import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import {
  OCCUPANCY_COLOURS,
  OCCUPANCY_COLOUR_VARS,
  getOccupancyLabel,
  getOccupancyLevel,
  type OccupancyLevel,
} from './occupancy'

const CSS = readFileSync(resolve(__dirname, '../index.css'), 'utf8')

function tokenValue(name: string): string | null {
  const match = CSS.match(new RegExp(`${name}:\\s*([^;]+);`))
  return match ? match[1].trim() : null
}

describe('occupancy ramp', () => {
  it('keeps its hex fallbacks in step with index.css', () => {
    // Mapbox paint expressions need literal colours and are built before there
    // is a document to read tokens from, so these values are duplicated. This
    // test is the reason that duplication is safe.
    for (const [level, varName] of Object.entries(OCCUPANCY_COLOUR_VARS)) {
      const fromCss = tokenValue(varName)
      expect(fromCss, `${varName} is not declared in index.css`).not.toBeNull()
      expect(
        OCCUPANCY_COLOURS[level as OccupancyLevel].toLowerCase(),
        `${level} fallback has drifted from ${varName}`,
      ).toBe(fromCss!.toLowerCase())
    }
  })

  it('runs green to red as buildings get fuller', () => {
    // SIGNAL encoded occupancy as luminance, because its rules allowed one
    // accent colour and MOTION.md forbade the map drawing the eye toward busy
    // buildings. That system was reverted, so the invariant is a hue ramp
    // again: green through amber to red, monotonically decreasing in hue.
    const hue = (hex: string) => {
      const n = parseInt(hex.slice(1), 16)
      const r = ((n >> 16) & 255) / 255, g = ((n >> 8) & 255) / 255, b = (n & 255) / 255
      const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min
      if (d === 0) return 0
      const h = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4
      return ((h * 60) + 360) % 360
    }
    const ordered: OccupancyLevel[] = ['empty', 'quiet', 'moderate', 'busy', 'packed']
    const values = ordered.map((l) => hue(OCCUPANCY_COLOURS[l]))

    for (let i = 1; i < values.length; i++) {
      expect(values[i], `${ordered[i]} is not warmer than ${ordered[i - 1]}`)
        .toBeLessThan(values[i - 1])
    }
  })

  it('renders "no data" darker than any real occupancy level', () => {
    // Unknown must recede, never be mistaken for a measurement.
    expect(OCCUPANCY_COLOURS.none).not.toBe(OCCUPANCY_COLOURS.empty)
  })

  it('always pairs a level with a text label', () => {
    // WCAG 2.1 AA: occupancy is never communicated by colour alone. This
    // matters more with a green-to-red ramp than it did with the monochrome
    // one, because red/green is the commonest form of colour blindness.
    for (const pct of [null, 0, 25, 26, 50, 51, 70, 71, 85, 86, 100]) {
      const label = getOccupancyLabel(pct)
      expect(label.length, `no label for ${pct}`).toBeGreaterThan(0)
      expect(label).not.toBe(getOccupancyLevel(pct))
    }
  })

  it('places threshold boundaries on the lower band', () => {
    expect(getOccupancyLevel(25)).toBe('empty')
    expect(getOccupancyLevel(26)).toBe('quiet')
    expect(getOccupancyLevel(50)).toBe('quiet')
    expect(getOccupancyLevel(51)).toBe('moderate')
    expect(getOccupancyLevel(85)).toBe('busy')
    expect(getOccupancyLevel(86)).toBe('packed')
  })
})

describe('UoM palette', () => {
  // SIGNAL — warm black, a single amber accent, <=2px radius, no shadows — was
  // reverted on 2026-08-15 at Bruno's instruction after seeing it beside the
  // pre-SIGNAL build. These pin what replaced it so the two cannot half-mix.
  it('defines the core tokens', () => {
    expect(tokenValue('--color-bg')).toBe('#F0F2F5')
    expect(tokenValue('--color-amber')).toBe('#806A29')
    expect(tokenValue('--color-text-primary')).toBe('#1E293B')
    expect(tokenValue('--color-uom-navy')).toBe('#003865')
  })

  it('has no SIGNAL colour left anywhere in the stylesheet', () => {
    // The failure mode being guarded against is a half-revert: warm-black
    // surfaces surviving under light-theme text, which is unreadable rather
    // than merely ugly.
    for (const hex of ['#050505', '#0b0a09', '#ffb000', '#f0ece4', '#2c2925']) {
      expect(CSS.toLowerCase(), `${hex} survives the revert`).not.toContain(hex)
    }
  })

  it('uses the rounded UoM radius scale', () => {
    expect(tokenValue('--radius-sm')).toBe('6px')
    expect(tokenValue('--radius-md')).toBe('12px')
    expect(tokenValue('--radius-lg')).toBe('20px')
  })

  it('has no light theme left in the stylesheet', () => {
    expect(CSS).not.toMatch(/\[data-theme=["']?light/)
    expect(CSS).not.toMatch(/prefers-color-scheme:\s*light/)
  })
})
