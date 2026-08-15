interface SkeletonProps {
  className?: string
}

/**
 * Loading placeholders, shaped like the content they stand in for.
 *
 * MOTION.md: a 1.6s pulse, and skeleton→content is a cross-fade with no layout
 * shift, so heights are reserved rather than approximated. No spinners — this
 * system never uses them.
 *
 * The pulse is a CSS animation, so `prefers-reduced-motion` in index.css stops
 * it globally without any component needing to know.
 */
function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`rounded-[var(--radius-sm)] ${className}`}
      style={{
        backgroundColor: 'var(--color-hairline)',
        animation: 'unispace-skeleton 1.6s ease-in-out infinite',
      }}
    />
  )
}

export function SkeletonText({ className = '' }: SkeletonProps) {
  return <Skeleton className={`h-4 w-3/4 ${className}`} />
}

export function SkeletonBar({ className = '' }: SkeletonProps) {
  return <Skeleton className={`h-1.5 w-full ${className}`} />
}

export function SkeletonCircle({ className = '' }: SkeletonProps) {
  return <Skeleton className={`h-10 w-10 ${className}`} />
}

/**
 * The three surface shapes, matching Card, BuildingRow and BuildingTile exactly.
 *
 * A placeholder at 20px padding and a 12px radius standing in for content at
 * 24/20, 22/18 or 18/16 moves every edge on screen at the moment the data
 * lands, which is the layout shift MOTION.md's acceptance list forbids. The
 * `--color-occ-none` left stripe reserves the occupancy stripe's width so the
 * card does not narrow by 4px when a real colour arrives — and it is the honest
 * placeholder besides: unknown, not empty.
 */
const SHAPES = {
  panel: { cls: 'p-6 rounded-lg', bg: 'var(--color-surface)', shadow: 'var(--shadow-card)' },
  row: { cls: 'p-[22px] rounded-[var(--radius-row)]', bg: 'var(--color-bg-card)', shadow: 'var(--shadow-tile)' },
  tile: { cls: 'p-[18px] rounded-[var(--radius-tile)]', bg: 'var(--color-bg-card)', shadow: 'var(--shadow-tile)' },
} as const

export function SkeletonPanel({
  shape = 'panel',
  children,
}: { shape?: keyof typeof SHAPES; children: React.ReactNode }) {
  const { cls, bg, shadow } = SHAPES[shape]
  return (
    <div
      className={`w-full ${cls}`}
      style={{
        backgroundColor: bg,
        border: '2px solid var(--border-panel)',
        borderLeft: shape === 'panel' ? undefined : '4px solid var(--color-occ-none)',
        boxShadow: shadow,
      }}
    >
      {children}
    </div>
  )
}

export function SkeletonCard() {
  return (
    <SkeletonPanel shape="tile">
      <SkeletonText className="mb-2.5" />
      <Skeleton className="h-8 w-16 mb-2.5" />
      <SkeletonBar className="mb-2" />
      <SkeletonText className="w-1/2" />
    </SkeletonPanel>
  )
}

export function SkeletonBuildingRow() {
  return (
    <SkeletonPanel shape="row">
      <div className="flex justify-between mb-3 gap-4">
        <div className="flex-1">
          <Skeleton className="h-5 w-2/3 mb-2" />
          <SkeletonText className="w-1/2" />
        </div>
        <Skeleton className="h-6 w-12 shrink-0" />
      </div>
      <SkeletonBar className="mb-2" />
      <SkeletonText className="w-2/3" />
    </SkeletonPanel>
  )
}

export function SkeletonGlanceCard() {
  return (
    <SkeletonPanel>
      {/* Tracks CampusStatus: a 12px dot beside an 18px headline at 6px above
          the sub-line, then 20px gaps around the divider and 14px between the
          stat rows. This card is the one thing certainly above the fold. */}
      <div className="flex items-center gap-2.5 mb-1.5">
        <Skeleton className="h-3 w-3" />
        <Skeleton className="h-5 w-44" />
      </div>
      <Skeleton className="h-3 w-48 mb-5" />
      <Skeleton className="h-px w-full mb-5" />
      <Skeleton className="h-3 w-20 mb-3.5" />
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex justify-between mb-3.5">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-20" />
        </div>
      ))}
    </SkeletonPanel>
  )
}

export default Skeleton
