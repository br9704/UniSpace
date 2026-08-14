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

/**
 * Bracketed controls: `[ navigate → ]`.
 *
 * SIGNAL renders actions as terminal affordances rather than filled pills.
 * Amber marks the one primary action on a surface; everything else is steel on
 * warm black. Square by definition — the radius tokens are 2px at most.
 */
const VARIANT_STYLES: Record<Variant, string> = {
  primary:
    'bg-transparent text-[var(--color-amber)] border border-[var(--color-amber)] ' +
    'hover:bg-[var(--color-amber)] hover:text-[var(--color-bg)]',
  secondary:
    'bg-transparent text-[var(--color-text-primary)] border border-[var(--color-steel)] ' +
    'hover:border-[var(--color-text-secondary)]',
  ghost:
    'bg-transparent text-[var(--color-text-secondary)] border border-transparent ' +
    'hover:text-[var(--color-text-primary)]',
}

/** Every size clears the 44px WCAG touch target. */
const SIZE_STYLES: Record<Size, string> = {
  sm: 'px-3 py-2 text-xs min-h-[44px]',
  md: 'px-5 py-2.5 text-sm min-h-[44px]',
  lg: 'px-6 py-3.5 text-base min-h-[44px]',
}

export default function Button(props: Props) {
  const { variant = 'primary', size = 'md', className = '', ...rest } = props
  const classes =
    'mono inline-flex items-center justify-center gap-2 tracking-wide uppercase ' +
    'rounded-[var(--radius-md)] transition-colors duration-150 ' +
    'disabled:opacity-40 disabled:pointer-events-none ' +
    `${VARIANT_STYLES[variant]} ${SIZE_STYLES[size]} ${className}`

  if (rest.as === 'a') {
    const { as: _as, ...anchorProps } = rest as AnchorProps
    return <a className={`${classes} no-underline`} {...anchorProps} />
  }

  const { as: _as, ...buttonProps } = rest as ButtonProps
  return <button className={classes} {...buttonProps} />
}
