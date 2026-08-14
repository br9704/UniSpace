-- ============================================================================
-- 015 — Rooms
--
-- S24. Cross-building room search is the one thing UniMelb's own map does that
-- this app cannot: a student told to go to "Redmond Barry 101" has no way to
-- find out where that is from here.
--
-- Rooms are static reference data — a seeded directory, not live occupancy.
-- Room-level occupancy is deliberately out of scope: PRD § 13.4 caps
-- granularity at floor level specifically so an individual cannot be located,
-- and a room with three seats would defeat that.
-- ============================================================================

CREATE TABLE IF NOT EXISTS rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  building_id UUID NOT NULL REFERENCES buildings(id) ON DELETE CASCADE,

  -- As printed on the door and in timetables — "101", "G12", "Reading Room".
  code TEXT NOT NULL,
  name TEXT,

  floor_level INTEGER NOT NULL DEFAULT 0,
  room_type TEXT NOT NULL CHECK (
    room_type IN ('lecture', 'tutorial', 'lab', 'study', 'meeting', 'library', 'other')
  ),
  capacity INTEGER,

  has_power BOOLEAN NOT NULL DEFAULT FALSE,
  is_bookable BOOLEAN NOT NULL DEFAULT FALSE,
  is_accessible BOOLEAN NOT NULL DEFAULT FALSE,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Codes repeat across campus: every building has a room 101.
  UNIQUE (building_id, code)
);

-- Search is by code across all buildings, so that is the index that matters.
CREATE INDEX IF NOT EXISTS idx_rooms_code ON rooms (lower(code));
CREATE INDEX IF NOT EXISTS idx_rooms_building_floor ON rooms (building_id, floor_level);

ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;

-- Same posture as every other table: anyone may read, only the service role
-- may write. Rooms are public information about a public campus.
DROP POLICY IF EXISTS "rooms are publicly readable" ON rooms;
CREATE POLICY "rooms are publicly readable"
  ON rooms FOR SELECT
  TO anon, authenticated
  USING (true);
