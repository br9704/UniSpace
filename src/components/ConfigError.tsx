interface ConfigErrorProps {
  /** What is missing, and where to set it. */
  detail: string | null
}

/**
 * Shown when the app cannot reach its backend because it was never configured.
 *
 * This is a build/deploy mistake, not a user-facing one, so it names the exact
 * variables rather than apologising vaguely — whoever sees it is the person who
 * can fix it. Replaces the blank page described in WIRING-AUDIT.md B7.
 */
export default function ConfigError({ detail }: ConfigErrorProps) {
  return (
    <div
      role="alert"
      className="h-full w-full flex items-center justify-center p-6 text-center"
      style={{ backgroundColor: 'var(--color-bg-primary)' }}
    >
      <div className="max-w-md">
        <p
          className="text-xs uppercase tracking-widest mb-3"
          style={{ color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-mono)' }}
        >
          Configuration error
        </p>
        <h1 className="text-xl font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>
          UniSpace can&rsquo;t reach its data
        </h1>
        {detail && (
          <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
            {detail}
          </p>
        )}
        <p className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
          The map, occupancy and recommendations all read from Supabase, so none of them can load
          until this is set.
        </p>
      </div>
    </div>
  )
}
