interface StatusDotProps {
  open: boolean
  /**
   * Whether a source backs the hours behind `open`. Defaults true so an
   * unverified state has to be passed deliberately, never assumed.
   */
  verified?: boolean
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
 * Unverified is a hollow outline — filled means we know, empty means we do not.
 * A filled dot of either colour would answer a question the data cannot answer,
 * and the green one would answer it wrongly for 13 of 18 buildings.
 *
 * Round, like everything else now that SIGNAL's square rule is retired.
 */
export default function StatusDot({ open, verified = true, size = 6 }: StatusDotProps) {
  return (
    <span
      aria-hidden="true"
      className="inline-block shrink-0"
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: !verified
          ? 'transparent'
          : open ? 'var(--color-live)' : 'var(--color-text-muted)',
        boxShadow: !verified ? 'inset 0 0 0 1px var(--color-text-muted)' : undefined,
      }}
    />
  )
}
