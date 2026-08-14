import { describe, it, expect } from 'vitest'
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { gzipSync } from 'node:zlib'
import { resolve } from 'node:path'

/**
 * Budget for what the landing route actually downloads.
 *
 * PRD § 10.1 targets LCP under 2.5s on 4G and under 4s on 3G, for a user
 * described in § 3.1 as checking their phone on a train. The entry bundle was
 * 2,375 KB (637 KB gzip) because Mapbox, Recharts and everything else sat in
 * it — unachievable on any mobile connection.
 *
 * The budgets below are set just above current measurements. They are meant to
 * catch a regression, not to be aspirational: if a change needs more, that
 * should be a deliberate decision recorded here rather than a number that
 * quietly drifts upward.
 *
 * Reads the build output rather than guessing, so it only runs after
 * `pnpm build`. The sprint gate runs build before test.
 */

const ASSETS = resolve(__dirname, '../../dist/assets')

/** Gzip, because that is what crosses the wire. */
const BUDGETS_KB = {
  /** Everything the browser must fetch before the home screen can render. */
  landingRouteGzip: 210,
  /** Mapbox. Irreducible, but it must stay off the landing route. */
  mapboxChunkGzip: 500,
}

interface Chunk {
  name: string
  gzipKb: number
}

function chunks(): Chunk[] {
  return readdirSync(ASSETS)
    .filter((f) => f.endsWith('.js'))
    .map((f) => ({
      name: f,
      gzipKb: gzipSync(readFileSync(resolve(ASSETS, f))).length / 1024,
    }))
}

/** Chunks the entry statically imports, plus the entry itself. */
function landingRoute(all: Chunk[]): Chunk[] {
  const entry = all.find((c) => c.name.startsWith('index-'))!
  const code = readFileSync(resolve(ASSETS, entry.name), 'utf8')
  const staticImports = new Set(
    [...code.matchAll(/from\s*["']\.\/([\w-]+-[\w]+\.js)["']/g)].map((m) => m[1]),
  )
  return [entry, ...all.filter((c) => staticImports.has(c.name))]
}

const built = existsSync(ASSETS) && statSync(ASSETS).isDirectory()

describe.skipIf(!built)('bundle budget', () => {
  it('keeps the landing route within budget', () => {
    const route = landingRoute(chunks())
    const total = route.reduce((sum, c) => sum + c.gzipKb, 0)

    expect(
      Math.round(total),
      `Landing route is ${total.toFixed(0)} KB gzip across ` +
        `${route.map((c) => `${c.name} (${c.gzipKb.toFixed(0)}KB)`).join(', ')}. ` +
        'Budget is a deliberate limit — raise it here with a reason, or move the ' +
        'weight behind a dynamic import.',
    ).toBeLessThanOrEqual(BUDGETS_KB.landingRouteGzip)
  })

  it('keeps Mapbox off the landing route', () => {
    // The single most important split in this app: 452 KB gzip that the home
    // screen never renders.
    const route = landingRoute(chunks())
    expect(route.map((c) => c.name).filter((n) => n.startsWith('mapbox'))).toEqual([])
  })

  it('keeps the charts off the landing route', () => {
    // Recharts is only reachable through the lazily-loaded building card.
    const route = landingRoute(chunks())
    const withCharts = route.filter((c) =>
      readFileSync(resolve(ASSETS, c.name), 'utf8').includes('recharts'))
    expect(withCharts.map((c) => c.name)).toEqual([])
  })

  it('keeps Mapbox in a single cacheable chunk', () => {
    // It changes a few times a year; splitting it across route chunks would
    // mean re-downloading it on every app deploy.
    const mapbox = chunks().filter((c) => c.name.startsWith('mapbox'))
    expect(mapbox).toHaveLength(1)
    expect(mapbox[0].gzipKb).toBeLessThanOrEqual(BUDGETS_KB.mapboxChunkGzip)
  })
})
