import { useState } from 'react'
import { motion } from 'framer-motion'
import type { FeedbackCategory } from '@/types'
import { useFeedbackSubmit } from '@/hooks/useFeedbackSubmit'
import Button from './ui/Button'
import TerminalLoader from './TerminalLoader'

interface FeedbackSheetProps {
  buildingId: string | null
  buildingName: string
  onDismiss: () => void
}

/**
 * Categories, ordered by consequence rather than alphabetically.
 *
 * Accessibility is first deliberately. PRD § 13.4 singles it out: wrong
 * accessibility data is harmful, not merely inaccurate, because someone acts on
 * it and pays for the mistake in a way other users do not.
 */
const CATEGORIES: { value: FeedbackCategory; label: string }[] = [
  { value: 'accessibility_wrong', label: 'Accessibility info is wrong' },
  { value: 'hours_wrong', label: 'Opening hours are wrong' },
  { value: 'amenity_wrong', label: 'Amenities are wrong' },
  { value: 'occupancy_wrong', label: 'Occupancy looks wrong' },
  { value: 'other', label: 'Something else' },
]

const MAX_MESSAGE = 500

/** Report that something here is wrong. Anonymous, and short by design. */
export default function FeedbackSheet({
  buildingId,
  buildingName,
  onDismiss,
}: FeedbackSheetProps) {
  const { submit, isSubmitting, error } = useFeedbackSubmit()
  const [category, setCategory] = useState<FeedbackCategory | null>(null)
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  async function handleSubmit() {
    if (!category) return
    const ok = await submit(buildingId, category, message)
    if (!ok) return
    setSent(true)
    setTimeout(onDismiss, 1400)
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
        role="dialog"
        aria-label={`Report incorrect information about ${buildingName}`}
        className="fixed left-0 right-0 bottom-0 z-[100] max-w-[420px] mx-auto"
        style={{
          backgroundColor: 'var(--color-bg)',
          borderTop: '1px solid var(--color-steel)',
        }}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="px-5 py-5">
          <h2 className="mono text-sm tracking-wide" style={{ color: 'var(--color-text-primary)' }}>
            &gt; REPORT AN ERROR
          </h2>

          {sent ? (
            <p className="mono text-sm mt-4" style={{ color: 'var(--color-amber)' }} role="status">
              &gt; thanks — we&rsquo;ll check it
            </p>
          ) : (
            <>
              <fieldset className="mt-4">
                <legend className="mono text-xs mb-2" style={{ color: 'var(--color-text-muted)' }}>
                  WHAT&rsquo;S WRONG?
                </legend>
                <div className="flex flex-col gap-1.5" role="radiogroup" aria-label="What is wrong?">
                  {CATEGORIES.map(({ value, label }) => {
                    const selected = category === value
                    return (
                      <button
                        key={value}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => setCategory(value)}
                        className="mono flex items-center gap-2 text-xs text-left px-3"
                        style={{
                          minHeight: 44,
                          background: 'none',
                          border: `1px solid ${selected ? 'var(--color-amber)' : 'var(--color-hairline)'}`,
                          borderRadius: 'var(--radius-md)',
                          color: selected ? 'var(--color-amber)' : 'var(--color-text-secondary)',
                          cursor: 'pointer',
                        }}
                      >
                        <span aria-hidden="true">{selected ? '[x]' : '[ ]'}</span>
                        {label}
                      </button>
                    )
                  })}
                </div>
              </fieldset>

              <label
                htmlFor="feedback-message"
                className="mono text-xs block mt-4 mb-2"
                style={{ color: 'var(--color-text-muted)' }}
              >
                DETAILS (OPTIONAL)
              </label>
              <textarea
                id="feedback-message"
                value={message}
                maxLength={MAX_MESSAGE}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="mono w-full text-xs p-3"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-hairline)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--color-text-primary)',
                  outline: 'none',
                  resize: 'none',
                }}
              />

              {error && (
                <p role="alert" className="mono text-xs mt-2" style={{ color: 'var(--color-amber)' }}>
                  &gt; {error}
                </p>
              )}

              <Button
                variant="primary"
                size="lg"
                className="w-full mt-4"
                disabled={!category || isSubmitting}
                onClick={handleSubmit}
              >
                {isSubmitting ? <TerminalLoader width={12} label="Sending" /> : 'SEND REPORT'}
              </Button>

              <p className="mono text-xs mt-3" style={{ color: 'var(--color-text-muted)' }}>
                Anonymous. Nothing identifying you is sent or stored.
              </p>
            </>
          )}
        </div>
      </motion.div>
    </>
  )
}
