import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { getFixtureRows, subscribeToFixtureTable } from '@/lib/fixtures'

/** Tables the client reads directly. Writes always go through Edge Functions. */
export type ReadableTable =
  | 'buildings'
  | 'building_zones'
  | 'zone_occupancy'
  | 'google_popularity_cache'
  | 'google_popular_times'
  | 'occupancy_predictions'
  | 'occupancy_reports'

export interface QueryResult<T> {
  data: T[]
  error: string | null
}

/**
 * Whether the app is reading from local fixtures instead of Supabase.
 *
 * Fixtures exist so the whole app can be developed and verified with no
 * backend at all — the Supabase project was deleted, and provisioning a new one
 * is owner-gated work deliberately held until the end. They are derived from the
 * committed seed SQL (see scripts/generateFixtures.mjs), so what you see locally
 * is what the database will contain.
 *
 * On by default whenever Supabase has no credentials, so a fresh clone runs
 * without any setup. `VITE_USE_FIXTURES` forces it either way.
 */
export const isFixtureMode: boolean = (() => {
  const flag = import.meta.env.VITE_USE_FIXTURES
  if (flag === 'true') return true
  if (flag === 'false') return false
  return !isSupabaseConfigured
})()

/** PostgREST caps a single response at 1000 rows. */
const PAGE_SIZE = 1000

/** Retry schedule for transient failures, in milliseconds. */
const RETRY_DELAYS_MS = [400, 1200]

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Whether a failure is worth retrying.
 *
 * Network blips and 5xx responses are transient and usually resolve on a second
 * attempt. A 400 or a permissions error will fail identically every time, and
 * retrying it just delays the error the user needs to see.
 */
function isTransient(message: string): boolean {
  return /network|fetch|timeout|502|503|504|econn/i.test(message)
}

/**
 * Read every row of a table.
 *
 * Pages until the server returns a short page, rather than requesting a fixed
 * number of pages. `google_popular_times` holds 1,172 rows today and the hook
 * that read it asked for exactly two pages — correct now, silently truncating
 * the moment a campus is added.
 */
export async function fetchRows<T>(
  table: ReadableTable,
  options: { unexpiredOnly?: boolean } = {},
): Promise<QueryResult<T>> {
  if (isFixtureMode) {
    return { data: getFixtureRows<T>(table, options), error: null }
  }

  let result = await fetchAllPages<T>(table, options)

  // Retry transient failures with backoff. A dropped connection on a train
  // platform is the normal case for this app, not the exceptional one.
  for (const delay of RETRY_DELAYS_MS) {
    if (!result.error || !isTransient(result.error)) break
    await sleep(delay)
    result = await fetchAllPages<T>(table, options)
  }

  return result
}

async function fetchAllPages<T>(
  table: ReadableTable,
  options: { unexpiredOnly?: boolean },
): Promise<QueryResult<T>> {
  const rows: T[] = []

  for (let page = 0; ; page++) {
    let query = supabase
      .from(table)
      .select('*')
      .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1)

    if (options.unexpiredOnly) {
      query = query.gt('expires_at', new Date().toISOString())
    }

    const { data, error } = await query
    if (error) {
      // Partial results are worse than none: a half-loaded occupancy map reads
      // as "these buildings are empty" rather than "this failed".
      return { data: [], error: error.message }
    }

    const batch = (data ?? []) as T[]
    rows.push(...batch)
    if (batch.length < PAGE_SIZE) break
  }

  return { data: rows, error: null }
}

/**
 * Subscribe to row changes on a table.
 *
 * @returns an unsubscribe function.
 */
export function subscribeRows<T>(
  table: ReadableTable,
  event: 'INSERT' | 'UPDATE' | '*',
  onChange: (row: T) => void,
): () => void {
  if (isFixtureMode) {
    return subscribeToFixtureTable<T>(table, onChange)
  }

  const channel = supabase
    .channel(`${table}-realtime`)
    .on(
      'postgres_changes',
      { event, schema: 'public', table },
      (payload) => onChange(payload.new as T),
    )
    .subscribe()

  return () => { supabase.removeChannel(channel) }
}
