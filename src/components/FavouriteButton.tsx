interface FavouriteButtonProps {
  isFavourite: boolean
  onToggle: () => void
  size?: number
}

/**
 * Favourite toggle.
 *
 * Was `[*]` / `[ ]` — SIGNAL's bracketed marker, which on a light card read as
 * an unrendered checkbox rather than a control. A bookmark outline fills on
 * toggle, so the state is legible at a glance and at any size.
 *
 * Not a heart: this marks a place you want to find again, not one you love, and
 * the palette has no red outside the occupancy ramp.
 *
 * The 44px box is the WCAG touch target; the visible glyph is smaller.
 */
export default function FavouriteButton({ isFavourite, onToggle, size = 14 }: FavouriteButtonProps) {
  return (
    <button
      type="button"
      onClick={(e) => { e.stopPropagation(); onToggle() }}
      aria-pressed={isFavourite}
      aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
      className="flex items-center justify-center"
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        minWidth: 44,
        minHeight: 44,
        color: isFavourite ? 'var(--color-amber)' : 'var(--color-text-muted)',
        transition: 'color var(--dur-fast) linear',
      }}
    >
      <svg
        aria-hidden="true"
        width={size + 4}
        height={size + 4}
        viewBox="0 0 24 24"
        fill={isFavourite ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={isFavourite ? 0 : 1.9}
        strokeLinejoin="round"
      >
        <path d="M6 3.75h12a1.25 1.25 0 0 1 1.25 1.25v15.2L12 16.4l-7.25 3.8V5A1.25 1.25 0 0 1 6 3.75Z" />
      </svg>
    </button>
  )
}
