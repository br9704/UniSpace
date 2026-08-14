// ============================================================================
// GENERATED FILE — DO NOT EDIT BY HAND
//
// Produced by `pnpm generate:fixtures` from the committed seed SQL in
// supabase/seed/. Edit the SQL and regenerate; `seedData.test.ts` fails if this
// file falls out of step with the seeds.
//
// Counts below are derived, not asserted — they are whatever the seeds contain:
//   campuses 1 · buildings 18 · zones 47 · typical curve rows 1156
// ============================================================================

import type { Building, BuildingZone, Campus, GooglePopularTime } from '@/types'

export const SEED_CAMPUSES = [
  {
    "id": "a1b2c3d4-0000-0000-0000-000000000001",
    "slug": "unimelb",
    "name": "University of Melbourne — Parkville",
    "city": "Melbourne",
    "country": "AU",
    "center_lat": -37.7964,
    "center_lng": 144.9631,
    "default_zoom": 15
  }
] as unknown as Campus[]

export const SEED_BUILDINGS = [
  {
    "id": "b0000000-0000-0000-0000-000000000001",
    "campus_id": "a1b2c3d4-0000-0000-0000-000000000001",
    "slug": "baillieu-library",
    "name": "Baillieu Library",
    "short_name": "Baillieu",
    "estimated_capacity": 800,
    "entrance_lat": -37.7981,
    "entrance_lng": 144.9596,
    "centroid_lat": -37.798,
    "centroid_lng": 144.9598,
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.959,
            -37.7976
          ],
          [
            144.9606,
            -37.7976
          ],
          [
            144.9606,
            -37.7985
          ],
          [
            144.959,
            -37.7985
          ],
          [
            144.959,
            -37.7976
          ]
        ]
      ]
    },
    "google_place_id": "ChIJPwNPm9FC1moRkG1VFmxXBBM",
    "has_wifi": true,
    "has_power": true,
    "has_food_nearby": true,
    "has_quiet_zone": true,
    "has_group_seating": true,
    "is_ground_floor_accessible": null,
    "has_elevator": true,
    "has_accessible_bathrooms": true,
    "has_accessible_parking": null,
    "hours_mon": "09:00-20:00",
    "hours_tue": "09:00-20:00",
    "hours_wed": "09:00-20:00",
    "hours_thu": "09:00-20:00",
    "hours_fri": "09:00-17:00",
    "hours_sat": "11:00-17:00",
    "hours_sun": "10:00-17:00"
  },
  {
    "id": "b0000000-0000-0000-0000-000000000002",
    "campus_id": "a1b2c3d4-0000-0000-0000-000000000001",
    "slug": "erc-library",
    "name": "Eastern Resource Centre",
    "short_name": "ERC",
    "estimated_capacity": 300,
    "entrance_lat": -37.7973,
    "entrance_lng": 144.964,
    "centroid_lat": -37.7972,
    "centroid_lng": 144.9641,
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.9636,
            -37.7969
          ],
          [
            144.9646,
            -37.7969
          ],
          [
            144.9646,
            -37.7976
          ],
          [
            144.9636,
            -37.7976
          ],
          [
            144.9636,
            -37.7969
          ]
        ]
      ]
    },
    "google_place_id": "ChIJF6_Pm9FC1moRqKtVFmxXBBM",
    "has_wifi": true,
    "has_power": true,
    "has_food_nearby": false,
    "has_quiet_zone": true,
    "has_group_seating": false,
    "is_ground_floor_accessible": null,
    "has_elevator": true,
    "has_accessible_bathrooms": true,
    "has_accessible_parking": null,
    "hours_mon": "09:00-20:00",
    "hours_tue": "09:00-20:00",
    "hours_wed": "09:00-20:00",
    "hours_thu": "09:00-20:00",
    "hours_fri": "09:00-17:00",
    "hours_sat": "11:00-17:00",
    "hours_sun": "10:00-17:00"
  },
  {
    "id": "b0000000-0000-0000-0000-000000000003",
    "campus_id": "a1b2c3d4-0000-0000-0000-000000000001",
    "slug": "arts-west",
    "name": "Arts West",
    "short_name": "Arts W",
    "estimated_capacity": 400,
    "entrance_lat": -37.7958,
    "entrance_lng": 144.9586,
    "centroid_lat": -37.7957,
    "centroid_lng": 144.9588,
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.9582,
            -37.7954
          ],
          [
            144.9594,
            -37.7954
          ],
          [
            144.9594,
            -37.7962
          ],
          [
            144.9582,
            -37.7962
          ],
          [
            144.9582,
            -37.7954
          ]
        ]
      ]
    },
    "google_place_id": "ChIJLQcmm9FC1moRYOJzVmxXBBM",
    "has_wifi": true,
    "has_power": true,
    "has_food_nearby": true,
    "has_quiet_zone": false,
    "has_group_seating": true,
    "is_ground_floor_accessible": null,
    "has_elevator": null,
    "has_accessible_bathrooms": null,
    "has_accessible_parking": null,
    "hours_mon": "07:30-21:00",
    "hours_tue": "07:30-21:00",
    "hours_wed": "07:30-21:00",
    "hours_thu": "07:30-21:00",
    "hours_fri": "07:30-18:00",
    "hours_sat": null,
    "hours_sun": null
  },
  {
    "id": "b0000000-0000-0000-0000-000000000004",
    "campus_id": "a1b2c3d4-0000-0000-0000-000000000001",
    "slug": "engineering-1",
    "name": "Engineering Building 1",
    "short_name": "Eng 1",
    "estimated_capacity": 350,
    "entrance_lat": -37.799,
    "entrance_lng": 144.9635,
    "centroid_lat": -37.7991,
    "centroid_lng": 144.9637,
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.9631,
            -37.7987
          ],
          [
            144.9643,
            -37.7987
          ],
          [
            144.9643,
            -37.7996
          ],
          [
            144.9631,
            -37.7996
          ],
          [
            144.9631,
            -37.7987
          ]
        ]
      ]
    },
    "google_place_id": "ChIJP7_PnNFC1moRABDVFmxXBBM",
    "has_wifi": true,
    "has_power": true,
    "has_food_nearby": true,
    "has_quiet_zone": false,
    "has_group_seating": true,
    "is_ground_floor_accessible": null,
    "has_elevator": null,
    "has_accessible_bathrooms": null,
    "has_accessible_parking": null,
    "hours_mon": "07:30-21:00",
    "hours_tue": "07:30-21:00",
    "hours_wed": "07:30-21:00",
    "hours_thu": "07:30-21:00",
    "hours_fri": "07:30-18:00",
    "hours_sat": null,
    "hours_sun": null
  },
  {
    "id": "b0000000-0000-0000-0000-000000000005",
    "campus_id": "a1b2c3d4-0000-0000-0000-000000000001",
    "slug": "ict-building",
    "name": "Doug McDonell Building (ICT)",
    "short_name": "ICT",
    "estimated_capacity": 250,
    "entrance_lat": -37.7987,
    "entrance_lng": 144.9627,
    "centroid_lat": -37.7988,
    "centroid_lng": 144.9628,
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.9623,
            -37.7984
          ],
          [
            144.9633,
            -37.7984
          ],
          [
            144.9633,
            -37.7992
          ],
          [
            144.9623,
            -37.7992
          ],
          [
            144.9623,
            -37.7984
          ]
        ]
      ]
    },
    "google_place_id": "ChIJbRbSm9FC1moRmNdVFmxXBBM",
    "has_wifi": true,
    "has_power": true,
    "has_food_nearby": false,
    "has_quiet_zone": false,
    "has_group_seating": true,
    "is_ground_floor_accessible": null,
    "has_elevator": null,
    "has_accessible_bathrooms": null,
    "has_accessible_parking": null,
    "hours_mon": "07:30-21:00",
    "hours_tue": "07:30-21:00",
    "hours_wed": "07:30-21:00",
    "hours_thu": "07:30-21:00",
    "hours_fri": "07:30-18:00",
    "hours_sat": null,
    "hours_sun": null
  },
  {
    "id": "b0000000-0000-0000-0000-000000000008",
    "campus_id": "a1b2c3d4-0000-0000-0000-000000000001",
    "slug": "law-school",
    "name": "Melbourne Law School",
    "short_name": "Law",
    "estimated_capacity": 400,
    "entrance_lat": -37.8025,
    "entrance_lng": 144.9615,
    "centroid_lat": -37.8024,
    "centroid_lng": 144.9617,
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.9609,
            -37.8019
          ],
          [
            144.9625,
            -37.8019
          ],
          [
            144.9625,
            -37.803
          ],
          [
            144.9609,
            -37.803
          ],
          [
            144.9609,
            -37.8019
          ]
        ]
      ]
    },
    "google_place_id": null,
    "has_wifi": true,
    "has_power": true,
    "has_food_nearby": true,
    "has_quiet_zone": true,
    "has_group_seating": true,
    "is_ground_floor_accessible": null,
    "has_elevator": true,
    "has_accessible_bathrooms": true,
    "has_accessible_parking": null,
    "hours_mon": "09:00-20:00",
    "hours_tue": "09:00-20:00",
    "hours_wed": "09:00-20:00",
    "hours_thu": "09:00-20:00",
    "hours_fri": "09:00-17:00",
    "hours_sat": "11:00-17:00",
    "hours_sun": "10:00-17:00"
  },
  {
    "id": "b0000000-0000-0000-0000-000000000009",
    "campus_id": "a1b2c3d4-0000-0000-0000-000000000001",
    "slug": "fbe-building",
    "name": "FBE Building",
    "short_name": "FBE",
    "estimated_capacity": 350,
    "entrance_lat": -37.8014,
    "entrance_lng": 144.9594,
    "centroid_lat": -37.8013,
    "centroid_lng": 144.9595,
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.9587,
            -37.8008
          ],
          [
            144.9601,
            -37.8008
          ],
          [
            144.9601,
            -37.8019
          ],
          [
            144.9587,
            -37.8019
          ],
          [
            144.9587,
            -37.8008
          ]
        ]
      ]
    },
    "google_place_id": "ChIJ9eRvaS1d1moRVgtCTzcGEuU",
    "has_wifi": true,
    "has_power": true,
    "has_food_nearby": true,
    "has_quiet_zone": false,
    "has_group_seating": true,
    "is_ground_floor_accessible": null,
    "has_elevator": true,
    "has_accessible_bathrooms": true,
    "has_accessible_parking": null,
    "hours_mon": "09:00-20:00",
    "hours_tue": "09:00-20:00",
    "hours_wed": "09:00-20:00",
    "hours_thu": "09:00-20:00",
    "hours_fri": "09:00-17:00",
    "hours_sat": "11:00-17:00",
    "hours_sun": "10:00-17:00"
  },
  {
    "id": "b0000000-0000-0000-0000-00000000000a",
    "campus_id": "a1b2c3d4-0000-0000-0000-000000000001",
    "slug": "the-spot",
    "name": "The Spot",
    "short_name": "The Spot",
    "estimated_capacity": 150,
    "entrance_lat": -37.802,
    "entrance_lng": 144.958,
    "centroid_lat": -37.8019,
    "centroid_lng": 144.9581,
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.9574,
            -37.8015
          ],
          [
            144.9588,
            -37.8015
          ],
          [
            144.9588,
            -37.8025
          ],
          [
            144.9574,
            -37.8025
          ],
          [
            144.9574,
            -37.8015
          ]
        ]
      ]
    },
    "google_place_id": null,
    "has_wifi": true,
    "has_power": true,
    "has_food_nearby": true,
    "has_quiet_zone": false,
    "has_group_seating": true,
    "is_ground_floor_accessible": null,
    "has_elevator": null,
    "has_accessible_bathrooms": null,
    "has_accessible_parking": null,
    "hours_mon": "07:00-22:00",
    "hours_tue": "07:00-22:00",
    "hours_wed": "07:00-22:00",
    "hours_thu": "07:00-22:00",
    "hours_fri": "07:00-18:00",
    "hours_sat": "09:00-17:00",
    "hours_sun": null
  },
  {
    "id": "b0000000-0000-0000-0000-00000000000b",
    "campus_id": "a1b2c3d4-0000-0000-0000-000000000001",
    "slug": "melbourne-school-of-design",
    "name": "Melbourne School of Design",
    "short_name": "MSD",
    "estimated_capacity": 300,
    "entrance_lat": -37.7975,
    "entrance_lng": 144.9582,
    "centroid_lat": -37.7974,
    "centroid_lng": 144.9584,
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.9576,
            -37.797
          ],
          [
            144.9592,
            -37.797
          ],
          [
            144.9592,
            -37.798
          ],
          [
            144.9576,
            -37.798
          ],
          [
            144.9576,
            -37.797
          ]
        ]
      ]
    },
    "google_place_id": null,
    "has_wifi": true,
    "has_power": true,
    "has_food_nearby": true,
    "has_quiet_zone": false,
    "has_group_seating": true,
    "is_ground_floor_accessible": null,
    "has_elevator": true,
    "has_accessible_bathrooms": true,
    "has_accessible_parking": null,
    "hours_mon": "09:00-19:00",
    "hours_tue": "09:00-19:00",
    "hours_wed": "09:00-19:00",
    "hours_thu": "09:00-19:00",
    "hours_fri": "09:00-17:00",
    "hours_sat": "13:00-17:00",
    "hours_sun": "10:00-16:00"
  },
  {
    "id": "b0000000-0000-0000-0000-00000000000c",
    "campus_id": "a1b2c3d4-0000-0000-0000-000000000001",
    "slug": "kwong-lee-dow",
    "name": "Kwong Lee Dow Building",
    "short_name": "KLD",
    "estimated_capacity": 250,
    "entrance_lat": -37.804,
    "entrance_lng": 144.9608,
    "centroid_lat": -37.8039,
    "centroid_lng": 144.961,
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.9603,
            -37.8035
          ],
          [
            144.9617,
            -37.8035
          ],
          [
            144.9617,
            -37.8044
          ],
          [
            144.9603,
            -37.8044
          ],
          [
            144.9603,
            -37.8035
          ]
        ]
      ]
    },
    "google_place_id": null,
    "has_wifi": true,
    "has_power": true,
    "has_food_nearby": false,
    "has_quiet_zone": false,
    "has_group_seating": true,
    "is_ground_floor_accessible": null,
    "has_elevator": null,
    "has_accessible_bathrooms": null,
    "has_accessible_parking": null,
    "hours_mon": "07:30-21:00",
    "hours_tue": "07:30-21:00",
    "hours_wed": "07:30-21:00",
    "hours_thu": "07:30-21:00",
    "hours_fri": "07:30-18:00",
    "hours_sat": null,
    "hours_sun": null
  },
  {
    "id": "b0000000-0000-0000-0000-00000000000d",
    "campus_id": "a1b2c3d4-0000-0000-0000-000000000001",
    "slug": "old-arts",
    "name": "Old Arts Building",
    "short_name": "Old Arts",
    "estimated_capacity": 300,
    "entrance_lat": -37.7975,
    "entrance_lng": 144.9612,
    "centroid_lat": -37.7974,
    "centroid_lng": 144.9614,
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.9607,
            -37.797
          ],
          [
            144.9621,
            -37.797
          ],
          [
            144.9621,
            -37.798
          ],
          [
            144.9607,
            -37.798
          ],
          [
            144.9607,
            -37.797
          ]
        ]
      ]
    },
    "google_place_id": null,
    "has_wifi": true,
    "has_power": true,
    "has_food_nearby": true,
    "has_quiet_zone": false,
    "has_group_seating": true,
    "is_ground_floor_accessible": null,
    "has_elevator": null,
    "has_accessible_bathrooms": null,
    "has_accessible_parking": null,
    "hours_mon": "07:30-21:00",
    "hours_tue": "07:30-21:00",
    "hours_wed": "07:30-21:00",
    "hours_thu": "07:30-21:00",
    "hours_fri": "07:30-18:00",
    "hours_sat": null,
    "hours_sun": null
  },
  {
    "id": "b0000000-0000-0000-0000-00000000000e",
    "campus_id": "a1b2c3d4-0000-0000-0000-000000000001",
    "slug": "redmond-barry",
    "name": "Redmond Barry Building",
    "short_name": "RBB",
    "estimated_capacity": 350,
    "entrance_lat": -37.7967,
    "entrance_lng": 144.9627,
    "centroid_lat": -37.7966,
    "centroid_lng": 144.9628,
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.9622,
            -37.7963
          ],
          [
            144.9634,
            -37.7963
          ],
          [
            144.9634,
            -37.7972
          ],
          [
            144.9622,
            -37.7972
          ],
          [
            144.9622,
            -37.7963
          ]
        ]
      ]
    },
    "google_place_id": "ChIJC0qI6NRCd0gRr7ZEi3c93fA",
    "has_wifi": true,
    "has_power": true,
    "has_food_nearby": false,
    "has_quiet_zone": false,
    "has_group_seating": true,
    "is_ground_floor_accessible": null,
    "has_elevator": null,
    "has_accessible_bathrooms": null,
    "has_accessible_parking": null,
    "hours_mon": "07:30-21:00",
    "hours_tue": "07:30-21:00",
    "hours_wed": "07:30-21:00",
    "hours_thu": "07:30-21:00",
    "hours_fri": "07:30-18:00",
    "hours_sat": null,
    "hours_sun": null
  },
  {
    "id": "b0000000-0000-0000-0000-00000000000f",
    "campus_id": "a1b2c3d4-0000-0000-0000-000000000001",
    "slug": "john-medley",
    "name": "John Medley Building",
    "short_name": "Medley",
    "estimated_capacity": 250,
    "entrance_lat": -37.7992,
    "entrance_lng": 144.9604,
    "centroid_lat": -37.7991,
    "centroid_lng": 144.9606,
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.9599,
            -37.7988
          ],
          [
            144.9611,
            -37.7988
          ],
          [
            144.9611,
            -37.7997
          ],
          [
            144.9599,
            -37.7997
          ],
          [
            144.9599,
            -37.7988
          ]
        ]
      ]
    },
    "google_place_id": null,
    "has_wifi": true,
    "has_power": true,
    "has_food_nearby": true,
    "has_quiet_zone": false,
    "has_group_seating": true,
    "is_ground_floor_accessible": null,
    "has_elevator": null,
    "has_accessible_bathrooms": null,
    "has_accessible_parking": null,
    "hours_mon": "07:30-21:00",
    "hours_tue": "07:30-21:00",
    "hours_wed": "07:30-21:00",
    "hours_thu": "07:30-21:00",
    "hours_fri": "07:30-18:00",
    "hours_sat": null,
    "hours_sun": null
  },
  {
    "id": "b0000000-0000-0000-0000-000000000010",
    "campus_id": "a1b2c3d4-0000-0000-0000-000000000001",
    "slug": "chemistry-building",
    "name": "Chemistry Building",
    "short_name": "Chem",
    "estimated_capacity": 300,
    "entrance_lat": -37.7975,
    "entrance_lng": 144.9625,
    "centroid_lat": -37.7974,
    "centroid_lng": 144.9627,
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.962,
            -37.797
          ],
          [
            144.9634,
            -37.797
          ],
          [
            144.9634,
            -37.798
          ],
          [
            144.962,
            -37.798
          ],
          [
            144.962,
            -37.797
          ]
        ]
      ]
    },
    "google_place_id": null,
    "has_wifi": true,
    "has_power": true,
    "has_food_nearby": false,
    "has_quiet_zone": false,
    "has_group_seating": true,
    "is_ground_floor_accessible": null,
    "has_elevator": null,
    "has_accessible_bathrooms": null,
    "has_accessible_parking": null,
    "hours_mon": "07:30-21:00",
    "hours_tue": "07:30-21:00",
    "hours_wed": "07:30-21:00",
    "hours_thu": "07:30-21:00",
    "hours_fri": "07:30-18:00",
    "hours_sat": null,
    "hours_sun": null
  },
  {
    "id": "b0000000-0000-0000-0000-000000000011",
    "campus_id": "a1b2c3d4-0000-0000-0000-000000000001",
    "slug": "peter-hall",
    "name": "Peter Hall Building",
    "short_name": "Peter Hall",
    "estimated_capacity": 250,
    "entrance_lat": -37.797,
    "entrance_lng": 144.9637,
    "centroid_lat": -37.7969,
    "centroid_lng": 144.9638,
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.9632,
            -37.7965
          ],
          [
            144.9644,
            -37.7965
          ],
          [
            144.9644,
            -37.7974
          ],
          [
            144.9632,
            -37.7974
          ],
          [
            144.9632,
            -37.7965
          ]
        ]
      ]
    },
    "google_place_id": null,
    "has_wifi": true,
    "has_power": true,
    "has_food_nearby": false,
    "has_quiet_zone": false,
    "has_group_seating": true,
    "is_ground_floor_accessible": null,
    "has_elevator": null,
    "has_accessible_bathrooms": null,
    "has_accessible_parking": null,
    "hours_mon": "07:30-21:00",
    "hours_tue": "07:30-21:00",
    "hours_wed": "07:30-21:00",
    "hours_thu": "07:30-21:00",
    "hours_fri": "07:30-18:00",
    "hours_sat": null,
    "hours_sun": null
  },
  {
    "id": "b0000000-0000-0000-0000-000000000012",
    "campus_id": "a1b2c3d4-0000-0000-0000-000000000001",
    "slug": "alan-gilbert",
    "name": "Alan Gilbert Building",
    "short_name": "Alan Gilbert",
    "estimated_capacity": 400,
    "entrance_lat": -37.8002,
    "entrance_lng": 144.9596,
    "centroid_lat": -37.8001,
    "centroid_lng": 144.9598,
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.959,
            -37.7997
          ],
          [
            144.9606,
            -37.7997
          ],
          [
            144.9606,
            -37.8007
          ],
          [
            144.959,
            -37.8007
          ],
          [
            144.959,
            -37.7997
          ]
        ]
      ]
    },
    "google_place_id": null,
    "has_wifi": true,
    "has_power": true,
    "has_food_nearby": true,
    "has_quiet_zone": true,
    "has_group_seating": true,
    "is_ground_floor_accessible": null,
    "has_elevator": null,
    "has_accessible_bathrooms": null,
    "has_accessible_parking": null,
    "hours_mon": "07:00-22:00",
    "hours_tue": "07:00-22:00",
    "hours_wed": "07:00-22:00",
    "hours_thu": "07:00-22:00",
    "hours_fri": "07:00-18:00",
    "hours_sat": "09:00-17:00",
    "hours_sun": null
  },
  {
    "id": "b0000000-0000-0000-0000-000000000013",
    "campus_id": "a1b2c3d4-0000-0000-0000-000000000001",
    "slug": "student-pavilion",
    "name": "Student Pavilion",
    "short_name": "Student Pav",
    "estimated_capacity": 300,
    "entrance_lat": -37.7968,
    "entrance_lng": 144.9633,
    "centroid_lat": -37.7967,
    "centroid_lng": 144.9634,
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.9627,
            -37.7963
          ],
          [
            144.9641,
            -37.7963
          ],
          [
            144.9641,
            -37.7972
          ],
          [
            144.9627,
            -37.7972
          ],
          [
            144.9627,
            -37.7963
          ]
        ]
      ]
    },
    "google_place_id": null,
    "has_wifi": true,
    "has_power": true,
    "has_food_nearby": true,
    "has_quiet_zone": false,
    "has_group_seating": true,
    "is_ground_floor_accessible": null,
    "has_elevator": null,
    "has_accessible_bathrooms": null,
    "has_accessible_parking": null,
    "hours_mon": "07:00-22:00",
    "hours_tue": "07:00-22:00",
    "hours_wed": "07:00-22:00",
    "hours_thu": "07:00-22:00",
    "hours_fri": "07:00-18:00",
    "hours_sat": "09:00-17:00",
    "hours_sun": null
  },
  {
    "id": "b0000000-0000-0000-0000-000000000014",
    "campus_id": "a1b2c3d4-0000-0000-0000-000000000001",
    "slug": "david-caro",
    "name": "David Caro Building",
    "short_name": "Physics",
    "estimated_capacity": 300,
    "entrance_lat": -37.7975,
    "entrance_lng": 144.964,
    "centroid_lat": -37.7974,
    "centroid_lng": 144.9642,
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.9635,
            -37.797
          ],
          [
            144.9649,
            -37.797
          ],
          [
            144.9649,
            -37.798
          ],
          [
            144.9635,
            -37.798
          ],
          [
            144.9635,
            -37.797
          ]
        ]
      ]
    },
    "google_place_id": null,
    "has_wifi": true,
    "has_power": true,
    "has_food_nearby": false,
    "has_quiet_zone": false,
    "has_group_seating": true,
    "is_ground_floor_accessible": null,
    "has_elevator": null,
    "has_accessible_bathrooms": null,
    "has_accessible_parking": null,
    "hours_mon": "07:30-21:00",
    "hours_tue": "07:30-21:00",
    "hours_wed": "07:30-21:00",
    "hours_thu": "07:30-21:00",
    "hours_fri": "07:30-18:00",
    "hours_sat": null,
    "hours_sun": null
  }
] as unknown as Building[]

