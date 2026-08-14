-- ============================================================================
-- 017 — Verified opening hours
--
-- SOURCE: https://library.unimelb.edu.au/library-locations-and-opening-hours
-- RETRIEVED: 2026-08-14
--
-- The hours previously seeded for these buildings were invented — plausible
-- shapes rather than published facts, and every one of them was wrong. Baillieu
-- was seeded 08:00–22:00 weekdays; it actually opens 09:00 and closes 20:00.
--
-- ⚠️ IMPORTANT CAVEAT, and the reason this migration exists rather than a
-- silent seed edit:
--
-- The library publishes a *current week* table — the source page was headed
-- "Aug 10 Monday … Aug 16 Sunday". These are therefore the hours for one week
-- in the middle of semester 2, NOT year-round hours. They will be wrong during
-- exams, over summer, and on public holidays.
--
-- That is still a large improvement on invented values, but it means building
-- hours remain a *maintained* field (PRD Q8 already says so) and the in-app
-- "report an error" path (S25) is the correction mechanism. Anyone re-verifying
-- should re-read the source page and bump this migration.
--
-- Only buildings with a published source are touched. Buildings whose hours
-- could not be verified are deliberately left alone rather than adjusted to
-- look consistent.
-- ============================================================================

-- ── Buildings that ARE a library ────────────────────────────────────────────
-- Baillieu Library, ERC Library: staffed hours, identical.
--
-- Both also run an after-hours study zone 07:00–24:00 with card access. Those
-- wider hours are deliberately NOT used here: telling a student a building is
-- "open" when only a swipe-access zone is available would be the same class of
-- error as wrong accessibility data. The zone is documented in buildingMeta
-- tips instead, where it reads as the qualified fact it is.
UPDATE buildings SET
  hours_mon = '09:00-20:00', hours_tue = '09:00-20:00', hours_wed = '09:00-20:00',
  hours_thu = '09:00-20:00', hours_fri = '09:00-17:00',
  hours_sat = '11:00-17:00', hours_sun = '10:00-17:00'
WHERE slug IN ('baillieu-library', 'erc-library');

-- ── Buildings that CONTAIN a library ────────────────────────────────────────
-- For this app's question — "can I study there right now?" — the library's
-- hours are the useful signal, so they are used as the building's hours.
--
-- Melbourne Law School houses the Law Library.
UPDATE buildings SET
  hours_mon = '09:00-20:00', hours_tue = '09:00-20:00', hours_wed = '09:00-20:00',
  hours_thu = '09:00-20:00', hours_fri = '09:00-17:00',
  hours_sat = '11:00-17:00', hours_sun = '10:00-17:00'
WHERE slug = 'law-school';

-- FBE Building houses the Giblin Eunson Library.
UPDATE buildings SET
  hours_mon = '09:00-20:00', hours_tue = '09:00-20:00', hours_wed = '09:00-20:00',
  hours_thu = '09:00-20:00', hours_fri = '09:00-17:00',
  hours_sat = '11:00-17:00', hours_sun = '10:00-17:00'
WHERE slug = 'fbe-building';

-- Melbourne School of Design houses the Architecture, Building and Planning
-- Library, which keeps its own shorter hours.
UPDATE buildings SET
  hours_mon = '09:00-19:00', hours_tue = '09:00-19:00', hours_wed = '09:00-19:00',
  hours_thu = '09:00-19:00', hours_fri = '09:00-17:00',
  hours_sat = '13:00-17:00', hours_sun = '10:00-16:00'
WHERE slug = 'melbourne-school-of-design';

-- ── Corroboration for an earlier decision ───────────────────────────────────
-- The same source lists Brownless Biomedical Library with no hours at all —
-- "–" for all seven days. That independently confirms the S7 decision to drop
-- it, which until now rested only on its absence from OpenStreetMap.
--
-- No statement is made here about buildings whose hours were not published.
-- They keep their existing values and are flagged as unverified in
-- MASTERPLAN's Ship Runbook.
