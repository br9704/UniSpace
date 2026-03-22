interface ReportFABProps {
  visible: boolean
  onClick: () => void
}

export default function ReportFAB({ visible, onClick }: ReportFABProps) {
  if (!visible) return null

  return (
    <button
      onClick={onClick}
      aria-label="Report building busyness"
      className="fixed bottom-[72px] right-4 z-[75] w-14 h-14 rounded-full bg-[var(--color-uom-navy)] text-white flex items-center justify-center shadow-lg active:scale-[0.95] transition-transform"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="M9 14l2 2 4-4" />
      </svg>
    </button>
  )
}
