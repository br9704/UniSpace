interface PageHeaderProps {
  title: string
  subtitle?: string
  greeting?: string
  titleSize?: 'lg' | 'md'
  children?: React.ReactNode
}

export default function PageHeader({ title, subtitle, greeting, titleSize = 'md', children }: PageHeaderProps) {
  return (
    <div
      className="px-6 pt-14 pb-8"
      style={{ background: 'linear-gradient(145deg, #001F3F 0%, #003865 50%, #005A8C 100%)' }}
    >
      {greeting && (
        <p className="text-[15px] font-normal mb-0.5" style={{ color: 'var(--color-text-on-navy-muted)' }}>
          {greeting}
        </p>
      )}
      <div className="flex items-center justify-between">
        <h1
          className={`font-extrabold text-[var(--color-text-on-navy)] ${titleSize === 'lg' ? 'text-4xl tracking-tight leading-tight' : 'text-[28px] tracking-tight'}`}
        >
          {title}
        </h1>
        {children}
      </div>
      {subtitle && (
        <p className="text-sm mt-1.5" style={{ color: 'var(--color-text-on-navy-subtle)' }}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
