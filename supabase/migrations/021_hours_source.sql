-- ============================================================================
-- 021 — Opening hours: make "unverified" queryable
--
-- SOURCES:
--   https://library.unimelb.edu.au/library-locations-and-opening-hours
--   https://students.unimelb.edu.au/your-course/manage-your-course/key-dates
-- RETRIEVED: 2026-08-15
--
-- Migration 020 recorded that only 5 of the 18 buildings have published hours
-- and that the other 13 still carry the values invented in seeds 001 and 003.
-- It recorded that in COMMENT ON COLUMN, which no client can read — so the app
-- still renders a flat OPEN or CLOSED for all 18, stating as fact something it
-- knows for only five of them.
--
-- This is the same defect migration 018 fixed for accessibility: a two-state
-- model where the true third answer is "nobody has checked". Same remedy, same
-- convention — NULL means unverified.
--
--   hours_source       NULL = the hours in hours_mon..hours_sun are not backed
--                      by any published source. Non-NULL = the URL they came
--                      from.
--   hours_verified_on  NULL = never verified. Otherwise the date that URL was
--                      read. Hours go stale; this is what lets the UI say how
--                      stale rather than implying they are current.
--   hours_period       NULL = unverified. Otherwise a plain statement of the
--                      period the hours are known to hold for, and by omission
--                      the periods they are not.
--
-- hours_period is deliberately one text field rather than a valid_from /
-- valid_to pair. The source is a *current week* table: it says what this week
-- is, not what next term will be. A date range would imply the University has
-- published a range, and it has not. What is known is exactly the sentence
-- stored below, so that sentence is what is stored.
--
-- The CHECK is the schema-level form of the rule: provenance without a source
-- is not provenance. You cannot record a verification date or a validity period
-- for hours that have no published source.
-- ============================================================================

ALTER TABLE buildings ADD COLUMN IF NOT EXISTS hours_source      TEXT;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS hours_verified_on DATE;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS hours_period      TEXT;

COMMENT ON COLUMN buildings.hours_source IS
  'NULL = hours_mon..hours_sun are NOT backed by a published source and must not '
  'be presented as fact. Non-NULL = the URL they were read from. Never guess.';
COMMENT ON COLUMN buildings.hours_verified_on IS
  'Date hours_source was last read. NULL when hours_source is NULL.';
COMMENT ON COLUMN buildings.hours_period IS
  'Plain statement of the period the verified hours are known to hold for. '
  'NULL when hours_source is NULL.';

ALTER TABLE buildings DROP CONSTRAINT IF EXISTS hours_provenance_needs_a_source;
ALTER TABLE buildings ADD CONSTRAINT hours_provenance_needs_a_source CHECK (
  hours_source IS NOT NULL
  OR (hours_verified_on IS NULL AND hours_period IS NULL)
);

-- Start every building unverified. Seed 008 then restores only the five whose
-- hours migration 017 took from a published page. Doing it in this order means
-- a building added later starts as unverified rather than inheriting someone
-- else's provenance.
UPDATE buildings SET
  hours_source      = NULL,
  hours_verified_on = NULL,
  hours_period      = NULL;
