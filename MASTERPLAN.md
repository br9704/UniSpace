# MASTERPLAN.md — Pulse Implementation Plan

> Status key: [ ] Not started | [x] Complete | [~] In progress | [⏭️] Deferred

## Project Status
**Current state:** Sprints 0–8 complete. 18 UoM buildings with real OSM outlines, heatmap colours, and bottom-sheet Building Cards with occupancy bar, trend arrow, floor breakdown, amenities, and action buttons. 76 unit tests passing. Ready for Sprint 9.

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
- [ ] S9.1 — Create src/components/FloorBreakdown.tsx
- [ ] S9.2 — Render per-floor rows with mini occupancy bars
- [ ] S9.3 — Identify and highlight quietest floor with gold "Recommended" label
- [ ] S9.4 — Add staggered reveal animation (Framer Motion, 50ms per floor)
- [ ] S9.5 — Create src/components/AmenityChip.tsx (icon + label for WiFi, Power, etc.)
- [ ] S9.6 — Render amenity chips in expanded card

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
- [ ] S10.1 — Create src/pages/FindPage.tsx route shell
- [ ] S10.2 — Create src/hooks/useRecommendations.ts with scoring algorithm
- [ ] S10.3 — Implement walking time calculation (Turf.js distance, 1.4 m/s speed)
- [ ] S10.4 — Implement amenity match percentage calculation
- [ ] S10.5 — Create src/components/FilterSheet.tsx (toggles + sliders)
- [ ] S10.6 — Create src/components/RecommendationCard.tsx
- [ ] S10.7 — Implement filter chip horizontal scroll bar
- [ ] S10.8 — Debounce filter changes (300ms)
- [ ] S10.9 — Create empty state component
- [ ] S10.10 — Add tab bar navigation (Map / Find / Alerts)
- [ ] S10.11 — Write unit tests for scoring algorithm
- [ ] S10.12 — Write unit tests for walking time calculation

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
- [ ] S11.1 — Scaffold supabase/functions/compute-predictions/index.ts
- [ ] S11.2 — Implement Google-baseline prediction (use google_popular_times as default)
- [ ] S11.3 — Create src/hooks/usePrediction.ts — fetch predictions for building
- [ ] S11.4 — Create src/components/PredictionChart.tsx (Recharts 24-hour bar chart)
- [ ] S11.5 — Create src/components/SparklineChart.tsx (6-hour Recharts sparkline)
- [ ] S11.6 — Add "Usually peaks at..." text calculation
- [ ] S11.7 — Add "Best time to go today" calculation
- [ ] S11.8 — Add confidence badge (Google vs Pulse source)
- [ ] S11.9 — Wire charts into BuildingCard expanded state

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

### Sprint 12: PWA Install Flow + Service Worker
**Goal:** Complete PWA configuration with install prompts, service worker caching, and offline support.

**Inputs:** Sprint 0 (PWA manifest configured), Sprint 7 (app is functional)

**Outputs:**
- Service worker caches app shell, building metadata, last occupancy snapshot
- Install banner after 30s engagement (shown once)
- iOS-specific install modal (Share → Add to Home Screen)
- Android native install prompt
- Offline indicator banner

**Subtasks:**
- [ ] S12.1 — Configure workbox caching strategies in vite.config.ts
- [ ] S12.2 — Add runtime caching for Supabase API responses (stale-while-revalidate)
- [ ] S12.3 — Create src/components/InstallBanner.tsx
- [ ] S12.4 — Implement 30-second engagement timer (localStorage flag for "shown once")
- [ ] S12.5 — Implement iOS detection and custom install modal
- [ ] S12.6 — Implement Android beforeinstallprompt handler
- [ ] S12.7 — Create src/components/OfflineBanner.tsx ("Last updated X min ago")
- [ ] S12.8 — Create placeholder PWA icons (192px, 512px, 512px maskable) in public/icons/

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

### Sprint 13: Seed Data (UoM Buildings)
**Goal:** Verify and refine seed data for all 5 UoM buildings with accurate coordinates, polygons, amenities, hours, and Google Place IDs.

**Inputs:** Sprint 1 (initial seed), real-world UoM building data

