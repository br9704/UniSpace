import { useCallback, useMemo, useState } from 'react'

const STORAGE_KEY = 'pulse_favourites'

function readFavourites(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

interface UseFavouritesReturn {
  favouriteIds: string[]
  toggle: (buildingId: string) => void
  isFavourite: (buildingId: string) => boolean
}

export function useFavourites(): UseFavouritesReturn {
  const [favouriteIds, setFavouriteIds] = useState<string[]>(readFavourites)

  const favouriteSet = useMemo(() => new Set(favouriteIds), [favouriteIds])

  const toggle = useCallback((buildingId: string) => {
    setFavouriteIds((prev) => {
      const next = prev.includes(buildingId)
        ? prev.filter((id) => id !== buildingId)
        : [...prev, buildingId]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const isFavourite = useCallback(
    (buildingId: string) => favouriteSet.has(buildingId),
    [favouriteSet],
  )

  return { favouriteIds, toggle, isFavourite }
}
