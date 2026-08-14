interface Option<T> {
  value: T
  label: string
}

interface ReportLevelPickerProps<T extends number> {
  legend: string
  options: Option<T>[]
  value: T | null
  onChange: (value: T) => void
}

/**
 * A five-position selector, rendered as an instrument row.
 *
 * Radio semantics rather than buttons, so a keyboard user gets arrow-key
 * movement and a screen reader announces the group and the current position.
 * Selection is marked in amber — this is the one thing the user is choosing on
 * this surface.
 */
export default function ReportLevelPicker<T extends number>({
  legend,
  options,
  value,
  onChange,
}: ReportLevelPickerProps<T>) {
  return (
    <fieldset>
      <legend className="mono text-xs mb-2" style={{ color: 'var(--color-text-muted)' }}>
        {legend}
      </legend>
      <div className="flex gap-1.5" role="radiogroup" aria-label={legend}>
        {options.map(({ value: optionValue, label }) => {
          const selected = value === optionValue
          return (
            <button
              key={optionValue}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(optionValue)}
              className="mono flex-1 flex flex-col items-center justify-center gap-1 text-[10px] tracking-wide"
              style={{
                minHeight: 52,
                padding: '8px 2px',
                backgroundColor: 'transparent',
                border: `1px solid ${selected ? 'var(--color-amber)' : 'var(--color-hairline)'}`,
                borderRadius: 'var(--radius-md)',
                color: selected ? 'var(--color-amber)' : 'var(--color-text-secondary)',
                cursor: 'pointer',
                transition: 'border-color var(--dur-fast) linear, color var(--dur-fast) linear',
              }}
            >
              <span aria-hidden="true">{selected ? '[■]' : '[ ]'}</span>
              <span>{label.toUpperCase()}</span>
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}
