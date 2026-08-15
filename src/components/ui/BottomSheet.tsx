import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useDismissOnEscape } from '@/hooks/useDismissOnEscape'

interface BottomSheetProps {
  /** Names the dialog for assistive technology. Required, not optional. */
  label: string
  onDismiss: () => void
  children: ReactNode
}

/** Ease-out, 280ms. No spring anywhere in this system. */
const TRANSITION = { duration: 0.28, ease: [0.16, 1, 0.3, 1] as const }

/**
 * A dismissible sheet from the bottom of the screen.
 *
 * Extracted because the report and feedback sheets had drifted into two copies
 * of the same overlay, motion config, dialog semantics and drag handle — the
 * kind of duplication where one copy quietly gains an accessibility fix the
 * other never does.
 */
export default function BottomSheet({ label, onDismiss, children }: BottomSheetProps) {
  useDismissOnEscape(onDismiss)

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
        aria-modal="true"
        aria-label={label}
        className="fixed left-0 right-0 bottom-0 z-[100] max-w-[420px] mx-auto"
        style={{
          backgroundColor: 'var(--color-bg)',
          borderTop: '1px solid var(--color-steel)',
        }}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={TRANSITION}
      >
        <div className="flex items-center justify-center pt-3 pb-1">
          <div aria-hidden="true" style={{ width: 32, height: 2, backgroundColor: 'var(--color-steel)' }} />
        </div>
        {children}
      </motion.div>
    </>
  )
}
