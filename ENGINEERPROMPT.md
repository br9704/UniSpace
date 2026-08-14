# Engineer Prompt — UNISPACE (PULSE)
# `~/Desktop/PULSE` · github.com/br9704/UniSpace · *"Live campus occupancy for 18 buildings. GPS never leaves your device."*

> **Paste into a fresh Claude Code session at `~/Desktop/PULSE`.**
> `MASTERPLAN.md`, `CLAUDE.md`, `PRD.md` already exist. Do **not** rewrite them. You are finishing a nearly-complete build and getting it live.

---

## Where this actually stands (measured)

- **199 tasks `[x]`, 111 `[ ]`** — the most complete of Bruno's unreleased projects, ~64% through a 36-sprint plan
- Last commits: S18.1–3 marked complete, S17 + S20 done, push notifications shipped (Edge Functions, Web Push, VAPID keys)
- **Sprint 18 is literally titled "MVP Integration Testing + Deploy to Vercel"** — and Phase 1.5 through Sprint 20 has been worked
- **Still no live URL.** Portfolio says `IN DEVELOPMENT`, case study password-protected

**The blunt read:** this thing is built. Sprints 19–25 (accessibility, offline, performance, error states, feedback) are polish on an MVP that has never been deployed. **The gap between this project's value and its current value is one deploy.** Everything else is secondary.

Do not start Sprint 26 (EWMA prediction) or anything in Phase 3–5. Those are roadmap, not work.

---

## Phase 1 — Verify, then deploy

1. Read `MASTERPLAN.md` (esp. Sprint 18), `CLAUDE.md` (it has a sprint protocol + manual-actions checklist — follow it), `PRD.md` §7 Technical Architecture and §12 UI Screens.
2. **Audit the `[x]` marks.** 199 checked tasks is a big claim. Run the app locally and verify the core loop works: map renders, geolocation broadcasts, zone aggregation edge function fires, occupancy blending produces sane numbers, heatmap renders, building cards open, floor breakdown works. Anything checked that doesn't work → `[~]` with a note.
3. **Establish the deploy blockers.** Walk Sprint 18's remaining sub-tasks and produce a concrete list: Supabase prod project state, env vars (incl. `VITE_VAPID_PUBLIC_KEY`), Mapbox token + URL restrictions, Google Places quota/billing, Edge Function deployment, seed data for the 18 buildings, Vercel project config.
4. **Check the privacy claim holds.** The one-liner promises *"GPS never leaves your device."* Trace what's actually broadcast to Supabase. If raw coordinates are transmitted at any point, that's either a code fix or a copy fix — flag it, don't quietly ship a false claim. This matters more than any feature.
5. **Check the data honesty.** "18 buildings" and any occupancy number must be real. Occupancy blended from Google Popular Times + sparse user broadcasts can be very wrong at low user counts. What does the UI show when there are zero users? Confidence indication is a correctness requirement, not polish.

## Phase 2 — Questions (AskUserQuestion)

- **Deploy now with current polish level, or finish Sprints 19/22/23 first?** (Strong recommendation: deploy now, polish live.)
- Domain: subdomain of brunojaamaa.dev, a custom domain, or a Vercel URL?
- Google Places + Mapbox are metered — is billing configured, and what's the monthly ceiling? Public deploy without quota caps is a real bill risk.
- Is this going in front of actual UniMelb students, or is it a portfolio demo? Determines whether seed-data accuracy (S24) and feedback (S25) matter now.
- Cold-start problem: a live occupancy app with no users shows nothing. Is there a plan (seeded predictions? honest empty states?), or does the demo need a populated-data mode?

## Phase 3 — Plan mode

Enter plan mode, then **update `MASTERPLAN.md` in place**:
- Correct any falsely-checked tasks
- Expand the remaining Sprint 18 tasks into a concrete deploy runbook with exact commands and env vars
- Re-order what's left: **deploy → error states (S23) → accessibility (S19) → performance (S22)** — the ones that matter for a public URL — and mark Phase 3–5 explicitly as `[⏭ roadmap, not scheduled]` so nobody mistakes 111 unchecked boxes for 111 things to do
- Add a "Post-launch" section: monitoring, quota alerts, what to do when the API bills spike

## Phase 4 — Build

Follow the existing `CLAUDE.md` sprint protocol. Plus **aethereum sync**: `share_intent` per sprint, `declare_contract` for the occupancy-blending and zone-aggregation interfaces, `record_decision` on deploy config choices, `ask_human` before anything that costs money or goes public, `record_verification` at gates. Mark tasks live in `MASTERPLAN.md`.

## The bar

