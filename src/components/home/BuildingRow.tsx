import { motion } from 'framer-motion'
import type { CampusItem } from '@/hooks/useCampusOverview'
import type { GooglePopularTime } from '@/types'
import { BUILDING_META } from '@/constants/buildingMeta'
import { getOccupancyColourVar } from '@/constants/occupancy'
import { cardPress } from '@/constants/animations'
import { getCurrentTypical } from '@/lib/occupancyHelpers'
import { formatHour } from '@/lib/predictionInsights'
import { isOpenNow, openStatusLabel } from '@/lib/buildingHours'
import OccupancyBar from '../OccupancyBar'
import CountUpValue from '../CountUpValue'
import FavouriteButton from '../FavouriteButton'
import StatusDot from '../ui/StatusDot'
import BuildingRowFooter from './BuildingRowFooter'

interface BuildingRowProps {
  item: CampusItem
  typicalRows: GooglePopularTime[]
  isFavourite: boolean
  onToggleFavourite: () => void
  onOpen: () => void
}

/** Full-width building row for the searchable "all buildings" list. */
export default function BuildingRow({
  item,
  typicalRows,
  isFavourite,
  onToggleFavourite,
  onOpen,
}: BuildingRowProps) {
  const { building } = item
  const pct = item.occupancy?.pct ?? null
  const status = isOpenNow(building)
  const meta = BUILDING_META[building.slug]
  const typical = getCurrentTypical(typicalRows, building.id)

  const peak = typicalRows
    .filter((r) => r.building_id === building.id && r.day_of_week === new Date().getDay())
    .sort((a, b) => b.typical_popularity - a.typical_popularity)[0]

  return (
    <div
      // Shadow as a class, not inline: see BuildingTile — an inline box-shadow
      // would outrank `.card-lift:hover` and kill the lift.
      className="relative card-lift shadow-tile"
      style={{
        backgroundColor: 'var(--color-bg-card)',
        border: '2px solid var(--border-panel)',
        // Same occupancy stripe as the tile, so the directory scans the same
        // way the grid does. Declared after `border`, which would overwrite it.
        borderLeft: `4px solid ${getOccupancyColourVar(pct)}`,
        borderRadius: 'var(--radius-row)',
      }}
    >
      {/* Beside the percentage, as in the pre-SIGNAL build — but a sibling of
          the row button, never nested inside it. That build could nest because
          its card was a role="button" div, which a11y.test.ts now forbids. */}
      <div className="absolute" style={{ top: 8, right: 4 }}>
        <FavouriteButton isFavourite={isFavourite} onToggle={onToggleFavourite} size={18} />
      </div>

      <motion.button
        type="button"
        onClick={onOpen}
        {...cardPress}
        className="w-full text-left"
        // 22px inset, with the bottom opened up because the amenity row below
        // completes it — the row does not get taller, the last 12px just moves
        // outside the tap target so the Directions link can be a real <a>.
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '22px 22px 12px' }}
      >
        {/* 28px of clearance past the 22px inset, so the percentage stops short
            of the favourite's 44px hit box. */}
        <div className="flex items-start justify-between gap-3 pr-7">
          <div className="flex-1 min-w-0 pr-3">
            <p className="text-[20px] font-bold leading-tight" style={{ color: 'var(--color-text-primary)' }}>
              {building.name}
            </p>
            {meta && (
              // A filled chip rather than a second line of prose, so the address
              // reads as metadata at a glance and stops competing with the
              // status line under it.
              <p
                className="mono text-xs inline-block mt-1.5 px-2.5 py-[3px] rounded-[var(--radius-sm)]"
                style={{ backgroundColor: 'var(--color-bg-chip)', color: 'var(--color-text-muted)' }}
              >
                {meta.address}
              </p>
            )}
          </div>
          {/* Text-primary, not the occupancy colour: see BuildingTile. */}
          <span
            className="mono text-xl font-bold shrink-0"
            data-count
            style={{ color: 'var(--color-text-primary)' }}
          >
            <CountUpValue value={pct} suffix="%" />
          </span>
        </div>

        <div className="mt-3">
          <OccupancyBar pct={pct} height={6} className="rounded-full" />
        </div>

        {/* 8px between the secondary facts, deliberately unchanged — a tight
            stack is what the pre-SIGNAL row had here too. */}
        <div className="mono flex items-center gap-1.5 mt-2 text-xs" style={{ color: 'var(--color-text-muted)' }}>
          <StatusDot open={status.open} verified={status.verified} size={6} />
          <span>{!status.verified ? openStatusLabel(status) : status.open ? `OPEN · CLOSES ${status.closesAt}` : 'AFTER HOURS'}</span>
          {item.walkMinutes !== null && <span>· ~{Math.round(item.walkMinutes)} MIN</span>}
        </div>

        {typical && (
          // Phrased as an estimate on purpose — these curves are modelled, not
          // measured, and must never read as a live number.
          <p className="mono text-xs mt-2" style={{ color: 'var(--color-text-muted)' }}>
            ~ USUALLY {typical.typical_popularity}% NOW
            {peak && ` · PEAKS ${formatHour(peak.hour_of_day).toUpperCase()}`}
          </p>
        )}
      </motion.button>

      <BuildingRowFooter building={building} />
    </div>
  )
}
