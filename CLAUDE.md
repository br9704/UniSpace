# CLAUDE.md — Pulse Development Agent Instructions

> This file is the operating contract for any Claude Code agent working on this repository.
> Read this file in full before taking any action.

---

## 1. Sources of Truth

There are two canonical documents in this project. They override everything else — including your own assumptions, prior context, or inline code comments.

| Document | Purpose |
|----------|---------|
| `PRD.md` | Product requirements, feature specs, data models, design system, privacy rules |
| `MASTERPLAN.md` | Sprint structure, task breakdown, implementation order, current status |

**If there is any ambiguity about what to build, check the PRD first.**  
**If there is any ambiguity about what to do next, check the MASTERPLAN.**  
**If neither document answers the question, stop and ask the user.**

---

## 2. Sprint Tracking Protocol (Critical)

After completing **every sprint or subsprint**, you MUST update `MASTERPLAN.md` to mark it as done before proceeding.

### Marking a Task Complete

Find the task in `MASTERPLAN.md` and change its status marker:

```markdown
<!-- BEFORE -->
- [ ] S1.1 — Set up Vite + React + TypeScript project

<!-- AFTER -->
- [x] S1.1 — Set up Vite + React + TypeScript project ✅ (completed March 2026)
```

### Rules
1. **Never skip the mark.** Even if the next task is obvious, mark the current one complete first.
2. **Mark subsprint components individually.** Don't mark a whole sprint done until every subsprint is checked.
3. **Add a brief note** after the checkmark if there's anything important about how the task was implemented (e.g. a deviation from the plan, a version choice made, a known limitation).
4. **If a task was skipped or deferred**, mark it with `⏭️ DEFERRED:` and explain why.
5. **If a task revealed new subtasks**, add them as nested items under the original task before continuing.

### Example of Good Sprint Tracking
```markdown
- [x] S2.1 — Supabase project setup ✅
  - [x] S2.1.1 — Create project, configure environment variables ✅
  - [x] S2.1.2 — Apply schema migrations ✅
  - [x] S2.1.3 — Seed campus + building data ✅ (seeded 7 UoM buildings)
  - [x] S2.1.4 — Verify RLS policies ✅
- [ ] S2.2 — Realtime channel setup (in progress)
```

---

## 3. Code Standards

### TypeScript
- Strict mode enabled — no `any` types without a comment explaining why
- All props explicitly typed with interfaces (not inline types for complex shapes)
- Enums for fixed value sets (occupancy trend, data quality, etc.)
- Zod for runtime validation of any external data (Supabase responses, Edge Function inputs)

### React
- Functional components only — no class components
- Custom hooks for all data-fetching logic (`useBuildings`, `useOccupancyRealtime`, etc.)
- Keep components under 150 lines — extract logic into hooks and utility functions
- Co-locate tests with components: `ComponentName.test.tsx` next to `ComponentName.tsx`

### File Structure
```
src/
  components/       # Reusable UI components
  hooks/            # Custom React hooks
  lib/              # Utilities, Supabase client, Mapbox helpers
  pages/            # Top-level route components
  types/            # Shared TypeScript types/interfaces
  stores/           # Zustand stores (if state management needed)
  constants/        # App constants (colours, defaults, etc.)
supabase/
  migrations/       # SQL migrations, numbered sequentially
  functions/        # Edge Functions (Deno)
  seed/             # Seed data scripts
```

### Naming Conventions
- Components: `PascalCase.tsx`
- Hooks: `useCamelCase.ts`
- Utilities: `camelCase.ts`
- Types: `PascalCase` (interfaces and types)
- Constants: `SCREAMING_SNAKE_CASE`
- Database tables: `snake_case`
- Supabase Edge Functions: `kebab-case`

### CSS / Tailwind
- Use Tailwind utility classes — no inline styles except for dynamic values (e.g. Mapbox layer paint properties)
- CSS custom properties defined in `index.css` for the design system tokens from the PRD
- Dark theme by default — no light mode switching required at this stage
- Responsive classes: mobile-first (`sm:`, `md:`, `lg:` breakpoints where needed)

### Commits
- Follow conventional commits: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`
- Each commit should be atomic — one logical change
- Reference the sprint task in the commit message when relevant: `feat(S3.2): implement zone aggregation Edge Function`
- **Commit and push after every completed sprint.** Do not move to the next sprint without committing and pushing the current one.
- **Update documentation before committing a sprint.** Before each sprint commit, update `README.md` (roadmap checkboxes, current status, any new setup steps or env vars) and `MASTERPLAN.md` (task checkmarks). Documentation must reflect the actual state of the project at every commit.

---

## 4. Privacy Rules — Non-Negotiable

These rules come from the PRD (Section 12) and must never be violated regardless of what seems convenient.

1. **Raw GPS coordinates must NEVER leave the client device.** Zone detection happens client-side using Turf.js. Only `zone_id` is broadcast.
2. **`session_id` is never written to any database table.** It is used only for in-memory counting in Edge Functions.
3. **`session_id` must rotate every 30 minutes.** Implement this in the Realtime broadcasting hook.
4. **No user accounts for core features.** Viewing the heatmap and getting recommendations must never require login.
5. **Do not add analytics libraries** (no Google Analytics, Hotjar, Mixpanel, etc.) without explicit instruction from the user.
6. **Position data expires after 30 minutes.** Edge Functions must enforce this.

If any implementation pressure tempts you to store raw coordinates "just temporarily" or "for debugging" — don't. Flag it to the user instead.

---

## 5. Performance Rules

- **Never block the main thread** for zone polygon calculation — use a Web Worker if Turf.js point-in-polygon becomes slow at scale
- **Debounce filter changes** — recommendations should recalculate no more than once per 300ms of user input
- **Memoize expensive computations** — `useCallback` and `useMemo` for recommendation scoring and sorted building lists
- **Lazy load** the Building Card component — it should not be in the initial JS bundle
- **Preload** the Mapbox style and building GeoJSON on app init so the map renders without a second network round-trip
- **Service Worker** must cache: app shell, building metadata, last occupancy snapshot. Stale-while-revalidate strategy.

---

## 6. What NOT to Do

- **Do not push code or open PRs** without explicit instruction from the user
- **Do not send emails** on behalf of the user
- **Do not modify `PRD.md`** unless the user explicitly asks you to update it
- **Do not skip writing types** to save time — type safety is non-negotiable
- **Do not install packages** that aren't in the PRD tech stack without checking with the user first
- **Do not hardcode** building data, API keys, or environment-specific values in source code
- **Do not proceed** to the next sprint if the current sprint has failing tests or broken functionality
- **NEVER touch existing Supabase projects.** The following projects are OFF LIMITS — do not read, write, modify, delete, or interact with them in any way:
  - **"jaamaabruno@gmail.coms project"**
  - **"speechmax"**
  - Only interact with the Supabase project created specifically for Pulse. If unsure which project is Pulse's, stop and ask the user.

---

## 7. Environment Variables

Never commit secrets. All environment variables go in `.env.local` (gitignored). The following are required:

```bash
# Supabase
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=

