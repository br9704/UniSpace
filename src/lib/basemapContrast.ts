import type { Map as MapboxMap } from 'mapbox-gl'

/**
 * Darken Mapbox `light-v11`'s own roads, buildings and labels.
 *
 * The style is built to sit *under* a data visualisation, so its roads are
 * drawn at near-white on a near-white ground. Beneath our building polygons the
 * street network disappeared: you could not tell which side of Swanston Street
 * a building stood on, which is most of what a campus map is for.
 *
 * The layer ids below are `light-v11`'s actual ones, read out of the loaded
 * style in a browser rather than guessed. That distinction mattered — an
 * earlier pass matched `/road-(motorway|trunk|primary|…)/`, the ids the *full*
 * Streets style uses. `light-v11` collapses the entire road network into a
 * single `road-simple` layer, so the pattern matched footpaths and steps and
 * missed every actual street.
 *
 * Applied by walking the loaded style rather than by forking it in Studio, so
 * there is no second artifact to keep in step. Every id Mapbox does not have is
 * skipped: an unknown layer is a no-op, never a throw.
 */

/** Paint overrides by layer id. `light-v11` uses simplified, collapsed ids. */
const OVERRIDES: Array<[string, Record<string, string | number>]> = [
  // The whole road network. This is the layer that makes a map readable.
  ['road-simple', { 'line-color': '#B9C4D2' }],
  ['bridge-simple', { 'line-color': '#B9C4D2' }],
  ['tunnel-simple', { 'line-color': '#CBD3DE' }],
  ['bridge-case-simple', { 'line-color': '#A3B0C1' }],

  // Footpaths a step lighter — campus is full of them and at full strength
  // they compete with the streets.
  ['road-path', { 'line-color': '#CBD3DE' }],
  ['road-path-trail', { 'line-color': '#CBD3DE' }],
  ['road-pedestrian', { 'line-color': '#CBD3DE' }],
  ['road-steps', { 'line-color': '#CBD3DE' }],
  ['road-rail', { 'line-color': '#BFC8D4' }],

  // Every other building in the city. Ours are drawn on top with a navy edge,
  // so the surrounding blocks need enough weight to read as a city and not so
  // much that they compete.
  ['building', { 'fill-color': '#E3E8EF', 'fill-outline-color': '#D2DAE4' }],

  // Street names, at the same weight as the app's own muted text.
  ['road-label-simple', { 'text-color': '#4E5C6E', 'text-halo-color': '#FFFFFF', 'text-halo-width': 1.2 }],
  ['settlement-subdivision-label', { 'text-color': '#5B6B80' }],
  ['poi-label', { 'text-color': '#6B7A8D' }],
]

export function applyBasemapContrast(map: MapboxMap): void {
  let style
  try {
    style = map.getStyle()
  } catch {
    return // style not ready; the caller re-runs on style.load
  }
  if (!style?.layers) return

  const present = new Set(style.layers.map((l) => l.id))

  for (const [id, paint] of OVERRIDES) {
    if (!present.has(id)) continue
    for (const [prop, value] of Object.entries(paint)) {
      trySet(map, id, prop as Parameters<MapboxMap['setPaintProperty']>[1], value)
    }
  }
}

/**
 * Set a paint property, ignoring properties a layer does not have.
 *
 * Mapbox throws on an unknown property rather than ignoring it, and the exact
 * layer set in a hosted style is not a contract — it changes between versions.
 * A basemap tweak must never be able to take the map down.
 */
function trySet(
  map: MapboxMap,
  id: string,
  prop: Parameters<MapboxMap['setPaintProperty']>[1],
  value: Parameters<MapboxMap['setPaintProperty']>[2],
): void {
  try {
    map.setPaintProperty(id, prop, value)
  } catch {
    /* layer lacks this property in this style version */
  }
}
