import type { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Raises the outline from a hairline rule to the 2px navy panel border, for
   * a surface that holds other surfaces rather than sitting flat on the ground.
   */
  variant?: 'default' | 'elevated'
}

/**
 * A white section panel on the page's grey ground.
 *
 * 24px of padding, a 20px radius, and depth carried by a border and a shadow
 * together — the heavy translucent navy outline over 0 4px 20px of navy at 6%.
 * That pairing is the pre-SIGNAL system's signature; the docstring here used to
 * say "SIGNAL has no shadows, so depth is carried entirely by border weight",
 * which stopped being true when the palette was reverted.
 *
 * Three greys and two shadow tiers are what separate a panel from the cards
 * inside it: #F0F2F5 page, #FFFFFF panel, #FAFBFD card.
 */
export default function Card({
  variant = 'default',
  className = '',
  children,
  ...rest
}: CardProps) {
  const border =
    variant === 'elevated'
      ? 'border-2 border-[var(--border-panel)]'
      : 'border border-[var(--color-hairline)]'

  return (
    <div
      className={`rounded-lg bg-[var(--color-surface)] p-6 shadow-card ${border} ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}
