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

function SkeletonPanel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="w-full p-5 rounded-[var(--radius-md)]"
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-hairline)',
      }}
    >
      {children}
    </div>
  )
}

export function SkeletonCard() {
  return (
    <SkeletonPanel>
      <SkeletonText className="mb-3" />
      <Skeleton className="h-7 w-16 mb-3" />
      <SkeletonBar className="mb-2" />
      <SkeletonText className="w-1/2" />
    </SkeletonPanel>
  )
}

export function SkeletonBuildingRow() {
  return (
    <SkeletonPanel>
      <div className="flex justify-between mb-3 gap-4">
        <div className="flex-1">
          <SkeletonText className="mb-2" />
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
      <div className="flex items-center gap-2.5 mb-4">
        <Skeleton className="h-2 w-2" />
        <Skeleton className="h-4 w-40" />
      </div>
      <Skeleton className="h-3 w-48 mb-4" />
      <Skeleton className="h-px w-full mb-4" />
      <Skeleton className="h-3 w-20 mb-4" />
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex justify-between mb-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-20" />
        </div>
      ))}
    </SkeletonPanel>
  )
}

export default Skeleton
