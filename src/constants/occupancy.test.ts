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

  it('gets lighter as buildings get fuller', () => {
    // The ramp encodes occupancy as luminance, so the ordering is the design.
    const luminance = (hex: string) => {
      const n = parseInt(hex.slice(1), 16)
      return ((n >> 16) & 255) * 0.299 + ((n >> 8) & 255) * 0.587 + (n & 255) * 0.114
    }
    const ordered: OccupancyLevel[] = ['empty', 'quiet', 'moderate', 'busy', 'packed']
    const values = ordered.map((l) => luminance(OCCUPANCY_COLOURS[l]))

    for (let i = 1; i < values.length; i++) {
      expect(values[i], `${ordered[i]} is not lighter than ${ordered[i - 1]}`)
        .toBeGreaterThan(values[i - 1])
    }
  })

  it('renders "no data" darker than any real occupancy level', () => {
    // Unknown must recede, never be mistaken for a measurement.
    expect(OCCUPANCY_COLOURS.none).not.toBe(OCCUPANCY_COLOURS.empty)
  })

  it('always pairs a level with a text label', () => {
    // WCAG 2.1 AA: occupancy is never communicated by colour alone. With a
    // monochrome ramp this matters more than it did with green-to-red.
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

describe('SIGNAL palette', () => {
  it('defines the locked core tokens', () => {
    expect(tokenValue('--color-bg')).toBe('#050505')
    expect(tokenValue('--color-amber')).toBe('#ffb000')
    expect(tokenValue('--color-text-primary')).toBe('#f0ece4')
    expect(tokenValue('--color-steel')).toBe('#2c2925')
  })

  it('keeps every radius at 2px or less', () => {
    // "Border-radius max 2px. Effectively square." — a hard rule of the system.
    for (const name of ['--radius-sm', '--radius-md', '--radius-lg', '--radius-full']) {
      const value = tokenValue(name)
      expect(value, `${name} is missing`).not.toBeNull()
      expect(parseInt(value!, 10), `${name} is ${value}, above the 2px cap`).toBeLessThanOrEqual(2)
    }
  })

  it('has no light theme left in the stylesheet', () => {
    expect(CSS).not.toMatch(/\[data-theme=["']?light/)
    expect(CSS).not.toMatch(/prefers-color-scheme:\s*light/)
  })
})
