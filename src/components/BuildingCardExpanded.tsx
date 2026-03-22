import type { BlendedOccupancy, Building, HourlyPrediction } from '@/types'
import { BUILDING_META } from '@/constants/buildingMeta'
import FloorBreakdown from './FloorBreakdown'
import DataSourceBadge from './DataSourceBadge'
import AmenityChip, { getActiveAmenities } from './AmenityChip'
import PredictionSection from './PredictionSection'
import PhotoCarousel from './PhotoCarousel'
import TipsList from './TipsList'
import SectionHeader from './ui/SectionHeader'
import Button from './ui/Button'

interface BuildingCardExpandedProps {
  building: Building
  occupancy: BlendedOccupancy | null
  predictions?: HourlyPrediction[]
}

export default function BuildingCardExpanded({ building, occupancy, predictions }: BuildingCardExpandedProps) {
  const amenities = getActiveAmenities(building)
  const meta = BUILDING_META[building.slug]
  const floors = occupancy?.floor_occupancies ?? []

  return (
    <div className="mt-4 border-t pt-4 border-[var(--color-border)]">
      {occupancy && <div className="mb-3"><DataSourceBadge source={occupancy.source} /></div>}

      <FloorBreakdown floors={floors} />

      {predictions && predictions.length > 0 && <PredictionSection predictions={predictions} />}

      {amenities.length > 0 && (
        <div className="mb-4">
          <h3 className="text-xs font-medium mb-2 text-[var(--color-text-secondary)]">Amenities</h3>
          <div className="flex flex-wrap gap-1.5">
            {amenities.map((a) => <AmenityChip key={a.label} icon={a.icon} label={a.label} />)}
          </div>
        </div>
      )}

      {meta?.photos && meta.photos.length > 0 && (
        <div className="mb-4">
          <SectionHeader className="mb-2">Photos</SectionHeader>
          <PhotoCarousel photos={meta.photos} alt={building.name} />
        </div>
      )}

      {meta?.tips && meta.tips.length > 0 && (
        <div className="mb-4">
          <SectionHeader className="mb-2">Tips</SectionHeader>
          <TipsList tips={meta.tips} />
        </div>
      )}

      {meta?.nearbyFood && meta.nearbyFood.length > 0 && (
        <div className="mb-4">
          <SectionHeader className="mb-2">Nearby Food</SectionHeader>
          {meta.nearbyFood.map((food, i) => (
            <p key={i} className="text-[13px] text-[var(--color-text-secondary)] leading-relaxed mb-1">• {food}</p>
          ))}
        </div>
      )}

      <div className="mt-4">
        <SectionHeader className="mb-2.5">Quick Links</SectionHeader>
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${building.entrance_lat},${building.entrance_lng}`}
          target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2.5 p-3.5 rounded-[var(--radius-md)] bg-[var(--color-bg-card)] border border-[var(--color-border)] no-underline mb-2 text-sm font-medium text-[var(--color-text-primary)] hover:shadow-card transition-shadow"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-uom-navy)" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
          Get Directions
        </a>
        <a
          href="https://maps.unimelb.edu.au/parkville/building"
          target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2.5 p-3.5 rounded-[var(--radius-md)] bg-[var(--color-bg-card)] border border-[var(--color-border)] no-underline mb-2 text-sm font-medium text-[var(--color-text-primary)] hover:shadow-card transition-shadow"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-uom-navy)" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/></svg>
          Building Info
        </a>
      </div>

      <Button
        as="a"
        href={`https://www.google.com/maps/dir/?api=1&destination=${building.entrance_lat},${building.entrance_lng}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full mt-4"
        size="lg"
      >
        Navigate to {building.short_name || building.name}
      </Button>
    </div>
  )
}
