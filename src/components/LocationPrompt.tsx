import { useState } from 'react'

interface LocationPromptProps {
  /** True once the browser has told us permission was refused. */
  denied: boolean
}

/**
 * Explains what location is for, and what happens without it.
 *
 * PRD § 12.7. Two things this deliberately does *not* do:
 *
 * It does not block the app. Browsing without GPS is a first-class path — you
 * lose walking times and you stop contributing to the live count, and that is
 * all. Gating a public-good map behind a permission prompt would be both
 * hostile and unnecessary.
 *
 * And it does not ask before explaining. The single biggest cause of a
 * permanently denied permission is a prompt that arrives before the user knows
 * why, so the reason comes first and the request is theirs to make.
 */
export default function LocationPrompt({ denied }: LocationPromptProps) {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null

  return (
    <div
      className="absolute left-3 right-3 z-40"
      style={{ bottom: 12, maxWidth: 420, marginInline: 'auto' }}
    >
      <div
        className="p-4"
        style={{
          backgroundColor: 'var(--color-bg)',
          border: '1px solid var(--color-steel)',
          borderRadius: 'var(--radius-md)',
        }}
      >
        <p className="mono text-xs" style={{ color: 'var(--color-text-primary)' }}>
          {denied ? 'Location is blocked' : 'Location is off'}
        </p>

        <p
          className="text-sm mt-2"
          style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}
        >
          {denied
            ? 'You can still browse every building — you just will not see walking times. Re-enable location in your browser settings if you change your mind.'
            : 'UniSpace counts how busy each building is, anonymously. Your exact position never leaves this device — only which building you are in, and only while the app is open.'}
        </p>

        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="mono text-xs mt-3 px-3"
          style={{
            minHeight: 44,
            background: 'none',
            border: '1px solid var(--color-steel)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--color-text-primary)',
            cursor: 'pointer',
          }}
        >
          Browse without location
        </button>
      </div>
    </div>
  )
}
