import { useEffect } from 'react'

/**
 * Close a dialog when Escape is pressed.
 *
 * Both sheets in this app were dismissible only by tapping the backdrop or
 * dragging them down — pointer gestures, on elements marked `role="dialog"`.
 * A keyboard user who opened a building card had no way to close it, and the
 * sheet covers the tab bar, so the app was effectively stuck behind it. WCAG
 * 2.1.2 is explicit that focus must be escapable by keyboard alone.
 *
 * Found by driving the app in Playwright rather than by reading it: pressing
 * Escape left `elementFromPoint` over the tab bar still reporting the sheet's
 * own heading. No test covered it, because the test that pressed Escape never
 * asserted the sheet had gone.
 *
 * `keydown` on document, not on the sheet, so it fires wherever focus happens
 * to be — including on the backdrop, which is not focusable.
 */
export function useDismissOnEscape(onDismiss: () => void, active = true): void {
  useEffect(() => {
    if (!active) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      event.stopPropagation()
      onDismiss()
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onDismiss, active])
}
