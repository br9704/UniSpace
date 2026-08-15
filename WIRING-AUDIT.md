# WIRING-AUDIT.md — UniSpace (PULSE)

> Forensic audit performed 2026-08-14, per `ENGINEERPROMPT.md` § "OWNER OVERRIDE".
> Every `[x]` in `MASTERPLAN.md` was treated as a **claim**, not a fact.
> Method: static read of every source file, `tsc -b`, `vitest run`, `eslint .`, `vite build`,
> DNS + REST probes against the configured Supabase host, and inspection of the **built CSS output**.
>
> **Verdict: Bruno is right. The app does not work.** Not because features are missing —
> most are genuinely implemented — but because of **three independent, verifiable systemic failures**,
> any one of which alone renders the product non-functional.

---

> ## ⏱ Read this as a record, not a status page
>
> **Everything below describes the repository as it stood on 2026-08-14, before the recovery
> sprints.** It is deliberately preserved unedited — the point of a forensic audit is that it says
> what was true when it ran. Nothing here should be read as the current state of the project.
>
> Where each finding was resolved:
>
> | Finding | Resolved by |
> |---|---|
> | RC-1 — Supabase project deleted | **Closed as "won't do", 2026-08-15.** The backend is deliberately not being provisioned — a recurring cost on a portfolio project. The app runs on the committed fixture layer built in R2 and says so on screen. See `MASTERPLAN.md` § *Owner-Gated Ship Runbook* § 1, now parked, and the decision log |
> | RC-1a — migration `013` uncommitted | R1.6 — `013_data_verification_fixes.sql` is committed. The 12 Place IDs it originally held are **not** recovered and were not invented; 11 of 18 remain NULL |
> | RC-2 — Tailwind v4 against v3 syntax | R1.1 — `@import "tailwindcss"` + `@theme`; emitted utilities went 97 → 194 |
> | RC-3 — `pnpm build` fails | R1.3 — both `useWebPush` issues were real bugs, not type noise |
> | § 2 falsely-marked tasks | R0 correction pass, then re-observed in R5 |
> | § 3 honesty violations | R1.8, then recounted again in R2.7 — the curve rows are **1,156**, not the 1,321 computed here |
> | § 5 blockers B3–B10 | B3 in R1.3 · B4 in the Ship Runbook · B7 in R1.5 · B8 in S22 · B9 done 2026-08-14 |
> | § 6 design-system state | R3 — SIGNAL applied, light palette deleted |
>
> The current state of every one of these lives in `MASTERPLAN.md`, which is the source of truth for
> sequencing. This file is the source of truth only for what the audit measured.

---

## 1. The three root causes

### RC-1 — The Supabase project no longer exists (SEVERITY: FATAL)

> The ref below is a **deleted Supabase project**. It is published here because it is the evidence
> for the finding, and it is safe to publish: it resolves to nothing, grants nothing, and is not a
> credential. No project was ever provisioned to replace it — see the decision of 2026-08-15.

`.env.local` points at project ref `kvagntgpiylxhjntexml`.

```
dig +short kvagntgpiylxhjntexml.supabase.co   → (empty)
dig @8.8.8.8 +short kvagntgpiylxhjntexml.supabase.co → (empty)
dig @1.1.1.1 +short kvagntgpiylxhjntexml.supabase.co → (empty)
dig @8.8.8.8 +short supabase.co               → 76.76.21.21   (control: resolves fine)
curl https://kvagntgpiylxhjntexml.supabase.co/rest/v1/ → Could not resolve host
```

Three independent resolvers return NXDOMAIN while `supabase.co` itself resolves. A *paused*
Supabase project still resolves DNS. A non-resolving ref means **the project was deleted**.

**Consequence:** there is no database, no seeded buildings, no zones, no Realtime, and no
deployed Edge Functions. `useBuildings()` fails → `MapPage` renders its error branch
(`"Failed to load buildings"`); `HomePage` renders skeletons forever. Every data-driven
feature is dead at the root. This alone accounts for "it's not wired up and it doesn't work."

**Collateral:** all schema/seed work applied *directly to the cloud DB* rather than committed
as migrations is **permanently lost** — see RC-1a.

### RC-1a — Migration `013` was never committed and is now unrecoverable

`supabase/migrations/` jumps `012 → 014`. `MASTERPLAN.md` S17.3 / S17.5 claim:

> "Verify Google Place IDs return valid results ✅ (filled 12 missing Place IDs via migration 013)"
> "Update seed script with refined data ✅ (migration 013_data_verification_fixes applied)"

No such file exists anywhere in the repo (`grep -rn "013_" supabase/ src/` → no matches).
That work was applied to the now-deleted database and never version-controlled. **The 12
verified Google Place IDs are gone** and must be re-sourced.

### RC-2 — Tailwind is installed at v4 but configured for v3; most utility classes emit no CSS (SEVERITY: FATAL to the UI)

`package.json` has `tailwindcss@^4.2.2`. `src/index.css` line 3–5 uses **v3 syntax**:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