**Outputs:**
- Accurate building polygons that align with Mapbox satellite view
- Verified amenity flags for each building
- Accurate building hours
- Floor zones with reasonable capacity estimates
- Google Place IDs verified against Google Places API

**Subtasks:**
- [ ] S13.1 — Verify/refine building polygon coordinates against satellite imagery
- [ ] S13.2 — Verify building hours from UoM website
- [ ] S13.3 — Verify amenity flags (WiFi, power, quiet zones, accessibility)
- [ ] S13.4 — Verify Google Place IDs return valid results
- [ ] S13.5 — Adjust floor zone capacity estimates based on building size
- [ ] S13.6 — Update seed script with refined data

**Test criteria:**
- All 5 buildings visible on map at correct positions
- Building polygons roughly match building footprints
- Amenity data is accurate for each building
- Google Place IDs return valid API responses

**Notes:**
- Buildings: Baillieu Library, ERC Library (Eastern Resource Centre), Arts West, Engineering Building 1, ICT Building
- Capacity estimates are directional, not precise — label as "~"
- Reference PRD Q1 resolved decision

---

### Sprint 14: MVP Integration Testing + Deploy to Vercel
**Goal:** Full end-to-end testing of the MVP feature set and deployment to Vercel.

**Inputs:** All Sprint 3–13 complete

**Outputs:**
- All features working together end-to-end
- TypeScript compiles with zero errors
- ESLint passes
- Core unit tests pass
- Deployed to Vercel with environment variables configured
- Accessible via public URL

**Subtasks:**
- [ ] S14.1 — Run full TypeScript type check (tsc --noEmit)
- [ ] S14.2 — Run ESLint and fix any issues
- [ ] S14.3 — Run all unit tests
- [ ] S14.4 — Manual test: open app → view heatmap → tap building → see card
- [ ] S14.5 — Manual test: recommendations → apply filters → see ranked results
- [ ] S14.6 — Manual test: GPS permission flow (grant and deny)
- [ ] S14.7 — Manual test: mobile viewport (375px)
- [ ] S14.8 — Configure Vercel project with environment variables
- [ ] S14.9 — Deploy to Vercel
- [ ] S14.10 — Verify deployed app loads and connects to Supabase

**Test criteria:**
- Zero TypeScript errors
- Zero ESLint errors
- All unit tests pass
- App is accessible via Vercel URL
- Heatmap renders with building polygons
- Building cards open and show data
- Recommendations work with filters

**Notes:**
- Vercel deployment config is straightforward for Vite — build command: `pnpm build`, output: `dist`
- Ensure Supabase URL CORS allows the Vercel domain
- Edge Functions need to be deployed separately to Supabase

---

## Phase 2 — Polish & Reliability

### Sprint 15: Accessibility Compliance
**Goal:** Achieve WCAG 2.1 AA compliance across all screens.

**Inputs:** MVP complete (Sprint 14)

**Outputs:**
- All elements keyboard navigable
- Screen reader compatible (VoiceOver/TalkBack)
- Minimum 4.5:1 contrast ratios
- 44x44pt touch targets
- aria-labels on all icons
- Map occupancy communicated via text (not colour alone)

**Subtasks:**
- [ ] S15.1 — Audit all components for keyboard navigation
- [ ] S15.2 — Add aria-labels to all icon buttons and interactive elements
- [ ] S15.3 — Verify contrast ratios meet 4.5:1 minimum
- [ ] S15.4 — Ensure all touch targets are >= 44x44pt
- [ ] S15.5 — Make BuildingCard screen-reader friendly (live regions for updates)
- [ ] S15.6 — Add text labels alongside colour coding on map (not colour-only information)
- [ ] S15.7 — Test with VoiceOver (macOS/iOS)
- [ ] S15.8 — Make FilterSheet usable with assistive technology

**Test criteria:**
- Tab through entire app without mouse
- VoiceOver announces all interactive elements correctly
- No colour-only information (occupancy always has text label)
- All contrast ratios verified

**Notes:**
- Reference PRD Section 10.2 for WCAG requirements
- Occupancy labels (Empty/Quiet/Moderate/Busy/Packed) must always accompany colours

---

