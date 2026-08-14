import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FAQ } from '@/constants/faq'

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <li
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-hairline)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
      }}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex items-start justify-between gap-3 w-full text-left px-4"
        style={{
          minHeight: 52, paddingBlock: 14,
          background: 'none', border: 'none', cursor: 'pointer',
        }}
      >
        <span className="text-sm" style={{ color: 'var(--color-text-primary)', lineHeight: 1.4 }}>
          {question}
        </span>
        <span
          aria-hidden="true"
          className="mono shrink-0"
          style={{ color: 'var(--color-text-dim)' }}
        >
          {open ? '−' : '+'}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{ overflow: 'hidden' }}
          >
            <p
              className="text-sm px-4 pb-4"
              style={{ color: 'var(--color-text-secondary)', lineHeight: 1.65 }}
            >
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}

/** Expandable FAQ list. Content lives in constants/faq.ts. */
export default function FaqAccordion() {
  return (
    <ul className="flex flex-col gap-2">
      {FAQ.map((entry) => (
        <FaqItem key={entry.question} question={entry.question} answer={entry.answer} />
      ))}
    </ul>
  )
}
