import { useEffect, useState } from 'react'
import { fetchRows } from '@/lib/dataSource'
import type { BuildingZone } from '@/types'

interface UseZonesResult {
  zones: BuildingZone[]
  isLoading: boolean
  error: string | null
}

export function useZones(): UseZonesResult {
  const [zones, setZones] = useState<BuildingZone[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function fetchZones() {
      const { data, error: fetchError } = await fetchRows<BuildingZone>('building_zones')

      if (cancelled) return

      if (fetchError) {
        setError(fetchError)
        setIsLoading(false)
        return
      }

      setZones(data)
      setIsLoading(false)
    }

    fetchZones()

    return () => { cancelled = true }
  }, [])

  return { zones, isLoading, error }
}
