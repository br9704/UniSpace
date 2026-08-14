import { useCountUp } from '@/hooks/useCountUp'

interface CountUpValueProps {
  value: number | null
  suffix?: string
  /** Shown when the value is null. */
  placeholder?: string
  className?: string
}

/**
 * A number that counts to its value rather than jumping to it.
 *
 * `data-count` applies tabular figures so the width never changes mid-count.
 * `aria-live="off"` is deliberate: the intermediate frames are decoration, and
 * announcing every step would flood a screen reader with numbers that were
 * never real readings.
 */
export default function CountUpValue({
  value,
  suffix = '',
  placeholder = '--',
  className = '',
}: CountUpValueProps) {
  const displayed = useCountUp(value)

  return (
    <span data-count aria-live="off" className={className}>
      {displayed === null ? placeholder : `${displayed}${suffix}`}
    </span>
  )
}
