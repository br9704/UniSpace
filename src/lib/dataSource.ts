import { isSupabaseConfigured } from '@/lib/supabaseConfig'
import { getFixtureRows, subscribeToFixtureTable } from '@/lib/fixtures'
import { TABLE_SCHEMAS, describeIssue } from '@/lib/schemas'

/** Tables the client reads directly. Writes always go through Edge Functions. */
export type ReadableTable =
  | 'buildings'
  | 'building_zones'
  | 'zone_occupancy'
  | 'google_popularity_cache'
  | 'google_popular_times'
  | 'occupancy_predictions'
  | 'occupancy_reports'
  | 'rooms'

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
 * Validate a batch of rows against the table's schema.
 *
 * A schema mismatch fails the whole read rather than dropping the offending
 * rows, for the same reason `fetchAllPages` refuses partial pages: a map
 * missing the buildings whose shape changed reads as "these buildings are
 * empty", which is a wrong answer presented confidently. An error reads as an
 * error. It is also not transient — a renamed column fails identically on every
 * retry — so `isTransient` deliberately does not match this message.
 *
 * Applied to fixtures as well as to Supabase. The fixtures are generated from
 * the committed seed SQL, so validating them is what keeps the generator, the
 * seeds and the types from drifting apart unnoticed.
 */
function validateRows<T>(table: ReadableTable, rows: unknown[]): QueryResult<T> {
  const schema = TABLE_SCHEMAS[table]
  const validated: T[] = []

  for (let i = 0; i < rows.length; i++) {
    const result = schema.safeParse(rows[i])
    if (!result.success) {
      return {
        data: [],
        error: `Unexpected shape in "${table}" row ${i} — ${describeIssue(result.error)}. `
          + 'The database schema and this build disagree.',
      }
    }
    validated.push(result.data as T)
  }

  return { data: validated, error: null }
}

/**
 * Read every row of a table.
 *
 * Pages until the server returns a short page, rather than requesting a fixed
 * number of pages. `google_popular_times` holds 1,156 rows today and the hook
 * that read it asked for exactly two pages — correct now, silently truncating
 * the moment a campus is added.
 */
export async function fetchRows<T>(
  table: ReadableTable,
  options: { unexpiredOnly?: boolean } = {},
): Promise<QueryResult<T>> {
  if (isFixtureMode) {
    return validateRows<T>(table, getFixtureRows<unknown>(table, options))
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
  // Loaded here rather than at module scope so the 42 KB client never reaches
  // users running on fixtures — which, with no backend provisioned, is all of
  // them. Guarded by isSupabaseConfigured above, so this only runs when there
  // is genuinely something to connect to.
  const { supabase } = await import('@/lib/supabase')
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

    const batch = data ?? []
    const validated = validateRows<T>(table, batch)
    if (validated.error) return validated

    rows.push(...validated.data)
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
  const schema = TABLE_SCHEMAS[table]

  /**
   * Forward a row only if it matches the schema.
   *
   * A malformed update is dropped rather than failing the subscription: the
   * last known-good value stays on screen with its existing freshness
   * treatment, which is a true statement about stale data. Applying the row
   * would put a wrong number on screen with a live timestamp attached to it.
   */
  const forwardValidRow = (row: unknown) => {
    const result = schema.safeParse(row)
    if (!result.success) {
      console.error(
        `Dropped a realtime "${table}" row — ${describeIssue(result.error)}. `
        + 'Showing the last known-good value instead.',
      )
      return
    }
    onChange(result.data as T)
  }

  if (isFixtureMode) {
    return subscribeToFixtureTable<unknown>(table, forwardValidRow)
  }

  // Subscribing is synchronous to callers but the client now arrives
  // asynchronously, so the teardown has to cope with being called before the
  // channel exists — a component that mounts and unmounts inside one tick must
  // not leak a subscription.
  let cancelled = false
  let teardown: (() => void) | null = null

  void (async () => {
    const { supabase } = await import('@/lib/supabase')
    if (cancelled) return

    const channel = supabase
      .channel(`${table}-realtime`)
      .on(
        'postgres_changes',
        { event, schema: 'public', table },
        (payload) => forwardValidRow(payload.new),
      )
      .subscribe()

    teardown = () => { supabase.removeChannel(channel) }
  })()

  return () => {
    cancelled = true
    teardown?.()
  }
}
