-- ============================================================================
-- 019 — Rooms: allow "unknown"
--
-- Runs before seed 006, which fills the room directory from the University's
-- own campus map.
--
-- SOURCE:    https://maps.unimelb.edu.au/parkville
--            https://learningspaces.unimelb.edu.au/room-search
-- RETRIEVED: 2026-08-15
--
-- That seed can supply four things and only four: the room
-- code, the floor it is on, what kind of space it is, and its name where the
-- map gives one.
--
-- It cannot supply these three:
--
--   has_power      — the campus map records no power data for rooms
--   is_bookable    — the campus map records no booking data for rooms
--   is_accessible  — the campus map records accessible *toilets* and lifts,
--                    and two named accessible *entrances*, but says nothing
--                    about any individual room
--
-- All three are BOOLEAN NOT NULL DEFAULT FALSE. Seeding 890 rooms against that
-- schema would write `false` 2,670 times, and every one of those would be a
-- claim this project has no source for. `is_accessible` is the same column
-- class that migration 018 already had to rescue on `buildings`: RoomList
-- renders an "[A] — step-free access" marker from it, so a wrong value is
-- read by exactly the person it hurts.
--
-- Same fix, same reasoning as 018: NULL means nobody has checked.
-- ============================================================================

ALTER TABLE rooms ALTER COLUMN has_power     DROP DEFAULT;
ALTER TABLE rooms ALTER COLUMN is_bookable   DROP DEFAULT;
ALTER TABLE rooms ALTER COLUMN is_accessible DROP DEFAULT;

ALTER TABLE rooms ALTER COLUMN has_power     DROP NOT NULL;
ALTER TABLE rooms ALTER COLUMN is_bookable   DROP NOT NULL;
ALTER TABLE rooms ALTER COLUMN is_accessible DROP NOT NULL;

COMMENT ON COLUMN rooms.has_power IS
  'NULL = not verified against a published source. Never guess this column.';
COMMENT ON COLUMN rooms.is_bookable IS
  'NULL = not verified against a published source. Never guess this column.';
COMMENT ON COLUMN rooms.is_accessible IS
  'NULL = not verified against a published source. Never guess this column.';

COMMENT ON COLUMN rooms.capacity IS
  'NULL = not verified. The campus map exposes a peopleCapacity field but it is '
  'empty for every Parkville room checked on 2026-08-15, so no capacity is seeded. '
  'UoM publishes capacities in Room Search (learningspaces.unimelb.edu.au/room-search), '
  'which is a POST form behind bot protection and could not be read programmatically.';

-- Any room already seeded under the old defaults is reset to unverified, so a
-- row added before this migration does not keep a confident false.
UPDATE rooms SET
  has_power     = NULL,
  is_bookable   = NULL,
  is_accessible = NULL;
