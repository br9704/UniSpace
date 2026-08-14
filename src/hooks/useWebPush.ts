import { useCallback, useEffect, useState } from 'react'
import type { PushSubscriptionJSON } from '@/types'

/**
 * Decode a base64url VAPID key into the `BufferSource` PushManager expects.
 *
 * Backed by an explicit ArrayBuffer: a plain `new Uint8Array(n)` is typed over
 * `ArrayBufferLike`, which may be a SharedArrayBuffer and so is not assignable
 * to `BufferSource`.
 */
function urlBase64ToUint8Array(base64String: string): Uint8Array<ArrayBuffer> {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const raw = atob(base64)
  const arr = new Uint8Array(new ArrayBuffer(raw.length))
  for (let i = 0; i < raw.length; i++) arr[i] = raw.charCodeAt(i)
  return arr
}

/**
 * Narrow a browser `PushSubscription.toJSON()` to our stricter shape.
 *
 * The DOM type has `endpoint` and `keys` optional, and `keys` as a loose
 * `Record<string, string>`. Casting straight across (as this file used to) tells
 * the compiler a lie: if a browser omits either key, every downstream read of
 * `subscription.keys.p256dh` throws at runtime instead of failing here. This is
 * external data, so it gets validated rather than asserted.
 */
function toPushSubscriptionJSON(sub: PushSubscription): PushSubscriptionJSON | null {
  const json = sub.toJSON()
  const { endpoint, keys } = json
  if (!endpoint || !keys?.p256dh || !keys?.auth) return null
  return { endpoint, keys: { p256dh: keys.p256dh, auth: keys.auth } }
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
      if (!sub) return
      const json = toPushSubscriptionJSON(sub)
      if (!json) return
      setSubscription(json)
      setPermission(Notification.permission)
    })
  }, [isSupported])

  const subscribe = useCallback(async (): Promise<PushSubscriptionJSON | null> => {
    if (!isSupported) return null
    const vapidKey = import.meta.env.VITE_VAPID_PUBLIC_KEY
    if (!vapidKey) {
      // Documented in .env.example but easy to omit from .env.local, in which
      // case push silently never works. Say so rather than returning quietly.
      console.warn('[UniSpace] VITE_VAPID_PUBLIC_KEY is not set — push notifications are disabled.')
      return null
    }

    const perm = await Notification.requestPermission()
    setPermission(perm)
    if (perm !== 'granted') return null

    const reg = await navigator.serviceWorker.ready
    const sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidKey),
    })

    const json = toPushSubscriptionJSON(sub)
    if (!json) {
      console.warn('[UniSpace] Browser returned an incomplete push subscription — ignoring.')
      return null
    }
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
