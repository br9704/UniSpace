import { useEffect, useState } from 'react'
import { fetchRows } from '@/lib/dataSource'
import type { Building } from '@/types'

interface UseBuildingsResult {
  buildings: Building[]
  isLoading: boolean
  error: string | null
}

export function useBuildings(): UseBuildingsResult {
  const [buildings, setBuildings] = useState<Building[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function fetchBuildings() {
      const { data, error: fetchError } = await fetchRows<Building>('buildings')

      if (cancelled) return

      if (fetchError) {
        setError(fetchError)
        setIsLoading(false)
        return
      }

      setBuildings(data)
      setIsLoading(false)
    }

    fetchBuildings()

    return () => { cancelled = true }
  }, [])

  return { buildings, isLoading, error }
}
