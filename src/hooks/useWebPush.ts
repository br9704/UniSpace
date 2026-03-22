import { useCallback, useEffect, useState } from 'react'
import type { PushSubscriptionJSON } from '@/types'

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const raw = atob(base64)
  const arr = new Uint8Array(raw.length)
  for (let i = 0; i < raw.length; i++) arr[i] = raw.charCodeAt(i)
  return arr
}

export function useWebPush() {
  const [isSupported] = useState(() => 'serviceWorker' in navigator && 'PushManager' in window)
  const [permission, setPermission] = useState<NotificationPermission>(
    typeof Notification !== 'undefined' ? Notification.permission : 'default',
  )
  const [subscription, setSubscription] = useState<PushSubscriptionJSON | null>(null)

  // Check existing subscription on mount
  useEffect(() => {
    if (!isSupported) return
    navigator.serviceWorker.ready.then(async (reg) => {
      const sub = await reg.pushManager.getSubscription()
      if (sub) {
        setSubscription(sub.toJSON() as PushSubscriptionJSON)
        setPermission(Notification.permission)
      }
    })
  }, [isSupported])

  const subscribe = useCallback(async (): Promise<PushSubscriptionJSON | null> => {
    if (!isSupported) return null
    const vapidKey = import.meta.env.VITE_VAPID_PUBLIC_KEY
    if (!vapidKey) return null

    const perm = await Notification.requestPermission()
    setPermission(perm)
    if (perm !== 'granted') return null

    const reg = await navigator.serviceWorker.ready
    const sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidKey),
    })

    const json = sub.toJSON() as PushSubscriptionJSON
    setSubscription(json)
    return json
  }, [isSupported])

  const unsubscribe = useCallback(async () => {
    if (!isSupported) return
    const reg = await navigator.serviceWorker.ready
    const sub = await reg.pushManager.getSubscription()
    if (sub) await sub.unsubscribe()
    setSubscription(null)
  }, [isSupported])

  return { isSupported, permission, subscription, subscribe, unsubscribe }
}
