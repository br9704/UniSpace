interface StatusDotProps {
  open: boolean
  size?: number
}

export default function StatusDot({ open, size = 7 }: StatusDotProps) {
  return (
    <span
      className="inline-block rounded-full shrink-0"
      style={{
        width: size,
        height: size,
        backgroundColor: open ? 'var(--color-empty)' : 'var(--color-packed)',
      }}
    />
  )
}
