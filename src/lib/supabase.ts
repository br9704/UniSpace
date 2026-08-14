import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

/**
 * Whether the app has usable Supabase credentials.
 *
 * This module used to `throw` at import time when the vars were absent. Because
 * it sits at the root of nearly every hook's import graph, that took the whole
 * bundle down before React mounted — a blank white page with nothing in the UI
 * to explain it. A misconfigured deploy is a likely, recoverable situation, so
 * it has to be reportable rather than fatal. See WIRING-AUDIT.md B7.
 */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

/** Human-readable reason the client is unusable, or null when it is fine. */
export const supabaseConfigError: string | null = isSupabaseConfigured
  ? null
  : `Missing ${[
      !supabaseUrl && 'VITE_SUPABASE_URL',
      !supabaseAnonKey && 'VITE_SUPABASE_ANON_KEY',
    ]
      .filter(Boolean)
      .join(' and ')}. Set them in .env.local (local) or the Vercel project settings (deployed).`

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
  supabaseUrl || 'https://unconfigured.invalid',
  supabaseAnonKey || 'unconfigured',
)
