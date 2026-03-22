import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface BaseProps {
  variant?: Variant
  size?: Size
}

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' }
type AnchorProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a' }
type Props = ButtonProps | AnchorProps

const VARIANT_STYLES: Record<Variant, string> = {
  primary: 'bg-[var(--color-uom-navy)] text-[var(--color-text-on-navy)] hover:opacity-90',
  secondary: 'bg-[var(--color-bg-chip)] text-[var(--color-text-accent)] border border-[var(--color-border)]',
  ghost: 'bg-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-chip)]',
}

const SIZE_STYLES: Record<Size, string> = {
  sm: 'px-3 py-2 text-xs rounded-md min-h-[44px]',
  md: 'px-5 py-2.5 text-sm rounded-[var(--radius-md)] min-h-[44px]',
  lg: 'px-6 py-3.5 text-base rounded-[var(--radius-md)] min-h-[44px]',
}

export default function Button(props: Props) {
  const { variant = 'primary', size = 'md', className = '', ...rest } = props
  const classes = `inline-flex items-center justify-center font-semibold transition-all active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none ${VARIANT_STYLES[variant]} ${SIZE_STYLES[size]} ${className}`

  if (rest.as === 'a') {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { as: _, ...anchorProps } = rest as AnchorProps
    return <a className={`${classes} no-underline`} {...anchorProps} />
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { as: _, ...buttonProps } = rest as ButtonProps
  return <button className={classes} {...buttonProps} />
}
