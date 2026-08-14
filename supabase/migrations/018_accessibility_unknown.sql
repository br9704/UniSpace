-- ============================================================================
-- 018 — Accessibility: allow "unknown"
--
-- PRD § 13.4: "Accessibility data accuracy: Incorrect data is harmful."
--
-- Every accessibility flag in this database was invented. The columns are
-- BOOLEAN NOT NULL DEFAULT FALSE, which offers only two answers — "yes, step-free
-- access" and "no, none" — and both are claims. There was no way to say the one
-- thing that was actually true: nobody has checked.
--
-- That matters more here than anywhere else in the schema. PRD § 3.4's persona
-- uses a wheelchair and loses ten to fifteen minutes per failed trip. A
-- confident "accessible" that turns out to be wrong costs them that; a
-- confident "not accessible" may stop them going somewhere they could have
-- used. An honest "we don't know" costs them a phone call.
--
-- After this migration NULL means unverified, and the UI renders it as such
-- rather than as either answer.
-- ============================================================================

ALTER TABLE buildings ALTER COLUMN is_ground_floor_accessible DROP DEFAULT;
ALTER TABLE buildings ALTER COLUMN has_elevator               DROP DEFAULT;
ALTER TABLE buildings ALTER COLUMN has_accessible_bathrooms   DROP DEFAULT;
ALTER TABLE buildings ALTER COLUMN has_accessible_parking     DROP DEFAULT;

ALTER TABLE buildings ALTER COLUMN is_ground_floor_accessible DROP NOT NULL;
ALTER TABLE buildings ALTER COLUMN has_elevator               DROP NOT NULL;
ALTER TABLE buildings ALTER COLUMN has_accessible_bathrooms   DROP NOT NULL;
ALTER TABLE buildings ALTER COLUMN has_accessible_parking     DROP NOT NULL;

COMMENT ON COLUMN buildings.is_ground_floor_accessible IS
  'NULL = not verified against a published source. Never guess this column.';
COMMENT ON COLUMN buildings.has_elevator IS
  'NULL = not verified against a published source. Never guess this column.';
COMMENT ON COLUMN buildings.has_accessible_bathrooms IS
  'NULL = not verified against a published source. Never guess this column.';
COMMENT ON COLUMN buildings.has_accessible_parking IS
  'NULL = not verified against a published source. Never guess this column.';

-- Reset everything to unverified. Seed 005 then restores only what a source
-- supports. Doing it in this order means a building added later starts as
-- unknown rather than inheriting a confident default.
UPDATE buildings SET
  is_ground_floor_accessible = NULL,
  has_elevator               = NULL,
  has_accessible_bathrooms   = NULL,
  has_accessible_parking     = NULL;
