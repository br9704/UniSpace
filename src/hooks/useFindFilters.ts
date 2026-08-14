import { useCallback, useMemo, useState } from 'react'
import type { FilterState } from '@/types'
import { DEFAULT_FILTERS } from '@/types'

export type OccupancyFilter = 'under50' | 'under30'

/** Walk time is unrestricted by default — the campus is small enough. */
const BASE_FILTERS: FilterState = {
  ...DEFAULT_FILTERS,
  currently_open: false,
  max_walk_minutes: 999,
}

/**
 * Filter state for the recommendations panel.
 *
 * Amenity toggles and occupancy caps behave differently — the former are
 * independent, the latter mutually exclusive — so keeping both here means the
 * panel renders chips without also owning the rules about how they interact.
 */
export function useFindFilters() {
  const [filters, setFilters] = useState<FilterState>(BASE_FILTERS)
  const [caps, setCaps] = useState<Record<OccupancyFilter, boolean>>({
    under50: false,
    under30: false,
  })

  const toggleFilter = useCallback((key: keyof FilterState & string) => {
    setFilters((prev) => (typeof prev[key] === 'boolean' ? { ...prev, [key]: !prev[key] } : prev))
  }, [])

  // "Under 30" already implies "under 50"; showing both active would
  // misrepresent what is actually being filtered.
  const toggleCap = useCallback((key: OccupancyFilter) => {
    setCaps((prev) =>
      key === 'under30'
        ? { under50: false, under30: !prev.under30 }
        : { under30: false, under50: !prev.under50 },
    )
  }, [])

  const reset = useCallback(() => {
    setFilters(BASE_FILTERS)
    setCaps({ under50: false, under30: false })
  }, [])

  const effectiveFilters = useMemo(
    () => ({
      ...filters,
      max_occupancy_pct: caps.under30 ? 30 : caps.under50 ? 50 : 100,
    }),
    [filters, caps],
  )

  return {
    effectiveFilters,
    isFilterActive: useCallback((key: keyof FilterState & string) => Boolean(filters[key]), [filters]),
    isCapActive: useCallback((key: OccupancyFilter) => caps[key], [caps]),
    toggleFilter,
    toggleCap,
    reset,
  }
}
