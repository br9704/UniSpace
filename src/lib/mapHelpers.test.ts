import { describe, expect, it } from 'vitest'
import { buildingsToFeatureCollection } from './mapHelpers'
import type { Building } from '@/types'

function makeBuilding(overrides: Partial<Building> = {}): Building {
  return {
    id: 'b-1',
    campus_id: 'c-1',
    slug: 'test-building',
    name: 'Test Building',
    short_name: 'Test',
    estimated_capacity: 200,
    entrance_lat: -37.798,
    entrance_lng: 144.960,
    centroid_lat: -37.798,
    centroid_lng: 144.960,
    polygon: {
      type: 'Polygon',
      coordinates: [[[144.959, -37.797], [144.961, -37.797], [144.961, -37.799], [144.959, -37.799], [144.959, -37.797]]],
    },
    google_place_id: null,
    has_wifi: true,
    has_power: false,
    has_food_nearby: false,
    has_quiet_zone: false,
    has_group_seating: false,
    is_ground_floor_accessible: false,
    has_elevator: false,
    has_accessible_bathrooms: false,
    has_accessible_parking: false,
    hours_mon: null,
    hours_tue: null,
    hours_wed: null,
    hours_thu: null,
    hours_fri: null,
    hours_sat: null,
    hours_sun: null,
    hours_source: null, hours_verified_on: null, hours_period: null,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
    ...overrides,
  }
}

describe('buildingsToFeatureCollection', () => {
  it('returns empty FeatureCollection for empty array', () => {
    const result = buildingsToFeatureCollection([])
    expect(result.type).toBe('FeatureCollection')
    expect(result.features).toHaveLength(0)
  })

  it('filters out buildings with null polygon', () => {
    const buildings = [
      makeBuilding({ id: 'b-1' }),
      makeBuilding({ id: 'b-2', polygon: null }),
    ]
    const result = buildingsToFeatureCollection(buildings)
    expect(result.features).toHaveLength(1)
    expect(result.features[0].properties.id).toBe('b-1')
  })

  it('maps properties correctly', () => {
    const building = makeBuilding({
      id: 'b-test',
      name: 'Baillieu Library',
      short_name: 'Baillieu',
      slug: 'baillieu-library',
    })
    const result = buildingsToFeatureCollection([building])
    const props = result.features[0].properties
    expect(props).toEqual({
      id: 'b-test',
      name: 'Baillieu Library',
      shortName: 'Baillieu',
      slug: 'baillieu-library',
      occupancy_pct: null,
    })
  })

  it('produces valid GeoJSON structure', () => {
    const result = buildingsToFeatureCollection([makeBuilding()])
    expect(result.type).toBe('FeatureCollection')
    expect(result.features[0].type).toBe('Feature')
    expect(result.features[0].geometry.type).toBe('Polygon')
    expect(Array.isArray(result.features[0].geometry.coordinates)).toBe(true)
  })
})
