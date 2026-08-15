# MOTION.md — UNISPACE
# The animation specification. Read with `CLAUDE.md` and `MASTERPLAN.md`; binding, not decorative.

> UniSpace's product is **live data you trust at a glance**. Every animation exists to say one of three things: "this is live", "this just changed", or "this is how sure we are". Anything that says something else gets cut.

---

## Inherited system (do not deviate)

Ease-out/linear only · nothing over 600ms · scroll reveal = fade + 16px up, 400ms, 60ms stagger · terminal loaders `[████░░] 72%` · typing 40ms/char + 500ms blink · status pulse opacity .3→1→.3 at 2s · monochrome, **green only for live/positive state** · no spinners, ever.
**A11y:** nothing >3 flashes/s · `prefers-reduced-motion` = fully static · animated values always readable as text.

---

## The signature motif: breathing occupancy

The heatmap is the product. **Occupancy zones breathe** — a slow opacity oscillation (±8% around their value, 4s ease-in-out loop) that says *live* without saying *changing*. Rules:

- Breathing is subtle enough that a screenshot looks identical to any frame. If a recording looks like blinking, the amplitude is wrong.
- When a zone's value actually changes, breathing pauses, the zone cross-fades to its new intensity over 400ms linear, then resumes. **Change must read differently from liveness.**
- Reduced-motion: no breathing; a small green `● LIVE` dot with the 2s pulse carries liveness instead — and under reduced-motion, even that dot is static.

## Numbers count, they don't jump

Every occupancy figure, percentage, and "N people here now" animates by counting in integer steps over ≤400ms, monospace tabular figures so width never jitters. On first load, counts rise from 0 as part of the reveal. On update, they count from old→new. A number that teleports reads as a glitch; a number that counts reads as measurement.

## Confidence is a visual state, not a footnote

Blended occupancy (modelled weekly estimates + crowd reports + live broadcasts) varies wildly in trustworthiness. Motion encodes it:

> **Corrected 2026-08-14.** This section originally said "Google Popular Times". There is no Google
> occupancy tier: Google's public API does not expose busyness, and the weekly curves are this
> project's own hand-authored estimates. Google Places is used for opening hours only. See
> `MASTERPLAN.md` § Architecture Decisions Log, 2026-08-14.

| Confidence | Treatment |
|---|---|
| High (live broadcasts present) | Full-intensity zone, breathing on, green `● LIVE` dot |
| Medium (modelled estimate only) | 70% intensity, no breathing, label `~ estimated`, no green |
| Low / stale | 40% intensity, dashed border on the card, `> last seen 24m ago` in dim text |

**The cold-start screen is a first-class design.** Zero users must not look broken: zones render at medium-confidence treatment with `~ estimated from historical patterns` typed once under the map title, 40ms/char. *(As shipped in R4.12 the line reads `~ estimated from typical campus patterns` — "historical" implied a record of this campus that does not exist.)*

## Per-surface

**Map load (S3/S7)** — Building markers drop with 40ms stagger, scale .85→1, 250ms, capped at 20 staggered then instant. Heatmap fades in 400ms linear *after* markers land. Never both at once — layered arrival reads as system coming online. *(Deferred in R4.5: the map draws building polygons, not markers, so there is nothing to drop. The layered-arrival intent is met by the fill cross-fading in over an already-drawn basemap. Revisit if markers are ever added.)*

**Building card (S8)** — Opens as a sheet, 280ms ease-out. Occupancy bar fills 0→value over 500ms with count-up in sync. Floor rows (S9) reveal with 60ms stagger. Trend sparkline draws left→right over 600ms linear, once, on first open only.

**Recommendations (S10)** — "Quietest right now" card enters with the standard reveal; its rank number counts. When rankings reorder on data change, cards translate to their new positions over 400ms ease-out — never disappear/reappear. FLIP technique; measure, don't guess.

**Manual crowd report (S13)** — On submit, the button becomes a 12-char terminal loader filling ~600ms, then `> thanks — updating...`, then the local zone cross-fades to its new value so the user *sees their own report land*. That closes the contribution loop and is the single most important piece of motion in the app for retention.

**Push notification opt-in (S20)** — The prompt slides up only after a user has viewed the same building twice (no motion can rescue a premature permission ask). Toasts slide down 200ms, hold 4s, slide up. Never stack more than one.

**Offline (S21)** — Banner slides down once and stays static. Cached data gets the low-confidence treatment automatically. On reconnect: banner slides up, zones cross-fade to fresh values in one coordinated 400ms pass — the "coming back to life" moment; make it deliberate, not piecemeal.

**Skeletons** — 1.6s pulse, shaped exactly like the content they replace. Skeleton→content is a 200ms cross-fade, no layout shift (reserve heights).

## Rules that will otherwise be broken

- The heatmap never *animates attention toward busy-ness* — this app sells quiet, not crowds. No pings on "busiest".
- No animation on data the user is mid-reading: if a card is open, its numbers update by count, but the map beneath does not reflow until the card closes.
- Realtime updates are batched to at most one visual pass per 5s. Sub-second heatmap flicker reads as broken, not live.
- Every animated state has a static screenshot-safe frame (the case study needs stills).

## Acceptance (add to the deploy gate)

- [ ] Breathing invisible in any single frame; visible over 4s of recording
- [ ] Change vs liveness visually distinct in a recording, verified
- [ ] All three confidence tiers distinguishable in a screenshot
- [ ] Cold-start (0 users) screen recorded and looks intentional
- [ ] Manual-report loop (submit → see your zone update) recorded end to end
- [ ] `prefers-reduced-motion` full pass: static everything, no information lost
- [ ] No layout shift on skeleton→content anywhere (CLS ≈ 0)
