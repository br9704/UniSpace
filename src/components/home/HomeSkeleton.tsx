import Skeleton, {
  SkeletonPanel,
  SkeletonCard,
  SkeletonBuildingRow,
  SkeletonGlanceCard,
} from '../ui/SkeletonLoader'

/**
 * The home page's loading state, shaped like the home page.
 *
 * HomePage used to inline a glance card, a bare four-tile grid and three loose
 * rows — tiles and rows with no panel around them at all, where the real page
 * puts every one of them inside a panel. The placeholder was not the wrong
 * size, it was the wrong shape, so the handover moved every edge on screen and
 * MOTION.md's "no layout shift on skeleton→content" could not hold.
 *
 * The gutters and gaps below deliberately repeat HomePage's own: mx-6, 20px
 * under the header, 12px inside the grid, 16px between rows. If that rhythm
 * changes there, it has to change here in the same commit.
 */
export default function HomeSkeleton() {
  return (
    <div>
      <div className="mx-6 mt-5 flex flex-col md:grid md:grid-cols-[1fr_2fr] gap-5">
        <SkeletonGlanceCard />
        <SkeletonPanel>
          <Skeleton className="h-3 w-32 mb-4" />
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        </SkeletonPanel>
      </div>

      <div className="mx-6 mt-4 mb-6">
        <SkeletonPanel>
          <Skeleton className="h-3 w-28 mb-3.5" />
          {/* Reserves the 44px search field and the 44px sort pills, which the
              old skeleton did not stand in for at all. */}
          <Skeleton className="h-11 w-full mb-3" />
          <Skeleton className="h-11 w-2/3 mb-3.5" />
          <div className="flex flex-col gap-4">
            {Array.from({ length: 4 }).map((_, i) => <SkeletonBuildingRow key={i} />)}
          </div>
        </SkeletonPanel>
      </div>
    </div>
  )
}
