<p align="center">
  <img src="public/favicon.svg" width="80" alt="UniSpace logo" />
</p>

<h1 align="center">UniSpace</h1>

<p align="center">
  <strong>Campus occupancy for university students — live where it can be, honestly estimated where it can't.</strong>
</p>

<p align="center">
  <a href="https://unispace-tawny.vercel.app"><strong>unispace-tawny.vercel.app →</strong></a>
</p>

<p align="center">
  <em>Running on committed fixture data for 18 real UoM buildings — the app says so on screen.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-live-brightgreen" alt="Status: Live" />
  <img src="https://img.shields.io/badge/phase-feature%20complete-blue" alt="Phase: Feature complete" />
  <img src="https://img.shields.io/badge/pilot-UoM%20Parkville-003366" alt="Pilot: UoM Parkville" />
  <img src="https://img.shields.io/badge/license-All%20Rights%20Reserved-lightgrey" alt="License" />
</p>

<p align="center">
  <a href="#the-problem">Problem</a> &middot;
  <a href="#how-unispace-works">How It Works</a> &middot;
  <a href="#tech-stack">Tech Stack</a> &middot;
  <a href="#local-setup">Setup</a> &middot;
  <a href="#documentation">Docs</a> &middot;
  <a href="#pilot-campus">Pilot Campus</a> &middot;
  <a href="#roadmap">Roadmap</a>
</p>

---

> **Status: live, and running on fixture data.** Every engineering task through Sprint 25 is closed
> and the app is deployed. It shows modelled occupancy estimates for 18 real UoM buildings and
> labels itself as such on screen.
>
> Runs locally with no backend at all: `pnpm install && pnpm dev`.

---

## There is no backend, on purpose

