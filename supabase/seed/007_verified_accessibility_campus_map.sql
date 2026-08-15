-- ============================================================================
-- 007 — Verified accessibility, from the University's own campus map
--
-- SOURCE:    https://maps.unimelb.edu.au/parkville  — read through the public
--            endpoint the map itself calls,
--              https://api.mazemap.com/api/pois/?buildingid=<id>&srid=4326
--            (Parkville is campusId 200).
-- RETRIEVED: 2026-08-15
--
-- Runs after seed 005, which it extends rather than replaces. 005 could only
-- speak about the five library buildings, because the source it had — UoM's
-- mobility guide — says one unambiguous thing ("All libraries are accessible
-- with lifts and an accessible toilet") and hedges everything else with "most"
-- and "some". Thirteen buildings were left as "nobody has checked", and the
-- masterplan called that the highest-value remaining data item.
--
-- ── Why this source, and why it is stronger than 005's ──
--
-- The mobility guide itself points here. Verbatim, from
-- https://www.unimelb.edu.au/accessibility/guides/mobility :
--
--     "Most buildings have a wheelchair accessible toilet. But some don't. Most
--      accessible buildings will also have an accessible toilet and lift. You
--      can locate accessible toilets on Campus Maps."
--
-- So UoM's own advice to a wheelchair user is to look this up on the campus
-- map. This seed does exactly that, per building, and writes down what the map
-- says. Where 005's source is a student-written guide making campus-wide
-- generalisations, this one is the facilities dataset behind UoM's map: rooms
-- carry the University's own space-register identifiers (PAR;<building>;
-- <floor>;<room>), and toilets and lifts are tagged with the University's own
-- facility categories.
--
-- ── The rule this seed obeys ──
--
-- A mapped lift or a mapped accessible toilet is a positive statement, so it
-- can set a column TRUE. The *absence* of one is not a statement — a map can be
-- incomplete — so it can never set a column FALSE. Everything unmapped stays
-- NULL, exactly as migration 018 intended.
--
-- ── The evidence, per building, as counted on 2026-08-15 ──
--
-- "lifts" counts map objects of kind `elevator` or type "Lift". "accessible
-- toilets" counts types "Toilet - All Gender Accessible", "Toilet/Shower - All
-- Gender Accessible", "Toilet/Shower - Accessible" and "Toilet/Baby Change -
-- All Gender Accessible". It deliberately excludes "Toilet - Male/Female
-- Ambulant": an ambulant toilet has grab rails but is not wheelchair-sized,
-- and counting it would be precisely the harmful error PRD § 13.4 warns about.
-- The David Caro Building carries 5 ambulant toilets that are not counted here;
-- it qualifies on its 5 genuinely accessible ones.
--
--   alan-gilbert                 lifts  34   accessible toilets  8
--   arts-west                    lifts  33   accessible toilets 10
--   baillieu-library             lifts  29   accessible toilets  6
--   chemistry-building           lifts   4   accessible toilets  1
--   david-caro                   lifts  16   accessible toilets  5
--   erc-library                  lifts   5   accessible toilets  4
--   fbe-building                 lifts  35   accessible toilets  6
--   ict-building                 lifts  20   accessible toilets  6
--   john-medley                  lifts  14   accessible toilets  4
--   kwong-lee-dow                lifts  13   accessible toilets  6
--   law-school                   lifts  75   accessible toilets 12
--   melbourne-school-of-design   lifts  27   accessible toilets 10
--   old-arts                     lifts   2   accessible toilets  2
--   peter-hall                   lifts   0   accessible toilets  1
--   redmond-barry                lifts  39   accessible toilets  1
--   student-pavilion             lifts  12   accessible toilets  3
--   the-spot                     lifts  92   accessible toilets  7
--
-- Building identity was resolved by name against UoM's own two building
-- registers — the campus map and Room Search
-- (https://learningspaces.unimelb.edu.au/room-search) — not by coordinate,
-- because several seeded centroids are tens to hundreds of metres off (Arts
-- West's nearest map building is Western Edge Biosciences, ~80 m away). That is
-- a separate bug and is not touched here.
-- ============================================================================

-- ── Lifts ───────────────────────────────────────────────────────────────────
-- 16 buildings. Peter Hall is not in this list: the map shows no lift in it.
-- That is NOT a claim there is none — Peter Hall is a three-level building and
-- the map may simply not tag it — so the column stays NULL rather than false.
UPDATE buildings SET has_elevator = true
WHERE slug IN (
  'alan-gilbert', 'arts-west', 'baillieu-library', 'chemistry-building',
  'david-caro', 'erc-library', 'fbe-building', 'ict-building', 'john-medley',
  'kwong-lee-dow', 'law-school', 'melbourne-school-of-design', 'old-arts',
  'redmond-barry', 'student-pavilion', 'the-spot'
);

-- ── Accessible toilets ──────────────────────────────────────────────────────
-- All 17 buildings that could be identified on the map carry at least one.
UPDATE buildings SET has_accessible_bathrooms = true
WHERE slug IN (
  'alan-gilbert', 'arts-west', 'baillieu-library', 'chemistry-building',
  'david-caro', 'erc-library', 'fbe-building', 'ict-building', 'john-medley',
  'kwong-lee-dow', 'law-school', 'melbourne-school-of-design', 'old-arts',
  'peter-hall', 'redmond-barry', 'student-pavilion', 'the-spot'
);

-- ── Step-free entry ─────────────────────────────────────────────────────────
-- One building, and only one, has an entrance the University's map explicitly
-- names as accessible:
--
--   poi 900463  "Peter Hall Building Accessible Entrance North"  (floor G)
--   poi 929880  "Peter Hall Building Accessible Entrance West"   (floor G)
--
-- Two named, ground-floor, accessible entrances is a direct statement that you
-- can get into this building without steps, which is what this column means.
--
-- Nothing else on campus is labelled that way. The nearest miss is Arts West's
-- "Kathleen Fitzpatrick Theatre Wheelchair Entrance", which is on basement
-- level 2 and describes getting into a theatre, not into the building — so
-- Arts West stays NULL. Every other building's entrances are labelled only
-- "Main Entrance", and the mobility guide specifically warns that "the
-- accessible entrance to building is usually near the stairs. However, in some
-- cases it is in a different place from the main entrance" — which is a reason
-- to distrust "Main Entrance" as evidence of step-free access, not to accept it.
UPDATE buildings SET is_ground_floor_accessible = true
WHERE slug IN ('peter-hall');

-- ── Accessible parking ──────────────────────────────────────────────────────
-- Still NULL everywhere, and still with no source. The campus map carries a
-- "Car Parking" facility type but no accessible-parking type at all: searching
-- the map for "accessible parking" and "disabled parking" on 2026-08-15
-- returned car parks and accessible toilets, and nothing that marks a bay as
-- accessible. Seed 005 already noted that the mobility guide points at the map
-- for parking rather than making a per-building claim; the map does not answer
-- it either. No UPDATE is written here on purpose.

-- ── Buildings this seed says nothing about ──────────────────────────────────
-- Engineering Building 1 keeps all four columns NULL. Seed 001 names it
-- "Engineering Building 1 (Block B)", which is not a building UoM publishes
-- under that name, and it could not be matched to a map building with any
-- confidence. An accessibility claim attached to the wrong building is worse
-- than no claim, so none is made. See seed 006's caveat 1 for the detail.
