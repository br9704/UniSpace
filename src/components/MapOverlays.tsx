import type { BlendedOccupancy, DataQuality } from '@/types'
import DataSourcePill from './DataSourcePill'
import ColdStartNotice from './ColdStartNotice'
import ReportFAB from './ReportFAB'
import FindTrigger from './FindTrigger'

interface MapOverlaysProps {
  occupancyMap: Map<string, BlendedOccupancy>
  dominantSource: DataQuality
  lastUpdated: Date | null
  /** False while a sheet or panel is open — the map's own chrome steps aside. */
  visible: boolean
  onFind: () => void
  onReport: () => void
}

/**
 * Everything layered over the map itself.
 *
 * Grouped so the page component stays about state and data flow rather than
 * z-index bookkeeping, and so the "hide all chrome while a sheet is open" rule
 * lives in exactly one place instead of being repeated per element.
 */
export default function MapOverlays({
  occupancyMap,
  dominantSource,
  lastUpdated,
  visible,
  onFind,
  onReport,
}: MapOverlaysProps) {
  return (
    <>
      {visible && <ColdStartNotice occupancyMap={occupancyMap} />}
      <div className="absolute bottom-2 left-4" style={{ zIndex: 50 }}>
        <DataSourcePill source={dominantSource} lastUpdated={lastUpdated} />
      </div>
      <ReportFAB visible={visible} onClick={onReport} />
      {visible && <FindTrigger onClick={onFind} />}
    </>
  )
}
