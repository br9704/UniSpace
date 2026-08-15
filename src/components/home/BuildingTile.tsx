import { motion } from 'framer-motion'
import type { CampusItem } from '@/hooks/useCampusOverview'
import { getOccupancyLabel, getOccupancyColourVar } from '@/constants/occupancy'
import { tilePress } from '@/constants/animations'
import { isOpenNow, openStatusLabel } from '@/lib/buildingHours'
import OccupancyBar from '../OccupancyBar'
import CountUpValue from '../CountUpValue'
import FavouriteButton from '../FavouriteButton'
import StatusDot from '../ui/StatusDot'

interface BuildingTileProps {
  item: CampusItem
  isFavourite: boolean
  onToggleFavourite: () => void
  onOpen: () => void
}

/**
 * Compact building tile for the home grid.
 *
 * A real `<button>` rather than a div with a role, so keyboard activation,
 * focus and screen-reader semantics come for free instead of being
 * reimplemented with key handlers.
 */
export default function BuildingTile({
  item,
  isFavourite,
  onToggleFavourite,
  onOpen,
}: BuildingTileProps) {
  const pct = item.occupancy?.pct ?? null
  const status = isOpenNow(item.building)

  return (
    <div
      // The card shadow is a class, not an inline style, so `.card-lift:hover`
      // can raise it — an inline box-shadow outranks any rule and the hover
      // lift would silently never apply.
      className="relative card-lift shadow-tile"
      style={{
        // A card inside a white panel on a grey page: three greys, three depths.
        backgroundColor: 'var(--color-bg-card)',
        border: '2px solid var(--border-panel)',
        // The occupancy stripe. It is the only place occupancy colour touches
        // the container, and it is what makes a grid of tiles scannable at
        // arm's length instead of monochrome until the eye reaches the bar.
        // Must be declared after `border`, which would otherwise overwrite it.
        borderLeft: `4px solid ${getOccupancyColourVar(pct)}`,
        borderRadius: 'var(--radius-tile)',
      }}
    >
      {/* Inset 4px so the 44px hit box sits inside the 16px corner rather than
          fighting it. The box is unchanged — a11y.test.ts fails below 44. */}
      <div className="absolute top-1 right-0">
        <FavouriteButton isFavourite={isFavourite} onToggle={onToggleFavourite} size={16} />
      </div>

      <motion.button
        type="button"
        onClick={onOpen}
        {...tilePress}
        className="w-full text-left"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 'var(--space-4-5)',
        }}
      >
        {/* 28px of clearance: the favourite's hit box reaches 44px in from the
            card edge and the padding only accounts for 18 of it. */}
        <p
          className="text-[14px] font-semibold truncate pr-7"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {item.building.short_name || item.building.name}
        </p>

        {/* Colour deliberately stays text-primary rather than the occupancy
            ramp the pre-SIGNAL build used here. --color-occ-quiet measures
            about 2.2:1 on this card — under WCAG's 3:1 large-text floor — so a
            green percentage would be a regression sold as a restoration. The
            stripe and the bar carry the colour instead. */}
        <p
          className="mono text-3xl font-extrabold mt-2.5 leading-none"
          data-count
          style={{ color: 'var(--color-text-primary)' }}
        >
          <CountUpValue value={pct} suffix="%" />
        </p>

        <div className="mt-2.5">
          <OccupancyBar pct={pct} height={5} className="rounded-full" />
        </div>

        {/* The one tight step in the tile: this label belongs to the number
            above it. That is what makes the rhythm read 10 / 10 / 8 / 10
            rather than as a metronome. */}
        <p className="mono text-sm mt-2" style={{ color: 'var(--color-text-muted)' }}>
          {getOccupancyLabel(pct).toUpperCase()}
        </p>

        <div className="mono flex items-center justify-between mt-2.5 text-xs" style={{ color: 'var(--color-text-muted)' }}>
          <span className="flex items-center gap-1.5">
            <StatusDot open={status.open} verified={status.verified} size={7} />
            {openStatusLabel(status)}
          </span>
          {item.walkMinutes !== null && <span>~{Math.round(item.walkMinutes)}M</span>}
        </div>
      </motion.button>
    </div>
  )
}
