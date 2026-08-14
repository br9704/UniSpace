import type { DataQuality } from '@/types'

export type ConfidenceTier = 'high' | 'medium' | 'low'

export interface ConfidenceTreatment {
  tier: ConfidenceTier
  /** Map fill opacity. MOTION.md: full / 70% / 40%. */
  opacity: number
  /** Only high-confidence zones breathe. */
  breathes: boolean
  /** Only high confidence earns the green live dot. */
  isLive: boolean
  /** Short qualifier shown beside the reading; empty when none is warranted. */
  qualifier: string
  /** Low-confidence surfaces get a dashed border. */
  borderStyle: 'solid' | 'dashed'
}

/**
 * Maps a data source to its visual treatment.
 *
 * MOTION.md makes confidence a visual state rather than a footnote, because
 * blended occupancy varies enormously in trustworthiness and a thin estimate
 * rendered like a measurement is actively misleading. The three tiers:
 *
 *   high   — live broadcasts or fresh crowd reports: full intensity, breathing,
 *            green `● LIVE`
 *   medium — modelled estimates: 70% intensity, no breathing, `~ estimated`
 *   low    — stale or absent: 40% intensity, dashed border, no claim made
 *
 * Centralised so every surface agrees. The map, the cards and the recommendation
 * rows previously each decided for themselves what "google" meant, which is how
 * an estimate came to be rendered identically to a live reading.
 */
export function getConfidence(source: DataQuality): ConfidenceTreatment {
  switch (source) {
    case 'live':
    case 'crowd-report':
      return {
        tier: 'high',
        opacity: 1,
        breathes: true,
        isLive: true,
        qualifier: '',
        borderStyle: 'solid',
      }

    case 'google':
    case 'predicted':
      return {
        tier: 'medium',
        opacity: 0.7,
        breathes: false,
        isLive: false,
        qualifier: '~ estimated',
        borderStyle: 'solid',
      }

    case 'stale':
    case 'none':
    default:
      return {
        tier: 'low',
        opacity: 0.4,
        breathes: false,
        isLive: false,
        qualifier: 'no recent data',
        borderStyle: 'dashed',
      }
  }
}
