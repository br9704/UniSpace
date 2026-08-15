interface LoadFailureProps {
  message: string
}

/** Nothing could be loaded at all — the one case with no partial answer to give. */
export default function LoadFailure({ message }: LoadFailureProps) {
  return (
    <div
      role="alert"
      className="mono h-full w-full flex flex-col items-center justify-center gap-3 p-6 text-center text-sm"
      style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text-secondary)' }}
    >
      <p>Could not load buildings</p>
      <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{message}</p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="mono text-xs px-3"
        style={{
          minHeight: 44,
          background: 'none',
          border: '1px solid var(--color-steel)',
          borderRadius: 'var(--radius-md)',
          color: 'var(--color-text-primary)',
          cursor: 'pointer',
        }}
      >
        Try again
      </button>
    </div>
  )
}
