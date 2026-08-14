interface NoiseIndicatorProps {
  level: number
  count: number
}

function getNoiseLabel(level: number): string {
  if (level <= 1.5) return 'Silent'
  if (level <= 2.5) return 'Quiet'
  if (level <= 3.5) return 'Moderate'
  if (level <= 4.5) return 'Loud'
  return 'Very loud'
}

/**
 * Noise as a five-segment meter — an instrument readout rather than an icon.
 *
 * The report count is shown because it is the honest qualifier: an average of
 * three reports is not the same claim as an average of thirty, and the reader
 * deserves to know which they are looking at.
 */
export default function NoiseIndicator({ level, count }: NoiseIndicatorProps) {
  const filled = Math.round(level)

  return (
    <span
      className="mono inline-flex items-center gap-2 text-xs"
      style={{ color: 'var(--color-text-secondary)' }}
    >
      <span aria-hidden="true" style={{ letterSpacing: '0.15em' }}>
        {'█'.repeat(filled)}
        <span style={{ color: 'var(--color-hairline)' }}>{'░'.repeat(5 - filled)}</span>
      </span>
      <span>{getNoiseLabel(level).toUpperCase()}</span>
      <span style={{ color: 'var(--color-text-dim)' }}>({count} reports)</span>
    </span>
  )
}
