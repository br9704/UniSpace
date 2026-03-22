import { describe, expect, it } from 'vitest'
import {
  formatHour,
  getAvoidWindow,
  getBestTimeToGo,
  getDayPredictions,
  getPeakHour,
  getSparklineData,
} from './predictionInsights'
import type { GooglePopularTime, OccupancyPrediction } from '@/types'

// ── Factory functions ────────────────────────────────────────────────

function makePrediction(overrides: Partial<OccupancyPrediction> = {}): OccupancyPrediction {
  return {
    id: 'pred-1',
    building_id: 'b-1',
    day_of_week: 1,
    hour_of_day: 12,
    predicted_pct: 50,
    confidence: 'google-estimated',
    sample_count: 0,
    data_source: 'google',
    computed_at: '2026-03-19T00:00:00Z',
    ...overrides,
  }
}

function makeTypical(overrides: Partial<GooglePopularTime> = {}): GooglePopularTime {
  return {
    building_id: 'b-1',
    day_of_week: 1,
    hour_of_day: 12,
    typical_popularity: 45,
    seeded_at: '2026-03-19T00:00:00Z',
    ...overrides,
  }
}

// ── getDayPredictions ────────────────────────────────────────────────

describe('getDayPredictions', () => {
  it('builds 24-hour curve from prediction rows', () => {
    const rows = [
      makePrediction({ hour_of_day: 9, predicted_pct: 30 }),
      makePrediction({ hour_of_day: 12, predicted_pct: 80 }),
      makePrediction({ hour_of_day: 15, predicted_pct: 60 }),
    ]
    const result = getDayPredictions(rows, [], 'b-1', 1)
    expect(result).toHaveLength(24)
    expect(result[9].pct).toBe(30)
    expect(result[12].pct).toBe(80)
    expect(result[15].pct).toBe(60)
    expect(result[0].pct).toBe(0) // missing hour filled with 0
  })

  it('falls back to Google typical when no predictions', () => {
    const typical = [
      makeTypical({ hour_of_day: 10, typical_popularity: 40 }),
      makeTypical({ hour_of_day: 14, typical_popularity: 70 }),
    ]
    const result = getDayPredictions([], typical, 'b-1', 1)
    expect(result).toHaveLength(24)
    expect(result[10].pct).toBe(40)
    expect(result[14].pct).toBe(70)
    expect(result[10].source).toBe('google')
    expect(result[10].confidence).toBe('google-estimated')
  })

  it('returns empty array when no data for building', () => {
    const result = getDayPredictions([], [], 'b-1', 1)
    expect(result).toHaveLength(0)
  })

  it('filters by building_id and day_of_week', () => {
    const rows = [
      makePrediction({ building_id: 'b-1', day_of_week: 1, hour_of_day: 10, predicted_pct: 50 }),
      makePrediction({ building_id: 'b-2', day_of_week: 1, hour_of_day: 10, predicted_pct: 90 }),
      makePrediction({ building_id: 'b-1', day_of_week: 2, hour_of_day: 10, predicted_pct: 70 }),
    ]
    const result = getDayPredictions(rows, [], 'b-1', 1)
    expect(result[10].pct).toBe(50)
  })
})

// ── getPeakHour ──────────────────────────────────────────────────────

describe('getPeakHour', () => {
  it('returns hour with highest pct', () => {
    const predictions = [
      { hour: 9, pct: 30, source: 'google' as const, confidence: 'google-estimated' as const },
      { hour: 13, pct: 85, source: 'google' as const, confidence: 'google-estimated' as const },
      { hour: 15, pct: 60, source: 'google' as const, confidence: 'google-estimated' as const },
    ]
    expect(getPeakHour(predictions)).toEqual({ hour: 13, pct: 85 })
  })

  it('returns null for empty predictions', () => {
    expect(getPeakHour([])).toBeNull()
  })

  it('returns null when all pct are 0', () => {
    const predictions = [
      { hour: 0, pct: 0, source: 'google' as const, confidence: 'google-estimated' as const },
    ]
    expect(getPeakHour(predictions)).toBeNull()
  })
})

