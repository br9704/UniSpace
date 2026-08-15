# MASTERPLAN.md — UniSpace Implementation Plan

> Status key:
> `[ ]` not started · `[x]` complete **and observed working** · `[~]` in progress / built-but-not-wired
> `[⏭️]` deferred (always with a one-line reason) · `[⏭ roadmap, not scheduled]` out of current scope

## Project Status

**Current sprint pointer:** → **Owner-Gated Ship Runbook** — all engineering work complete

**How to read the boxes in this file.** Every `[ ]` that remains is in the Ship Runbook at the
bottom: it is Bruno's checklist, not outstanding engineering. Sprints 26–36 are individually marked
`[⏭️]` rather than left blank, because a blank box reads as a to-do and these are deliberately out
of scope. Counted as of 2026-08-14: **0 open engineering tasks, 31 owner-gated runbook steps.**
*(Phase 1.9 Recovery and all of Phase 2 closed 2026-08-14. Every remaining item in
S0–S25 is owner-gated: it needs credentials, real-world data, or a physical device.)*

⚠️ **RECOUNTED 2026-08-15:** still **0 open engineering tasks** — that holds, and every `[ ]` left in
this file is still in the Ship Runbook. The runbook figure has moved twice. It now carries **37
steps: 18 open, 7 done, 12 parked.**

- **Done (7):** VAPID keys (§ 2), the three Vercel items (§ 3), and PWA icons plus the accessibility
  and hours research (§ 5).
- **Parked (12):** all of § 1 and the items downstream of it, after the 2026-08-15 decision that
  **the Supabase backend will not be provisioned** (see the decision log). Marked `[⏭️]`, not `[ ]`,
  because they are closed by choice rather than waiting.
- **Open (18):** real remaining work. The urgent one is a single line in § 2 — **restrict the Mapbox
  token** — which is independent of Supabase and live on a public URL today.

Counted from this file, not restated: `grep -oE "^\s*- \[[^]]*\]"` over the runbook section.

**Current state (2026-08-14, post-audit):** The 199 `[x]` marks recorded before this date were
**claims, not facts**. A forensic audit — `WIRING-AUDIT.md`, in this folder — ran the toolchain,
probed the backend and inspected the built CSS. Findings:

- **The Supabase project was deleted.** Ref `kvagntgpiylxhjntexml` returns NXDOMAIN on three
  independent resolvers. No database, no seeds, no Realtime, no deployed Edge Functions.
- **Tailwind v4 is installed against v3 CSS syntax**, so the theme scale never loads. `.p-4`,
  `.gap-2`, `.text-sm`, `.font-semibold`, `.rounded-lg` **emit no CSS at all**. Only 53 non-Mapbox
  utilities exist in the whole bundle. This is why surfaces look unstyled.
- **`pnpm build` fails** — `tsc -b` throws 4 errors. The project has not compiled since S20.
- Migration `013` was never committed (repo jumps `012 → 014`); that work is unrecoverable.

What *is* genuinely sound: the privacy path (verified end to end — "GPS never leaves your device"
is accurate), 140 passing unit tests, and the React-level data plumbing in `MapPage.tsx`. The
components are real. Everything underneath them broke.

**Scope decision (Bruno, 2026-08-14):** finish **S0–S25**. Sprints S26–S36 are marked
`[⏭ roadmap, not scheduled]` — 111 unchecked boxes are **not** 111 things to do.

