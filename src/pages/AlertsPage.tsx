import { useWebPush } from '@/hooks/useWebPush'
import { useAlerts } from '@/hooks/useAlerts'
import { useBuildings } from '@/hooks/useBuildings'
import { isFixtureMode } from '@/lib/dataSource'
import AlertsList from '@/components/more/AlertsList'
import FaqAccordion from '@/components/more/FaqAccordion'
import Card from '@/components/ui/Card'
import SectionLabel from '@/components/SectionLabel'

export default function AlertsPage() {
  const { isSupported, permission, subscription, subscribe } = useWebPush()
  const { alerts, deleteAlert } = useAlerts(subscription)
  const { buildings } = useBuildings()

  return (
    <div className="h-full overflow-y-auto" style={{ backgroundColor: 'var(--color-bg)' }}>
      <header className="px-4 pt-10 pb-6">
        <h1 className="mono text-xl tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
          ~/more
        </h1>
        <p className="mono text-xs mt-2" style={{ color: 'var(--color-text-muted)' }}>
          Alerts, FAQ and about
        </p>
      </header>

      <div className="flex flex-col gap-3 px-4 pb-8">
        <AlertsList
          alerts={alerts}
          buildings={buildings}
          isSupported={isSupported}
          permission={permission}
          onEnable={() => { void subscribe() }}
          onDelete={(id) => { void deleteAlert(id) }}
        />

        <div>
          <SectionLabel className="mb-3">faq</SectionLabel>
          <FaqAccordion />
        </div>

        <Card variant="elevated">
          <SectionLabel className="mb-3">about</SectionLabel>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.65 }}>
            UniSpace shows how busy campus buildings are, so you can choose one before walking
            across campus. Live counts need people sharing occupancy; until they do, it falls back
            to typical patterns and labels every number with where it came from.
          </p>
          <p className="mono text-xs mt-4" style={{ color: 'var(--color-text-muted)' }}>
            v0.1.0 · BUILT BY BRUNO JAAMAA
          </p>
          {isFixtureMode && (
            // Never let a demo be mistaken for the real thing. If the app is
            // reading local fixtures rather than a live backend, it says so.
            <p className="mono text-xs mt-2" style={{ color: 'var(--color-amber)' }}>
              &gt; RUNNING ON LOCAL FIXTURE DATA — NOT LIVE
            </p>
          )}
        </Card>
      </div>
    </div>
  )
}
