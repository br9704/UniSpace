import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBuildings } from '@/hooks/useBuildings'
import { useZones } from '@/hooks/useZones'
import { useBlendedOccupancy } from '@/hooks/useBlendedOccupancy'
import { useGeolocation } from '@/hooks/useGeolocation'
import { useFavourites } from '@/hooks/useFavourites'
import { useCampusOverview } from '@/hooks/useCampusOverview'
import { schedulePreloadMap } from '@/lib/preloadMap'
import CampusStatus from '@/components/home/CampusStatus'
import TileGrid from '@/components/home/TileGrid'
import AllBuildings from '@/components/home/AllBuildings'
import RoomSearch from '@/components/home/RoomSearch'
import { SkeletonCard, SkeletonBuildingRow, SkeletonGlanceCard } from '@/components/ui/SkeletonLoader'

function greeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'good morning'
  if (hour < 17) return 'good afternoon'
  return 'good evening'
}

export default function HomePage() {
  const { buildings } = useBuildings()
  const { zones } = useZones()
  const { occupancyMap, allTypicalRows, isLoading } = useBlendedOccupancy(buildings, zones)
  const { position } = useGeolocation()
  const { favouriteIds, toggle: toggleFavourite, isFavourite } = useFavourites()
  const navigate = useNavigate()

  const overview = useCampusOverview(buildings, occupancyMap, allTypicalRows, position)

  const favouriteSet = useMemo(() => new Set(favouriteIds), [favouriteIds])
  const favourites = overview.items.filter((item) => favouriteSet.has(item.building.id))

  // Every tile and row on this screen leads to the map, so fetch its chunk
  // once the browser is idle rather than when the user has already tapped.
  useEffect(schedulePreloadMap, [])

  const openBuilding = (id: string) => navigate(`/map?building=${id}`)
  const showSkeletons = isLoading || buildings.length === 0

  return (
    <div className="h-full overflow-y-auto" style={{ backgroundColor: 'var(--color-bg)' }}>
      <header className="px-4 pt-10 pb-6">
        <p className="mono text-xs" style={{ color: 'var(--color-text-muted)' }}>
          &gt; {greeting()}
        </p>
        <h1
          className="mono text-2xl mt-1 tracking-tight"
          style={{ color: 'var(--color-text-primary)' }}
        >
          UNISPACE
        </h1>
        <p className="mono text-xs mt-2" style={{ color: 'var(--color-text-secondary)' }}>
          University of Melbourne · Parkville
        </p>
        {/* Stated plainly and kept visible — the UoM name appears throughout, and
            a reader should never have to wonder whether this is official. */}
        <p className="mono text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
          Not affiliated with the University of Melbourne
        </p>
      </header>

      <div className="flex flex-col gap-3 px-4 pb-8">
        {showSkeletons ? (
          <>
            <SkeletonGlanceCard />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
            {Array.from({ length: 3 }).map((_, i) => <SkeletonBuildingRow key={i} />)}
          </>
        ) : (
          <>
            <CampusStatus overview={overview} />

            <TileGrid
              title="quiet right now"
              items={overview.quiet}
              limit={9}
              isFavourite={isFavourite}
              onToggleFavourite={toggleFavourite}
              onOpen={openBuilding}
            />

            <TileGrid
              title="your favourites"
              items={favourites}
              isFavourite={isFavourite}
              onToggleFavourite={toggleFavourite}
              onOpen={openBuilding}
            />

            <TileGrid
              title="filling up"
              items={overview.filling}
              isFavourite={isFavourite}
              onToggleFavourite={toggleFavourite}
              onOpen={openBuilding}
            />

            <RoomSearch buildings={buildings} onOpenBuilding={openBuilding} />

            <AllBuildings
              items={overview.items}
              typicalRows={allTypicalRows}
              isFavourite={isFavourite}
              onToggleFavourite={toggleFavourite}
              onOpen={openBuilding}
            />
          </>
        )}
      </div>
    </div>
  )
}
