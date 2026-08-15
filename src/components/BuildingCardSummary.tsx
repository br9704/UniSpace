import type { BlendedOccupancy, Building } from '@/types'
import { isOpenNow, openStatusLabel } from '@/lib/buildingHours'
import { BUILDING_META } from '@/constants/buildingMeta'
import { getActiveAmenities } from '@/lib/amenityHelpers'
import AccessibilityPanel from './AccessibilityPanel'
import { formatRelativeTime } from '@/lib/relativeTime'
import Card from './ui/Card'
import { getConfidence } from '@/lib/confidence'
import SectionLabel from './SectionLabel'
import StatusDot from './ui/StatusDot'
import OccupancyBar from './OccupancyBar'
import OccupancyBadge from './OccupancyBadge'
import TrendArrow from './TrendArrow'
import DataSourceBadge from './DataSourceBadge'
import NoiseIndicator from './NoiseIndicator'
import OccupancyAnnouncer from './OccupancyAnnouncer'

interface BuildingCardSummaryProps {
  building: Building
  occupancy: BlendedOccupancy | null
  noiseLevel?: number | null
  noiseCount?: number
}

/**
 * Identity and current reading — everything a user needs before deciding
 * whether to read further.
 *
 * The source badge sits directly beneath the number rather than at the bottom
 * of the sheet, because "38%" and "how much we trust 38%" are one piece of
 * information, not two.
 */
export default function BuildingCardSummary({
  building,
  occupancy,
  noiseLevel,
  noiseCount,
}: BuildingCardSummaryProps) {
  const status = isOpenNow(building)
  const meta = BUILDING_META[building.slug]
  const amenities = getActiveAmenities(building)
  const pct = occupancy?.pct ?? null
  // Low-confidence readings get a dashed edge, per MOTION.md's three tiers, so
  // a stale number never presents itself with the same authority as a live one.
  const confidence = getConfidence(occupancy?.source ?? 'none')

  return (
    <>
      <Card>
        <h2 className="text-xl" style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>
          {building.name}
        </h2>
        <p className="mono text-xs mt-1.5" style={{ color: 'var(--color-text-muted)' }}>
          {meta?.address ?? 'University of Melbourne — Parkville'}
        </p>
        {meta?.description && (
          <p
            className="text-sm mt-3"
            style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}
          >
            {meta.description}
          </p>
        )}
      </Card>

      <Card style={{ borderStyle: confidence.borderStyle }}>
        <OccupancyAnnouncer buildingName={building.name} occupancy={occupancy} />
        <div className="flex items-baseline justify-between gap-3 mb-2">
          <OccupancyBadge pct={pct} source={occupancy?.source} />
          <TrendArrow trend={occupancy?.trend ?? 'stable'} />
        </div>

        <OccupancyBar pct={pct} height={6} />

        <div className="flex flex-wrap items-center gap-2 mt-3">
          {occupancy && <DataSourceBadge source={occupancy.source} />}
          {occupancy?.last_updated && (
            <span className="mono text-xs" style={{ color: 'var(--color-text-muted)' }}>
              {formatRelativeTime(occupancy.last_updated)}
            </span>
          )}
        </div>

        {noiseLevel != null && noiseCount != null && noiseCount > 0 && (
          <div className="mt-3">
            <NoiseIndicator level={noiseLevel} count={noiseCount} />
          </div>
        )}
      </Card>

      <Card>
        <div className="flex items-center gap-2">
          <StatusDot open={status.open} verified={status.verified} />
          <span className="mono text-xs" style={{ color: 'var(--color-text-secondary)' }}>
            {openStatusLabel(status, true)}
          </span>
        </div>
        {/*
          The provenance, in the one place someone is deciding whether to walk
          there. Verified hours still carry a caveat worth reading — they come
          from a current-week table — and unverified ones say so plainly rather
          than hiding behind a confident dot.
        */}
        <p className="mono text-xs mt-2" style={{ color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
          {building.hours_period
            ? `> ${building.hours_period}`
            : '> No published source for this building’s hours. The times behind this are an estimate, not a fact — check before you travel.'}
        </p>
        {building.estimated_capacity && (
          // "~" is doing real work: capacities are directional estimates, and
          // PRD § 15 is explicit that they must never be presented as precise.
          <p className="mono text-xs mt-2" style={{ color: 'var(--color-text-muted)' }}>
            CAPACITY ~{building.estimated_capacity}
          </p>
        )}
      </Card>

      <AccessibilityPanel building={building} />

      {amenities.length > 0 && (
        <Card>
          <SectionLabel className="mb-3">amenities</SectionLabel>
          <ul className="flex flex-wrap gap-1.5">
            {amenities.map((amenity) => (
              <li
                key={amenity.label}
                className="mono text-xs px-2 py-1"
                style={{
                  border: '1px solid var(--color-hairline)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                {amenity.label}
              </li>
            ))}
          </ul>
        </Card>
      )}
    </>
  )
}