In Tailwind v4 the entry point is `@import "tailwindcss"`, and a JS config
(`tailwind.config.ts`) is only loaded when explicitly referenced via `@config`.
Neither is present. The result: **the theme scale is never loaded**, so every utility whose
value comes from the theme is silently dropped at build time.

Measured against the actual build output (`dist/assets/index-OqWQTuYB.css`, 51 KB):

| Probe | In built CSS |
|---|---|
| `.flex` `.absolute` `.w-full` `.rounded-full` `.truncate` (static, no theme value) | **FOUND** |
| `.text-[var(…)]` `.bg-[…]` (arbitrary values, self-contained) | **FOUND** |
| `.p-4` `.px-4` `.gap-2` `.mb-1` (spacing scale) | **MISSING** |
| `.text-sm` (font-size scale) | **MISSING** |
| `.font-semibold` (font-weight scale) | **MISSING** |
| `.rounded-lg` (radius scale) | **MISSING** |

Only **53 non-Mapbox utility classes** are emitted in the entire application (the other 44 of
97 are vendored `.mapboxgl-*` rules). `gap-2` is used in 5 components and produces nothing.

**Consequence:** the app is a patchwork. Components written with inline `style={{…}}` look
styled; components written with Tailwind classes render with **no padding, no type scale, no
weights, no radii**. This is precisely the "surface looks unstyled or default-browser" symptom
`ENGINEERPROMPT.md` warns about, and it is a build-configuration bug, not a design problem.

### RC-3 — The build is broken: `pnpm build` cannot complete (SEVERITY: FATAL to deploy)

`build` is `tsc -b && vite build`. `tsc -b` fails with **4 errors**:

```
src/hooks/useWebPush.ts(26,25)  TS2352  PushSubscriptionJSON cast — keys incompatible
src/hooks/useWebPush.ts(44,7)   TS2322  Uint8Array<ArrayBufferLike> not assignable to BufferSource
src/hooks/useWebPush.ts(47,18)  TS2352  PushSubscriptionJSON cast — keys incompatible
src/pages/HomePage.tsx(21,1)    TS6133  'getLatestUpdate' declared but never read
```

Vercel runs the `build` script. **The project cannot deploy today**, independent of RC-1 and RC-2.
(`vite build` *alone* succeeds — which is how `dist/` came to exist and why this went unnoticed.)

---

## 2. Falsely-marked tasks (`[x]` that observation contradicts)

| Task | Claim in MASTERPLAN | Observed | Correct mark |
|---|---|---|---|
| S18.1 | "Run full TypeScript type check ✅ (0 errors)" | **4 errors** (`tsc -b`) | `[ ]` |
| S18.2 | "Run ESLint ✅ (0 new errors)" | **10 errors** (`eslint .`) | `[ ]` |
| S12.1 | "Dark theme CSS custom properties in index.css ✅" | No `[data-theme]` block exists. `:root` is **light** (`--color-bg-primary: #FFFFFF`). `useTheme.ts` actively *strips* stale `data-theme` attributes — dark mode was removed. | `[ ]` |
| S12.3–S12.5 | useTheme / ThemeToggle / map dark-style switching ✅ | Vestigial. No dark theme to switch to. | `[ ]` |
| S12.18 | "Final color audit sweep ✅ — no hardcoded hex (grep clean)" | **169 hardcoded hex literals across 17 files** | `[ ]` |
| S12 gate | "All components under 150 lines" | HomePage 400, BuildingCard 297, FindPanel 224, MapPage 196 | fails |
| S17.3 | "Verified Place IDs ✅ (migration 013)" | Migration 013 does not exist; DB deleted | `[ ]` |
| S17.5 | "Update seed script ✅ (migration 013 applied)" | Same | `[ ]` |
| S10.1 | "FindPage.tsx with full implementation ✅" | `FindPage.tsx` does not exist. Superseded by `FindPanel.tsx` inside `MapPage` (commit `daf18af`). Plan never updated; PRD `/find` route does not exist. | `[~]` re-spec |
| S2.1 | "sync-google-popularity ✅ (deployed to Supabase)" | Deployment target deleted | `[~]` code only |
| S5.1 | "aggregate-occupancy ✅ (v2 deployed)" | Deployment target deleted | `[~]` code only |
| S20.* | Push notifications shipped | Edge Functions undeployable; `VITE_VAPID_PUBLIC_KEY` **absent from `.env.local`** despite being required by `useWebPush` | `[~]` code only |

## 3. Honesty-rule violations (numbers no committed artifact backs)

`CLAUDE.md` → *"Never state a number in a README, the site, or any public copy that a committed artifact cannot back."*

| Claim | Where | Committed reality |
|---|---|---|
| "1,453 rows" of Google Popular Times | `README.md:224` | `002_google_popular_times.sql` = **335** rows + `004_additional_popular_times.sql` = **986** rows = **1,321** |
| "1,252 rows" | `MASTERPLAN.md` S7.extra | Same — **1,321** |
| "18 buildings" | README, MASTERPLAN | **Backed.** `buildingMeta.ts` has exactly 18 slugs. But `003_additional_buildings.sql` still seeds `brownless-*`, which S7 says was removed — seed and meta disagree. |

