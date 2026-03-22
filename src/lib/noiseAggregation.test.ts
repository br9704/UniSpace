import { describe, expect, it } from 'vitest'
import { aggregateNoise } from './noiseAggregation'
import type { OccupancyReport } from '@/types'

const NOW = new Date('2026-03-22T12:00:00Z')

function makeReport(overrides: Partial<OccupancyReport> & { minutesAgo?: number } = {}): OccupancyReport {
  const { minutesAgo = 0, ...rest } = overrides
  const created = new Date(NOW.getTime() - minutesAgo * 60 * 1000)
  const expires = new Date(created.getTime() + 30 * 60 * 1000)
  return {
    id: 'report-1',
    building_id: 'building-1',
    occupancy_level: 3,
    noise_level: null,
    created_at: created.toISOString(),
    expires_at: expires.toISOString(),
    ...rest,
  }
}

describe('aggregateNoise', () => {
  it('returns null for empty array', () => {
    expect(aggregateNoise([], NOW)).toBeNull()
  })

  it('returns null when all reports have noise_level null', () => {
    const reports = [
      makeReport({ id: 'r1', noise_level: null }),
      makeReport({ id: 'r2', noise_level: null }),
      makeReport({ id: 'r3', noise_level: null }),
    ]
    expect(aggregateNoise(reports, NOW)).toBeNull()
  })

  it('returns null when fewer than 3 reports have noise data', () => {
    const reports = [
      makeReport({ id: 'r1', noise_level: 2 }),
      makeReport({ id: 'r2', noise_level: 3 }),
    ]
    expect(aggregateNoise(reports, NOW)).toBeNull()
  })

  it('returns correct weighted average for 3+ same-age reports', () => {
    const reports = [
      makeReport({ id: 'r1', noise_level: 2, minutesAgo: 0 }),
      makeReport({ id: 'r2', noise_level: 4, minutesAgo: 0 }),
      makeReport({ id: 'r3', noise_level: 3, minutesAgo: 0 }),
    ]
    const result = aggregateNoise(reports, NOW)
    expect(result).not.toBeNull()
    expect(result!.level).toBe(3) // (2+4+3)/3
    expect(result!.count).toBe(3)
  })

  it('applies time decay correctly', () => {
    // r1: noise=1, just created (weight ~1.0)
    // r2: noise=5, 15 min ago (weight ~0.5)
    // r3: noise=3, just created (weight ~1.0)
    const reports = [
      makeReport({ id: 'r1', noise_level: 1, minutesAgo: 0 }),
      makeReport({ id: 'r2', noise_level: 5, minutesAgo: 15 }),
      makeReport({ id: 'r3', noise_level: 3, minutesAgo: 0 }),
    ]
    const result = aggregateNoise(reports, NOW)
    expect(result).not.toBeNull()
    // (1*1.0 + 5*0.5 + 3*1.0) / (1.0+0.5+1.0) = 6.5/2.5 = 2.6
    expect(result!.level).toBe(2.6)
    expect(result!.count).toBe(3)
  })

  it('ignores expired reports', () => {
    const reports = [
      makeReport({ id: 'r1', noise_level: 2, minutesAgo: 0 }),
      makeReport({ id: 'r2', noise_level: 3, minutesAgo: 0 }),
      makeReport({ id: 'r3', noise_level: 4, minutesAgo: 0 }),
      makeReport({ id: 'r4', noise_level: 5, minutesAgo: 35 }), // expired
    ]
    const result = aggregateNoise(reports, NOW)
    expect(result).not.toBeNull()
    expect(result!.level).toBe(3) // (2+3+4)/3, expired report excluded
    expect(result!.count).toBe(3)
  })
})
