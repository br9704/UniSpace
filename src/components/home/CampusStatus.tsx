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
    // 13px with the value at weight 600, the pre-SIGNAL StatRow. At 11px and a
    // uniform weight, six of these read as a dense table rather than six facts.
    <div className="mono flex justify-between gap-4 text-sm">
      <dt style={{ color: 'var(--color-text-muted)' }}>{label}</dt>
      <dd
        className="text-right font-semibold"
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
  const { items, quietCount, openCount, verifiedHoursCount, averagePct, quietest, busiest, peakHourToday, lastUpdated } =
    overview

  const campusIsQuiet = quietCount > items.length / 2

  // Mark aggregates as approximate whenever nothing underneath them is observed.
  // With no live counts and no crowd reports, every percentage here is derived
  // from a modelled weekly curve, and BuildingRow already writes those as
  // "~ USUALLY n% NOW". Printing a bare "63%" campus-wide claimed a precision
  // the same data was hedged about one component away.
  const isObserved = (source: string) => source === 'live' || source === 'crowd-report'
  const approx = items.some((item) => item.occupancy && isObserved(item.occupancy.source))
    ? ''
    : '~'

  return (
    // 20px between the three blocks. This card carries the answer to the
    // question the app exists to answer; it should breathe more than the grids
    // below it, not the same.
    <Card variant="elevated" className="flex flex-col gap-5">
      <div>
        {/*
          The 12px dot with its own glow is how the pre-SIGNAL build opened this
          card, and it is the page's only chromatic headline. Decorative and
          aria-hidden — the sentence beside it already says the state, so the
          colour adds nothing a screen reader needs. Both glows are existing
          tokens that had no consumers.
        */}
        <div className="flex items-center gap-2.5" style={{ marginBottom: 6 }}>
          <span
            aria-hidden="true"
            className="shrink-0"
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: campusIsQuiet ? 'var(--color-live)' : 'var(--color-occ-moderate)',
              boxShadow: campusIsQuiet ? 'var(--glow-live)' : 'var(--glow-gold)',
            }}
          />
          <p className="mono text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>
            CAMPUS IS {campusIsQuiet ? 'QUIET' : 'BUSY'}
          </p>
        </div>
        <p className="mono text-sm leading-[1.5]" style={{ color: 'var(--color-text-muted)' }}>
          {quietCount} of {items.length} buildings under 50%
        </p>
      </div>

      <div style={{ height: 1, backgroundColor: 'var(--color-hairline)' }} />

      <div>
        {/* The stat stack was one flex column at gap 14 in the pre-SIGNAL
            build, with this heading as its first child — so both intervals are
            14, not 12 and 8. */}
        <SectionLabel className="mb-3.5">at a glance</SectionLabel>
        <dl className="flex flex-col gap-3.5">
          <StatRow
            label="BUILDINGS"
            // "n OPEN" alone implied the remainder were closed. Only
            // verifiedHoursCount buildings publish hours at all, so the open
            // count is reported against that denominator rather than the 18.
            value={`${items.length} · ${openCount}/${verifiedHoursCount} OPEN`}
          />
          {averagePct !== null && <StatRow label="AVG OCCUPANCY" value={`${approx}${averagePct}%`} />}
          {quietest && (
            <StatRow
              label="QUIETEST"
              accent
              value={`${quietest.building.short_name || quietest.building.name} · ${approx}${Math.round(quietest.occupancy!.pct!)}%`}
            />
          )}
          {busiest && (
            <StatRow
              label="BUSIEST"
              value={`${busiest.building.short_name || busiest.building.name} · ${approx}${Math.round(busiest.occupancy!.pct!)}%`}
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