A public URL where someone can open a map of UniMelb and see live occupancy — with honest confidence indicators when data is thin — and a portfolio case study that isn't password-protected. That's it. This project needs shipping, not building.

---

## Design language — DO NOT invent one, and do not ask Bruno to design

Bruno has a locked design system. Any UI you build or fix **inherits it**. Never ask him to make a design decision you can answer by reading this; never introduce a new palette, font, or motion language.

**Source of truth:** `~/bruno-portfolio/CLAUDE.md` → "Redesign Design Decisions (2026-07 · SIGNAL)". Read it before touching any visual surface.

**The system — "SIGNAL": a warm-black precision instrument.** Ryoji Ikeda data-minimalism × cassette-futurist hardware × subtle broadcast-CRT texture. It should *operate* like a beautiful old machine — directory listings, keyboard nav, instrument readouts — while staying clean and fast.

```
--bg:             #050505   warm black
--surface:        #0b0a09
--text-primary:   #f0ece4   warm white
--text-secondary: #98928a
--text-dim:       #55504a
--amber:          #ffb000   THE ONE ACCENT (phosphor)
--steel:          #2c2925   visible border
--hairline:       #1b1916   structural rules
```

**Rules, non-negotiable:**
- **Amber is used sparingly** — cursor, status dots, CTAs, focus brackets, key data. Everything else is grayscale on hairline steel.
- **No light theme.** No gradients. No shadows. No colour beyond amber.
- **Border-radius max 2px.** Effectively square.
- **Monospace for data, labels, readouts, ASCII.** Terminal/instrument voice throughout: `</section>` labels, `>` prompt prefixes, `[button →]` brackets, box-drawing `┌─┐│└┘`, loading bars `[████░░░] 72%`.
- **Motion:** ease-out or linear only. No bounce, no spring, nothing over 600ms. Scroll reveals are fade + 16px rise, 400ms, 60ms stagger.
- **No emoji in UI.** If the current code uses emoji as controls, replace them with monospace glyphs or labelled brackets.
- **A11y is a hard rule:** nothing flashes more than 3×/s, `prefers-reduced-motion` means static everything, body text is always real DOM.

If a surface currently looks unstyled or default-browser, that is a bug against this system — fix it by applying the system, not by inventing something new.

---

## MOTION.md is binding

This folder now contains `MOTION.md` — the full animation specification for this project (sequences, timings, per-surface rules, acceptance gates). Read it in Phase 1 alongside the other docs. Its acceptance checklist merges into the relevant sprint gates in the masterplan during Phase 3. Motion here is product behaviour, not polish — the spec is authored; do not invent a different animation language and do not ask Bruno to design one.

---

## ⛔ OWNER OVERRIDE (Aug 2026) — the masterplan's checkmarks are not true

Bruno's own words when asked whether to deploy: **"it is all fucked up, it's not wired up and it doesn't work."**

That overrides everything above that assumed 199 completed tasks. Operating consequences:

1. **Treat every `[x]` in MASTERPLAN.md as a claim, not a fact.** Phase 1 is now a forensic audit: run the app, walk the entire core loop (map → geolocation broadcast → zone aggregation edge function → occupancy blending → heatmap → building cards → floor breakdown → push), and build a WIRING-AUDIT.md table: feature → claimed status → observed status → what's actually missing (env var? edge function never deployed? component never mounted? API never called?).
2. Expect the classic failure shape: components exist and render, but the data plumbing between them — Supabase config, edge function deployment, realtime channel wiring, env vars — was never connected. "Built but not wired" is the hypothesis to verify feature by feature.
3. Re-mark MASTERPLAN.md honestly: `[x]` → `[~] built, not wired` or `[ ]` wherever observation disagrees. This correction pass is itself a sprint, and it comes before any new code.
4. Only after the audit: fix the wiring in dependency order (Supabase project + env → edge functions deployed → realtime channels → UI data paths), then deploy.
5. `record_decision` the audit findings so no future session trusts the old checkmarks again.

## Decisions locked + research corrections (Aug 2026)

- **iOS push reality (verified):** Web Push on iOS still requires the app to be installed to the Home Screen — no push from Safari tabs, unchanged through iOS 26. **Declarative Web Push** (Safari/iOS 18.4+) is the modern payload format and is backward-compatible; send declarative payloads and keep the service-worker path for Chrome/Firefox. iOS has **no programmatic install prompt** — the app needs an in-UI "Share → Add to Home Screen" instruction flow. On iOS 26 any site added to Home Screen opens standalone. Background sync still absent on iOS. Fold all of this into the push + PWA sprints when expanding the plan.
- Case-study unlock happens at the very end via the portfolio update — not from this repo.
