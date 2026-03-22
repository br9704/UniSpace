# MASTERPLAN.md — Pulse Implementation Plan

> Status key: [ ] Not started | [x] Complete | [~] In progress | [⏭️] Deferred

## Project Status
**Current state:** Sprints 0–15 complete. S14 (Noise + Favourites) adds noise aggregation from crowd reports (min 3 threshold), localStorage favourites with animated heart toggle, "Your Favourites" section on HomePage, "Low Noise" filter chip with adjusted scoring weights. S15 (Photos + Tips) adds PhotoCarousel component (CSS scroll-snap, IntersectionObserver dots), TipsList component (expandable, show 2 by default), and photos[] field in BuildingMeta — photo assets pending curation. 135 unit tests passing. Next: S16 (PWA Install + Service Worker).

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
- [x] S2.1 — Implement sync-google-popularity Edge Function ✅ (deployed to Supabase, fetches opening_hours/is_open_now per building)
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
- [x] S5.1 — Implement complete aggregate-occupancy Edge Function ✅ (v2 deployed)
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
  - [x] S7.extra — Seeded google_popular_times for all 18 buildings (1,252 rows)
  - [x] S7.extra — Removed Giblin Eunson (inside FBE) and Brownless (not in OSM) — 18 buildings final
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
- [x] S10.1 — FindPage.tsx with full implementation ✅
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
**Goal:** Implement basic prediction using Google popular times as baseline, with the framework for Pulse's own predictions when data accumulates.

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
- [x] S11.8 — Add confidence badge (Google vs Pulse source) ✅ (PredictionSourceBadge.tsx)
- [x] S11.9 — Wire charts into BuildingCard expanded state ✅ (PredictionSection in BuildingCardExpanded)

**Test criteria:**
- 24-hour prediction chart renders with Google data
- Current hour indicator visible on chart
- "Usually X%" text matches prediction data
- Sparkline shows last 6 hours of actual occupancy
- Source badge correctly shows "Google data" when using google_popular_times

**Notes:**
- Phase 1 uses Google data as baseline — Pulse's own EWMA predictions come in Phase 3
- Reference PRD Section 6.4 (F004) for prediction logic
- Gold bars = Pulse predicted, UoM blue bars = Google typical (in chart legend)

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
- [x] S12.1 — Dark theme CSS custom properties in index.css ✅
- [x] S12.2 — Tailwind config: CSS variable bridge ✅
- [x] S12.3 — useTheme hook + unit tests ✅
- [x] S12.4 — ThemeToggle component ✅
- [x] S12.5 — Map dark style switching ✅
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
- [x] S12.18 — Final color audit sweep ✅
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
- [x] S12.30 — Final audit (tsc, tests, lint, grep) ✅ (114 tests pass, zero TS errors, zero new lint errors)

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
- [x] S17.3 — Verify Google Place IDs return valid results ✅ (filled 12 missing Place IDs via migration 013)
- [⏭️] S17.4 — Adjust floor zone capacity estimates ⏭️ DEFERRED: current estimates are directional and sufficient for MVP
- [x] S17.5 — Update seed script with refined data ✅ (migration 013_data_verification_fixes applied)

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
- [ ] S18.1 — Run full TypeScript type check (tsc --noEmit)
- [ ] S18.2 — Run ESLint and fix any issues
- [ ] S18.3 — Run all unit tests
- [ ] S18.4 — Manual test: open app → view heatmap → tap building → see card
- [ ] S18.5 — Manual test: recommendations → apply filters → see ranked results
- [ ] S18.6 — Manual test: GPS permission flow (grant and deny)
- [ ] S18.7 — Manual test: mobile viewport (375px)
- [ ] S18.8 — Manual test: submit crowd report → see it reflected in blending
- [ ] S18.9 — Manual test: toggle favourite → see it on HomePage
- [ ] S18.10 — Manual test: noise level display with sufficient reports
- [ ] S18.11 — Manual test: photo carousel and tips in BuildingCard
- [ ] S18.12 — Configure Vercel project with environment variables
- [ ] S18.13 — Deploy to Vercel
- [ ] S18.14 — Verify deployed app loads and connects to Supabase

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

