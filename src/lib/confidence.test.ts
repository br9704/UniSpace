import { describe, it, expect } from 'vitest'
import { getConfidence } from './confidence'
import type { DataQuality } from '@/types'

const ALL_SOURCES: DataQuality[] = ['live', 'crowd-report', 'google', 'predicted', 'stale', 'none']

describe('confidence treatment', () => {
  it('only ever claims liveness for genuinely live sources', () => {
    // This is the invariant behind the P0 bug this project already shipped once:
    // an estimate rendered with live styling tells students a full library is
    // empty. Nothing but real broadcasts or fresh reports may look live.
    for (const source of ALL_SOURCES) {
      const isGenuinelyLive = source === 'live' || source === 'crowd-report'
      expect(getConfidence(source).isLive, `${source} claimed liveness`).toBe(isGenuinelyLive)
    }
  })

  it('breathes only where it claims liveness', () => {
    // Breathing means "this is live". The two must never disagree.
    for (const source of ALL_SOURCES) {
      const { breathes, isLive } = getConfidence(source)
      expect(breathes, `${source}: breathing and liveness disagree`).toBe(isLive)
    }
  })

  it('assigns the three MOTION.md intensity tiers', () => {
    expect(getConfidence('live').opacity).toBe(1)
    expect(getConfidence('google').opacity).toBeCloseTo(0.7)
    expect(getConfidence('none').opacity).toBeCloseTo(0.4)
  })

  it('gets fainter as confidence drops', () => {
    expect(getConfidence('live').opacity).toBeGreaterThan(getConfidence('google').opacity)
    expect(getConfidence('google').opacity).toBeGreaterThan(getConfidence('none').opacity)
  })

  it('qualifies every reading that is not live', () => {
    // Silence would let an estimate pass as a measurement.
    for (const source of ALL_SOURCES) {
      const { isLive, qualifier } = getConfidence(source)
      if (isLive) continue
      expect(qualifier.length, `${source} has no qualifier`).toBeGreaterThan(0)
    }
  })

  it('never labels an estimate as coming from Google', () => {
    // Google publishes no busyness API — these curves are our own model.
    for (const source of ALL_SOURCES) {
      expect(getConfidence(source).qualifier.toLowerCase()).not.toContain('google')
    }
  })

  it('marks only the lowest tier with a dashed border', () => {
    expect(getConfidence('none').borderStyle).toBe('dashed')
    expect(getConfidence('stale').borderStyle).toBe('dashed')
    expect(getConfidence('live').borderStyle).toBe('solid')
    expect(getConfidence('google').borderStyle).toBe('solid')
  })
})
