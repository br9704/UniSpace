<p align="center">
  <img src="public/favicon.svg" width="80" alt="UniSpace logo" />
</p>

<h1 align="center">UniSpace</h1>

<p align="center">
  <strong>Real-time campus occupancy for university students.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-awaiting%20deploy-yellow" alt="Status: Awaiting deploy" />
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
  <a href="#current-status">Status</a>
</p>

---

> **Status:** feature-complete and not yet deployed. Every sprint through Sprint 25 is done; what
> remains is provisioning — a Supabase project, API keys, a Vercel deploy — plus real-world data
> that cannot be verified from inside a repo. The full checklist is in
> [`MASTERPLAN.md`](MASTERPLAN.md) § *Owner-Gated Ship Runbook*.
>
> The app runs today with no backend at all: `pnpm install && pnpm dev`.

---

## What is UniSpace?

UniSpace gives every university student real-time visibility into campus occupancy so they never waste time walking to a full building again. It combines crowdsourced, privacy-preserving location data with anonymous crowd reports and modelled estimates of each building's weekly rhythm — check it before you leave, not after you arrive.

No accounts. No hardware. No tracking. Just open the app and see where the space is.

## The Problem

University students have no reliable way to know whether a study space is available before physically going there. During peak hours, students try **5–8 buildings** before finding a free spot, wasting **30–40 minutes** each time.

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

| Priority | Source | When it's used |
|:--------:|--------|----------------|
| 1 | **Live crowdsourced** | Active UniSpace users currently in the building |
| 2 | **Crowd reports** | Anonymous 1–5 busyness reports (30-min decay) |
| 3 | **UniSpace predicted** | Model trained on this campus's own accumulated occupancy history |
| 4 | **Typical estimate** | UniSpace's modelled weekly rhythm for that building — an estimate, labelled as one |
| 5 | **No data** | Grey polygon — "No data available" |

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
| **Backend** | Supabase — Postgres, Realtime, Edge Functions (Deno) |
| **External data** | Google Places API (opening hours only) |
| **Charts** | Recharts |
| **Animations** | Framer Motion |
| **Geospatial** | Turf.js (client-side point-in-polygon) |
| **State** | React hooks — no state library |

---

## Local Setup

### Prerequisites

- Node.js 20+
- pnpm 11 (`npm install -g pnpm`)
- A Mapbox account (free tier is sufficient) — needed for the map tiles
- A Supabase project — **only** if you want to run against a real backend

### Quick start — no backend required

The app runs entirely on local fixtures, generated from the committed seed SQL. Use this to work on
anything that isn't the database itself.

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

### Running against Supabase

```bash
supabase db push                    # migrations 001–014
# then run supabase/seed/001–004 via the SQL editor or CLI
supabase functions deploy <name>    # for each of the 6 Edge Functions
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
│   ├── migrations/       # SQL migrations (001–014), applied sequentially
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
| `user_alerts` | Push notification subscriptions (keyed by push token, no user ID) |

All tables have **Row Level Security** enabled. Anonymous users can read; only the service role (Edge Functions) can write.

---

## Documentation

| Document | Description | Link |
|----------|-------------|------|
| **Product Requirements** | Full feature specs, data models, personas, design system, privacy rules, UI screen specs | [`PRD.md`](PRD.md) |
| **Implementation Plan** | Sprint-by-sprint breakdown with progress tracking, architecture decisions, and risk log | [`MASTERPLAN.md`](MASTERPLAN.md) |
| **Agent Instructions** | Coding standards, privacy rules, commit conventions, sprint protocol | [`CLAUDE.md`](CLAUDE.md) |
| **Environment Template** | Required environment variables with descriptions | [`.env.example`](.env.example) |

---

## Pilot Campus

**University of Melbourne — Parkville**

18 UoM Parkville buildings with OSM-sourced polygon outlines, amenity data, building hours, and typical-occupancy curves (1,156 rows, covering each building only on the days it is open).

Those curves are UniSpace's own modelled estimates of campus rhythm, not measurements and not Google data — the UI labels them as estimates wherever they are shown. Google's public Places API does not expose live busyness, so it is used only for opening hours.

> Capacity estimates are directional (~), not precise. Building data will be verified in Sprint 17.

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

- [x] **R0:** Forensic audit and honest correction of 22 falsely-marked tasks
- [x] **R1:** Foundation repair — Tailwind v4 migration, build fixed, fail-soft config
- [x] **R2:** Local fixture layer — the whole app runs with no backend
- [x] **R3:** SIGNAL design system + component decomposition
- [x] **R4:** MOTION.md implementation — breathing heatmap, counting numbers, confidence tiers
- [x] **R5:** Re-verification of Sprints 13–17 against observation

### Phase 2 — Polish & reliability
- [x] **Sprint 19:** Accessibility (WCAG 2.1 AA, contrast computed and enforced)
- [x] **Sprint 20:** Push notifications & alerts
- [x] **Sprint 21:** Offline graceful degradation
- [x] **Sprint 22:** Performance — landing route cut from 637 KB to 189 KB gzip
- [x] **Sprint 23:** Error states & edge cases
- [x] **Sprint 24:** Room directory & cross-building room search
- [x] **Sprint 25:** Anonymous feedback system
- [ ] **Sprint 18:** Deploy — the only thing left, and it needs credentials rather than code

### Phase 3+ — Roadmap, not scheduled
EWMA predictions, anomaly detection, personalised recommendations, multi-campus, an analytics
dashboard, friend presence. Deliberately unscheduled: the last three would require user accounts,
which contradicts this app's core promise.

> Full sprint details in [`MASTERPLAN.md`](MASTERPLAN.md)

---

## Contributing

This project is under active development by [Bruno Jaamaa](https://github.com/br9704). Development follows the sprint plan in [`MASTERPLAN.md`](MASTERPLAN.md) with coding standards defined in [`CLAUDE.md`](CLAUDE.md).

---

## License

All rights reserved. Copyright Bruno Jaamaa 2026.