## Phase 2 — Polish & Reliability

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
- [ ] S19.1 — Audit all components for keyboard navigation
- [ ] S19.2 — Add aria-labels to all icon buttons and interactive elements
- [ ] S19.3 — Verify contrast ratios meet 4.5:1 minimum
- [ ] S19.4 — Ensure all touch targets are >= 44x44pt
- [ ] S19.5 — Make BuildingCard screen-reader friendly (live regions for updates)
- [ ] S19.6 — Add text labels alongside colour coding on map (not colour-only information)
- [ ] S19.7 — Test with VoiceOver (macOS/iOS)
- [ ] S19.8 — Make FilterSheet usable with assistive technology

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
- [x] S20.2 — Implement Web Push subscription registration ✅ (useWebPush hook with VAPID key)
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
- [ ] S21.1 — Cache building metadata in service worker
- [ ] S21.2 — Cache last occupancy snapshot to IndexedDB or localStorage
- [ ] S21.3 — Display cached data with "Last updated X min ago" timestamp
- [ ] S21.4 — Show offline indicator in header
- [ ] S21.5 — Ensure recommendations work with stale data
- [ ] S21.6 — Implement reconnection detection and data refresh
- [ ] S21.7 — Test on airplane mode

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
- [ ] S22.1 — Analyse bundle size, identify and fix large imports
- [ ] S22.2 — Lazy load BuildingCard component
- [ ] S22.3 — Preload Mapbox style and building GeoJSON on app init
- [ ] S22.4 — Memoize recommendation scoring (useMemo/useCallback)
- [ ] S22.5 — Optimise Mapbox layers (reduce repaints)
- [ ] S22.6 — Run Lighthouse audit and fix flagged issues
- [ ] S22.7 — Test on throttled 3G connection
- [ ] S22.8 — Profile and optimise Turf.js point-in-polygon (Web Worker if needed)

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
- [ ] S23.1 — Create error boundary wrapper component
- [ ] S23.2 — Implement fallback list view for map failure
- [ ] S23.3 — Add loading skeleton components (pulse animation)
- [ ] S23.4 — Handle Supabase connection errors (retry with backoff)
- [ ] S23.5 — Handle GPS permission denied (show No Location screen)
- [ ] S23.6 — Handle zero buildings with data (empty heatmap state)
- [ ] S23.7 — Handle Mapbox token invalid / expired
- [ ] S23.8 — Add error logging (console only, no third-party services)

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
- [ ] S24.1 — Migration 013_rooms.sql (rooms table with building_id, name, floor, type enum, capacity, has_power, is_bookable)
- [ ] S24.2 — Seed rooms for top 5 buildings (from UoM Find a Room data)
- [ ] S24.3 — src/hooks/useRooms.ts (fetch rooms by building_id)
- [ ] S24.4 — src/components/RoomList.tsx (expandable in BuildingCard, grouped by floor)
- [ ] S24.5 — Add room search to HomePage search bar (cross-building)
- [ ] S24.6 — Verify building hours against UoM 2026 semester calendar
- [ ] S24.7 — Verify accessibility data against UoM AccessAbility service
- [ ] S24.8 — Add "Report inaccuracy" button to BuildingCard
- [ ] S24.9 — Update types: Room, RoomType

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
- [ ] S25.1 — Migration 014_feedback.sql (feedback table, anonymous, category enum: hours_wrong | amenity_wrong | occupancy_wrong | accessibility_wrong | other)
- [ ] S25.2 — Edge Function submit-feedback/index.ts (Zod validation, rate-limit by IP)
- [ ] S25.3 — src/components/FeedbackSheet.tsx (category picker + optional text, max 500 chars)
- [ ] S25.4 — Wire into BuildingCard "Report inaccuracy" button

**Test criteria:**
- Feedback stored with category + optional text + building_id + timestamp
- No user_id in feedback table
- Rate limiting prevents spam
- Sheet opens from BuildingCard button

---

## Phase 3 — Intelligence

### Sprint 26: EWMA Prediction Engine
**Goal:** Implement Pulse's own prediction model using Exponentially Weighted Moving Average on occupancy_history. Replace Google baseline when sample_count >= 14 days for a given day/hour slot. Add confidence scoring (high/medium/low based on sample count and variance).

