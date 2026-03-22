interface SkeletonProps {
  className?: string
}

function Skeleton({ className = '' }: SkeletonProps) {
  return <div className={`animate-pulse rounded-md bg-[var(--color-border)] ${className}`} />
}

export function SkeletonText({ className = '' }: SkeletonProps) {
  return <Skeleton className={`h-4 w-3/4 ${className}`} />
}

export function SkeletonBar({ className = '' }: SkeletonProps) {
  return <Skeleton className={`h-2 w-full rounded-full ${className}`} />
}

export function SkeletonCircle({ className = '' }: SkeletonProps) {
  return <Skeleton className={`h-10 w-10 rounded-full ${className}`} />
}

export function SkeletonCard() {
  return (
    <div className="p-[18px] rounded-[16px] bg-[var(--color-bg-card)] border border-[var(--color-border)] w-full">
      <SkeletonText className="mb-3" />
      <Skeleton className="h-8 w-16 mb-3" />
      <SkeletonBar className="mb-2" />
      <SkeletonText className="w-1/2" />
    </div>
  )
}

export function SkeletonBuildingRow() {
  return (
    <div className="p-5 rounded-[18px] bg-[var(--color-bg-card)] border border-[var(--color-border)]">
      <div className="flex justify-between mb-3">
        <div className="flex-1">
          <SkeletonText className="mb-2" />
          <SkeletonText className="w-1/2" />
        </div>
        <Skeleton className="h-7 w-12 shrink-0" />
      </div>
      <SkeletonBar className="mb-2" />
      <SkeletonText className="w-2/3" />
    </div>
  )
}

export default Skeleton
