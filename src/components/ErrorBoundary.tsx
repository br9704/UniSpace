import { Component, type ErrorInfo, type ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
  /** Names the area that failed, so the message can say what is unavailable. */
  label: string
  /** Rendered instead of the default message. */
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  error: Error | null
}

/**
 * Contains a rendering failure to one region of the app.
 *
 * Without this, a single bad building record takes the whole screen down — and
 * a blank page is the worst possible failure for a product whose purpose is
 * telling you whether it is worth walking somewhere. Better to lose the
 * prediction chart and keep the occupancy number.
 *
 * Errors go to the console and nowhere else: PRD § 13.1 rule 6 and CLAUDE.md
 * § 4 rule 5 both forbid third-party error tracking, so no Sentry, no
 * telemetry, no beacon. `privacy.test.ts` enforces that.
 *
 * A class component because error boundaries have no hook equivalent — React
 * still requires `getDerivedStateFromError`.
 */
export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error(`[UniSpace] ${this.props.label} failed to render:`, error, info.componentStack)
  }

  handleRetry = (): void => {
    this.setState({ error: null })
  }

  render(): ReactNode {
    const { error } = this.state
    const { children, label, fallback } = this.props

    if (!error) return children
    if (fallback) return fallback

    return (
      <div
        role="alert"
        className="mono flex flex-col items-start gap-3 p-4 text-xs"
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px dashed var(--color-steel)',
          borderRadius: 'var(--radius-md)',
          color: 'var(--color-text-secondary)',
        }}
      >
        <p>&gt; {label.toUpperCase()} IS UNAVAILABLE</p>
        <p style={{ color: 'var(--color-text-muted)' }}>
          The rest of the app is still working.
        </p>
        <button
          type="button"
          onClick={this.handleRetry}
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
}
