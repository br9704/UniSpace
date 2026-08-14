interface SectionLabelProps {
  children: string
  className?: string
}

/**
 * `</section>` heading, in SIGNAL's terminal voice.
 *
 * The angle-bracket form is the system's section marker across Bruno's
 * projects. Rendered as real DOM text with an aria-hidden decoration, so screen
 * readers hear the label and not the punctuation.
 */
export default function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <h3
      className={`mono text-xs tracking-widest ${className}`}
      style={{ color: 'var(--color-text-muted)', fontWeight: 400 }}
    >
      <span aria-hidden="true">&lt;/</span>
      {children.toLowerCase()}
      <span aria-hidden="true">&gt;</span>
    </h3>
  )
}
