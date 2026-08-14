import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { canReportAgain, markReported } from '@/lib/localStore'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const DISMISS_KEY = 'install-dismissed'
const DISMISS_DAYS = 7
const ENGAGEMENT_MS = 30_000

function isIOS(): boolean {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as unknown as { MSStream?: unknown }).MSStream
}

function isDismissed(): boolean {
  // Dismissing is not permanent — someone who says "not now" in week one may
  // well want it in week three. But re-asking sooner than a week is nagging.
  return !canReportAgain(DISMISS_KEY, DISMISS_DAYS * 24 * 60 * 60 * 1000)
}

export function useInstallPrompt() {
  const [showBanner, setShowBanner] = useState(false)
  const isIOSDevice = useMemo(() => isIOS(), [])
  const [canInstallNative, setCanInstallNative] = useState(false)
  const deferredPrompt = useRef<BeforeInstallPromptEvent | null>(null)

  useEffect(() => {
    if (isDismissed()) return
    // Already installed as PWA
    if (window.matchMedia('(display-mode: standalone)').matches) return

    // Android/Chrome: capture beforeinstallprompt
    const handler = (e: Event) => {
      e.preventDefault()
      deferredPrompt.current = e as BeforeInstallPromptEvent
      setCanInstallNative(true)
    }
    window.addEventListener('beforeinstallprompt', handler)

    // Show banner after engagement timer
    const timer = setTimeout(() => {
      setShowBanner(true)
    }, ENGAGEMENT_MS)

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
      clearTimeout(timer)
    }
  }, [])

  const install = useCallback(async () => {
    if (deferredPrompt.current) {
      await deferredPrompt.current.prompt()
      const { outcome } = await deferredPrompt.current.userChoice
      if (outcome === 'accepted') {
        setShowBanner(false)
      }
      deferredPrompt.current = null
    }
  }, [])

  const dismiss = useCallback(() => {
    markReported(DISMISS_KEY)
    setShowBanner(false)
  }, [])

  return { showBanner, isIOSDevice, canInstallNative, install, dismiss }
}