**Subtasks:**
- [ ] S26.1 — Implement EWMA calculation in compute-predictions Edge Function
- [ ] S26.2 — Confidence scoring (high: 14+ days, medium: 7–13 days, low: <7 days)
- [ ] S26.3 — Auto-switch from Google baseline to Pulse predictions when threshold met
- [ ] S26.4 — Update PredictionChart to show confidence band
- [ ] S26.5 — Unit tests for EWMA and confidence calculations

---

### Sprint 27: Anomaly Detection
**Goal:** Detect unusual occupancy patterns (exam periods, events, holidays). Flag anomalies in prediction data. Adjust predictions during known unusual periods.

**Subtasks:**
- [ ] S27.1 — Anomaly detection algorithm (z-score based, flag >2 std deviations)
- [ ] S27.2 — Anomaly flag in occupancy_history
- [ ] S27.3 — Exclude anomalies from EWMA calculation
- [ ] S27.4 — UI indicator when current occupancy is anomalous

---

### Sprint 28: Personalised Recommendations
**Goal:** Learn from user behaviour (buildings visited, filters used — all local, no server storage). Weight recommendations toward user preferences. "Your usual spots" section.

**Privacy:** All preference data in localStorage. Zero server storage.

**Subtasks:**
- [ ] S28.1 — Track building views and filter usage in localStorage
- [ ] S28.2 — Preference weighting in scoring algorithm
- [ ] S28.3 — "Your usual spots" section on HomePage
- [ ] S28.4 — Clear preferences option in settings

---

### Sprint 29: Feedback Loops + Lightweight Gamification
**Goal:** Allow users to confirm/deny occupancy accuracy ("Is this right?"). Use confirmations to calibrate capacity estimates. Track prediction accuracy over time. Add lightweight gamification to encourage crowd reporting.

**Inspired by:** Muggerino (streaks, badges)

**Privacy:** All gamification state in localStorage. No server-side user profiles. Reporting streaks and badges are private to the device.

**Subtasks:**
- [ ] S29.1 — "Is this right?" prompt in BuildingCard (thumbs up/down)
- [ ] S29.2 — Store confirmations in feedback table (type: accuracy_confirmation)
- [ ] S29.3 — Calibration algorithm: adjust capacity estimates based on feedback
- [ ] S29.4 — Track prediction accuracy over time (dashboard for admin)
- [ ] S29.5 — Reporting streak counter (localStorage, days with >= 1 report)
- [ ] S29.6 — Badge system: "First Report", "Week Streak", "Top Contributor" (localStorage)
- [ ] S29.7 — Streak/badge display in More/Settings page
- [ ] S29.8 — Subtle animation on badge unlock (Framer Motion)

**Test criteria:**
- Confirmations stored without user_id
- Streak increments correctly, resets after missed day
- Badges unlock at correct thresholds
- All gamification data in localStorage only

---

## Phase 4 — Scale & Monetisation

### Sprint 30: Multi-Campus Support
**Goal:** Add campus selector. Seed data for 2 additional Melbourne universities (Monash Clayton, RMIT City). Same database instance, data isolated by campus_id. Campus-specific map styling.

**Subtasks:**
- [ ] S30.1 — Campus selector UI (dropdown or tab)
- [ ] S30.2 — Seed Monash Clayton buildings and zones
- [ ] S30.3 — Seed RMIT City buildings and zones
- [ ] S30.4 — Map bounds and centre per campus
- [ ] S30.5 — Verify data isolation (campus_id filtering)

---

### Sprint 31: University Analytics Dashboard
**Goal:** Build admin.pulse.app subdomain. Supabase Auth with university email domain restriction. Views: campus-wide heatmap by hour, per-building utilisation charts, peak stress report, CSV export. All data aggregate and anonymised.

**Subtasks:**
- [ ] S31.1 — Admin app scaffold (separate Vite project or route)
- [ ] S31.2 — Supabase Auth with email domain restriction
- [ ] S31.3 — Campus-wide utilisation heatmap (hour × day grid)
- [ ] S31.4 — Per-building utilisation charts
- [ ] S31.5 — Peak stress report (busiest times)
- [ ] S31.6 — CSV export of aggregate data

---

### Sprint 32: Licensing & Billing
**Goal:** Stripe integration for university subscriptions. Tiered pricing based on campus count. Admin user management.

**Subtasks:**
- [ ] S32.1 — Stripe integration (checkout, webhooks)
- [ ] S32.2 — Subscription tiers and pricing
- [ ] S32.3 — Admin user management
- [ ] S32.4 — Usage-based billing calculations

