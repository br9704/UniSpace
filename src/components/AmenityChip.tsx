import type { Building } from '@/types'

interface AmenityChipProps {
  icon: string
  label: string
}

const AMENITY_CONFIG: { key: keyof Building; icon: string; label: string }[] = [
  { key: 'has_wifi', icon: '📶', label: 'WiFi' },
  { key: 'has_power', icon: '🔌', label: 'Power' },
  { key: 'has_quiet_zone', icon: '🤫', label: 'Quiet Zone' },
  { key: 'has_group_seating', icon: '👥', label: 'Group Seating' },
  { key: 'has_food_nearby', icon: '🍽️', label: 'Food Nearby' },
  { key: 'is_ground_floor_accessible', icon: '♿', label: 'Accessible' },
  { key: 'has_elevator', icon: '🛗', label: 'Elevator' },
]

/** Get active amenities for a building (only truthy flags). */
export function getActiveAmenities(building: Building): { icon: string; label: string }[] {
  return AMENITY_CONFIG.filter(({ key }) => building[key]).map(({ icon, label }) => ({ icon, label }))
}

export default function AmenityChip({ icon, label }: AmenityChipProps) {
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs"
      style={{ backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-uom-blue)' }}
    >
      {icon} {label}
    </span>
  )
}
