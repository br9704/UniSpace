import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { SEED_BUILDINGS } from './seedData.generated'
import type { RoomType } from '@/types'

const ROOT = resolve(__dirname, '../../..')
const SEED_DIR = resolve(ROOT, 'supabase/seed')
const MIGRATION_DIR = resolve(ROOT, 'supabase/migrations')

const ROOMS_SEED = resolve(SEED_DIR, '006_rooms_uom_campus_map.sql')

const ROOM_TYPES: RoomType[] = [
  'lecture', 'tutorial', 'lab', 'study', 'meeting', 'library', 'other',
]

interface SeededRoom {
  slug: string
  code: string
  name: string | null
  floorLevel: number
  roomType: string
}

/**
 * Parse the room rows out of seed 006.
 *
 * Deliberately a separate, dumber parser than `scripts/parseSeedSql.mjs`: that
 * one exists to *build* the fixture layer, this one exists to *audit* the
 * committed SQL. If both used the same code, a bug in the parser would make the
 * SQL and the assertion agree while both were wrong.
 */
function parseRooms(sql: string): SeededRoom[] {
  const rows: SeededRoom[] = []
  const pattern =
    /^\s*\('([a-z0-9-]+)',\s*'([^']*)',\s*(NULL(?:::text)?|'(?:[^']|'')*'),\s*(-?\d+),\s*'(\w+)'\),?\s*$/
  for (const line of sql.split('\n')) {
    const m = pattern.exec(line)
    if (!m) continue
    rows.push({
      slug: m[1],
      code: m[2],
      name: m[3].startsWith('NULL') ? null : m[3].slice(1, -1).replace(/''/g, "'"),
      floorLevel: Number(m[4]),
      roomType: m[5],
    })
  }
  return rows
}

const ROOMS = parseRooms(readFileSync(ROOMS_SEED, 'utf8'))

/**
 * The room directory is reference data a student navigates by. A wrong floor
 * sends someone to the wrong part of a building; a room attached to the wrong
 * building sends them to the wrong building entirely. These pin the shape of
 * what was committed against the schema in `015_rooms.sql`.
 */
describe('seeded room directory', () => {
  it('seeds rooms at all', () => {
    // The UI renders nothing until this table has data, so an empty seed would
    // fail silently rather than visibly.
    expect(ROOMS.length).toBeGreaterThan(0)
  })

  it('attaches every room to a building that exists', () => {
    const slugs = new Set(SEED_BUILDINGS.map((b) => b.slug))
    for (const room of ROOMS) {
      expect(slugs.has(room.slug), `${room.slug} ${room.code}: unknown building`).toBe(true)
    }
  })

  it('uses only room types the CHECK constraint allows', () => {
    // 015_rooms.sql constrains room_type. A value outside it fails at insert
    // time against the real database but would pass unnoticed in review.
    for (const room of ROOMS) {
      expect(ROOM_TYPES, `${room.slug} ${room.code}`).toContain(room.roomType)
    }
  })

  it('keeps room codes unique within a building', () => {
    // 015_rooms.sql declares UNIQUE (building_id, code); a duplicate would abort
    // the whole seed.
    const seen = new Set<string>()
    for (const room of ROOMS) {
      const key = `${room.slug}/${room.code}`
      expect(seen.has(key), `duplicate ${key}`).toBe(false)
      seen.add(key)
    }
  })

  it('uses whole-number floor levels within a plausible range', () => {
    // RoomList renders these directly as "GROUND" / "LEVEL n" / "BASEMENT n".
    // Mezzanine and upper-ground floors are dropped by the seed rather than
    // rounded, because guessing puts a student on the wrong floor.
    for (const room of ROOMS) {
      expect(Number.isInteger(room.floorLevel), `${room.slug} ${room.code}`).toBe(true)
      expect(room.floorLevel, `${room.slug} ${room.code}`).toBeGreaterThanOrEqual(-2)
      expect(room.floorLevel, `${room.slug} ${room.code}`).toBeLessThanOrEqual(20)
    }
  })

  it('never uses a room name as its code', () => {
    // The code is what a timetable prints and what is on the door — searching
    // "101" has to find Redmond Barry's Lyle Theatre. A descriptive title in the
    // code column would break the one feature this table exists for.
    for (const room of ROOMS) {
      expect(room.code, `${room.slug}: code looks like a name`).not.toMatch(/\s/)
    }
  })

  it('finds Redmond Barry 101 and knows it is the Lyle Theatre', () => {
    // The worked example from 015_rooms.sql's own header.
    const room = ROOMS.find((r) => r.slug === 'redmond-barry' && r.code === '101')
    expect(room).toBeDefined()
    expect(room!.name).toContain('LYLE')
    expect(room!.roomType).toBe('lecture')
  })

  it('says nothing about a building it could not identify', () => {
    // Seed 001 names this building in a way UoM does not publish, so it could
    // not be matched to the campus map with any confidence. No rooms is the
    // honest output; RoomList renders nothing for it.
    expect(ROOMS.filter((r) => r.slug === 'engineering-1')).toHaveLength(0)
  })
})