**Owner-gated work is deferred to the very end** (Bruno's instruction) and batched into a single
runbook: § *Owner-Gated Ship Runbook*. Nothing in this plan blocks on Bruno until then; a local
fixture layer (Sprint R2) stands in for the backend throughout.

---

## Phase 0 — Foundation

### Sprint 0: Project Scaffolding
**Goal:** Create a working Vite + React + TypeScript project with all tooling, design system tokens, type definitions, and folder structure in place.

**Inputs:** PRD.md, CLAUDE.md

**Outputs:**
- Vite dev server runs and shows Pulse placeholder
- Tailwind configured with UoM design tokens
- All CSS custom properties from PRD Section 11 in index.css
- TypeScript types for all data models from PRD Section 8
- Supabase client initialised (env var gated)
- PWA manifest configured in vite.config.ts
- Folder structure matches CLAUDE.md Section 3
- Constants files for occupancy thresholds and map defaults

**Subtasks:**
- [x] S0.1 — Initialise Vite + React + TypeScript project with pnpm
- [x] S0.2 — Install all dependencies (Supabase, Mapbox, Turf.js, Recharts, Framer Motion, Radix UI)
- [x] S0.3 — Install dev dependencies (Tailwind, PostCSS, Vitest, Testing Library, vite-plugin-pwa)
- [x] S0.4 — Create folder structure (src/components, hooks, lib, pages, types, stores, constants; supabase/migrations, functions, seed; public/icons)
- [x] S0.5 — Copy PRD.md and CLAUDE.md into project root
- [x] S0.6 — Configure vite.config.ts with PWA plugin and path aliases
- [x] S0.7 — Configure tailwind.config.ts with UoM colour palette, typography, spacing
- [x] S0.8 — Write src/index.css with all CSS custom properties from PRD Section 11
- [x] S0.9 — Configure tsconfig.json / tsconfig.app.json with strict mode and path aliases
- [x] S0.10 — Write .env.example with all required environment variables
- [x] S0.11 — Write .gitignore
- [x] S0.12 — Write src/lib/supabase.ts client initialisation
- [x] S0.13 — Write src/constants/map.ts (campus centre, zoom defaults)
- [x] S0.14 — Write src/constants/occupancy.ts (thresholds, colours, intervals)
- [x] S0.15 — Write src/types/index.ts with all TypeScript interfaces from PRD Section 8
- [x] S0.16 — Write placeholder App.tsx shell
- [x] S0.17 — Write README.md with setup instructions
- [x] S0.18 — Generate MASTERPLAN.md
- [x] S0.19 — Verify TypeScript compiles with zero errors

**Test criteria:**
- `pnpm exec tsc -b` passes with zero errors
- `pnpm dev` starts and shows "PULSE — Campus occupancy, live." placeholder
- All folders exist with .gitkeep files
- .env.example documents all required variables

**Notes:** Tailwind v4 installed (no init CLI). PostCSS config created manually. @types/geojson added for Polygon type in interfaces.

---

### Sprint 1: Supabase Infrastructure
**Goal:** Define the complete database schema with all tables from PRD Section 8, RLS policies, indexes, and seed data for UoM Parkville campus.

**Inputs:** Sprint 0 complete, PRD Section 8 (Data Models), PRD Section 13 (Privacy)

**Outputs:**
- Sequential SQL migration files in supabase/migrations/
- All tables: campuses, buildings, building_zones, zone_occupancy, occupancy_history, occupancy_predictions, google_popularity_cache, google_popular_times, user_alerts
- RLS policies: anonymous read on all tables, restricted write via service role only
- Indexes for query performance (occupancy_history by zone+time, predictions by building+day+hour)
- Seed script for UoM Parkville with 5 initial buildings and their zones
- Edge Function scaffolds for aggregate-occupancy and sync-google-popularity

**Subtasks:**
- [x] S1.1 — Write migration 001_campuses.sql (campuses table + RLS) ✅
- [x] S1.2 — Write migration 002_buildings.sql (buildings table with all amenity flags + RLS) ✅
- [x] S1.3 — Write migration 003_building_zones.sql (floor-level zones + RLS) ✅
- [x] S1.4 — Write migration 004_zone_occupancy.sql (live hot table + RLS + enable Realtime) ✅
- [x] S1.5 — Write migration 005_occupancy_history.sql (snapshots + indexes + RLS) ✅
- [x] S1.6 — Write migration 006_occupancy_predictions.sql (pre-computed predictions + unique constraint + RLS) ✅
- [x] S1.7 — Write migration 007_google_popularity.sql (cache + popular_times tables + RLS) ✅
- [x] S1.8 — Write migration 008_user_alerts.sql (alerts table + RLS) ✅
- [x] S1.9 — Write seed script supabase/seed/001_uom_parkville.sql with campus + 5 buildings + zones ✅ (5 buildings, 13 zones, zone_occupancy initialised)
- [x] S1.10 — Scaffold supabase/functions/aggregate-occupancy/index.ts (Deno Edge Function) ✅ (session_id never written, 30-min expiry enforced)
- [x] S1.11 — Scaffold supabase/functions/sync-google-popularity/index.ts (Deno Edge Function) ✅ (skip-if-unchanged, per-building error handling)

**Test criteria:**
- All migration SQL files are syntactically valid
- Every table has RLS enabled with appropriate policies
- zone_occupancy has Realtime enabled
- Seed script inserts 1 campus, 5 buildings with real UoM coordinates and Google Place IDs, and floor zones for each building
- Edge Function scaffolds have correct Deno imports and privacy guards (session_id never written, positions expire after 30min)
- All files referenced in the correct supabase/ subdirectories

**Notes:**
- Privacy critical: session_id must NEVER appear in any CREATE TABLE statement
- zone_occupancy is the hot table — needs Realtime publication
- occupancy_history needs composite indexes for prediction queries (building_id + dow + hour)
- Google Place IDs for UoM buildings: research real IDs for Baillieu Library, ERC, Arts West, Engineering Building 1, ICT Building
- RLS pattern: anon can SELECT all tables, only service_role can INSERT/UPDATE/DELETE (Edge Functions use service role)
- Building polygons in seed data should be approximate GeoJSON covering the actual building footprint

---

### Sprint 2: Google Places Integration
**Goal:** Complete the sync-google-popularity Edge Function and google data pipeline so buildings have fallback occupancy data from day one.

**Inputs:** Sprint 1 complete (tables exist, buildings seeded with google_place_id)

**Outputs:**
- Fully functional sync-google-popularity Edge Function
- Google popularity cache populated for all buildings with Place IDs
- Google popular times (typical weekly histogram) seeded
- Blending utility that returns the best available data source per building

**Subtasks:**
- [~] S2.1 — Implement sync-google-popularity Edge Function — ⚠️ **CORRECTED 2026-08-14:** code is
      written and sound, but "deployed to Supabase" is no longer true — the project was deleted.
      `[~] built, not deployed`. Re-deploy is owner-gated (see Ship Runbook).
- [x] S2.2 — Add skip-if-unchanged logic ✅ (compares cached vs new values before writing)
- [x] S2.3 — Implement error handling ✅ (per-building — one failure doesn't block others)
- [x] S2.4 — Write seed script for google_popular_times ✅ (335 rows across 5 buildings, realistic weekly curves)
- [x] S2.5 — Write src/lib/blending.ts ✅ (fallback: live > google cache > predicted > google typical > none)
- [x] S2.6 — Write unit tests for blending logic ✅ (20 tests, all passing)
- [x] S2.7 — Add GOOGLE_PLACES_API_KEY to .env.example documentation ✅ (server-side only, set via Supabase secrets)

**Test criteria:**
- Edge Function compiles with Deno
- Blending function correctly prioritises data sources per PRD F001 fallback hierarchy
- Unit tests pass for all blending edge cases (null data, stale data, mixed sources)
- Google API key is NOT in any VITE_ prefixed variable

**Notes:**
- Google Places API key is server-side only (Edge Function env secret)
- The `current_popularity` field may not be available for all buildings — handle gracefully
- Cache TTL is 30 minutes per PRD
- Reference PRD Section 6.10 (F010) for full integration spec

---

## Phase 1 — MVP

### Sprint 3: Mapbox Map Integration
**Goal:** Render a full-viewport Mapbox map centred on UoM Parkville with building polygons drawn from the database.

**Inputs:** Sprint 1 complete (buildings + zones seeded with polygon data)

**Outputs:**
- Full-viewport Mapbox GL JS map on the home route
- Building polygons rendered as GeoJSON fill + stroke layers
- Building name labels at centroid, visible at zoom >= 15.5
- Map constrained to campus bounds (min/max zoom)
- User location dot (blue pulse) if GPS granted

**Subtasks:**
- [x] S3.1 — Create src/components/Map.tsx with Mapbox GL JS initialisation ✅
- [x] S3.2 — Create src/hooks/useBuildings.ts — fetch buildings from Supabase ✅
- [x] S3.3 — Convert building polygons to GeoJSON FeatureCollection ✅ (src/lib/mapHelpers.ts + 4 unit tests)
- [x] S3.4 — Add fill layer with default colour (grey #1A3A5C, 800ms transition prep) ✅
- [x] S3.5 — Add stroke layer for building outlines ✅
- [x] S3.6 — Add symbol layer for building name labels (short_name, zoom >= 15.5) ✅
- [x] S3.7 — Add user location control (GeolocateControl with heading) ✅
- [x] S3.8 — Set map bounds, min/max zoom from constants ✅
- [x] S3.9 — Handle click on building polygon — emit selected building ID ✅
- [x] S3.10 — Create src/pages/MapPage.tsx as the home route shell ✅
- [x] S3.11 — Verify map renders on mobile viewport (375px) ✅ (full viewport h-full w-full, no chrome)

**Test criteria:**
- Map fills viewport on mobile and desktop
- 5 UoM building polygons visible and tappable
- Building labels appear at zoom >= 15.5
- Click/tap on polygon logs the building ID
- GPS dot appears if location permission granted

**Notes:**
- Mapbox token from VITE_MAPBOX_TOKEN env var
- Use dark-v11 style as base (custom UoM style is Phase 2)
- Map is the instrument panel — chrome should be minimal
- Building polygons must be accurate enough to be recognisable on the map

---

### Sprint 4: Realtime Geolocation Broadcasting
**Goal:** Implement client-side zone detection and anonymous position broadcasting via Supabase Realtime.

**Inputs:** Sprint 1 (zones with polygons), Sprint 3 (map renders)

**Outputs:**
- Client determines which zone the user is in using Turf.js point-in-polygon (client-side only)
- Broadcasts { zone_id, session_id, campus_slug } to Supabase Realtime channel
- session_id rotates every 30 minutes
- Raw GPS coordinates NEVER leave the device
- Broadcasting only when app is in foreground and GPS is active

**Subtasks:**
- [x] S4.1 — Create src/lib/zoneDetection.ts — Turf.js point-in-polygon (pure function privacy firewall) ✅
- [x] S4.2 — Create src/lib/sessionId.ts — rotating anonymous UUID (30-min, module-scoped) ✅
- [x] S4.3 — Create src/hooks/usePositionBroadcast.ts — HTTP POST to Edge Function (zone_id only) ✅
- [x] S4.4 — Subscribe to Geolocation API with watchPosition (+ useZones hook) ✅
- [x] S4.5 — Implement broadcast throttling (10s interval, ref-based) ✅
- [x] S4.6 — Handle edge cases: outside zones, GPS denied/lost, app backgrounded (visibilitychange) ✅
- [x] S4.7 — Write unit tests for zone detection logic ✅ (5 tests including coordinate order regression)
- [x] S4.8 — Write unit tests for session rotation ✅ (5 tests)

**Test criteria:**
- Zone detection correctly identifies which building zone a coordinate falls in
- session_id changes after 30 minutes
- Only zone_id is broadcast — raw lat/lng never appears in Realtime payload
- Broadcasting stops when app is backgrounded or GPS is denied

**Notes:**
- PRIVACY CRITICAL: raw coordinates must NEVER leave the device
- Consider Web Worker for Turf.js if polygon count grows large (not needed for 5 buildings)
- session_id is never stored in any database table — it exists only in the Realtime channel for in-memory counting

---

### Sprint 5: Zone Aggregation Edge Function
**Goal:** Build the aggregate-occupancy Edge Function that reads Realtime broadcasts, counts unique sessions per zone, and writes occupancy to zone_occupancy table.

**Inputs:** Sprint 4 (positions broadcasting), Sprint 1 (zone_occupancy table)

**Outputs:**
- Edge Function reads from anonymous_positions:{campus_slug} Realtime channel
- Counts distinct session_ids per zone_id (in-memory only)
- Expires positions older than 30 minutes
- Computes occupancy_pct = (count / zone.capacity) * 100
- Upserts zone_occupancy with trend calculation
- Writes 15-minute snapshots to occupancy_history

**Subtasks:**
- [~] S5.1 — Implement complete aggregate-occupancy Edge Function — ⚠️ **CORRECTED 2026-08-14:**
      code written and privacy-audited, but "v2 deployed" is no longer true — deployment target
      deleted. `[~] built, not deployed`. Re-deploy is owner-gated (see Ship Runbook).
- [x] S5.2 — In-memory session tracking (Map<zone_id, Map<session_id, timestamp>>) ✅
- [x] S5.3 — Position expiry logic (30-min expiry) ✅
- [x] S5.4 — Trend calculation (±5% threshold: filling/emptying/stable) ✅
- [x] S5.5 — Upsert zone_occupancy with computed values ✅
- [x] S5.6 — Write 15-minute snapshots to occupancy_history ✅ (throttled via module-scoped timestamp)
- [x] S5.7 — data_quality: 'live' (<60s), 'stale' (>60s), 'none' (no sessions) ✅
- [x] S5.8 — Verify session_id NEVER in any DB write ✅ (grep confirmed, privacy audit passed)
- [x] S5.9 — Unit tests for aggregation logic ✅ (23 tests: data quality, expiry, occupancy pct, trend, recordPosition)

**Test criteria:**
- Edge Function runs without errors
- zone_occupancy updates with correct counts and percentages
- Positions older than 30 minutes are expired
- session_id does not appear in any INSERT or UPDATE statement
- Trend correctly reflects filling/emptying/stable
- 15-minute snapshots written to occupancy_history

**Notes:**
- This function is invoked every 10 seconds via pg_cron (or HTTP cron)
- session_id NEVER touches the database — this is a privacy invariant
- Trend: if current > prev + 5 => filling, if current < prev - 5 => emptying, else stable
- data_quality: 'live' if any active sessions, 'none' if zero sessions

---

### Sprint 6: Occupancy Blending Logic
**Goal:** Implement the full client-side blending that combines crowdsourced live data, Google cache, predictions, and Google typical data into a single occupancy state per building.

**Inputs:** Sprint 5 (zone_occupancy populated), Sprint 2 (Google data available)

**Outputs:**
- useBlendedOccupancy hook that returns BlendedOccupancy per building
- Follows PRD fallback hierarchy: live > google > predicted > google-typical > none
- Aggregates zone-level data to building-level (weighted average by capacity)
- Includes floor-level breakdown
- Data source badge type determined

**Subtasks:**
- [x] S6.1 — Create src/hooks/useOccupancyRealtime.ts ✅ (Realtime postgres_changes subscription + initial fetch + merge)
- [x] S6.2 — Create src/hooks/useGooglePopularity.ts ✅ (google_popularity_cache + google_popular_times + occupancy_predictions)
- [x] S6.3 — Create src/hooks/useBlendedOccupancy.ts ✅ (composition hook calling blendOccupancy() per building)
- [x] S6.4 — Building-level aggregation ✅ (already in blending.ts aggregateZoneOccupancies)
- [x] S6.5 — Floor-level breakdown extraction ✅ (already in blending.ts floorBreakdown output)
- [x] S6.6 — Unit tests for occupancy helpers ✅ (12 tests: grouping, merge, typical/prediction lookup)
- [x] S6.7 — Stale data detection ✅ (already in blending.ts isDataFresh + Edge Function getDataQuality)

**Test criteria:**
- Hook returns correct source when live data exists
- Falls back to Google when no live data
- Falls back to predictions when no Google data
- Building-level pct is correct weighted average
- Floor breakdown matches individual zone occupancies
- Stale data correctly detected after 60 seconds

**Notes:**
- This is the core data pipeline for the UI — every component reads from blended occupancy
- Blending logic from src/lib/blending.ts (Sprint 2) is reused here inside the hook
- Realtime subscription should use Supabase Realtime postgres_changes on zone_occupancy

---

### Sprint 7: Live Heatmap Rendering
**Goal:** Connect blended occupancy data to Mapbox polygon fill colours for real-time heatmap visualisation.

**Inputs:** Sprint 3 (map with polygons), Sprint 6 (blended occupancy data)

**Outputs:**
- Building polygons change colour based on blended occupancy percentage
- Smooth 800ms colour transitions
- Occupancy % label on polygon centroid at zoom >= 15.5
- Data source indicator pill (bottom-left)
- Stale data banner when data > 60 seconds old

**Subtasks:**
- [x] S7.1 — Data-driven fill-color expression using interpolate + occupancy colour scale ✅
- [x] S7.2 — Polygon colours update via source.setData() when occupancyMap changes ✅
- [x] S7.3 — 800ms fill-color-transition configured ✅
- [x] S7.4 — Occupancy % label layer at zoom >= 15.5 ✅
- [x] S7.5 — DataSourcePill component (bottom-left, shows dominant data source) ✅
- [x] S7.6 — StaleDataBanner component (amber warning, 60s threshold, hides for old seed data) ✅
- [x] S7.7 — Labels update in real-time via GeoJSON source refresh ✅
  - [x] S7.extra — Expanded from 5 to 20 UoM buildings (OSM-sourced polygons)
  - [x] S7.extra — Fixed all polygon shapes using real OpenStreetMap outlines (up to 58 vertices)
  - [x] S7.extra — Seeded typical-occupancy curves for all 18 buildings — **1,172 rows**
        (verified 2026-08-14 against the committed seeds: `002` = 335 + `004` = 837. The previous
        figures — 1,252 here and 1,453 in README — were both unbacked by any committed artifact.
        The count changed again in R1.7 when the two extra buildings below were finally removed
        from the seeds, which is the point: it is recounted from the files, never restated.)
        → **The current figure is 1,156**, set at R2.7 when the closed-day curve rows came out.
        Re-verified 2026-08-15 against the committed seeds. Do not cite 1,172 as current.
  - [x] S7.extra — Removed Giblin Eunson (inside FBE) and Brownless (not in OSM) from
        `buildingMeta.ts` — ⚠️ **but not from the seed files until R1.7 (2026-08-14).** For five
        sprints the database described 20 buildings while the UI and README said 18.
  - [x] S7.extra — Fixed combined name+% label (was hiding names on buildings without data)

**Test criteria:**
- Polygons are colour-coded: green (empty) through red (packed)
- Colours transition smoothly (no abrupt jumps)
- Percentage labels visible at appropriate zoom
- Data source pill shows correct source
- Stale banner appears after 60 seconds without update

**Notes:**
- Reference PRD Section 12.2 for map layer order
- Colour transitions: 800ms ease-in-out per PRD Section 11.6
- Grey polygon (border colour) when no data available

---

### Sprint 8: Building Cards
**Goal:** Implement the bottom-sheet Building Card with collapsed and expanded states, triggered by polygon tap.

**Inputs:** Sprint 3 (polygon click handler), Sprint 6 (blended occupancy)

**Outputs:**
- Bottom-sheet card appears on polygon tap
- Collapsed state (~180px): name, occupancy bar, trend, open/closed status
- Expanded state (~70vh): floor breakdown, amenities, sparkline, prediction chart, actions
- Spring physics animation (Framer Motion)
- Swipe-to-dismiss

**Subtasks:**
- [x] S8.1 — BuildingCard.tsx with Framer Motion bottom sheet (spring: 280/28) ✅
- [x] S8.2 — Collapsed state: name, OccupancyBar, TrendArrow, open/closed badge ✅
- [x] S8.3 — Drag handle + snap points (collapsed 220px, expanded 75vh) ✅
- [x] S8.4 — OccupancyBar.tsx (gradient fill, 500ms transition) ✅
- [x] S8.5 — TrendArrow.tsx (animated SVG: filling/emptying/stable) ✅
- [x] S8.6 — DataSourceBadge.tsx (icon + label pill) ✅
- [x] S8.7 — OccupancyBadge.tsx ("38% · Quiet" with colour) ✅
- [x] S8.8 — Expanded: floor breakdown, amenity chips, Navigate/Alert buttons ✅
- [x] S8.9 — Wired polygon tap → BuildingCard via lazy load + AnimatePresence ✅
- [x] S8.10 — Swipe-to-dismiss + overlay dimming ✅

**Test criteria:**
- Tapping a polygon opens the card with correct building data
- Card snaps between collapsed and expanded states
- Spring animation feels natural (stiffness 280, damping 28)
- Swipe down dismisses the card
- All data fields populated from blended occupancy

**Notes:**
- Reference PRD Sections 12.3 and 12.4 for exact layouts
- Framer Motion spring config: stiffness 280, damping 28
- Card should lazy load (React.lazy) — not in initial bundle
- Map remains interactive above the card

---

### Sprint 9: Floor-Level Breakdown
**Goal:** Add per-floor occupancy breakdown inside the expanded Building Card.

**Inputs:** Sprint 8 (BuildingCard expanded state), Sprint 6 (floor occupancy data)

**Outputs:**
- Per-floor rows showing zone name, mini bar, percentage, and occupancy label
- Quietest floor highlighted with gold "Recommended" label
- Staggered reveal animation (50ms delay per floor)

**Subtasks:**
- [x] S9.1 — FloorBreakdown.tsx extracted from BuildingCard ✅
- [x] S9.2 — Per-floor rows with mini OccupancyBar, %, label ✅ (Sprint 8)
- [x] S9.3 — Quietest floor "→ Recommended" gold label ✅
- [x] S9.4 — Staggered Framer Motion reveal (50ms per floor) ✅
- [x] S9.5 — AmenityChip.tsx ✅ (Sprint 8)
- [x] S9.6 — Amenity chips in expanded card ✅ (Sprint 8)

**Test criteria:**
- All floors for the selected building are displayed
- Quietest floor has gold "Recommended" label
- Floor bars are colour-coded by occupancy level
- Amenity chips match building amenity flags

**Notes:**
- Floor data comes from building_zones joined with zone_occupancy
- "Quietest" = lowest occupancy_pct among floors with data

---

### Sprint 10: Smart Recommendations
**Goal:** Implement the "Find me a spot" recommendations screen with filters and ranked results.

**Inputs:** Sprint 6 (blended occupancy for all buildings), building amenity data

**Outputs:**
- /find route with filter chips and ranked building cards
- Scoring algorithm: (1 - occupancy) * 0.5 + (1 - walk_time_norm) * 0.3 + amenity_match * 0.2
- FilterSheet bottom sheet with toggles and sliders
- Walking time calculation (straight-line distance at 1.4 m/s)
- Empty state when no buildings match

**Subtasks:**
- [x] S10.1 — Recommendations UI ✅ **Resolved in R5.7.** Corrected first: `FindPage.tsx` never
      existed, and the `/find` route PRD § 12.5 specifies was never shipped — commit `daf18af`
      replaced it with a panel inside `MapPage` without updating either document. Settled in favour
      of both: the panel stays (on a phone, sliding it over the map beats navigating away from the
      thing you are choosing between) and `/find` now renders that screen with the panel already
      open, so the route is real, deep-linkable and shareable.
- [x] S10.2 — useRecommendations hook with debounced scoring ✅
- [x] S10.3 — Walking time via Turf.js distance at 1.4 m/s ✅
- [x] S10.4 — Amenity match percentage calculation ✅
- [x] S10.5 — FilterChips horizontal scroll (FilterSheet bottom sheet deferred) ✅
- [x] S10.6 — RecommendationCard with directions, amenities, status ✅
- [x] S10.7 — Filter chip horizontal scroll bar ✅
- [x] S10.8 — 300ms debounce on filter changes ✅
- [x] S10.9 — Empty state with reset button ✅
- [x] S10.10 — Tab bar with SVG icons (Home/Map/Find/More) ✅
- [x] S10.11 — 11 unit tests for scoring algorithm ✅
- [x] S10.12 — Walking time tests (known coords, null GPS, null entrance) ✅
  - [x] S10.extra — Full UI revamp: light theme polish, SVG tab icons, professional Home page with greeting + campus status + building cards, FAQ/More page, map bounds lock

**Test criteria:**
- Toggling filters updates results within 300ms
- Results are ranked by score (lower occupancy + closer + more amenities = higher rank)
- Tie-breaking: emptying > stable > filling
- Walking time shows "-" when GPS unavailable
- Empty state shown when no buildings match filters

**Notes:**
- Reference PRD Section 6.3 (F003) for scoring formula
- Reference PRD Section 12.5 for UI layout
- Use Radix UI Switch for toggles, Radix UI Slider for sliders
- Memoize scoring calculations (useMemo)

---

### Sprint 11: Prediction Engine (Phase 1)
**Goal:** Implement basic prediction using Google popular times as baseline, with the framework for UniSpace's own predictions when data accumulates.

> ⚠️ **ANNOTATED 2026-08-15 — read this sprint's "Google" and colour references as historical.**
> Two later decisions rewrote its vocabulary without changing what was built:
> - **2026-08-14, data relabel.** The `google_popular_times` rows are hand-authored modelled curves,
>   not Google data. R3.11 rewrote `PredictionSourceBadge` accordingly, so the S11.8 subtask and the
>   "Source badge correctly shows *Google data*" test criterion below describe copy that has since
>   been removed as untrue. Google Places feeds opening hours only.
> - **2026-08-14, SIGNAL supersedes PRD § 11.** The "UoM Gold" and "UoM blue" bars in S11.5 and the
>   chart legend are gone with the retired navy/gold palette; charts read the SIGNAL tokens through
>   `src/lib/tokens.ts`.
>
> The sprint itself closed correctly — nothing here needs redoing.

**Inputs:** Sprint 2 (Google popular times data), Sprint 5 (occupancy_history accumulating)

**Outputs:**
- compute-predictions Edge Function scaffold
- Predictions displayed in Building Card (24-hour bar chart)
- "Usually X% at this time on [Day]s" text
- "Best time to go today" / "Avoid between X and Y"
- Confidence badge showing data source

**Subtasks:**
- [x] S11.1 — Scaffold supabase/functions/compute-predictions/index.ts ✅ (maps google_popular_times → occupancy_predictions, batch upsert)
- [x] S11.2 — Implement Google-baseline prediction ✅ (data_source='google', confidence='google-estimated')
- [⏭️] S11.3 — Create src/hooks/usePrediction.ts ⏭️ DEFERRED: predictions fetched via useGooglePopularity hook instead — architecturally sound, avoids duplicate fetching
- [x] S11.4 — Create src/components/PredictionChart.tsx ✅ (Recharts 24-hour bar chart with current hour reference line)
- [x] S11.5 — Create src/components/SparklineChart.tsx ✅ (6-hour Recharts area sparkline, UoM Gold)
- [x] S11.6 — Add "Usually peaks at..." text calculation ✅ (getPeakHour in predictionInsights.ts)
- [x] S11.7 — Add "Best time to go today" calculation ✅ (getBestTimeToGo + getAvoidWindow in predictionInsights.ts, 23 unit tests)
- [x] S11.8 — Add confidence badge (Google vs UniSpace source) ✅ (PredictionSourceBadge.tsx)
- [x] S11.9 — Wire charts into BuildingCard expanded state ✅ (PredictionSection in BuildingCardExpanded)

**Test criteria:**
- 24-hour prediction chart renders with Google data
- Current hour indicator visible on chart
- "Usually X%" text matches prediction data
- Sparkline shows last 6 hours of actual occupancy
- Source badge correctly shows "Google data" when using google_popular_times

**Notes:**
- Phase 1 uses Google data as baseline — UniSpace's own EWMA predictions come in Phase 3
- Reference PRD Section 6.4 (F004) for prediction logic
- Gold bars = UniSpace predicted, UoM blue bars = Google typical (in chart legend)

---

### Sprint 12: UI Polish, Theming & Production Readiness
**Goal:** Replace all hardcoded colors with CSS custom properties, add dark/light theme with toggle, build shared UI primitives, add loading skeletons, responsive layouts, and micro-animations. Zero hardcoded hex in components/pages.

**Inputs:** Sprints 0–10 complete, codebase audit revealing 150+ hardcoded colors, no dark theme, no responsive design

**Outputs:**
- Dark theme CSS custom properties (`[data-theme="dark"]`)
- `useTheme` hook with localStorage persistence + system auto-detection
- `useThemeColors` hook for Recharts (reads resolved CSS var hex values)
- ThemeToggle component (3-state: light/dark/system)
- Shared primitives: Button, Card, SectionHeader, StatusDot, SkeletonLoader, PageHeader
- BuildingCard split: shell (100 lines) + Collapsed + Expanded
- All pages migrated from inline styles to Tailwind + CSS vars
- Map dark style switching (dark-v11)
- Loading skeletons on HomePage and FindPage
- Framer Motion FAQ accordion + page transition animations
- Responsive grid on CompactCards (2→3→4 columns)
- Hover/focus/active states on all interactive elements

**Subtasks:**
- [⏭️] S12.1 — Dark theme CSS custom properties ⏭️ **SUPERSEDED by R3.** Corrected first: no
      `[data-theme]` block exists anywhere. `:root` is a **light** palette
      (`--color-bg-primary: #FFFFFF`). `useTheme.ts` actively *strips* stale `data-theme`
      attributes — dark mode was added and then deleted. Superseded by R3 (SIGNAL: no light theme).
- [⏭️] S12.2 — Tailwind config bridge ⏭️ **SUPERSEDED by R1.1**, which moved the theme into
      `@theme`. Corrected first: `tailwind.config.ts` was
      never loaded. Tailwind v4 ignores JS config unless referenced via `@config`; it is not.
      The entire bridge is dead code. Fixed in R1.
- [⏭️] S12.3 — useTheme hook ⏭️ **SUPERSEDED.** Vestigial and entirely unreferenced; deleted in R3.
      SIGNAL has one theme, so there is nothing to toggle.
- [⏭️] S12.4 — ThemeToggle component ⏭️ **SUPERSEDED.** Same; deleted in R3.
- [⏭️] S12.5 — Map dark style switching ⏭️ **SUPERSEDED by R3.8** — one SIGNAL dark style, no
      switching, because there is no second theme to switch to.
- [x] S12.6 — Button component ✅
- [x] S12.7 — Card component ✅
- [x] S12.8 — SectionHeader component ✅
- [x] S12.9 — StatusDot component ✅
- [x] S12.10 — SkeletonLoader component ✅
- [x] S12.11 — PageHeader component ✅
- [x] S12.12 — BuildingCard split + style migration ✅
- [x] S12.13 — HomePage style migration ✅
- [x] S12.14 — FindPage style migration ✅
- [x] S12.15 — AlertsPage style migration ✅
- [x] S12.16 — RecommendationCard style migration ✅
- [x] S12.17 — Prediction components style migration ✅
- [x] S12.18 — Final colour audit ✅ **Genuinely true since R3.3** — hex outside the two token
      sources is now zero and asserted by test. (The original claim was "no hardcoded hex
      (grep clean)". Actual: **169 hardcoded hex literals across 17 files**, including inline
      `style={{ backgroundColor: '#003865' }}` on the "Find a Spot" button in `MapPage.tsx`.
      Retired wholesale in R3.
- [x] S12.19 — Hover/focus/active states ✅
- [x] S12.20 — Touch targets + accessibility ✅
- [x] S12.21 — HomePage responsive layout ✅
- [x] S12.22 — BuildingCard + MapPage responsive ✅
- [x] S12.23 — FindPage + AlertsPage responsive ✅
- [x] S12.24 — Loading skeletons for HomePage ✅
- [x] S12.25 — Loading skeletons for FindPage ✅
- [x] S12.26 — Card press + button feedback animations ✅
- [x] S12.27 — Page transition animations ✅
- [x] S12.28 — useThemeColors hook for Recharts ✅
- [x] S12.29 — Theme integration testing ✅
- [x] S12.30 — Final audit ✅ **Genuinely passing since R1.** (Originally recorded as passing but
      recorded as passing but demonstrably did not run, or ran only `vite build` (which succeeds
      while `tsc -b` fails). **Root cause of how three fatal defects shipped unnoticed.** R1 adds
      a build-output CSS assertion so this class of silent failure cannot recur.

**Test criteria:**
- Toggle theme: light → dark → system auto — all pages correct
- Map switches between light-v11 and dark-v11 styles
- Theme persists across page reload (localStorage)
- No hardcoded hex in components (`grep` clean)
- All components under 150 lines
- All buttons/cards have hover + focus-visible states
- Responsive: test at 375px, 768px, 1024px
- Loading skeletons show on initial load
- `tsc -b` zero errors, 114 tests pass

**Notes:**
- New UI primitives: src/components/ui/Button.tsx, Card.tsx, SectionHeader.tsx, StatusDot.tsx, SkeletonLoader.tsx, PageHeader.tsx
- BuildingCard split into BuildingCard.tsx (shell) + BuildingCardCollapsed.tsx + BuildingCardExpanded.tsx
- FilterChips.tsx last hardcoded `#FFFFFF` replaced with `var(--color-text-on-navy)`
- PredictionSourceBadge now uses `var(--color-bg-chip)` instead of computed `${color}10`
- Framer Motion AnimatePresence added to FAQ accordion and App.tsx page routes

---

## Phase 1.5 — Competitive Edge (Pre-MVP Features)

> Sprints 13–15 added from competitive research (March 2026). These features close gaps identified by analysing 9 campus apps. All sprints renumbered +1 from original plan due to S12 insertion.

### Sprint 13: Manual Crowd Reporting
**Goal:** Allow students to manually report how busy a building is (1–5 scale), solving the cold-start problem without requiring sensors.

**Inspired by:** Campus Spots, Muggerino

**Inputs:** Sprint 6 (blending logic), Sprint 8 (BuildingCard)

**Outputs:**
- occupancy_reports table with anonymous 1–5 busyness + optional noise level
- Edge Function for report submission with rate limiting
- Linear decay weighting over 30-minute report lifespan
- Crowd-report source integrated into blending hierarchy (between live and google)
- Report FAB on map page, report prompt in BuildingCard
- Realtime subscription for fresh reports

**Privacy:** No user_id. Session used only for in-memory rate-limiting in Edge Function. Reports auto-expire after 30 minutes.

**Subtasks:**
- [x] S13.1 — Migration 012_occupancy_reports.sql ✅ (table + indexes + RLS + Realtime, ip_hash for rate limiting)
- [x] S13.2 — Edge Function submit-report/index.ts ✅ (Zod validation, SHA-256 IP hash, rate-limit 5/hr, no session_id)
- [x] S13.3 — src/lib/reportDecay.ts ✅ (linear decay, REPORT_LEVEL_TO_PCT mapping, aggregateReports)
- [x] S13.4 — Update src/lib/blending.ts ✅ (crowd-report as Priority 2 between live and google)
- [x] S13.5 — src/hooks/useReportSubmit.ts ✅ (5-min client throttle via localStorage)
- [x] S13.6 — src/components/ReportSheet.tsx ✅ (5-level picker + optional noise, Framer Motion bottom sheet)
- [x] S13.7 — src/components/ReportFAB.tsx ✅ (fixed FAB, nearest-building logic, hidden when card visible)
- [x] S13.8 — Add "How busy is it?" prompt + report count badge to BuildingCard ✅
- [x] S13.9 — src/hooks/useRecentReports.ts ✅ (initial fetch + Realtime INSERT subscription + 60s prune interval)
- [x] S13.10 — Unit tests ✅ (9 decay + 3 blending = 12 tests, all passing)
- [x] S13.11 — Update src/types/index.ts ✅ (ReportLevel, NoiseLevel, OccupancyReport, DataQuality with 'crowd-report')

**Test criteria:**
- Report submission stores building_id + level + timestamp (no user_id)
- Reports expire after 30 minutes and are excluded from aggregation
- Decay function returns correct weight at 0, 15, and 30 minutes
- Blending correctly inserts crowd-report between live and google sources
- Rate limit prevents more than 1 report per building per 5 minutes (client) and 5/hr (server)
- FAB and BuildingCard prompt both open ReportSheet

---

### Sprint 14: Noise Levels & Favourites
**Goal:** Add noise level display (from crowd reports) and localStorage-based favourites — two engagement hooks that require no account.

**Inspired by:** Muggerino

**Inputs:** Sprint 12 (reports with optional noise_level)

**Outputs:**
- Noise level indicator in BuildingCard (aggregated from reports, minimum 3 reports)
- Favourites stored in localStorage (array of building IDs)
- "Your Favourites" section on HomePage
- "Low Noise" filter chip in FindPage
- Updated scoring algorithm (noise_score when noise filter active)

**Privacy:** Favourites in localStorage only. Zero server storage. Noise aggregated from anonymous reports.

**Subtasks:**
- [x] S14.1 — Noise level display in BuildingCard ✅ (NoiseIndicator component, aggregated from reports, min 3 threshold)
- [x] S14.2 — src/hooks/useFavourites.ts ✅ (localStorage array, toggle/isFavourite/favouriteIds)
- [x] S14.3 — src/components/FavouriteButton.tsx ✅ (animated heart toggle, Framer Motion whileTap)
- [x] S14.4 — "Your Favourites" section on HomePage ✅ (above "Quiet Right Now", hidden when empty)
- [x] S14.5 — "Low Noise" filter chip in FilterChips ✅
- [x] S14.6 — Update scoring ✅ (noise_score * 0.1 when low_noise active, amenity reduced to 0.1, filters out level > 2)
- [x] S14.7 — src/lib/noiseAggregation.ts ✅ (weighted average with decay, reuses reportWeight from reportDecay.ts)
- [x] S14.8 — Unit tests ✅ (6 noise aggregation + 3 scoring = 9 tests)

**Test criteria:**
- Noise level shows when >= 3 reports exist for a building
- Favourites persist across page reloads (localStorage)
- Favourites section appears on HomePage when non-empty, hidden when empty
- "Low Noise" filter correctly filters and re-scores results
- Scoring formula adjusts weights when noise filter active

---

### Sprint 15: Building Photos & Tips
**Goal:** Add building exterior photos and tips to enrich building content, closing the content gap with LostOnCampus.

**Inspired by:** LostOnCampus

**Inputs:** Sprint 8 (BuildingCard), existing buildingMeta.ts tips data

**Outputs:**
- 2–3 CC-licensed WebP photos per building (static assets)
- Photo carousel in BuildingCard expanded state
- Tips list in BuildingCard expanded state
- Building thumbnail in HomePage building rows

**Privacy:** Static assets only. No user uploads until Phase 5.

**Subtasks:**
- [⏭️] S15.1 — Curate photos ⏭️ DEFERRED: photos[] field added to BuildingMeta interface and PhotoCarousel component ready, but actual CC-licensed WebP assets need manual curation
- [x] S15.2 — Update buildingMeta.ts: add photos[] to BuildingMeta interface ✅
- [x] S15.3 — src/components/PhotoCarousel.tsx ✅ (CSS scroll-snap, lazy images, IntersectionObserver dot indicators)
- [x] S15.4 — Add PhotoCarousel to BuildingCard expanded state ✅ (below amenities, above tips)
- [x] S15.5 — src/components/TipsList.tsx ✅ (expandable list, show 2 by default, "Show more" toggle)
- [x] S15.6 — Wire TipsList into BuildingCard expanded state ✅ (replaces inline bullet tips)
- [⏭️] S15.7 — Building thumbnail in HomePage BuildingRow ⏭️ DEFERRED: requires photo assets from S15.1
- [x] S15.8 — Optimize: loading="lazy", decoding="async" on all images ✅

**Test criteria:**
- Photos load lazily in carousel (no eager load of off-screen images)
- Carousel scrolls with snap points
- Tips display correctly from buildingMeta
- Thumbnail appears in HomePage building rows
- All images under 400KB, WebP format

---

### Sprint 16: PWA Install Flow + Service Worker
**Goal:** Complete PWA configuration with install prompts, service worker caching, and offline support.

**Inputs:** Sprint 0 (PWA manifest configured), Sprint 7 (app is functional)

**Outputs:**
- Service worker caches app shell, building metadata, last occupancy snapshot
- Install banner after 30s engagement (shown once)
- iOS-specific install modal (Share → Add to Home Screen)
- Android native install prompt
- Offline indicator banner

**Subtasks:**
- [x] S16.1 — Configure workbox caching strategies in vite.config.ts ✅ (Mapbox tiles CacheFirst 7d + Supabase API StaleWhileRevalidate 5min)
- [x] S16.2 — Add runtime caching for Supabase API responses (stale-while-revalidate) ✅
- [x] S16.3 — Create src/components/InstallBanner.tsx ✅ (fixed bottom banner, iOS/Android messaging, dismiss for 7 days)
- [x] S16.4 — Implement 30-second engagement timer (localStorage flag for "shown once") ✅ (useInstallPrompt hook)
- [x] S16.5 — Implement iOS detection and custom install modal ✅ ("Tap Share → Add to Home Screen")
- [x] S16.6 — Implement Android beforeinstallprompt handler ✅ (deferred prompt capture + Install button)
- [x] S16.7 — Create src/components/OfflineBanner.tsx ("Last updated X min ago") ✅ (amber top banner with AnimatePresence)
- [x] S16.8 — Create placeholder PWA icons (192px, 512px, 512px maskable) in public/icons/ ✅ (UniMelb navy "U" icons)

**Test criteria:**
- App installs on Android via native prompt
- iOS modal shows correct instructions
- Banner only appears once per device
- Offline: app shell loads from cache, shows stale data banner
- Service worker registered and caching assets

**Notes:**
- Reference PRD Section 6.7 (F007) for install flow spec
- Reference PRD Section 12.8 for install banner UI
- vite-plugin-pwa handles most SW generation — customise via workbox config

---

### Sprint 17: Seed Data Verification
**Goal:** Verify and refine seed data for all UoM buildings. Building polygons already completed in S7 (18 buildings, OSM-sourced).

**Inputs:** Sprint 1 (initial seed), Sprint 7 (expanded to 18 buildings), real-world UoM building data

**Outputs:**
- Verified amenity flags for each building
- Accurate building hours
- Floor zones with reasonable capacity estimates
- Google Place IDs verified against Google Places API

**Subtasks:**
- [x] S17.1 — Verify building hours from UoM website ✅ (added Sunday hours for libraries: ERC, Law, Alan Gilbert; teaching buildings correctly closed weekends)
- [x] S17.2 — Verify amenity flags (WiFi, power, quiet zones, accessibility) ✅ (confirmed: WiFi/power universal, quiet zones in 4 libraries, food nearby in 11, accessibility verified)
- [⏭️] S17.3 — Verify Google Place IDs ⏭️ **OWNER-GATED** (Ship Runbook § 5) — needs a Places
      API key. Corrected 2026-08-14:
      migration `013` **does not exist in the repo** (`supabase/migrations/` jumps `012 → 014`;
      `grep -rn "013_"` finds nothing). The 12 Place IDs were applied directly to the cloud DB,
      which has since been deleted. **Work is unrecoverable and must be redone** — see R1.
- [⏭️] S17.4 — Adjust floor zone capacity estimates ⏭️ DEFERRED: current estimates are directional and sufficient for MVP
- [x] S17.5 — Update seed script ✅ Reconciled in R1.7 and R2.7. Corrected 2026-08-14: the missing
      migration `013`. Also unresolved: `003_additional_buildings.sql` still seeds `brownless-*`,
      which S7 records as removed, so seed data and `buildingMeta.ts` (18 slugs, no Brownless)
      disagree. Reconciled in R1.

**Test criteria:**
- All 18 buildings visible on map at correct positions (already done in S7)
- Amenity data is accurate for each building
- Google Place IDs return valid API responses

**Notes:**
- Polygon verification already completed in S7 (OSM-sourced, up to 58 vertices)
- Capacity estimates are directional, not precise — label as "~"

---

### Sprint 18: MVP Integration Testing + Deploy to Vercel
**Goal:** Full end-to-end testing of the complete MVP feature set (including crowd reporting, noise, favourites, photos) and deployment to Vercel.

**Inputs:** All Sprints 3–16 complete

**Outputs:**
- All features working together end-to-end
- TypeScript compiles with zero errors
- ESLint passes
- Core unit tests pass (target: 100+ including new S12–S14 tests)
- Deployed to Vercel with environment variables configured
- Accessible via public URL

**Subtasks:**
- [x] S18.1 — Run full TypeScript type check ✅ **Genuinely passing since R1.3.** (The original
      claim of "0 errors" was false — `tsc -b` reported 4, and since `build` = `tsc -b && vite
      build` the project could not deploy at all. Both `useWebPush` errors turned out to be real
      defects rather than type noise.)
- [x] S18.2 — Run ESLint and fix any issues ✅ **Genuinely passing since R1.4** — all 10 real
      errors fixed with no suppressions. (The original claim of "0 new errors" was false.)
- [x] S18.3 — Run all unit tests ✅ (140 tests, 14 files, all passing — re-verified 2026-08-14)
- [x] S18.4 — Open app → heatmap → building card ✅ Logic verified by `journeys.test.ts` against
      the real 18 buildings; the map renders locally on fixtures.
- [x] S18.5 — Recommendations → filters → ranked results ✅ `journeys.test.ts` asserts ordering,
      narrowing on amenity filters, the occupancy cap, and that the empty state is reachable.
- [⏭️] S18.6 — GPS permission flow ⏭️ **Owner-verified** — a browser permission prompt cannot be
      driven from a test. The deny path renders `LocationPrompt` (S23.5). Ship Runbook § 4.
- [⏭️] S18.7 — Mobile viewport at 375px ⏭️ **Owner-verified** — needs a real device. Layouts are
      mobile-first with an `xs: 375px` breakpoint. Ship Runbook § 4.
- [x] S18.8 — Submit crowd report → reflected in blending ✅ `journeys.test.ts` asserts the report
      changes that building's reading, leaves every other building untouched, and outranks the
      estimate it replaces.
- [x] S18.9 — Toggle favourite → persists ✅ Covered by `journeys.test.ts` and `localStore.test.ts`,
      including the reload that S14 claimed but never asserted.
- [x] S18.10 — Noise level at the report threshold ✅ `journeys.test.ts` asserts it stays hidden
      below three reports and appears at three with the count shown.
- [~] S18.11 — Photo carousel and tips ⚠️ Tips verified; the carousel has no photos to show until
      the CC-licensed assets exist (S15.1, Ship Runbook § 5). Metadata coverage is asserted.
- [⏭️] S18.12 — Configure Vercel project with environment variables ⏭️ **MOVED** to
      § *Owner-Gated Ship Runbook* (Bruno's instruction: defer all owner-gated work to the end)
- [⏭️] S18.13 — Deploy to Vercel ⏭️ **MOVED** to § *Owner-Gated Ship Runbook*
- [⏭️] S18.14 — Verify deployed app loads and connects to Supabase ⏭️ **MOVED** — and note this
      cannot be true today: the Supabase project referenced by `.env.local` **no longer exists**

**Test criteria:**
- Zero TypeScript errors
- Zero ESLint errors
- All unit tests pass (87 existing + ~23 new from S12–S13)
- App is accessible via Vercel URL
- Heatmap renders with building polygons
- Building cards open and show data (including photos, tips, noise)
- Recommendations work with filters (including noise filter)
- Crowd reporting flow complete
- Favourites persist across sessions

**Notes:**
- Vercel deployment config is straightforward for Vite — build command: `pnpm build`, output: `dist`
- Ensure Supabase URL CORS allows the Vercel domain
- Edge Functions need to be deployed separately to Supabase

---

## Phase 1.9 — Recovery (added 2026-08-14 after the forensic audit)

> These five sprints exist because `WIRING-AUDIT.md` found three independent systemic failures
> underneath a feature set that is otherwise real. **None of this is new features.** R1–R2 are
> prerequisites for verifying anything at all; R3–R4 apply Bruno's locked design and motion
> systems, which the app currently implements neither of; R5 re-checks the sprints whose `[x]`
> marks were never observed against a working backend.
>
> **Sprint 18 (Deploy) does not close here.** Its deploy sub-tasks move to the
> § *Owner-Gated Ship Runbook* at the end of this document, per Bruno's instruction to defer all
> owner-gated work to the very end.

### Sprint R1: Foundation Repair — the three root causes
**Goal:** Make the project compile, make Tailwind emit CSS, and stop the app dying on bad config.
Nothing downstream can be verified until this passes.

**Subtasks:**
- [x] R1.1 — **Tailwind v4 migration (RC-2)** ✅ `@import "tailwindcss"` + `@theme` block in
      `src/index.css`; `tailwind.config.ts` deleted (v4 never loaded it). Emitted utilities went
      **97 → 194**; all spacing / font-size / weight / radius scales now compile.
      Also added `@source not "../**/*.md"` — Tailwind was scanning the markdown docs and
      generating classes from class names quoted in prose, one of which was malformed and made
      lightningcss fail to minify the whole stylesheet.
- [x] R1.2 — **CSS emission assertion** ✅ `src/index.css.test.ts` (14 tests). Compiles the real
      stylesheet through Vite + PostCSS and asserts one utility per theme namespace. Asserts on
      **build output, not source** — a source-level check would have passed happily throughout the
      outage. ~200ms. It caught the malformed-class bug above on its first run.
- [x] R1.3 — **Fixed the 4 `tsc` errors (RC-3)** ✅ Both `useWebPush.ts` issues were real bugs, not
      type noise: the `PushSubscriptionJSON` cast asserted `keys.p256dh`/`keys.auth` exist when the
      DOM type has them optional (any browser omitting one would crash downstream reads), replaced
      with a validating narrowing function; and the VAPID key is now built over an explicit
      `ArrayBuffer` so it is a genuine `BufferSource`. Unused import removed from `HomePage.tsx`.
- [x] R1.4 — **Fixed all 10 ESLint errors** ✅ No suppressions. Refs in `Map.tsx` /
      `usePositionBroadcast.ts` moved out of render into effects (mutating during render is unsafe
      under concurrent React); `StaleDataBanner`, `useAlerts` and `MapPage` now derive state that
      was being mirrored by effects; `useGeolocation` seeds unsupported-browser state at init.
      ESLint config now honours the `_`-prefix convention rather than forcing per-site disables.
  - [x] R1.4.extra — `useGeolocation.isWatching` now means "a fix is arriving" rather than "a watch
        is registered". It previously flipped true on registration — before the permission prompt
        was answered — so position broadcasting could be enabled for a watch that never produced a
        position.
- [x] R1.5 — **Fail-soft Supabase config (B7)** ✅ `src/lib/supabase.ts` no longer throws at import.
      It sits at the root of nearly every hook's import graph, so throwing took the bundle down
      before React mounted — a blank page with nothing to explain it. Now exports
      `isSupabaseConfigured` / `supabaseConfigError`, and `ConfigError.tsx` names the exact missing
      variables and where to set them.
- [x] R1.6 — **Rewrote migration `013`** ✅ `013_data_verification_fixes.sql` closes the `012 → 014`
      gap and idempotently removes the two dropped buildings from any pre-existing database.
      ⚠️ **It deliberately does NOT write Google Place IDs.** 11 of 18 are NULL and the other 7 are
      themselves unverified. Resolving them needs a live Places API key, and writing
      plausible-looking IDs would reproduce exactly the failure being corrected. Recorded as
      `[PLACEHOLDER]` in the migration and moved to the Ship Runbook, step 2. Impact is contained:
      since Google is no longer an occupancy source, `google_place_id` feeds only opening hours.
- [x] R1.7 — **Reconciled seed data with `buildingMeta.ts`** ✅ Seeds contained **20** buildings
      while the UI and README said 18 — Brownless and Giblin Eunson were removed from
      `buildingMeta.ts` in S7 but never from the seeds. Both now removed from `003` (buildings,
      zones, occupancy backfill) and `004` (curves). **Seeds = buildingMeta = 18.**
- [x] R1.8 — **Fixed unbacked numbers** ✅ Curve rows recounted from the committed seeds after the
      removal: **1,172** (`002` = 335 + `004` = 837). README's 1,453 and the plan's 1,252 were both
      unbacked. README also now states plainly that the curves are UniSpace's own modelled
      estimates, not Google data.
- [x] R1.9 — **Pinned the package manager** ✅ `packageManager: pnpm@11.13.0`. `node_modules` had
      been installed by pnpm 10 while the global was 11, so `pnpm install` refused to proceed —
      the same drift would have hit CI.

**Gate:** ✅ **PASSED 2026-08-14.** `pnpm build` green (first successful build since S20) ·
`pnpm lint` zero errors · `pnpm test` 154/154 pass (140 + 14 new) · R1.2 assertion passes.
Verified with `pnpm` itself, not `vite build` — running only the latter is what hid RC-3.

---

### Sprint R2: Local Fixture Layer
**Goal:** Make the entire app runnable and verifiable with no cloud backend, so the remaining ~20
sprints are not blocked on owner-gated provisioning.

**Subtasks:**
- [x] R2.1 — Fixture provider behind the existing hook signatures ✅ Introduced `src/lib/dataSource.ts`
      as the single read seam (`fetchRows` / `subscribeRows`); the five hooks call it instead of
      `supabase` directly. **No call site above the hooks changed.**
  - [x] R2.1.extra — `fetchRows` pages until the server returns a short page. `useGooglePopularity`
        previously requested exactly two pages of `google_popular_times` — correct at 1,172 rows,
        silently truncating the moment a second campus is added.
- [x] R2.2 — Derived from the committed seed SQL ✅ `scripts/parseSeedSql.mjs` +
      `scripts/generateFixtures.mjs` → `src/lib/fixtures/seedData.generated.ts`
      (`pnpm generate:fixtures`). `seedData.test.ts` fails if the generated file falls out of step,
      so fixtures and production data cannot drift.
- [x] R2.3 — Env-gated switch ✅ `VITE_USE_FIXTURES`, defaulting to fixtures whenever Supabase has
      no credentials, so a fresh clone runs with no setup. Documented in `.env.example`.
- [⏭️] R2.4 — Simulated occupancy drift ⏭️ **DEFERRED to R4**, where the motion states it exists to
      exercise are actually built. Doing it here would mean fixtures inventing "live" occupancy,
      which is the one thing they must not do — see the honesty note below.
- [x] R2.5 — Fixtures reused as test data ✅ `pipeline.test.ts` runs
      fixtures → blending → rendered values across all 18 buildings, plus zone detection against the
      real polygons and the full crowd-report loop.

**Gate:** ✅ **PASSED 2026-08-14.** `pnpm build` green · `pnpm lint` clean · **172 tests pass**
(154 → 172). Dev server serves the app with zero backend. The read path is verified end to end by
`pipeline.test.ts` rather than by inspection.

**Honesty note.** The fixtures report **no live occupancy** — every zone comes back
`data_quality: 'none'`, so blending falls through to the estimated curves. That is not a shortcut,
it is the true state of a campus app with no users, and it is the state the UI most needs to handle
well. Synthesising fake "live" numbers would make the thin-data case look solved when it is the case
most in need of design. This layer therefore *is* the cold-start mode MOTION.md asks for.

### 🐛 P0 bug found by this sprint — `blendOccupancy` ignored `data_quality`

Building the fixtures surfaced a defect that would have shipped:

`aggregate-occupancy` runs every 10 seconds and rewrites **every** zone row with a current
`last_updated`, setting `data_quality: 'none'` when no sessions were counted. `blendOccupancy`
checked only freshness. So once the cron was running with zero users, **every building on campus
would have reported `source: 'live'` at `0%` — "● Live · Empty"**, confidently telling students that
a full library was free.

All 23 existing blending tests passed throughout, because the test helper defaults to
`data_quality: 'live'` and no test ever varied it. Fixed, and pinned with four regression tests
covering the empty, fall-through, no-data and genuinely-live cases.

- [x] R2.6 — Fixed `blendOccupancy` to require `data_quality === 'live'`, not just a fresh
      timestamp ✅
- [x] R2.7 — Seed data corrected: Melbourne School of Design had Saturday curves and Student
      Pavilion Sunday curves while their hours say closed — the UI would have shown occupancy
      estimates for shut buildings. Removed (16 rows), and `seedData.test.ts` now asserts no
      building has curve data for a day it is closed. Curve rows: **1,172 → 1,156.**

---

### Sprint R3: SIGNAL Design System + Component Decomposition
**Goal:** The app implements **neither** SIGNAL **nor** PRD § 11. Apply Bruno's locked system.

**Design authority:** `~/bruno-portfolio/CLAUDE.md` § "Redesign Design Decisions (2026-07 · SIGNAL)".
Warm black `#050505` · surface `#0b0a09` · text `#f0ece4` / `#98928a` / `#55504a` · **amber
`#ffb000` as the single accent, used sparingly** · steel `#2c2925` · hairline `#1b1916`.
**No light theme. No gradients. No shadows. Border-radius max 2px. No emoji in UI.**
Monospace for data, labels and readouts. **This supersedes PRD § 11 (UoM navy/gold).**

**Subtasks:**
- [x] R3.1 — `src/index.css` → SIGNAL tokens ✅ Light palette deleted entirely. Verified against the
      **build output**: `#050505`, `#ffb000`, `#f0ece4` all present; `#003865` (UoM navy) appears
      nowhere in the shipped stylesheet.
- [x] R3.2 — Removed the vestigial theme machinery ✅ `useTheme`, `ThemeToggle` and `useThemeColors`
      were **entirely unreferenced** — dead code left by the deleted dark mode. Charts now read the
      palette through `src/lib/tokens.ts`, which exists because Recharts and Mapbox take literal
      colour strings and cannot resolve CSS custom properties.
- [x] R3.3 — Retired the hardcoded hex ✅ **169 → 20**, and the 20 that remain are the two
      deliberate single sources of truth (`constants/occupancy.ts`, `lib/tokens.ts`), whose values
      `occupancy.test.ts` asserts against `index.css` so they cannot drift.
- [x] R3.4 — Radius sweep ✅ All tokens ≤2px, including `--radius-full`, which was a 9999px pill.
      `occupancy.test.ts` fails if any radius token exceeds the cap.
- [x] R3.5 — Mono instrument voice ✅ `</section>` labels (`SectionLabel`), `>` prompt prefixes,
      `[ bracketed → ]` controls, `█░` meters. No spinners anywhere.
- [x] R3.6 — Replaced non-system controls ✅ The heart became `[*]`/`[ ]`, source glyphs became
      `● ~ · ○`, filter chips became `[x]`/`[ ]` — each stating its state in text as well as
      colour, which matters more now that amber is the only colour available to mark it.
- [x] R3.7 — Occupancy ramp re-derived ✅ **Luminance, not hue**: fuller buildings render lighter,
      emptier ones recede toward the ground. Forced by two constraints — amber is the only
      permitted colour, and MOTION.md forbids the map drawing attention toward busyness ("this app
      sells quiet, not crowds"). Amber is therefore spent on the **recommended** result instead,
      which is where the user's eye is actually useful. Green survives only on `● LIVE` and
      open/closed. A test asserts the ramp is monotonically lighter with occupancy.
- [x] R3.8 — Mapbox restyled ✅ Single dark style (no switching — there is one theme), steel
      hairline outlines, uppercase tracked labels haloed in the background colour so they sit *in*
      the dark rather than on light chips floating above it.
- [x] R3.9 — **Decomposed every oversized component** ✅ All now under 150 lines:
  - `HomePage` **399 → 109** — extracted `useCampusOverview` (campus figures were being
    recomputed inline in three components with different rules about missing data) plus
    `home/CampusStatus`, `home/TileGrid`, `home/BuildingTile`, `home/BuildingRow`,
    `home/AllBuildings`.
  - `BuildingCard` **297 → 132** — split into `BuildingCardHeader` / `Summary` / `Details`.
  - `FindPanel` **224 → 126** — extracted `useFindFilters`, `FindResults`, `FindResultRow`,
    `FilterChipRow`.
  - `MapPage` **196 → 144** — extracted `useCrowdReporting`, `MapBuildingSheet`, `FindTrigger`,
    and `findNearestBuilding` as a pure, testable function.
  - `AlertsPage` **129 → 62**, `AlertSetup` **155 → 135**, `ReportSheet` split.
- [x] R3.10 — **Accessibility improvements taken while the files were open** ✅ Tiles and rows are
      real `<button>`s instead of divs with `role`, so keyboard activation and focus come from the
      platform rather than hand-rolled key handlers; the level pickers became proper radiogroups;
      the occupancy bar exposes `role="meter"` with a text value; every touch target clears 44px.
- [x] R3.11 — **Data-honesty copy fixes found during the re-skin** ✅ The FAQ claimed "we use
      Google's typical busyness patterns" and `PredictionSourceBadge` read "Based on Google
      historical patterns" — neither was true, and both contradicted PRD § 13.4. Rewritten as
      modelled estimates, with an FAQ entry explaining what Google *is* used for (opening hours).
      `AlertsPage` now also states plainly when the app is running on fixture data rather than live.

**Gate:** ✅ **PASSED 2026-08-14.** `pnpm build` green · `pnpm lint` clean · **173 tests pass** ·
R1.2 CSS assertion still passes · no light-theme CSS and no UoM navy remain in the built output ·
every component under 150 lines.

---

### Sprint R4: MOTION.md Implementation
**Goal:** `MOTION.md` is binding product behaviour, not polish. Implement it.

**Subtasks:**
- [x] R4.1 — **Breathing occupancy zones** ✅ `useBreathingLayer` — ±8% opacity, 4s, cosine-eased so
      the loop has no discontinuity at its boundary (a linear sawtooth snaps once per cycle).
      Opacity only: anything moving position or colour would compete with the cross-fade that
      signals a real change. **Breathing is gated on there actually being live data** — with none,
      animating the map would assert a liveness the data does not have, which is the same
      dishonesty as the "Live · 0%" bug fixed in R2.
- [x] R4.2 — **Change reads differently from liveness** ✅ `useBatchedOccupancy` reports whether the
      *displayed* values moved (rounded pct or source), not whether a repaint happened; on a real
      change breathing pauses for 400ms while the zone cross-fades, then resumes.
- [x] R4.3 — **Numbers count, never teleport** ✅ `useCountUp` + `CountUpValue`, integer steps over
      ≤400ms, `data-count` applying tabular figures so width cannot jitter. Applied to the badge,
      home tiles, building rows and recommendation rows.
- [x] R4.4 — **Confidence as a visual state** ✅ `lib/confidence.ts` is now the single definition of
      the three tiers. Previously the map, the cards and the recommendation rows each decided for
      themselves what `google` meant, which is how an estimate came to render identically to a live
      reading. Seven tests pin the invariants — most importantly that breathing and the green dot
      can *only* appear for genuinely live sources.
- [⏭️] R4.5 — Map marker drop-in ⏭️ **DEFERRED:** the map renders building *polygons*, not markers,
      so the specified drop-and-scale has no object to apply to. The layered-arrival intent is met
      instead by the fill's 400ms cross-fade over an already-drawn basemap. Revisit if markers are
      ever added.
- [x] R4.6 — Building card ✅ Sheet 280ms ease-out (no spring), occupancy bar fills over 500ms
      linear in step with the count-up, floor rows reveal on a 60ms stagger.
- [x] R4.7 — **Recommendations reorder via FLIP** ✅ Framer's `layout="position"` inside a
      `LayoutGroup` — genuine FLIP, measuring before and after rather than guessing. Disabled under
      reduced motion.
- [x] R4.8 — **Manual report loop** ✅ Submit → 12-char `[████░░░░]` meter over 600ms →
      `> thanks — updating…` held for 1.1s → sheet closes onto the updated map. The acknowledgement
      exists so the user sees their report land instead of watching the sheet vanish and wondering
      whether it counted. Failure keeps the sheet open with its error — a failed report that
      silently disappears looks exactly like one that worked.
- [x] R4.9 — **Batched to one visual pass per 5s** ✅ And frozen entirely while a card is open, per
      MOTION.md's rule against the map reflowing beneath something being read.
- [x] R4.10 — Skeletons ✅ 1.6s opacity pulse (no layout shift by construction), content-shaped,
      heights reserved.
- [x] R4.11 — **`prefers-reduced-motion` full pass** ✅ CSS neutralised globally in `index.css`;
      `usePrefersReducedMotion` covers what CSS cannot reach — breathing, count-up, FLIP, the
      terminal meter and the typed line. **A test asserts that every file using
      `requestAnimationFrame` consults it**, so a future animation cannot quietly ignore the
      preference. No information is lost: every animated value is also readable as text.
- [x] R4.12 — **Cold-start screen as a first-class design** ✅ `ColdStartNotice` types
      `~ estimated from typical campus patterns` at 40ms/char under the map title when nothing is
      live, and disappears the moment anything is. This is the state the app spends its first week
      in; an unexplained map of estimates reads as stale data or a bug rather than as the system
      working exactly as designed.
- [x] R4.13 — **`src/lib/motion.test.ts` enforces the spec's hard rules** ✅ No springs, nothing
      over 600ms, no spinners, reduced-motion respected. It found two real violations on its first
      run: `constants/animations.ts` still exported a spring, and the map's colour transition was
      still the PRD's 800ms rather than MOTION.md's 400ms — which also meant it outlasted the
      window breathing was paused for, so the two would have overlapped.

**Gate — MOTION.md acceptance checklist, verbatim:**
> Two items need a human with a screen recorder and are marked **owner-verified** in the Ship
> Runbook rather than claimed here. Everything checkable in code is checked and enforced by test.
- [⏭️] Breathing invisible in any single frame; visible over 4s of recording ⏭️ **owner-verified** —
      amplitude and easing implemented to spec; only a recording can confirm the perceptual claim
- [⏭️] Change vs liveness visually distinct in a recording ⏭️ **owner-verified** — implemented as
      two distinct mechanisms (breathing pauses, zone cross-fades); needs an eye to confirm
- [x] All three confidence tiers distinguishable in a screenshot ✅ distinct opacity, qualifier text
      and border style; asserted by `confidence.test.ts`
- [x] Cold-start (0 users) screen looks intentional ✅ implemented; **this is the default state of
      the fixture build**, so it is what anyone running the app locally sees first
- [x] Manual-report loop (submit → see your zone update) end to end ✅ works with no backend, via
      the fixture layer
- [x] `prefers-reduced-motion` full pass: static everything, no information lost ✅ enforced by test
- [x] No layout shift on skeleton→content anywhere (CLS ≈ 0) ✅ opacity-only pulse, heights reserved

**Gate — MOTION.md acceptance checklist, verbatim:**

> ⚠️ **DUPLICATE, flagged 2026-08-15.** This block and the one immediately above it are two passes at
> the same gate; the second was evidently a revision that was appended rather than merged. **This
> one is the current record** — it is the later of the two and cites the enforcing tests by name
> (`journeys.test.ts`, `motion.test.ts`). Both are left in place because masterplan content is never
> deleted. The two agree on every outcome; only the evidence cited differs.

- [⏭️] Breathing invisible in any single frame; visible over 4s of recording ⏭️ **owner-verified**
- [⏭️] Change vs liveness visually distinct in a recording ⏭️ **owner-verified**
- [x] All three confidence tiers distinguishable ✅ distinct opacity, qualifier and border style;
      asserted by `confidence.test.ts`
- [x] Cold-start (0 users) screen looks intentional ✅ and it is the **default** state of the
      fixture build, so it is what anyone running the app locally sees first
- [x] Manual-report loop (submit → see your zone update) ✅ works with no backend; asserted end to
      end by `journeys.test.ts`
- [x] `prefers-reduced-motion` full pass ✅ enforced by `motion.test.ts`
- [x] No layout shift on skeleton→content (CLS ≈ 0) ✅ opacity-only pulse, heights reserved

---

### Sprint R5: Re-verify S13–S17 against the fixture layer
**Goal:** Every `[x]` in S13–S17 was marked without a working backend. Observe each one.

**Subtasks:**
- [x] R5.1 — S13 crowd reporting verified end to end ✅ `pipeline.test.ts` runs submit → decay →
      blending → subscriber notification against the real 18 buildings, with no backend.
- [x] R5.2 — S14 favourites + throttle verified ✅ Extracted the storage logic to `lib/localStore.ts`
      as pure functions and covered it with 13 tests — including S14's own stated criterion,
      "favourites persist across page reloads", which had never actually been asserted.
  - [x] R5.2.extra — **All client storage now routes through one auditable module.** It was
        previously scattered across three hooks with raw `localStorage` calls, each with its own
        error handling or none. Given that "we store nothing about you server-side" is a product
        guarantee, the thing that *is* stored should be readable in one place.
  - [x] R5.2.extra — Fixed three latent bugs found while extracting: storage access was unguarded
        (Safari private mode throws on `setItem`, which would have crashed favouriting); a corrupted
        or hand-edited value could take down the home screen; and keys still used the retired
        `pulse_` prefix, so the rename would have silently discarded anyone's saved favourites.
        A migration now moves them across once.
- [x] R5.3 — S15 photos + tips ✅ Carousel and tips verified against `buildingMeta`.
      **S15.1 / S15.7 remain correctly deferred** — the components are ready and lazy-load; what is
      missing is CC-licensed WebP assets, which is owner-gated work (Ship Runbook § 5).
- [x] R5.4 — S16 PWA ✅ Install prompt, offline banner and service-worker caching verified.
      Found and fixed: **the manifest still carried the retired UoM palette** (`#030D1A` /
      `#003865`), so the install splash and OS chrome would have flashed navy against a warm-black
      app. Manifest, `theme-color` and `color-scheme` now all declare `#050505`, and the app has a
      real meta description for the first time.
- [x] R5.5 — S17 seed data ✅ Hours and amenities verified; the seed/`buildingMeta` mismatch and the
      closed-day curve rows were fixed in R1.7 and R2.7. **Place IDs remain genuinely unresolved**
      and are recorded as a placeholder in migration `013` rather than invented — see R1.6.
- [x] R5.6 — **Data-honesty relabel** ✅ Completed in R3.11: every "Google" claim removed from the
      UI, FAQ rewritten, and an entry added explaining what Google actually provides (opening
      hours). Verified by `confidence.test.ts`, which asserts no qualifier can mention Google.
- [x] R5.7 — **`/find` route resolved** ✅ Decided in favour of both rather than leaving plan and
      code disagreeing: the panel stays — on a phone, sliding it over the map beats navigating away
      from the thing you are choosing between — and `/find` now renders the same screen with the
      panel already open, so the route PRD § 12.5 specifies is real, deep-linkable and shareable.
- [x] R5.8 — **`privacy.test.ts` makes the product's central promise executable** ✅ "GPS never
      leaves your device" was held by convention and code review alone. Six tests now fail the build
      if anyone persists the session id, writes it in an Edge Function `insert`/`upsert`/`update`,
      puts a coordinate in a request body, adds a third-party analytics SDK, exposes the Google key
      to the client, or gives `zoneDetection` a side effect.

**Gate:** ✅ **PASSED 2026-08-14.** `pnpm build` green · `pnpm lint` clean · **203 tests pass**
(184 → 203). Every S13–S17 claim re-marked from observation.

**Open question for Bruno:** `@testing-library/react` and `jest-dom` are installed but unusable —
there is no DOM environment configured (`vitest` runs on `node`, and neither `jsdom` nor
`happy-dom` is a dependency). Logic has been extracted into pure functions and tested that way,
which is the better default regardless, but S19 (accessibility) will genuinely want to render
components to assert roles and focus order. Adding `jsdom` is a one-line dev dependency; flagged
rather than installed, per CLAUDE.md § 6.

---

## Phase 2 — Polish & Reliability

> **Re-ordered 2026-08-14** per ENGINEERPROMPT ("deploy → error states → accessibility →
> performance — the ones that matter for a public URL"). Deploy is owner-gated and moves to the
> end, giving: **S23 → S19 → S22 → S21 → S24 → S25.** Sprint numbers are retained for continuity;
> execution follows that order.

### Sprint 19: Accessibility Compliance
**Goal:** Achieve WCAG 2.1 AA compliance across all screens.

**Inputs:** MVP complete (Sprint 17)

**Outputs:**
- All elements keyboard navigable
- Screen reader compatible (VoiceOver/TalkBack)
- Minimum 4.5:1 contrast ratios
- 44x44pt touch targets
- aria-labels on all icons
- Map occupancy communicated via text (not colour alone)

**Subtasks:**
- [x] S19.1 — Keyboard navigation ✅ Tiles and rows became real `<button>`s in R3, so activation
      and focus come from the platform instead of hand-rolled key handlers. A test fails the build
      if a clickable `div` reappears.
- [x] S19.2 — Accessible names on every icon-only control ✅ Enforced by `a11y.test.ts`, which
      inspects each `<button>` for either an `aria-label` or real text content.
- [x] S19.3 — **Contrast verified by computation, not inspection** ✅ `contrast.test.ts` calculates
      WCAG ratios from `index.css`. It immediately caught a failure I had introduced in R3:
      `--color-text-dim` measures **2.56:1**, well under AA, and was carrying 49 pieces of real
      content. Fixed without deviating from the locked palette — `--text-dim` keeps its value and
      its proper decorative purpose, and a new `--color-text-muted` sits above it at 4.79:1 on the
      ground / 4.65:1 on raised surfaces. A test fails if `--text-dim` is ever used outside an
      `aria-hidden` element.
- [x] S19.4 — 44px touch targets ✅ Asserted across the codebase; `minWidth: 0` excluded as the
      flexbox idiom it is.
- [x] S19.5 — **Live region for occupancy updates** ✅ `OccupancyAnnouncer`. The visible figure
      animates as it counts, so it is `aria-live="off"` and the announcer speaks once after the
      value settles — otherwise a screen reader hears a stream of numbers that were never real
      readings. It announces the **confidence** too: a sighted user gets that from the dashed
      border and dimmed intensity, and without it "38%" would sound like a measurement when it may
      be an estimate.
- [x] S19.6 — No colour-only information ✅ Every occupancy surface carries its text label, and
      `OccupancyBar` exposes `role="meter"` with an `aria-valuetext`. This matters more than it did
      with the old palette: the SIGNAL ramp is monochrome, so anyone who cannot distinguish two
      greys has only the label.
- [⏭️] S19.7 — VoiceOver pass ⏭️ **Owner-verified** — needs a real screen reader on real hardware.
      Moved to the Ship Runbook, § 4.
- [x] S19.8 — Filters usable with assistive technology ✅ Level pickers are proper `radiogroup`s;
      filter chips are `aria-pressed` toggles that state their state in text (`[x]`/`[ ]`) as well
      as colour — which matters because amber is the only colour available to mark them.

**Test criteria:**
- Tab through entire app without mouse
- VoiceOver announces all interactive elements correctly
- No colour-only information (occupancy always has text label)
- All contrast ratios verified

**Notes:**
- Reference PRD Section 10.2 for WCAG requirements
- Occupancy labels (Empty/Quiet/Moderate/Busy/Packed) must always accompany colours

---

### Sprint 20: Push Notifications & Alerts
**Goal:** Implement occupancy alert system with Web Push notifications.

**Inputs:** Sprint 8 (alert button in BuildingCard), user_alerts table

**Outputs:**
- Alert setup sheet: set threshold per building
- Web Push subscription management
- fire-alerts Edge Function (polls every 2 min)
- Push notification when threshold breached
- Alert auto-expires after 24 hours
- Rate limiting: 5 alerts per push token per hour

**Subtasks:**
- [x] S20.1 — Create src/components/AlertSetup.tsx (threshold presets 30/50/70%) ✅
- [~] S20.2 — Implement Web Push subscription registration — ⚠️ **CORRECTED 2026-08-14:** hook
      exists but (a) it is the source of 3 of the 4 `tsc` errors that break the build, and
      (b) `VITE_VAPID_PUBLIC_KEY` is documented in `.env.example` but **absent from `.env.local`**,
      so `subscribe()` silently fails. Types fixed in R1; the key itself is owner-gated.
- [x] S20.3 — Create manage-alerts Edge Function (CRUD: create/update/delete/list) ✅ (Zod validation, filtered by push_subscription endpoint)
- [x] S20.4 — Cancel-alert via manage-alerts DELETE action ✅
- [x] S20.5 — Implement send-alerts Edge Function (check occupancy vs thresholds, Web Push delivery) ✅ (15-min cooldown, expired alert cleanup)
- [⏭️] S20.6 — Rate limiting ⏭️ DEFERRED: manage-alerts uses push_subscription filtering as natural rate limit; server-side per-token rate limit deferred to Phase 2
- [x] S20.7 — Create src/hooks/useAlerts.ts ✅ (fetch, create, update, delete via manage-alerts Edge Function)
- [x] S20.8 — Wire AlertSetup in BuildingCard ✅ (between report and directions buttons, with permission handling)
- [⏭️] S20.9 — iOS limitations ⏭️ DEFERRED: iOS Web Push requires iOS 16.4+ and home screen install — handled gracefully by useWebPush (isSupported check)

**Test criteria:**
- Can set an alert for a building at a threshold
- Receives push notification when occupancy drops below threshold
- Alert auto-expires after 24 hours
- Rate limit blocks excessive alert creation
- Graceful fallback for unsupported browsers

**Notes:**
- Reference PRD Section 6.5 (F005) for alert spec
- VAPID keys configured as Edge Function secrets
- Push token stored (encrypted), no user ID

---

### Sprint 21: Offline Graceful Degradation
**Goal:** Ensure the app remains useful when offline or on poor connections.

**Inputs:** Sprint 15 (service worker configured)

**Outputs:**
- App shell loads from cache when offline
- Last known occupancy data displayed with timestamp
- "Offline" banner with last update time
- Building metadata (names, amenities, hours) available offline
- Recommendations work with cached data

**Subtasks:**
- [x] S21.1 — Building metadata cached ✅ Workbox stale-while-revalidate on the Supabase REST
      origin, configured in S16 and verified here.
- [x] S21.2 — **Last occupancy snapshot cached** ✅ `useOfflineSnapshot` + `localStore`. The service
      worker already cached the app shell, so UniSpace opened offline — to a blank map, which is
      barely better than not opening. This fills the gap between "the app loaded" and "the data
      arrived". Capped at 6 hours: an older reading of a university building is not information,
      the day has changed shape around it.
- [x] S21.3 — Cached data labelled as old ✅ Restored readings are marked `stale`, **never the
      source they originally had**, so they pick up the low-confidence treatment automatically —
      40% intensity, dashed border, no green dot. MOTION.md: "Cached data gets the low-confidence
      treatment automatically."
- [x] S21.4 — Offline indicator ✅ `OfflineBanner` slides down once and stays static, per MOTION.md
      — a persistent condition that keeps animating reads as a fault repeating.
- [x] S21.5 — Recommendations work on stale data ✅ They read the same blended map, so the snapshot
      feeds them unchanged.
- [x] S21.6 — **Reconnection refresh** ✅ `useRefetchOnReconnect`. Losing signal also drops the
      Realtime subscription and nothing else re-fetches, so a user who went underground kept
      looking at a frozen screen indefinitely. Coming back online now re-reads and re-subscribes in
      one coordinated pass.
- [⏭️] S21.7 — Airplane-mode test ⏭️ **Owner-verified** — needs a real device. Ship Runbook § 4.

**Test criteria:**
- App loads from cache in airplane mode
- Last occupancy data visible with stale timestamp
- Offline banner visible
- Reconnection triggers fresh data fetch
- No JS errors when offline

**Notes:**
- Stale-while-revalidate strategy for building data
- Occupancy data: show last known with clear staleness indicator

---

### Sprint 22: Performance Optimisation
**Goal:** Meet all performance targets from PRD Section 10.1.

**Inputs:** MVP feature-complete

**Outputs:**
- LCP < 2.5s (4G), < 4s (3G)
- TTI < 3 seconds
- Map pan/zoom >= 60fps on iPhone 12+
- Building card open < 200ms
- Recommendations recalculate < 500ms after filter change

**Subtasks:**
- [x] S22.1 — **Landing route cut from 637 KB to 189 KB gzip** ✅ (entry bundle 2,375 KB → 586 KB).
      Mapbox GL is 1.6 MB and the home screen never renders it; it now loads behind a dynamic
      import. Measured against the build output at every step.
  - [x] S22.1.extra — An instructive mistake: the first `manualChunks` config named a `charts`
        chunk for Recharts, which made things **worse**. Recharts was already correctly split with
        the lazy `BuildingCard`, and naming it caused rolldown to hoist it into a *static* import
        of the entry — adding 108 KB gzip to the landing route in the name of optimising it. Why it
        is deliberately absent is recorded in `vite.config.ts`.
- [x] S22.2 — BuildingCard lazy-loaded ✅ (and with it Recharts, 113 KB gzip).
- [x] S22.3 — Map chunk preloaded ✅ `lib/preloadMap` warms it during idle time from the home
      screen, so the split costs nothing in perceived speed.
- [x] S22.4 — Scoring memoised ✅ `useRecommendations` and `useCampusOverview` both memoise.
- [x] S22.5 — Map repaints reduced ✅ `useBatchedOccupancy` caps the heatmap at one visual pass per
      5s and freezes it entirely while a card is open.
- [⏭️] S22.6 — Lighthouse audit ⏭️ **Owner-verified** against the deployed URL. Ship Runbook § 4.
- [⏭️] S22.7 — Throttled 3G test ⏭️ **Owner-verified.** The measured 189 KB makes the PRD § 10.1
      target reachable; confirming it needs a real network.
- [x] S22.8 — Turf profiling ✅ Not needed, and better than expected: Turf **tree-shakes to zero**
      despite the `@turf/turf` meta-import — verified against the build output, not assumed.
- [x] S22.9 — **`bundleBudget.test.ts` prevents regression** ✅ Measures the real build and fails if
      the landing route exceeds budget, if Mapbox or Recharts reappear on it, or if Mapbox stops
      being one cacheable chunk. Budgets sit just above current measurements: they catch
      regressions rather than express aspirations, and raising one should be a recorded decision.

**Test criteria:**
- Lighthouse performance score >= 90
- LCP within targets
- Smooth 60fps map interaction
- No main thread blocking > 50ms

**Notes:**
- Reference PRD Section 10.1 and CLAUDE.md Section 5 for performance rules
- Turf.js Web Worker only needed at scale (>50 zones)

---

### Sprint 23: Error States & Edge Cases
**Goal:** Handle all error states gracefully with appropriate UI feedback.

**Inputs:** MVP feature-complete

**Outputs:**
- Error states for: Supabase connection failure, Mapbox tile failure, GPS failure, empty data
- Fallback list view when map tiles fail
- Retry mechanisms for transient failures
- Error boundaries around critical components
- Loading skeletons for async content

**Subtasks:**
> **The governing idea:** the worst outcome for this app is a blank page. Someone deciding whether
> to walk fifteen minutes to a library cannot tell "the app broke" apart from "there is nothing
> here", and the second answer is actively harmful. Every failure below produces a screen that
> explains itself.

- [x] S23.1 — `ErrorBoundary` ✅ Contains a render failure to one region, so a single bad building
      record loses the prediction chart rather than the whole screen. Applied at the app root and
      around the map.
- [x] S23.2 — **`BuildingListFallback`** ✅ PRD § 6.1. Mapbox is the likeliest thing here to fail —
      expired token, blocked CDN, exhausted quota — and none of that touches the occupancy data.
      Losing the map costs the nicest way to read the answer, not the answer.
- [x] S23.3 — Loading skeletons ✅ Completed in R4.10 with a 1.6s opacity pulse and reserved heights.
- [x] S23.4 — **Retry with backoff** ✅ `fetchRows` retries transient failures only. Retrying a 400
      or a permissions error just delays the message the user needs to see. A dropped connection on
      a train platform is the normal case for this app, not the exceptional one.
- [x] S23.5 — GPS denied ✅ `LocationPrompt` explains and offers to continue. It does not gate the
      app, and does not ask before explaining — a prompt arriving before the user knows why is the
      main cause of a permanently denied permission.
- [x] S23.6 — Zero buildings with data ✅ Handled by the cold-start design (R4.12) rather than as an
      error: this is the app's *normal* first-week state, not a fault.
- [x] S23.7 — Missing/invalid Mapbox token ✅ Falls through to the list view with the reason stated.
- [x] S23.8 — Console-only error logging ✅ No Sentry, no beacon, no telemetry — PRD § 13.1 rule 6
      and CLAUDE.md § 4 rule 5. `privacy.test.ts` fails the build if an analytics SDK appears.
- [x] S23.9 — `errorStates.test.ts` ✅ Asserts the structural guarantees: every error surface has
      `role="alert"`, every dead end offers an action, partial rows are never returned (a
      half-loaded map reads as "these buildings are empty"), and the boundary logs nowhere but the
      console.

**Test criteria:**
- Each error state shows appropriate UI (not a blank screen or crash)
- Retry mechanisms recover from transient failures
- Loading skeletons prevent layout shift
- Error boundaries catch rendering errors

**Notes:**
- Reference PRD Section 12.7 for No Location screen
- No third-party error tracking (PRD Privacy rules)

---

### Sprint 24: Building Data Accuracy + Room Directory
**Goal:** Verify and improve building data accuracy, and add a room directory with cross-building room search.

**Inspired by:** UniMelb Maps (room/location search)

**Inputs:** Sprint 16 (seed data), user feedback

**Outputs:**
- Building data verified against current UoM sources
- rooms table with name, floor, type, capacity, amenities
- Room list in BuildingCard (grouped by floor)
- Room search in HomePage search bar (cross-building)
- "Report inaccuracy" button in BuildingCard

**Privacy:** Rooms are static seed data. Feedback is anonymous.

**Subtasks:**
- [x] S24.1 — Migration `015_rooms.sql` ✅ (numbered 015, not 013 — that number was reclaimed by the
      data-verification migration rewritten in R1.6). Room-level *occupancy* is deliberately out of
      scope: PRD § 13.4 caps granularity at floor level so an individual cannot be located, and a
      three-seat room would defeat that.
- [⏭️] S24.2 — Seed room data ⏭️ **DEFERRED — owner-gated.** Room codes and floors are real-world
      facts about real buildings. Inventing plausible ones would be exactly the fabrication R1.6
      refused for Place IDs and R5.6 removed from the Google labelling. Recorded in the Ship
      Runbook; the fixture layer returns an empty directory and the UI handles that by rendering
      nothing.
- [x] S24.3 — `useRooms` ✅ Fetches the directory once — a few hundred static rows — rather than per
      building.
- [x] S24.4 — `RoomList` ✅ Expandable in the building card, grouped by floor. Renders nothing when
      the directory is empty: an empty "Rooms" heading would imply the building has none.
- [x] S24.5 — **Cross-building room search** ✅ `RoomSearch` on the home screen. This is the gap it
      closes: a student told to go to "Redmond Barry 101" has no idea which building that is.
      Exact code matches rank above prefix matches, so searching "101" does not bury room 101 under
      room 1011. 8 tests.
- [⏭️] S24.6 — Verify hours against the 2026 semester calendar ⏭️ **Owner-gated** — needs the
      published calendar. Ship Runbook.
  - ⚠️ **PARTIALLY CLOSED 2026-08-15.** The five library buildings now carry UoM's published hours
        (migration `017` + seeds; Ship Runbook § 5). Every seeded hour before that was invented and
        every one was wrong. Still open: the source is a *current-week* table, so it will be wrong
        over exams, summer and public holidays, and the 13 non-library buildings have no published
        source at all. The `[⏭️]` stands for that remainder.
- [⏭️] S24.7 — Verify accessibility data against UoM AccessAbility ⏭️ **Owner-gated, and the highest
      priority item in that list.** PRD § 13.4: wrong accessibility data is harmful, not merely
      inaccurate. S25's feedback path exists precisely because this cannot be fully verified from
      here.
  - ⚠️ **PARTIALLY CLOSED 2026-08-15.** The *data model* is fixed, which was the larger of the two
        problems: the columns were `BOOLEAN NOT NULL DEFAULT FALSE`, so "nobody has checked" — the
        true answer for most buildings — was unrepresentable, and every unchecked building was
        silently asserting *not accessible*. Migration `018` makes them nullable; seed `005`
        asserts only the one claim UoM states unambiguously (all libraries have lifts and an
        accessible toilet); everything else renders `[?]`. Still open: step-free entry, accessible
        parking, and all 13 non-library buildings. See Ship Runbook § 5, including the caveat that
        the source is a student-written guide rather than a facilities audit.
- [x] S24.8 — "Report an error" ✅ On every building card, not buried in settings — the correction
      path belongs where the error is seen.
- [x] S24.9 — `Room` / `RoomType` types ✅

**Test criteria:**
- Room list displays in BuildingCard, grouped by floor
- Room search returns results across all buildings
- Building hours match UoM published schedule
- Accessibility flags match UoM published data
- Report inaccuracy button functional

**Notes:**
- Accessibility data accuracy is an ethical obligation — incorrect data is harmful
- Reference PRD Section 13.4 for ethical considerations

---

### Sprint 25: Feedback System
**Goal:** Structured anonymous feedback mechanism for reporting data inaccuracies.

**Inputs:** Sprint 23 (Report inaccuracy button)

**Outputs:**
- feedback table (anonymous, category-based)
- Edge Function for submission
- FeedbackSheet component
- Wired into BuildingCard "Report inaccuracy" button

**Privacy:** Anonymous — no user_id column. No tracking of who submitted what.

**Subtasks:**
- [x] S25.1 — Migration `016_feedback.sql` ✅ Anonymous **by construction**: there is no `user_id`
      column to fill in later under pressure, and no SELECT policy, so nobody can read back what
      anyone reported.
- [x] S25.2 — `submit-feedback` Edge Function ✅ Zod validation, 500-char cap, 10/hour per IP.
  - [x] S25.2.extra — The IP hash is **salted**. An unsalted SHA-256 of an IPv4 address is
        trivially reversible by brute force — there are only four billion — which would make it a
        stored identifier in all but name. Requires an `IP_HASH_SALT` secret (Ship Runbook § 2).
        `submit-report` used an unsalted hash and has been brought in line.
- [x] S25.3 — `FeedbackSheet` ✅ Categories ordered by consequence rather than alphabetically:
      accessibility first, because PRD § 13.4 singles it out as harmful when wrong. States plainly
      that nothing identifying the sender is sent or stored.
- [x] S25.4 — Wired into the building card ✅

**Test criteria:**
- Feedback stored with category + optional text + building_id + timestamp
- No user_id in feedback table
- Rate limiting prevents spam
- Sheet opens from BuildingCard button

---

## Phases 3–5 — `[⏭ roadmap, not scheduled]`

> **Scope decision (Bruno, 2026-08-14): Sprints 26–36 are out of scope.** They are the product
> roadmap, not the work queue. Every unchecked box below is deliberate — **111 unchecked boxes are
> not 111 things to do.** Do not start any of them.
>
> *(Recounted 2026-08-15: the 111 no longer exist as `[ ]`. Acting on exactly this instruction, every
> one of them was re-marked `[⏭️]`, so a blank box could never again be mistaken for a to-do. The
> only `[ ]` boxes left anywhere in this file are the 30 open steps in the Ship Runbook.)*
>
> Phases 4–5 additionally require Supabase Auth accounts and Stripe billing, which contradict the
> PRD's own positioning (§ 13.1: *"No accounts for core features"*) and cost real money. Revisit
> only after a public URL exists and is used.

## Phase 3 — Intelligence `[⏭ roadmap, not scheduled]`

### Sprint 26: EWMA Prediction Engine `[⏭]`
**Goal:** Implement UniSpace's own prediction model using Exponentially Weighted Moving Average on occupancy_history. Replace the modelled-estimate baseline when sample_count >= 14 days for a given day/hour slot. Add confidence scoring (high/medium/low based on sample count and variance).

**Subtasks:**
- [⏭️] S26.1 — Implement EWMA calculation in compute-predictions Edge Function
- [⏭️] S26.2 — Confidence scoring (high: 14+ days, medium: 7–13 days, low: <7 days)
- [⏭️] S26.3 — Auto-switch from the modelled-estimate baseline to UniSpace predictions when threshold met
- [⏭️] S26.4 — Update PredictionChart to show confidence band
- [⏭️] S26.5 — Unit tests for EWMA and confidence calculations

---

### Sprint 27: Anomaly Detection
**Goal:** Detect unusual occupancy patterns (exam periods, events, holidays). Flag anomalies in prediction data. Adjust predictions during known unusual periods.

**Subtasks:**
- [⏭️] S27.1 — Anomaly detection algorithm (z-score based, flag >2 std deviations)
- [⏭️] S27.2 — Anomaly flag in occupancy_history
- [⏭️] S27.3 — Exclude anomalies from EWMA calculation
- [⏭️] S27.4 — UI indicator when current occupancy is anomalous

---

### Sprint 28: Personalised Recommendations
**Goal:** Learn from user behaviour (buildings visited, filters used — all local, no server storage). Weight recommendations toward user preferences. "Your usual spots" section.

**Privacy:** All preference data in localStorage. Zero server storage.

**Subtasks:**
- [⏭️] S28.1 — Track building views and filter usage in localStorage
- [⏭️] S28.2 — Preference weighting in scoring algorithm
- [⏭️] S28.3 — "Your usual spots" section on HomePage
- [⏭️] S28.4 — Clear preferences option in settings

---

### Sprint 29: Feedback Loops + Lightweight Gamification
**Goal:** Allow users to confirm/deny occupancy accuracy ("Is this right?"). Use confirmations to calibrate capacity estimates. Track prediction accuracy over time. Add lightweight gamification to encourage crowd reporting.

**Inspired by:** Muggerino (streaks, badges)

**Privacy:** All gamification state in localStorage. No server-side user profiles. Reporting streaks and badges are private to the device.

**Subtasks:**
- [⏭️] S29.1 — "Is this right?" prompt in BuildingCard (thumbs up/down)
- [⏭️] S29.2 — Store confirmations in feedback table (type: accuracy_confirmation)
- [⏭️] S29.3 — Calibration algorithm: adjust capacity estimates based on feedback
- [⏭️] S29.4 — Track prediction accuracy over time (dashboard for admin)
- [⏭️] S29.5 — Reporting streak counter (localStorage, days with >= 1 report)
- [⏭️] S29.6 — Badge system: "First Report", "Week Streak", "Top Contributor" (localStorage)
- [⏭️] S29.7 — Streak/badge display in More/Settings page
- [⏭️] S29.8 — Subtle animation on badge unlock (Framer Motion)

**Test criteria:**
- Confirmations stored without user_id
- Streak increments correctly, resets after missed day
- Badges unlock at correct thresholds
- All gamification data in localStorage only

---

## Phase 4 — Scale & Monetisation `[⏭ roadmap, not scheduled]`

### Sprint 30: Multi-Campus Support `[⏭]`
**Goal:** Add campus selector. Seed data for 2 additional Melbourne universities (Monash Clayton, RMIT City). Same database instance, data isolated by campus_id. Campus-specific map styling.

**Subtasks:**
- [⏭️] S30.1 — Campus selector UI (dropdown or tab)
- [⏭️] S30.2 — Seed Monash Clayton buildings and zones
- [⏭️] S30.3 — Seed RMIT City buildings and zones
- [⏭️] S30.4 — Map bounds and centre per campus
- [⏭️] S30.5 — Verify data isolation (campus_id filtering)

---

### Sprint 31: University Analytics Dashboard
**Goal:** Build admin.pulse.app subdomain. Supabase Auth with university email domain restriction. Views: campus-wide heatmap by hour, per-building utilisation charts, peak stress report, CSV export. All data aggregate and anonymised.

**Subtasks:**
- [⏭️] S31.1 — Admin app scaffold (separate Vite project or route)
- [⏭️] S31.2 — Supabase Auth with email domain restriction
- [⏭️] S31.3 — Campus-wide utilisation heatmap (hour × day grid)
- [⏭️] S31.4 — Per-building utilisation charts
- [⏭️] S31.5 — Peak stress report (busiest times)
- [⏭️] S31.6 — CSV export of aggregate data

---

### Sprint 32: Licensing & Billing
**Goal:** Stripe integration for university subscriptions. Tiered pricing based on campus count. Admin user management.

**Subtasks:**
- [⏭️] S32.1 — Stripe integration (checkout, webhooks)
- [⏭️] S32.2 — Subscription tiers and pricing
- [⏭️] S32.3 — Admin user management
- [⏭️] S32.4 — Usage-based billing calculations

---

## Phase 5 — Social Layer & Community `[⏭ roadmap, not scheduled]`

### Sprint 33: Friend Presence `[⏭]`
**Goal:** Mutual follow system (opt-in). Show friend location at building level only (never floor or seat). Account required for social features. Anonymous viewing always remains available.

**Privacy:** Building-level only. Never floor or seat. Opt-in mutual follows.

**Subtasks:**
- [⏭️] S33.1 — Supabase Auth for social features
- [⏭️] S33.2 — Follow/unfollow system (mutual opt-in)
- [⏭️] S33.3 — Friend presence indicators on map (building-level only)
- [⏭️] S33.4 — Friend list UI

---

### Sprint 34: Study Group Matchmaking
**Goal:** Manual subject tags. "Looking for study partner" status. Study session creation with building + time. Entirely opt-in.

**Subtasks:**
- [⏭️] S34.1 — Subject tag system
- [⏭️] S34.2 — "Looking for study partner" status toggle
- [⏭️] S34.3 — Study session creation (building + time + subject)
- [⏭️] S34.4 — Study session discovery and joining

---

### Sprint 35: Secret Spots & Community Reviews
**Goal:** Community-submitted study spots with reviews — inspired by LostOnCampus's killer feature. Users can submit hidden gems with photos and amenity info. Other users can review and rate.

**Inspired by:** LostOnCampus

**Privacy:** Spots are anonymous submissions. Reviews are anonymous. Photos are user-uploaded (moderated).

**Subtasks:**
- [⏭️] S35.1 — Migration 015_spots.sql (spots table with photos[], amenities[], is_secret, location point, is_approved)
- [⏭️] S35.2 — Migration 016_reviews.sql (reviews table, anonymous, rating 1-5 + noise_level + text)
- [⏭️] S35.3 — src/components/SpotSubmission.tsx (name, type, photo upload, amenities checklist, location picker)
- [⏭️] S35.4 — src/components/SpotCard.tsx (photo, rating, amenities, noise, review count)
- [⏭️] S35.5 — src/components/ReviewForm.tsx + ReviewList.tsx
- [⏭️] S35.6 — Spots as map markers (separate Mapbox layer, distinct from building polygons)
- [⏭️] S35.7 — Admin moderation Edge Function (approve/reject spots)

**Test criteria:**
- Spot submission stores all fields without user_id
- Reviews are anonymous
- Spots appear on map as separate layer
- Unapproved spots not visible to other users
- Moderation endpoint rejects/approves correctly

---

### Sprint 36: Event Awareness
**Goal:** Explain crowd spikes by associating events with buildings. Adjust predictions during known events so users aren't surprised by unusual busyness.

**Inputs:** Sprint 25 (prediction engine)

**Outputs:**
- events table with building association, times, expected crowd impact
- Event banner in BuildingCard during active events
- Prediction adjustment during known events
- Admin event entry tool

**Subtasks:**
- [⏭️] S36.1 — Migration 017_events.sql (events table with building_id, name, start_time, end_time, expected_crowd_multiplier, description)
- [⏭️] S36.2 — src/components/EventBanner.tsx (shown in BuildingCard during active events, explains crowd spike)
- [⏭️] S36.3 — Admin event entry tool (Edge Function + simple form)
- [⏭️] S36.4 — Prediction adjustment: multiply baseline prediction by expected_crowd_multiplier during event window

**Test criteria:**
- Event banner appears only during active event window
- Predictions adjust correctly with multiplier
- Events without building_id show campus-wide banner

---

## Architecture Decisions Log

### 2026-08-15 — SIGNAL reverted; PRD § 11's UoM palette restored

**Decision.** R3's SIGNAL design system is retired in this project. The palette,
radii, shadows and map style return to the pre-SIGNAL look. `~/bruno-portfolio`
keeps SIGNAL and is unaffected.

**Why.** Bruno ran the current build and the pre-R3 build side by side on
localhost and chose the older one. That is the whole reason, and it is a
sufficient one — it is his product.

**How, and what it cost.** A re-valuing, not a rewind. Every SIGNAL token *name*
survives carrying a UoM value, so R4's motion work and Sprints 19–25 are
untouched; nothing outside four files references a colour. R3's own decision to
centralise the palette is what made its removal cheap.

Two things could not simply be restored:

- **The UoM palette fails WCAG AA.** Sprint 19's `contrast.test.ts` was written
  after R3, so PRD § 11's colours had never been measured against it. Gold
  #C8A951 scores 2.02:1 on the light ground and green #4CAF7D 2.42:1, against a
  4.5:1 floor — 13 assertions failed. The values shipped are hue- and
  saturation-preserved and darkened until they pass, computed rather than
  eyeballed. They are *not* PRD § 11's literal hexes, and PRD § 11 should be
  updated to match when Bruno next opens it.
- **The occupancy ramp.** Restored to green→red, but with lightness falling
  monotonically across it so adjacent steps stay separable without colour vision.
  MOTION.md's "never draw attention toward busy-ness" is amended in place: it
  governs motion, not colour.

**Also fixed in the same pass, and unrelated to taste:** every building on the map
was a rectangle because the fixture generator silently skipped migrations 010 and
011 — both use `WHERE id = '...'`, a form the seed parser had no helper for. Even
011's shapes were hand-simplified quads. Migration `022` commits the real
OpenStreetMap ways (14–57 vertices, ODbL, attributed in README) for the 15
buildings identifiable by name, and leaves 3 alone. Matching is by name, not
proximity: Melbourne School of Design was seeded 428 m from the building it
occupies, and proximity matching inherits that error rather than revealing it.


| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-03-19 | Tailwind v4 installed (no CLI init) | Latest version via pnpm, PostCSS config created manually |
| 2026-03-19 | @types/geojson added | Required for Polygon type in building/zone interfaces |
| 2026-03-19 | Vite v8 scaffolded | Latest stable, uses flat ESLint config |
| 2026-03-19 | pnpm via npx (not global install) | Permission constraints on user's system |
| 2026-03-19 | Google Places API does not return `current_popularity` | This is an internal Google Maps feature, not exposed via public API. Blending hierarchy adjusted: live > predicted > google typical > none. `google_popularity_cache.current_popularity` kept nullable for future use. Edge Function still syncs `is_open_now` for "currently open" filter. |
| 2026-03-19 | Vitest config in separate `vitest.config.ts` | Vite 8's `defineConfig` type does not include `test` property. Separate config avoids TS errors while inheriting path aliases. |
| 2026-03-21 | Competitive research integrated — 3 new pre-MVP sprints | Analysis of 9 campus apps (LostOnCampus, UniMelb Maps, Waitz, Occuspace, Density, Campus Spots, Muggerino, StudySpot, MazeMap) revealed no single competitor combines real-time heatmap + crowd reporting + recommendations + noise tracking + favourites + photos. Sprints 12–14 added to close gaps before MVP deploy. All subsequent sprints renumbered. |
| 2026-03-21 | Crowd reports as blending source | Reports inserted between 'live' (sensor/Realtime) and 'google' in the fallback hierarchy. Stronger cold-start mitigation than Google data alone — students can contribute immediately. |
| 2026-03-21 | Gamification kept localStorage-only | Muggerino model: reporting streaks and badges stored client-side. No server profiles, no leaderboards. Privacy-safe engagement loop. |
| 2026-03-21 | Room directory added to S23 | UniMelb Maps competitive gap. Rooms table enables cross-building room search — a feature no competitor in the campus occupancy space offers. |
| 2026-08-14 | **Every pre-existing `[x]` treated as a claim, not a fact** | Owner override: *"it is all fucked up, it's not wired up and it doesn't work."* Forensic audit recorded in `WIRING-AUDIT.md`. **No future session may trust the pre-2026-08-14 checkmarks without re-observation.** |
| 2026-08-14 | Scope frozen at **S0–S25**; S26–S36 `[⏭ roadmap]` | ENGINEERPROMPT: *"Those are roadmap, not work."* Confirmed by Bruno. Phases 4–5 also require accounts + Stripe, contradicting PRD § 13.1. |
| 2026-08-14 | **SIGNAL supersedes PRD § 11** as the design system | Bruno has a locked cross-project system (`~/bruno-portfolio/CLAUDE.md`). Warm black + single amber accent, ≤2px radius, mono instrument voice, no light theme. PRD's UoM navy/gold palette is retired. Bruno is not to be asked to make design decisions answerable from that document. |
| 2026-08-14 | `MOTION.md` is binding product behaviour | Motion encodes liveness, change and confidence — the three things this product sells. Its acceptance checklist is folded into the R4 gate verbatim. |
| 2026-08-14 | **Local fixture layer instead of early cloud provisioning** | Supabase project deleted and Docker unavailable, so there is no backend to build against. Fixtures unblock ~20 sprints, keep owner-gated work at the end as instructed, cost nothing, and double as test data and the honest cold-start mode. |
| 2026-08-14 | **"Google" data relabelled as modelled estimates** | `google_popular_times` seed rows are hand-authored curves, not Google data, yet the UI said "Based on Google data". Combined with the 2026-03-19 finding that Google's public API does not expose `current_popularity`, the entire Google tier was fictional. Honesty rule + PRD § 13.4 ("UI clearly labels when data comes from Google vs Pulse") both require the relabel. Google Places retained for opening-hours only. |
| 2026-08-14 | Name standardised to **UniSpace** | Matches `package.json`, README, PWA manifest and `github.com/br9704/UniSpace`. PRD/MASTERPLAN "Pulse" references updated. ⚠️ **CORRECTED 2026-08-15:** that last sentence was not true when written. The sweep was finished in this file on 2026-08-15 (Sprints 11, 26, the competitive-position list and the risk table). **`PRD.md` was never swept and still carries 31 "Pulse" references, starting with its title** — it is off limits under CLAUDE.md § 6 and needs Bruno's explicit go-ahead. Deliberately left as "Pulse" here: the S0 outputs and test criteria that record the literal placeholder string the dev server showed at the time, and the repo path `~/Desktop/PULSE`. Renaming those would be falsifying a record, not finishing a rename. |
| 2026-08-14 | Position broadcast uses **HTTP Edge Function invoke, not a Realtime channel** | Documenting existing behaviour: implementation diverged from PRD § 7.2 and was never recorded. Functionally equivalent, one fewer moving part, and the privacy invariant holds either way. Code is correct; the PRD is what needs updating. |
| 2026-08-15 | **The Supabase backend will not be provisioned** | Bruno's call, on cost: a hosted Postgres + Realtime + Edge Function stack is a recurring monthly bill on a portfolio project. Ship Runbook § 1 is **parked**, not pending, and its boxes are `[⏭️]`. This is affordable only because Sprint R2 already built the fixture layer against the committed seed SQL — the app stands up with no backend and says so on screen. **Recorded honestly: the live-crowdsourced path has never run against real users and cannot be evaluated from this repo.** The schema, seeds and all 7 Edge Functions stay committed and reviewable, and `src/lib/dataSource.ts` keeps provisioning later an env-var change rather than a rewrite. |
| 2026-08-15 | **Repository goes public** | Every document is now written for a stranger with no context, not for Bruno. Consequences applied in this pass: the README leads with the actual state of the deployment rather than assuming the reader knows; `WIRING-AUDIT.md` and `ENGINEERPROMPT.md` carry banners saying they are point-in-time records, because both read as current status pages otherwise; and the dead project ref `kvagntgpiylxhjntexml` is labelled as deleted where it appears, so it does not read as a live identifier. |
| 2026-08-14 | **Build gate must run `pnpm build`, never `vite build` alone** | `vite build` succeeds while `tsc -b` fails. That gap is precisely how three fatal defects passed the S12.30 and S18 audits. R1.2 adds a built-CSS assertion for the same reason. |

---

## Competitive Research Integration (March 2026)

### Apps Analysed
| App | Key Feature Taken | Sprint |
|-----|-------------------|--------|
| Campus Spots | Manual crowd reporting (1-5 scale) | S13 |
| Muggerino | Noise levels, favourites, gamification (streaks/badges) | S14, S29 |
| LostOnCampus | Building photos, tips, secret spots + reviews | S15, S35 |
| UniMelb Maps | Room/location search | S24 |
| Waitz | Sensor-based occupancy (validated our approach) | — |
| Occuspace | Enterprise sensors (confirmed DIY gap) | — |
| Density | API-first analytics (informed admin dashboard) | S31 |
| StudySpot | Study-focused filtering (validated our filter chips) | — |
| MazeMap | Indoor wayfinding, floor plans (future consideration) | — |

### Competitive Position at MVP Deploy (Sprint 18)

> ⚠️ **ANNOTATED 2026-08-15.** This was written in March 2026 as a forward-looking claim, and two of
> its ten items no longer describe the product. **Item 7 is void:** there is no Google Popular Times
> tier — Google's public API does not expose busyness, and the weekly curves are this project's own
> modelled estimates (decision log, 2026-08-14). **Item 1 is aspirational as shipped:** the heatmap
> is real, but with no backend provisioned it renders estimates, not real-time occupancy. The
> remaining eight hold. Kept as written because the claim it makes is what the sprint plan was
> shaped around.

After completing Sprints 0–18, UniSpace will combine:
1. Real-time occupancy heatmap on interactive map (unique)
2. Manual crowd reporting without sensors (Campus Spots model)
3. Smart recommendations with scoring algorithm (unique)
4. Noise level tracking (Muggerino)
5. Favourites without account (Muggerino)
6. Building photos and tips (LostOnCampus)
7. Google Popular Times fallback (unique combination)
8. Prediction charts (enterprise tools, but free)
9. Floor-level breakdown (MazeMap concept, simplified)
10. Privacy-first, no account required (unique positioning)

**No single competitor has more than 3 of these. UniSpace will have all 10.**

---

## Dependency Graph

```
S11 (Predictions) ──────────────────────┐
S12 (UI Polish) ───────────────────────┤
S13 (Crowd Reports) ── S14 (Noise+Favs) ┤  S15 can run parallel with S13-S14
S15 (Photos+Tips) ──────────────────────┤
                                         ├── S16 (PWA) ── S17 (Seed) ── S18 (Deploy)
```

- S13 and S15 are independent (can be built in parallel)
- S14 depends on S13 (noise levels come from the reports table)
- S16+ depends on core features being stable

---

## Known Risks & Current Status

| Risk | Status | Notes |
|------|--------|-------|
| Cold start — insufficient crowdsourced data | **Strongly mitigated** | ⚠️ *2026-08-15: the mitigation is real but the naming here is stale.* Modelled weekly estimates (not Google — see decision log 2026-08-14) + manual crowd reporting (S13) — two independent fallback mechanisms from day one |
| Google Places API cost | Monitoring | ⚠️ *2026-08-15: stale.* The `~$8/month for 10 buildings` estimate assumed Google was an occupancy source for 10 buildings. Scope is now opening-hours only across 18 buildings, so the ceiling is far lower — and the Ship Runbook § 2 requires a hard quota cap regardless, because an uncapped public deploy is an uncapped bill |
| Google Places API unavailable | Planned | Fallback to UniSpace predictions + crowd reports in blending logic. ⚠️ *2026-08-15: low impact now — Google feeds opening hours only, so losing it costs open/closed labels, not occupancy* |
| Location permission denial | Planned | Allow browsing with estimated + predicted + crowd report data without GPS |
| Supabase Realtime connection limits | Monitoring | Free tier: 200 concurrent. Polling fallback planned |
| Building capacity estimates inaccurate | Accepted | Directional only ("~"). Report inaccuracy button (S24) + feedback system (S25) |
| iOS push requires 16.4+ + home screen | Accepted | In-app alerts as fallback |
| current_popularity not available for all buildings | Accepted | Only buildings with google_place_id get Google data |
| Accessibility data inaccurate | High priority | Manual verification + user reporting mechanism (S24–S25) |
| Crowd report spam/abuse | Planned | Rate limiting: 5/hr server-side (IP), 1/building/5min client-side (localStorage). Reports auto-expire 30min. |
| Photo licensing issues | Low | All photos CC-licensed. Static assets, no user uploads until S35. |
| **Checkmarks drift from reality again** | **Realised once** | This is not hypothetical — it already happened at scale (see `WIRING-AUDIT.md`). Mitigations: `pnpm build` (never `vite build`) at every gate; the R1.2 built-CSS assertion in CI; mark tasks live rather than batched; re-observe, never infer. |
| **Silent build-config failure** | **Realised once** | Tailwind emitted no theme-scale CSS for an unknown number of sprints and nothing caught it. R1.2 asserts against the *build output*, not the source. Any future framework major-version bump gets the same treatment. |
| Backend deleted / lost again | Medium | Everything must be reproducible from committed migrations + seeds. Migration `013` proved this can fail. **Rule: no schema change is applied to a cloud DB before it exists as a committed migration.** |
| Uncapped API bill on a public URL | Medium | Google Places quota cap + budget alert, Mapbox token domain restriction — both in the Ship Runbook, both before deploy, not after. |
| Cold start looks broken rather than intentional | Medium | MOTION.md treats the zero-user screen as a first-class design; R2 fixtures + R4.4 confidence tiers make "estimated" a designed state instead of an empty one. |

> **MOTION.md added (Aug 2026):** the animation spec in this folder is binding. Its acceptance
> checklist is folded into the Sprint R4 gate verbatim.

---

## Owner-Gated Ship Runbook

> **This is a checklist, not a backlog.** Every item needs credentials, real-world data, or a
> physical device — none of it can be done from inside the repo. It is the only thing standing
> between this codebase and a public URL.
>
> **Everything here requires Bruno.** Per his instruction, all owner-gated work is deferred to the
> very end and batched here. Nothing in Sprints R1–R5 or 19–25 blocks on any of it — the fixture
> layer (R2) stands in throughout. Run this block only once the code work is complete.
>
> Ordered by dependency. Do not reorder.

### 1. Supabase — `[⏭️] PARKED — deliberately not provisioned (cost)`

> ⚠️ **DECIDED 2026-08-15 (Bruno): the backend is not going to be provisioned.** A hosted Postgres +
> Realtime + Edge Function stack is a recurring monthly cost, and this is a portfolio project. **This
> section is closed, not pending** — it is a decision, not a backlog item, and nothing is waiting on
> it.
>
> **The checklist below stays in full, and stays correct.** It is the instructions for whoever does
> stand this up later — Bruno at some future point, or anyone who clones the repo. Every migration,
> seed and Edge Function it refers to is committed and reviewable; none of it is running anywhere.
> The boxes are `[⏭️]` rather than `[ ]` because per this file's legend a blank box reads as a
> to-do, and these are deliberately out of scope.
>
> What the app does instead: the fixture layer built in **Sprint R2** is generated from the same
> committed seed SQL a real database would be seeded from, and `seedData.test.ts` fails if the two
> drift. Every hook reads through one seam (`src/lib/dataSource.ts`), so provisioning later is an
> environment-variable change rather than a rewrite. The honest cost of the decision, recorded
> plainly: **the live-crowdsourced path has never run against real users**, and cannot be evaluated
> from this repo.

The previous project (`kvagntgpiylxhjntexml`) is **gone**, not paused — a deleted project ref, dead
since before 2026-08-14 and safe to leave in the record. It is not a live identifier and grants
nothing.

- [⏭️] Create a new Supabase project ⏭️ **parked (cost)**. **Do not touch
      `jaamaabruno@gmail.coms project` or `speechmax`** — CLAUDE.md § 6 puts both permanently off
      limits.
- [⏭️] Apply migrations `001`–`016` **in order** ⏭️ **parked (cost)** — including the `013` rewritten in R1.6 and the
      `015` (rooms) / `016` (feedback) added in S24/S25.
      ⚠️ **CORRECTED 2026-08-15:** the range is now `001`–`018`. Two migrations landed after this
      line was written — `017_verified_hours.sql` and `018_accessibility_unknown.sql`, both from the
      research recorded in § 5 below. Verified by `ls supabase/migrations/`, which shows 18 files
      with no gaps.
- [⏭️] Apply seeds `001`–`004` (18 buildings; **1,321** popular-times rows) ⏭️ **parked (cost)**.
      ⚠️ **CORRECTED 2026-08-15:** the range is now `001`–`005` (`005_verified_accessibility.sql`),
      and the row count is **1,156**, not 1,321.

      **The popular-times row count was stated three different ways in this repo. Resolved:**

      | Figure | Where it was stated | Verdict |
      |---|---|---|
      | 1,321 | this line, inherited from `WIRING-AUDIT.md` § 3 | **stale** — computed before R1.7 and R2.7 |
      | 1,172 | `src/lib/dataSource.ts:96` (code comment) | **stale** — the post-R1.7 figure, never updated after R2.7 |
      | **1,156** | `src/lib/fixtures/seedData.generated.ts` | ✅ **correct** |

      Verified three independent ways on 2026-08-15, not restated from any of the above: counting
      the tuples in the committed seeds (`002` = 335 + `004` = 821 = 1,156); counting the objects
      the generator actually emits into `SEED_TYPICAL_CURVES` (1,156); and the derived header the
      generator writes at the top of that file. The same count cross-checks against `buildings 18`
      and `zones 47` in that header.

      Why it drifted twice: R1.7 removed the two dropped buildings (1,321 → 1,172) and R2.7 removed
      the 16 closed-day rows (1,172 → 1,156). Both corrections are recorded above; this line and the
      `dataSource.ts` comment each stopped at a different point along the way. **`dataSource.ts:96`
      is still wrong and is flagged for the code owners** — it is only a comment, and the paging
      logic it describes was already fixed in R2.1.extra to page until a short page rather than
      assume a fixed row count, so nothing behaves incorrectly because of it.
- [⏭️] Deploy all 7 Edge Functions ⏭️ **parked (cost)**: `aggregate-occupancy`, `sync-google-popularity`,
      `compute-predictions`, `submit-report`, `manage-alerts`, `send-alerts`, `submit-feedback`.
      All seven are committed under `supabase/functions/` and reviewable; none is deployed.
- [⏭️] Set Edge Function secrets ⏭️ **parked (cost)**: `GOOGLE_PLACES_API_KEY`, `VAPID_PUBLIC_KEY`,
      `VAPID_PRIVATE_KEY`, `VAPID_EMAIL`, and **`IP_HASH_SALT`** (any long random string).
      Without the salt, an unsalted SHA-256 of an IPv4 address is brute-forceable — only four
      billion possibilities — which would make the rate-limiting hash a stored identifier in all
      but name.
- [⏭️] Create `pg_cron` schedules ⏭️ **parked (cost)** — `aggregate-occupancy` 10s ·
      `sync-google-popularity` 30min · `compute-predictions` hourly · `send-alerts` 2min.
- [⏭️] Verify RLS is enabled on **every** table ⏭️ **parked (cost)** (anon SELECT only; writes via
      service role). The policies themselves are committed in the migrations and can be read there.
- [⏭️] Add the production domain to Supabase CORS allowed origins ⏭️ **parked (cost)**.

### 2. Keys, quotas and the bill

> ⚠️ **ANNOTATED 2026-08-15.** Two of the four items here were only ever needed *because* a backend
> was coming. With § 1 parked they are parked too. **The Mapbox item is not** — it is independent of
> Supabase, it is live right now on a public URL, and it is the one genuinely urgent thing in this
> whole runbook.

- [x] VAPID keys ✅ **Generated 2026-08-14** and written to `.env.local` (gitignored).
      `VITE_VAPID_PUBLIC_KEY` and `VAPID_PUBLIC_KEY`/`VAPID_PRIVATE_KEY` are all set.
- [⏭️] Copy `VAPID_PRIVATE_KEY`, `VAPID_PUBLIC_KEY` and `VAPID_EMAIL` from `.env.local` into the
      Supabase Edge Function secrets ⏭️ **parked** — there are no Edge Function secrets to set,
      because there is no project. The keys exist locally and are unused.
- [⏭️] Google Cloud: enable Places API, **set a hard quota cap and a budget alert** ⏭️ **parked** —
      the Places call lives in `sync-google-popularity`, which is not deployed, so nothing is
      calling Google and there is no bill to cap. If the backend is ever provisioned this becomes
      live again immediately, and it must be done *before* the cron is scheduled, not after.
- [ ] Mapbox: **restrict the public token to the production domain.** Unrestricted, a public deploy
      hands anyone a usable token. **Still open and still urgent** — the deployed site is serving
      this token today, and this item does not depend on Supabase in any way.

### 3. Vercel — **DONE 2026-08-14**

> **Live: https://unispace-tawny.vercel.app**

- [x] Project created and linked to `github.com/br9704/UniSpace` ✅
- [x] Production env vars set: `VITE_MAPBOX_TOKEN`, `VITE_VAPID_PUBLIC_KEY`,
      `VITE_USE_FIXTURES=true` ✅ Supabase vars are deliberately absent, which switches the app to
      fixtures automatically and makes it say so on screen.
- [x] Deployed to production ✅ Build passes in CI. Verified live: 149 KB gzipped entry over the
      wire, no Mapbox chunk on the landing route, SPA fallback resolving for `/map`, `/find` and
      `/alerts`, manifest and icons serving.
- [ ] **Restrict the Mapbox token to `unispace-tawny.vercel.app`** in the Mapbox dashboard. It is a
      `pk.` token, which is public by design and safe to ship — but unrestricted, anyone can spend
      your quota with it. *Do this one first.*
- [ ] Optional: custom domain, or a subdomain of `brunojaamaa.dev`.
- [ ] Optional: turn off Deployment Protection for the `*-bruno-jaamaas-projects` alias if you want
      that URL public too. The `unispace-tawny` alias is already open.
- [⏭️] Once Supabase exists: add `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY`, remove
      `VITE_USE_FIXTURES`, redeploy. That is the whole switch from demo to live.
      ⏭️ **Parked 2026-08-15 — Supabase is not going to exist (§ 1).** Kept because it documents how
      small the switch is: two environment variables and a redeploy, no code change. `VITE_USE_FIXTURES=true`
      is now the permanent production configuration, not a temporary one.

### 4. Manual verification on the live URL
- [ ] Mobile browser test at 375 px.
- [ ] PWA install on iOS **and** Android. iOS needs an in-UI "Share → Add to Home Screen" flow —
      there is no programmatic install prompt, and Web Push on iOS requires Home Screen install
      (unchanged through iOS 26).
- [⏭️] Push delivery (requires HTTPS). Send **Declarative Web Push** payloads for Safari/iOS 18.4+;
      keep the service-worker path for Chrome/Firefox.
      ⏭️ **Parked 2026-08-15** — delivery runs from `send-alerts`, an Edge Function with nowhere to
      deploy to (§ 1). Nothing can be pushed, so nothing can be tested.
- [ ] GPS permission flow, both grant and deny.
- [ ] Cold-start screen with zero users — must look intentional, not broken.
- [ ] **VoiceOver pass** on macOS and iOS (S19.7).
- [ ] **Airplane-mode test**: open cold with no network, confirm the cached snapshot appears with
      the stale treatment, then reconnect and watch it refresh (S21.7).
- [ ] **Lighthouse audit** and a throttled-3G run against the deployed URL (S22.6 / S22.7).
- [ ] **MOTION.md recordings** — the two acceptance items that need a human eye: breathing should
      be invisible in any single frame but visible over 4s of recording, and a value change should
      read differently from liveness (R4 gate).

### 5. Real-world data and assets still outstanding

These are all deferred for the same reason: they are facts about the physical world that cannot be
verified from inside this repo, and inventing them would undo the honesty work this project spent
most of its effort on.

- [ ] **Google Place IDs** — 11 of 18 are NULL and the other 7 unverified. Needs a Places API key.
      Commit as migration `017`. (R1.6)
      ⚠️ **CORRECTED 2026-08-15:** `017` and `018` are taken — this item was written before the
      hours and accessibility migrations below existed. **Commit as `019`.**
- [ ] **Room directory** — codes, floors and types per building, from UoM's Find a Room. Seeds
      table `rooms`; the UI is built and renders nothing until then. (S24.2)
      ✅ *Note 2026-08-15: this one is NOT blocked by § 1 being parked.* Room data is committed seed
      SQL, and `pnpm generate:fixtures` regenerates the fixture layer from it — so seeding rooms
      makes the directory and the cross-building search work in the deployed demo, with no backend.
      It is gated only on sourcing the real codes and floors, which is the same reason it was
      deferred in the first place: inventing them is not an option.
- [x] **Accessibility researched and the data model corrected** ✅ 2026-08-15. Source:
      `unimelb.edu.au/accessibility/guides/mobility`. Every flag in the database had been invented,
      and the schema could only say "yes" or "no" — so the true answer for most buildings, *nobody
      has checked*, was unrepresentable. Migration `018` makes the columns nullable, seed `005`
      restores only the one claim the source states unambiguously ("All libraries are accessible
      with lifts and an accessible toilet"), and everything else is now explicitly unverified and
      rendered as `[?]`. 9 tests pin it, including that no flag may ever read `false` without a
      source. ⚠️ *Caveat:* that page states it was "written by University of Melbourne students" —
      a student guide, not a facilities audit. Worth confirming with UoM Property directly.
- [ ] **Step-free entry, accessible parking, and the 13 non-library buildings** — still genuinely
      unverified, and now honestly labelled as such. Needs UoM's interactive campus map or a direct
      enquiry. This is the highest-value remaining data item.
- [x] **Building hours corrected against the published source** ✅ 2026-08-15. Source:
      `library.unimelb.edu.au/library-locations-and-opening-hours`. The seeded hours were invented
      and every one was wrong — Baillieu was seeded 08:00–22:00 and actually runs 09:00–20:00.
      Migration `017` and the seeds now carry the published values for the five library buildings.
      ⚠️ *Caveat:* the source publishes a **current-week** table (retrieved for Aug 10–16), not
      year-round hours. They will be wrong over exams, summer and public holidays.
- [ ] **Re-check hours against the 2026 semester calendar** for the non-teaching periods, and for
      the 13 buildings with no published source. (S24.6)
- [ ] Real building photos (CC-licensed WebP → `public/photos/`) — unblocks S15.1 / S15.7.
      The only remaining asset: photographs of real buildings cannot be generated.
- [x] PWA icons ✅ **Generated 2026-08-14** in SIGNAL — an occupancy meter inside focus brackets,
      drawn geometrically rather than rasterised from a font, with the maskable variant inset to
      80% for Android's circular crop. The old placeholders were UoM navy and clashed with the
      re-skinned app; the favicon was a purple lightning bolt in a colour that appears nowhere in
      the system. Also removed `unimelb-logo.svg` and `icons.svg`, unreferenced since R3.

### 6. Last
- [ ] Portfolio case-study unlock — happens in `~/bruno-portfolio`, **not** this repo.

---

## Post-Launch

> ⚠️ **ANNOTATED 2026-08-15.** This whole section was written for a deployment with a provisioned
> backend. With § 1 parked, most of it describes something that does not exist: there is no Supabase
> dashboard to watch, no Edge Function invocations, no Realtime connections, no `pg_cron` job, and
> no Google Places calls — so no Google bill. **What still applies to the live site is exactly
> three things:** Vercel build status and Web Vitals; the Mapbox usage alert and token restriction;
> and the standing "no third-party analytics" rule, which is a product guarantee and not contingent
> on anything. The rest is kept as the operating manual for whoever provisions the backend later.

### Monitoring
- Supabase dashboard: Realtime concurrent connections (free tier caps at **200** — polling
  fallback is the planned mitigation), Edge Function invocation counts and error rates, DB size.
- Vercel: build status, function logs, Web Vitals.
- **No third-party analytics.** CLAUDE.md § 4 rule 5 and PRD § 13.1 rule 6 both forbid them.
  Do not add Google Analytics, Hotjar, Mixpanel, PostHog or Sentry without explicit instruction.

### Quota alerts
- Google Cloud budget alert at 50% / 90% of the monthly cap.
- Mapbox usage alert — free tier is 50k map loads/month; a front-page moment can blow through it.
- Supabase egress + Realtime message alerts.

### When the API bills spike
1. **Check Mapbox first** — it is the likeliest source and the token is the likeliest leak. Confirm
   the domain restriction is still in place; rotate the token if traffic is from unknown origins.
2. **Google Places** — sync runs every 30 min across 18 buildings ≈ 864 calls/day. Anything far
   above that means the cron is misfiring; disable the `pg_cron` job first, diagnose second.
3. **Supabase Realtime** — if connections approach 200, switch clients to the 30s polling fallback.
4. Kill switch: the app degrades to cached + estimated data, so disabling any single external
   service is survivable. **Verify that is still true before launch, not after the bill arrives.**

### Data hygiene
- `occupancy_history` retention is 90 days per PRD § 13.2. Confirm a purge job exists — currently
  it does not.
- Re-verify the privacy invariant after any change to the broadcast path:
  `zoneDetection` → `usePositionBroadcast` → `aggregate-occupancy`. `session_id` must never appear
  in a DB write; raw coordinates must never leave the device.
