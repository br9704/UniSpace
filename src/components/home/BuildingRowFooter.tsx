import type { Building } from '@/types'
import { getActiveAmenities } from '@/lib/amenityHelpers'

interface BuildingRowFooterProps {
  building: Building
}

/**
 * The amenity chips and the Directions link, sharing one row.
 *
 * Sits outside the row's tap target for two reasons: an `<a>` nested inside a
 * `<button>` is invalid markup, and there is no divider above this row any more
 * — the pre-SIGNAL build had none, and a rule repeated down eighteen stacked
 * rows is a horizontal line of noise carrying no information.
 *
 * Extracted from BuildingRow to keep that file under CLAUDE.md § 3's 150-line
 * cap once the occupancy stripe, the address chip and the press wrapper landed.
 */
export default function BuildingRowFooter({ building }: BuildingRowFooterProps) {
  const amenities = getActiveAmenities(building)

  return (
    // 22px of side inset lines the chips up with the building name above them;
    // the 12px below completes the card, the row button having handed it over.
    <div className="flex items-center justify-between gap-3 flex-wrap" style={{ padding: '0 22px 12px' }}>
      {amenities.length > 0 && (
        <ul className="flex flex-wrap gap-1.5">
          {amenities.map((amenity) => (
            <li
              key={amenity.label}
              // Filled and rounded, matching the address chip. The square
              // hairline outlines these replace were SIGNAL's shape.
              className="mono text-xs px-2 py-0.5 rounded-[var(--radius-sm)]"
              style={{ backgroundColor: 'var(--color-bg-chip)', color: 'var(--color-text-muted)' }}
            >
              {amenity.label}
            </li>
          ))}
        </ul>
      )}
      <a
        href={`https://www.google.com/maps/dir/?api=1&destination=${building.entrance_lat},${building.entrance_lng}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mono text-xs font-semibold no-underline flex items-center shrink-0 ml-auto"
        // Navy and semibold: the one outbound action on the row should look
        // like an action. The 44px minimum stays exactly where it was.
        style={{ color: 'var(--color-text-accent)', minHeight: 44, padding: '0 8px' }}
      >
        Directions →
      </a>
    </div>
  )
}
