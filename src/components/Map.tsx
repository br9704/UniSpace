import { useCallback, useEffect, useMemo, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import type { BlendedOccupancy, Building } from '@/types'
import { buildingsToFeatureCollection } from '@/lib/mapHelpers'
import { getFillLayerConfig, getOutlineLayerConfig, getLabelLayerConfig } from '@/lib/mapLayers'
import { applyBasemapContrast } from '@/lib/basemapContrast'
import { MAPBOX_STYLE, DEFAULT_CAMPUS_CENTER, DEFAULT_ZOOM, MIN_ZOOM, MAX_ZOOM, MAX_BOUNDS } from '@/constants/map'
import { useBreathingLayer } from '@/hooks/useBreathingLayer'
import { getConfidence } from '@/lib/confidence'

interface MapProps {
  buildings: Building[]
  occupancyMap?: Map<string, BlendedOccupancy>
  onBuildingClick: (buildingId: string) => void
  /** True while a real value change is cross-fading — breathing holds. */
  isChanging?: boolean
}

const BUILDINGS_SOURCE = 'buildings'
const FILL_LAYER = 'building-fills'

/** Must match `fill-opacity` in mapLayers.ts — breathing oscillates around it. */
const BASE_FILL_OPACITY = 0.88

export default function Map({ buildings, occupancyMap, onBuildingClick, isChanging = false }: MapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  // Latest props, readable from Mapbox callbacks that outlive a single render.
  const onClickRef = useRef(onBuildingClick)
  const buildingsRef = useRef(buildings)
  const occupancyRef = useRef(occupancyMap)

  // Written in an effect, not during render: mutating a ref while rendering is
  // unsafe under concurrent React. Declared first so it commits before the
  // effects below read these refs — effects run in declaration order.
  useEffect(() => {
    onClickRef.current = onBuildingClick
    buildingsRef.current = buildings
    occupancyRef.current = occupancyMap
  })

  // Initialise map (runs once)
  useEffect(() => {
    if (!containerRef.current) return
    const token = import.meta.env.VITE_MAPBOX_TOKEN
    if (!token) return

    mapboxgl.accessToken = token
    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: MAPBOX_STYLE,
      center: DEFAULT_CAMPUS_CENTER,
      zoom: DEFAULT_ZOOM,
      minZoom: MIN_ZOOM,
      maxZoom: MAX_ZOOM,
      maxBounds: MAX_BOUNDS,
      attributionControl: false,
    })

    map.addControl(new mapboxgl.AttributionControl({ compact: true }))
    map.addControl(new mapboxgl.NavigationControl(), 'top-right')
    map.addControl(new mapboxgl.GeolocateControl({
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: true,
      showUserHeading: true,
    }), 'top-right')

    map.on('click', FILL_LAYER, (e) => {
      const id = e.features?.[0]?.properties?.id
      if (id) onClickRef.current(id)
    })
    map.on('mouseenter', FILL_LAYER, () => { map.getCanvas().style.cursor = 'pointer' })
    map.on('mouseleave', FILL_LAYER, () => { map.getCanvas().style.cursor = '' })

    mapRef.current = map
    return () => { map.remove() }
  }, [])

  // Add building layers
  const addLayers = useCallback((map: mapboxgl.Map, blds: Building[], occMap?: Map<string, BlendedOccupancy>) => {
    if (blds.length === 0) return
    if (map.getSource(BUILDINGS_SOURCE)) return

    // Before our own layers, so the basemap underneath them is legible.
    applyBasemapContrast(map)

    const geojson = buildingsToFeatureCollection(blds, occMap)
    map.addSource(BUILDINGS_SOURCE, { type: 'geojson', data: geojson })
    map.addLayer(getFillLayerConfig())
    map.addLayer(getOutlineLayerConfig())
    map.addLayer(getLabelLayerConfig())
  }, [])

  // Re-add layers on style change
  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    const handler = () => addLayers(map, buildingsRef.current, occupancyRef.current)
    map.on('style.load', handler)
    if (map.isStyleLoaded()) handler()
    return () => { map.off('style.load', handler) }
  }, [addLayers])

  // Add layers when buildings load (handles race condition where style.load fires before buildings are fetched)
  useEffect(() => {
    const map = mapRef.current
    if (!map || buildings.length === 0) return
    if (!map.isStyleLoaded()) return
    addLayers(map, buildings, occupancyMap)
  }, [buildings, addLayers, occupancyMap])

  // Update colours when occupancyMap changes
  useEffect(() => {
    const map = mapRef.current
    if (!map || buildings.length === 0 || !occupancyMap) return
    const source = map.getSource(BUILDINGS_SOURCE) as mapboxgl.GeoJSONSource | undefined
    if (!source) return
    source.setData(buildingsToFeatureCollection(buildings, occupancyMap))
  }, [buildings, occupancyMap])

  /**
   * The map only breathes when something on it is genuinely live.
   *
   * With no broadcasts and no crowd reports the whole campus is an estimate,
   * and animating it would assert a liveness the data does not have — the same
   * dishonesty as the "Live · 0%" bug this project already fixed once.
   */
  const hasLiveData = useMemo(() => {
    if (!occupancyMap) return false
    for (const occupancy of occupancyMap.values()) {
      if (getConfidence(occupancy.source).breathes) return true
    }
    return false
  }, [occupancyMap])

  const getMap = useCallback(() => mapRef.current, [])
  useBreathingLayer(getMap, FILL_LAYER, BASE_FILL_OPACITY, hasLiveData, isChanging)

  if (!import.meta.env.VITE_MAPBOX_TOKEN) {
    return (
      <div
        role="alert"
        className="mono h-full w-full flex items-center justify-center p-6 text-center text-sm"
        style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text-secondary)' }}
      >
        <p>VITE_MAPBOX_TOKEN is not set — add it to .env.local to load the map</p>
      </div>
    )
  }

  return <div ref={containerRef} className="h-full w-full" />
}
