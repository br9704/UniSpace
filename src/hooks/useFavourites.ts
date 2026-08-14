import { useCallback, useMemo, useState } from 'react'
import { readFavourites, toggleFavourite, writeFavourites } from '@/lib/localStore'

interface UseFavouritesReturn {
  favouriteIds: string[]
  toggle: (buildingId: string) => void
  isFavourite: (buildingId: string) => boolean
}

/**
 * Favourite buildings, stored on the device only.
 *
 * No account, no server record — PRD § 13.1 makes that a product guarantee
 * rather than an implementation detail. The storage logic lives in
 * `lib/localStore.ts` so it can be tested as pure functions, including the
 * migration from the app's former name.
 */
export function useFavourites(): UseFavouritesReturn {
  const [favouriteIds, setFavouriteIds] = useState<string[]>(readFavourites)

  const favouriteSet = useMemo(() => new Set(favouriteIds), [favouriteIds])

  const toggle = useCallback((buildingId: string) => {
    setFavouriteIds((previous) => {
      const next = toggleFavourite(previous, buildingId)
      writeFavourites(next)
      return next
    })
  }, [])

  const isFavourite = useCallback(
    (buildingId: string) => favouriteSet.has(buildingId),
    [favouriteSet],
  )

  return { favouriteIds, toggle, isFavourite }
}
