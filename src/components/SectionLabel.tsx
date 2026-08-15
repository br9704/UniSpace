interface SectionLabelProps {
  children: string
  className?: string
}

/**
 * Section eyebrow.
 *
 * Was `</at a glance>` — SIGNAL's terminal voice, which stopped making sense
 * the moment the system was reverted to a light UoM palette. Angle brackets on
 * a white card read as an unfinished template rather than a deliberate one.
 *
 * Now a small tracked cap, which is what a section marker is for: it should
 * seat the eye and then get out of the way.
 */
export default function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <h3
      className={`text-xs uppercase ${className}`}
      style={{
        color: 'var(--color-text-muted)',
        fontWeight: 600,
        letterSpacing: '0.09em',
      }}
    >
      {children}
    </h3>
  )
}
