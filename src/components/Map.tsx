import { useEffect, useRef, useCallback } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import type { BlendedOccupancy, Building } from '@/types'
import { buildingsToFeatureCollection } from '@/lib/mapHelpers'
import {
  MAPBOX_STYLE,
  DEFAULT_CAMPUS_CENTER,
  DEFAULT_ZOOM,
  MIN_ZOOM,
  MAX_ZOOM,
  LABEL_VISIBLE_ZOOM,
} from '@/constants/map'

interface MapProps {
  buildings: Building[]
  occupancyMap?: Map<string, BlendedOccupancy> // consumed in Sprint 7 for polygon colouring
  onBuildingClick: (buildingId: string) => void
}

const BUILDINGS_SOURCE = 'buildings'
const FILL_LAYER = 'building-fills'
const OUTLINE_LAYER = 'building-outlines'
const LABEL_LAYER = 'building-labels'

export default function Map({ buildings, occupancyMap: _occupancyMap, onBuildingClick }: MapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const onClickRef = useRef(onBuildingClick)
  onClickRef.current = onBuildingClick

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
      attributionControl: false,
    })

    map.addControl(new mapboxgl.AttributionControl({ compact: true }))
    map.addControl(new mapboxgl.NavigationControl(), 'top-right')
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
        showUserHeading: true,
      }),
      'top-right',
    )

    // Click handler
    map.on('click', FILL_LAYER, (e) => {
      const id = e.features?.[0]?.properties?.id
      if (id) onClickRef.current(id)
    })

    // Cursor
    map.on('mouseenter', FILL_LAYER, () => {
      map.getCanvas().style.cursor = 'pointer'
    })
    map.on('mouseleave', FILL_LAYER, () => {
      map.getCanvas().style.cursor = ''
    })

    mapRef.current = map

    return () => { map.remove() }
  }, [])

  // Add/update building layers when data arrives
  const addLayers = useCallback((map: mapboxgl.Map, buildings: Building[]) => {
    if (buildings.length === 0) return
    if (map.getSource(BUILDINGS_SOURCE)) return // already added

    const geojson = buildingsToFeatureCollection(buildings)

    map.addSource(BUILDINGS_SOURCE, { type: 'geojson', data: geojson })

    // Fill — grey for now, colour-driven in Sprint 7 (800ms transition ready)
    map.addLayer({ id: FILL_LAYER, type: 'fill', source: BUILDINGS_SOURCE, paint: {
      'fill-color': '#1A3A5C', 'fill-opacity': 0.6, 'fill-color-transition': { duration: 800, delay: 0 },
    }})

    // Stroke
    map.addLayer({ id: OUTLINE_LAYER, type: 'line', source: BUILDINGS_SOURCE, paint: {
      'line-color': '#2A5A8C', 'line-width': 1.5,
    }})

    // Labels — visible at zoom >= 15.5
    map.addLayer({ id: LABEL_LAYER, type: 'symbol', source: BUILDINGS_SOURCE, minzoom: LABEL_VISIBLE_ZOOM,
      layout: { 'text-field': ['get', 'shortName'], 'text-size': 11,
        'text-font': ['DIN Pro Medium', 'Arial Unicode MS Regular'], 'text-anchor': 'center', 'text-allow-overlap': false },
      paint: { 'text-color': '#8AAEC8', 'text-halo-color': '#030D1A', 'text-halo-width': 1 },
    })
  }, [])

  useEffect(() => {
    const map = mapRef.current
    if (!map || buildings.length === 0) return

    if (map.loaded()) {
      addLayers(map, buildings)
    } else {
      const handler = () => addLayers(map, buildings)
      map.on('load', handler)
      return () => { map.off('load', handler) }
    }
  }, [buildings, addLayers])

  if (!import.meta.env.VITE_MAPBOX_TOKEN) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-bg-primary text-[var(--color-text-secondary)]">
        <p>VITE_MAPBOX_TOKEN is not set. Add it to .env.local to load the map.</p>
      </div>
    )
  }

  return <div ref={containerRef} className="h-full w-full" />
}
