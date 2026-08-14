import { useCallback, useEffect, useState } from 'react'
import type { PushSubscriptionJSON, UserAlert } from '@/types'

const FUNCTION_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/manage-alerts`

/** Stable identity so consumers memoising on `alerts` don't re-run every render. */
const EMPTY_ALERTS: UserAlert[] = []

async function callManageAlerts(body: Record<string, unknown>): Promise<unknown> {
  const res = await fetch(FUNCTION_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
    },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' }))
    throw new Error((err as { error?: string }).error ?? 'Request failed')
  }
  return res.json()
}

export function useAlerts(subscription: PushSubscriptionJSON | null) {
  const [alerts, setAlerts] = useState<UserAlert[]>([])
  // Which subscription the list below was fetched for. Loading is then derived
  // rather than stored: we are loading exactly when a subscription exists whose
  // fetch has not settled yet. Keeping it as state would mean flipping a flag
  // synchronously inside the effect, one render behind where it is knowable.
  const [loadedEndpoint, setLoadedEndpoint] = useState<string | null>(null)
  const isLoading = subscription !== null && loadedEndpoint !== subscription.endpoint

  // Fetch alerts when a push subscription is available.
  useEffect(() => {
    if (!subscription) return

    // Guards against a slow response from a previous subscription landing after
    // a newer one has already been requested.
    let cancelled = false
    const { endpoint } = subscription
    callManageAlerts({ action: 'list', push_subscription: subscription })
      .then((res) => { if (!cancelled) setAlerts((res as { alerts: UserAlert[] }).alerts ?? []) })
      .catch(() => { if (!cancelled) setAlerts([]) })
      .finally(() => { if (!cancelled) setLoadedEndpoint(endpoint) })

    return () => { cancelled = true }
  }, [subscription])

  // With no subscription there are no alerts to hold — derived, not stored, so
  // clearing does not need a synchronous setState inside the effect above.
  const visibleAlerts = subscription ? alerts : EMPTY_ALERTS

  const createAlert = useCallback(async (buildingId: string, thresholdPct: number) => {
    if (!subscription) return
    const res = await callManageAlerts({
      action: 'create',
      building_id: buildingId,
      push_subscription: subscription,
      threshold_pct: thresholdPct,
    })
    const alert = (res as { alert: UserAlert }).alert
    setAlerts((prev) => [alert, ...prev])
  }, [subscription])

  const updateAlert = useCallback(async (alertId: string, updates: { threshold_pct?: number; is_active?: boolean }) => {
    if (!subscription) return
    const res = await callManageAlerts({
      action: 'update',
      alert_id: alertId,
      push_subscription: subscription,
      ...updates,
    })
    const updated = (res as { alert: UserAlert }).alert
    setAlerts((prev) => prev.map((a) => a.id === alertId ? updated : a))
  }, [subscription])

  const deleteAlert = useCallback(async (alertId: string) => {
    if (!subscription) return
    await callManageAlerts({
      action: 'delete',
      alert_id: alertId,
      push_subscription: subscription,
    })
    setAlerts((prev) => prev.filter((a) => a.id !== alertId))
  }, [subscription])

  const getAlertForBuilding = useCallback((buildingId: string): UserAlert | undefined => {
    return visibleAlerts.find((a) => a.building_id === buildingId)
  }, [visibleAlerts])

  return { alerts: visibleAlerts, isLoading, createAlert, updateAlert, deleteAlert, getAlertForBuilding }
}