// ── getBestTimeToGo ──────────────────────────────────────────────────

describe('getBestTimeToGo', () => {
  it('returns lowest-pct hour after current hour', () => {
    const predictions = [
      { hour: 8, pct: 20, source: 'google' as const, confidence: 'google-estimated' as const },
      { hour: 14, pct: 30, source: 'google' as const, confidence: 'google-estimated' as const },
      { hour: 16, pct: 80, source: 'google' as const, confidence: 'google-estimated' as const },
      { hour: 19, pct: 25, source: 'google' as const, confidence: 'google-estimated' as const },
    ]
    expect(getBestTimeToGo(predictions, 10)).toEqual({ hour: 19, pct: 25 })
  })

  it('returns null when no remaining hours', () => {
    const predictions = [
      { hour: 8, pct: 20, source: 'google' as const, confidence: 'google-estimated' as const },
    ]
    expect(getBestTimeToGo(predictions, 20)).toBeNull()
  })

  it('excludes hours after 21', () => {
    const predictions = [
      { hour: 22, pct: 10, source: 'google' as const, confidence: 'google-estimated' as const },
      { hour: 23, pct: 5, source: 'google' as const, confidence: 'google-estimated' as const },
    ]
    expect(getBestTimeToGo(predictions, 20)).toBeNull()
  })
})

// ── getAvoidWindow ───────────────────────────────────────────────────

describe('getAvoidWindow', () => {
  it('finds contiguous busy block', () => {
    const predictions = [
      { hour: 11, pct: 75, source: 'google' as const, confidence: 'google-estimated' as const },
      { hour: 12, pct: 80, source: 'google' as const, confidence: 'google-estimated' as const },
      { hour: 13, pct: 85, source: 'google' as const, confidence: 'google-estimated' as const },
      { hour: 14, pct: 50, source: 'google' as const, confidence: 'google-estimated' as const },
    ]
    const result = getAvoidWindow(predictions, 10)
    expect(result).not.toBeNull()
    expect(result!.start).toBe(11)
    expect(result!.end).toBe(13)
  })

  it('returns null when no hours above 70%', () => {
    const predictions = [
      { hour: 12, pct: 60, source: 'google' as const, confidence: 'google-estimated' as const },
      { hour: 13, pct: 65, source: 'google' as const, confidence: 'google-estimated' as const },
    ]
    expect(getAvoidWindow(predictions, 10)).toBeNull()
  })

  it('returns null when all busy hours are in the past', () => {
    const predictions = [
      { hour: 8, pct: 90, source: 'google' as const, confidence: 'google-estimated' as const },
    ]
    expect(getAvoidWindow(predictions, 10)).toBeNull()
  })
})

// ── getSparklineData ─────────────────────────────────────────────────

describe('getSparklineData', () => {
  it('returns 6 entries ending at current hour', () => {
    const predictions = Array.from({ length: 24 }, (_, i) => ({
      hour: i, pct: i * 4, source: 'google' as const, confidence: 'google-estimated' as const,
    }))
    const result = getSparklineData(predictions, 14)
    expect(result).toHaveLength(6)
    expect(result[0].hour).toBe(9)
    expect(result[5].hour).toBe(14)
  })

  it('handles early morning (clamps to hour 0)', () => {
    const predictions = Array.from({ length: 24 }, (_, i) => ({
      hour: i, pct: i * 4, source: 'google' as const, confidence: 'google-estimated' as const,
    }))
    const result = getSparklineData(predictions, 2)
    expect(result).toHaveLength(3) // hours 0, 1, 2
    expect(result[0].hour).toBe(0)
  })
})

// ── formatHour ───────────────────────────────────────────────────────

describe('formatHour', () => {
  it('formats midnight', () => expect(formatHour(0)).toBe('12 AM'))
  it('formats morning', () => expect(formatHour(9)).toBe('9 AM'))
  it('formats noon', () => expect(formatHour(12)).toBe('12 PM'))
  it('formats afternoon', () => expect(formatHour(14)).toBe('2 PM'))
  it('formats late night', () => expect(formatHour(23)).toBe('11 PM'))
})
