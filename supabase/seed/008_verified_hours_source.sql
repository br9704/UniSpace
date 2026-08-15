-- ============================================================================
-- 008 — Hours provenance
--
-- SOURCE:    https://library.unimelb.edu.au/library-locations-and-opening-hours
-- RETRIEVED: 2026-08-15
--
-- Fills the columns migration 021 added, for the five buildings — and only the
-- five buildings — whose hours migration 017 took from that page. The other 13
-- keep hours_source NULL, which is the whole point: it is the client-readable
-- signal that their 07:30-21:00 weekday hours are the invented values seeded in
-- 001 and 003 and must not be rendered as a confident OPEN or CLOSED.
--
-- Two of these five ARE a library (Baillieu, ERC). Three CONTAIN one and take
-- the library's hours as the building's, because "can I study there right now"
-- is the question this app answers — Melbourne Law School houses the Law
-- Library, the FBE Building houses Giblin Eunson, and the Melbourne School of
-- Design houses the Architecture, Building and Planning Library. That decision
-- is 017's; this seed only records where the numbers came from.
--
-- ── The period, and why it is a sentence ──
--
-- The source publishes one week at a time — the table read on both 2026-08-14
-- and 2026-08-15 was headed "Aug 10 Monday … Aug 16 Sunday". Against UoM's
-- published 2026 key dates
-- (https://students.unimelb.edu.au/your-course/manage-your-course/key-dates)
-- that week sits inside Semester 2 teaching, Mon 27 July – Sun 25 October, which
-- contains a non-teaching week Mon 28 September – Sun 4 October and is followed
-- by examinations Mon 2 – Fri 20 November.
--
-- So what is actually known is: these are teaching-week hours. Nothing published
-- says what they become during the non-teaching week, over exams, across summer
-- or on public holidays — the widget does not show a future week, and no
-- year-round table exists. hours_period says that and stops, rather than
-- implying a validity range the University never published.
-- ============================================================================

UPDATE buildings SET
  hours_source      = 'https://library.unimelb.edu.au/library-locations-and-opening-hours',
  hours_verified_on = '2026-08-15',
  hours_period      = 'Semester 2 2026 teaching weeks. Read from a current-week table on 2026-08-15; not known to hold during the non-teaching week of 28 Sep - 4 Oct 2026, during examinations, over summer, or on public holidays.'
WHERE slug IN (
  'baillieu-library',            -- Baillieu Library
  'erc-library',                 -- ERC Library
  'law-school',                  -- houses the Law Library
  'fbe-building',                -- houses the Giblin Eunson Library
  'melbourne-school-of-design'   -- houses the Architecture, Building & Planning Library
);

-- No UPDATE is written for the other 13 buildings, on purpose. There is nothing
-- to write. What was searched for, and did not exist, is listed in migration 020.