### Sprint 16: Push Notifications & Alerts
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
- [ ] S16.1 — Create src/components/AlertSheet.tsx (threshold setter)
- [ ] S16.2 — Implement Web Push subscription registration
- [ ] S16.3 — Create register-alert Edge Function endpoint
- [ ] S16.4 — Create cancel-alert Edge Function endpoint
- [ ] S16.5 — Implement fire-alerts Edge Function (poll zone_occupancy, check thresholds)
- [ ] S16.6 — Implement rate limiting (5 per token per hour)
- [ ] S16.7 — Create src/hooks/useAlerts.ts
- [ ] S16.8 — Wire alert button in BuildingCard to AlertSheet
- [ ] S16.9 — Handle iOS limitations (requires iOS 16.4+ and home screen install)

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

### Sprint 17: Offline Graceful Degradation
**Goal:** Ensure the app remains useful when offline or on poor connections.

**Inputs:** Sprint 12 (service worker configured)

**Outputs:**
- App shell loads from cache when offline
- Last known occupancy data displayed with timestamp
- "Offline" banner with last update time
- Building metadata (names, amenities, hours) available offline
- Recommendations work with cached data

**Subtasks:**
- [ ] S17.1 — Cache building metadata in service worker
- [ ] S17.2 — Cache last occupancy snapshot to IndexedDB or localStorage
- [ ] S17.3 — Display cached data with "Last updated X min ago" timestamp
- [ ] S17.4 — Show offline indicator in header
- [ ] S17.5 — Ensure recommendations work with stale data
- [ ] S17.6 — Implement reconnection detection and data refresh
- [ ] S17.7 — Test on airplane mode

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

### Sprint 18: Performance Optimisation
**Goal:** Meet all performance targets from PRD Section 10.1.

**Inputs:** MVP feature-complete

**Outputs:**
- LCP < 2.5s (4G), < 4s (3G)
- TTI < 3 seconds
- Map pan/zoom >= 60fps on iPhone 12+
- Building card open < 200ms
- Recommendations recalculate < 500ms after filter change

**Subtasks:**
- [ ] S18.1 — Analyse bundle size, identify and fix large imports
- [ ] S18.2 — Lazy load BuildingCard component
- [ ] S18.3 — Preload Mapbox style and building GeoJSON on app init
- [ ] S18.4 — Memoize recommendation scoring (useMemo/useCallback)
- [ ] S18.5 — Optimise Mapbox layers (reduce repaints)
- [ ] S18.6 — Run Lighthouse audit and fix flagged issues
- [ ] S18.7 — Test on throttled 3G connection
- [ ] S18.8 — Profile and optimise Turf.js point-in-polygon (Web Worker if needed)

**Test criteria:**
- Lighthouse performance score >= 90
- LCP within targets
- Smooth 60fps map interaction
- No main thread blocking > 50ms

**Notes:**
- Reference PRD Section 10.1 and CLAUDE.md Section 5 for performance rules
- Turf.js Web Worker only needed at scale (>50 zones)

---

### Sprint 19: Error States & Edge Cases
**Goal:** Handle all error states gracefully with appropriate UI feedback.

**Inputs:** MVP feature-complete

**Outputs:**
- Error states for: Supabase connection failure, Mapbox tile failure, GPS failure, empty data
- Fallback list view when map tiles fail
- Retry mechanisms for transient failures
- Error boundaries around critical components
- Loading skeletons for async content

**Subtasks:**
- [ ] S19.1 — Create error boundary wrapper component
- [ ] S19.2 — Implement fallback list view for map failure
- [ ] S19.3 — Add loading skeleton components (pulse animation)
- [ ] S19.4 — Handle Supabase connection errors (retry with backoff)
- [ ] S19.5 — Handle GPS permission denied (show No Location screen)
- [ ] S19.6 — Handle zero buildings with data (empty heatmap state)
- [ ] S19.7 — Handle Mapbox token invalid / expired
- [ ] S19.8 — Add error logging (console only, no third-party services)

**Test criteria:**
- Each error state shows appropriate UI (not a blank screen or crash)
- Retry mechanisms recover from transient failures
- Loading skeletons prevent layout shift
- Error boundaries catch rendering errors

