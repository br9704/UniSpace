-- ============================================================================
-- 005 — Verified accessibility
--
-- SOURCE: https://www.unimelb.edu.au/accessibility/guides/mobility
-- RETRIEVED: 2026-08-15
--
-- Runs after seeds 001–004, so it has the last word on these columns.
--
-- ── What the source actually supports ──
--
-- One statement is unambiguous and campus-wide:
--
--     "All libraries are accessible with lifts and an accessible toilet. If you
--      are a wheelchair user, borrowing books and using computers will not be a
--      problem."
--
-- That covers every building below that is, or contains, a library. Nothing
-- else in the source is stated with that confidence — the rest is explicitly
-- hedged:
--
--     "since the University retains some old buildings, some buildings may not
--      have a lift to the second floor"
--     "Most buildings have a wheelchair accessible toilet. But some don't."
--
-- So every other building stays NULL. "Most" is not a fact about any particular
-- building, and this is the one column where guessing does measurable harm.
--
-- ── Provenance caveat ──
--
-- The source page states it "has been written by University of Melbourne
-- students". It is a student-perspective guide, not a facilities audit. It is
-- the best public source found, and it is more than the invented values it
-- replaces — but it is not an engineering certification, and the in-app
-- "report an error" path (S25) exists partly for this.
--
-- Accessible parking is left NULL everywhere: the source points to the campus
-- map for parking bays rather than making a per-building claim.
-- ============================================================================

UPDATE buildings SET
  has_elevator             = true,
  has_accessible_bathrooms = true
WHERE slug IN (
  'baillieu-library',            -- Baillieu Library
  'erc-library',                 -- ERC Library
  'law-school',                  -- houses the Law Library
  'fbe-building',                -- houses the Giblin Eunson Library
  'melbourne-school-of-design'   -- houses the Architecture, Building & Planning Library
);

-- Step-free entry is a separate claim from "has a lift", and the source does
-- not make it per-building — it warns that "the accessible entrance to building
-- is usually near the stairs. However, in some cases it is in a different place
-- from the main entrance." A lift inside says nothing about getting in.
--
-- Left NULL deliberately, including for the libraries.
