import type { BlendedOccupancy } from '@/types'
import { getConfidence } from '@/lib/confidence'
import TypedLine from './TypedLine'

interface ColdStartNoticeProps {
  occupancyMap: Map<string, BlendedOccupancy>
}

/**
 * Explains the map when nothing on it is live.
 *
 * MOTION.md: "The cold-start screen is a first-class design. Zero users must not
 * look broken." This is the state a campus occupancy app spends its entire first
 * week in, and possibly longer — a heatmap full of estimates with no explanation
 * looks like stale data or a bug, when in fact it is the system working exactly
 * as designed and being honest about what it knows.
 *
 * Renders nothing once any building has live data, because at that point the
 * `● LIVE` indicators say it better.
 */
export default function ColdStartNotice({ occupancyMap }: ColdStartNoticeProps) {
  const hasLive = [...occupancyMap.values()].some((o) => getConfidence(o.source).breathes)
  if (hasLive || occupancyMap.size === 0) return null

  return (
    <div
      className="absolute left-0 right-0 flex justify-center px-4"
      style={{ top: 64, zIndex: 40, pointerEvents: 'none' }}
    >
      <p
        className="text-xs px-2.5 py-1.5"
        style={{
          backgroundColor: 'var(--color-bg)',
          border: '1px solid var(--color-hairline)',
          color: 'var(--color-text-secondary)',
        }}
      >
        <TypedLine text="~ estimated from typical campus patterns" />
      </p>
    </div>
  )
}
