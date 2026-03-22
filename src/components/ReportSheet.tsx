import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Building, ReportLevel, NoiseLevel } from '@/types'
import { OCCUPANCY_COLOURS } from '@/constants/occupancy'
import Button from './ui/Button'

interface ReportSheetProps {
  building: Building
  canReport: boolean
  isSubmitting: boolean
  error: string | null
  onSubmit: (level: ReportLevel, noise?: NoiseLevel) => void
  onDismiss: () => void
}

const LEVELS: { value: ReportLevel; label: string; color: string }[] = [
  { value: 1, label: 'Empty', color: OCCUPANCY_COLOURS.empty },
  { value: 2, label: 'Quiet', color: OCCUPANCY_COLOURS.quiet },
  { value: 3, label: 'Moderate', color: OCCUPANCY_COLOURS.moderate },
  { value: 4, label: 'Busy', color: OCCUPANCY_COLOURS.busy },
  { value: 5, label: 'Packed', color: OCCUPANCY_COLOURS.packed },
]

const NOISE_LEVELS: { value: NoiseLevel; label: string }[] = [
  { value: 1, label: 'Silent' },
  { value: 2, label: 'Whispers' },
  { value: 3, label: 'Chatter' },
  { value: 4, label: 'Loud' },
  { value: 5, label: 'Very Loud' },
]

const SPRING = { type: 'spring' as const, stiffness: 280, damping: 28 }

export default function ReportSheet({
  building,
  canReport,
  isSubmitting,
  error,
  onSubmit,
  onDismiss,
}: ReportSheetProps) {
  const [selectedLevel, setSelectedLevel] = useState<ReportLevel | null>(null)
  const [selectedNoise, setSelectedNoise] = useState<NoiseLevel | null>(null)
  const [showNoise, setShowNoise] = useState(false)

  function handleSubmit() {
    if (!selectedLevel) return
    onSubmit(selectedLevel, selectedNoise ?? undefined)
  }

  return (
    <>
      <motion.div
        className="fixed inset-0 z-[95]"
        style={{ backgroundColor: 'var(--color-bg-overlay)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onDismiss}
      />

      <motion.div
        className="fixed left-0 right-0 bottom-0 z-[100] max-w-[420px] mx-auto"
        style={{
          backgroundColor: 'var(--color-bg-elevated)',
          borderTopLeftRadius: 'var(--radius-lg)',
          borderTopRightRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-elevated)',
        }}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={SPRING}
      >
        <div className="flex items-center justify-center pt-3 pb-2">
          <div className="w-9 h-1 rounded-full bg-[var(--color-border-bright)]" />
        </div>

        <div className="px-5 pb-6">
          <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
            How busy is {building.short_name ?? building.name}?
          </h3>

          {!canReport ? (
            <p className="text-sm text-[var(--color-text-secondary)] mt-3">
              You already reported recently. Try again in a few minutes.
            </p>
          ) : (
            <>
              <div className="flex gap-2 mt-4">
                {LEVELS.map(({ value, label, color }) => (
                  <button
                    key={value}
                    onClick={() => setSelectedLevel(value)}
                    className="flex-1 flex flex-col items-center gap-1.5 py-2.5 rounded-xl transition-all min-h-[44px]"
                    style={{
                      backgroundColor: selectedLevel === value ? 'var(--color-uom-navy)' : 'var(--color-bg-chip)',
                      color: selectedLevel === value ? '#fff' : 'var(--color-text-secondary)',
                    }}
                  >
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-[11px] font-medium">{label}</span>
                  </button>
                ))}
              </div>

              {!showNoise ? (
                <button
                  onClick={() => setShowNoise(true)}
                  className="text-xs text-[var(--color-text-accent)] mt-3 underline"
                >
                  + Add noise level (optional)
                </button>
              ) : (
                <div className="mt-4">
                  <p className="text-xs text-[var(--color-text-secondary)] mb-2">Noise level</p>
                  <div className="flex gap-2">
                    {NOISE_LEVELS.map(({ value, label }) => (
                      <button
                        key={value}
                        onClick={() => setSelectedNoise(value)}
                        className="flex-1 py-2 rounded-lg text-[11px] font-medium transition-all min-h-[44px]"
                        style={{
                          backgroundColor: selectedNoise === value ? 'var(--color-uom-navy)' : 'var(--color-bg-chip)',
                          color: selectedNoise === value ? '#fff' : 'var(--color-text-secondary)',
                        }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {error && (
                <p className="text-xs text-red-400 mt-3">{error}</p>
              )}

              <Button
                variant="primary"
                size="lg"
                className="w-full mt-5"
                disabled={!selectedLevel || isSubmitting}
                onClick={handleSubmit}
              >
                {isSubmitting ? 'Submitting…' : 'Submit Report'}
              </Button>
            </>
          )}
        </div>
      </motion.div>
    </>
  )
}
