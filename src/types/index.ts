import type { Polygon } from 'geojson'

// ── Campus & Building ──────────────────────────────────────────────

export interface Campus {
  id: string
  slug: string
  name: string
  city: string
  country: string
  center_lat: number
  center_lng: number
  default_zoom: number
  created_at: string
}

export interface Building {
  id: string
  campus_id: string
  slug: string
  name: string
  short_name: string | null
  estimated_capacity: number | null
  entrance_lat: number | null
  entrance_lng: number | null
  centroid_lat: number | null
  centroid_lng: number | null
  polygon: Polygon | null
  google_place_id: string | null
  // Amenities
  has_wifi: boolean
  has_power: boolean
  has_food_nearby: boolean
  has_quiet_zone: boolean
  has_group_seating: boolean
  is_ground_floor_accessible: boolean
  has_elevator: boolean
  has_accessible_bathrooms: boolean
  has_accessible_parking: boolean
  // Hours
  hours_mon: string | null
  hours_tue: string | null
  hours_wed: string | null
  hours_thu: string | null
  hours_fri: string | null
  hours_sat: string | null
  hours_sun: string | null
  created_at: string
  updated_at: string
}

export interface BuildingZone {
  id: string
  building_id: string
  zone_slug: string
  zone_name: string | null
  polygon: Polygon
  capacity: number | null
  floor_level: number
  is_quiet_zone: boolean
  has_power: boolean
  is_accessible: boolean
  created_at: string
}

// ── Occupancy ──────────────────────────────────────────────────────

export type ReportLevel = 1 | 2 | 3 | 4 | 5
export type NoiseLevel = 1 | 2 | 3 | 4 | 5

export interface OccupancyReport {
  id: string
  building_id: string
  occupancy_level: ReportLevel
  noise_level: NoiseLevel | null
  created_at: string
  expires_at: string
}

export type DataQuality = 'live' | 'crowd-report' | 'google' | 'predicted' | 'stale' | 'none'
export type OccupancyTrend = 'filling' | 'emptying' | 'stable'
export type PredictionConfidence = 'high' | 'medium' | 'low' | 'google-estimated'
export type PredictionSource = 'pulse' | 'google'

export interface ZoneOccupancy {
  zone_id: string
  building_id: string
  occupancy_count: number
  occupancy_pct: number
  trend: OccupancyTrend
  prev_pct: number | null
  last_updated: string
  data_quality: DataQuality
}

export interface OccupancyUpdate {
  building_id: string
  blended_pct: number
  floor_occupancies: FloorOccupancy[]
  data_quality: DataQuality
  trend: OccupancyTrend
  timestamp: string
}

export interface FloorOccupancy {
  zone_id: string
  floor_level: number
  zone_name: string
  occupancy_pct: number
  trend: OccupancyTrend
}

export interface BlendedOccupancy {
  pct: number | null
  source: DataQuality
  trend: OccupancyTrend
  floor_occupancies: FloorOccupancy[]
  last_updated: string
}

// ── Google Data ────────────────────────────────────────────────────

export interface GooglePopularityCache {
  building_id: string
  current_popularity: number | null
  is_open_now: boolean | null
  synced_at: string
}

export interface GooglePopularTime {
  building_id: string
  day_of_week: number
  hour_of_day: number
  typical_popularity: number
  seeded_at: string
}

// ── Predictions ────────────────────────────────────────────────────

export interface OccupancyPrediction {
  id: string
  building_id: string
  day_of_week: number
  hour_of_day: number
  predicted_pct: number
  confidence: PredictionConfidence
  sample_count: number
  data_source: PredictionSource
  computed_at: string
}

export interface HourlyPrediction {
  hour: number
  pct: number
  source: PredictionSource
  confidence: PredictionConfidence
}

// ── Alerts ────────────────────────────────────────────────────────

export interface PushSubscriptionKeys {
  p256dh: string
  auth: string
}

export interface PushSubscriptionJSON {
  endpoint: string
  keys: PushSubscriptionKeys
}

export interface UserAlert {
  id: string
  building_id: string
  push_token: string | null
  push_subscription: PushSubscriptionJSON | null
  threshold_pct: number
  is_active: boolean
  expires_at: string
  triggered_at: string | null
  last_notified_at: string | null
  created_at: string
}

// ── Recommendations ───────────────────────────────────────────────

export interface FilterState {
  has_wifi: boolean
  has_power: boolean
  has_food_nearby: boolean
  has_quiet_zone: boolean
  has_group_seating: boolean
  is_ground_floor_accessible: boolean
  has_elevator: boolean
  low_noise: boolean
  currently_open: boolean
  max_occupancy_pct: number
  max_walk_minutes: number
}

export const DEFAULT_FILTERS: FilterState = {
  has_wifi: false,
  has_power: false,
  has_food_nearby: false,
  has_quiet_zone: false,
  has_group_seating: false,
  is_ground_floor_accessible: false,
  has_elevator: false,
  low_noise: false,
  currently_open: true,
  max_occupancy_pct: 100,
  max_walk_minutes: 15,
}

export interface RankedBuilding {
  building: Building
  score: number
  occupancy: BlendedOccupancy
  walk_minutes: number | null
  distance_m: number | null
  amenity_match_pct: number
}

// ── Position broadcast (client -> Supabase Realtime) ──────────────
// IMPORTANT: raw lat/lng is never included — zone detection is client-side

export interface PositionBroadcast {
  zone_id: string       // computed client-side via Turf.js
  session_id: string    // rotating anon UUID — NEVER stored in DB
  campus_slug: string
}