/**
 * The rule migrations 018 and 019 exist to enforce: a boolean about
 * accessibility, power or bookability is a claim in both directions. `true`
 * needs a source and so does `false`. NULL is the only honest value for
 * "nobody has checked", and nothing committed may quietly assert otherwise.
 */
describe('committed SQL never asserts an unsourced negative', () => {
  const GUARDED_COLUMNS = [
    'is_ground_floor_accessible',
    'has_elevator',
    'has_accessible_bathrooms',
    'has_accessible_parking',
    'is_accessible',
    'has_power',
    'is_bookable',
  ]

  function sqlFiles(): { path: string; sql: string }[] {
    const files: { path: string; sql: string }[] = []
    for (const [dir, names] of [
      [SEED_DIR, readdirSync(SEED_DIR)],
      [MIGRATION_DIR, readdirSync(MIGRATION_DIR)],
    ] as const) {
      for (const name of names) {
        if (!name.endsWith('.sql')) continue
        files.push({ path: `${dir}/${name}`, sql: readFileSync(resolve(dir, name), 'utf8') })
      }
    }
    return files
  }

  /** Strip `--` comments so prose about `false` is not mistaken for SQL. */
  function stripComments(sql: string): string {
    return sql
      .split('\n')
      .map((line) => {
        let inString = false
        for (let i = 0; i < line.length; i++) {
          if (line[i] === "'") {
            if (inString && line[i + 1] === "'") i++
            else inString = !inString
          } else if (!inString && line[i] === '-' && line[i + 1] === '-') {
            return line.slice(0, i)
          }
        }
        return line
      })
      .join('\n')
  }

  it('never writes a guarded accessibility column false in an UPDATE', () => {
    for (const { path, sql } of sqlFiles()) {
      const clean = stripComments(sql)
      for (const column of GUARDED_COLUMNS) {
        const assignment = new RegExp(`\\b${column}\\s*=\\s*false\\b`, 'i')
        expect(assignment.test(clean), `${path} sets ${column} = false`).toBe(false)
      }
    }
  })

  it('leaves the room honesty columns out of the room seed entirely', () => {
    // Naming them at all in the INSERT would mean supplying a value, and no
    // source supplies one. Migration 019 makes the columns nullable so their
    // absence lands as NULL rather than as a confident false.
    const clean = stripComments(readFileSync(ROOMS_SEED, 'utf8'))
    for (const column of ['has_power', 'is_bookable', 'is_accessible']) {
      expect(clean, `006 mentions ${column}`).not.toContain(column)
    }
  })

  it('has a migration that makes the room honesty columns nullable', () => {
    // Without this the seed silently writes `false` once per room per column.
    const sql = readFileSync(resolve(MIGRATION_DIR, '019_rooms_unknown.sql'), 'utf8')
    for (const column of ['has_power', 'is_bookable', 'is_accessible']) {
      expect(sql).toMatch(
        new RegExp(`ALTER\\s+COLUMN\\s+${column}\\s+DROP\\s+NOT\\s+NULL`, 'i'),
      )
      expect(sql).toMatch(new RegExp(`ALTER\\s+COLUMN\\s+${column}\\s+DROP\\s+DEFAULT`, 'i'))
    }
  })

  it('records a source URL and a retrieval date in every new data file', () => {
    // The project's rule: no value is committed without saying where it came
    // from and when. These four are the files this sprint added.
    const NEW_FILES = [
      resolve(MIGRATION_DIR, '019_rooms_unknown.sql'),
      resolve(MIGRATION_DIR, '020_hours_provenance.sql'),
      resolve(SEED_DIR, '006_rooms_uom_campus_map.sql'),
      resolve(SEED_DIR, '007_verified_accessibility_campus_map.sql'),
    ]
    for (const path of NEW_FILES) {
      const sql = readFileSync(path, 'utf8')
      expect(sql, `${path} cites no source`).toMatch(/https?:\/\/\S*unimelb\.edu\.au/)
      expect(sql, `${path} records no retrieval date`).toMatch(/\b20\d\d-\d\d-\d\d\b/)
    }
  })
})
