import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

/**
 * Which building's sheet is open, including deep links.
 *
 * A `?building=` parameter arrives from a Share link. It seeds the state
 * directly at first render rather than being copied in by an effect afterwards,
 * so a shared link opens straight onto its building instead of flashing the
 * bare map first.
 */
export function useBuildingSelection() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedId, setSelectedId] = useState<string | null>(
    () => searchParams.get('building'),
  )

  // Clear the parameter once consumed, so dismissing the sheet does not
  // immediately reopen it and the URL stays shareable as the plain map. The
  // router is an external system, which is what an effect is for.
  useEffect(() => {
    if (searchParams.has('building')) setSearchParams({}, { replace: true })
  }, [searchParams, setSearchParams])

  return {
    selectedId,
    select: useCallback((id: string) => setSelectedId(id), []),
    clear: useCallback(() => setSelectedId(null), []),
  }
}
