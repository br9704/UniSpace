import { describe, it, expect } from 'vitest'
import { searchRooms } from './useRooms'
import type { Room } from '@/types'

function room(overrides: Partial<Room> = {}): Room {
  return {
    id: crypto.randomUUID(),
    building_id: 'b1',
    code: '101',
    name: null,
    floor_level: 1,
    room_type: 'tutorial',
    capacity: 30,
    has_power: true,
    is_bookable: false,
    is_accessible: false,
    created_at: '2026-01-01T00:00:00Z',
    ...overrides,
  }
}

describe('searchRooms', () => {
  const rooms = [
    room({ code: '101', building_id: 'redmond-barry' }),
    room({ code: '101', building_id: 'old-arts' }),
    room({ code: '1011', building_id: 'ict' }),
    room({ code: 'G12', building_id: 'baillieu' }),
    room({ code: 'B1', name: 'Reading Room', building_id: 'baillieu' }),
  ]

  it('finds the same room code across different buildings', () => {
    // The whole point: "go to room 101" is ambiguous, and the app should say so
    // by showing both rather than guessing.
    const results = searchRooms(rooms, '101')
    const buildings = results.filter((r) => r.code === '101').map((r) => r.building_id)
    expect(buildings).toContain('redmond-barry')
    expect(buildings).toContain('old-arts')
  })

  it('ranks exact code matches above prefix matches', () => {
    // Searching "101" should not bury room 101 under room 1011.
    const results = searchRooms(rooms, '101')
    expect(results[0].code).toBe('101')
    expect(results[1].code).toBe('101')
  })

  it('matches a room by name as well as by code', () => {
    expect(searchRooms(rooms, 'reading').map((r) => r.code)).toEqual(['B1'])
  })

  it('is case-insensitive', () => {
    expect(searchRooms(rooms, 'g12')).toHaveLength(1)
    expect(searchRooms(rooms, 'G12')).toHaveLength(1)
  })

  it('ignores queries too short to be meaningful', () => {
    // A single character matches most of a campus; showing that is noise.
    expect(searchRooms(rooms, '1')).toEqual([])
    expect(searchRooms(rooms, '')).toEqual([])
  })

  it('ignores surrounding whitespace', () => {
    expect(searchRooms(rooms, '  G12  ')).toHaveLength(1)
  })

  it('caps the number of results', () => {
    const many = Array.from({ length: 50 }, (_, i) => room({ code: `20${i}` }))
    expect(searchRooms(many, '20').length).toBeLessThanOrEqual(8)
  })

  it('returns nothing when the directory is empty', () => {
    // The seeded state today. Consumers must treat this as "no directory"
    // rather than as an error.
    expect(searchRooms([], '101')).toEqual([])
  })
})
