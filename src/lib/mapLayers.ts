import type { ExpressionSpecification, FillLayerSpecification, LineLayerSpecification, SymbolLayerSpecification } from 'mapbox-gl'
import { LABEL_VISIBLE_ZOOM } from '@/constants/map'
import { OCCUPANCY_COLOURS } from '@/constants/occupancy'

const BUILDINGS_SOURCE = 'buildings'

// Mapbox data-driven expression: maps occupancy_pct → colour
// Uses linear interpolation across the occupancy colour scale
// Falls back to 'none' colour when occupancy_pct is absent
const FILL_COLOR_EXPRESSION: ExpressionSpecification = [
  'case',
  ['all', ['has', 'occupancy_pct'], ['!=', ['get', 'occupancy_pct'], null]],
  [
    'interpolate', ['linear'], ['get', 'occupancy_pct'],
    0, OCCUPANCY_COLOURS.empty,
    25, OCCUPANCY_COLOURS.empty,
    50, OCCUPANCY_COLOURS.quiet,
    70, OCCUPANCY_COLOURS.moderate,
    85, OCCUPANCY_COLOURS.busy,
    100, OCCUPANCY_COLOURS.packed,
  ],
  OCCUPANCY_COLOURS.none,
]

export function getFillLayerConfig(): FillLayerSpecification {
  return {
    id: 'building-fills',
    type: 'fill',
    source: BUILDINGS_SOURCE,
    paint: {
      'fill-color': FILL_COLOR_EXPRESSION,
      'fill-opacity': 0.55,
      'fill-color-transition': { duration: 800, delay: 0 },
    },
  }
}

export function getOutlineLayerConfig(): LineLayerSpecification {
  return {
    id: 'building-outlines',
    type: 'line',
    source: BUILDINGS_SOURCE,
    paint: {
      'line-color': '#003865',
      'line-width': 1.5,
    },
  }
}

export function getLabelLayerConfig(): SymbolLayerSpecification {
  return {
    id: 'building-labels',
    type: 'symbol',
    source: BUILDINGS_SOURCE,
    minzoom: LABEL_VISIBLE_ZOOM,
    layout: {
      // Combined: "Baillieu\n35%" or just "Baillieu" if no data
      'text-field': [
        'case',
        ['all', ['has', 'occupancy_pct'], ['!=', ['get', 'occupancy_pct'], null]],
        ['concat', ['get', 'shortName'], '\n', ['to-string', ['round', ['get', 'occupancy_pct']]], '%'],
        ['get', 'shortName'],
      ],
      'text-size': 12,
      'text-font': ['DIN Pro Medium', 'Arial Unicode MS Regular'],
      'text-anchor': 'center',
      'text-allow-overlap': true,
    },
    paint: {
      'text-color': '#1E293B',
      'text-halo-color': '#FFFFFF',
      'text-halo-width': 1.5,
    },
  }
}
