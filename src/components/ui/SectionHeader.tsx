interface SectionHeaderProps {
  children: React.ReactNode
  className?: string
}

export default function SectionHeader({ children, className = '' }: SectionHeaderProps) {
  return (
    <h2 className={`text-xs font-bold tracking-wider text-[var(--color-text-tertiary)] uppercase ${className}`}>
      {children}
    </h2>
  )
}