## 4. What genuinely works (verified, do not re-do)

- **The privacy claim holds.** Traced end to end:
  - `src/lib/zoneDetection.ts` — pure function, no side effects, takes lat/lng, returns only a zone-id string.
  - `src/hooks/usePositionBroadcast.ts` — signature accepts **only** `zoneId`; structurally cannot carry coordinates. Body sent is `{ zone_id, session_id }`.
  - `src/lib/sessionId.ts` — module-scoped, never persisted to storage, rotates every 30 min.
  - `supabase/functions/aggregate-occupancy/index.ts` — `session_id` appears **only** in an in-memory `Map`; the two DB writes (`zone_occupancy` upsert, `occupancy_history` insert) do not include it.
  - **"GPS never leaves your device" is accurate as written.** No copy change needed.
  - *Deviation to record:* PRD § 7.2 specifies broadcasting over a Realtime channel; the implementation POSTs to the Edge Function instead. Functionally equivalent and arguably better — but the PRD/masterplan were never updated.
- **140 unit tests pass**, 14 files. Test suite is real.
- **React-level data plumbing is genuinely wired.** `MapPage.tsx` correctly composes `useBuildings` → `useZones` → `useGeolocation` → `detectZone` → `usePositionBroadcast` → `useBlendedOccupancy` → `Map` → `BuildingCard`. The "built but never mounted" hypothesis is **wrong** — the wiring exists; the backend beneath it is gone.
- `vite build` succeeds; PWA service worker generates (15 precache entries).

## 5. Additional deploy blockers found

| # | Blocker |
|---|---|
| B1 | Supabase project must be recreated from scratch (RC-1); all 13 migrations + 4 seed files re-applied; Edge Functions re-deployed; `pg_cron` schedules re-created. |
| B2 | Migration 013 must be **rewritten** — 12 Google Place IDs re-sourced (RC-1a). |
| B3 | `tsc` errors must be fixed or Vercel build fails (RC-3). |
| B4 | `VITE_VAPID_PUBLIC_KEY` is in `.env.example` but **missing from `.env.local`** — push subscribe silently fails. |
| B5 | `GOOGLE_PLACES_API_KEY` never set; Places billing state unknown. Public deploy without a quota cap is an uncapped bill. |
| B6 | Mapbox token has no URL restriction — a public deploy leaks a usable token. |
| B7 | `src/lib/supabase.ts` **throws at module load** if env vars are absent → white screen, no error UI, on any misconfigured deploy. |
| B8 | Main JS bundle **2,275 KB (637 KB gzip)**. PRD § 10.1 targets LCP < 2.5 s on 4G. Not achievable. Mapbox + Recharts + Turf are all in the entry chunk. ⚠️ **Unresolved discrepancy (flagged 2026-08-15):** two other committed artifacts — `src/lib/bundleBudget.test.ts` and `MASTERPLAN.md` S22.1 — both record the pre-split entry as **2,375 KB**. The gzip figure agrees at 637 KB in all three. One of the raw figures is a transcription error and the original build output no longer exists to settle it. |
| B9 | No Vercel project linked. `vercel.json` exists and is correct for a Vite SPA. |
| B10 | Docker is **not installed**, so `supabase start` (local stack) is unavailable — there is no local database fallback. |

## 6. Design-system state

`ENGINEERPROMPT.md` locks the app to Bruno's **SIGNAL** system (warm black `#050505`, single amber
accent `#ffb000`, ≤2px radius, monospace instrument voice, no light theme) — source of truth
`~/bruno-portfolio/CLAUDE.md` § "Redesign Design Decisions (2026-07 · SIGNAL)". `MOTION.md` is
binding on animation.

The app currently implements **neither** SIGNAL **nor** the PRD § 11 UoM navy/gold dark system.
It is a **light theme** (`--color-bg-primary: #FFFFFF`, slate greys, UoM navy accents) that was
added in S12 and then had its dark mode deleted. Combined with RC-2, the visual layer needs a
full re-skin to SIGNAL, not a touch-up.

*(This is a documented conflict: PRD § 11 specifies UoM navy/gold. ENGINEERPROMPT + Bruno's
direct instruction supersede it. Recorded as a decision, not raised as a question.)*

---

## 7. Bottom line

199 `[x]` marks overstated reality, but not in the way expected. The **components are real and
the wiring between them is real**. What failed is everything underneath and around them:

1. the database was deleted,
2. the CSS framework silently stopped emitting most of its output,
3. the build has not compiled since Sprint 20.

None of these are feature work. All three are recoverable. The correction pass and the fixes
for RC-2 and RC-3 are pure code and can proceed immediately; RC-1 is owner-gated and is
deferred to the end of the plan per Bruno's instruction.
