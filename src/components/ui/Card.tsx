import type { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated'
}

export default function Card({ variant = 'default', className = '', children, ...rest }: CardProps) {
  const base = 'rounded-[var(--radius-lg)] border border-[var(--color-border)]'
  const bg = variant === 'elevated'
    ? 'bg-[var(--color-bg-elevated)] shadow-elevated'
    : 'bg-[var(--color-bg-elevated)] shadow-card'

  return (
    <div className={`${base} ${bg} p-6 ${className}`} {...rest}>
      {children}
    </div>
  )
}
