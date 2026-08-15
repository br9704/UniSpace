import { useState } from 'react'
import type { Building, ReportLevel, NoiseLevel } from '@/types'
import Button from './ui/Button'
import BottomSheet from './ui/BottomSheet'
import ReportLevelPicker from './ReportLevelPicker'
import TerminalLoader from './TerminalLoader'

interface ReportSheetProps {
  building: Building
  canReport: boolean
  isSubmitting: boolean
  /** True once the report has landed, while the acknowledgement holds. */
  confirmed?: boolean
  error: string | null
  onSubmit: (level: ReportLevel, noise?: NoiseLevel) => void
  onDismiss: () => void
}

const LEVELS: { value: ReportLevel; label: string }[] = [
  { value: 1, label: 'Empty' },
  { value: 2, label: 'Quiet' },
  { value: 3, label: 'Moderate' },
  { value: 4, label: 'Busy' },
  { value: 5, label: 'Packed' },
]

const NOISE_LEVELS: { value: NoiseLevel; label: string }[] = [
  { value: 1, label: 'Silent' },
  { value: 2, label: 'Whispers' },
  { value: 3, label: 'Chatter' },
  { value: 4, label: 'Loud' },
  { value: 5, label: 'Very loud' },
]

/**
 * The crowd-report sheet.
 *
 * This is the contribution loop the whole crowdsourced half of the product
 * depends on, so it stays deliberately short: one required choice, one optional
 * one, one action. Noise is hidden until asked for — an optional field shown by
 * default reads as a required one.
 */
export default function ReportSheet({
  building,
  canReport,
  isSubmitting,
  confirmed = false,
  error,
  onSubmit,
  onDismiss,
}: ReportSheetProps) {
  const [level, setLevel] = useState<ReportLevel | null>(null)
  const [noise, setNoise] = useState<NoiseLevel | null>(null)
  const [showNoise, setShowNoise] = useState(false)

  return (
    <BottomSheet label={`Report how busy ${building.short_name ?? building.name} is`} onDismiss={onDismiss}>
        <div className="px-5 pb-6 pt-2">
          <h2 className="mono text-sm tracking-wide" style={{ color: 'var(--color-text-primary)' }}>
            How busy is {building.short_name ?? building.name}?
          </h2>

          {confirmed ? (
            <p className="mono text-sm mt-4" style={{ color: 'var(--color-amber)' }} role="status">
              &gt; thanks — updating&hellip;
            </p>
          ) : !canReport ? (
            <p className="mono text-xs mt-4" style={{ color: 'var(--color-text-secondary)' }}>
              You reported this recently — try again in a few minutes.
            </p>
          ) : (
            <>
              <div className="mt-4">
                <ReportLevelPicker
                  legend="OCCUPANCY"
                  options={LEVELS}
                  value={level}
                  onChange={setLevel}
                />
              </div>

              {showNoise ? (
                <div className="mt-4">
                  <ReportLevelPicker
                    legend="NOISE (OPTIONAL)"
                    options={NOISE_LEVELS}
                    value={noise}
                    onChange={setNoise}
                  />
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowNoise(true)}
                  className="mono text-xs mt-3 min-h-[44px] flex items-center"
                  style={{
                    color: 'var(--color-text-secondary)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  [ + add noise level ]
                </button>
              )}

              {error && (
                <p role="alert" className="mono text-xs mt-3" style={{ color: 'var(--color-amber)' }}>
                  &gt; {error}
                </p>
              )}

              {/*
                MOTION.md calls this the single most important piece of motion
                in the app: the user submits, watches the meter fill, and then
                sees their own report land on the map. That closed loop is what
                makes contributing feel worth doing a second time.
              */}
              <Button
                variant="primary"
                size="lg"
                className="w-full mt-5"
                disabled={!level || isSubmitting}
                onClick={() => level && onSubmit(level, noise ?? undefined)}
              >
                {isSubmitting ? (
                  <TerminalLoader width={12} durationMs={600} label="Submitting your report" />
                ) : (
                  'SUBMIT REPORT'
                )}
              </Button>
            </>
          )}
        </div>
    </BottomSheet>
  )
}
