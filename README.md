<p align="center">
  <img src="public/favicon.svg" width="80" alt="Pulse logo" />
</p>

<h1 align="center">Pulse</h1>

<p align="center">
  <strong>Real-time campus occupancy for university students.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-in%20development-orange" alt="Status: In Development" />
  <img src="https://img.shields.io/badge/phase-0%20complete%20|%20sprint%202%20done-blue" alt="Phase: 0 Complete, Sprint 2 Done" />
  <img src="https://img.shields.io/badge/pilot-UoM%20Parkville-003366" alt="Pilot: UoM Parkville" />
  <img src="https://img.shields.io/badge/license-All%20Rights%20Reserved-lightgrey" alt="License" />
</p>

<p align="center">
  <a href="#the-problem">Problem</a> &middot;
  <a href="#how-pulse-works">How It Works</a> &middot;
  <a href="#tech-stack">Tech Stack</a> &middot;
  <a href="#local-setup">Setup</a> &middot;
  <a href="#documentation">Docs</a> &middot;
  <a href="#current-status">Status</a>
</p>

---

> **This project is under active development.** Core infrastructure is in place — features are being built sprint-by-sprint. See the [roadmap](#roadmap) below for what's done and what's next.

---

## What is Pulse?

Pulse gives every university student real-time visibility into campus occupancy so they never waste time walking to a full building again. It combines crowdsourced, privacy-preserving location data with Google Maps Popular Times to deliver a live occupancy heatmap — check it before you leave, not after you arrive.

No accounts. No hardware. No tracking. Just open the app and see where the space is.

## The Problem

University students have no reliable way to know whether a study space is available before physically going there. During peak hours, students try **5–8 buildings** before finding a free spot, wasting **30–40 minutes** each time.

This is especially costly for:
- **Commuter students** — limited campus time between classes
- **Students with disabilities** — each failed attempt costs 10–15 minutes of physical effort
- **Students with anxiety** — walking into a packed room and leaving is stressful
- **Group coordinators** — finding a table for 5 requires more effort than solo study
- **Night owls** — need to know which buildings are open and occupied (safety)

## How Pulse Works

1. **Open the app** — no account required. A full-viewport heatmap shows every building on campus.
2. **Check occupancy** — buildings are colour-coded from green (empty) to red (packed), with percentage labels and trend arrows (filling / emptying / stable).
3. **Tap a building** — bottom sheet shows floor-by-floor breakdown, amenities, 24-hour prediction chart, and a "Usually X% at this time" insight.
4. **"Find me a spot"** — filter by amenities (WiFi, power, quiet, accessible), walking distance, and max occupancy. Results ranked by a scoring algorithm.
5. **Set alerts** — push notification when a building drops below your chosen threshold.

### Data Source Fallback

Pulse always shows the best available data:

| Priority | Source | When it's used |
|:--------:|--------|----------------|
| 1 | **Live crowdsourced** | Active Pulse users in the building |
| 2 | **Google current popularity** | Real-time busyness from Google Places API |
| 3 | **Pulse predicted** | EWMA model trained on historical occupancy |
| 4 | **Google typical popularity** | Weekly busyness histogram from Google |
| 5 | **No data** | Grey polygon — "No data available" |

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
| **Frontend** | React 18 + TypeScript, Vite (PWA) |
| **Styling** | Tailwind CSS v4 with UoM design tokens |
| **Map** | Mapbox GL JS (dark-v11 base) |
| **Backend** | Supabase — Postgres, Realtime, Edge Functions (Deno) |
| **External data** | Google Places API |
| **Charts** | Recharts |
| **Animations** | Framer Motion |
| **Geospatial** | Turf.js (client-side point-in-polygon) |
| **State** | Zustand (where needed) |

---

## Local Setup

### Prerequisites

- Node.js 18+
- pnpm (`npm install -g pnpm`)
- A Supabase project
- A Mapbox account (free tier sufficient)
- A Google Cloud project with Places API enabled

### Quick Start

```bash
# 1. Clone
git clone https://github.com/br9704/PULSE.git
cd PULSE

# 2. Install dependencies
pnpm install

# 3. Configure environment
cp .env.example .env.local
# Edit .env.local with your Supabase URL, anon key, and Mapbox token

# 4. Apply database migrations (requires Supabase CLI)
supabase db push

# 5. Seed the database (UoM Parkville — 5 buildings, 13 zones)
# Run supabase/seed/001_uom_parkville.sql via Supabase SQL Editor or CLI

# 6. Run tests
pnpm test

# 7. Start dev server
pnpm dev
```

### Environment Variables

| Variable | Where | Description |
|----------|-------|-------------|
| `VITE_SUPABASE_URL` | `.env.local` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | `.env.local` | Supabase anonymous/public key |
| `VITE_MAPBOX_TOKEN` | `.env.local` | Mapbox GL JS access token |
| `GOOGLE_PLACES_API_KEY` | Supabase secrets | Google Places API key (server-side only) |
| `VAPID_PUBLIC_KEY` | Supabase secrets | Web Push VAPID public key |
| `VAPID_PRIVATE_KEY` | Supabase secrets | Web Push VAPID private key |
| `VAPID_EMAIL` | Supabase secrets | Contact email for VAPID |

> **Never commit secrets.** All client-side env vars use the `VITE_` prefix. Server-side secrets are set in the Supabase dashboard only.

---

## Project Structure

```
pulse/
├── src/
│   ├── components/       # Reusable UI components
│   ├── hooks/            # Custom React hooks (data fetching, realtime, geo)
│   ├── lib/              # Supabase client, Mapbox helpers, blending utilities
│   ├── pages/            # Top-level route components (MapPage, FindPage)
│   ├── types/            # Shared TypeScript interfaces and enums
│   ├── stores/           # Zustand state stores
│   └── constants/        # App constants (colours, thresholds, map defaults)
├── supabase/
│   ├── migrations/       # SQL migrations (001–008), applied sequentially
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

| Building | Est. Capacity | Floors | Key Amenities |
|----------|:------------:|:------:|---------------|
| Baillieu Library | ~800 | 3 | WiFi, power, quiet zones, group seating, elevator, accessible |
| Eastern Resource Centre (ERC) | ~300 | 2 | WiFi, power, quiet zones, elevator, accessible |
| Arts West | ~400 | 3 | WiFi, power, group seating, food nearby, accessible parking |
| Engineering Building 1 | ~350 | 3 | WiFi, power, group seating, food nearby, elevator |
| Doug McDonell (ICT) | ~250 | 2 | WiFi, power, group seating, elevator, accessible |

> Capacity estimates are directional (~), not precise. Building data will be verified against real-world conditions in Sprint 13.

---

## Roadmap

### Phase 0 — Foundation
- [x] **Sprint 0:** Project scaffolding (Vite + React + TypeScript + Tailwind + PWA)
- [x] **Sprint 1:** Supabase infrastructure (schema, migrations, seed data, Edge Function scaffolds)
- [x] **Sprint 2:** Google Places integration and occupancy blending logic

### Phase 1 — MVP
- [x] **Sprint 3:** Mapbox map with building polygons
- [x] **Sprint 4:** Realtime geolocation broadcasting
- [x] **Sprint 5:** Zone aggregation Edge Function
- [x] **Sprint 6:** Occupancy blending (live + Google + predicted)
- [x] **Sprint 7:** Live heatmap rendering + building expansion (5 → 20 buildings)
- [x] **Sprint 8:** Building cards (bottom sheet)
- [ ] **Sprint 9:** Floor-level breakdown
- [ ] **Sprint 10:** Smart recommendations ("Find me a spot")
- [ ] **Sprint 11:** Prediction engine (Google baseline)
- [ ] **Sprint 12:** PWA install flow + service worker
- [ ] **Sprint 13:** Seed data accuracy verification
- [ ] **Sprint 14:** MVP integration testing + Vercel deploy

### Phase 2 — Polish & Reliability
- [ ] Accessibility compliance (WCAG 2.1 AA)
- [ ] Push notifications & alerts
- [ ] Offline graceful degradation
- [ ] Performance optimisation
- [ ] Error states & edge cases

### Phase 3+ — Intelligence, Scale, Social
- [ ] EWMA prediction engine, anomaly detection, personalised recommendations
- [ ] Multi-campus support, university analytics dashboard
- [ ] Friend presence, study group matchmaking

> Full sprint details in [`MASTERPLAN.md`](MASTERPLAN.md)

---

## Contributing

This project is under active development by [Bruno Jaamaa](https://github.com/br9704). Development follows the sprint plan in [`MASTERPLAN.md`](MASTERPLAN.md) with coding standards defined in [`CLAUDE.md`](CLAUDE.md).

---

## License

All rights reserved. Copyright Bruno Jaamaa 2026.