# Mapbox
VITE_MAPBOX_TOKEN=

# Web Push (server-side, Edge Functions only)
VAPID_PUBLIC_KEY=
VAPID_PRIVATE_KEY=
VAPID_EMAIL=
```

Document any new environment variables in `README.md` and `MASTERPLAN.md`.
---

## 8. Testing Expectations

- Unit tests for: all utility functions, hooks with complex logic, zone detection logic, recommendation scoring algorithm
- Integration tests for: Supabase Edge Functions (using Deno test runner)
- E2E tests (Phase 2+): critical user paths using Playwright — open app → view heatmap → tap building → get recommendation
- No test, no merge — every new utility function needs a corresponding test

---

## 9. When You're Stuck

If you encounter an ambiguity, a blocker, or a decision that isn't covered by the PRD or MASTERPLAN:

1. **Check the PRD.** It likely addresses it.
2. **Check the MASTERPLAN.** The sprint notes may have context.
3. **Check open questions** in Section 15 of the PRD — the question may already be logged.
4. **Stop and ask the user.** Do not guess on decisions that affect architecture, privacy, or product behaviour.

Never silently make a product decision. Log it.

---

## 10. Definition of Done (Per Sprint)

A sprint is done when **all** of the following are complete, **in this order:**

### Step 1: Code complete
- [ ] All code changes are committed with conventional commit messages
- [ ] All new functions and hooks have TypeScript types
- [ ] All new utility logic has unit tests (and tests pass)

### Step 2: Audit (run BEFORE updating docs)
- [ ] Run a full codebase audit (spawn an audit agent or perform manually):
  - `pnpm exec tsc -b` — zero TypeScript errors
  - `pnpm test` — all unit tests pass
  - `pnpm lint` — no ESLint errors
  - Check for files exceeding 150 lines (components only, not test/type files)
  - Check for `any` types without justification
  - Check for hardcoded secrets or API keys
  - Check for privacy violations (session_id stored, raw GPS leaving client)
  - Check for DB/TypeScript type mismatches (CHECK constraints vs union types)
  - Check for missing Zod validation on external data
- [ ] Fix any issues found by the audit before proceeding

### Step 3: Documentation update
- [ ] `MASTERPLAN.md` is updated with ✅ checkmarks for completed tasks
- [ ] `README.md` roadmap checkboxes updated, any new setup steps or env vars added
- [ ] Any new environment variables are documented in `.env.example`
- [ ] The feature is manually verifiable (you can describe the steps to test it)

### Step 4: Commit and push
- [ ] All changes (code + audit fixes + docs) committed and pushed to GitHub

### Step 5: Manual actions for Bruno
After every sprint, **list all manual actions Bruno needs to take**. These are things Claude cannot do automatically. Always include this section at the end of the sprint summary.

Common manual actions (include only those relevant to the sprint):

#### Supabase
- [ ] Deploy new/updated Edge Functions: `supabase functions deploy <function-name>`
- [ ] Set new Supabase secrets (dashboard → Edge Functions → Secrets): list each key
- [ ] Verify new migration was applied correctly (check tables in Supabase dashboard)
- [ ] Add Vercel/production domain to Supabase CORS allowed origins (if deploying)

#### Environment Variables
- [ ] Add new env vars to `.env.local` (list each with description)
- [ ] Add new env vars to Vercel dashboard (if deployed)

#### External Services
- [ ] Generate VAPID keys: `npx web-push generate-vapid-keys`
- [ ] Set up Vercel project + link GitHub repo
- [ ] Configure custom domain (if applicable)
- [ ] Set up pg_cron schedule for recurring Edge Functions (e.g., send-alerts every 2 min)

#### Testing
- [ ] Manual browser test on mobile (375px viewport)
- [ ] Test PWA install flow on iOS / Android
- [ ] Test push notification delivery (requires HTTPS / deployed environment)
- [ ] Verify GPS permission flow (grant + deny)

#### Assets
- [ ] Provide real building photos (CC-licensed WebP, drop into `public/photos/`)
- [ ] Provide real PWA icons (replace placeholders in `public/icons/`)
- [ ] Provide real UniMelb logo (replace `public/unimelb-logo.svg` if needed)

> **Claude must always generate this checklist at the end of every sprint**, including only the items relevant to that sprint. If a sprint has zero manual actions, state "No manual actions required."

---

*This file is maintained by Bruno Jaamaa. Do not modify without instruction.*