export const SEED_ZONES = [
  {
    "id": "c0000000-0000-0000-0001-000000000001",
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "zone_slug": "baillieu-ground",
    "zone_name": "Ground Floor",
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.959,
            -37.7976
          ],
          [
            144.9606,
            -37.7976
          ],
          [
            144.9606,
            -37.7985
          ],
          [
            144.959,
            -37.7985
          ],
          [
            144.959,
            -37.7976
          ]
        ]
      ]
    },
    "capacity": 250,
    "floor_level": 0,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true
  },
  {
    "id": "c0000000-0000-0000-0001-000000000002",
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "zone_slug": "baillieu-level1",
    "zone_name": "Level 1",
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.959,
            -37.7976
          ],
          [
            144.9606,
            -37.7976
          ],
          [
            144.9606,
            -37.7985
          ],
          [
            144.959,
            -37.7985
          ],
          [
            144.959,
            -37.7976
          ]
        ]
      ]
    },
    "capacity": 300,
    "floor_level": 1,
    "is_quiet_zone": true,
    "has_power": true,
    "is_accessible": true
  },
  {
    "id": "c0000000-0000-0000-0001-000000000003",
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "zone_slug": "baillieu-level2",
    "zone_name": "Level 2 — Reading Room",
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.959,
            -37.7976
          ],
          [
            144.9606,
            -37.7976
          ],
          [
            144.9606,
            -37.7985
          ],
          [
            144.959,
            -37.7985
          ],
          [
            144.959,
            -37.7976
          ]
        ]
      ]
    },
    "capacity": 250,
    "floor_level": 2,
    "is_quiet_zone": true,
    "has_power": true,
    "is_accessible": true
  },
  {
    "id": "c0000000-0000-0000-0002-000000000001",
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "zone_slug": "erc-ground",
    "zone_name": "Ground Floor",
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.9636,
            -37.7969
          ],
          [
            144.9646,
            -37.7969
          ],
          [
            144.9646,
            -37.7976
          ],
          [
            144.9636,
            -37.7976
          ],
          [
            144.9636,
            -37.7969
          ]
        ]
      ]
    },
    "capacity": 150,
    "floor_level": 0,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true
  },
  {
    "id": "c0000000-0000-0000-0002-000000000002",
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "zone_slug": "erc-level1",
    "zone_name": "Level 1 — Quiet Study",
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.9636,
            -37.7969
          ],
          [
            144.9646,
            -37.7969
          ],
          [
            144.9646,
            -37.7976
          ],
          [
            144.9636,
            -37.7976
          ],
          [
            144.9636,
            -37.7969
          ]
        ]
      ]
    },
    "capacity": 150,
    "floor_level": 1,
    "is_quiet_zone": true,
    "has_power": true,
    "is_accessible": true
  },
  {
    "id": "c0000000-0000-0000-0003-000000000001",
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "zone_slug": "arts-west-ground",
    "zone_name": "Ground Floor — Forum",
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.9582,
            -37.7954
          ],
          [
            144.9594,
            -37.7954
          ],
          [
            144.9594,
            -37.7962
          ],
          [
            144.9582,
            -37.7962
          ],
          [
            144.9582,
            -37.7954
          ]
        ]
      ]
    },
    "capacity": 150,
    "floor_level": 0,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true
  },
  {
    "id": "c0000000-0000-0000-0003-000000000002",
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "zone_slug": "arts-west-level1",
    "zone_name": "Level 1",
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.9582,
            -37.7954
          ],
          [
            144.9594,
            -37.7954
          ],
          [
            144.9594,
            -37.7962
          ],
          [
            144.9582,
            -37.7962
          ],
          [
            144.9582,
            -37.7954
          ]
        ]
      ]
    },
    "capacity": 130,
    "floor_level": 1,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true
  },
  {
    "id": "c0000000-0000-0000-0003-000000000003",
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "zone_slug": "arts-west-level2",
    "zone_name": "Level 2",
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.9582,
            -37.7954
          ],
          [
            144.9594,
            -37.7954
          ],
          [
            144.9594,
            -37.7962
          ],
          [
            144.9582,
            -37.7962
          ],
          [
            144.9582,
            -37.7954
          ]
        ]
      ]
    },
    "capacity": 120,
    "floor_level": 2,
    "is_quiet_zone": false,
    "has_power": false,
    "is_accessible": true
  },
  {
    "id": "c0000000-0000-0000-0004-000000000001",
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "zone_slug": "eng1-ground",
    "zone_name": "Ground Floor",
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.9631,
            -37.7987
          ],
          [
            144.9643,
            -37.7987
          ],
          [
            144.9643,
            -37.7996
          ],
          [
            144.9631,
            -37.7996
          ],
          [
            144.9631,
            -37.7987
          ]
        ]
      ]
    },
    "capacity": 120,
    "floor_level": 0,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": false
  },
  {
    "id": "c0000000-0000-0000-0004-000000000002",
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "zone_slug": "eng1-level1",
    "zone_name": "Level 1",
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.9631,
            -37.7987
          ],
          [
            144.9643,
            -37.7987
          ],
          [
            144.9643,
            -37.7996
          ],
          [
            144.9631,
            -37.7996
          ],
          [
            144.9631,
            -37.7987
          ]
        ]
      ]
    },
    "capacity": 120,
    "floor_level": 1,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true
  },
  {
    "id": "c0000000-0000-0000-0004-000000000003",
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "zone_slug": "eng1-level2",
    "zone_name": "Level 2",
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.9631,
            -37.7987
          ],
          [
            144.9643,
            -37.7987
          ],
          [
            144.9643,
            -37.7996
          ],
          [
            144.9631,
            -37.7996
          ],
          [
            144.9631,
            -37.7987
          ]
        ]
      ]
    },
    "capacity": 110,
    "floor_level": 2,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true
  },
  {
    "id": "c0000000-0000-0000-0005-000000000001",
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "zone_slug": "ict-ground",
    "zone_name": "Ground Floor",
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.9623,
            -37.7984
          ],
          [
            144.9633,
            -37.7984
          ],
          [
            144.9633,
            -37.7992
          ],
          [
            144.9623,
            -37.7992
          ],
          [
            144.9623,
            -37.7984
          ]
        ]
      ]
    },
    "capacity": 130,
    "floor_level": 0,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true
  },
  {
    "id": "c0000000-0000-0000-0005-000000000002",
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "zone_slug": "ict-level1",
    "zone_name": "Level 1",
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.9623,
            -37.7984
          ],
          [
            144.9633,
            -37.7984
          ],
          [
            144.9633,
            -37.7992
          ],
          [
            144.9623,
            -37.7992
          ],
          [
            144.9623,
            -37.7984
          ]
        ]
      ]
    },
    "capacity": 120,
    "floor_level": 1,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true
  },
  {
    "id": "c0000000-0000-0000-0008-000000000001",
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "zone_slug": "law-ground",
    "zone_name": "Ground Floor",
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.9609,
            -37.8019
          ],
          [
            144.9625,
            -37.8019
          ],
          [
            144.9625,
            -37.803
          ],
          [
            144.9609,
            -37.803
          ],
          [
            144.9609,
            -37.8019
          ]
        ]
      ]
    },
    "capacity": 130,
    "floor_level": 0,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true
  },
  {
    "id": "c0000000-0000-0000-0008-000000000002",
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "zone_slug": "law-level1",
    "zone_name": "Level 1",
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.9609,
            -37.8019
          ],
          [
            144.9625,
            -37.8019
          ],
          [
            144.9625,
            -37.803
          ],
          [
            144.9609,
            -37.803
          ],
          [
            144.9609,
            -37.8019
          ]
        ]
      ]
    },
    "capacity": 140,
    "floor_level": 1,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true
  },
  {
    "id": "c0000000-0000-0000-0008-000000000003",
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "zone_slug": "law-level2",
    "zone_name": "Level 2 — Law Library",
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.9609,
            -37.8019
          ],
          [
            144.9625,
            -37.8019
          ],
          [
            144.9625,
            -37.803
          ],
          [
            144.9609,
            -37.803
          ],
          [
            144.9609,
            -37.8019
          ]
        ]
      ]
    },
    "capacity": 130,
    "floor_level": 2,
    "is_quiet_zone": true,
    "has_power": true,
    "is_accessible": true
  },
  {
    "id": "c0000000-0000-0000-0009-000000000001",
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "zone_slug": "fbe-ground",
    "zone_name": "Ground Floor",
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.9587,
            -37.8008
          ],
          [
            144.9601,
            -37.8008
          ],
          [
            144.9601,
            -37.8019
          ],
          [
            144.9587,
            -37.8019
          ],
          [
            144.9587,
            -37.8008
          ]
        ]
      ]
    },
    "capacity": 120,
    "floor_level": 0,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true
  },
  {
    "id": "c0000000-0000-0000-0009-000000000002",
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "zone_slug": "fbe-level1",
    "zone_name": "Level 1",
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.9587,
            -37.8008
          ],
          [
            144.9601,
            -37.8008
          ],
          [
            144.9601,
            -37.8019
          ],
          [
            144.9587,
            -37.8019
          ],
          [
            144.9587,
            -37.8008
          ]
        ]
      ]
    },
    "capacity": 120,
    "floor_level": 1,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true
  },
  {
    "id": "c0000000-0000-0000-0009-000000000003",
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "zone_slug": "fbe-level2",
    "zone_name": "Level 2",
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.9587,
            -37.8008
          ],
          [
            144.9601,
            -37.8008
          ],
          [
            144.9601,
            -37.8019
          ],
          [
            144.9587,
            -37.8019
          ],
          [
            144.9587,
            -37.8008
          ]
        ]
      ]
    },
    "capacity": 110,
    "floor_level": 2,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true
  },
  {
    "id": "c0000000-0000-0000-000a-000000000001",
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "zone_slug": "the-spot-ground",
    "zone_name": "Ground Floor — Cafe & Study",
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.9574,
            -37.8015
          ],
          [
            144.9588,
            -37.8015
          ],
          [
            144.9588,
            -37.8025
          ],
          [
            144.9574,
            -37.8025
          ],
          [
            144.9574,
            -37.8015
          ]
        ]
      ]
    },
    "capacity": 80,
    "floor_level": 0,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true
  },
  {
    "id": "c0000000-0000-0000-000a-000000000002",
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "zone_slug": "the-spot-level1",
    "zone_name": "Level 1 — Study Space",
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.9574,
            -37.8015
          ],
          [
            144.9588,
            -37.8015
          ],
          [
            144.9588,
            -37.8025
          ],
          [
            144.9574,
            -37.8025
          ],
          [
            144.9574,
            -37.8015
          ]
        ]
      ]
    },
    "capacity": 70,
    "floor_level": 1,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true
  },
  {
    "id": "c0000000-0000-0000-000b-000000000001",
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "zone_slug": "msd-ground",
    "zone_name": "Ground Floor — Gallery",
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.9576,
            -37.797
          ],
          [
            144.9592,
            -37.797
          ],
          [
            144.9592,
            -37.798
          ],
          [
            144.9576,
            -37.798
          ],
          [
            144.9576,
            -37.797
          ]
        ]
      ]
    },
    "capacity": 100,
    "floor_level": 0,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true
  },
  {
    "id": "c0000000-0000-0000-000b-000000000002",
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "zone_slug": "msd-level1",
    "zone_name": "Level 1 — Studios",
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.9576,
            -37.797
          ],
          [
            144.9592,
            -37.797
          ],
          [
            144.9592,
            -37.798
          ],
          [
            144.9576,
            -37.798
          ],
          [
            144.9576,
            -37.797
          ]
        ]
      ]
    },
    "capacity": 100,
    "floor_level": 1,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true
  },
  {
    "id": "c0000000-0000-0000-000b-000000000003",
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "zone_slug": "msd-level2",
    "zone_name": "Level 2 — Crit Spaces",
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.9576,
            -37.797
          ],
          [
            144.9592,
            -37.797
          ],
          [
            144.9592,
            -37.798
          ],
          [
            144.9576,
            -37.798
          ],
          [
            144.9576,
            -37.797
          ]
        ]
      ]
    },
    "capacity": 100,
    "floor_level": 2,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true
  },
  {
    "id": "c0000000-0000-0000-000c-000000000001",
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "zone_slug": "kld-ground",
    "zone_name": "Ground Floor",
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.9603,
            -37.8035
          ],
          [
            144.9617,
            -37.8035
          ],
          [
            144.9617,
            -37.8044
          ],
          [
            144.9603,
            -37.8044
          ],
          [
            144.9603,
            -37.8035
          ]
        ]
      ]
    },
    "capacity": 80,
    "floor_level": 0,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true
  },
  {
    "id": "c0000000-0000-0000-000c-000000000002",
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "zone_slug": "kld-level1",
    "zone_name": "Level 1",
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.9603,
            -37.8035
          ],
          [
            144.9617,
            -37.8035
          ],
          [
            144.9617,
            -37.8044
          ],
          [
            144.9603,
            -37.8044
          ],
          [
            144.9603,
            -37.8035
          ]
        ]
      ]
    },
    "capacity": 90,
    "floor_level": 1,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true
  },
  {
    "id": "c0000000-0000-0000-000c-000000000003",
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "zone_slug": "kld-level2",
    "zone_name": "Level 2 — Lecture Theatre",
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.9603,
            -37.8035
          ],
          [
            144.9617,
            -37.8035
          ],
          [
            144.9617,
            -37.8044
          ],
          [
            144.9603,
            -37.8044
          ],
          [
            144.9603,
            -37.8035
          ]
        ]
      ]
    },
    "capacity": 80,
    "floor_level": 2,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true
  },
  {
    "id": "c0000000-0000-0000-000d-000000000001",
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "zone_slug": "old-arts-ground",
    "zone_name": "Ground Floor",
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.9607,
            -37.797
          ],
          [
            144.9621,
            -37.797
          ],
          [
            144.9621,
            -37.798
          ],
          [
            144.9607,
            -37.798
          ],
          [
            144.9607,
            -37.797
          ]
        ]
      ]
    },
    "capacity": 150,
    "floor_level": 0,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true
  },
  {
    "id": "c0000000-0000-0000-000d-000000000002",
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "zone_slug": "old-arts-level1",
    "zone_name": "Level 1",
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.9607,
            -37.797
          ],
          [
            144.9621,
            -37.797
          ],
          [
            144.9621,
            -37.798
          ],
          [
            144.9607,
            -37.798
          ],
          [
            144.9607,
            -37.797
          ]
        ]
      ]
    },
    "capacity": 150,
    "floor_level": 1,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true
  },
  {
    "id": "c0000000-0000-0000-000e-000000000001",
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "zone_slug": "rbb-ground",
    "zone_name": "Ground Floor",
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.9622,
            -37.7963
          ],
          [
            144.9634,
            -37.7963
          ],
          [
            144.9634,
            -37.7972
          ],
          [
            144.9622,
            -37.7972
          ],
          [
            144.9622,
            -37.7963
          ]
        ]
      ]
    },
    "capacity": 120,
    "floor_level": 0,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true
  },
  {
    "id": "c0000000-0000-0000-000e-000000000002",
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "zone_slug": "rbb-level1",
    "zone_name": "Level 1",
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.9622,
            -37.7963
          ],
          [
            144.9634,
            -37.7963
          ],
          [
            144.9634,
            -37.7972
          ],
          [
            144.9622,
            -37.7972
          ],
          [
            144.9622,
            -37.7963
          ]
        ]
      ]
    },
    "capacity": 120,
    "floor_level": 1,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true
  },
  {
    "id": "c0000000-0000-0000-000e-000000000003",
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "zone_slug": "rbb-level2",
    "zone_name": "Level 2",
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.9622,
            -37.7963
          ],
          [
            144.9634,
            -37.7963
          ],
          [
            144.9634,
            -37.7972
          ],
          [
            144.9622,
            -37.7972
          ],
          [
            144.9622,
            -37.7963
          ]
        ]
      ]
    },
    "capacity": 110,
    "floor_level": 2,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true
  },
  {
    "id": "c0000000-0000-0000-000f-000000000001",
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "zone_slug": "medley-ground",
    "zone_name": "Ground Floor",
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.9599,
            -37.7988
          ],
          [
            144.9611,
            -37.7988
          ],
          [
            144.9611,
            -37.7997
          ],
          [
            144.9599,
            -37.7997
          ],
          [
            144.9599,
            -37.7988
          ]
        ]
      ]
    },
    "capacity": 130,
    "floor_level": 0,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true
  },
  {
    "id": "c0000000-0000-0000-000f-000000000002",
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "zone_slug": "medley-level1",
    "zone_name": "Level 1",
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.9599,
            -37.7988
          ],
          [
            144.9611,
            -37.7988
          ],
          [
            144.9611,
            -37.7997
          ],
          [
            144.9599,
            -37.7997
          ],
          [
            144.9599,
            -37.7988
          ]
        ]
      ]
    },
    "capacity": 120,
    "floor_level": 1,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true
  },
  {
    "id": "c0000000-0000-0000-0010-000000000001",
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "zone_slug": "chem-ground",
    "zone_name": "Ground Floor",
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.962,
            -37.797
          ],
          [
            144.9634,
            -37.797
          ],
          [
            144.9634,
            -37.798
          ],
          [
            144.962,
            -37.798
          ],
          [
            144.962,
            -37.797
          ]
        ]
      ]
    },
    "capacity": 100,
    "floor_level": 0,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true
  },
  {
    "id": "c0000000-0000-0000-0010-000000000002",
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "zone_slug": "chem-level1",
    "zone_name": "Level 1 — Labs",
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.962,
            -37.797
          ],
          [
            144.9634,
            -37.797
          ],
          [
            144.9634,
            -37.798
          ],
          [
            144.962,
            -37.798
          ],
          [
            144.962,
            -37.797
          ]
        ]
      ]
    },
    "capacity": 100,
    "floor_level": 1,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true
  },
  {
    "id": "c0000000-0000-0000-0010-000000000003",
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "zone_slug": "chem-level2",
    "zone_name": "Level 2 — Lecture Theatres",
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.962,
            -37.797
          ],
          [
            144.9634,
            -37.797
          ],
          [
            144.9634,
            -37.798
          ],
          [
            144.962,
            -37.798
          ],
          [
            144.962,
            -37.797
          ]
        ]
      ]
    },
    "capacity": 100,
    "floor_level": 2,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true
  },
  {
    "id": "c0000000-0000-0000-0011-000000000001",
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "zone_slug": "peter-hall-ground",
    "zone_name": "Ground Floor",
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.9632,
            -37.7965
          ],
          [
            144.9644,
            -37.7965
          ],
          [
            144.9644,
            -37.7974
          ],
          [
            144.9632,
            -37.7974
          ],
          [
            144.9632,
            -37.7965
          ]
        ]
      ]
    },
    "capacity": 130,
    "floor_level": 0,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true
  },
  {
    "id": "c0000000-0000-0000-0011-000000000002",
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "zone_slug": "peter-hall-level1",
    "zone_name": "Level 1",
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.9632,
            -37.7965
          ],
          [
            144.9644,
            -37.7965
          ],
          [
            144.9644,
            -37.7974
          ],
          [
            144.9632,
            -37.7974
          ],
          [
            144.9632,
            -37.7965
          ]
        ]
      ]
    },
    "capacity": 120,
    "floor_level": 1,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true
  },
  {
    "id": "c0000000-0000-0000-0012-000000000001",
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "zone_slug": "alan-gilbert-ground",
    "zone_name": "Ground Floor — Gilbert at Grattan Cafe",
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.959,
            -37.7997
          ],
          [
            144.9606,
            -37.7997
          ],
          [
            144.9606,
            -37.8007
          ],
          [
            144.959,
            -37.8007
          ],
          [
            144.959,
            -37.7997
          ]
        ]
      ]
    },
    "capacity": 130,
    "floor_level": 0,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true
  },
  {
    "id": "c0000000-0000-0000-0012-000000000002",
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "zone_slug": "alan-gilbert-level1",
    "zone_name": "Level 1 — Learning Spaces",
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.959,
            -37.7997
          ],
          [
            144.9606,
            -37.7997
          ],
          [
            144.9606,
            -37.8007
          ],
          [
            144.959,
            -37.8007
          ],
          [
            144.959,
            -37.7997
          ]
        ]
      ]
    },
    "capacity": 140,
    "floor_level": 1,
    "is_quiet_zone": true,
    "has_power": true,
    "is_accessible": true
  },
  {
    "id": "c0000000-0000-0000-0012-000000000003",
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "zone_slug": "alan-gilbert-level2",
    "zone_name": "Level 2",
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.959,
            -37.7997
          ],
          [
            144.9606,
            -37.7997
          ],
          [
            144.9606,
            -37.8007
          ],
          [
            144.959,
            -37.8007
          ],
          [
            144.959,
            -37.7997
          ]
        ]
      ]
    },
    "capacity": 130,
    "floor_level": 2,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true
  },
  {
    "id": "c0000000-0000-0000-0013-000000000001",
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "zone_slug": "student-pav-ground",
    "zone_name": "Ground Floor — Food Court & Social",
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.9627,
            -37.7963
          ],
          [
            144.9641,
            -37.7963
          ],
          [
            144.9641,
            -37.7972
          ],
          [
            144.9627,
            -37.7972
          ],
          [
            144.9627,
            -37.7963
          ]
        ]
      ]
    },
    "capacity": 160,
    "floor_level": 0,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true
  },
  {
    "id": "c0000000-0000-0000-0013-000000000002",
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "zone_slug": "student-pav-level1",
    "zone_name": "Level 1 — Study & Events",
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.9627,
            -37.7963
          ],
          [
            144.9641,
            -37.7963
          ],
          [
            144.9641,
            -37.7972
          ],
          [
            144.9627,
            -37.7972
          ],
          [
            144.9627,
            -37.7963
          ]
        ]
      ]
    },
    "capacity": 140,
    "floor_level": 1,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true
  },
  {
    "id": "c0000000-0000-0000-0014-000000000001",
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "zone_slug": "physics-ground",
    "zone_name": "Ground Floor",
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.9635,
            -37.797
          ],
          [
            144.9649,
            -37.797
          ],
          [
            144.9649,
            -37.798
          ],
          [
            144.9635,
            -37.798
          ],
          [
            144.9635,
            -37.797
          ]
        ]
      ]
    },
    "capacity": 100,
    "floor_level": 0,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true
  },
  {
    "id": "c0000000-0000-0000-0014-000000000002",
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "zone_slug": "physics-level1",
    "zone_name": "Level 1 — Labs",
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.9635,
            -37.797
          ],
          [
            144.9649,
            -37.797
          ],
          [
            144.9649,
            -37.798
          ],
          [
            144.9635,
            -37.798
          ],
          [
            144.9635,
            -37.797
          ]
        ]
      ]
    },
    "capacity": 100,
    "floor_level": 1,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true
  },
  {
    "id": "c0000000-0000-0000-0014-000000000003",
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "zone_slug": "physics-level2",
    "zone_name": "Level 2 — Lecture Theatres",
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.9635,
            -37.797
          ],
          [
            144.9649,
            -37.797
          ],
          [
            144.9649,
            -37.798
          ],
          [
            144.9635,
            -37.798
          ],
          [
            144.9635,
            -37.797
          ]
        ]
      ]
    },
    "capacity": 100,
    "floor_level": 2,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true
  }
] as unknown as BuildingZone[]

