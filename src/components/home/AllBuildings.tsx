import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import type { CampusItem } from '@/hooks/useCampusOverview'
import type { GooglePopularTime } from '@/types'
import { staggerContainer, fadeInUp } from '@/constants/animations'
import Card from '../ui/Card'
import SectionLabel from '../SectionLabel'
import BuildingRow from './BuildingRow'

interface AllBuildingsProps {
  items: CampusItem[]
  typicalRows: GooglePopularTime[]
  isFavourite: (id: string) => boolean
  onToggleFavourite: (id: string) => void
  onOpen: (id: string) => void
}

type SortKey = 'occupancy' | 'name' | 'distance'

const SORTS: SortKey[] = ['occupancy', 'name', 'distance']

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
      <SectionLabel className="mb-3">all buildings</SectionLabel>

      <label className="sr-only" htmlFor="building-search">Search buildings</label>
      <input
        id="building-search"
        type="search"
        placeholder="> search buildings"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mono w-full text-xs px-3"
        style={{
          minHeight: 44,
          backgroundColor: 'var(--color-bg)',
          border: '1px solid var(--color-hairline)',
          borderRadius: 'var(--radius-md)',
          color: 'var(--color-text-primary)',
          outline: 'none',
        }}
      />

      <div className="flex gap-2 mt-3 mb-4" role="group" aria-label="Sort buildings">
        {SORTS.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setSortBy(key)}
            aria-pressed={sortBy === key}
            className="mono text-xs px-2.5"
            style={{
              minHeight: 44,
              background: 'none',
              border: `1px solid ${sortBy === key ? 'var(--color-amber)' : 'var(--color-hairline)'}`,
              borderRadius: 'var(--radius-md)',
              color: sortBy === key ? 'var(--color-amber)' : 'var(--color-text-secondary)',
              cursor: 'pointer',
            }}
          >
            {key.toUpperCase()}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="mono text-xs text-center py-6" style={{ color: 'var(--color-text-muted)' }}>
          &gt; no buildings match “{query}”
        </p>
      ) : (
        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-3"
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
