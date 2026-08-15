import { createClient } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_ANON_KEY, supabaseConfigError } from '@/lib/supabaseConfig'

/**
 * The Supabase client.
 *
 * **Import this module dynamically**, never at the top level. It pulls in
 * `@supabase/supabase-js`, which is 42 KB gzipped and lands in whichever chunk
 * references it. This app ships with no backend provisioned and reads committed
 * fixtures instead, so for every current user that is 42 KB of a database
 * client they will never open a connection with.
 *
 * Ask `isSupabaseConfigured` from `@/lib/supabaseConfig` first — it is free —
 * and `await import('@/lib/supabase')` only once the answer is yes.
 */

if (supabaseConfigError) {
  console.error(`[UniSpace] Supabase is not configured. ${supabaseConfigError}`)
}

/**
 * Always a real client, so no call site needs a null check.
 *
 * When unconfigured it points at an unresolvable host: requests reject, and the
 * hooks' existing error paths surface that as a normal failure state instead of
 * a crash. Callers that want to distinguish "misconfigured" from "offline"
 * should read `isSupabaseConfigured`.
 */
export const supabase = createClient(
  SUPABASE_URL || 'https://unconfigured.invalid',
  SUPABASE_ANON_KEY || 'unconfigured',
)
