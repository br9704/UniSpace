-- ============================================================================
-- 013 — Data verification fixes
--
-- WHY THIS FILE EXISTS
--
-- The original 013 was applied directly to the cloud database during S17 and
-- never committed, leaving this repo numbered 012 -> 014. That database has
-- since been deleted, so the work it contained (per MASTERPLAN S17.3: "filled
-- 12 missing Place IDs") is unrecoverable. See WIRING-AUDIT.md RC-1a.
--
-- The rule that follows from it, recorded in MASTERPLAN's decision log:
-- no schema or data change is applied to a cloud database before it exists as
-- a committed migration.
--
-- This replacement does the part that can be verified from committed artifacts.
-- The part that cannot — Google Place IDs, which need a live Places API key —
-- is deliberately left undone rather than invented. See the note at the bottom.
-- ============================================================================


-- ----------------------------------------------------------------------------
-- 1. Remove Brownless Biomedical Library and Giblin Eunson Library.
--
-- S7 recorded both as removed: Giblin Eunson sits inside the FBE Building and
-- would double-count its occupancy, and Brownless has no OpenStreetMap outline
-- so its polygon was a rectangle rather than a real footprint. They were taken
-- out of buildingMeta.ts but left in the seed files, so the database described
-- 20 buildings while the UI described 18 — and the README claimed 18.
--
-- The seeds are now correct, so a fresh database never creates these rows. This
-- block is here for any database that was seeded before that fix. It is
-- idempotent and a no-op on a clean install.
-- ----------------------------------------------------------------------------

DELETE FROM occupancy_history
WHERE building_id IN (
  'b0000000-0000-0000-0000-000000000006',
  'b0000000-0000-0000-0000-000000000007'
);

DELETE FROM occupancy_predictions
WHERE building_id IN (
  'b0000000-0000-0000-0000-000000000006',
  'b0000000-0000-0000-0000-000000000007'
);

DELETE FROM google_popular_times
WHERE building_id IN (
  'b0000000-0000-0000-0000-000000000006',
  'b0000000-0000-0000-0000-000000000007'
);

DELETE FROM google_popularity_cache
WHERE building_id IN (
  'b0000000-0000-0000-0000-000000000006',
  'b0000000-0000-0000-0000-000000000007'
);

DELETE FROM zone_occupancy
WHERE building_id IN (
  'b0000000-0000-0000-0000-000000000006',
  'b0000000-0000-0000-0000-000000000007'
);

DELETE FROM building_zones
WHERE building_id IN (
  'b0000000-0000-0000-0000-000000000006',
  'b0000000-0000-0000-0000-000000000007'
);

DELETE FROM buildings
WHERE id IN (
  'b0000000-0000-0000-0000-000000000006',
  'b0000000-0000-0000-0000-000000000007'
);


-- ----------------------------------------------------------------------------
-- 2. [PLACEHOLDER — Google Place IDs]
--
-- 11 of the 18 buildings have a NULL google_place_id. Only 7 are populated, and
-- those 7 have not been checked against the live API either — several share a
-- suspiciously uniform shape, so they may be as invented as the ones that are
-- missing.
--
-- No IDs are written here on purpose. Resolving a Place ID requires a Places
-- API key, which is owner-gated, and writing plausible-looking identifiers
-- would reproduce exactly the failure this migration exists to correct.
--
-- The consequence is contained. Since the decision of 2026-08-14, Google is no
-- longer a data source for occupancy — the popularity curves are our own
-- modelled estimates and are labelled as such. google_place_id now feeds only
-- the opening-hours sync, so a NULL means "no live open/closed signal for this
-- building", not "no occupancy data".
--
-- To resolve: see MASTERPLAN.md, § Owner-Gated Ship Runbook, step 2. Verify all
-- 18 IDs against the API, then commit them as migration 015.
-- ----------------------------------------------------------------------------