export const SEED_TYPICAL_CURVES = [
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 1,
    "hour_of_day": 8,
    "typical_popularity": 15
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 1,
    "hour_of_day": 9,
    "typical_popularity": 30
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 1,
    "hour_of_day": 10,
    "typical_popularity": 50
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 1,
    "hour_of_day": 11,
    "typical_popularity": 65
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 1,
    "hour_of_day": 12,
    "typical_popularity": 78
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 1,
    "hour_of_day": 13,
    "typical_popularity": 80
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 1,
    "hour_of_day": 14,
    "typical_popularity": 75
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 1,
    "hour_of_day": 15,
    "typical_popularity": 68
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 1,
    "hour_of_day": 16,
    "typical_popularity": 60
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 1,
    "hour_of_day": 17,
    "typical_popularity": 55
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 1,
    "hour_of_day": 18,
    "typical_popularity": 50
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 1,
    "hour_of_day": 19,
    "typical_popularity": 45
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 1,
    "hour_of_day": 20,
    "typical_popularity": 38
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 1,
    "hour_of_day": 21,
    "typical_popularity": 25
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 2,
    "hour_of_day": 8,
    "typical_popularity": 18
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 2,
    "hour_of_day": 9,
    "typical_popularity": 33
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 2,
    "hour_of_day": 10,
    "typical_popularity": 52
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 2,
    "hour_of_day": 11,
    "typical_popularity": 68
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 2,
    "hour_of_day": 12,
    "typical_popularity": 80
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 2,
    "hour_of_day": 13,
    "typical_popularity": 82
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 2,
    "hour_of_day": 14,
    "typical_popularity": 76
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 2,
    "hour_of_day": 15,
    "typical_popularity": 70
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 2,
    "hour_of_day": 16,
    "typical_popularity": 62
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 2,
    "hour_of_day": 17,
    "typical_popularity": 56
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 2,
    "hour_of_day": 18,
    "typical_popularity": 51
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 2,
    "hour_of_day": 19,
    "typical_popularity": 46
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 2,
    "hour_of_day": 20,
    "typical_popularity": 40
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 2,
    "hour_of_day": 21,
    "typical_popularity": 27
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 3,
    "hour_of_day": 8,
    "typical_popularity": 20
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 3,
    "hour_of_day": 9,
    "typical_popularity": 36
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 3,
    "hour_of_day": 10,
    "typical_popularity": 55
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 3,
    "hour_of_day": 11,
    "typical_popularity": 70
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 3,
    "hour_of_day": 12,
    "typical_popularity": 83
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 3,
    "hour_of_day": 13,
    "typical_popularity": 85
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 3,
    "hour_of_day": 14,
    "typical_popularity": 78
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 3,
    "hour_of_day": 15,
    "typical_popularity": 72
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 3,
    "hour_of_day": 16,
    "typical_popularity": 65
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 3,
    "hour_of_day": 17,
    "typical_popularity": 58
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 3,
    "hour_of_day": 18,
    "typical_popularity": 52
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 3,
    "hour_of_day": 19,
    "typical_popularity": 47
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 3,
    "hour_of_day": 20,
    "typical_popularity": 40
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 3,
    "hour_of_day": 21,
    "typical_popularity": 28
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 4,
    "hour_of_day": 8,
    "typical_popularity": 17
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 4,
    "hour_of_day": 9,
    "typical_popularity": 32
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 4,
    "hour_of_day": 10,
    "typical_popularity": 51
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 4,
    "hour_of_day": 11,
    "typical_popularity": 66
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 4,
    "hour_of_day": 12,
    "typical_popularity": 79
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 4,
    "hour_of_day": 13,
    "typical_popularity": 81
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 4,
    "hour_of_day": 14,
    "typical_popularity": 74
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 4,
    "hour_of_day": 15,
    "typical_popularity": 67
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 4,
    "hour_of_day": 16,
    "typical_popularity": 60
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 4,
    "hour_of_day": 17,
    "typical_popularity": 54
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 4,
    "hour_of_day": 18,
    "typical_popularity": 48
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 4,
    "hour_of_day": 19,
    "typical_popularity": 43
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 4,
    "hour_of_day": 20,
    "typical_popularity": 37
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 4,
    "hour_of_day": 21,
    "typical_popularity": 24
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 5,
    "hour_of_day": 8,
    "typical_popularity": 14
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 5,
    "hour_of_day": 9,
    "typical_popularity": 28
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 5,
    "hour_of_day": 10,
    "typical_popularity": 45
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 5,
    "hour_of_day": 11,
    "typical_popularity": 58
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 5,
    "hour_of_day": 12,
    "typical_popularity": 68
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 5,
    "hour_of_day": 13,
    "typical_popularity": 65
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 5,
    "hour_of_day": 14,
    "typical_popularity": 58
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 5,
    "hour_of_day": 15,
    "typical_popularity": 48
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 5,
    "hour_of_day": 16,
    "typical_popularity": 35
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 5,
    "hour_of_day": 17,
    "typical_popularity": 22
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 6,
    "hour_of_day": 10,
    "typical_popularity": 10
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 6,
    "hour_of_day": 11,
    "typical_popularity": 22
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 6,
    "hour_of_day": 12,
    "typical_popularity": 35
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 6,
    "hour_of_day": 13,
    "typical_popularity": 45
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 6,
    "hour_of_day": 14,
    "typical_popularity": 42
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 6,
    "hour_of_day": 15,
    "typical_popularity": 35
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 6,
    "hour_of_day": 16,
    "typical_popularity": 25
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 6,
    "hour_of_day": 17,
    "typical_popularity": 15
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 0,
    "hour_of_day": 12,
    "typical_popularity": 10
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 0,
    "hour_of_day": 13,
    "typical_popularity": 22
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 0,
    "hour_of_day": 14,
    "typical_popularity": 35
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 0,
    "hour_of_day": 15,
    "typical_popularity": 32
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 0,
    "hour_of_day": 16,
    "typical_popularity": 25
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 0,
    "hour_of_day": 17,
    "typical_popularity": 15
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 1,
    "hour_of_day": 8,
    "typical_popularity": 20
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 1,
    "hour_of_day": 9,
    "typical_popularity": 40
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 1,
    "hour_of_day": 10,
    "typical_popularity": 60
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 1,
    "hour_of_day": 11,
    "typical_popularity": 80
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 1,
    "hour_of_day": 12,
    "typical_popularity": 85
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 1,
    "hour_of_day": 13,
    "typical_popularity": 78
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 1,
    "hour_of_day": 14,
    "typical_popularity": 68
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 1,
    "hour_of_day": 15,
    "typical_popularity": 58
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 1,
    "hour_of_day": 16,
    "typical_popularity": 50
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 1,
    "hour_of_day": 17,
    "typical_popularity": 42
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 1,
    "hour_of_day": 18,
    "typical_popularity": 35
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 1,
    "hour_of_day": 19,
    "typical_popularity": 25
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 1,
    "hour_of_day": 20,
    "typical_popularity": 15
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 2,
    "hour_of_day": 8,
    "typical_popularity": 22
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 2,
    "hour_of_day": 9,
    "typical_popularity": 42
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 2,
    "hour_of_day": 10,
    "typical_popularity": 62
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 2,
    "hour_of_day": 11,
    "typical_popularity": 82
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 2,
    "hour_of_day": 12,
    "typical_popularity": 88
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 2,
    "hour_of_day": 13,
    "typical_popularity": 80
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 2,
    "hour_of_day": 14,
    "typical_popularity": 70
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 2,
    "hour_of_day": 15,
    "typical_popularity": 60
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 2,
    "hour_of_day": 16,
    "typical_popularity": 52
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 2,
    "hour_of_day": 17,
    "typical_popularity": 44
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 2,
    "hour_of_day": 18,
    "typical_popularity": 36
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 2,
    "hour_of_day": 19,
    "typical_popularity": 26
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 2,
    "hour_of_day": 20,
    "typical_popularity": 16
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 3,
    "hour_of_day": 8,
    "typical_popularity": 25
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 3,
    "hour_of_day": 9,
    "typical_popularity": 45
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 3,
    "hour_of_day": 10,
    "typical_popularity": 65
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 3,
    "hour_of_day": 11,
    "typical_popularity": 85
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 3,
    "hour_of_day": 12,
    "typical_popularity": 90
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 3,
    "hour_of_day": 13,
    "typical_popularity": 83
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 3,
    "hour_of_day": 14,
    "typical_popularity": 72
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 3,
    "hour_of_day": 15,
    "typical_popularity": 62
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 3,
    "hour_of_day": 16,
    "typical_popularity": 54
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 3,
    "hour_of_day": 17,
    "typical_popularity": 46
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 3,
    "hour_of_day": 18,
    "typical_popularity": 38
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 3,
    "hour_of_day": 19,
    "typical_popularity": 28
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 3,
    "hour_of_day": 20,
    "typical_popularity": 18
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 4,
    "hour_of_day": 8,
    "typical_popularity": 21
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 4,
    "hour_of_day": 9,
    "typical_popularity": 41
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 4,
    "hour_of_day": 10,
    "typical_popularity": 61
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 4,
    "hour_of_day": 11,
    "typical_popularity": 81
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 4,
    "hour_of_day": 12,
    "typical_popularity": 86
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 4,
    "hour_of_day": 13,
    "typical_popularity": 79
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 4,
    "hour_of_day": 14,
    "typical_popularity": 69
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 4,
    "hour_of_day": 15,
    "typical_popularity": 58
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 4,
    "hour_of_day": 16,
    "typical_popularity": 50
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 4,
    "hour_of_day": 17,
    "typical_popularity": 42
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 4,
    "hour_of_day": 18,
    "typical_popularity": 34
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 4,
    "hour_of_day": 19,
    "typical_popularity": 24
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 4,
    "hour_of_day": 20,
    "typical_popularity": 14
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 5,
    "hour_of_day": 8,
    "typical_popularity": 18
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 5,
    "hour_of_day": 9,
    "typical_popularity": 35
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 5,
    "hour_of_day": 10,
    "typical_popularity": 52
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 5,
    "hour_of_day": 11,
    "typical_popularity": 65
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 5,
    "hour_of_day": 12,
    "typical_popularity": 70
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 5,
    "hour_of_day": 13,
    "typical_popularity": 62
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 5,
    "hour_of_day": 14,
    "typical_popularity": 50
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 5,
    "hour_of_day": 15,
    "typical_popularity": 38
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 5,
    "hour_of_day": 16,
    "typical_popularity": 28
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 5,
    "hour_of_day": 17,
    "typical_popularity": 18
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 6,
    "hour_of_day": 10,
    "typical_popularity": 15
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 6,
    "hour_of_day": 11,
    "typical_popularity": 50
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 6,
    "hour_of_day": 12,
    "typical_popularity": 45
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 6,
    "hour_of_day": 13,
    "typical_popularity": 40
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 6,
    "hour_of_day": 14,
    "typical_popularity": 35
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 6,
    "hour_of_day": 15,
    "typical_popularity": 28
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 6,
    "hour_of_day": 16,
    "typical_popularity": 18
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 1,
    "hour_of_day": 8,
    "typical_popularity": 15
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 1,
    "hour_of_day": 9,
    "typical_popularity": 52
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 1,
    "hour_of_day": 10,
    "typical_popularity": 38
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 1,
    "hour_of_day": 11,
    "typical_popularity": 68
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 1,
    "hour_of_day": 12,
    "typical_popularity": 45
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 1,
    "hour_of_day": 13,
    "typical_popularity": 40
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 1,
    "hour_of_day": 14,
    "typical_popularity": 62
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 1,
    "hour_of_day": 15,
    "typical_popularity": 48
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 1,
    "hour_of_day": 16,
    "typical_popularity": 35
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 1,
    "hour_of_day": 17,
    "typical_popularity": 22
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 1,
    "hour_of_day": 18,
    "typical_popularity": 12
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 1,
    "hour_of_day": 19,
    "typical_popularity": 8
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 1,
    "hour_of_day": 20,
    "typical_popularity": 5
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 2,
    "hour_of_day": 8,
    "typical_popularity": 18
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 2,
    "hour_of_day": 9,
    "typical_popularity": 55
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 2,
    "hour_of_day": 10,
    "typical_popularity": 42
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 2,
    "hour_of_day": 11,
    "typical_popularity": 70
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 2,
    "hour_of_day": 12,
    "typical_popularity": 50
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 2,
    "hour_of_day": 13,
    "typical_popularity": 44
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 2,
    "hour_of_day": 14,
    "typical_popularity": 65
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 2,
    "hour_of_day": 15,
    "typical_popularity": 50
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 2,
    "hour_of_day": 16,
    "typical_popularity": 36
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 2,
    "hour_of_day": 17,
    "typical_popularity": 24
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 2,
    "hour_of_day": 18,
    "typical_popularity": 14
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 2,
    "hour_of_day": 19,
    "typical_popularity": 8
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 2,
    "hour_of_day": 20,
    "typical_popularity": 5
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 3,
    "hour_of_day": 8,
    "typical_popularity": 20
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 3,
    "hour_of_day": 9,
    "typical_popularity": 58
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 3,
    "hour_of_day": 10,
    "typical_popularity": 45
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 3,
    "hour_of_day": 11,
    "typical_popularity": 72
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 3,
    "hour_of_day": 12,
    "typical_popularity": 52
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 3,
    "hour_of_day": 13,
    "typical_popularity": 46
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 3,
    "hour_of_day": 14,
    "typical_popularity": 68
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 3,
    "hour_of_day": 15,
    "typical_popularity": 52
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 3,
    "hour_of_day": 16,
    "typical_popularity": 38
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 3,
    "hour_of_day": 17,
    "typical_popularity": 25
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 3,
    "hour_of_day": 18,
    "typical_popularity": 15
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 3,
    "hour_of_day": 19,
    "typical_popularity": 9
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 3,
    "hour_of_day": 20,
    "typical_popularity": 5
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 4,
    "hour_of_day": 8,
    "typical_popularity": 16
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 4,
    "hour_of_day": 9,
    "typical_popularity": 53
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 4,
    "hour_of_day": 10,
    "typical_popularity": 40
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 4,
    "hour_of_day": 11,
    "typical_popularity": 66
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 4,
    "hour_of_day": 12,
    "typical_popularity": 46
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 4,
    "hour_of_day": 13,
    "typical_popularity": 42
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 4,
    "hour_of_day": 14,
    "typical_popularity": 63
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 4,
    "hour_of_day": 15,
    "typical_popularity": 47
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 4,
    "hour_of_day": 16,
    "typical_popularity": 34
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 4,
    "hour_of_day": 17,
    "typical_popularity": 20
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 4,
    "hour_of_day": 18,
    "typical_popularity": 12
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 4,
    "hour_of_day": 19,
    "typical_popularity": 7
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 4,
    "hour_of_day": 20,
    "typical_popularity": 4
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 5,
    "hour_of_day": 8,
    "typical_popularity": 12
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 5,
    "hour_of_day": 9,
    "typical_popularity": 45
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 5,
    "hour_of_day": 10,
    "typical_popularity": 60
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 5,
    "hour_of_day": 11,
    "typical_popularity": 52
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 5,
    "hour_of_day": 12,
    "typical_popularity": 38
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 5,
    "hour_of_day": 13,
    "typical_popularity": 25
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 5,
    "hour_of_day": 14,
    "typical_popularity": 18
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 5,
    "hour_of_day": 15,
    "typical_popularity": 12
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 5,
    "hour_of_day": 16,
    "typical_popularity": 8
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 5,
    "hour_of_day": 17,
    "typical_popularity": 5
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 1,
    "hour_of_day": 8,
    "typical_popularity": 12
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 1,
    "hour_of_day": 9,
    "typical_popularity": 48
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 1,
    "hour_of_day": 10,
    "typical_popularity": 35
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 1,
    "hour_of_day": 11,
    "typical_popularity": 63
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 1,
    "hour_of_day": 12,
    "typical_popularity": 45
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 1,
    "hour_of_day": 13,
    "typical_popularity": 40
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 1,
    "hour_of_day": 14,
    "typical_popularity": 58
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 1,
    "hour_of_day": 15,
    "typical_popularity": 42
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 1,
    "hour_of_day": 16,
    "typical_popularity": 30
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 1,
    "hour_of_day": 17,
    "typical_popularity": 18
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 1,
    "hour_of_day": 18,
    "typical_popularity": 22
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 1,
    "hour_of_day": 19,
    "typical_popularity": 25
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 1,
    "hour_of_day": 20,
    "typical_popularity": 15
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 2,
    "hour_of_day": 8,
    "typical_popularity": 14
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 2,
    "hour_of_day": 9,
    "typical_popularity": 50
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 2,
    "hour_of_day": 10,
    "typical_popularity": 38
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 2,
    "hour_of_day": 11,
    "typical_popularity": 65
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 2,
    "hour_of_day": 12,
    "typical_popularity": 48
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 2,
    "hour_of_day": 13,
    "typical_popularity": 42
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 2,
    "hour_of_day": 14,
    "typical_popularity": 60
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 2,
    "hour_of_day": 15,
    "typical_popularity": 44
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 2,
    "hour_of_day": 16,
    "typical_popularity": 32
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 2,
    "hour_of_day": 17,
    "typical_popularity": 20
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 2,
    "hour_of_day": 18,
    "typical_popularity": 24
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 2,
    "hour_of_day": 19,
    "typical_popularity": 26
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 2,
    "hour_of_day": 20,
    "typical_popularity": 16
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 3,
    "hour_of_day": 8,
    "typical_popularity": 16
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 3,
    "hour_of_day": 9,
    "typical_popularity": 52
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 3,
    "hour_of_day": 10,
    "typical_popularity": 40
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 3,
    "hour_of_day": 11,
    "typical_popularity": 68
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 3,
    "hour_of_day": 12,
    "typical_popularity": 50
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 3,
    "hour_of_day": 13,
    "typical_popularity": 45
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 3,
    "hour_of_day": 14,
    "typical_popularity": 62
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 3,
    "hour_of_day": 15,
    "typical_popularity": 46
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 3,
    "hour_of_day": 16,
    "typical_popularity": 34
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 3,
    "hour_of_day": 17,
    "typical_popularity": 22
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 3,
    "hour_of_day": 18,
    "typical_popularity": 26
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 3,
    "hour_of_day": 19,
    "typical_popularity": 28
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 3,
    "hour_of_day": 20,
    "typical_popularity": 18
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 4,
    "hour_of_day": 8,
    "typical_popularity": 13
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 4,
    "hour_of_day": 9,
    "typical_popularity": 48
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 4,
    "hour_of_day": 10,
    "typical_popularity": 36
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 4,
    "hour_of_day": 11,
    "typical_popularity": 62
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 4,
    "hour_of_day": 12,
    "typical_popularity": 44
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 4,
    "hour_of_day": 13,
    "typical_popularity": 40
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 4,
    "hour_of_day": 14,
    "typical_popularity": 57
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 4,
    "hour_of_day": 15,
    "typical_popularity": 42
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 4,
    "hour_of_day": 16,
    "typical_popularity": 30
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 4,
    "hour_of_day": 17,
    "typical_popularity": 18
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 4,
    "hour_of_day": 18,
    "typical_popularity": 22
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 4,
    "hour_of_day": 19,
    "typical_popularity": 24
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 4,
    "hour_of_day": 20,
    "typical_popularity": 14
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 5,
    "hour_of_day": 8,
    "typical_popularity": 10
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 5,
    "hour_of_day": 9,
    "typical_popularity": 40
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 5,
    "hour_of_day": 10,
    "typical_popularity": 55
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 5,
    "hour_of_day": 11,
    "typical_popularity": 48
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 5,
    "hour_of_day": 12,
    "typical_popularity": 35
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 5,
    "hour_of_day": 13,
    "typical_popularity": 22
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 5,
    "hour_of_day": 14,
    "typical_popularity": 15
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 5,
    "hour_of_day": 15,
    "typical_popularity": 10
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 5,
    "hour_of_day": 16,
    "typical_popularity": 8
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 5,
    "hour_of_day": 17,
    "typical_popularity": 5
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 1,
    "hour_of_day": 8,
    "typical_popularity": 10
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 1,
    "hour_of_day": 9,
    "typical_popularity": 45
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 1,
    "hour_of_day": 10,
    "typical_popularity": 32
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 1,
    "hour_of_day": 11,
    "typical_popularity": 60
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 1,
    "hour_of_day": 12,
    "typical_popularity": 42
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 1,
    "hour_of_day": 13,
    "typical_popularity": 38
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 1,
    "hour_of_day": 14,
    "typical_popularity": 55
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 1,
    "hour_of_day": 15,
    "typical_popularity": 40
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 1,
    "hour_of_day": 16,
    "typical_popularity": 30
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 1,
    "hour_of_day": 17,
    "typical_popularity": 22
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 1,
    "hour_of_day": 18,
    "typical_popularity": 28
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 1,
    "hour_of_day": 19,
    "typical_popularity": 32
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 1,
    "hour_of_day": 20,
    "typical_popularity": 30
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 2,
    "hour_of_day": 8,
    "typical_popularity": 12
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 2,
    "hour_of_day": 9,
    "typical_popularity": 48
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 2,
    "hour_of_day": 10,
    "typical_popularity": 35
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 2,
    "hour_of_day": 11,
    "typical_popularity": 62
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 2,
    "hour_of_day": 12,
    "typical_popularity": 45
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 2,
    "hour_of_day": 13,
    "typical_popularity": 40
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 2,
    "hour_of_day": 14,
    "typical_popularity": 58
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 2,
    "hour_of_day": 15,
    "typical_popularity": 42
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 2,
    "hour_of_day": 16,
    "typical_popularity": 32
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 2,
    "hour_of_day": 17,
    "typical_popularity": 24
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 2,
    "hour_of_day": 18,
    "typical_popularity": 30
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 2,
    "hour_of_day": 19,
    "typical_popularity": 34
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 2,
    "hour_of_day": 20,
    "typical_popularity": 32
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 3,
    "hour_of_day": 8,
    "typical_popularity": 14
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 3,
    "hour_of_day": 9,
    "typical_popularity": 50
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 3,
    "hour_of_day": 10,
    "typical_popularity": 38
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 3,
    "hour_of_day": 11,
    "typical_popularity": 65
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 3,
    "hour_of_day": 12,
    "typical_popularity": 48
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 3,
    "hour_of_day": 13,
    "typical_popularity": 44
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 3,
    "hour_of_day": 14,
    "typical_popularity": 60
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 3,
    "hour_of_day": 15,
    "typical_popularity": 45
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 3,
    "hour_of_day": 16,
    "typical_popularity": 35
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 3,
    "hour_of_day": 17,
    "typical_popularity": 26
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 3,
    "hour_of_day": 18,
    "typical_popularity": 32
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 3,
    "hour_of_day": 19,
    "typical_popularity": 36
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 3,
    "hour_of_day": 20,
    "typical_popularity": 35
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 4,
    "hour_of_day": 8,
    "typical_popularity": 11
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 4,
    "hour_of_day": 9,
    "typical_popularity": 46
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 4,
    "hour_of_day": 10,
    "typical_popularity": 33
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 4,
    "hour_of_day": 11,
    "typical_popularity": 58
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 4,
    "hour_of_day": 12,
    "typical_popularity": 42
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 4,
    "hour_of_day": 13,
    "typical_popularity": 38
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 4,
    "hour_of_day": 14,
    "typical_popularity": 54
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 4,
    "hour_of_day": 15,
    "typical_popularity": 40
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 4,
    "hour_of_day": 16,
    "typical_popularity": 30
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 4,
    "hour_of_day": 17,
    "typical_popularity": 22
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 4,
    "hour_of_day": 18,
    "typical_popularity": 28
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 4,
    "hour_of_day": 19,
    "typical_popularity": 31
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 4,
    "hour_of_day": 20,
    "typical_popularity": 28
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 5,
    "hour_of_day": 8,
    "typical_popularity": 8
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 5,
    "hour_of_day": 9,
    "typical_popularity": 38
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 5,
    "hour_of_day": 10,
    "typical_popularity": 50
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 5,
    "hour_of_day": 11,
    "typical_popularity": 45
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 5,
    "hour_of_day": 12,
    "typical_popularity": 35
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 5,
    "hour_of_day": 13,
    "typical_popularity": 28
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 5,
    "hour_of_day": 14,
    "typical_popularity": 25
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 5,
    "hour_of_day": 15,
    "typical_popularity": 22
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 5,
    "hour_of_day": 16,
    "typical_popularity": 15
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 5,
    "hour_of_day": 17,
    "typical_popularity": 8
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 1,
    "hour_of_day": 8,
    "typical_popularity": 10
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 1,
    "hour_of_day": 9,
    "typical_popularity": 35
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 1,
    "hour_of_day": 10,
    "typical_popularity": 68
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 1,
    "hour_of_day": 11,
    "typical_popularity": 55
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 1,
    "hour_of_day": 12,
    "typical_popularity": 42
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 1,
    "hour_of_day": 13,
    "typical_popularity": 38
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 1,
    "hour_of_day": 14,
    "typical_popularity": 65
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 1,
    "hour_of_day": 15,
    "typical_popularity": 50
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 1,
    "hour_of_day": 16,
    "typical_popularity": 38
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 1,
    "hour_of_day": 17,
    "typical_popularity": 25
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 1,
    "hour_of_day": 18,
    "typical_popularity": 18
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 1,
    "hour_of_day": 19,
    "typical_popularity": 12
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 1,
    "hour_of_day": 20,
    "typical_popularity": 8
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 2,
    "hour_of_day": 8,
    "typical_popularity": 12
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 2,
    "hour_of_day": 9,
    "typical_popularity": 38
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 2,
    "hour_of_day": 10,
    "typical_popularity": 72
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 2,
    "hour_of_day": 11,
    "typical_popularity": 58
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 2,
    "hour_of_day": 12,
    "typical_popularity": 45
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 2,
    "hour_of_day": 13,
    "typical_popularity": 40
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 2,
    "hour_of_day": 14,
    "typical_popularity": 68
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 2,
    "hour_of_day": 15,
    "typical_popularity": 52
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 2,
    "hour_of_day": 16,
    "typical_popularity": 40
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 2,
    "hour_of_day": 17,
    "typical_popularity": 28
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 2,
    "hour_of_day": 18,
    "typical_popularity": 20
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 2,
    "hour_of_day": 19,
    "typical_popularity": 14
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 2,
    "hour_of_day": 20,
    "typical_popularity": 8
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 3,
    "hour_of_day": 8,
    "typical_popularity": 14
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 3,
    "hour_of_day": 9,
    "typical_popularity": 42
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 3,
    "hour_of_day": 10,
    "typical_popularity": 75
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 3,
    "hour_of_day": 11,
    "typical_popularity": 62
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 3,
    "hour_of_day": 12,
    "typical_popularity": 48
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 3,
    "hour_of_day": 13,
    "typical_popularity": 44
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 3,
    "hour_of_day": 14,
    "typical_popularity": 72
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 3,
    "hour_of_day": 15,
    "typical_popularity": 55
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 3,
    "hour_of_day": 16,
    "typical_popularity": 42
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 3,
    "hour_of_day": 17,
    "typical_popularity": 30
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 3,
    "hour_of_day": 18,
    "typical_popularity": 22
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 3,
    "hour_of_day": 19,
    "typical_popularity": 15
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 3,
    "hour_of_day": 20,
    "typical_popularity": 8
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 4,
    "hour_of_day": 8,
    "typical_popularity": 11
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 4,
    "hour_of_day": 9,
    "typical_popularity": 36
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 4,
    "hour_of_day": 10,
    "typical_popularity": 70
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 4,
    "hour_of_day": 11,
    "typical_popularity": 56
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 4,
    "hour_of_day": 12,
    "typical_popularity": 43
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 4,
    "hour_of_day": 13,
    "typical_popularity": 39
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 4,
    "hour_of_day": 14,
    "typical_popularity": 66
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 4,
    "hour_of_day": 15,
    "typical_popularity": 48
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 4,
    "hour_of_day": 16,
    "typical_popularity": 36
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 4,
    "hour_of_day": 17,
    "typical_popularity": 24
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 4,
    "hour_of_day": 18,
    "typical_popularity": 16
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 4,
    "hour_of_day": 19,
    "typical_popularity": 10
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 4,
    "hour_of_day": 20,
    "typical_popularity": 6
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 5,
    "hour_of_day": 8,
    "typical_popularity": 8
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 5,
    "hour_of_day": 9,
    "typical_popularity": 30
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 5,
    "hour_of_day": 10,
    "typical_popularity": 58
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 5,
    "hour_of_day": 11,
    "typical_popularity": 48
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 5,
    "hour_of_day": 12,
    "typical_popularity": 35
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 5,
    "hour_of_day": 13,
    "typical_popularity": 28
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 5,
    "hour_of_day": 14,
    "typical_popularity": 42
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 5,
    "hour_of_day": 15,
    "typical_popularity": 30
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 5,
    "hour_of_day": 16,
    "typical_popularity": 18
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 5,
    "hour_of_day": 17,
    "typical_popularity": 10
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 5,
    "hour_of_day": 18,
    "typical_popularity": 5
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 5,
    "hour_of_day": 19,
    "typical_popularity": 4
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 5,
    "hour_of_day": 20,
    "typical_popularity": 3
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 6,
    "hour_of_day": 10,
    "typical_popularity": 8
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 6,
    "hour_of_day": 11,
    "typical_popularity": 18
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 6,
    "hour_of_day": 12,
    "typical_popularity": 25
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 6,
    "hour_of_day": 13,
    "typical_popularity": 28
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 6,
    "hour_of_day": 14,
    "typical_popularity": 22
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 6,
    "hour_of_day": 15,
    "typical_popularity": 15
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 1,
    "hour_of_day": 8,
    "typical_popularity": 12
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 1,
    "hour_of_day": 9,
    "typical_popularity": 50
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 1,
    "hour_of_day": 10,
    "typical_popularity": 38
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 1,
    "hour_of_day": 11,
    "typical_popularity": 65
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 1,
    "hour_of_day": 12,
    "typical_popularity": 48
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 1,
    "hour_of_day": 13,
    "typical_popularity": 42
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 1,
    "hour_of_day": 14,
    "typical_popularity": 62
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 1,
    "hour_of_day": 15,
    "typical_popularity": 45
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 1,
    "hour_of_day": 16,
    "typical_popularity": 32
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 1,
    "hour_of_day": 17,
    "typical_popularity": 20
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 1,
    "hour_of_day": 18,
    "typical_popularity": 12
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 1,
    "hour_of_day": 19,
    "typical_popularity": 8
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 1,
    "hour_of_day": 20,
    "typical_popularity": 5
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 2,
    "hour_of_day": 8,
    "typical_popularity": 14
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 2,
    "hour_of_day": 9,
    "typical_popularity": 52
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 2,
    "hour_of_day": 10,
    "typical_popularity": 40
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 2,
    "hour_of_day": 11,
    "typical_popularity": 68
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 2,
    "hour_of_day": 12,
    "typical_popularity": 50
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 2,
    "hour_of_day": 13,
    "typical_popularity": 44
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 2,
    "hour_of_day": 14,
    "typical_popularity": 65
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 2,
    "hour_of_day": 15,
    "typical_popularity": 48
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 2,
    "hour_of_day": 16,
    "typical_popularity": 34
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 2,
    "hour_of_day": 17,
    "typical_popularity": 22
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 2,
    "hour_of_day": 18,
    "typical_popularity": 14
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 2,
    "hour_of_day": 19,
    "typical_popularity": 9
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 2,
    "hour_of_day": 20,
    "typical_popularity": 5
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 3,
    "hour_of_day": 8,
    "typical_popularity": 16
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 3,
    "hour_of_day": 9,
    "typical_popularity": 55
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 3,
    "hour_of_day": 10,
    "typical_popularity": 42
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 3,
    "hour_of_day": 11,
    "typical_popularity": 72
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 3,
    "hour_of_day": 12,
    "typical_popularity": 54
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 3,
    "hour_of_day": 13,
    "typical_popularity": 48
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 3,
    "hour_of_day": 14,
    "typical_popularity": 68
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 3,
    "hour_of_day": 15,
    "typical_popularity": 50
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 3,
    "hour_of_day": 16,
    "typical_popularity": 36
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 3,
    "hour_of_day": 17,
    "typical_popularity": 24
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 3,
    "hour_of_day": 18,
    "typical_popularity": 16
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 3,
    "hour_of_day": 19,
    "typical_popularity": 10
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 3,
    "hour_of_day": 20,
    "typical_popularity": 5
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 4,
    "hour_of_day": 8,
    "typical_popularity": 13
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 4,
    "hour_of_day": 9,
    "typical_popularity": 50
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 4,
    "hour_of_day": 10,
    "typical_popularity": 37
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 4,
    "hour_of_day": 11,
    "typical_popularity": 64
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 4,
    "hour_of_day": 12,
    "typical_popularity": 46
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 4,
    "hour_of_day": 13,
    "typical_popularity": 40
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 4,
    "hour_of_day": 14,
    "typical_popularity": 60
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 4,
    "hour_of_day": 15,
    "typical_popularity": 44
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 4,
    "hour_of_day": 16,
    "typical_popularity": 30
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 4,
    "hour_of_day": 17,
    "typical_popularity": 18
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 4,
    "hour_of_day": 18,
    "typical_popularity": 10
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 4,
    "hour_of_day": 19,
    "typical_popularity": 7
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 4,
    "hour_of_day": 20,
    "typical_popularity": 4
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 5,
    "hour_of_day": 8,
    "typical_popularity": 10
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 5,
    "hour_of_day": 9,
    "typical_popularity": 42
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 5,
    "hour_of_day": 10,
    "typical_popularity": 55
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 5,
    "hour_of_day": 11,
    "typical_popularity": 48
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 5,
    "hour_of_day": 12,
    "typical_popularity": 35
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 5,
    "hour_of_day": 13,
    "typical_popularity": 25
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 5,
    "hour_of_day": 14,
    "typical_popularity": 18
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 5,
    "hour_of_day": 15,
    "typical_popularity": 12
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 5,
    "hour_of_day": 16,
    "typical_popularity": 8
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 5,
    "hour_of_day": 17,
    "typical_popularity": 5
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 1,
    "hour_of_day": 7,
    "typical_popularity": 20
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 1,
    "hour_of_day": 8,
    "typical_popularity": 65
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 1,
    "hour_of_day": 9,
    "typical_popularity": 45
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 1,
    "hour_of_day": 10,
    "typical_popularity": 38
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 1,
    "hour_of_day": 11,
    "typical_popularity": 50
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 1,
    "hour_of_day": 12,
    "typical_popularity": 78
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 1,
    "hour_of_day": 13,
    "typical_popularity": 70
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 1,
    "hour_of_day": 14,
    "typical_popularity": 55
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 1,
    "hour_of_day": 15,
    "typical_popularity": 52
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 1,
    "hour_of_day": 16,
    "typical_popularity": 50
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 1,
    "hour_of_day": 17,
    "typical_popularity": 48
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 1,
    "hour_of_day": 18,
    "typical_popularity": 30
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 1,
    "hour_of_day": 19,
    "typical_popularity": 15
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 2,
    "hour_of_day": 7,
    "typical_popularity": 22
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 2,
    "hour_of_day": 8,
    "typical_popularity": 68
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 2,
    "hour_of_day": 9,
    "typical_popularity": 48
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 2,
    "hour_of_day": 10,
    "typical_popularity": 40
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 2,
    "hour_of_day": 11,
    "typical_popularity": 52
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 2,
    "hour_of_day": 12,
    "typical_popularity": 80
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 2,
    "hour_of_day": 13,
    "typical_popularity": 72
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 2,
    "hour_of_day": 14,
    "typical_popularity": 58
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 2,
    "hour_of_day": 15,
    "typical_popularity": 55
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 2,
    "hour_of_day": 16,
    "typical_popularity": 52
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 2,
    "hour_of_day": 17,
    "typical_popularity": 50
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 2,
    "hour_of_day": 18,
    "typical_popularity": 32
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 2,
    "hour_of_day": 19,
    "typical_popularity": 16
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 3,
    "hour_of_day": 7,
    "typical_popularity": 25
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 3,
    "hour_of_day": 8,
    "typical_popularity": 72
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 3,
    "hour_of_day": 9,
    "typical_popularity": 50
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 3,
    "hour_of_day": 10,
    "typical_popularity": 44
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 3,
    "hour_of_day": 11,
    "typical_popularity": 55
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 3,
    "hour_of_day": 12,
    "typical_popularity": 85
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 3,
    "hour_of_day": 13,
    "typical_popularity": 76
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 3,
    "hour_of_day": 14,
    "typical_popularity": 60
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 3,
    "hour_of_day": 15,
    "typical_popularity": 57
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 3,
    "hour_of_day": 16,
    "typical_popularity": 54
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 3,
    "hour_of_day": 17,
    "typical_popularity": 52
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 3,
    "hour_of_day": 18,
    "typical_popularity": 34
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 3,
    "hour_of_day": 19,
    "typical_popularity": 18
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 4,
    "hour_of_day": 7,
    "typical_popularity": 21
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 4,
    "hour_of_day": 8,
    "typical_popularity": 66
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 4,
    "hour_of_day": 9,
    "typical_popularity": 46
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 4,
    "hour_of_day": 10,
    "typical_popularity": 39
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 4,
    "hour_of_day": 11,
    "typical_popularity": 51
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 4,
    "hour_of_day": 12,
    "typical_popularity": 76
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 4,
    "hour_of_day": 13,
    "typical_popularity": 68
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 4,
    "hour_of_day": 14,
    "typical_popularity": 54
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 4,
    "hour_of_day": 15,
    "typical_popularity": 51
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 4,
    "hour_of_day": 16,
    "typical_popularity": 48
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 4,
    "hour_of_day": 17,
    "typical_popularity": 46
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 4,
    "hour_of_day": 18,
    "typical_popularity": 28
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 4,
    "hour_of_day": 19,
    "typical_popularity": 14
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 5,
    "hour_of_day": 7,
    "typical_popularity": 18
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 5,
    "hour_of_day": 8,
    "typical_popularity": 60
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 5,
    "hour_of_day": 9,
    "typical_popularity": 42
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 5,
    "hour_of_day": 10,
    "typical_popularity": 35
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 5,
    "hour_of_day": 11,
    "typical_popularity": 45
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 5,
    "hour_of_day": 12,
    "typical_popularity": 70
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 5,
    "hour_of_day": 13,
    "typical_popularity": 60
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 5,
    "hour_of_day": 14,
    "typical_popularity": 42
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 5,
    "hour_of_day": 15,
    "typical_popularity": 35
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 5,
    "hour_of_day": 16,
    "typical_popularity": 25
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 5,
    "hour_of_day": 17,
    "typical_popularity": 15
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 5,
    "hour_of_day": 18,
    "typical_popularity": 8
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 5,
    "hour_of_day": 19,
    "typical_popularity": 4
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 1,
    "hour_of_day": 8,
    "typical_popularity": 8
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 1,
    "hour_of_day": 9,
    "typical_popularity": 18
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 1,
    "hour_of_day": 10,
    "typical_popularity": 30
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 1,
    "hour_of_day": 11,
    "typical_popularity": 42
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 1,
    "hour_of_day": 12,
    "typical_popularity": 48
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 1,
    "hour_of_day": 13,
    "typical_popularity": 52
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 1,
    "hour_of_day": 14,
    "typical_popularity": 65
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 1,
    "hour_of_day": 15,
    "typical_popularity": 72
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 1,
    "hour_of_day": 16,
    "typical_popularity": 70
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 1,
    "hour_of_day": 17,
    "typical_popularity": 62
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 1,
    "hour_of_day": 18,
    "typical_popularity": 55
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 1,
    "hour_of_day": 19,
    "typical_popularity": 48
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 1,
    "hour_of_day": 20,
    "typical_popularity": 42
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 1,
    "hour_of_day": 21,
    "typical_popularity": 35
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 1,
    "hour_of_day": 22,
    "typical_popularity": 25
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 2,
    "hour_of_day": 8,
    "typical_popularity": 10
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 2,
    "hour_of_day": 9,
    "typical_popularity": 20
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 2,
    "hour_of_day": 10,
    "typical_popularity": 32
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 2,
    "hour_of_day": 11,
    "typical_popularity": 45
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 2,
    "hour_of_day": 12,
    "typical_popularity": 50
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 2,
    "hour_of_day": 13,
    "typical_popularity": 55
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 2,
    "hour_of_day": 14,
    "typical_popularity": 68
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 2,
    "hour_of_day": 15,
    "typical_popularity": 75
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 2,
    "hour_of_day": 16,
    "typical_popularity": 72
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 2,
    "hour_of_day": 17,
    "typical_popularity": 65
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 2,
    "hour_of_day": 18,
    "typical_popularity": 58
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 2,
    "hour_of_day": 19,
    "typical_popularity": 50
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 2,
    "hour_of_day": 20,
    "typical_popularity": 44
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 2,
    "hour_of_day": 21,
    "typical_popularity": 36
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 2,
    "hour_of_day": 22,
    "typical_popularity": 28
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 3,
    "hour_of_day": 8,
    "typical_popularity": 12
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 3,
    "hour_of_day": 9,
    "typical_popularity": 22
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 3,
    "hour_of_day": 10,
    "typical_popularity": 35
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 3,
    "hour_of_day": 11,
    "typical_popularity": 48
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 3,
    "hour_of_day": 12,
    "typical_popularity": 52
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 3,
    "hour_of_day": 13,
    "typical_popularity": 58
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 3,
    "hour_of_day": 14,
    "typical_popularity": 72
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 3,
    "hour_of_day": 15,
    "typical_popularity": 78
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 3,
    "hour_of_day": 16,
    "typical_popularity": 76
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 3,
    "hour_of_day": 17,
    "typical_popularity": 68
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 3,
    "hour_of_day": 18,
    "typical_popularity": 62
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 3,
    "hour_of_day": 19,
    "typical_popularity": 55
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 3,
    "hour_of_day": 20,
    "typical_popularity": 48
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 3,
    "hour_of_day": 21,
    "typical_popularity": 40
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 3,
    "hour_of_day": 22,
    "typical_popularity": 32
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 4,
    "hour_of_day": 8,
    "typical_popularity": 10
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 4,
    "hour_of_day": 9,
    "typical_popularity": 20
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 4,
    "hour_of_day": 10,
    "typical_popularity": 33
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 4,
    "hour_of_day": 11,
    "typical_popularity": 46
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 4,
    "hour_of_day": 12,
    "typical_popularity": 50
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 4,
    "hour_of_day": 13,
    "typical_popularity": 56
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 4,
    "hour_of_day": 14,
    "typical_popularity": 70
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 4,
    "hour_of_day": 15,
    "typical_popularity": 76
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 4,
    "hour_of_day": 16,
    "typical_popularity": 74
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 4,
    "hour_of_day": 17,
    "typical_popularity": 66
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 4,
    "hour_of_day": 18,
    "typical_popularity": 60
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 4,
    "hour_of_day": 19,
    "typical_popularity": 55
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 4,
    "hour_of_day": 20,
    "typical_popularity": 50
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 4,
    "hour_of_day": 21,
    "typical_popularity": 45
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 4,
    "hour_of_day": 22,
    "typical_popularity": 38
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 5,
    "hour_of_day": 8,
    "typical_popularity": 8
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 5,
    "hour_of_day": 9,
    "typical_popularity": 16
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 5,
    "hour_of_day": 10,
    "typical_popularity": 28
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 5,
    "hour_of_day": 11,
    "typical_popularity": 38
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 5,
    "hour_of_day": 12,
    "typical_popularity": 42
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 5,
    "hour_of_day": 13,
    "typical_popularity": 45
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 5,
    "hour_of_day": 14,
    "typical_popularity": 55
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 5,
    "hour_of_day": 15,
    "typical_popularity": 60
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 5,
    "hour_of_day": 16,
    "typical_popularity": 52
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 5,
    "hour_of_day": 17,
    "typical_popularity": 40
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 5,
    "hour_of_day": 18,
    "typical_popularity": 30
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 5,
    "hour_of_day": 19,
    "typical_popularity": 22
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 5,
    "hour_of_day": 20,
    "typical_popularity": 15
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 5,
    "hour_of_day": 21,
    "typical_popularity": 10
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 5,
    "hour_of_day": 22,
    "typical_popularity": 6
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 1,
    "hour_of_day": 8,
    "typical_popularity": 10
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 1,
    "hour_of_day": 9,
    "typical_popularity": 48
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 1,
    "hour_of_day": 10,
    "typical_popularity": 35
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 1,
    "hour_of_day": 11,
    "typical_popularity": 60
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 1,
    "hour_of_day": 12,
    "typical_popularity": 42
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 1,
    "hour_of_day": 13,
    "typical_popularity": 38
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 1,
    "hour_of_day": 14,
    "typical_popularity": 55
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 1,
    "hour_of_day": 15,
    "typical_popularity": 40
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 1,
    "hour_of_day": 16,
    "typical_popularity": 28
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 1,
    "hour_of_day": 17,
    "typical_popularity": 18
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 1,
    "hour_of_day": 18,
    "typical_popularity": 10
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 1,
    "hour_of_day": 19,
    "typical_popularity": 5
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 2,
    "hour_of_day": 8,
    "typical_popularity": 12
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 2,
    "hour_of_day": 9,
    "typical_popularity": 50
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 2,
    "hour_of_day": 10,
    "typical_popularity": 38
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 2,
    "hour_of_day": 11,
    "typical_popularity": 63
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 2,
    "hour_of_day": 12,
    "typical_popularity": 45
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 2,
    "hour_of_day": 13,
    "typical_popularity": 40
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 2,
    "hour_of_day": 14,
    "typical_popularity": 58
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 2,
    "hour_of_day": 15,
    "typical_popularity": 42
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 2,
    "hour_of_day": 16,
    "typical_popularity": 30
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 2,
    "hour_of_day": 17,
    "typical_popularity": 20
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 2,
    "hour_of_day": 18,
    "typical_popularity": 12
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 2,
    "hour_of_day": 19,
    "typical_popularity": 6
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 3,
    "hour_of_day": 8,
    "typical_popularity": 14
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 3,
    "hour_of_day": 9,
    "typical_popularity": 54
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 3,
    "hour_of_day": 10,
    "typical_popularity": 40
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 3,
    "hour_of_day": 11,
    "typical_popularity": 66
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 3,
    "hour_of_day": 12,
    "typical_popularity": 48
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 3,
    "hour_of_day": 13,
    "typical_popularity": 44
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 3,
    "hour_of_day": 14,
    "typical_popularity": 62
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 3,
    "hour_of_day": 15,
    "typical_popularity": 45
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 3,
    "hour_of_day": 16,
    "typical_popularity": 32
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 3,
    "hour_of_day": 17,
    "typical_popularity": 22
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 3,
    "hour_of_day": 18,
    "typical_popularity": 14
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 3,
    "hour_of_day": 19,
    "typical_popularity": 7
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 4,
    "hour_of_day": 8,
    "typical_popularity": 11
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 4,
    "hour_of_day": 9,
    "typical_popularity": 47
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 4,
    "hour_of_day": 10,
    "typical_popularity": 34
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 4,
    "hour_of_day": 11,
    "typical_popularity": 58
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 4,
    "hour_of_day": 12,
    "typical_popularity": 40
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 4,
    "hour_of_day": 13,
    "typical_popularity": 36
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 4,
    "hour_of_day": 14,
    "typical_popularity": 52
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 4,
    "hour_of_day": 15,
    "typical_popularity": 38
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 4,
    "hour_of_day": 16,
    "typical_popularity": 26
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 4,
    "hour_of_day": 17,
    "typical_popularity": 16
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 4,
    "hour_of_day": 18,
    "typical_popularity": 8
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 4,
    "hour_of_day": 19,
    "typical_popularity": 4
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 5,
    "hour_of_day": 8,
    "typical_popularity": 8
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 5,
    "hour_of_day": 9,
    "typical_popularity": 40
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 5,
    "hour_of_day": 10,
    "typical_popularity": 50
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 5,
    "hour_of_day": 11,
    "typical_popularity": 42
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 5,
    "hour_of_day": 12,
    "typical_popularity": 30
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 5,
    "hour_of_day": 13,
    "typical_popularity": 20
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 5,
    "hour_of_day": 14,
    "typical_popularity": 14
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 5,
    "hour_of_day": 15,
    "typical_popularity": 10
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 5,
    "hour_of_day": 16,
    "typical_popularity": 6
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 5,
    "hour_of_day": 17,
    "typical_popularity": 4
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 1,
    "hour_of_day": 8,
    "typical_popularity": 8
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 1,
    "hour_of_day": 9,
    "typical_popularity": 38
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 1,
    "hour_of_day": 10,
    "typical_popularity": 55
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 1,
    "hour_of_day": 11,
    "typical_popularity": 48
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 1,
    "hour_of_day": 12,
    "typical_popularity": 40
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 1,
    "hour_of_day": 13,
    "typical_popularity": 35
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 1,
    "hour_of_day": 14,
    "typical_popularity": 50
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 1,
    "hour_of_day": 15,
    "typical_popularity": 42
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 1,
    "hour_of_day": 16,
    "typical_popularity": 30
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 1,
    "hour_of_day": 17,
    "typical_popularity": 18
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 1,
    "hour_of_day": 18,
    "typical_popularity": 10
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 1,
    "hour_of_day": 19,
    "typical_popularity": 5
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 2,
    "hour_of_day": 8,
    "typical_popularity": 10
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 2,
    "hour_of_day": 9,
    "typical_popularity": 40
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 2,
    "hour_of_day": 10,
    "typical_popularity": 58
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 2,
    "hour_of_day": 11,
    "typical_popularity": 50
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 2,
    "hour_of_day": 12,
    "typical_popularity": 42
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 2,
    "hour_of_day": 13,
    "typical_popularity": 38
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 2,
    "hour_of_day": 14,
    "typical_popularity": 52
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 2,
    "hour_of_day": 15,
    "typical_popularity": 44
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 2,
    "hour_of_day": 16,
    "typical_popularity": 32
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 2,
    "hour_of_day": 17,
    "typical_popularity": 20
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 2,
    "hour_of_day": 18,
    "typical_popularity": 12
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 2,
    "hour_of_day": 19,
    "typical_popularity": 6
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 3,
    "hour_of_day": 8,
    "typical_popularity": 12
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 3,
    "hour_of_day": 9,
    "typical_popularity": 44
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 3,
    "hour_of_day": 10,
    "typical_popularity": 60
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 3,
    "hour_of_day": 11,
    "typical_popularity": 54
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 3,
    "hour_of_day": 12,
    "typical_popularity": 45
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 3,
    "hour_of_day": 13,
    "typical_popularity": 40
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 3,
    "hour_of_day": 14,
    "typical_popularity": 55
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 3,
    "hour_of_day": 15,
    "typical_popularity": 46
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 3,
    "hour_of_day": 16,
    "typical_popularity": 34
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 3,
    "hour_of_day": 17,
    "typical_popularity": 22
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 3,
    "hour_of_day": 18,
    "typical_popularity": 14
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 3,
    "hour_of_day": 19,
    "typical_popularity": 7
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 4,
    "hour_of_day": 8,
    "typical_popularity": 9
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 4,
    "hour_of_day": 9,
    "typical_popularity": 36
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 4,
    "hour_of_day": 10,
    "typical_popularity": 52
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 4,
    "hour_of_day": 11,
    "typical_popularity": 46
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 4,
    "hour_of_day": 12,
    "typical_popularity": 38
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 4,
    "hour_of_day": 13,
    "typical_popularity": 34
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 4,
    "hour_of_day": 14,
    "typical_popularity": 48
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 4,
    "hour_of_day": 15,
    "typical_popularity": 40
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 4,
    "hour_of_day": 16,
    "typical_popularity": 28
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 4,
    "hour_of_day": 17,
    "typical_popularity": 16
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 4,
    "hour_of_day": 18,
    "typical_popularity": 8
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 4,
    "hour_of_day": 19,
    "typical_popularity": 4
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 5,
    "hour_of_day": 8,
    "typical_popularity": 6
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 5,
    "hour_of_day": 9,
    "typical_popularity": 30
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 5,
    "hour_of_day": 10,
    "typical_popularity": 45
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 5,
    "hour_of_day": 11,
    "typical_popularity": 38
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 5,
    "hour_of_day": 12,
    "typical_popularity": 28
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 5,
    "hour_of_day": 13,
    "typical_popularity": 20
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 5,
    "hour_of_day": 14,
    "typical_popularity": 15
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 5,
    "hour_of_day": 15,
    "typical_popularity": 10
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 5,
    "hour_of_day": 16,
    "typical_popularity": 6
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 5,
    "hour_of_day": 17,
    "typical_popularity": 4
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 1,
    "hour_of_day": 8,
    "typical_popularity": 15
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 1,
    "hour_of_day": 9,
    "typical_popularity": 60
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 1,
    "hour_of_day": 10,
    "typical_popularity": 75
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 1,
    "hour_of_day": 11,
    "typical_popularity": 70
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 1,
    "hour_of_day": 12,
    "typical_popularity": 55
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 1,
    "hour_of_day": 13,
    "typical_popularity": 48
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 1,
    "hour_of_day": 14,
    "typical_popularity": 58
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 1,
    "hour_of_day": 15,
    "typical_popularity": 45
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 1,
    "hour_of_day": 16,
    "typical_popularity": 32
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 1,
    "hour_of_day": 17,
    "typical_popularity": 18
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 1,
    "hour_of_day": 18,
    "typical_popularity": 10
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 1,
    "hour_of_day": 19,
    "typical_popularity": 5
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 2,
    "hour_of_day": 8,
    "typical_popularity": 18
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 2,
    "hour_of_day": 9,
    "typical_popularity": 65
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 2,
    "hour_of_day": 10,
    "typical_popularity": 78
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 2,
    "hour_of_day": 11,
    "typical_popularity": 72
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 2,
    "hour_of_day": 12,
    "typical_popularity": 58
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 2,
    "hour_of_day": 13,
    "typical_popularity": 50
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 2,
    "hour_of_day": 14,
    "typical_popularity": 60
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 2,
    "hour_of_day": 15,
    "typical_popularity": 48
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 2,
    "hour_of_day": 16,
    "typical_popularity": 34
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 2,
    "hour_of_day": 17,
    "typical_popularity": 20
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 2,
    "hour_of_day": 18,
    "typical_popularity": 12
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 2,
    "hour_of_day": 19,
    "typical_popularity": 6
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 3,
    "hour_of_day": 8,
    "typical_popularity": 20
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 3,
    "hour_of_day": 9,
    "typical_popularity": 68
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 3,
    "hour_of_day": 10,
    "typical_popularity": 82
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 3,
    "hour_of_day": 11,
    "typical_popularity": 76
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 3,
    "hour_of_day": 12,
    "typical_popularity": 60
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 3,
    "hour_of_day": 13,
    "typical_popularity": 54
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 3,
    "hour_of_day": 14,
    "typical_popularity": 64
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 3,
    "hour_of_day": 15,
    "typical_popularity": 50
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 3,
    "hour_of_day": 16,
    "typical_popularity": 36
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 3,
    "hour_of_day": 17,
    "typical_popularity": 22
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 3,
    "hour_of_day": 18,
    "typical_popularity": 14
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 3,
    "hour_of_day": 19,
    "typical_popularity": 7
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 4,
    "hour_of_day": 8,
    "typical_popularity": 16
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 4,
    "hour_of_day": 9,
    "typical_popularity": 62
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 4,
    "hour_of_day": 10,
    "typical_popularity": 74
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 4,
    "hour_of_day": 11,
    "typical_popularity": 68
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 4,
    "hour_of_day": 12,
    "typical_popularity": 52
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 4,
    "hour_of_day": 13,
    "typical_popularity": 46
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 4,
    "hour_of_day": 14,
    "typical_popularity": 56
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 4,
    "hour_of_day": 15,
    "typical_popularity": 42
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 4,
    "hour_of_day": 16,
    "typical_popularity": 30
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 4,
    "hour_of_day": 17,
    "typical_popularity": 16
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 4,
    "hour_of_day": 18,
    "typical_popularity": 8
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 4,
    "hour_of_day": 19,
    "typical_popularity": 4
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 5,
    "hour_of_day": 8,
    "typical_popularity": 12
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 5,
    "hour_of_day": 9,
    "typical_popularity": 52
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 5,
    "hour_of_day": 10,
    "typical_popularity": 65
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 5,
    "hour_of_day": 11,
    "typical_popularity": 55
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 5,
    "hour_of_day": 12,
    "typical_popularity": 38
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 5,
    "hour_of_day": 13,
    "typical_popularity": 25
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 5,
    "hour_of_day": 14,
    "typical_popularity": 15
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 5,
    "hour_of_day": 15,
    "typical_popularity": 10
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 5,
    "hour_of_day": 16,
    "typical_popularity": 6
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 5,
    "hour_of_day": 17,
    "typical_popularity": 4
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 1,
    "hour_of_day": 8,
    "typical_popularity": 8
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 1,
    "hour_of_day": 9,
    "typical_popularity": 35
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 1,
    "hour_of_day": 10,
    "typical_popularity": 48
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 1,
    "hour_of_day": 11,
    "typical_popularity": 55
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 1,
    "hour_of_day": 12,
    "typical_popularity": 42
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 1,
    "hour_of_day": 13,
    "typical_popularity": 38
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 1,
    "hour_of_day": 14,
    "typical_popularity": 50
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 1,
    "hour_of_day": 15,
    "typical_popularity": 40
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 1,
    "hour_of_day": 16,
    "typical_popularity": 28
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 1,
    "hour_of_day": 17,
    "typical_popularity": 16
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 1,
    "hour_of_day": 18,
    "typical_popularity": 8
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 2,
    "hour_of_day": 8,
    "typical_popularity": 10
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 2,
    "hour_of_day": 9,
    "typical_popularity": 38
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 2,
    "hour_of_day": 10,
    "typical_popularity": 50
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 2,
    "hour_of_day": 11,
    "typical_popularity": 58
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 2,
    "hour_of_day": 12,
    "typical_popularity": 44
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 2,
    "hour_of_day": 13,
    "typical_popularity": 40
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 2,
    "hour_of_day": 14,
    "typical_popularity": 52
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 2,
    "hour_of_day": 15,
    "typical_popularity": 42
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 2,
    "hour_of_day": 16,
    "typical_popularity": 30
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 2,
    "hour_of_day": 17,
    "typical_popularity": 18
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 2,
    "hour_of_day": 18,
    "typical_popularity": 10
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 3,
    "hour_of_day": 8,
    "typical_popularity": 12
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 3,
    "hour_of_day": 9,
    "typical_popularity": 42
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 3,
    "hour_of_day": 10,
    "typical_popularity": 55
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 3,
    "hour_of_day": 11,
    "typical_popularity": 62
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 3,
    "hour_of_day": 12,
    "typical_popularity": 48
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 3,
    "hour_of_day": 13,
    "typical_popularity": 44
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 3,
    "hour_of_day": 14,
    "typical_popularity": 56
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 3,
    "hour_of_day": 15,
    "typical_popularity": 45
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 3,
    "hour_of_day": 16,
    "typical_popularity": 33
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 3,
    "hour_of_day": 17,
    "typical_popularity": 20
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 3,
    "hour_of_day": 18,
    "typical_popularity": 12
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 4,
    "hour_of_day": 8,
    "typical_popularity": 9
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 4,
    "hour_of_day": 9,
    "typical_popularity": 34
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 4,
    "hour_of_day": 10,
    "typical_popularity": 46
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 4,
    "hour_of_day": 11,
    "typical_popularity": 53
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 4,
    "hour_of_day": 12,
    "typical_popularity": 40
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 4,
    "hour_of_day": 13,
    "typical_popularity": 36
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 4,
    "hour_of_day": 14,
    "typical_popularity": 48
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 4,
    "hour_of_day": 15,
    "typical_popularity": 38
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 4,
    "hour_of_day": 16,
    "typical_popularity": 26
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 4,
    "hour_of_day": 17,
    "typical_popularity": 14
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 4,
    "hour_of_day": 18,
    "typical_popularity": 6
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 5,
    "hour_of_day": 8,
    "typical_popularity": 6
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 5,
    "hour_of_day": 9,
    "typical_popularity": 28
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 5,
    "hour_of_day": 10,
    "typical_popularity": 40
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 5,
    "hour_of_day": 11,
    "typical_popularity": 35
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 5,
    "hour_of_day": 12,
    "typical_popularity": 25
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 5,
    "hour_of_day": 13,
    "typical_popularity": 18
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 5,
    "hour_of_day": 14,
    "typical_popularity": 12
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 5,
    "hour_of_day": 15,
    "typical_popularity": 8
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 5,
    "hour_of_day": 16,
    "typical_popularity": 5
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 5,
    "hour_of_day": 17,
    "typical_popularity": 3
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 1,
    "hour_of_day": 8,
    "typical_popularity": 10
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 1,
    "hour_of_day": 9,
    "typical_popularity": 45
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 1,
    "hour_of_day": 10,
    "typical_popularity": 62
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 1,
    "hour_of_day": 11,
    "typical_popularity": 55
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 1,
    "hour_of_day": 12,
    "typical_popularity": 40
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 1,
    "hour_of_day": 13,
    "typical_popularity": 35
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 1,
    "hour_of_day": 14,
    "typical_popularity": 60
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 1,
    "hour_of_day": 15,
    "typical_popularity": 65
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 1,
    "hour_of_day": 16,
    "typical_popularity": 58
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 1,
    "hour_of_day": 17,
    "typical_popularity": 42
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 1,
    "hour_of_day": 18,
    "typical_popularity": 20
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 1,
    "hour_of_day": 19,
    "typical_popularity": 10
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 1,
    "hour_of_day": 20,
    "typical_popularity": 5
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 2,
    "hour_of_day": 8,
    "typical_popularity": 12
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 2,
    "hour_of_day": 9,
    "typical_popularity": 48
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 2,
    "hour_of_day": 10,
    "typical_popularity": 65
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 2,
    "hour_of_day": 11,
    "typical_popularity": 58
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 2,
    "hour_of_day": 12,
    "typical_popularity": 42
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 2,
    "hour_of_day": 13,
    "typical_popularity": 38
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 2,
    "hour_of_day": 14,
    "typical_popularity": 63
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 2,
    "hour_of_day": 15,
    "typical_popularity": 68
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 2,
    "hour_of_day": 16,
    "typical_popularity": 60
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 2,
    "hour_of_day": 17,
    "typical_popularity": 44
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 2,
    "hour_of_day": 18,
    "typical_popularity": 22
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 2,
    "hour_of_day": 19,
    "typical_popularity": 12
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 2,
    "hour_of_day": 20,
    "typical_popularity": 6
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 3,
    "hour_of_day": 8,
    "typical_popularity": 14
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 3,
    "hour_of_day": 9,
    "typical_popularity": 50
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 3,
    "hour_of_day": 10,
    "typical_popularity": 68
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 3,
    "hour_of_day": 11,
    "typical_popularity": 62
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 3,
    "hour_of_day": 12,
    "typical_popularity": 46
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 3,
    "hour_of_day": 13,
    "typical_popularity": 42
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 3,
    "hour_of_day": 14,
    "typical_popularity": 66
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 3,
    "hour_of_day": 15,
    "typical_popularity": 72
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 3,
    "hour_of_day": 16,
    "typical_popularity": 64
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 3,
    "hour_of_day": 17,
    "typical_popularity": 48
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 3,
    "hour_of_day": 18,
    "typical_popularity": 24
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 3,
    "hour_of_day": 19,
    "typical_popularity": 14
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 3,
    "hour_of_day": 20,
    "typical_popularity": 7
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 4,
    "hour_of_day": 8,
    "typical_popularity": 11
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 4,
    "hour_of_day": 9,
    "typical_popularity": 44
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 4,
    "hour_of_day": 10,
    "typical_popularity": 60
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 4,
    "hour_of_day": 11,
    "typical_popularity": 54
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 4,
    "hour_of_day": 12,
    "typical_popularity": 38
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 4,
    "hour_of_day": 13,
    "typical_popularity": 34
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 4,
    "hour_of_day": 14,
    "typical_popularity": 58
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 4,
    "hour_of_day": 15,
    "typical_popularity": 62
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 4,
    "hour_of_day": 16,
    "typical_popularity": 55
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 4,
    "hour_of_day": 17,
    "typical_popularity": 40
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 4,
    "hour_of_day": 18,
    "typical_popularity": 18
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 4,
    "hour_of_day": 19,
    "typical_popularity": 8
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 4,
    "hour_of_day": 20,
    "typical_popularity": 4
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 5,
    "hour_of_day": 8,
    "typical_popularity": 8
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 5,
    "hour_of_day": 9,
    "typical_popularity": 38
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 5,
    "hour_of_day": 10,
    "typical_popularity": 52
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 5,
    "hour_of_day": 11,
    "typical_popularity": 45
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 5,
    "hour_of_day": 12,
    "typical_popularity": 32
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 5,
    "hour_of_day": 13,
    "typical_popularity": 22
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 5,
    "hour_of_day": 14,
    "typical_popularity": 15
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 5,
    "hour_of_day": 15,
    "typical_popularity": 10
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 5,
    "hour_of_day": 16,
    "typical_popularity": 6
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 5,
    "hour_of_day": 17,
    "typical_popularity": 4
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 1,
    "hour_of_day": 8,
    "typical_popularity": 10
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 1,
    "hour_of_day": 9,
    "typical_popularity": 28
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 1,
    "hour_of_day": 10,
    "typical_popularity": 45
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 1,
    "hour_of_day": 11,
    "typical_popularity": 55
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 1,
    "hour_of_day": 12,
    "typical_popularity": 52
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 1,
    "hour_of_day": 13,
    "typical_popularity": 48
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 1,
    "hour_of_day": 14,
    "typical_popularity": 50
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 1,
    "hour_of_day": 15,
    "typical_popularity": 46
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 1,
    "hour_of_day": 16,
    "typical_popularity": 38
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 1,
    "hour_of_day": 17,
    "typical_popularity": 28
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 1,
    "hour_of_day": 18,
    "typical_popularity": 15
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 1,
    "hour_of_day": 19,
    "typical_popularity": 8
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 2,
    "hour_of_day": 8,
    "typical_popularity": 12
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 2,
    "hour_of_day": 9,
    "typical_popularity": 30
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 2,
    "hour_of_day": 10,
    "typical_popularity": 48
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 2,
    "hour_of_day": 11,
    "typical_popularity": 58
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 2,
    "hour_of_day": 12,
    "typical_popularity": 54
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 2,
    "hour_of_day": 13,
    "typical_popularity": 50
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 2,
    "hour_of_day": 14,
    "typical_popularity": 52
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 2,
    "hour_of_day": 15,
    "typical_popularity": 48
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 2,
    "hour_of_day": 16,
    "typical_popularity": 40
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 2,
    "hour_of_day": 17,
    "typical_popularity": 30
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 2,
    "hour_of_day": 18,
    "typical_popularity": 17
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 2,
    "hour_of_day": 19,
    "typical_popularity": 9
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 3,
    "hour_of_day": 8,
    "typical_popularity": 14
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 3,
    "hour_of_day": 9,
    "typical_popularity": 34
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 3,
    "hour_of_day": 10,
    "typical_popularity": 52
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 3,
    "hour_of_day": 11,
    "typical_popularity": 62
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 3,
    "hour_of_day": 12,
    "typical_popularity": 58
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 3,
    "hour_of_day": 13,
    "typical_popularity": 54
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 3,
    "hour_of_day": 14,
    "typical_popularity": 56
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 3,
    "hour_of_day": 15,
    "typical_popularity": 50
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 3,
    "hour_of_day": 16,
    "typical_popularity": 42
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 3,
    "hour_of_day": 17,
    "typical_popularity": 32
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 3,
    "hour_of_day": 18,
    "typical_popularity": 18
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 3,
    "hour_of_day": 19,
    "typical_popularity": 10
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 4,
    "hour_of_day": 8,
    "typical_popularity": 11
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 4,
    "hour_of_day": 9,
    "typical_popularity": 28
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 4,
    "hour_of_day": 10,
    "typical_popularity": 44
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 4,
    "hour_of_day": 11,
    "typical_popularity": 54
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 4,
    "hour_of_day": 12,
    "typical_popularity": 50
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 4,
    "hour_of_day": 13,
    "typical_popularity": 46
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 4,
    "hour_of_day": 14,
    "typical_popularity": 48
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 4,
    "hour_of_day": 15,
    "typical_popularity": 44
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 4,
    "hour_of_day": 16,
    "typical_popularity": 36
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 4,
    "hour_of_day": 17,
    "typical_popularity": 26
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 4,
    "hour_of_day": 18,
    "typical_popularity": 14
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 4,
    "hour_of_day": 19,
    "typical_popularity": 7
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 5,
    "hour_of_day": 8,
    "typical_popularity": 8
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 5,
    "hour_of_day": 9,
    "typical_popularity": 22
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 5,
    "hour_of_day": 10,
    "typical_popularity": 38
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 5,
    "hour_of_day": 11,
    "typical_popularity": 45
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 5,
    "hour_of_day": 12,
    "typical_popularity": 40
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 5,
    "hour_of_day": 13,
    "typical_popularity": 32
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 5,
    "hour_of_day": 14,
    "typical_popularity": 25
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 5,
    "hour_of_day": 15,
    "typical_popularity": 18
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 5,
    "hour_of_day": 16,
    "typical_popularity": 12
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 5,
    "hour_of_day": 17,
    "typical_popularity": 6
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 1,
    "hour_of_day": 8,
    "typical_popularity": 15
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 1,
    "hour_of_day": 9,
    "typical_popularity": 58
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 1,
    "hour_of_day": 10,
    "typical_popularity": 78
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 1,
    "hour_of_day": 11,
    "typical_popularity": 72
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 1,
    "hour_of_day": 12,
    "typical_popularity": 60
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 1,
    "hour_of_day": 13,
    "typical_popularity": 55
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 1,
    "hour_of_day": 14,
    "typical_popularity": 70
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 1,
    "hour_of_day": 15,
    "typical_popularity": 62
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 1,
    "hour_of_day": 16,
    "typical_popularity": 48
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 1,
    "hour_of_day": 17,
    "typical_popularity": 30
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 1,
    "hour_of_day": 18,
    "typical_popularity": 18
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 1,
    "hour_of_day": 19,
    "typical_popularity": 10
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 1,
    "hour_of_day": 20,
    "typical_popularity": 5
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 2,
    "hour_of_day": 8,
    "typical_popularity": 18
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 2,
    "hour_of_day": 9,
    "typical_popularity": 62
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 2,
    "hour_of_day": 10,
    "typical_popularity": 82
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 2,
    "hour_of_day": 11,
    "typical_popularity": 76
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 2,
    "hour_of_day": 12,
    "typical_popularity": 62
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 2,
    "hour_of_day": 13,
    "typical_popularity": 58
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 2,
    "hour_of_day": 14,
    "typical_popularity": 74
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 2,
    "hour_of_day": 15,
    "typical_popularity": 65
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 2,
    "hour_of_day": 16,
    "typical_popularity": 50
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 2,
    "hour_of_day": 17,
    "typical_popularity": 32
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 2,
    "hour_of_day": 18,
    "typical_popularity": 20
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 2,
    "hour_of_day": 19,
    "typical_popularity": 12
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 2,
    "hour_of_day": 20,
    "typical_popularity": 6
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 3,
    "hour_of_day": 8,
    "typical_popularity": 20
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 3,
    "hour_of_day": 9,
    "typical_popularity": 66
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 3,
    "hour_of_day": 10,
    "typical_popularity": 86
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 3,
    "hour_of_day": 11,
    "typical_popularity": 80
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 3,
    "hour_of_day": 12,
    "typical_popularity": 66
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 3,
    "hour_of_day": 13,
    "typical_popularity": 60
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 3,
    "hour_of_day": 14,
    "typical_popularity": 78
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 3,
    "hour_of_day": 15,
    "typical_popularity": 68
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 3,
    "hour_of_day": 16,
    "typical_popularity": 52
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 3,
    "hour_of_day": 17,
    "typical_popularity": 35
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 3,
    "hour_of_day": 18,
    "typical_popularity": 22
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 3,
    "hour_of_day": 19,
    "typical_popularity": 14
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 3,
    "hour_of_day": 20,
    "typical_popularity": 7
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 4,
    "hour_of_day": 8,
    "typical_popularity": 16
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 4,
    "hour_of_day": 9,
    "typical_popularity": 56
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 4,
    "hour_of_day": 10,
    "typical_popularity": 76
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 4,
    "hour_of_day": 11,
    "typical_popularity": 70
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 4,
    "hour_of_day": 12,
    "typical_popularity": 58
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 4,
    "hour_of_day": 13,
    "typical_popularity": 52
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 4,
    "hour_of_day": 14,
    "typical_popularity": 68
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 4,
    "hour_of_day": 15,
    "typical_popularity": 58
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 4,
    "hour_of_day": 16,
    "typical_popularity": 44
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 4,
    "hour_of_day": 17,
    "typical_popularity": 28
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 4,
    "hour_of_day": 18,
    "typical_popularity": 16
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 4,
    "hour_of_day": 19,
    "typical_popularity": 8
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 4,
    "hour_of_day": 20,
    "typical_popularity": 4
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 5,
    "hour_of_day": 8,
    "typical_popularity": 12
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 5,
    "hour_of_day": 9,
    "typical_popularity": 48
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 5,
    "hour_of_day": 10,
    "typical_popularity": 65
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 5,
    "hour_of_day": 11,
    "typical_popularity": 58
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 5,
    "hour_of_day": 12,
    "typical_popularity": 42
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 5,
    "hour_of_day": 13,
    "typical_popularity": 32
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 5,
    "hour_of_day": 14,
    "typical_popularity": 22
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 5,
    "hour_of_day": 15,
    "typical_popularity": 15
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 5,
    "hour_of_day": 16,
    "typical_popularity": 10
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 5,
    "hour_of_day": 17,
    "typical_popularity": 6
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 6,
    "hour_of_day": 9,
    "typical_popularity": 5
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 6,
    "hour_of_day": 10,
    "typical_popularity": 15
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 6,
    "hour_of_day": 11,
    "typical_popularity": 25
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 6,
    "hour_of_day": 12,
    "typical_popularity": 30
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 6,
    "hour_of_day": 13,
    "typical_popularity": 28
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 6,
    "hour_of_day": 14,
    "typical_popularity": 22
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 6,
    "hour_of_day": 15,
    "typical_popularity": 15
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 6,
    "hour_of_day": 16,
    "typical_popularity": 8
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 1,
    "hour_of_day": 8,
    "typical_popularity": 12
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 1,
    "hour_of_day": 9,
    "typical_popularity": 25
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 1,
    "hour_of_day": 10,
    "typical_popularity": 38
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 1,
    "hour_of_day": 11,
    "typical_popularity": 55
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 1,
    "hour_of_day": 12,
    "typical_popularity": 82
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 1,
    "hour_of_day": 13,
    "typical_popularity": 78
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 1,
    "hour_of_day": 14,
    "typical_popularity": 55
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 1,
    "hour_of_day": 15,
    "typical_popularity": 45
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 1,
    "hour_of_day": 16,
    "typical_popularity": 38
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 1,
    "hour_of_day": 17,
    "typical_popularity": 30
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 1,
    "hour_of_day": 18,
    "typical_popularity": 20
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 1,
    "hour_of_day": 19,
    "typical_popularity": 10
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 2,
    "hour_of_day": 8,
    "typical_popularity": 14
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 2,
    "hour_of_day": 9,
    "typical_popularity": 28
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 2,
    "hour_of_day": 10,
    "typical_popularity": 40
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 2,
    "hour_of_day": 11,
    "typical_popularity": 58
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 2,
    "hour_of_day": 12,
    "typical_popularity": 85
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 2,
    "hour_of_day": 13,
    "typical_popularity": 80
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 2,
    "hour_of_day": 14,
    "typical_popularity": 58
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 2,
    "hour_of_day": 15,
    "typical_popularity": 48
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 2,
    "hour_of_day": 16,
    "typical_popularity": 40
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 2,
    "hour_of_day": 17,
    "typical_popularity": 32
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 2,
    "hour_of_day": 18,
    "typical_popularity": 22
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 2,
    "hour_of_day": 19,
    "typical_popularity": 12
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 3,
    "hour_of_day": 8,
    "typical_popularity": 16
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 3,
    "hour_of_day": 9,
    "typical_popularity": 30
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 3,
    "hour_of_day": 10,
    "typical_popularity": 44
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 3,
    "hour_of_day": 11,
    "typical_popularity": 62
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 3,
    "hour_of_day": 12,
    "typical_popularity": 90
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 3,
    "hour_of_day": 13,
    "typical_popularity": 84
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 3,
    "hour_of_day": 14,
    "typical_popularity": 60
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 3,
    "hour_of_day": 15,
    "typical_popularity": 50
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 3,
    "hour_of_day": 16,
    "typical_popularity": 42
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 3,
    "hour_of_day": 17,
    "typical_popularity": 34
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 3,
    "hour_of_day": 18,
    "typical_popularity": 24
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 3,
    "hour_of_day": 19,
    "typical_popularity": 14
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 4,
    "hour_of_day": 8,
    "typical_popularity": 13
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 4,
    "hour_of_day": 9,
    "typical_popularity": 26
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 4,
    "hour_of_day": 10,
    "typical_popularity": 38
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 4,
    "hour_of_day": 11,
    "typical_popularity": 54
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 4,
    "hour_of_day": 12,
    "typical_popularity": 80
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 4,
    "hour_of_day": 13,
    "typical_popularity": 76
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 4,
    "hour_of_day": 14,
    "typical_popularity": 53
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 4,
    "hour_of_day": 15,
    "typical_popularity": 44
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 4,
    "hour_of_day": 16,
    "typical_popularity": 36
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 4,
    "hour_of_day": 17,
    "typical_popularity": 28
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 4,
    "hour_of_day": 18,
    "typical_popularity": 18
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 4,
    "hour_of_day": 19,
    "typical_popularity": 8
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 5,
    "hour_of_day": 8,
    "typical_popularity": 10
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 5,
    "hour_of_day": 9,
    "typical_popularity": 22
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 5,
    "hour_of_day": 10,
    "typical_popularity": 35
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 5,
    "hour_of_day": 11,
    "typical_popularity": 48
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 5,
    "hour_of_day": 12,
    "typical_popularity": 72
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 5,
    "hour_of_day": 13,
    "typical_popularity": 65
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 5,
    "hour_of_day": 14,
    "typical_popularity": 42
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 5,
    "hour_of_day": 15,
    "typical_popularity": 30
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 5,
    "hour_of_day": 16,
    "typical_popularity": 20
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 5,
    "hour_of_day": 17,
    "typical_popularity": 12
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 5,
    "hour_of_day": 18,
    "typical_popularity": 6
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 5,
    "hour_of_day": 19,
    "typical_popularity": 3
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 6,
    "hour_of_day": 10,
    "typical_popularity": 8
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 6,
    "hour_of_day": 11,
    "typical_popularity": 18
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 6,
    "hour_of_day": 12,
    "typical_popularity": 35
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 6,
    "hour_of_day": 13,
    "typical_popularity": 40
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 6,
    "hour_of_day": 14,
    "typical_popularity": 35
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 6,
    "hour_of_day": 15,
    "typical_popularity": 28
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 6,
    "hour_of_day": 16,
    "typical_popularity": 20
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 6,
    "hour_of_day": 17,
    "typical_popularity": 12
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 1,
    "hour_of_day": 8,
    "typical_popularity": 10
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 1,
    "hour_of_day": 9,
    "typical_popularity": 42
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 1,
    "hour_of_day": 10,
    "typical_popularity": 58
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 1,
    "hour_of_day": 11,
    "typical_popularity": 52
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 1,
    "hour_of_day": 12,
    "typical_popularity": 40
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 1,
    "hour_of_day": 13,
    "typical_popularity": 36
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 1,
    "hour_of_day": 14,
    "typical_popularity": 55
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 1,
    "hour_of_day": 15,
    "typical_popularity": 60
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 1,
    "hour_of_day": 16,
    "typical_popularity": 52
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 1,
    "hour_of_day": 17,
    "typical_popularity": 38
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 1,
    "hour_of_day": 18,
    "typical_popularity": 20
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 1,
    "hour_of_day": 19,
    "typical_popularity": 10
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 1,
    "hour_of_day": 20,
    "typical_popularity": 5
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 2,
    "hour_of_day": 8,
    "typical_popularity": 12
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 2,
    "hour_of_day": 9,
    "typical_popularity": 45
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 2,
    "hour_of_day": 10,
    "typical_popularity": 62
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 2,
    "hour_of_day": 11,
    "typical_popularity": 55
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 2,
    "hour_of_day": 12,
    "typical_popularity": 42
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 2,
    "hour_of_day": 13,
    "typical_popularity": 38
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 2,
    "hour_of_day": 14,
    "typical_popularity": 58
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 2,
    "hour_of_day": 15,
    "typical_popularity": 64
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 2,
    "hour_of_day": 16,
    "typical_popularity": 55
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 2,
    "hour_of_day": 17,
    "typical_popularity": 40
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 2,
    "hour_of_day": 18,
    "typical_popularity": 22
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 2,
    "hour_of_day": 19,
    "typical_popularity": 12
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 2,
    "hour_of_day": 20,
    "typical_popularity": 6
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 3,
    "hour_of_day": 8,
    "typical_popularity": 14
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 3,
    "hour_of_day": 9,
    "typical_popularity": 48
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 3,
    "hour_of_day": 10,
    "typical_popularity": 66
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 3,
    "hour_of_day": 11,
    "typical_popularity": 60
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 3,
    "hour_of_day": 12,
    "typical_popularity": 46
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 3,
    "hour_of_day": 13,
    "typical_popularity": 42
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 3,
    "hour_of_day": 14,
    "typical_popularity": 62
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 3,
    "hour_of_day": 15,
    "typical_popularity": 68
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 3,
    "hour_of_day": 16,
    "typical_popularity": 58
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 3,
    "hour_of_day": 17,
    "typical_popularity": 44
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 3,
    "hour_of_day": 18,
    "typical_popularity": 25
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 3,
    "hour_of_day": 19,
    "typical_popularity": 14
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 3,
    "hour_of_day": 20,
    "typical_popularity": 7
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 4,
    "hour_of_day": 8,
    "typical_popularity": 11
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 4,
    "hour_of_day": 9,
    "typical_popularity": 40
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 4,
    "hour_of_day": 10,
    "typical_popularity": 56
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 4,
    "hour_of_day": 11,
    "typical_popularity": 50
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 4,
    "hour_of_day": 12,
    "typical_popularity": 38
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 4,
    "hour_of_day": 13,
    "typical_popularity": 34
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 4,
    "hour_of_day": 14,
    "typical_popularity": 52
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 4,
    "hour_of_day": 15,
    "typical_popularity": 58
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 4,
    "hour_of_day": 16,
    "typical_popularity": 50
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 4,
    "hour_of_day": 17,
    "typical_popularity": 36
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 4,
    "hour_of_day": 18,
    "typical_popularity": 18
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 4,
    "hour_of_day": 19,
    "typical_popularity": 8
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 4,
    "hour_of_day": 20,
    "typical_popularity": 4
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 5,
    "hour_of_day": 8,
    "typical_popularity": 8
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 5,
    "hour_of_day": 9,
    "typical_popularity": 35
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 5,
    "hour_of_day": 10,
    "typical_popularity": 50
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 5,
    "hour_of_day": 11,
    "typical_popularity": 42
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 5,
    "hour_of_day": 12,
    "typical_popularity": 30
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 5,
    "hour_of_day": 13,
    "typical_popularity": 20
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 5,
    "hour_of_day": 14,
    "typical_popularity": 14
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 5,
    "hour_of_day": 15,
    "typical_popularity": 10
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 5,
    "hour_of_day": 16,
    "typical_popularity": 6
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 5,
    "hour_of_day": 17,
    "typical_popularity": 4
  }
] as unknown as GooglePopularTime[]
