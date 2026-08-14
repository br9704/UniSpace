interface FavouriteButtonProps {
  isFavourite: boolean
  onToggle: () => void
  size?: number
}

/**
 * Favourite toggle, as a bracketed marker rather than a heart.
 *
 * SIGNAL has no red and no emoji, and a filled heart is neither monospace nor
 * square. `[*]` / `[ ]` reads instantly, states its own status in text, and
 * costs nothing to render.
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
      className="mono flex items-center justify-center"
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        minWidth: 44,
        minHeight: 44,
        fontSize: size,
        color: isFavourite ? 'var(--color-amber)' : 'var(--color-text-dim)',
        transition: 'color var(--dur-fast) linear',
      }}
    >
      {isFavourite ? '[*]' : '[ ]'}
    </button>
  )
}