**Notes:**
- Reference PRD Section 12.7 for No Location screen
- No third-party error tracking (PRD Privacy rules)

---

### Sprint 20: Building Data Accuracy
**Goal:** Verify and improve the accuracy of all building data — polygons, hours, amenities, accessibility.

**Inputs:** Sprint 13 (initial seed data), user feedback

**Outputs:**
- Building polygons verified against current satellite imagery
- Hours verified against UoM semester 1 2026 schedule
- Amenity flags verified via campus visit or UoM accessibility guides
- "Report inaccuracy" mechanism for users
- Updated seed data

**Subtasks:**
- [ ] S20.1 — Cross-reference building hours with UoM 2026 semester calendar
- [ ] S20.2 — Verify accessibility data against UoM AccessAbility service
- [ ] S20.3 — Add "Report inaccuracy" button to BuildingCard
- [ ] S20.4 — Create simple feedback collection (Supabase table + Edge Function)
- [ ] S20.5 — Update seed data with corrections

**Test criteria:**
- Building hours match UoM published schedule
- Accessibility flags match UoM published data
- Report inaccuracy button functional
- Feedback stored in Supabase

**Notes:**
- Accessibility data accuracy is an ethical obligation — incorrect data is harmful
- Reference PRD Section 13.4 for ethical considerations

---

## Phase 3 — Intelligence (Overview)

### Sprint 21: EWMA Prediction Engine
Implement Pulse's own prediction model using Exponentially Weighted Moving Average on occupancy_history. Replace Google baseline when sample_count >= 14 days for a given day/hour slot. Add confidence scoring (high/medium/low based on sample count and variance).

### Sprint 22: Anomaly Detection
Detect unusual occupancy patterns (exam periods, events, holidays). Flag anomalies in prediction data. Adjust predictions during known unusual periods.

### Sprint 23: Personalised Recommendations
Learn from user behaviour (buildings visited, filters used — all local, no server storage). Weight recommendations toward user preferences. "Your usual spots" section.

### Sprint 24: Feedback Loops
Allow users to confirm/deny occupancy accuracy ("Is this right?"). Use confirmations to calibrate capacity estimates. Track prediction accuracy over time.

---

## Phase 4 — Scale & Monetisation (Overview)

### Sprint 25: Multi-Campus Support
Add campus selector. Seed data for 2 additional Melbourne universities (Monash Clayton, RMIT City). Same database instance, data isolated by campus_id. Campus-specific map styling.

### Sprint 26: University Analytics Dashboard
Build admin.pulse.app subdomain. Supabase Auth with university email domain restriction. Views: campus-wide heatmap by hour, per-building utilisation charts, peak stress report, CSV export. All data aggregate and anonymised.

### Sprint 27: Licensing & Billing
Stripe integration for university subscriptions. Tiered pricing based on campus count. Admin user management.

---

## Phase 5 — Social Layer (Overview)

### Sprint 28: Friend Presence
Mutual follow system (opt-in). Show friend location at building level only (never floor or seat). Account required for social features. Anonymous viewing always remains available.

### Sprint 29: Study Group Matchmaking
Manual subject tags. "Looking for study partner" status. Study session creation with building + time. Entirely opt-in.

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

---

## Known Risks & Current Status

| Risk | Status | Notes |
|------|--------|-------|
| Cold start — insufficient crowdsourced data | Mitigated | Google Popular Times integration (F010) fills gap from day one |
| Google Places API cost | Monitoring | ~$8/month for 10 buildings. Cache aggressively (30min TTL) |
| Google Places API unavailable | Planned | Fallback to Pulse predictions in blending logic |
| Location permission denial | Planned | Allow browsing with Google + predicted data without GPS |
| Supabase Realtime connection limits | Monitoring | Free tier: 200 concurrent. Polling fallback planned |
| Building capacity estimates inaccurate | Accepted | Directional only ("~"). Report inaccuracy button planned |
| iOS push requires 16.4+ + home screen | Accepted | In-app alerts as fallback |
| current_popularity not available for all buildings | Accepted | Only buildings with google_place_id get Google data |
| Accessibility data inaccurate | High priority | Manual verification + user reporting mechanism |
