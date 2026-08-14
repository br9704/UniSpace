import type { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Raises the border from hairline to steel, for surfaces that sit above others. */
  variant?: 'default' | 'elevated'
}

/**
 * A panel.
 *
 * SIGNAL has no shadows, so depth is carried entirely by border weight: a
 * hairline rule for structure, steel for something genuinely raised. Square,
 * with the surface a single step off the warm-black ground.
 */
export default function Card({
  variant = 'default',
  className = '',
  children,
  ...rest
}: CardProps) {
  const border =
    variant === 'elevated' ? 'border-[var(--color-steel)]' : 'border-[var(--color-hairline)]'

  return (
    <div
      className={`rounded-[var(--radius-md)] border bg-[var(--color-surface)] p-5 ${border} ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}
