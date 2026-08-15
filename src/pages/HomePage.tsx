import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { MotionConfig, AnimatePresence, motion } from 'framer-motion'
import { useBuildings } from '@/hooks/useBuildings'
import { useZones } from '@/hooks/useZones'
import { useBlendedOccupancy } from '@/hooks/useBlendedOccupancy'
import { useGeolocation } from '@/hooks/useGeolocation'
import { useFavourites } from '@/hooks/useFavourites'
import { useCampusOverview } from '@/hooks/useCampusOverview'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { schedulePreloadMap } from '@/lib/preloadMap'
import CampusStatus from '@/components/home/CampusStatus'
import TileGrid from '@/components/home/TileGrid'
import AllBuildings from '@/components/home/AllBuildings'
import RoomSearch from '@/components/home/RoomSearch'
import RevealSection from '@/components/home/RevealSection'
import HomeHeader from '@/components/home/HomeHeader'
import HomeSkeleton from '@/components/home/HomeSkeleton'

export default function HomePage() {
  const { buildings } = useBuildings()
  const { zones } = useZones()
  const { occupancyMap, allTypicalRows, isLoading } = useBlendedOccupancy(buildings, zones)
  const { position } = useGeolocation()
  const { favouriteIds, toggle: toggleFavourite, isFavourite } = useFavourites()
  const navigate = useNavigate()
  const prefersReducedMotion = usePrefersReducedMotion()

  const overview = useCampusOverview(buildings, occupancyMap, allTypicalRows, position)

  const favouriteSet = useMemo(() => new Set(favouriteIds), [favouriteIds])
  const favourites = overview.items.filter((item) => favouriteSet.has(item.building.id))

  // Every tile and row on this screen leads to the map, so fetch its chunk
  // once the browser is idle rather than when the user has already tapped.
  useEffect(schedulePreloadMap, [])

  const openBuilding = (id: string) => navigate(`/map?building=${id}`)
  const showSkeletons = isLoading || buildings.length === 0

  const tileProps = {
    isFavourite,
    onToggleFavourite: toggleFavourite,
    onOpen: openBuilding,
  }

  return (
    // A safety net under the per-component gates below: any motion.* added here
    // later inherits reduced motion rather than having to remember to ask.
    <MotionConfig reducedMotion="user">
      <div className="h-full overflow-y-auto" style={{ backgroundColor: 'var(--color-bg)' }}>
        <HomeHeader />

        {/*
          One grid cell holding both states, so the 200ms handover MOTION.md asks
          for is an actual cross-fade: skeleton and content are laid out in the
          same cell at the same time, the container is as tall as the taller of
          the two, and nothing collapses mid-fade. `mode="wait"` would fade out,
          leave a blank frame, then cut — and an absolutely-positioned overlay
          would take the outgoing element out of layout, which is the same
          layout-shift bug wearing a hat.
        */}
        <div className="grid" style={{ gridTemplateAreas: '"stack"' }}>
          <AnimatePresence>
            {showSkeletons && (
              <motion.div
                key="skeleton"
                style={{ gridArea: 'stack' }}
                exit={{ opacity: 0 }}
                // MotionConfig suppresses transforms under reduced motion but
                // leaves opacity running, so the duration is zeroed by hand.
                transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: 'linear' }}
              >
                <HomeSkeleton />
              </motion.div>
            )}
          </AnimatePresence>

          {!showSkeletons && (
            // A grid item establishes its own formatting context, so the section
            // margins below stay inside it instead of collapsing through the top
            // and bottom of the page.
            <div style={{ gridArea: 'stack' }}>
              {/*
                The rhythm, not a metronome: 20px under the header, 20px to
                favourites, then 16px between the sections after them, 24px tail.
                Delays run 0.1 → 0.35 in reading order, the pre-SIGNAL envelope,
                with "filling up" moved 0.3 → 0.25 to make room for RoomSearch,
                which postdates that build and had no delay of its own.
              */}
              <RevealSection
                delay={0.1}
                rise={20}
                className="mx-6 mt-5 flex flex-col md:grid md:grid-cols-[1fr_2fr] gap-5"
              >
                <CampusStatus overview={overview} />
                {/* Three across at md, because this grid sits in the narrower
                    2fr half of the hero pairing. */}
                <TileGrid
                  title="quiet right now"
                  items={overview.quiet}
                  limit={9}
                  columns={3}
                  {...tileProps}
                />
              </RevealSection>

              <RevealSection delay={0.2} className="mx-6 mt-5">
                <TileGrid title="your favourites" items={favourites} {...tileProps} />
              </RevealSection>

              <RevealSection delay={0.25} className="mx-6 mt-4">
                <TileGrid title="filling up" items={overview.filling} {...tileProps} />
              </RevealSection>

              <RevealSection delay={0.3} className="mx-6 mt-4">
                <RoomSearch buildings={buildings} onOpenBuilding={openBuilding} />
              </RevealSection>

              <RevealSection delay={0.35} className="mx-6 mt-4 mb-6">
                <AllBuildings
                  items={overview.items}
                  typicalRows={allTypicalRows}
                  {...tileProps}
                />
              </RevealSection>
            </div>
          )}
        </div>
      </div>
    </MotionConfig>
  )
}
