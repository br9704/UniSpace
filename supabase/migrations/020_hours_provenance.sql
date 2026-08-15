-- ============================================================================
-- 020 — Opening hours: re-verification and provenance (S24.6)
--
-- SOURCES:
--   https://library.unimelb.edu.au/library-locations-and-opening-hours
--   https://students.unimelb.edu.au/your-course/manage-your-course/key-dates
-- RETRIEVED: 2026-08-15
--
-- This migration changes no hours. It records a re-check, and it writes the
-- caveat into the schema so it is visible to anyone reading the database rather
-- than only to anyone reading migration 017.
--
-- ── 1. The five verified buildings were re-read, and are unchanged ──────────
--
-- Migration 017 set hours for baillieu-library, erc-library, law-school,
-- fbe-building and melbourne-school-of-design from the library hours table on
-- 2026-08-14. That table was read again on 2026-08-15 and every value still
-- matches:
--
--   Baillieu / ERC / Law / Giblin Eunson (FBE)
--     Mon-Thu 9am-8pm · Fri 9am-5pm · Sat 11am-5pm · Sun 10am-5pm
--   Architecture, Building and Planning (MSD)
--     Mon-Thu 9am-7pm · Fri 9am-5pm · Sat 1pm-5pm · Sun 10am-4pm
--
-- ── 2. 017's caveat is confirmed, and now has exact dates ───────────────────
--
-- The source is still a *current week* table, headed "Aug 10 Monday … Aug 16
-- Sunday". Against UoM's published 2026 key dates, that week sits inside:
--
--   Semester 2 teaching        Mon 27 July  – Sun 25 October  (12 teaching weeks)
--   Semester 2 non-teaching    Mon 28 September – Sun 4 October
--   Examinations               Mon 2 November – Fri 20 November
--
-- So the committed hours are Semester 2 teaching-week hours, and they are
-- specifically NOT known to hold from Mon 28 September, nor after Sun 25
-- October, nor over the summer, nor on public holidays. No source was found
-- that publishes hours for those periods in advance — the library table shows
-- one week at a time and is driven by a booking widget that could not be read
-- for a future date.
--
-- ── 3. A new caveat found on the re-read ────────────────────────────────────
--
-- The Baillieu Library After Hours Study Zone is not running its usual
-- 7am-12am this week: the table reads "After Hours Zone closed due to building
-- redevelopment" on Friday, and "11am – 12am Morning After Hours Zone closed
-- due to building redevelopment" on Saturday. 017 deliberately did not use the
-- after-hours zone as the building's hours, so nothing committed is wrong — but
-- anyone who later decides to surface after-hours zones should know the
-- Baillieu's is currently disrupted.
--
-- ── 4. The other 13 buildings still have no source ──────────────────────────
--
-- Their hours remain the invented values seeded in 001 and 003
-- (07:30-21:00 Mon-Thu, 07:30-18:00 Fri, closed weekends). Nothing here fixes
-- that, because nothing published fixes it. What was checked on 2026-08-15:
--
--   * library.unimelb.edu.au opening hours — libraries only.
--   * ask.unimelb.edu.au FAQ 5698 "Building Access" — about student-card
--     access and replacement cards; states no building opening hours. The page
--     also carries a banner saying ask.unimelb is being retired.
--   * unimelb.edu.au/campustour/campus-information and its child pages — maps,
--     transport, food, facilities; no building hours.
--   * maps.unimelb.edu.au / its public API — building outlines, floors and
--     facility points; carries no opening-hours field.
--   * learningspaces.unimelb.edu.au/room-search — rooms, capacity and AV; no
--     opening hours, and behind bot protection in any case.
--
--   Faculty pages do publish card-access windows, e.g. Melbourne School of
--   Design's states "BN133 Glyn Davis Building: 7 am – 11 pm" for Bachelor of
--   Design and MSD students
--   (https://msd.unimelb.edu.au/current-students/student-experience/access-and-id-cards).
--   That is deliberately NOT used. It is the window in which one faculty's
--   student card opens the door, not the window in which the building is open
--   to a student walking up to it — and 017 already rejected exactly this class
--   of value for the library after-hours zones, on the grounds that telling
--   someone a building is "open" when only swipe access is available is the
--   same kind of error as wrong accessibility data.
--
-- Building hours therefore remain a maintained field (PRD Q8) with a
-- 13-building gap, and the in-app "report an error" path (S25) is the
-- correction mechanism.
-- ============================================================================

COMMENT ON COLUMN buildings.hours_mon IS
  'Semester 2 2026 teaching-week hours, verified 2026-08-15 for the 5 library '
  'buildings only (source: library.unimelb.edu.au current-week table). The other '
  '13 buildings hold unverified seeded values. Not valid during the non-teaching '
  'period, exams, summer or public holidays. See migrations 017 and 020.';
COMMENT ON COLUMN buildings.hours_tue IS 'See buildings.hours_mon.';
COMMENT ON COLUMN buildings.hours_wed IS 'See buildings.hours_mon.';
COMMENT ON COLUMN buildings.hours_thu IS 'See buildings.hours_mon.';
COMMENT ON COLUMN buildings.hours_fri IS 'See buildings.hours_mon.';
COMMENT ON COLUMN buildings.hours_sat IS 'See buildings.hours_mon.';
COMMENT ON COLUMN buildings.hours_sun IS 'See buildings.hours_mon.';
