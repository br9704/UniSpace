interface StatusDotProps {
  open: boolean
  size?: number
}

/**
 * Open/closed indicator.
 *
 * Green means open — one of the two places MOTION.md permits colour outside the
 * amber accent, because "open now" is exactly the live/positive state it
 * reserves it for. Closed is dim grey rather than red: a shut building is not
 * an error, and red is not in this palette.
 *
 * Square, like everything else in SIGNAL.
 */
export default function StatusDot({ open, size = 6 }: StatusDotProps) {
  return (
    <span
      aria-hidden="true"
      className="inline-block shrink-0"
      style={{
        width: size,
        height: size,
        backgroundColor: open ? 'var(--color-live)' : 'var(--color-text-dim)',
      }}
    />
  )
}
