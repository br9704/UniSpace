import { useState } from 'react'
import FavouriteButton from './FavouriteButton'
import { shareBuilding } from '@/lib/shareBuilding'

interface BuildingCardHeaderProps {
  buildingId: string
  buildingName: string
  isFavourite: boolean
  onToggleFavourite?: () => void
  onDismiss: () => void
}

/**
 * The sticky control row at the top of the building sheet.
 *
 * Sticky because the sheet scrolls: the way out must never scroll away. The
 * drag handle is a hairline bar rather than a rounded pill — square, like
 * everything else here.
 */
export default function BuildingCardHeader({
  buildingId,
  buildingName,
  isFavourite,
  onToggleFavourite,
  onDismiss,
}: BuildingCardHeaderProps) {
  const [copied, setCopied] = useState(false)

  async function handleShare() {
    const shared = await shareBuilding(buildingId, buildingName)
    if (!shared) return
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className="sticky top-0 z-10 flex items-center justify-between px-4 pt-3 pb-2"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <div className="flex items-center gap-1">
        {onToggleFavourite && (
          <FavouriteButton isFavourite={isFavourite} onToggle={onToggleFavourite} />
        )}
        <button
          type="button"
          onClick={handleShare}
          aria-label="Share this building"
          className="mono flex items-center justify-center text-xs"
          style={{
            minWidth: 44, minHeight: 44,
            border: 'none', background: 'none', cursor: 'pointer',
            color: copied ? 'var(--color-amber)' : 'var(--color-text-muted)',
          }}
        >
          {copied ? 'COPIED' : '[↗]'}
        </button>
      </div>

      <div
        aria-hidden="true"
        style={{ width: 32, height: 2, backgroundColor: 'var(--color-steel)', cursor: 'grab' }}
      />

      <button
        type="button"
        onClick={onDismiss}
        aria-label="Close"
        className="mono flex items-center justify-center text-sm"
        style={{
          minWidth: 44, minHeight: 44,
          border: 'none', background: 'none', cursor: 'pointer',
          color: 'var(--color-text-secondary)',
        }}
      >
        ✕
      </button>
    </div>
  )
}
