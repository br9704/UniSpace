import { useEffect, useRef, useCallback } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import type { BlendedOccupancy, Building } from '@/types'
import { buildingsToFeatureCollection } from '@/lib/mapHelpers'
import { getFillLayerConfig, getOutlineLayerConfig, getLabelLayerConfig } from '@/lib/mapLayers'
import { MAPBOX_STYLE, DEFAULT_CAMPUS_CENTER, DEFAULT_ZOOM, MIN_ZOOM, MAX_ZOOM, MAX_BOUNDS } from '@/constants/map'

interface MapProps {
  buildings: Building[]
  occupancyMap?: Map<string, BlendedOccupancy>
  onBuildingClick: (buildingId: string) => void
}

const BUILDINGS_SOURCE = 'buildings'
const FILL_LAYER = 'building-fills'

export default function Map({ buildings, occupancyMap, onBuildingClick }: MapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const onClickRef = useRef(onBuildingClick)
  onClickRef.current = onBuildingClick
  const buildingsRef = useRef(buildings)
  buildingsRef.current = buildings
  const occupancyRef = useRef(occupancyMap)
  occupancyRef.current = occupancyMap

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

  if (!import.meta.env.VITE_MAPBOX_TOKEN) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-bg-primary text-[var(--color-text-secondary)]">
        <p>VITE_MAPBOX_TOKEN is not set. Add it to .env.local to load the map.</p>
      </div>
    )
  }

  return <div ref={containerRef} className="h-full w-full" />
}
