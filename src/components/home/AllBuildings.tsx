import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import type { CampusItem } from '@/hooks/useCampusOverview'
import type { GooglePopularTime } from '@/types'
import { staggerContainer, fadeInUp } from '@/constants/animations'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import Card from '../ui/Card'
import SectionLabel from '../SectionLabel'
import BuildingRow from './BuildingRow'
import BuildingFilters from './BuildingFilters'
import type { SortKey } from './BuildingFilters'

interface AllBuildingsProps {
  items: CampusItem[]
  typicalRows: GooglePopularTime[]
  isFavourite: (id: string) => boolean
  onToggleFavourite: (id: string) => void
  onOpen: (id: string) => void
}

/** Searchable, sortable directory of every building on campus. */
export default function AllBuildings({
  items,
  typicalRows,
  isFavourite,
  onToggleFavourite,
  onOpen,
}: AllBuildingsProps) {
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortKey>('occupancy')
  const prefersReducedMotion = usePrefersReducedMotion()

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase()
    const matched = needle
      ? items.filter(({ building }) =>
          building.name.toLowerCase().includes(needle) ||
          (building.short_name?.toLowerCase().includes(needle) ?? false))
      : items

    // `items` arrives sorted by occupancy, so that case needs no re-sort.
    if (sortBy === 'name') {
      return [...matched].sort((a, b) => a.building.name.localeCompare(b.building.name))
    }
    if (sortBy === 'distance') {
      return [...matched].sort((a, b) => (a.walkMinutes ?? 999) - (b.walkMinutes ?? 999))
    }
    return matched
  }, [items, query, sortBy])

  return (
    <Card variant="elevated">
      {/* 14px, deliberately 2px tighter than the 16px every other panel heading
          uses, because a search field follows rather than content. */}
      <SectionLabel className="mb-3.5">all buildings</SectionLabel>

      <BuildingFilters
        query={query}
        onQueryChange={setQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {visible.length === 0 ? (
        <p className="mono text-sm text-center py-5" style={{ color: 'var(--color-text-muted)' }}>
          &gt; no buildings match “{query}”
        </p>
      ) : (
        <motion.ul
          variants={staggerContainer}
          // See TileGrid: CSS cannot stop a framer stagger, so it starts already
          // visible instead of animating for a user who asked for none.
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          animate="visible"
          // 16px, not the grid's 12px. Rows in a vertical list need more
          // separation than tiles in a grid, which have a column edge to divide
          // them; using one value for both is half of why the page reads flat.
          className="flex flex-col gap-4"
        >
          {visible.map((item) => (
            <motion.li key={item.building.id} variants={fadeInUp}>
              <BuildingRow
                item={item}
                typicalRows={typicalRows}
                isFavourite={isFavourite(item.building.id)}
                onToggleFavourite={() => onToggleFavourite(item.building.id)}
                onOpen={() => onOpen(item.building.id)}
              />
            </motion.li>
          ))}
        </motion.ul>
      )}
    </Card>
  )
}
