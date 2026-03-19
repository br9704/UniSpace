import { describe, expect, it } from 'vitest'
import {
  aggregateZoneOccupancies,
  blendOccupancy,
  determineTrend,
  isDataFresh,
  type BlendingInput,
} from './blending'
import type {
  BuildingZone,
  GooglePopularityCache,
  GooglePopularTime,
  OccupancyPrediction,
  ZoneOccupancy,
} from '@/types'

// ── Test helpers ─────────────────────────────────────────────────────

const NOW = new Date('2026-03-19T12:00:00Z')

function makeZone(overrides: Partial<BuildingZone> = {}): BuildingZone {
  return {
    id: 'zone-1',
    building_id: 'building-1',
    zone_slug: 'ground',
    zone_name: 'Ground Floor',
    polygon: { type: 'Polygon', coordinates: [[[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]] },
    capacity: 200,
    floor_level: 0,
    is_quiet_zone: false,
    has_power: true,
    is_accessible: true,
    created_at: '2026-01-01T00:00:00Z',
    ...overrides,
  }
}

function makeZoneOccupancy(overrides: Partial<ZoneOccupancy> = {}): ZoneOccupancy {
  return {
    zone_id: 'zone-1',
    building_id: 'building-1',
    occupancy_count: 50,
    occupancy_pct: 25,
    trend: 'stable',
    prev_pct: 20,
    last_updated: new Date(NOW.getTime() - 10_000).toISOString(), // 10s ago = fresh
    data_quality: 'live',
    ...overrides,
  }
}

function makeGoogleCache(overrides: Partial<GooglePopularityCache> = {}): GooglePopularityCache {
  return {
    building_id: 'building-1',
    current_popularity: 55,
    is_open_now: true,
    synced_at: new Date(NOW.getTime() - 60_000).toISOString(), // 1 min ago
    ...overrides,
  }
}

function makePrediction(overrides: Partial<OccupancyPrediction> = {}): OccupancyPrediction {
  return {
    id: 'pred-1',
    building_id: 'building-1',
    day_of_week: 3,
    hour_of_day: 12,
    predicted_pct: 60,
    confidence: 'medium',
    sample_count: 28,
    data_source: 'pulse',
    computed_at: '2026-03-18T00:00:00Z',
    ...overrides,
  }
}

function makeGoogleTypical(overrides: Partial<GooglePopularTime> = {}): GooglePopularTime {
  return {
    building_id: 'building-1',
    day_of_week: 3,
    hour_of_day: 12,
    typical_popularity: 45,
    seeded_at: '2026-03-01T00:00:00Z',
    ...overrides,
  }
}

// ── isDataFresh ──────────────────────────────────────────────────────

describe('isDataFresh', () => {
  it('returns true when data is within threshold', () => {
    const timestamp = new Date(NOW.getTime() - 30_000).toISOString() // 30s ago
    expect(isDataFresh(timestamp, 60_000, NOW)).toBe(true)
  })

  it('returns false when data exceeds threshold', () => {
    const timestamp = new Date(NOW.getTime() - 120_000).toISOString() // 2 min ago
    expect(isDataFresh(timestamp, 60_000, NOW)).toBe(false)
  })

  it('returns false for future timestamps', () => {
    const timestamp = new Date(NOW.getTime() + 10_000).toISOString()
    expect(isDataFresh(timestamp, 60_000, NOW)).toBe(false)
  })
})

// ── determineTrend ───────────────────────────────────────────────────

describe('determineTrend', () => {
  it('returns stable for empty array', () => {
    expect(determineTrend([])).toBe('stable')
  })

  it('returns filling when majority is filling', () => {
    const zones = [
      makeZoneOccupancy({ trend: 'filling' }),
      makeZoneOccupancy({ trend: 'filling' }),
      makeZoneOccupancy({ trend: 'stable' }),
    ]
    expect(determineTrend(zones)).toBe('filling')
  })

  it('returns emptying when majority is emptying', () => {
    const zones = [
      makeZoneOccupancy({ trend: 'emptying' }),
      makeZoneOccupancy({ trend: 'emptying' }),
      makeZoneOccupancy({ trend: 'filling' }),
    ]
    expect(determineTrend(zones)).toBe('emptying')
  })

  it('returns stable on tie', () => {
    const zones = [
      makeZoneOccupancy({ trend: 'filling' }),
      makeZoneOccupancy({ trend: 'emptying' }),
    ]
    expect(determineTrend(zones)).toBe('stable')
  })
})

// ── aggregateZoneOccupancies ─────────────────────────────────────────

describe('aggregateZoneOccupancies', () => {
  it('computes capacity-weighted average correctly', () => {
    const zones = [
      makeZone({ id: 'z1', capacity: 200 }),
      makeZone({ id: 'z2', capacity: 100 }),
    ]
    const occupancies = [
      makeZoneOccupancy({ zone_id: 'z1', occupancy_pct: 50 }),
      makeZoneOccupancy({ zone_id: 'z2', occupancy_pct: 80 }),
    ]
    // (50*200 + 80*100) / (200+100) = 18000/300 = 60
    const result = aggregateZoneOccupancies(zones, occupancies)
    expect(result.pct).toBe(60)
  })

  it('returns floor breakdown with correct data', () => {
    const zones = [
      makeZone({ id: 'z1', floor_level: 0, zone_name: 'Ground Floor' }),
      makeZone({ id: 'z2', floor_level: 1, zone_name: 'Level 1' }),
    ]
    const occupancies = [
      makeZoneOccupancy({ zone_id: 'z1', occupancy_pct: 40, trend: 'filling' }),
      makeZoneOccupancy({ zone_id: 'z2', occupancy_pct: 70, trend: 'stable' }),
    ]
    const result = aggregateZoneOccupancies(zones, occupancies)
    expect(result.floorBreakdown).toHaveLength(2)
    expect(result.floorBreakdown[0]).toMatchObject({
      zone_id: 'z1',
      floor_level: 0,
      zone_name: 'Ground Floor',
      occupancy_pct: 40,
      trend: 'filling',
    })
  })

  it('handles zones with null capacity using default weight', () => {
    const zones = [
      makeZone({ id: 'z1', capacity: null }),
      makeZone({ id: 'z2', capacity: null }),
    ]
    const occupancies = [
      makeZoneOccupancy({ zone_id: 'z1', occupancy_pct: 40 }),
      makeZoneOccupancy({ zone_id: 'z2', occupancy_pct: 60 }),
    ]
    // Both default to 100: (40*100 + 60*100) / 200 = 50
    const result = aggregateZoneOccupancies(zones, occupancies)
    expect(result.pct).toBe(50)
  })

  it('skips zones without occupancy data', () => {
    const zones = [
      makeZone({ id: 'z1', capacity: 200 }),
      makeZone({ id: 'z2', capacity: 100 }),
    ]
    const occupancies = [
      makeZoneOccupancy({ zone_id: 'z1', occupancy_pct: 50 }),
      // z2 has no occupancy
    ]
    const result = aggregateZoneOccupancies(zones, occupancies)
    expect(result.pct).toBe(50)
    expect(result.floorBreakdown).toHaveLength(1)
  })
})

// ── blendOccupancy ───────────────────────────────────────────────────

describe('blendOccupancy', () => {
  it('picks live data when all sources available', () => {
    const input: BlendingInput = {
      zoneOccupancies: [makeZoneOccupancy()],
      zones: [makeZone()],
      googleCache: makeGoogleCache(),
      prediction: makePrediction(),
      googleTypical: makeGoogleTypical(),
      now: NOW,
    }
    const result = blendOccupancy(input)
    expect(result.source).toBe('live')
    expect(result.pct).toBe(25)
    expect(result.floor_occupancies).toHaveLength(1)
  })

  it('falls back to Google cache when live data is stale', () => {
    const staleTimestamp = new Date(NOW.getTime() - 120_000).toISOString() // 2 min ago
    const input: BlendingInput = {
      zoneOccupancies: [makeZoneOccupancy({ last_updated: staleTimestamp })],
      zones: [makeZone()],
      googleCache: makeGoogleCache({ current_popularity: 55 }),
      prediction: makePrediction(),
      googleTypical: makeGoogleTypical(),
      now: NOW,
    }
    const result = blendOccupancy(input)
    expect(result.source).toBe('google')
    expect(result.pct).toBe(55)
  })

  it('falls back to prediction when no Google cache', () => {
    const staleTimestamp = new Date(NOW.getTime() - 120_000).toISOString()
    const input: BlendingInput = {
      zoneOccupancies: [makeZoneOccupancy({ last_updated: staleTimestamp })],
      zones: [makeZone()],
      googleCache: null,
      prediction: makePrediction({ predicted_pct: 60 }),
      googleTypical: makeGoogleTypical(),
      now: NOW,
    }
    const result = blendOccupancy(input)
    expect(result.source).toBe('predicted')
    expect(result.pct).toBe(60)
  })

  it('falls back to Google typical when no prediction', () => {
    const staleTimestamp = new Date(NOW.getTime() - 120_000).toISOString()
    const input: BlendingInput = {
      zoneOccupancies: [makeZoneOccupancy({ last_updated: staleTimestamp })],
      zones: [makeZone()],
      googleCache: null,
      prediction: null,
      googleTypical: makeGoogleTypical({ typical_popularity: 45 }),
      now: NOW,
    }
    const result = blendOccupancy(input)
    expect(result.source).toBe('google')
    expect(result.pct).toBe(45)
  })

  it('returns none when no data available', () => {
    const input: BlendingInput = {
      zoneOccupancies: [],
      zones: [],
      googleCache: null,
      prediction: null,
      googleTypical: null,
      now: NOW,
    }
    const result = blendOccupancy(input)
    expect(result.source).toBe('none')
    expect(result.pct).toBeNull()
    expect(result.floor_occupancies).toHaveLength(0)
  })

  it('skips Google cache when current_popularity is null', () => {
    const staleTimestamp = new Date(NOW.getTime() - 120_000).toISOString()
    const input: BlendingInput = {
      zoneOccupancies: [makeZoneOccupancy({ last_updated: staleTimestamp })],
      zones: [makeZone()],
      googleCache: makeGoogleCache({ current_popularity: null }),
      prediction: makePrediction({ predicted_pct: 60 }),
      googleTypical: null,
      now: NOW,
    }
    const result = blendOccupancy(input)
    expect(result.source).toBe('predicted')
    expect(result.pct).toBe(60)
  })

  it('skips stale Google cache', () => {
    const staleTimestamp = new Date(NOW.getTime() - 120_000).toISOString()
    const staleCacheTimestamp = new Date(NOW.getTime() - 60 * 60 * 1000).toISOString() // 1hr ago
    const input: BlendingInput = {
      zoneOccupancies: [makeZoneOccupancy({ last_updated: staleTimestamp })],
      zones: [makeZone()],
      googleCache: makeGoogleCache({ synced_at: staleCacheTimestamp }),
      prediction: makePrediction({ predicted_pct: 60 }),
      googleTypical: null,
      now: NOW,
    }
    const result = blendOccupancy(input)
    expect(result.source).toBe('predicted')
  })

  it('handles empty zone occupancies array by falling through', () => {
    const input: BlendingInput = {
      zoneOccupancies: [],
      zones: [makeZone()],
      googleCache: null,
      prediction: null,
      googleTypical: makeGoogleTypical({ typical_popularity: 30 }),
      now: NOW,
    }
    const result = blendOccupancy(input)
    expect(result.source).toBe('google')
    expect(result.pct).toBe(30)
  })

  it('computes correct weighted average with multiple zones', () => {
    const zones = [
      makeZone({ id: 'z1', capacity: 200, floor_level: 0, zone_name: 'Ground' }),
      makeZone({ id: 'z2', capacity: 100, floor_level: 1, zone_name: 'Level 1' }),
    ]
    const fresh = new Date(NOW.getTime() - 5_000).toISOString()
    const occupancies = [
      makeZoneOccupancy({ zone_id: 'z1', occupancy_pct: 50, last_updated: fresh }),
      makeZoneOccupancy({ zone_id: 'z2', occupancy_pct: 80, last_updated: fresh }),
    ]
    const input: BlendingInput = {
      zoneOccupancies: occupancies,
      zones,
      googleCache: null,
      prediction: null,
      googleTypical: null,
      now: NOW,
    }
    const result = blendOccupancy(input)
    expect(result.source).toBe('live')
    // (50*200 + 80*100) / 300 = 60
    expect(result.pct).toBe(60)
    expect(result.floor_occupancies).toHaveLength(2)
  })
})
