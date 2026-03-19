import { describe, expect, it } from 'vitest'
import {
  groupByBuildingId,
  mergeZoneOccupancy,
  getCurrentTypical,
  getCurrentPrediction,
} from './occupancyHelpers'
import type { GooglePopularTime, OccupancyPrediction, ZoneOccupancy } from '@/types'

function makeZoneOcc(overrides: Partial<ZoneOccupancy> = {}): ZoneOccupancy {
  return {
    zone_id: 'z-1',
    building_id: 'b-1',
    occupancy_count: 10,
    occupancy_pct: 25,
    trend: 'stable',
    prev_pct: null,
    last_updated: new Date().toISOString(),
    data_quality: 'live',
    ...overrides,
  }
}

// ── groupByBuildingId ────────────────────────────────────────────────

describe('groupByBuildingId', () => {
  it('groups rows by building_id', () => {
    const rows = [
      makeZoneOcc({ zone_id: 'z1', building_id: 'b1' }),
      makeZoneOcc({ zone_id: 'z2', building_id: 'b1' }),
      makeZoneOcc({ zone_id: 'z3', building_id: 'b2' }),
    ]
    const map = groupByBuildingId(rows)
    expect(map.get('b1')).toHaveLength(2)
    expect(map.get('b2')).toHaveLength(1)
  })

  it('returns empty map for empty array', () => {
    expect(groupByBuildingId([]).size).toBe(0)
  })
})

// ── mergeZoneOccupancy ───────────────────────────────────────────────

describe('mergeZoneOccupancy', () => {
  it('replaces existing zone entry', () => {
    const initial = new Map([['b1', [makeZoneOcc({ zone_id: 'z1', building_id: 'b1', occupancy_pct: 10 })]]])
    const updated = makeZoneOcc({ zone_id: 'z1', building_id: 'b1', occupancy_pct: 50 })
    const result = mergeZoneOccupancy(initial, updated)
    expect(result.get('b1')![0].occupancy_pct).toBe(50)
  })

  it('appends new zone entry', () => {
    const initial = new Map([['b1', [makeZoneOcc({ zone_id: 'z1', building_id: 'b1' })]]])
    const newZone = makeZoneOcc({ zone_id: 'z2', building_id: 'b1' })
    const result = mergeZoneOccupancy(initial, newZone)
    expect(result.get('b1')).toHaveLength(2)
  })

  it('creates new building group if needed', () => {
    const initial = new Map<string, ZoneOccupancy[]>()
    const row = makeZoneOcc({ zone_id: 'z1', building_id: 'b-new' })
    const result = mergeZoneOccupancy(initial, row)
    expect(result.get('b-new')).toHaveLength(1)
  })

  it('does not mutate original map', () => {
    const initial = new Map([['b1', [makeZoneOcc({ zone_id: 'z1', building_id: 'b1' })]]])
    const updated = makeZoneOcc({ zone_id: 'z1', building_id: 'b1', occupancy_pct: 99 })
    mergeZoneOccupancy(initial, updated)
    expect(initial.get('b1')![0].occupancy_pct).not.toBe(99)
  })
})

// ── getCurrentTypical ────────────────────────────────────────────────

describe('getCurrentTypical', () => {
  const wednesday12 = new Date('2026-03-18T12:30:00') // Wednesday = day 3

  const rows: GooglePopularTime[] = [
    { building_id: 'b1', day_of_week: 3, hour_of_day: 12, typical_popularity: 80, seeded_at: '' },
    { building_id: 'b1', day_of_week: 3, hour_of_day: 13, typical_popularity: 70, seeded_at: '' },
    { building_id: 'b2', day_of_week: 3, hour_of_day: 12, typical_popularity: 50, seeded_at: '' },
  ]

  it('finds matching row for building + day + hour', () => {
    const result = getCurrentTypical(rows, 'b1', wednesday12)
    expect(result?.typical_popularity).toBe(80)
  })

  it('returns null when no match', () => {
    expect(getCurrentTypical(rows, 'b-missing', wednesday12)).toBeNull()
  })

  it('returns null for empty array', () => {
    expect(getCurrentTypical([], 'b1', wednesday12)).toBeNull()
  })
})

// ── getCurrentPrediction ─────────────────────────────────────────────

describe('getCurrentPrediction', () => {
  const wednesday12 = new Date('2026-03-18T12:30:00')

  const rows: OccupancyPrediction[] = [
    { id: 'p1', building_id: 'b1', day_of_week: 3, hour_of_day: 12, predicted_pct: 65, confidence: 'medium', sample_count: 28, data_source: 'pulse', computed_at: '' },
  ]

  it('finds matching prediction', () => {
    const result = getCurrentPrediction(rows, 'b1', wednesday12)
    expect(result?.predicted_pct).toBe(65)
  })

  it('returns null when no match', () => {
    expect(getCurrentPrediction(rows, 'b-missing', wednesday12)).toBeNull()
  })

  it('returns null for empty array', () => {
    expect(getCurrentPrediction([], 'b1', wednesday12)).toBeNull()
  })
})
