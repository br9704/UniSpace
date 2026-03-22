import { describe, expect, it } from 'vitest'
import { aggregateReports, REPORT_LEVEL_TO_PCT, reportWeight } from './reportDecay'
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

// ── reportWeight ──────────────────────────────────────────────────────

describe('reportWeight', () => {
  it('returns 1.0 at creation time', () => {
    const report = makeReport({ minutesAgo: 0 })
    expect(reportWeight(report, NOW)).toBeCloseTo(1.0, 5)
  })

  it('returns ~0.5 at midpoint (15 min)', () => {
    const report = makeReport({ minutesAgo: 15 })
    expect(reportWeight(report, NOW)).toBeCloseTo(0.5, 1)
  })

  it('returns 0.0 at expiry (30 min)', () => {
    const report = makeReport({ minutesAgo: 30 })
    expect(reportWeight(report, NOW)).toBe(0)
  })

  it('returns 0.0 past expiry', () => {
    const report = makeReport({ minutesAgo: 45 })
    expect(reportWeight(report, NOW)).toBe(0)
  })

  it('returns 0.0 for future report', () => {
    const future = new Date(NOW.getTime() + 5 * 60 * 1000)
    const report: OccupancyReport = {
      id: 'report-future',
      building_id: 'building-1',
      occupancy_level: 3,
      noise_level: null,
      created_at: future.toISOString(),
      expires_at: new Date(future.getTime() + 30 * 60 * 1000).toISOString(),
    }
    expect(reportWeight(report, NOW)).toBe(0)
  })
})

// ── aggregateReports ──────────────────────────────────────────────────

describe('aggregateReports', () => {
  it('returns null for empty array', () => {
    expect(aggregateReports([], NOW)).toBeNull()
  })

  it('returns null for all-expired reports', () => {
    const reports = [
      makeReport({ minutesAgo: 35 }),
      makeReport({ minutesAgo: 40, id: 'report-2' }),
    ]
    expect(aggregateReports(reports, NOW)).toBeNull()
  })

  it('returns correct pct for single report', () => {
    const report = makeReport({ minutesAgo: 0, occupancy_level: 4 })
    const result = aggregateReports([report], NOW)
    expect(result).not.toBeNull()
    expect(result!.pct).toBe(REPORT_LEVEL_TO_PCT[4]) // 77
    expect(result!.count).toBe(1)
  })

  it('correctly weights multiple reports with different ages', () => {
    // Report 1: level 5 (93%), just created (weight ~1.0)
    // Report 2: level 1 (12%), 15 min ago (weight ~0.5)
    const reports = [
      makeReport({ id: 'r1', minutesAgo: 0, occupancy_level: 5 }),
      makeReport({ id: 'r2', minutesAgo: 15, occupancy_level: 1 }),
    ]
    const result = aggregateReports(reports, NOW)
    expect(result).not.toBeNull()
    expect(result!.count).toBe(2)
    // Weighted: (93*1.0 + 12*0.5) / (1.0 + 0.5) = 99/1.5 = 66
    expect(result!.pct).toBe(66)
  })
})
