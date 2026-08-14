import type { Building } from '@/types'
import { getAccessibilityFacts, isAccessibilityUnverified } from '@/lib/amenityHelpers'
import Card from './ui/Card'
import SectionLabel from './SectionLabel'

interface AccessibilityPanelProps {
  building: Building
}

const MARK: Record<string, { glyph: string; colour: string; spoken: string }> = {
  yes:        { glyph: '[x]', colour: 'var(--color-live)',          spoken: 'yes' },
  no:         { glyph: '[ ]', colour: 'var(--color-text-muted)',    spoken: 'no' },
  unverified: { glyph: '[?]', colour: 'var(--color-text-muted)',    spoken: 'not verified' },
}

/**
 * Accessibility, reported with its verification state.
 *
 * PRD § 13.4: "Incorrect data is harmful." This panel exists because the
 * previous UI folded accessibility into a row of amenity chips, where a missing
 * chip was indistinguishable from a fact nobody had checked — and every one of
 * those flags was invented.
 *
 * So there are three states, not two. `[?]` is not a failure of the product; it
 * is the honest answer for most buildings on this campus right now, and it
 * tells someone to ring ahead rather than making the trip on our word.
 */
export default function AccessibilityPanel({ building }: AccessibilityPanelProps) {
  const facts = getAccessibilityFacts(building)
  const allUnverified = isAccessibilityUnverified(building)

  return (
    <Card style={{ borderStyle: allUnverified ? 'dashed' : 'solid' }}>
      <SectionLabel className="mb-3">accessibility</SectionLabel>

      <ul className="flex flex-col gap-1.5">
        {facts.map(({ label, state }) => {
          const mark = MARK[state]
          return (
            <li key={label} className="mono flex items-center gap-2 text-xs">
              <span aria-hidden="true" style={{ color: mark.colour }}>{mark.glyph}</span>
              <span style={{ color: 'var(--color-text-secondary)' }}>{label}</span>
              <span className="sr-only">: {mark.spoken}</span>
            </li>
          )
        })}
      </ul>

      <p className="mono text-xs mt-3" style={{ color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
        {allUnverified
          ? '> Not yet verified for this building. Please check with the University before relying on it.'
          : '> Verified against UoM’s published accessibility guide. Entrances can differ from the main door — check before you travel.'}
      </p>
    </Card>
  )
}
