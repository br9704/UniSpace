export type SortKey = 'occupancy' | 'name' | 'distance'

const SORTS: SortKey[] = ['occupancy', 'name', 'distance']

interface BuildingFiltersProps {
  query: string
  onQueryChange: (value: string) => void
  sortBy: SortKey
  onSortChange: (key: SortKey) => void
}

/**
 * The directory's search field and sort pills.
 *
 * Extracted from AllBuildings to keep that file under CLAUDE.md § 3's 150-line
 * cap once the magnifier, the filled pills and the state crossfade landed.
 *
 * Both controls stay 44px tall, which is the one place this deliberately
 * departs from the build being restored: its pills were about 26px and its
 * search field 38, neither of which meets PRD § 10.2's touch minimum, and
 * a11y.test.ts fails any numeric minimum below 44.
 */
export default function BuildingFilters({
  query,
  onQueryChange,
  sortBy,
  onSortChange,
}: BuildingFiltersProps) {
  return (
    <>
      <label className="sr-only" htmlFor="building-search">Search buildings</label>
      <div className="relative mb-3">
        {/*
          The 36px left inset only makes sense with something in it. The
          magnifier is the affordance that says "type here" without being read,
          which is why the pre-SIGNAL field reserved the space at all.
          aria-hidden: the sr-only label already names the control.
        */}
        <svg
          aria-hidden="true"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--color-text-muted)"
          strokeWidth="2"
          className="absolute pointer-events-none"
          // (44 - 16) / 2, so it centres in our taller field rather than
          // sitting at the pre-SIGNAL top: 11 of a 38px one.
          style={{ left: 12, top: 14 }}
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          id="building-search"
          type="search"
          placeholder="> search buildings"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          className="mono w-full text-sm"
          style={{
            minHeight: 44,
            paddingLeft: 36,
            paddingRight: 12,
            // #FAFBFD, so the field sits below the white panel rather than
            // matching the page ground behind it.
            backgroundColor: 'var(--color-bg-input)',
            border: '1px solid var(--color-hairline)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--color-text-primary)',
            outline: 'none',
          }}
        />
      </div>

      <div className="flex gap-2 mb-3.5" role="group" aria-label="Sort buildings">
        {SORTS.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => onSortChange(key)}
            aria-pressed={sortBy === key}
            className="mono text-xs px-4"
            style={{
              // Filled navy pills, the pre-SIGNAL control shape, replacing an
              // amber 1px outline. --radius-full rather than its 8px: at 44px
              // tall an 8px corner reads as a slab, and index.css declares
              // --radius-full as "pills, as in the pre-SIGNAL system" — a token
              // that until now had no consumer at all.
              minHeight: 44,
              border: 'none',
              borderRadius: 'var(--radius-full)',
              backgroundColor: sortBy === key ? 'var(--color-uom-navy)' : 'var(--color-bg-chip)',
              color: sortBy === key ? 'var(--color-text-on-navy)' : 'var(--color-text-muted)',
              fontWeight: sortBy === key ? 600 : 400,
              cursor: 'pointer',
              // The state used to snap, which is indistinguishable from a
              // re-render. FilterChipRow and ReportLevelPicker already do
              // exactly this 150ms crossfade; the home page was the outlier.
              // Being a CSS transition, prefers-reduced-motion stops it.
              transition: 'background-color var(--dur-fast) linear, color var(--dur-fast) linear',
            }}
          >
            {key.toUpperCase()}
          </button>
        ))}
      </div>
    </>
  )
}
