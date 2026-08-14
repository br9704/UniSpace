import type { CampusOverview } from '@/hooks/useCampusOverview'
import { formatHour } from '@/lib/predictionInsights'
import { formatRelativeTime } from '@/lib/relativeTime'
import Card from '../ui/Card'
import SectionLabel from '../SectionLabel'

interface CampusStatusProps {
  overview: CampusOverview
}

function StatRow({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="mono flex justify-between gap-4 text-xs">
      <dt style={{ color: 'var(--color-text-muted)' }}>{label}</dt>
      <dd
        className="text-right"
        style={{ color: accent ? 'var(--color-amber)' : 'var(--color-text-primary)' }}
      >
        {value}
      </dd>
    </div>
  )
}

/**
 * Campus-wide readout.
 *
 * The quietest building is the one accented value — it is the answer to the
 * question the user actually opened the app with. The busiest is reported in
 * plain grey: useful context, not something to draw the eye.
 */
export default function CampusStatus({ overview }: CampusStatusProps) {
  const { items, quietCount, openCount, averagePct, quietest, busiest, peakHourToday, lastUpdated } =
    overview

  const campusIsQuiet = quietCount > items.length / 2

  return (
    <Card variant="elevated" className="flex flex-col gap-4">
      <div>
        <p className="mono text-sm" style={{ color: 'var(--color-text-primary)' }}>
          CAMPUS IS {campusIsQuiet ? 'QUIET' : 'BUSY'}
        </p>
        <p className="mono text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
          {quietCount} of {items.length} buildings under 50%
        </p>
      </div>

      <div style={{ height: 1, backgroundColor: 'var(--color-hairline)' }} />

      <div>
        <SectionLabel className="mb-3">at a glance</SectionLabel>
        <dl className="flex flex-col gap-2">
          <StatRow label="BUILDINGS" value={`${items.length} · ${openCount} OPEN`} />
          {averagePct !== null && <StatRow label="AVG OCCUPANCY" value={`${averagePct}%`} />}
          {quietest && (
            <StatRow
              label="QUIETEST"
              accent
              value={`${quietest.building.short_name || quietest.building.name} · ${Math.round(quietest.occupancy!.pct!)}%`}
            />
          )}
          {busiest && (
            <StatRow
              label="BUSIEST"
              value={`${busiest.building.short_name || busiest.building.name} · ${Math.round(busiest.occupancy!.pct!)}%`}
            />
          )}
          {peakHourToday !== null && (
            <StatRow label="PEAK TODAY" value={formatHour(peakHourToday).toUpperCase()} />
          )}
          {lastUpdated && (
            <StatRow label="UPDATED" value={formatRelativeTime(lastUpdated).toUpperCase()} />
          )}
        </dl>
      </div>
    </Card>
  )
}
