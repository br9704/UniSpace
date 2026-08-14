import type {
  ExpressionSpecification,
  FillLayerSpecification,
  LineLayerSpecification,
  SymbolLayerSpecification,
} from 'mapbox-gl'
import { LABEL_VISIBLE_ZOOM } from '@/constants/map'
import { OCCUPANCY_COLOURS } from '@/constants/occupancy'
import { readToken } from '@/lib/tokens'

const BUILDINGS_SOURCE = 'buildings'

/**
 * Occupancy → fill colour, interpolated across the ramp.
 *
 * The ramp is luminance rather than hue (see constants/occupancy.ts): fuller
 * buildings render lighter, emptier ones sink toward the warm-black ground.
 * Mapbox needs literal colours, which is why `OCCUPANCY_COLOURS` carries hex
 * alongside the CSS tokens — `occupancy.test.ts` asserts the two agree.
 *
 * A building with no data gets the `none` shade, which is darker than every
 * real level so that "we don't know" recedes rather than reading as "empty".
 */
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
      // Near-opaque: the ramp is already low-contrast by design, so letting the
      // basemap show through would collapse the middle of it.
      'fill-opacity': 0.88,
      // A change in value must read as a change, not a flicker. 800ms matches
      // the transition MOTION.md specifies for the heatmap.
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
      // Steel hairline — the structural rule of the whole system.
      'line-color': readToken('--color-steel'),
      'line-width': 1,
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
      // "BAILLIEU\n35%", or just the name when there is no reading to show.
      'text-field': [
        'case',
        ['all', ['has', 'occupancy_pct'], ['!=', ['get', 'occupancy_pct'], null]],
        ['concat', ['upcase', ['get', 'shortName']], '\n', ['to-string', ['round', ['get', 'occupancy_pct']]], '%'],
        ['upcase', ['get', 'shortName']],
      ],
      'text-size': 11,
      'text-letter-spacing': 0.08,
      'text-line-height': 1.4,
      // Mapbox has no JetBrains Mono; this is the closest instrument-like face
      // in the default glyph set.
      'text-font': ['DIN Pro Medium', 'Arial Unicode MS Regular'],
      'text-anchor': 'center',
      'text-allow-overlap': true,
    },
    paint: {
      'text-color': readToken('--color-text-primary'),
      // Halo in the background colour, not white: labels sit *in* the dark,
      // rather than on a light chip floating above it.
      'text-halo-color': readToken('--color-bg'),
      'text-halo-width': 1.5,
    },
  }
}
