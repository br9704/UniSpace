interface NoiseIndicatorProps {
  level: number
  count: number
}

function getNoiseLabel(level: number): string {
  if (level <= 1.5) return 'Silent'
  if (level <= 2.5) return 'Quiet'
  if (level <= 3.5) return 'Moderate'
  if (level <= 4.5) return 'Loud'
  return 'Very Loud'
}

export default function NoiseIndicator({ level, count }: NoiseIndicatorProps) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-[#64748B]">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>{level > 2.5 && <path d="M15.54 8.46a5 5 0 010 7.07"/>}{level > 3.5 && <path d="M19.07 4.93a10 10 0 010 14.14"/>}</svg>
      <span>{getNoiseLabel(level)}</span>
      <span className="text-[#94A3B8]">({count} reports)</span>
    </span>
  )
}
