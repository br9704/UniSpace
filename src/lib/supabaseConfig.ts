/**
 * Supabase configuration, with no client attached.
 *
 * Split out from `supabase.ts` so that asking *whether* a backend exists does
 * not drag in `@supabase/supabase-js` — 42 KB gzipped, on the landing route, for
 * an app that ships with no backend provisioned and runs entirely on committed
 * fixtures. Every consumer of `isSupabaseConfigured` imports this; only code
 * that genuinely talks to a database imports the client, and it does so with a
 * dynamic `import()` so the chunk never loads unless credentials are present.
 */

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const SUPABASE_URL: string | undefined = supabaseUrl
export const SUPABASE_ANON_KEY: string | undefined = supabaseAnonKey

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