---

## Phase 5 — Social Layer & Community

### Sprint 33: Friend Presence
**Goal:** Mutual follow system (opt-in). Show friend location at building level only (never floor or seat). Account required for social features. Anonymous viewing always remains available.

**Privacy:** Building-level only. Never floor or seat. Opt-in mutual follows.

**Subtasks:**
- [ ] S33.1 — Supabase Auth for social features
- [ ] S33.2 — Follow/unfollow system (mutual opt-in)
- [ ] S33.3 — Friend presence indicators on map (building-level only)
- [ ] S33.4 — Friend list UI

---

### Sprint 34: Study Group Matchmaking
**Goal:** Manual subject tags. "Looking for study partner" status. Study session creation with building + time. Entirely opt-in.

**Subtasks:**
- [ ] S34.1 — Subject tag system
- [ ] S34.2 — "Looking for study partner" status toggle
- [ ] S34.3 — Study session creation (building + time + subject)
- [ ] S34.4 — Study session discovery and joining

---

### Sprint 35: Secret Spots & Community Reviews
**Goal:** Community-submitted study spots with reviews — inspired by LostOnCampus's killer feature. Users can submit hidden gems with photos and amenity info. Other users can review and rate.

**Inspired by:** LostOnCampus

**Privacy:** Spots are anonymous submissions. Reviews are anonymous. Photos are user-uploaded (moderated).

**Subtasks:**
- [ ] S35.1 — Migration 015_spots.sql (spots table with photos[], amenities[], is_secret, location point, is_approved)
- [ ] S35.2 — Migration 016_reviews.sql (reviews table, anonymous, rating 1-5 + noise_level + text)
- [ ] S35.3 — src/components/SpotSubmission.tsx (name, type, photo upload, amenities checklist, location picker)
- [ ] S35.4 — src/components/SpotCard.tsx (photo, rating, amenities, noise, review count)
- [ ] S35.5 — src/components/ReviewForm.tsx + ReviewList.tsx
- [ ] S35.6 — Spots as map markers (separate Mapbox layer, distinct from building polygons)
- [ ] S35.7 — Admin moderation Edge Function (approve/reject spots)

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
- [ ] S36.1 — Migration 017_events.sql (events table with building_id, name, start_time, end_time, expected_crowd_multiplier, description)
- [ ] S36.2 — src/components/EventBanner.tsx (shown in BuildingCard during active events, explains crowd spike)
- [ ] S36.3 — Admin event entry tool (Edge Function + simple form)
- [ ] S36.4 — Prediction adjustment: multiply baseline prediction by expected_crowd_multiplier during event window

**Test criteria:**
- Event banner appears only during active event window
- Predictions adjust correctly with multiplier
- Events without building_id show campus-wide banner

---

## Architecture Decisions Log

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
After completing Sprints 0–18, Pulse will combine:
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

**No single competitor has more than 3 of these. Pulse will have all 10.**

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
| Cold start — insufficient crowdsourced data | **Strongly mitigated** | Google Popular Times (F010) + manual crowd reporting (S13) — two independent fallback mechanisms from day one |
| Google Places API cost | Monitoring | ~$8/month for 10 buildings. Cache aggressively (30min TTL) |
| Google Places API unavailable | Planned | Fallback to Pulse predictions + crowd reports in blending logic |
| Location permission denial | Planned | Allow browsing with Google + predicted + crowd report data without GPS |
| Supabase Realtime connection limits | Monitoring | Free tier: 200 concurrent. Polling fallback planned |
| Building capacity estimates inaccurate | Accepted | Directional only ("~"). Report inaccuracy button (S24) + feedback system (S25) |
| iOS push requires 16.4+ + home screen | Accepted | In-app alerts as fallback |
| current_popularity not available for all buildings | Accepted | Only buildings with google_place_id get Google data |
| Accessibility data inaccurate | High priority | Manual verification + user reporting mechanism (S24–S25) |
| Crowd report spam/abuse | Planned | Rate limiting: 5/hr server-side (IP), 1/building/5min client-side (localStorage). Reports auto-expire 30min. |
| Photo licensing issues | Low | All photos CC-licensed. Static assets, no user uploads until S35. |
