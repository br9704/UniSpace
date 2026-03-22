import { useCallback, useEffect, useState } from 'react'
import type { PushSubscriptionJSON, UserAlert } from '@/types'

const FUNCTION_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/manage-alerts`

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
  const [isLoading, setIsLoading] = useState(false)

  // Fetch alerts when subscription is available
  useEffect(() => {
    if (!subscription) { setAlerts([]); return }
    setIsLoading(true)
    callManageAlerts({ action: 'list', push_subscription: subscription })
      .then((res) => setAlerts((res as { alerts: UserAlert[] }).alerts ?? []))
      .catch(() => setAlerts([]))
      .finally(() => setIsLoading(false))
  }, [subscription])

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
    return alerts.find((a) => a.building_id === buildingId)
  }, [alerts])

  return { alerts, isLoading, createAlert, updateAlert, deleteAlert, getAlertForBuilding }
}
