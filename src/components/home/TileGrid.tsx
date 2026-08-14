import { motion } from 'framer-motion'
import type { CampusItem } from '@/hooks/useCampusOverview'
import { staggerContainer, fadeInUp } from '@/constants/animations'
import Card from '../ui/Card'
import SectionLabel from '../SectionLabel'
import BuildingTile from './BuildingTile'

interface TileGridProps {
  title: string
  items: CampusItem[]
  limit?: number
  isFavourite: (id: string) => boolean
  onToggleFavourite: (id: string) => void
  onOpen: (id: string) => void
}

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
  isFavourite,
  onToggleFavourite,
  onOpen,
}: TileGridProps) {
  if (items.length === 0) return null

  return (
    <Card variant="elevated">
      <SectionLabel className="mb-3">{title}</SectionLabel>
      <motion.ul
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2"
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
