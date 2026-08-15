import { motion } from 'framer-motion'
import type { CampusItem } from '@/hooks/useCampusOverview'
import { staggerContainer, fadeInUp } from '@/constants/animations'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import Card from '../ui/Card'
import SectionLabel from '../SectionLabel'
import BuildingTile from './BuildingTile'

interface TileGridProps {
  title: string
  items: CampusItem[]
  limit?: number
  /**
   * How many tiles across at the widest breakpoint. `3` is for a grid sitting
   * in the narrower half of the hero pairing; `4` is the standalone default.
   */
  columns?: 3 | 4
  isFavourite: (id: string) => boolean
  onToggleFavourite: (id: string) => void
  onOpen: (id: string) => void
}

/** Tailwind needs literal class strings, so both shapes are spelled out. */
const COLUMNS = {
  3: 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3',
  4: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4',
} as const

/**
 * A titled grid of building tiles.
 *
 * Renders nothing when empty rather than showing a hollow section — "Your
 * favourites (0)" is noise, not information.
 */
export default function TileGrid({
  title,
  items,
  limit = 8,
  columns = 4,
  isFavourite,
  onToggleFavourite,
  onOpen,
}: TileGridProps) {
  const prefersReducedMotion = usePrefersReducedMotion()

  if (items.length === 0) return null

  return (
    <Card variant="elevated">
      <SectionLabel className="mb-4">{title}</SectionLabel>
      <motion.ul
        variants={staggerContainer}
        // Starting on "visible" means framer runs no transition at all. The CSS
        // reduced-motion block cannot reach this: framer writes per-frame inline
        // transforms, and zeroing `transition-duration` does nothing to them.
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        animate="visible"
        className={`grid ${COLUMNS[columns]} gap-3`}
      >
        {items.slice(0, limit).map((item) => (
          <motion.li key={item.building.id} variants={fadeInUp}>
            <BuildingTile
              item={item}
              isFavourite={isFavourite(item.building.id)}
              onToggleFavourite={() => onToggleFavourite(item.building.id)}
              onOpen={() => onOpen(item.building.id)}
            />
          </motion.li>
        ))}
      </motion.ul>
    </Card>
  )
}