The demo at [unispace-tawny.vercel.app](https://unispace-tawny.vercel.app) reads from a **committed
fixture layer**, not a database. No Supabase project is provisioned, and none is going to be. A
hosted Postgres, Realtime and Edge Function stack costs money every month, and this is a portfolio
project — so the backend is deliberately closed rather than pending.

That is a smaller gap than it sounds, because the backend was never the part that was hand-waved:

| Committed and reviewable | Running |
|---|---|
| 21 SQL migrations, applied in order, RLS on every table | — |
| 8 seed files: 18 buildings, 47 zones, 890 rooms, 1,156 typical-occupancy rows | — |
| 7 Deno Edge Functions — aggregation, predictions, reports, alerts, feedback, Google sync | — |
| The full React app, and the test suite that covers it | ✅ deployed |

Run `pnpm test` to see the suite for yourself — 325 tests across 30 files.

The fixture layer (Sprint R2) is what makes that tenable. It is **generated from the same committed
seed SQL the database would be seeded from** — `pnpm generate:fixtures`, with a test that fails if
the two fall out of step — so the app is exercising the real data shapes, not a mock someone wrote
by hand. Every hook reads through one seam (`src/lib/dataSource.ts`); pointing it at a live Supabase
project is an environment-variable change, not a rewrite.

The honest consequence, stated plainly: **the live-crowdsourced path has never run against real
users.** Its code is written and unit-tested, and the app is built to degrade to estimates when that
path returns nothing — which, today, is always. What you can evaluate here is the client, the data
model, and how the UI behaves when it does not know something. What you cannot evaluate is a
production backend under load.

---

## What is UniSpace?

UniSpace shows university students how busy campus buildings are, so fewer trips end at a full library. It combines crowdsourced, privacy-preserving location data with anonymous crowd reports and modelled estimates of each building's weekly rhythm — check it before you leave, not after you arrive.

The design problem it actually solves is not "show occupancy". It is **showing occupancy honestly when you are not sure** — which, for a crowdsourced app on day one, is most of the time.

No accounts. No hardware. No tracking. Just open the app and see where the space is.

## The Problem

University students have no reliable way to know whether a study space is available before physically going there. During peak hours, students try **5–8 buildings** before finding a free spot, wasting **30–40 minutes** each time.

*(Those figures, and the ones below, are the problem estimates recorded in [`PRD.md`](PRD.md) § 2.3.
They are the premise this was built on, not measurements taken by this app.)*

This is especially costly for:
- **Commuter students** — limited campus time between classes
- **Students with disabilities** — each failed attempt costs 10–15 minutes of physical effort
- **Students with anxiety** — walking into a packed room and leaving is stressful
- **Group coordinators** — finding a table for 5 requires more effort than solo study
- **Night owls** — need to know which buildings are open and occupied (safety)

## How UniSpace Works

1. **Open the app** — no account required. A full-viewport heatmap shows every building on campus.
2. **Check occupancy** — buildings are colour-coded from green (empty) to red (packed), with percentage labels and trend arrows (filling / emptying / stable).
3. **Tap a building** — bottom sheet shows floor-by-floor breakdown, amenities, 24-hour prediction chart, and a "Usually X% at this time" insight.
4. **"Find me a spot"** — filter by amenities (WiFi, power, quiet, accessible), walking distance, and max occupancy. Results ranked by a scoring algorithm.
5. **Set alerts** — push notification when a building drops below your chosen threshold.

### Data Source Fallback

UniSpace always shows the best available data, and says which it is:

| Priority | Source | When it's used | In the live demo |
|:--------:|--------|----------------|------------------|
| 1 | **Live crowdsourced** | Active UniSpace users currently in the building | never — needs a backend |
| 2 | **Crowd reports** | Anonymous 1–5 busyness reports (30-min decay) | only within your own session |
| 3 | **UniSpace predicted** | Model trained on this campus's own accumulated occupancy history | never — no history has been collected |
| 4 | **Typical estimate** | UniSpace's modelled weekly rhythm for that building — an estimate, labelled as one | **this is what you see** |
| 5 | **No data** | Grey polygon — "No data available" | outside a building's open hours |

The hierarchy is not decoration for the demo: it is why the demo is usable at all. With no backend
every zone returns `data_quality: 'none'`, blending falls through to tier 4, and the UI renders the
estimated treatment — dimmed, no green dot, `~` qualifier. That is the same code path a real
deployment runs on day one, before it has any users.

> **On Google.** Google's public Places API does **not** expose live or typical busyness — the
> Popular Times you see in Google Maps is an internal feature with no public endpoint. UniSpace
> therefore uses Google only for opening hours. The weekly curves in tiers 3 and 4 are our own
> modelled estimates of campus rhythm, and the UI labels them as estimates wherever they appear. We
> would rather show an honest estimate than borrow someone else's credibility for it.

Confidence is a visible state, not a footnote: live data, estimates and stale data are rendered
differently, so "we don't really know" never looks like "it's empty".

### Privacy by Design

Privacy is a core architectural constraint, not an afterthought:

- **GPS coordinates never leave the device.** Zone detection is client-side via Turf.js — only a `zone_id` is broadcast.
- **No accounts required** for viewing, recommendations, or alerts.
- **Session IDs rotate every 30 minutes** and are never persisted to any database.
- **No analytics or tracking libraries.** Zero third-party telemetry.
- **All position data expires after 30 minutes.** Nothing is retained.

> For the full privacy specification, see [`PRD.md` Section 13](PRD.md).

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19 + TypeScript, Vite 8 (PWA) |
| **Styling** | Tailwind CSS v4 |
| **Map** | Mapbox GL JS |
| **Routing** | React Router 7 |
| **Backend** | Supabase — Postgres, Realtime, Edge Functions (Deno) |
| **External data** | Google Places API (opening hours only) |
| **Charts** | Recharts |
| **Animations** | Framer Motion |
| **Geospatial** | Turf.js (client-side point-in-polygon) |
| **Validation** | Zod (runtime validation of all external data) |
| **State** | React hooks — no state library |

---

## Local Setup

### Prerequisites

- Node.js 20+
- pnpm 11 (`npm install -g pnpm`)
- A Mapbox account (free tier is sufficient) — needed for the map tiles
- A Supabase project — optional, and not required for anything described below

### Quick start — this is the normal path

The app runs entirely on local fixtures, generated from the committed seed SQL. Everything except
the database itself can be developed and tested this way, which is why it is the default.

```bash
git clone https://github.com/br9704/UniSpace.git
cd UniSpace
pnpm install

cp .env.example .env.local
# Add VITE_MAPBOX_TOKEN. Leave the Supabase vars blank and fixtures switch on
# automatically; set VITE_USE_FIXTURES=true to force them on regardless.

pnpm test
pnpm dev
```

You get all 18 buildings, their floor zones and their weekly occupancy curves, with no live
occupancy — which is exactly what a real deployment looks like before it has users.

### Running against your own Supabase project

Nothing requires this, and the hosted project for UniSpace is deliberately not provisioned. These
are the instructions for anyone who wants to stand the backend up themselves — the schema and
functions are all here.

```bash
supabase db push                    # migrations 001–021
# then run supabase/seed/001–005 via the SQL editor or CLI
supabase functions deploy <name>    # for each of the 7 Edge Functions
```

Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env.local`. See
[`MASTERPLAN.md`](MASTERPLAN.md) § *Owner-Gated Ship Runbook* for the full provisioning sequence,
including secrets, `pg_cron` schedules and quota caps.

### Regenerating fixtures

```bash
pnpm generate:fixtures   # after editing anything in supabase/seed/
```

A test fails if the generated fixtures fall out of step with the seed SQL, so the two cannot drift.

### Environment Variables

| Variable | Where | Description |
|----------|-------|-------------|
| `VITE_SUPABASE_URL` | `.env.local` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | `.env.local` | Supabase anonymous/public key |
| `VITE_MAPBOX_TOKEN` | `.env.local` | Mapbox GL JS access token |
| `VITE_USE_FIXTURES` | `.env.local` | `true`/`false` to force local fixtures on or off. Omit to auto-detect from whether Supabase is configured. |
| `VITE_VAPID_PUBLIC_KEY` | `.env.local` | Web Push VAPID public key (required for push subscription) |
| `GOOGLE_PLACES_API_KEY` | Supabase secrets | Google Places API key (server-side only) |
| `VAPID_PUBLIC_KEY` | Supabase secrets | Web Push VAPID public key |
| `VAPID_PRIVATE_KEY` | Supabase secrets | Web Push VAPID private key |
| `VAPID_EMAIL` | Supabase secrets | Contact email for VAPID |
| `IP_HASH_SALT` | Supabase secrets | Any long random string. Required by `submit-report` and `submit-feedback`, which hash the caller's IP for rate limiting. **An unsalted SHA-256 of an IPv4 address is not anonymous** — there are only about four billion of them, so the whole space can be enumerated and the hash reversed. Without the salt, a rate-limiting hash becomes a stored identifier in all but name. |

> **Never commit secrets.** All client-side env vars use the `VITE_` prefix. Server-side secrets are set in the Supabase dashboard only.

---

## Project Structure

```
UniSpace/
├── src/
│   ├── components/       # Reusable UI components
│   ├── hooks/            # Custom React hooks (data fetching, realtime, geo)
│   ├── lib/              # Data source, fixtures, Mapbox helpers, blending utilities
│   ├── pages/            # Top-level route components (HomePage, MapPage, AlertsPage)
│   ├── types/            # Shared TypeScript interfaces and enums
│   └── constants/        # App constants (colours, thresholds, map defaults)
├── supabase/
│   ├── migrations/       # SQL migrations (001–021), applied sequentially
│   ├── functions/        # Deno Edge Functions
│   └── seed/             # Seed data scripts
├── PRD.md                # Product requirements document
├── MASTERPLAN.md         # Sprint plan and progress tracker
├── CLAUDE.md             # Development agent instructions
└── README.md             # You are here
```

---

## Database Schema

```
campuses ──< buildings ──< building_zones ──< zone_occupancy
                │                │
                │                └──< occupancy_history
                │
                ├──< occupancy_predictions
                ├──< occupancy_reports
                ├──< google_popularity_cache
                ├──< google_popular_times
                ├──< rooms
                ├──< feedback
                └──< user_alerts
```

| Table | Purpose |
|-------|---------|
| `campuses` | Campus metadata — name, centre coordinates, default zoom |
| `buildings` | Building details, amenity flags, hours, GeoJSON polygon |
| `building_zones` | Floor-level zones with polygon, capacity, and amenity data |
| `zone_occupancy` | **Live** occupancy counts per zone (Supabase Realtime enabled) |
| `occupancy_history` | 15-minute snapshots for trend analysis and predictions |
| `occupancy_predictions` | Pre-computed predicted occupancy by day/hour |
| `google_popularity_cache` | Cached Google current popularity (30-min TTL) |
| `google_popular_times` | Google typical weekly popularity histogram |
| `occupancy_reports` | Anonymous crowd reports (1-5 busyness + optional noise, 30-min expiry) |
| `rooms` | Room directory — code, floor, type, capacity (no room-level occupancy, by design) |
| `feedback` | Anonymous data-correction reports (no `user_id` column, no read policy) |
| `user_alerts` | Push notification subscriptions (keyed by push token, no user ID) |

All tables have **Row Level Security** enabled. Anonymous users can read; only the service role (Edge Functions) can write.

---

## Documentation

| Document | Description | Link |
|----------|-------------|------|
| **Product Requirements** | Full feature specs, data models, personas, design system, privacy rules, UI screen specs | [`PRD.md`](PRD.md) |
| **Implementation Plan** | Sprint-by-sprint breakdown with progress tracking, architecture decisions, and risk log | [`MASTERPLAN.md`](MASTERPLAN.md) |
| **Agent Instructions** | Coding standards, privacy rules, commit conventions, sprint protocol | [`CLAUDE.md`](CLAUDE.md) |
| **Forensic Audit** | The August 2026 audit that found the three systemic failures, and what it verified as genuinely working | [`WIRING-AUDIT.md`](WIRING-AUDIT.md) |
| **Motion Spec** | Binding animation specification — how motion encodes liveness, change and confidence | [`MOTION.md`](MOTION.md) |
| **Environment Template** | Required environment variables with descriptions | [`.env.example`](.env.example) |

---

## Pilot Campus

**University of Melbourne — Parkville**

18 UoM Parkville buildings with amenity data, building hours, and typical-occupancy curves (1,156
rows, covering each building only on the days it is open).

**Building geometry** — 15 of the 18 carry their real OpenStreetMap footprint, 14 to 57 vertices
each (migration `022`). The other three — Engineering Building 1, the ICT Building and Kwong Lee Dow
— could not be identified in OSM with any confidence and are left as rectangular approximations
rather than matched to a guess. Buildings are matched to OSM by name, not by proximity, because
several seeded coordinates were wrong and proximity matching inherits that error: Melbourne School
of Design was seeded 428 m from the Glyn Davis Building it actually occupies.

> Building geometry © [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors,
> available under the [Open Database License](https://opendatacommons.org/licenses/odbl/) (ODbL).
> The ODbL governs that geometry and applies independently of this repository's own licence.

Those curves are UniSpace's own modelled estimates of campus rhythm, not measurements and not Google data — the UI labels them as estimates wherever they are shown. Google's public Places API does not expose live busyness, so it is used only for opening hours.

**What is actually sourced, and what is not.** Seed data verification (Sprint 17) is complete, and it
found that most of the seeded real-world data had been invented. What has since been replaced with
published values:

- **Hours** — the five library buildings carry UoM's published opening hours. That source publishes
  a *current-week* table, so those hours will be wrong over exams, summer and public holidays. The
  other 13 buildings have no published source and remain unverified.
- **Accessibility** — the flags are nullable, and default to *unknown* rather than *no*. Only the
  claim UoM states unambiguously — all libraries have lifts and an accessible toilet — is asserted.
  Step-free entry, accessible parking, and all 13 non-library buildings render as `[?]`.
- **Google Place IDs** — 11 of 18 are NULL and the remaining 7 are unverified. Resolving them needs
  a live Places API key, so they are left undone rather than guessed.
- **Room directory** — the table and UI exist; no room data has been seeded, so it renders nothing.

> Capacity estimates are directional (~), not precise. The remaining unverified items are tracked in
> [`MASTERPLAN.md`](MASTERPLAN.md) § *Owner-Gated Ship Runbook*, step 5.

---

## Roadmap

### Phase 0 — Foundation
- [x] **Sprint 0:** Project scaffolding (Vite + React + TypeScript + Tailwind + PWA)
- [x] **Sprint 1:** Supabase schema, migrations, seed data, Edge Function scaffolds
- [x] **Sprint 2:** Occupancy blending logic and fallback hierarchy

### Phase 1 — MVP
- [x] **Sprint 3:** Mapbox map with building polygons
- [x] **Sprint 4:** Realtime geolocation broadcasting (zone IDs only)
- [x] **Sprint 5:** Zone aggregation Edge Function
- [x] **Sprint 6:** Occupancy blending (live → crowd reports → predicted → estimated)
- [x] **Sprint 7:** Live heatmap rendering, expanded to 18 buildings
- [x] **Sprint 8:** Building cards (bottom sheet)
- [x] **Sprint 9:** Floor-level breakdown
- [x] **Sprint 10:** Smart recommendations
- [x] **Sprint 11:** Prediction engine (24h chart, sparkline, insights)
- [x] **Sprint 12:** UI primitives and production readiness

### Phase 1.5 — Competitive edge
- [x] **Sprint 13:** Manual crowd reporting (1–5 scale, decay, blending)
- [x] **Sprint 14:** Noise levels & favourites
- [x] **Sprint 15:** Building photos & tips *(components ready; photo assets pending)*
- [x] **Sprint 16:** PWA install flow + service worker
- [x] **Sprint 17:** Seed data verification

### Phase 1.9 — Recovery
> A forensic audit in August 2026 found that the previously-recorded progress overstated reality:
> the Supabase project had been deleted, Tailwind had silently stopped emitting most of its CSS,
> and the project had not compiled since Sprint 20. The audit is in
> [`WIRING-AUDIT.md`](WIRING-AUDIT.md); these six sprints fixed what it found.

- [x] **R0:** Forensic audit and honest correction — the 12 falsely-marked claims catalogued in [`WIRING-AUDIT.md`](WIRING-AUDIT.md) § 2
- [x] **R1:** Foundation repair — Tailwind v4 migration, build fixed, fail-soft config
- [x] **R2:** Local fixture layer — the whole app runs with no backend
- [x] **R3:** SIGNAL design system + component decomposition
- [x] **R4:** MOTION.md implementation — breathing heatmap, counting numbers, confidence tiers
- [x] **R5:** Re-verification of Sprints 13–17 against observation

### Phase 2 — Polish & reliability
- [x] **Sprint 19:** Accessibility (WCAG 2.1 AA, contrast computed and enforced)
- [x] **Sprint 20:** Push notifications & alerts *(code complete; delivery needs the Edge Functions deployed)*
- [x] **Sprint 21:** Offline graceful degradation
- [x] **Sprint 22:** Performance — landing route cut from 637 KB to 190 KB gzip, held there by `bundleBudget.test.ts`
- [x] **Sprint 23:** Error states & edge cases
- [x] **Sprint 24:** Room directory & cross-building room search *(table and UI ready; no room data seeded yet)*
- [x] **Sprint 25:** Anonymous feedback system
- [x] **Sprint 18:** Deployed — [unispace-tawny.vercel.app](https://unispace-tawny.vercel.app)

### Phase 3+ — Roadmap, not scheduled
EWMA predictions, anomaly detection, personalised recommendations, multi-campus, an analytics
dashboard, friend presence. Deliberately unscheduled: the last three would require user accounts,
which contradicts this app's core promise.

> Full sprint details in [`MASTERPLAN.md`](MASTERPLAN.md)

---

## Contributing

Built by [Bruno Jaamaa](https://github.com/br9704). Sprints 0–25 are closed; the sprint plan, every
architectural decision and its reasoning, and the deferrals with their reasons are all in
[`MASTERPLAN.md`](MASTERPLAN.md). Coding standards are in [`CLAUDE.md`](CLAUDE.md).

If you are reading the code, [`WIRING-AUDIT.md`](WIRING-AUDIT.md) is probably the most interesting
file here: it is the forensic audit that found this project's checkmarks had drifted badly from
reality, and it is preserved unedited, including the parts that were embarrassing.

---

## License

All rights reserved. Copyright Bruno Jaamaa 2026.
