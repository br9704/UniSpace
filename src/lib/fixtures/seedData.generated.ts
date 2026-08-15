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

// Annotated rather than cast. The previous `as unknown as Building[]` asserted
// a shape instead of checking one, and hid four missing timestamp columns for
// as long as it existed. A contextual annotation makes tsc verify every row.

export const SEED_CAMPUSES: Campus[] = [
  {
    "id": "a1b2c3d4-0000-0000-0000-000000000001",
    "slug": "unimelb",
    "name": "University of Melbourne — Parkville",
    "city": "Melbourne",
    "country": "AU",
    "center_lat": -37.7964,
    "center_lng": 144.9631,
    "default_zoom": 15,
    "created_at": "2026-08-15T00:00:00.000Z"
  }
]

export const SEED_BUILDINGS: Building[] = [
  {
    "id": "b0000000-0000-0000-0000-000000000001",
    "campus_id": "a1b2c3d4-0000-0000-0000-000000000001",
    "slug": "baillieu-library",
    "name": "Baillieu Library",
    "short_name": "Baillieu",
    "estimated_capacity": 800,
    "entrance_lat": -37.7985,
    "entrance_lng": 144.959356,
    "centroid_lat": -37.7985,
    "centroid_lng": 144.959356,
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.959158,
            -37.797965
          ],
          [
            144.959598,
            -37.797996
          ],
          [
            144.959572,
            -37.798227
          ],
          [
            144.959559,
            -37.798337
          ],
          [
            144.959513,
            -37.798755
          ],
          [
            144.959434,
            -37.79875
          ],
          [
            144.959431,
            -37.79877
          ],
          [
            144.959422,
            -37.79877
          ],
          [
            144.959388,
            -37.798767
          ],
          [
            144.959261,
            -37.798759
          ],
          [
            144.959264,
            -37.798734
          ],
          [
            144.959097,
            -37.798722
          ],
          [
            144.959153,
            -37.798221
          ],
          [
            144.959129,
            -37.79822
          ],
          [
            144.959158,
            -37.797965
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
    "hours_sun": "10:00-17:00",
    "hours_source": "https://library.unimelb.edu.au/library-locations-and-opening-hours",
    "hours_verified_on": "2026-08-15",
    "hours_period": "Semester 2 2026 teaching weeks. Read from a current-week table on 2026-08-15; not known to hold during the non-teaching week of 28 Sep - 4 Oct 2026, during examinations, over summer, or on public holidays.",
    "created_at": "2026-08-15T00:00:00.000Z",
    "updated_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "b0000000-0000-0000-0000-000000000002",
    "campus_id": "a1b2c3d4-0000-0000-0000-000000000001",
    "slug": "erc-library",
    "name": "Eastern Resource Centre",
    "short_name": "ERC",
    "estimated_capacity": 300,
    "entrance_lat": -37.79924,
    "entrance_lng": 144.96284,
    "centroid_lat": -37.799345,
    "centroid_lng": 144.962842,
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.962581,
            -37.799211
          ],
          [
            144.962765,
            -37.79923
          ],
          [
            144.962858,
            -37.79924
          ],
          [
            144.96292,
            -37.799247
          ],
          [
            144.963102,
            -37.799266
          ],
          [
            144.963096,
            -37.799302
          ],
          [
            144.963092,
            -37.799328
          ],
          [
            144.963074,
            -37.799431
          ],
          [
            144.963059,
            -37.79943
          ],
          [
            144.963053,
            -37.799467
          ],
          [
            144.962719,
            -37.799432
          ],
          [
            144.96262,
            -37.799421
          ],
          [
            144.962563,
            -37.799415
          ],
          [
            144.962569,
            -37.799377
          ],
          [
            144.962553,
            -37.799375
          ],
          [
            144.962581,
            -37.799211
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
    "hours_sun": "10:00-17:00",
    "hours_source": "https://library.unimelb.edu.au/library-locations-and-opening-hours",
    "hours_verified_on": "2026-08-15",
    "hours_period": "Semester 2 2026 teaching weeks. Read from a current-week table on 2026-08-15; not known to hold during the non-teaching week of 28 Sep - 4 Oct 2026, during examinations, over summer, or on public holidays.",
    "created_at": "2026-08-15T00:00:00.000Z",
    "updated_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "b0000000-0000-0000-0000-000000000003",
    "campus_id": "a1b2c3d4-0000-0000-0000-000000000001",
    "slug": "arts-west",
    "name": "Arts West",
    "short_name": "Arts W",
    "estimated_capacity": 400,
    "entrance_lat": -37.79753,
    "entrance_lng": 144.9594,
    "centroid_lat": -37.797623,
    "centroid_lng": 144.959406,
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.959152,
            -37.797705
          ],
          [
            144.959112,
            -37.797668
          ],
          [
            144.959128,
            -37.797527
          ],
          [
            144.959132,
            -37.797513
          ],
          [
            144.959157,
            -37.797499
          ],
          [
            144.95918,
            -37.797479
          ],
          [
            144.959206,
            -37.797464
          ],
          [
            144.959228,
            -37.797454
          ],
          [
            144.959252,
            -37.797451
          ],
          [
            144.959284,
            -37.797451
          ],
          [
            144.959295,
            -37.797451
          ],
          [
            144.959332,
            -37.79746
          ],
          [
            144.959357,
            -37.797473
          ],
          [
            144.95938,
            -37.797492
          ],
          [
            144.959397,
            -37.797515
          ],
          [
            144.959612,
            -37.797533
          ],
          [
            144.959625,
            -37.797528
          ],
          [
            144.959639,
            -37.797523
          ],
          [
            144.959654,
            -37.797518
          ],
          [
            144.959671,
            -37.797523
          ],
          [
            144.959685,
            -37.797533
          ],
          [
            144.959692,
            -37.797544
          ],
          [
            144.95967,
            -37.797759
          ],
          [
            144.959657,
            -37.797773
          ],
          [
            144.959635,
            -37.797786
          ],
          [
            144.959622,
            -37.797793
          ],
          [
            144.959621,
            -37.797801
          ],
          [
            144.959608,
            -37.797916
          ],
          [
            144.959598,
            -37.797996
          ],
          [
            144.959158,
            -37.797965
          ],
          [
            144.959123,
            -37.797962
          ],
          [
            144.959132,
            -37.797884
          ],
          [
            144.959152,
            -37.797705
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
    "has_elevator": true,
    "has_accessible_bathrooms": true,
    "has_accessible_parking": null,
    "hours_mon": "07:30-21:00",
    "hours_tue": "07:30-21:00",
    "hours_wed": "07:30-21:00",
    "hours_thu": "07:30-21:00",
    "hours_fri": "07:30-18:00",
    "hours_sat": null,
    "hours_sun": null,
    "hours_source": null,
    "hours_verified_on": null,
    "hours_period": null,
    "created_at": "2026-08-15T00:00:00.000Z",
    "updated_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "b0000000-0000-0000-0000-000000000004",
    "campus_id": "a1b2c3d4-0000-0000-0000-000000000001",
    "slug": "engineering-1",
    "name": "Engineering Building 1",
    "short_name": "Eng 1",
    "estimated_capacity": 350,
    "entrance_lat": -37.799,
    "entrance_lng": 144.9636,
    "centroid_lat": -37.7993,
    "centroid_lng": 144.9636,
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.9631,
            -37.799
          ],
          [
            144.9641,
            -37.799
          ],
          [
            144.9641,
            -37.7996
          ],
          [
            144.9631,
            -37.7996
          ],
          [
            144.9631,
            -37.799
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
    "hours_sun": null,
    "hours_source": null,
    "hours_verified_on": null,
    "hours_period": null,
    "created_at": "2026-08-15T00:00:00.000Z",
    "updated_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "b0000000-0000-0000-0000-000000000005",
    "campus_id": "a1b2c3d4-0000-0000-0000-000000000001",
    "slug": "ict-building",
    "name": "Doug McDonell Building (ICT)",
    "short_name": "ICT",
    "estimated_capacity": 250,
    "entrance_lat": -37.7987,
    "entrance_lng": 144.9628,
    "centroid_lat": -37.799,
    "centroid_lng": 144.9628,
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.9624,
            -37.7987
          ],
          [
            144.9632,
            -37.7987
          ],
          [
            144.9632,
            -37.7993
          ],
          [
            144.9624,
            -37.7993
          ],
          [
            144.9624,
            -37.7987
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
    "has_elevator": true,
    "has_accessible_bathrooms": true,
    "has_accessible_parking": null,
    "hours_mon": "07:30-21:00",
    "hours_tue": "07:30-21:00",
    "hours_wed": "07:30-21:00",
    "hours_thu": "07:30-21:00",
    "hours_fri": "07:30-18:00",
    "hours_sat": null,
    "hours_sun": null,
    "hours_source": null,
    "hours_verified_on": null,
    "hours_period": null,
    "created_at": "2026-08-15T00:00:00.000Z",
    "updated_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "b0000000-0000-0000-0000-000000000008",
    "campus_id": "a1b2c3d4-0000-0000-0000-000000000001",
    "slug": "law-school",
    "name": "Melbourne Law School",
    "short_name": "Law",
    "estimated_capacity": 400,
    "entrance_lat": -37.80217,
    "entrance_lng": 144.95999,
    "centroid_lat": -37.802375,
    "centroid_lng": 144.960016,
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.96042,
            -37.802596
          ],
          [
            144.960125,
            -37.802564
          ],
          [
            144.960108,
            -37.802562
          ],
          [
            144.960083,
            -37.802569
          ],
          [
            144.959797,
            -37.802652
          ],
          [
            144.95977,
            -37.802594
          ],
          [
            144.959749,
            -37.80255
          ],
          [
            144.959731,
            -37.802511
          ],
          [
            144.959704,
            -37.80246
          ],
          [
            144.959687,
            -37.802407
          ],
          [
            144.959677,
            -37.802349
          ],
          [
            144.959678,
            -37.80229
          ],
          [
            144.959701,
            -37.802158
          ],
          [
            144.959798,
            -37.802169
          ],
          [
            144.959895,
            -37.802179
          ],
          [
            144.959891,
            -37.802203
          ],
          [
            144.960233,
            -37.80224
          ],
          [
            144.960275,
            -37.802245
          ],
          [
            144.96028,
            -37.802221
          ],
          [
            144.960375,
            -37.802231
          ],
          [
            144.960471,
            -37.802242
          ],
          [
            144.960458,
            -37.802315
          ],
          [
            144.960468,
            -37.802316
          ],
          [
            144.96042,
            -37.802596
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
    "hours_sun": "10:00-17:00",
    "hours_source": "https://library.unimelb.edu.au/library-locations-and-opening-hours",
    "hours_verified_on": "2026-08-15",
    "hours_period": "Semester 2 2026 teaching weeks. Read from a current-week table on 2026-08-15; not known to hold during the non-teaching week of 28 Sep - 4 Oct 2026, during examinations, over summer, or on public holidays.",
    "created_at": "2026-08-15T00:00:00.000Z",
    "updated_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "b0000000-0000-0000-0000-000000000009",
    "campus_id": "a1b2c3d4-0000-0000-0000-000000000001",
    "slug": "fbe-building",
    "name": "FBE Building",
    "short_name": "FBE",
    "estimated_capacity": 350,
    "entrance_lat": -37.801408,
    "entrance_lng": 144.95929,
    "centroid_lat": -37.801408,
    "centroid_lng": 144.95929,
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.959433,
            -37.801425
          ],
          [
            144.95943,
            -37.801442
          ],
          [
            144.959367,
            -37.801435
          ],
          [
            144.959296,
            -37.801829
          ],
          [
            144.959158,
            -37.801814
          ],
          [
            144.959108,
            -37.801808
          ],
          [
            144.95911,
            -37.801798
          ],
          [
            144.959036,
            -37.80179
          ],
          [
            144.959108,
            -37.801389
          ],
          [
            144.95912,
            -37.801323
          ],
          [
            144.959196,
            -37.800899
          ],
          [
            144.959328,
            -37.800914
          ],
          [
            144.959521,
            -37.800936
          ],
          [
            144.959531,
            -37.800937
          ],
          [
            144.959456,
            -37.801358
          ],
          [
            144.959443,
            -37.801426
          ],
          [
            144.959433,
            -37.801425
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
    "hours_sun": "10:00-17:00",
    "hours_source": "https://library.unimelb.edu.au/library-locations-and-opening-hours",
    "hours_verified_on": "2026-08-15",
    "hours_period": "Semester 2 2026 teaching weeks. Read from a current-week table on 2026-08-15; not known to hold during the non-teaching week of 28 Sep - 4 Oct 2026, during examinations, over summer, or on public holidays.",
    "created_at": "2026-08-15T00:00:00.000Z",
    "updated_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "b0000000-0000-0000-0000-00000000000a",
    "campus_id": "a1b2c3d4-0000-0000-0000-000000000001",
    "slug": "the-spot",
    "name": "The Spot",
    "short_name": "The Spot",
    "estimated_capacity": 150,
    "entrance_lat": -37.8013,
    "entrance_lng": 144.95887,
    "centroid_lat": -37.801422,
    "centroid_lng": 144.958978,
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.95912,
            -37.801323
          ],
          [
            144.959108,
            -37.801389
          ],
          [
            144.959094,
            -37.801387
          ],
          [
            144.959097,
            -37.801373
          ],
          [
            144.959053,
            -37.801369
          ],
          [
            144.959048,
            -37.801396
          ],
          [
            144.959033,
            -37.801394
          ],
          [
            144.959028,
            -37.801418
          ],
          [
            144.958954,
            -37.801831
          ],
          [
            144.958612,
            -37.801793
          ],
          [
            144.958618,
            -37.801759
          ],
          [
            144.958692,
            -37.801347
          ],
          [
            144.958703,
            -37.801282
          ],
          [
            144.959046,
            -37.80132
          ],
          [
            144.959045,
            -37.801326
          ],
          [
            144.95906,
            -37.801328
          ],
          [
            144.959059,
            -37.801332
          ],
          [
            144.959103,
            -37.801337
          ],
          [
            144.959106,
            -37.801322
          ],
          [
            144.95912,
            -37.801323
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
    "hours_mon": "07:00-22:00",
    "hours_tue": "07:00-22:00",
    "hours_wed": "07:00-22:00",
    "hours_thu": "07:00-22:00",
    "hours_fri": "07:00-18:00",
    "hours_sat": "09:00-17:00",
    "hours_sun": null,
    "hours_source": null,
    "hours_verified_on": null,
    "hours_period": null,
    "created_at": "2026-08-15T00:00:00.000Z",
    "updated_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "b0000000-0000-0000-0000-00000000000b",
    "campus_id": "a1b2c3d4-0000-0000-0000-000000000001",
    "slug": "melbourne-school-of-design",
    "name": "Melbourne School of Design",
    "short_name": "MSD",
    "estimated_capacity": 300,
    "entrance_lat": -37.797156,
    "entrance_lng": 144.962749,
    "centroid_lat": -37.797156,
    "centroid_lng": 144.962749,
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.963082,
            -37.797237
          ],
          [
            144.963068,
            -37.797319
          ],
          [
            144.963057,
            -37.797375
          ],
          [
            144.963081,
            -37.797382
          ],
          [
            144.963075,
            -37.797438
          ],
          [
            144.963115,
            -37.797516
          ],
          [
            144.963102,
            -37.797515
          ],
          [
            144.962728,
            -37.797476
          ],
          [
            144.96241,
            -37.797441
          ],
          [
            144.9623,
            -37.797429
          ],
          [
            144.962319,
            -37.797318
          ],
          [
            144.962331,
            -37.79732
          ],
          [
            144.962362,
            -37.797143
          ],
          [
            144.962343,
            -37.797142
          ],
          [
            144.962361,
            -37.797036
          ],
          [
            144.962368,
            -37.796998
          ],
          [
            144.962379,
            -37.796999
          ],
          [
            144.962402,
            -37.796857
          ],
          [
            144.96251,
            -37.796867
          ],
          [
            144.962517,
            -37.796992
          ],
          [
            144.962519,
            -37.797015
          ],
          [
            144.962513,
            -37.797051
          ],
          [
            144.962529,
            -37.797053
          ],
          [
            144.962543,
            -37.79698
          ],
          [
            144.962769,
            -37.797004
          ],
          [
            144.962764,
            -37.797036
          ],
          [
            144.962869,
            -37.797048
          ],
          [
            144.962874,
            -37.797019
          ],
          [
            144.962949,
            -37.797061
          ],
          [
            144.962968,
            -37.79695
          ],
          [
            144.96313,
            -37.796968
          ],
          [
            144.963109,
            -37.797084
          ],
          [
            144.963256,
            -37.797087
          ],
          [
            144.963255,
            -37.797139
          ],
          [
            144.96327,
            -37.797158
          ],
          [
            144.963082,
            -37.797237
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
    "hours_sun": "10:00-16:00",
    "hours_source": "https://library.unimelb.edu.au/library-locations-and-opening-hours",
    "hours_verified_on": "2026-08-15",
    "hours_period": "Semester 2 2026 teaching weeks. Read from a current-week table on 2026-08-15; not known to hold during the non-teaching week of 28 Sep - 4 Oct 2026, during examinations, over summer, or on public holidays.",
    "created_at": "2026-08-15T00:00:00.000Z",
    "updated_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "b0000000-0000-0000-0000-00000000000c",
    "campus_id": "a1b2c3d4-0000-0000-0000-000000000001",
    "slug": "kwong-lee-dow",
    "name": "Kwong Lee Dow Building",
    "short_name": "KLD",
    "estimated_capacity": 250,
    "entrance_lat": -37.80383,
    "entrance_lng": 144.96084,
    "centroid_lat": -37.804,
    "centroid_lng": 144.9608,
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.9605021,
            -37.8041215
          ],
          [
            144.960558,
            -37.8037969
          ],
          [
            144.9611306,
            -37.8038584
          ],
          [
            144.9610747,
            -37.804183
          ],
          [
            144.9605021,
            -37.8041215
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
    "has_elevator": true,
    "has_accessible_bathrooms": true,
    "has_accessible_parking": null,
    "hours_mon": "07:30-21:00",
    "hours_tue": "07:30-21:00",
    "hours_wed": "07:30-21:00",
    "hours_thu": "07:30-21:00",
    "hours_fri": "07:30-18:00",
    "hours_sat": null,
    "hours_sun": null,
    "hours_source": null,
    "hours_verified_on": null,
    "hours_period": null,
    "created_at": "2026-08-15T00:00:00.000Z",
    "updated_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "b0000000-0000-0000-0000-00000000000d",
    "campus_id": "a1b2c3d4-0000-0000-0000-000000000001",
    "slug": "old-arts",
    "name": "Old Arts Building",
    "short_name": "Old Arts",
    "estimated_capacity": 300,
    "entrance_lat": -37.79741,
    "entrance_lng": 144.96015,
    "centroid_lat": -37.797731,
    "centroid_lng": 144.96009,
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.960413,
            -37.797518
          ],
          [
            144.960354,
            -37.797513
          ],
          [
            144.960322,
            -37.797507
          ],
          [
            144.960333,
            -37.797448
          ],
          [
            144.9599,
            -37.7974
          ],
          [
            144.959885,
            -37.797487
          ],
          [
            144.959904,
            -37.797489
          ],
          [
            144.959893,
            -37.797554
          ],
          [
            144.959873,
            -37.797552
          ],
          [
            144.95987,
            -37.797571
          ],
          [
            144.959868,
            -37.797582
          ],
          [
            144.959887,
            -37.797584
          ],
          [
            144.959873,
            -37.797659
          ],
          [
            144.959851,
            -37.797657
          ],
          [
            144.959831,
            -37.797773
          ],
          [
            144.959852,
            -37.797775
          ],
          [
            144.959838,
            -37.79785
          ],
          [
            144.959865,
            -37.797853
          ],
          [
            144.959856,
            -37.797903
          ],
          [
            144.959829,
            -37.7979
          ],
          [
            144.959811,
            -37.797998
          ],
          [
            144.959827,
            -37.798
          ],
          [
            144.959898,
            -37.798007
          ],
          [
            144.95988,
            -37.798107
          ],
          [
            144.960089,
            -37.79813
          ],
          [
            144.960297,
            -37.798154
          ],
          [
            144.960325,
            -37.797998
          ],
          [
            144.960339,
            -37.797919
          ],
          [
            144.960354,
            -37.797835
          ],
          [
            144.960394,
            -37.797839
          ],
          [
            144.960419,
            -37.797703
          ],
          [
            144.960381,
            -37.797699
          ],
          [
            144.960392,
            -37.797637
          ],
          [
            144.960409,
            -37.797639
          ],
          [
            144.960412,
            -37.797622
          ],
          [
            144.960416,
            -37.797599
          ],
          [
            144.960399,
            -37.797597
          ],
          [
            144.960413,
            -37.797518
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
    "hours_mon": "07:30-21:00",
    "hours_tue": "07:30-21:00",
    "hours_wed": "07:30-21:00",
    "hours_thu": "07:30-21:00",
    "hours_fri": "07:30-18:00",
    "hours_sat": null,
    "hours_sun": null,
    "hours_source": null,
    "hours_verified_on": null,
    "hours_period": null,
    "created_at": "2026-08-15T00:00:00.000Z",
    "updated_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "b0000000-0000-0000-0000-00000000000e",
    "campus_id": "a1b2c3d4-0000-0000-0000-000000000001",
    "slug": "redmond-barry",
    "name": "Redmond Barry Building",
    "short_name": "RBB",
    "estimated_capacity": 350,
    "entrance_lat": -37.7965,
    "entrance_lng": 144.96242,
    "centroid_lat": -37.796731,
    "centroid_lng": 144.962667,
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.962421,
            -37.796765
          ],
          [
            144.962422,
            -37.79684
          ],
          [
            144.962535,
            -37.796852
          ],
          [
            144.962559,
            -37.79678
          ],
          [
            144.962592,
            -37.796783
          ],
          [
            144.962624,
            -37.796787
          ],
          [
            144.962628,
            -37.796863
          ],
          [
            144.96274,
            -37.796875
          ],
          [
            144.962769,
            -37.796803
          ],
          [
            144.962801,
            -37.796806
          ],
          [
            144.962837,
            -37.79681
          ],
          [
            144.962831,
            -37.796886
          ],
          [
            144.962943,
            -37.796898
          ],
          [
            144.962973,
            -37.796825
          ],
          [
            144.963015,
            -37.79683
          ],
          [
            144.96302,
            -37.79683
          ],
          [
            144.963059,
            -37.796835
          ],
          [
            144.963072,
            -37.796836
          ],
          [
            144.963086,
            -37.796752
          ],
          [
            144.963093,
            -37.796713
          ],
          [
            144.962632,
            -37.796663
          ],
          [
            144.962566,
            -37.796656
          ],
          [
            144.962568,
            -37.796642
          ],
          [
            144.962586,
            -37.796644
          ],
          [
            144.962637,
            -37.796573
          ],
          [
            144.962645,
            -37.796519
          ],
          [
            144.962539,
            -37.796491
          ],
          [
            144.962423,
            -37.796494
          ],
          [
            144.96242,
            -37.79655
          ],
          [
            144.962442,
            -37.796629
          ],
          [
            144.962456,
            -37.79663
          ],
          [
            144.962453,
            -37.796643
          ],
          [
            144.962437,
            -37.796641
          ],
          [
            144.962407,
            -37.796638
          ],
          [
            144.962386,
            -37.796761
          ],
          [
            144.962403,
            -37.796762
          ],
          [
            144.962421,
            -37.796765
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
    "has_elevator": true,
    "has_accessible_bathrooms": true,
    "has_accessible_parking": null,
    "hours_mon": "07:30-21:00",
    "hours_tue": "07:30-21:00",
    "hours_wed": "07:30-21:00",
    "hours_thu": "07:30-21:00",
    "hours_fri": "07:30-18:00",
    "hours_sat": null,
    "hours_sun": null,
    "hours_source": null,
    "hours_verified_on": null,
    "hours_period": null,
    "created_at": "2026-08-15T00:00:00.000Z",
    "updated_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "b0000000-0000-0000-0000-00000000000f",
    "campus_id": "a1b2c3d4-0000-0000-0000-000000000001",
    "slug": "john-medley",
    "name": "John Medley Building",
    "short_name": "Medley",
    "estimated_capacity": 250,
    "entrance_lat": -37.79914,
    "entrance_lng": 144.96054,
    "centroid_lat": -37.799279,
    "centroid_lng": 144.960679,
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.960301,
            -37.799127
          ],
          [
            144.960588,
            -37.799159
          ],
          [
            144.960577,
            -37.799225
          ],
          [
            144.960681,
            -37.799237
          ],
          [
            144.960784,
            -37.799248
          ],
          [
            144.960792,
            -37.7992
          ],
          [
            144.960795,
            -37.799184
          ],
          [
            144.961083,
            -37.799216
          ],
          [
            144.961063,
            -37.799331
          ],
          [
            144.961045,
            -37.799431
          ],
          [
            144.960757,
            -37.799399
          ],
          [
            144.960768,
            -37.799335
          ],
          [
            144.960665,
            -37.799323
          ],
          [
            144.960561,
            -37.799312
          ],
          [
            144.96055,
            -37.799374
          ],
          [
            144.960262,
            -37.799341
          ],
          [
            144.96027,
            -37.799298
          ],
          [
            144.960301,
            -37.799127
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
    "hours_mon": "07:30-21:00",
    "hours_tue": "07:30-21:00",
    "hours_wed": "07:30-21:00",
    "hours_thu": "07:30-21:00",
    "hours_fri": "07:30-18:00",
    "hours_sat": null,
    "hours_sun": null,
    "hours_source": null,
    "hours_verified_on": null,
    "hours_period": null,
    "created_at": "2026-08-15T00:00:00.000Z",
    "updated_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "b0000000-0000-0000-0000-000000000010",
    "campus_id": "a1b2c3d4-0000-0000-0000-000000000001",
    "slug": "chemistry-building",
    "name": "Chemistry Building",
    "short_name": "Chem",
    "estimated_capacity": 300,
    "entrance_lat": -37.7977,
    "entrance_lng": 144.9621,
    "centroid_lat": -37.797959,
    "centroid_lng": 144.962113,
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.962373,
            -37.798171
          ],
          [
            144.962357,
            -37.798258
          ],
          [
            144.962243,
            -37.798246
          ],
          [
            144.962256,
            -37.798171
          ],
          [
            144.962181,
            -37.798163
          ],
          [
            144.962175,
            -37.798195
          ],
          [
            144.962131,
            -37.79819
          ],
          [
            144.962127,
            -37.798211
          ],
          [
            144.961784,
            -37.798174
          ],
          [
            144.961838,
            -37.797868
          ],
          [
            144.961849,
            -37.797804
          ],
          [
            144.96183,
            -37.797802
          ],
          [
            144.961831,
            -37.797795
          ],
          [
            144.961766,
            -37.797788
          ],
          [
            144.961781,
            -37.797701
          ],
          [
            144.962141,
            -37.79774
          ],
          [
            144.962144,
            -37.797719
          ],
          [
            144.962182,
            -37.797723
          ],
          [
            144.962225,
            -37.797728
          ],
          [
            144.96245,
            -37.797741
          ],
          [
            144.962426,
            -37.797874
          ],
          [
            144.9624,
            -37.798037
          ],
          [
            144.962373,
            -37.798171
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
    "has_elevator": true,
    "has_accessible_bathrooms": true,
    "has_accessible_parking": null,
    "hours_mon": "07:30-21:00",
    "hours_tue": "07:30-21:00",
    "hours_wed": "07:30-21:00",
    "hours_thu": "07:30-21:00",
    "hours_fri": "07:30-18:00",
    "hours_sat": null,
    "hours_sun": null,
    "hours_source": null,
    "hours_verified_on": null,
    "hours_period": null,
    "created_at": "2026-08-15T00:00:00.000Z",
    "updated_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "b0000000-0000-0000-0000-000000000011",
    "campus_id": "a1b2c3d4-0000-0000-0000-000000000001",
    "slug": "peter-hall",
    "name": "Peter Hall Building",
    "short_name": "Peter Hall",
    "estimated_capacity": 250,
    "entrance_lat": -37.79791,
    "entrance_lng": 144.9637,
    "centroid_lat": -37.798162,
    "centroid_lng": 144.963627,
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.963534,
            -37.797871
          ],
          [
            144.963536,
            -37.797858
          ],
          [
            144.963883,
            -37.797894
          ],
          [
            144.963887,
            -37.797868
          ],
          [
            144.963929,
            -37.797873
          ],
          [
            144.964047,
            -37.797885
          ],
          [
            144.96404,
            -37.797926
          ],
          [
            144.964231,
            -37.797945
          ],
          [
            144.964158,
            -37.798391
          ],
          [
            144.964085,
            -37.798383
          ],
          [
            144.964092,
            -37.79834
          ],
          [
            144.963758,
            -37.798306
          ],
          [
            144.96375,
            -37.798355
          ],
          [
            144.963759,
            -37.798356
          ],
          [
            144.963753,
            -37.798392
          ],
          [
            144.963749,
            -37.79842
          ],
          [
            144.963581,
            -37.798403
          ],
          [
            144.96357,
            -37.798402
          ],
          [
            144.963581,
            -37.798336
          ],
          [
            144.963592,
            -37.798338
          ],
          [
            144.963601,
            -37.798285
          ],
          [
            144.963467,
            -37.798271
          ],
          [
            144.963358,
            -37.79826
          ],
          [
            144.963326,
            -37.798257
          ],
          [
            144.963324,
            -37.798269
          ],
          [
            144.963235,
            -37.79826
          ],
          [
            144.963145,
            -37.798251
          ],
          [
            144.963177,
            -37.798056
          ],
          [
            144.9633,
            -37.798069
          ],
          [
            144.963302,
            -37.798057
          ],
          [
            144.963312,
            -37.797992
          ],
          [
            144.963376,
            -37.797998
          ],
          [
            144.96338,
            -37.79797
          ],
          [
            144.963516,
            -37.797984
          ],
          [
            144.963534,
            -37.797871
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
    "is_ground_floor_accessible": true,
    "has_elevator": null,
    "has_accessible_bathrooms": true,
    "has_accessible_parking": null,
    "hours_mon": "07:30-21:00",
    "hours_tue": "07:30-21:00",
    "hours_wed": "07:30-21:00",
    "hours_thu": "07:30-21:00",
    "hours_fri": "07:30-18:00",
    "hours_sat": null,
    "hours_sun": null,
    "hours_source": null,
    "hours_verified_on": null,
    "hours_period": null,
    "created_at": "2026-08-15T00:00:00.000Z",
    "updated_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "b0000000-0000-0000-0000-000000000012",
    "campus_id": "a1b2c3d4-0000-0000-0000-000000000001",
    "slug": "alan-gilbert",
    "name": "Alan Gilbert Building",
    "short_name": "Alan Gilbert",
    "estimated_capacity": 400,
    "entrance_lat": -37.80004,
    "entrance_lng": 144.95932,
    "centroid_lat": -37.800257,
    "centroid_lng": 144.959296,
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.958888,
            -37.800207
          ],
          [
            144.958925,
            -37.799999
          ],
          [
            144.959711,
            -37.800088
          ],
          [
            144.9597,
            -37.800152
          ],
          [
            144.959664,
            -37.800148
          ],
          [
            144.959659,
            -37.800179
          ],
          [
            144.959654,
            -37.800208
          ],
          [
            144.959576,
            -37.800199
          ],
          [
            144.959539,
            -37.800406
          ],
          [
            144.959517,
            -37.800404
          ],
          [
            144.959512,
            -37.800432
          ],
          [
            144.959361,
            -37.800415
          ],
          [
            144.95886,
            -37.800359
          ],
          [
            144.958866,
            -37.800331
          ],
          [
            144.958857,
            -37.80033
          ],
          [
            144.95886,
            -37.800314
          ],
          [
            144.958879,
            -37.800206
          ],
          [
            144.958888,
            -37.800207
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
    "hours_mon": "07:00-22:00",
    "hours_tue": "07:00-22:00",
    "hours_wed": "07:00-22:00",
    "hours_thu": "07:00-22:00",
    "hours_fri": "07:00-18:00",
    "hours_sat": "09:00-17:00",
    "hours_sun": null,
    "hours_source": null,
    "hours_verified_on": null,
    "hours_period": null,
    "created_at": "2026-08-15T00:00:00.000Z",
    "updated_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "b0000000-0000-0000-0000-000000000013",
    "campus_id": "a1b2c3d4-0000-0000-0000-000000000001",
    "slug": "student-pavilion",
    "name": "Student Pavilion",
    "short_name": "Student Pav",
    "estimated_capacity": 300,
    "entrance_lat": -37.79851,
    "entrance_lng": 144.96361,
    "centroid_lat": -37.79869,
    "centroid_lng": 144.963493,
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.963453,
            -37.798754
          ],
          [
            144.963458,
            -37.798718
          ],
          [
            144.963469,
            -37.798719
          ],
          [
            144.96349,
            -37.798722
          ],
          [
            144.963513,
            -37.798724
          ],
          [
            144.963529,
            -37.798726
          ],
          [
            144.963528,
            -37.798734
          ],
          [
            144.963535,
            -37.798734
          ],
          [
            144.963533,
            -37.798747
          ],
          [
            144.963533,
            -37.798749
          ],
          [
            144.963536,
            -37.79875
          ],
          [
            144.963578,
            -37.798754
          ],
          [
            144.963577,
            -37.79876
          ],
          [
            144.963651,
            -37.798768
          ],
          [
            144.963656,
            -37.798767
          ],
          [
            144.963659,
            -37.798764
          ],
          [
            144.963661,
            -37.798749
          ],
          [
            144.963677,
            -37.79875
          ],
          [
            144.963675,
            -37.798766
          ],
          [
            144.96376,
            -37.798775
          ],
          [
            144.963763,
            -37.79876
          ],
          [
            144.963785,
            -37.798762
          ],
          [
            144.963822,
            -37.798541
          ],
          [
            144.963695,
            -37.798518
          ],
          [
            144.963571,
            -37.798514
          ],
          [
            144.963568,
            -37.798532
          ],
          [
            144.963551,
            -37.798524
          ],
          [
            144.963528,
            -37.798513
          ],
          [
            144.963401,
            -37.798499
          ],
          [
            144.963392,
            -37.798554
          ],
          [
            144.96339,
            -37.798568
          ],
          [
            144.963377,
            -37.798562
          ],
          [
            144.963327,
            -37.798636
          ],
          [
            144.963314,
            -37.798686
          ],
          [
            144.963262,
            -37.798691
          ],
          [
            144.963266,
            -37.798704
          ],
          [
            144.963269,
            -37.798713
          ],
          [
            144.96327,
            -37.798722
          ],
          [
            144.963267,
            -37.798732
          ],
          [
            144.963265,
            -37.798735
          ],
          [
            144.963262,
            -37.798739
          ],
          [
            144.963258,
            -37.798742
          ],
          [
            144.963254,
            -37.798745
          ],
          [
            144.963387,
            -37.798746
          ],
          [
            144.963453,
            -37.798754
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
    "hours_mon": "07:00-22:00",
    "hours_tue": "07:00-22:00",
    "hours_wed": "07:00-22:00",
    "hours_thu": "07:00-22:00",
    "hours_fri": "07:00-18:00",
    "hours_sat": "09:00-17:00",
    "hours_sun": null,
    "hours_source": null,
    "hours_verified_on": null,
    "hours_period": null,
    "created_at": "2026-08-15T00:00:00.000Z",
    "updated_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "b0000000-0000-0000-0000-000000000014",
    "campus_id": "a1b2c3d4-0000-0000-0000-000000000001",
    "slug": "david-caro",
    "name": "David Caro Building",
    "short_name": "Physics",
    "estimated_capacity": 300,
    "entrance_lat": -37.79665,
    "entrance_lng": 144.96365,
    "centroid_lat": -37.7968,
    "centroid_lng": 144.963942,
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            144.963752,
            -37.796838
          ],
          [
            144.963682,
            -37.79683
          ],
          [
            144.963691,
            -37.796773
          ],
          [
            144.963658,
            -37.796769
          ],
          [
            144.963657,
            -37.796776
          ],
          [
            144.963518,
            -37.796762
          ],
          [
            144.96352,
            -37.796749
          ],
          [
            144.963489,
            -37.796746
          ],
          [
            144.963488,
            -37.796752
          ],
          [
            144.963478,
            -37.796751
          ],
          [
            144.963498,
            -37.796634
          ],
          [
            144.963543,
            -37.796638
          ],
          [
            144.963542,
            -37.796646
          ],
          [
            144.963575,
            -37.796649
          ],
          [
            144.963577,
            -37.796642
          ],
          [
            144.963794,
            -37.796665
          ],
          [
            144.963793,
            -37.796673
          ],
          [
            144.963826,
            -37.796676
          ],
          [
            144.963827,
            -37.796669
          ],
          [
            144.963865,
            -37.796673
          ],
          [
            144.963859,
            -37.796707
          ],
          [
            144.963855,
            -37.796731
          ],
          [
            144.963854,
            -37.796739
          ],
          [
            144.963856,
            -37.796739
          ],
          [
            144.963855,
            -37.796746
          ],
          [
            144.963888,
            -37.796749
          ],
          [
            144.963889,
            -37.79674
          ],
          [
            144.964,
            -37.796752
          ],
          [
            144.963998,
            -37.796761
          ],
          [
            144.964031,
            -37.796764
          ],
          [
            144.964032,
            -37.796758
          ],
          [
            144.964038,
            -37.796758
          ],
          [
            144.964039,
            -37.796752
          ],
          [
            144.964134,
            -37.796762
          ],
          [
            144.964326,
            -37.796782
          ],
          [
            144.964325,
            -37.796791
          ],
          [
            144.96435,
            -37.796793
          ],
          [
            144.964355,
            -37.796794
          ],
          [
            144.964364,
            -37.796795
          ],
          [
            144.964361,
            -37.796817
          ],
          [
            144.964402,
            -37.796821
          ],
          [
            144.964394,
            -37.796868
          ],
          [
            144.964417,
            -37.796871
          ],
          [
            144.964412,
            -37.796901
          ],
          [
            144.964388,
            -37.796898
          ],
          [
            144.964381,
            -37.79694
          ],
          [
            144.96434,
            -37.796936
          ],
          [
            144.964336,
            -37.796962
          ],
          [
            144.964334,
            -37.796971
          ],
          [
            144.96433,
            -37.796995
          ],
          [
            144.964321,
            -37.797053
          ],
          [
            144.963775,
            -37.796996
          ],
          [
            144.963771,
            -37.797017
          ],
          [
            144.963723,
            -37.797012
          ],
          [
            144.963729,
            -37.796973
          ],
          [
            144.963737,
            -37.796931
          ],
          [
            144.963741,
            -37.796905
          ],
          [
            144.963752,
            -37.796838
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
    "has_elevator": true,
    "has_accessible_bathrooms": true,
    "has_accessible_parking": null,
    "hours_mon": "07:30-21:00",
    "hours_tue": "07:30-21:00",
    "hours_wed": "07:30-21:00",
    "hours_thu": "07:30-21:00",
    "hours_fri": "07:30-18:00",
    "hours_sat": null,
    "hours_sun": null,
    "hours_source": null,
    "hours_verified_on": null,
    "hours_period": null,
    "created_at": "2026-08-15T00:00:00.000Z",
    "updated_at": "2026-08-15T00:00:00.000Z"
  }
]

export const SEED_ZONES: BuildingZone[] = [
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
            144.959158,
            -37.797965
          ],
          [
            144.959598,
            -37.797996
          ],
          [
            144.959572,
            -37.798227
          ],
          [
            144.959559,
            -37.798337
          ],
          [
            144.959513,
            -37.798755
          ],
          [
            144.959434,
            -37.79875
          ],
          [
            144.959431,
            -37.79877
          ],
          [
            144.959422,
            -37.79877
          ],
          [
            144.959388,
            -37.798767
          ],
          [
            144.959261,
            -37.798759
          ],
          [
            144.959264,
            -37.798734
          ],
          [
            144.959097,
            -37.798722
          ],
          [
            144.959153,
            -37.798221
          ],
          [
            144.959129,
            -37.79822
          ],
          [
            144.959158,
            -37.797965
          ]
        ]
      ]
    },
    "capacity": 250,
    "floor_level": 0,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true,
    "created_at": "2026-08-15T00:00:00.000Z"
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
            144.959158,
            -37.797965
          ],
          [
            144.959598,
            -37.797996
          ],
          [
            144.959572,
            -37.798227
          ],
          [
            144.959559,
            -37.798337
          ],
          [
            144.959513,
            -37.798755
          ],
          [
            144.959434,
            -37.79875
          ],
          [
            144.959431,
            -37.79877
          ],
          [
            144.959422,
            -37.79877
          ],
          [
            144.959388,
            -37.798767
          ],
          [
            144.959261,
            -37.798759
          ],
          [
            144.959264,
            -37.798734
          ],
          [
            144.959097,
            -37.798722
          ],
          [
            144.959153,
            -37.798221
          ],
          [
            144.959129,
            -37.79822
          ],
          [
            144.959158,
            -37.797965
          ]
        ]
      ]
    },
    "capacity": 300,
    "floor_level": 1,
    "is_quiet_zone": true,
    "has_power": true,
    "is_accessible": true,
    "created_at": "2026-08-15T00:00:00.000Z"
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
            144.959158,
            -37.797965
          ],
          [
            144.959598,
            -37.797996
          ],
          [
            144.959572,
            -37.798227
          ],
          [
            144.959559,
            -37.798337
          ],
          [
            144.959513,
            -37.798755
          ],
          [
            144.959434,
            -37.79875
          ],
          [
            144.959431,
            -37.79877
          ],
          [
            144.959422,
            -37.79877
          ],
          [
            144.959388,
            -37.798767
          ],
          [
            144.959261,
            -37.798759
          ],
          [
            144.959264,
            -37.798734
          ],
          [
            144.959097,
            -37.798722
          ],
          [
            144.959153,
            -37.798221
          ],
          [
            144.959129,
            -37.79822
          ],
          [
            144.959158,
            -37.797965
          ]
        ]
      ]
    },
    "capacity": 250,
    "floor_level": 2,
    "is_quiet_zone": true,
    "has_power": true,
    "is_accessible": true,
    "created_at": "2026-08-15T00:00:00.000Z"
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
            144.962581,
            -37.799211
          ],
          [
            144.962765,
            -37.79923
          ],
          [
            144.962858,
            -37.79924
          ],
          [
            144.96292,
            -37.799247
          ],
          [
            144.963102,
            -37.799266
          ],
          [
            144.963096,
            -37.799302
          ],
          [
            144.963092,
            -37.799328
          ],
          [
            144.963074,
            -37.799431
          ],
          [
            144.963059,
            -37.79943
          ],
          [
            144.963053,
            -37.799467
          ],
          [
            144.962719,
            -37.799432
          ],
          [
            144.96262,
            -37.799421
          ],
          [
            144.962563,
            -37.799415
          ],
          [
            144.962569,
            -37.799377
          ],
          [
            144.962553,
            -37.799375
          ],
          [
            144.962581,
            -37.799211
          ]
        ]
      ]
    },
    "capacity": 150,
    "floor_level": 0,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true,
    "created_at": "2026-08-15T00:00:00.000Z"
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
            144.962581,
            -37.799211
          ],
          [
            144.962765,
            -37.79923
          ],
          [
            144.962858,
            -37.79924
          ],
          [
            144.96292,
            -37.799247
          ],
          [
            144.963102,
            -37.799266
          ],
          [
            144.963096,
            -37.799302
          ],
          [
            144.963092,
            -37.799328
          ],
          [
            144.963074,
            -37.799431
          ],
          [
            144.963059,
            -37.79943
          ],
          [
            144.963053,
            -37.799467
          ],
          [
            144.962719,
            -37.799432
          ],
          [
            144.96262,
            -37.799421
          ],
          [
            144.962563,
            -37.799415
          ],
          [
            144.962569,
            -37.799377
          ],
          [
            144.962553,
            -37.799375
          ],
          [
            144.962581,
            -37.799211
          ]
        ]
      ]
    },
    "capacity": 150,
    "floor_level": 1,
    "is_quiet_zone": true,
    "has_power": true,
    "is_accessible": true,
    "created_at": "2026-08-15T00:00:00.000Z"
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
            144.959152,
            -37.797705
          ],
          [
            144.959112,
            -37.797668
          ],
          [
            144.959128,
            -37.797527
          ],
          [
            144.959132,
            -37.797513
          ],
          [
            144.959157,
            -37.797499
          ],
          [
            144.95918,
            -37.797479
          ],
          [
            144.959206,
            -37.797464
          ],
          [
            144.959228,
            -37.797454
          ],
          [
            144.959252,
            -37.797451
          ],
          [
            144.959284,
            -37.797451
          ],
          [
            144.959295,
            -37.797451
          ],
          [
            144.959332,
            -37.79746
          ],
          [
            144.959357,
            -37.797473
          ],
          [
            144.95938,
            -37.797492
          ],
          [
            144.959397,
            -37.797515
          ],
          [
            144.959612,
            -37.797533
          ],
          [
            144.959625,
            -37.797528
          ],
          [
            144.959639,
            -37.797523
          ],
          [
            144.959654,
            -37.797518
          ],
          [
            144.959671,
            -37.797523
          ],
          [
            144.959685,
            -37.797533
          ],
          [
            144.959692,
            -37.797544
          ],
          [
            144.95967,
            -37.797759
          ],
          [
            144.959657,
            -37.797773
          ],
          [
            144.959635,
            -37.797786
          ],
          [
            144.959622,
            -37.797793
          ],
          [
            144.959621,
            -37.797801
          ],
          [
            144.959608,
            -37.797916
          ],
          [
            144.959598,
            -37.797996
          ],
          [
            144.959158,
            -37.797965
          ],
          [
            144.959123,
            -37.797962
          ],
          [
            144.959132,
            -37.797884
          ],
          [
            144.959152,
            -37.797705
          ]
        ]
      ]
    },
    "capacity": 150,
    "floor_level": 0,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true,
    "created_at": "2026-08-15T00:00:00.000Z"
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
            144.959152,
            -37.797705
          ],
          [
            144.959112,
            -37.797668
          ],
          [
            144.959128,
            -37.797527
          ],
          [
            144.959132,
            -37.797513
          ],
          [
            144.959157,
            -37.797499
          ],
          [
            144.95918,
            -37.797479
          ],
          [
            144.959206,
            -37.797464
          ],
          [
            144.959228,
            -37.797454
          ],
          [
            144.959252,
            -37.797451
          ],
          [
            144.959284,
            -37.797451
          ],
          [
            144.959295,
            -37.797451
          ],
          [
            144.959332,
            -37.79746
          ],
          [
            144.959357,
            -37.797473
          ],
          [
            144.95938,
            -37.797492
          ],
          [
            144.959397,
            -37.797515
          ],
          [
            144.959612,
            -37.797533
          ],
          [
            144.959625,
            -37.797528
          ],
          [
            144.959639,
            -37.797523
          ],
          [
            144.959654,
            -37.797518
          ],
          [
            144.959671,
            -37.797523
          ],
          [
            144.959685,
            -37.797533
          ],
          [
            144.959692,
            -37.797544
          ],
          [
            144.95967,
            -37.797759
          ],
          [
            144.959657,
            -37.797773
          ],
          [
            144.959635,
            -37.797786
          ],
          [
            144.959622,
            -37.797793
          ],
          [
            144.959621,
            -37.797801
          ],
          [
            144.959608,
            -37.797916
          ],
          [
            144.959598,
            -37.797996
          ],
          [
            144.959158,
            -37.797965
          ],
          [
            144.959123,
            -37.797962
          ],
          [
            144.959132,
            -37.797884
          ],
          [
            144.959152,
            -37.797705
          ]
        ]
      ]
    },
    "capacity": 130,
    "floor_level": 1,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true,
    "created_at": "2026-08-15T00:00:00.000Z"
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
            144.959152,
            -37.797705
          ],
          [
            144.959112,
            -37.797668
          ],
          [
            144.959128,
            -37.797527
          ],
          [
            144.959132,
            -37.797513
          ],
          [
            144.959157,
            -37.797499
          ],
          [
            144.95918,
            -37.797479
          ],
          [
            144.959206,
            -37.797464
          ],
          [
            144.959228,
            -37.797454
          ],
          [
            144.959252,
            -37.797451
          ],
          [
            144.959284,
            -37.797451
          ],
          [
            144.959295,
            -37.797451
          ],
          [
            144.959332,
            -37.79746
          ],
          [
            144.959357,
            -37.797473
          ],
          [
            144.95938,
            -37.797492
          ],
          [
            144.959397,
            -37.797515
          ],
          [
            144.959612,
            -37.797533
          ],
          [
            144.959625,
            -37.797528
          ],
          [
            144.959639,
            -37.797523
          ],
          [
            144.959654,
            -37.797518
          ],
          [
            144.959671,
            -37.797523
          ],
          [
            144.959685,
            -37.797533
          ],
          [
            144.959692,
            -37.797544
          ],
          [
            144.95967,
            -37.797759
          ],
          [
            144.959657,
            -37.797773
          ],
          [
            144.959635,
            -37.797786
          ],
          [
            144.959622,
            -37.797793
          ],
          [
            144.959621,
            -37.797801
          ],
          [
            144.959608,
            -37.797916
          ],
          [
            144.959598,
            -37.797996
          ],
          [
            144.959158,
            -37.797965
          ],
          [
            144.959123,
            -37.797962
          ],
          [
            144.959132,
            -37.797884
          ],
          [
            144.959152,
            -37.797705
          ]
        ]
      ]
    },
    "capacity": 120,
    "floor_level": 2,
    "is_quiet_zone": false,
    "has_power": false,
    "is_accessible": true,
    "created_at": "2026-08-15T00:00:00.000Z"
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
            -37.799
          ],
          [
            144.9641,
            -37.799
          ],
          [
            144.9641,
            -37.7996
          ],
          [
            144.9631,
            -37.7996
          ],
          [
            144.9631,
            -37.799
          ]
        ]
      ]
    },
    "capacity": 120,
    "floor_level": 0,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": false,
    "created_at": "2026-08-15T00:00:00.000Z"
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
            -37.799
          ],
          [
            144.9641,
            -37.799
          ],
          [
            144.9641,
            -37.7996
          ],
          [
            144.9631,
            -37.7996
          ],
          [
            144.9631,
            -37.799
          ]
        ]
      ]
    },
    "capacity": 120,
    "floor_level": 1,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true,
    "created_at": "2026-08-15T00:00:00.000Z"
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
            -37.799
          ],
          [
            144.9641,
            -37.799
          ],
          [
            144.9641,
            -37.7996
          ],
          [
            144.9631,
            -37.7996
          ],
          [
            144.9631,
            -37.799
          ]
        ]
      ]
    },
    "capacity": 110,
    "floor_level": 2,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true,
    "created_at": "2026-08-15T00:00:00.000Z"
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
            144.9624,
            -37.7987
          ],
          [
            144.9632,
            -37.7987
          ],
          [
            144.9632,
            -37.7993
          ],
          [
            144.9624,
            -37.7993
          ],
          [
            144.9624,
            -37.7987
          ]
        ]
      ]
    },
    "capacity": 130,
    "floor_level": 0,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true,
    "created_at": "2026-08-15T00:00:00.000Z"
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
            144.9624,
            -37.7987
          ],
          [
            144.9632,
            -37.7987
          ],
          [
            144.9632,
            -37.7993
          ],
          [
            144.9624,
            -37.7993
          ],
          [
            144.9624,
            -37.7987
          ]
        ]
      ]
    },
    "capacity": 120,
    "floor_level": 1,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true,
    "created_at": "2026-08-15T00:00:00.000Z"
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
            144.96042,
            -37.802596
          ],
          [
            144.960125,
            -37.802564
          ],
          [
            144.960108,
            -37.802562
          ],
          [
            144.960083,
            -37.802569
          ],
          [
            144.959797,
            -37.802652
          ],
          [
            144.95977,
            -37.802594
          ],
          [
            144.959749,
            -37.80255
          ],
          [
            144.959731,
            -37.802511
          ],
          [
            144.959704,
            -37.80246
          ],
          [
            144.959687,
            -37.802407
          ],
          [
            144.959677,
            -37.802349
          ],
          [
            144.959678,
            -37.80229
          ],
          [
            144.959701,
            -37.802158
          ],
          [
            144.959798,
            -37.802169
          ],
          [
            144.959895,
            -37.802179
          ],
          [
            144.959891,
            -37.802203
          ],
          [
            144.960233,
            -37.80224
          ],
          [
            144.960275,
            -37.802245
          ],
          [
            144.96028,
            -37.802221
          ],
          [
            144.960375,
            -37.802231
          ],
          [
            144.960471,
            -37.802242
          ],
          [
            144.960458,
            -37.802315
          ],
          [
            144.960468,
            -37.802316
          ],
          [
            144.96042,
            -37.802596
          ]
        ]
      ]
    },
    "capacity": 130,
    "floor_level": 0,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true,
    "created_at": "2026-08-15T00:00:00.000Z"
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
            144.96042,
            -37.802596
          ],
          [
            144.960125,
            -37.802564
          ],
          [
            144.960108,
            -37.802562
          ],
          [
            144.960083,
            -37.802569
          ],
          [
            144.959797,
            -37.802652
          ],
          [
            144.95977,
            -37.802594
          ],
          [
            144.959749,
            -37.80255
          ],
          [
            144.959731,
            -37.802511
          ],
          [
            144.959704,
            -37.80246
          ],
          [
            144.959687,
            -37.802407
          ],
          [
            144.959677,
            -37.802349
          ],
          [
            144.959678,
            -37.80229
          ],
          [
            144.959701,
            -37.802158
          ],
          [
            144.959798,
            -37.802169
          ],
          [
            144.959895,
            -37.802179
          ],
          [
            144.959891,
            -37.802203
          ],
          [
            144.960233,
            -37.80224
          ],
          [
            144.960275,
            -37.802245
          ],
          [
            144.96028,
            -37.802221
          ],
          [
            144.960375,
            -37.802231
          ],
          [
            144.960471,
            -37.802242
          ],
          [
            144.960458,
            -37.802315
          ],
          [
            144.960468,
            -37.802316
          ],
          [
            144.96042,
            -37.802596
          ]
        ]
      ]
    },
    "capacity": 140,
    "floor_level": 1,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true,
    "created_at": "2026-08-15T00:00:00.000Z"
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
            144.96042,
            -37.802596
          ],
          [
            144.960125,
            -37.802564
          ],
          [
            144.960108,
            -37.802562
          ],
          [
            144.960083,
            -37.802569
          ],
          [
            144.959797,
            -37.802652
          ],
          [
            144.95977,
            -37.802594
          ],
          [
            144.959749,
            -37.80255
          ],
          [
            144.959731,
            -37.802511
          ],
          [
            144.959704,
            -37.80246
          ],
          [
            144.959687,
            -37.802407
          ],
          [
            144.959677,
            -37.802349
          ],
          [
            144.959678,
            -37.80229
          ],
          [
            144.959701,
            -37.802158
          ],
          [
            144.959798,
            -37.802169
          ],
          [
            144.959895,
            -37.802179
          ],
          [
            144.959891,
            -37.802203
          ],
          [
            144.960233,
            -37.80224
          ],
          [
            144.960275,
            -37.802245
          ],
          [
            144.96028,
            -37.802221
          ],
          [
            144.960375,
            -37.802231
          ],
          [
            144.960471,
            -37.802242
          ],
          [
            144.960458,
            -37.802315
          ],
          [
            144.960468,
            -37.802316
          ],
          [
            144.96042,
            -37.802596
          ]
        ]
      ]
    },
    "capacity": 130,
    "floor_level": 2,
    "is_quiet_zone": true,
    "has_power": true,
    "is_accessible": true,
    "created_at": "2026-08-15T00:00:00.000Z"
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
            144.959433,
            -37.801425
          ],
          [
            144.95943,
            -37.801442
          ],
          [
            144.959367,
            -37.801435
          ],
          [
            144.959296,
            -37.801829
          ],
          [
            144.959158,
            -37.801814
          ],
          [
            144.959108,
            -37.801808
          ],
          [
            144.95911,
            -37.801798
          ],
          [
            144.959036,
            -37.80179
          ],
          [
            144.959108,
            -37.801389
          ],
          [
            144.95912,
            -37.801323
          ],
          [
            144.959196,
            -37.800899
          ],
          [
            144.959328,
            -37.800914
          ],
          [
            144.959521,
            -37.800936
          ],
          [
            144.959531,
            -37.800937
          ],
          [
            144.959456,
            -37.801358
          ],
          [
            144.959443,
            -37.801426
          ],
          [
            144.959433,
            -37.801425
          ]
        ]
      ]
    },
    "capacity": 120,
    "floor_level": 0,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true,
    "created_at": "2026-08-15T00:00:00.000Z"
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
            144.959433,
            -37.801425
          ],
          [
            144.95943,
            -37.801442
          ],
          [
            144.959367,
            -37.801435
          ],
          [
            144.959296,
            -37.801829
          ],
          [
            144.959158,
            -37.801814
          ],
          [
            144.959108,
            -37.801808
          ],
          [
            144.95911,
            -37.801798
          ],
          [
            144.959036,
            -37.80179
          ],
          [
            144.959108,
            -37.801389
          ],
          [
            144.95912,
            -37.801323
          ],
          [
            144.959196,
            -37.800899
          ],
          [
            144.959328,
            -37.800914
          ],
          [
            144.959521,
            -37.800936
          ],
          [
            144.959531,
            -37.800937
          ],
          [
            144.959456,
            -37.801358
          ],
          [
            144.959443,
            -37.801426
          ],
          [
            144.959433,
            -37.801425
          ]
        ]
      ]
    },
    "capacity": 120,
    "floor_level": 1,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true,
    "created_at": "2026-08-15T00:00:00.000Z"
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
            144.959433,
            -37.801425
          ],
          [
            144.95943,
            -37.801442
          ],
          [
            144.959367,
            -37.801435
          ],
          [
            144.959296,
            -37.801829
          ],
          [
            144.959158,
            -37.801814
          ],
          [
            144.959108,
            -37.801808
          ],
          [
            144.95911,
            -37.801798
          ],
          [
            144.959036,
            -37.80179
          ],
          [
            144.959108,
            -37.801389
          ],
          [
            144.95912,
            -37.801323
          ],
          [
            144.959196,
            -37.800899
          ],
          [
            144.959328,
            -37.800914
          ],
          [
            144.959521,
            -37.800936
          ],
          [
            144.959531,
            -37.800937
          ],
          [
            144.959456,
            -37.801358
          ],
          [
            144.959443,
            -37.801426
          ],
          [
            144.959433,
            -37.801425
          ]
        ]
      ]
    },
    "capacity": 110,
    "floor_level": 2,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true,
    "created_at": "2026-08-15T00:00:00.000Z"
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
            144.95912,
            -37.801323
          ],
          [
            144.959108,
            -37.801389
          ],
          [
            144.959094,
            -37.801387
          ],
          [
            144.959097,
            -37.801373
          ],
          [
            144.959053,
            -37.801369
          ],
          [
            144.959048,
            -37.801396
          ],
          [
            144.959033,
            -37.801394
          ],
          [
            144.959028,
            -37.801418
          ],
          [
            144.958954,
            -37.801831
          ],
          [
            144.958612,
            -37.801793
          ],
          [
            144.958618,
            -37.801759
          ],
          [
            144.958692,
            -37.801347
          ],
          [
            144.958703,
            -37.801282
          ],
          [
            144.959046,
            -37.80132
          ],
          [
            144.959045,
            -37.801326
          ],
          [
            144.95906,
            -37.801328
          ],
          [
            144.959059,
            -37.801332
          ],
          [
            144.959103,
            -37.801337
          ],
          [
            144.959106,
            -37.801322
          ],
          [
            144.95912,
            -37.801323
          ]
        ]
      ]
    },
    "capacity": 80,
    "floor_level": 0,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true,
    "created_at": "2026-08-15T00:00:00.000Z"
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
            144.95912,
            -37.801323
          ],
          [
            144.959108,
            -37.801389
          ],
          [
            144.959094,
            -37.801387
          ],
          [
            144.959097,
            -37.801373
          ],
          [
            144.959053,
            -37.801369
          ],
          [
            144.959048,
            -37.801396
          ],
          [
            144.959033,
            -37.801394
          ],
          [
            144.959028,
            -37.801418
          ],
          [
            144.958954,
            -37.801831
          ],
          [
            144.958612,
            -37.801793
          ],
          [
            144.958618,
            -37.801759
          ],
          [
            144.958692,
            -37.801347
          ],
          [
            144.958703,
            -37.801282
          ],
          [
            144.959046,
            -37.80132
          ],
          [
            144.959045,
            -37.801326
          ],
          [
            144.95906,
            -37.801328
          ],
          [
            144.959059,
            -37.801332
          ],
          [
            144.959103,
            -37.801337
          ],
          [
            144.959106,
            -37.801322
          ],
          [
            144.95912,
            -37.801323
          ]
        ]
      ]
    },
    "capacity": 70,
    "floor_level": 1,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true,
    "created_at": "2026-08-15T00:00:00.000Z"
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
            144.963082,
            -37.797237
          ],
          [
            144.963068,
            -37.797319
          ],
          [
            144.963057,
            -37.797375
          ],
          [
            144.963081,
            -37.797382
          ],
          [
            144.963075,
            -37.797438
          ],
          [
            144.963115,
            -37.797516
          ],
          [
            144.963102,
            -37.797515
          ],
          [
            144.962728,
            -37.797476
          ],
          [
            144.96241,
            -37.797441
          ],
          [
            144.9623,
            -37.797429
          ],
          [
            144.962319,
            -37.797318
          ],
          [
            144.962331,
            -37.79732
          ],
          [
            144.962362,
            -37.797143
          ],
          [
            144.962343,
            -37.797142
          ],
          [
            144.962361,
            -37.797036
          ],
          [
            144.962368,
            -37.796998
          ],
          [
            144.962379,
            -37.796999
          ],
          [
            144.962402,
            -37.796857
          ],
          [
            144.96251,
            -37.796867
          ],
          [
            144.962517,
            -37.796992
          ],
          [
            144.962519,
            -37.797015
          ],
          [
            144.962513,
            -37.797051
          ],
          [
            144.962529,
            -37.797053
          ],
          [
            144.962543,
            -37.79698
          ],
          [
            144.962769,
            -37.797004
          ],
          [
            144.962764,
            -37.797036
          ],
          [
            144.962869,
            -37.797048
          ],
          [
            144.962874,
            -37.797019
          ],
          [
            144.962949,
            -37.797061
          ],
          [
            144.962968,
            -37.79695
          ],
          [
            144.96313,
            -37.796968
          ],
          [
            144.963109,
            -37.797084
          ],
          [
            144.963256,
            -37.797087
          ],
          [
            144.963255,
            -37.797139
          ],
          [
            144.96327,
            -37.797158
          ],
          [
            144.963082,
            -37.797237
          ]
        ]
      ]
    },
    "capacity": 100,
    "floor_level": 0,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true,
    "created_at": "2026-08-15T00:00:00.000Z"
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
            144.963082,
            -37.797237
          ],
          [
            144.963068,
            -37.797319
          ],
          [
            144.963057,
            -37.797375
          ],
          [
            144.963081,
            -37.797382
          ],
          [
            144.963075,
            -37.797438
          ],
          [
            144.963115,
            -37.797516
          ],
          [
            144.963102,
            -37.797515
          ],
          [
            144.962728,
            -37.797476
          ],
          [
            144.96241,
            -37.797441
          ],
          [
            144.9623,
            -37.797429
          ],
          [
            144.962319,
            -37.797318
          ],
          [
            144.962331,
            -37.79732
          ],
          [
            144.962362,
            -37.797143
          ],
          [
            144.962343,
            -37.797142
          ],
          [
            144.962361,
            -37.797036
          ],
          [
            144.962368,
            -37.796998
          ],
          [
            144.962379,
            -37.796999
          ],
          [
            144.962402,
            -37.796857
          ],
          [
            144.96251,
            -37.796867
          ],
          [
            144.962517,
            -37.796992
          ],
          [
            144.962519,
            -37.797015
          ],
          [
            144.962513,
            -37.797051
          ],
          [
            144.962529,
            -37.797053
          ],
          [
            144.962543,
            -37.79698
          ],
          [
            144.962769,
            -37.797004
          ],
          [
            144.962764,
            -37.797036
          ],
          [
            144.962869,
            -37.797048
          ],
          [
            144.962874,
            -37.797019
          ],
          [
            144.962949,
            -37.797061
          ],
          [
            144.962968,
            -37.79695
          ],
          [
            144.96313,
            -37.796968
          ],
          [
            144.963109,
            -37.797084
          ],
          [
            144.963256,
            -37.797087
          ],
          [
            144.963255,
            -37.797139
          ],
          [
            144.96327,
            -37.797158
          ],
          [
            144.963082,
            -37.797237
          ]
        ]
      ]
    },
    "capacity": 100,
    "floor_level": 1,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true,
    "created_at": "2026-08-15T00:00:00.000Z"
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
            144.963082,
            -37.797237
          ],
          [
            144.963068,
            -37.797319
          ],
          [
            144.963057,
            -37.797375
          ],
          [
            144.963081,
            -37.797382
          ],
          [
            144.963075,
            -37.797438
          ],
          [
            144.963115,
            -37.797516
          ],
          [
            144.963102,
            -37.797515
          ],
          [
            144.962728,
            -37.797476
          ],
          [
            144.96241,
            -37.797441
          ],
          [
            144.9623,
            -37.797429
          ],
          [
            144.962319,
            -37.797318
          ],
          [
            144.962331,
            -37.79732
          ],
          [
            144.962362,
            -37.797143
          ],
          [
            144.962343,
            -37.797142
          ],
          [
            144.962361,
            -37.797036
          ],
          [
            144.962368,
            -37.796998
          ],
          [
            144.962379,
            -37.796999
          ],
          [
            144.962402,
            -37.796857
          ],
          [
            144.96251,
            -37.796867
          ],
          [
            144.962517,
            -37.796992
          ],
          [
            144.962519,
            -37.797015
          ],
          [
            144.962513,
            -37.797051
          ],
          [
            144.962529,
            -37.797053
          ],
          [
            144.962543,
            -37.79698
          ],
          [
            144.962769,
            -37.797004
          ],
          [
            144.962764,
            -37.797036
          ],
          [
            144.962869,
            -37.797048
          ],
          [
            144.962874,
            -37.797019
          ],
          [
            144.962949,
            -37.797061
          ],
          [
            144.962968,
            -37.79695
          ],
          [
            144.96313,
            -37.796968
          ],
          [
            144.963109,
            -37.797084
          ],
          [
            144.963256,
            -37.797087
          ],
          [
            144.963255,
            -37.797139
          ],
          [
            144.96327,
            -37.797158
          ],
          [
            144.963082,
            -37.797237
          ]
        ]
      ]
    },
    "capacity": 100,
    "floor_level": 2,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true,
    "created_at": "2026-08-15T00:00:00.000Z"
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
            144.9605021,
            -37.8041215
          ],
          [
            144.960558,
            -37.8037969
          ],
          [
            144.9611306,
            -37.8038584
          ],
          [
            144.9610747,
            -37.804183
          ],
          [
            144.9605021,
            -37.8041215
          ]
        ]
      ]
    },
    "capacity": 80,
    "floor_level": 0,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true,
    "created_at": "2026-08-15T00:00:00.000Z"
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
            144.9605021,
            -37.8041215
          ],
          [
            144.960558,
            -37.8037969
          ],
          [
            144.9611306,
            -37.8038584
          ],
          [
            144.9610747,
            -37.804183
          ],
          [
            144.9605021,
            -37.8041215
          ]
        ]
      ]
    },
    "capacity": 90,
    "floor_level": 1,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true,
    "created_at": "2026-08-15T00:00:00.000Z"
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
            144.9605021,
            -37.8041215
          ],
          [
            144.960558,
            -37.8037969
          ],
          [
            144.9611306,
            -37.8038584
          ],
          [
            144.9610747,
            -37.804183
          ],
          [
            144.9605021,
            -37.8041215
          ]
        ]
      ]
    },
    "capacity": 80,
    "floor_level": 2,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true,
    "created_at": "2026-08-15T00:00:00.000Z"
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
            144.960413,
            -37.797518
          ],
          [
            144.960354,
            -37.797513
          ],
          [
            144.960322,
            -37.797507
          ],
          [
            144.960333,
            -37.797448
          ],
          [
            144.9599,
            -37.7974
          ],
          [
            144.959885,
            -37.797487
          ],
          [
            144.959904,
            -37.797489
          ],
          [
            144.959893,
            -37.797554
          ],
          [
            144.959873,
            -37.797552
          ],
          [
            144.95987,
            -37.797571
          ],
          [
            144.959868,
            -37.797582
          ],
          [
            144.959887,
            -37.797584
          ],
          [
            144.959873,
            -37.797659
          ],
          [
            144.959851,
            -37.797657
          ],
          [
            144.959831,
            -37.797773
          ],
          [
            144.959852,
            -37.797775
          ],
          [
            144.959838,
            -37.79785
          ],
          [
            144.959865,
            -37.797853
          ],
          [
            144.959856,
            -37.797903
          ],
          [
            144.959829,
            -37.7979
          ],
          [
            144.959811,
            -37.797998
          ],
          [
            144.959827,
            -37.798
          ],
          [
            144.959898,
            -37.798007
          ],
          [
            144.95988,
            -37.798107
          ],
          [
            144.960089,
            -37.79813
          ],
          [
            144.960297,
            -37.798154
          ],
          [
            144.960325,
            -37.797998
          ],
          [
            144.960339,
            -37.797919
          ],
          [
            144.960354,
            -37.797835
          ],
          [
            144.960394,
            -37.797839
          ],
          [
            144.960419,
            -37.797703
          ],
          [
            144.960381,
            -37.797699
          ],
          [
            144.960392,
            -37.797637
          ],
          [
            144.960409,
            -37.797639
          ],
          [
            144.960412,
            -37.797622
          ],
          [
            144.960416,
            -37.797599
          ],
          [
            144.960399,
            -37.797597
          ],
          [
            144.960413,
            -37.797518
          ]
        ]
      ]
    },
    "capacity": 150,
    "floor_level": 0,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true,
    "created_at": "2026-08-15T00:00:00.000Z"
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
            144.960413,
            -37.797518
          ],
          [
            144.960354,
            -37.797513
          ],
          [
            144.960322,
            -37.797507
          ],
          [
            144.960333,
            -37.797448
          ],
          [
            144.9599,
            -37.7974
          ],
          [
            144.959885,
            -37.797487
          ],
          [
            144.959904,
            -37.797489
          ],
          [
            144.959893,
            -37.797554
          ],
          [
            144.959873,
            -37.797552
          ],
          [
            144.95987,
            -37.797571
          ],
          [
            144.959868,
            -37.797582
          ],
          [
            144.959887,
            -37.797584
          ],
          [
            144.959873,
            -37.797659
          ],
          [
            144.959851,
            -37.797657
          ],
          [
            144.959831,
            -37.797773
          ],
          [
            144.959852,
            -37.797775
          ],
          [
            144.959838,
            -37.79785
          ],
          [
            144.959865,
            -37.797853
          ],
          [
            144.959856,
            -37.797903
          ],
          [
            144.959829,
            -37.7979
          ],
          [
            144.959811,
            -37.797998
          ],
          [
            144.959827,
            -37.798
          ],
          [
            144.959898,
            -37.798007
          ],
          [
            144.95988,
            -37.798107
          ],
          [
            144.960089,
            -37.79813
          ],
          [
            144.960297,
            -37.798154
          ],
          [
            144.960325,
            -37.797998
          ],
          [
            144.960339,
            -37.797919
          ],
          [
            144.960354,
            -37.797835
          ],
          [
            144.960394,
            -37.797839
          ],
          [
            144.960419,
            -37.797703
          ],
          [
            144.960381,
            -37.797699
          ],
          [
            144.960392,
            -37.797637
          ],
          [
            144.960409,
            -37.797639
          ],
          [
            144.960412,
            -37.797622
          ],
          [
            144.960416,
            -37.797599
          ],
          [
            144.960399,
            -37.797597
          ],
          [
            144.960413,
            -37.797518
          ]
        ]
      ]
    },
    "capacity": 150,
    "floor_level": 1,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true,
    "created_at": "2026-08-15T00:00:00.000Z"
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
            144.962421,
            -37.796765
          ],
          [
            144.962422,
            -37.79684
          ],
          [
            144.962535,
            -37.796852
          ],
          [
            144.962559,
            -37.79678
          ],
          [
            144.962592,
            -37.796783
          ],
          [
            144.962624,
            -37.796787
          ],
          [
            144.962628,
            -37.796863
          ],
          [
            144.96274,
            -37.796875
          ],
          [
            144.962769,
            -37.796803
          ],
          [
            144.962801,
            -37.796806
          ],
          [
            144.962837,
            -37.79681
          ],
          [
            144.962831,
            -37.796886
          ],
          [
            144.962943,
            -37.796898
          ],
          [
            144.962973,
            -37.796825
          ],
          [
            144.963015,
            -37.79683
          ],
          [
            144.96302,
            -37.79683
          ],
          [
            144.963059,
            -37.796835
          ],
          [
            144.963072,
            -37.796836
          ],
          [
            144.963086,
            -37.796752
          ],
          [
            144.963093,
            -37.796713
          ],
          [
            144.962632,
            -37.796663
          ],
          [
            144.962566,
            -37.796656
          ],
          [
            144.962568,
            -37.796642
          ],
          [
            144.962586,
            -37.796644
          ],
          [
            144.962637,
            -37.796573
          ],
          [
            144.962645,
            -37.796519
          ],
          [
            144.962539,
            -37.796491
          ],
          [
            144.962423,
            -37.796494
          ],
          [
            144.96242,
            -37.79655
          ],
          [
            144.962442,
            -37.796629
          ],
          [
            144.962456,
            -37.79663
          ],
          [
            144.962453,
            -37.796643
          ],
          [
            144.962437,
            -37.796641
          ],
          [
            144.962407,
            -37.796638
          ],
          [
            144.962386,
            -37.796761
          ],
          [
            144.962403,
            -37.796762
          ],
          [
            144.962421,
            -37.796765
          ]
        ]
      ]
    },
    "capacity": 120,
    "floor_level": 0,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true,
    "created_at": "2026-08-15T00:00:00.000Z"
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
            144.962421,
            -37.796765
          ],
          [
            144.962422,
            -37.79684
          ],
          [
            144.962535,
            -37.796852
          ],
          [
            144.962559,
            -37.79678
          ],
          [
            144.962592,
            -37.796783
          ],
          [
            144.962624,
            -37.796787
          ],
          [
            144.962628,
            -37.796863
          ],
          [
            144.96274,
            -37.796875
          ],
          [
            144.962769,
            -37.796803
          ],
          [
            144.962801,
            -37.796806
          ],
          [
            144.962837,
            -37.79681
          ],
          [
            144.962831,
            -37.796886
          ],
          [
            144.962943,
            -37.796898
          ],
          [
            144.962973,
            -37.796825
          ],
          [
            144.963015,
            -37.79683
          ],
          [
            144.96302,
            -37.79683
          ],
          [
            144.963059,
            -37.796835
          ],
          [
            144.963072,
            -37.796836
          ],
          [
            144.963086,
            -37.796752
          ],
          [
            144.963093,
            -37.796713
          ],
          [
            144.962632,
            -37.796663
          ],
          [
            144.962566,
            -37.796656
          ],
          [
            144.962568,
            -37.796642
          ],
          [
            144.962586,
            -37.796644
          ],
          [
            144.962637,
            -37.796573
          ],
          [
            144.962645,
            -37.796519
          ],
          [
            144.962539,
            -37.796491
          ],
          [
            144.962423,
            -37.796494
          ],
          [
            144.96242,
            -37.79655
          ],
          [
            144.962442,
            -37.796629
          ],
          [
            144.962456,
            -37.79663
          ],
          [
            144.962453,
            -37.796643
          ],
          [
            144.962437,
            -37.796641
          ],
          [
            144.962407,
            -37.796638
          ],
          [
            144.962386,
            -37.796761
          ],
          [
            144.962403,
            -37.796762
          ],
          [
            144.962421,
            -37.796765
          ]
        ]
      ]
    },
    "capacity": 120,
    "floor_level": 1,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true,
    "created_at": "2026-08-15T00:00:00.000Z"
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
            144.962421,
            -37.796765
          ],
          [
            144.962422,
            -37.79684
          ],
          [
            144.962535,
            -37.796852
          ],
          [
            144.962559,
            -37.79678
          ],
          [
            144.962592,
            -37.796783
          ],
          [
            144.962624,
            -37.796787
          ],
          [
            144.962628,
            -37.796863
          ],
          [
            144.96274,
            -37.796875
          ],
          [
            144.962769,
            -37.796803
          ],
          [
            144.962801,
            -37.796806
          ],
          [
            144.962837,
            -37.79681
          ],
          [
            144.962831,
            -37.796886
          ],
          [
            144.962943,
            -37.796898
          ],
          [
            144.962973,
            -37.796825
          ],
          [
            144.963015,
            -37.79683
          ],
          [
            144.96302,
            -37.79683
          ],
          [
            144.963059,
            -37.796835
          ],
          [
            144.963072,
            -37.796836
          ],
          [
            144.963086,
            -37.796752
          ],
          [
            144.963093,
            -37.796713
          ],
          [
            144.962632,
            -37.796663
          ],
          [
            144.962566,
            -37.796656
          ],
          [
            144.962568,
            -37.796642
          ],
          [
            144.962586,
            -37.796644
          ],
          [
            144.962637,
            -37.796573
          ],
          [
            144.962645,
            -37.796519
          ],
          [
            144.962539,
            -37.796491
          ],
          [
            144.962423,
            -37.796494
          ],
          [
            144.96242,
            -37.79655
          ],
          [
            144.962442,
            -37.796629
          ],
          [
            144.962456,
            -37.79663
          ],
          [
            144.962453,
            -37.796643
          ],
          [
            144.962437,
            -37.796641
          ],
          [
            144.962407,
            -37.796638
          ],
          [
            144.962386,
            -37.796761
          ],
          [
            144.962403,
            -37.796762
          ],
          [
            144.962421,
            -37.796765
          ]
        ]
      ]
    },
    "capacity": 110,
    "floor_level": 2,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true,
    "created_at": "2026-08-15T00:00:00.000Z"
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
            144.960301,
            -37.799127
          ],
          [
            144.960588,
            -37.799159
          ],
          [
            144.960577,
            -37.799225
          ],
          [
            144.960681,
            -37.799237
          ],
          [
            144.960784,
            -37.799248
          ],
          [
            144.960792,
            -37.7992
          ],
          [
            144.960795,
            -37.799184
          ],
          [
            144.961083,
            -37.799216
          ],
          [
            144.961063,
            -37.799331
          ],
          [
            144.961045,
            -37.799431
          ],
          [
            144.960757,
            -37.799399
          ],
          [
            144.960768,
            -37.799335
          ],
          [
            144.960665,
            -37.799323
          ],
          [
            144.960561,
            -37.799312
          ],
          [
            144.96055,
            -37.799374
          ],
          [
            144.960262,
            -37.799341
          ],
          [
            144.96027,
            -37.799298
          ],
          [
            144.960301,
            -37.799127
          ]
        ]
      ]
    },
    "capacity": 130,
    "floor_level": 0,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true,
    "created_at": "2026-08-15T00:00:00.000Z"
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
            144.960301,
            -37.799127
          ],
          [
            144.960588,
            -37.799159
          ],
          [
            144.960577,
            -37.799225
          ],
          [
            144.960681,
            -37.799237
          ],
          [
            144.960784,
            -37.799248
          ],
          [
            144.960792,
            -37.7992
          ],
          [
            144.960795,
            -37.799184
          ],
          [
            144.961083,
            -37.799216
          ],
          [
            144.961063,
            -37.799331
          ],
          [
            144.961045,
            -37.799431
          ],
          [
            144.960757,
            -37.799399
          ],
          [
            144.960768,
            -37.799335
          ],
          [
            144.960665,
            -37.799323
          ],
          [
            144.960561,
            -37.799312
          ],
          [
            144.96055,
            -37.799374
          ],
          [
            144.960262,
            -37.799341
          ],
          [
            144.96027,
            -37.799298
          ],
          [
            144.960301,
            -37.799127
          ]
        ]
      ]
    },
    "capacity": 120,
    "floor_level": 1,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true,
    "created_at": "2026-08-15T00:00:00.000Z"
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
            144.962373,
            -37.798171
          ],
          [
            144.962357,
            -37.798258
          ],
          [
            144.962243,
            -37.798246
          ],
          [
            144.962256,
            -37.798171
          ],
          [
            144.962181,
            -37.798163
          ],
          [
            144.962175,
            -37.798195
          ],
          [
            144.962131,
            -37.79819
          ],
          [
            144.962127,
            -37.798211
          ],
          [
            144.961784,
            -37.798174
          ],
          [
            144.961838,
            -37.797868
          ],
          [
            144.961849,
            -37.797804
          ],
          [
            144.96183,
            -37.797802
          ],
          [
            144.961831,
            -37.797795
          ],
          [
            144.961766,
            -37.797788
          ],
          [
            144.961781,
            -37.797701
          ],
          [
            144.962141,
            -37.79774
          ],
          [
            144.962144,
            -37.797719
          ],
          [
            144.962182,
            -37.797723
          ],
          [
            144.962225,
            -37.797728
          ],
          [
            144.96245,
            -37.797741
          ],
          [
            144.962426,
            -37.797874
          ],
          [
            144.9624,
            -37.798037
          ],
          [
            144.962373,
            -37.798171
          ]
        ]
      ]
    },
    "capacity": 100,
    "floor_level": 0,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true,
    "created_at": "2026-08-15T00:00:00.000Z"
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
            144.962373,
            -37.798171
          ],
          [
            144.962357,
            -37.798258
          ],
          [
            144.962243,
            -37.798246
          ],
          [
            144.962256,
            -37.798171
          ],
          [
            144.962181,
            -37.798163
          ],
          [
            144.962175,
            -37.798195
          ],
          [
            144.962131,
            -37.79819
          ],
          [
            144.962127,
            -37.798211
          ],
          [
            144.961784,
            -37.798174
          ],
          [
            144.961838,
            -37.797868
          ],
          [
            144.961849,
            -37.797804
          ],
          [
            144.96183,
            -37.797802
          ],
          [
            144.961831,
            -37.797795
          ],
          [
            144.961766,
            -37.797788
          ],
          [
            144.961781,
            -37.797701
          ],
          [
            144.962141,
            -37.79774
          ],
          [
            144.962144,
            -37.797719
          ],
          [
            144.962182,
            -37.797723
          ],
          [
            144.962225,
            -37.797728
          ],
          [
            144.96245,
            -37.797741
          ],
          [
            144.962426,
            -37.797874
          ],
          [
            144.9624,
            -37.798037
          ],
          [
            144.962373,
            -37.798171
          ]
        ]
      ]
    },
    "capacity": 100,
    "floor_level": 1,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true,
    "created_at": "2026-08-15T00:00:00.000Z"
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
            144.962373,
            -37.798171
          ],
          [
            144.962357,
            -37.798258
          ],
          [
            144.962243,
            -37.798246
          ],
          [
            144.962256,
            -37.798171
          ],
          [
            144.962181,
            -37.798163
          ],
          [
            144.962175,
            -37.798195
          ],
          [
            144.962131,
            -37.79819
          ],
          [
            144.962127,
            -37.798211
          ],
          [
            144.961784,
            -37.798174
          ],
          [
            144.961838,
            -37.797868
          ],
          [
            144.961849,
            -37.797804
          ],
          [
            144.96183,
            -37.797802
          ],
          [
            144.961831,
            -37.797795
          ],
          [
            144.961766,
            -37.797788
          ],
          [
            144.961781,
            -37.797701
          ],
          [
            144.962141,
            -37.79774
          ],
          [
            144.962144,
            -37.797719
          ],
          [
            144.962182,
            -37.797723
          ],
          [
            144.962225,
            -37.797728
          ],
          [
            144.96245,
            -37.797741
          ],
          [
            144.962426,
            -37.797874
          ],
          [
            144.9624,
            -37.798037
          ],
          [
            144.962373,
            -37.798171
          ]
        ]
      ]
    },
    "capacity": 100,
    "floor_level": 2,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true,
    "created_at": "2026-08-15T00:00:00.000Z"
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
            144.963534,
            -37.797871
          ],
          [
            144.963536,
            -37.797858
          ],
          [
            144.963883,
            -37.797894
          ],
          [
            144.963887,
            -37.797868
          ],
          [
            144.963929,
            -37.797873
          ],
          [
            144.964047,
            -37.797885
          ],
          [
            144.96404,
            -37.797926
          ],
          [
            144.964231,
            -37.797945
          ],
          [
            144.964158,
            -37.798391
          ],
          [
            144.964085,
            -37.798383
          ],
          [
            144.964092,
            -37.79834
          ],
          [
            144.963758,
            -37.798306
          ],
          [
            144.96375,
            -37.798355
          ],
          [
            144.963759,
            -37.798356
          ],
          [
            144.963753,
            -37.798392
          ],
          [
            144.963749,
            -37.79842
          ],
          [
            144.963581,
            -37.798403
          ],
          [
            144.96357,
            -37.798402
          ],
          [
            144.963581,
            -37.798336
          ],
          [
            144.963592,
            -37.798338
          ],
          [
            144.963601,
            -37.798285
          ],
          [
            144.963467,
            -37.798271
          ],
          [
            144.963358,
            -37.79826
          ],
          [
            144.963326,
            -37.798257
          ],
          [
            144.963324,
            -37.798269
          ],
          [
            144.963235,
            -37.79826
          ],
          [
            144.963145,
            -37.798251
          ],
          [
            144.963177,
            -37.798056
          ],
          [
            144.9633,
            -37.798069
          ],
          [
            144.963302,
            -37.798057
          ],
          [
            144.963312,
            -37.797992
          ],
          [
            144.963376,
            -37.797998
          ],
          [
            144.96338,
            -37.79797
          ],
          [
            144.963516,
            -37.797984
          ],
          [
            144.963534,
            -37.797871
          ]
        ]
      ]
    },
    "capacity": 130,
    "floor_level": 0,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true,
    "created_at": "2026-08-15T00:00:00.000Z"
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
            144.963534,
            -37.797871
          ],
          [
            144.963536,
            -37.797858
          ],
          [
            144.963883,
            -37.797894
          ],
          [
            144.963887,
            -37.797868
          ],
          [
            144.963929,
            -37.797873
          ],
          [
            144.964047,
            -37.797885
          ],
          [
            144.96404,
            -37.797926
          ],
          [
            144.964231,
            -37.797945
          ],
          [
            144.964158,
            -37.798391
          ],
          [
            144.964085,
            -37.798383
          ],
          [
            144.964092,
            -37.79834
          ],
          [
            144.963758,
            -37.798306
          ],
          [
            144.96375,
            -37.798355
          ],
          [
            144.963759,
            -37.798356
          ],
          [
            144.963753,
            -37.798392
          ],
          [
            144.963749,
            -37.79842
          ],
          [
            144.963581,
            -37.798403
          ],
          [
            144.96357,
            -37.798402
          ],
          [
            144.963581,
            -37.798336
          ],
          [
            144.963592,
            -37.798338
          ],
          [
            144.963601,
            -37.798285
          ],
          [
            144.963467,
            -37.798271
          ],
          [
            144.963358,
            -37.79826
          ],
          [
            144.963326,
            -37.798257
          ],
          [
            144.963324,
            -37.798269
          ],
          [
            144.963235,
            -37.79826
          ],
          [
            144.963145,
            -37.798251
          ],
          [
            144.963177,
            -37.798056
          ],
          [
            144.9633,
            -37.798069
          ],
          [
            144.963302,
            -37.798057
          ],
          [
            144.963312,
            -37.797992
          ],
          [
            144.963376,
            -37.797998
          ],
          [
            144.96338,
            -37.79797
          ],
          [
            144.963516,
            -37.797984
          ],
          [
            144.963534,
            -37.797871
          ]
        ]
      ]
    },
    "capacity": 120,
    "floor_level": 1,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true,
    "created_at": "2026-08-15T00:00:00.000Z"
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
            144.958888,
            -37.800207
          ],
          [
            144.958925,
            -37.799999
          ],
          [
            144.959711,
            -37.800088
          ],
          [
            144.9597,
            -37.800152
          ],
          [
            144.959664,
            -37.800148
          ],
          [
            144.959659,
            -37.800179
          ],
          [
            144.959654,
            -37.800208
          ],
          [
            144.959576,
            -37.800199
          ],
          [
            144.959539,
            -37.800406
          ],
          [
            144.959517,
            -37.800404
          ],
          [
            144.959512,
            -37.800432
          ],
          [
            144.959361,
            -37.800415
          ],
          [
            144.95886,
            -37.800359
          ],
          [
            144.958866,
            -37.800331
          ],
          [
            144.958857,
            -37.80033
          ],
          [
            144.95886,
            -37.800314
          ],
          [
            144.958879,
            -37.800206
          ],
          [
            144.958888,
            -37.800207
          ]
        ]
      ]
    },
    "capacity": 130,
    "floor_level": 0,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true,
    "created_at": "2026-08-15T00:00:00.000Z"
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
            144.958888,
            -37.800207
          ],
          [
            144.958925,
            -37.799999
          ],
          [
            144.959711,
            -37.800088
          ],
          [
            144.9597,
            -37.800152
          ],
          [
            144.959664,
            -37.800148
          ],
          [
            144.959659,
            -37.800179
          ],
          [
            144.959654,
            -37.800208
          ],
          [
            144.959576,
            -37.800199
          ],
          [
            144.959539,
            -37.800406
          ],
          [
            144.959517,
            -37.800404
          ],
          [
            144.959512,
            -37.800432
          ],
          [
            144.959361,
            -37.800415
          ],
          [
            144.95886,
            -37.800359
          ],
          [
            144.958866,
            -37.800331
          ],
          [
            144.958857,
            -37.80033
          ],
          [
            144.95886,
            -37.800314
          ],
          [
            144.958879,
            -37.800206
          ],
          [
            144.958888,
            -37.800207
          ]
        ]
      ]
    },
    "capacity": 140,
    "floor_level": 1,
    "is_quiet_zone": true,
    "has_power": true,
    "is_accessible": true,
    "created_at": "2026-08-15T00:00:00.000Z"
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
            144.958888,
            -37.800207
          ],
          [
            144.958925,
            -37.799999
          ],
          [
            144.959711,
            -37.800088
          ],
          [
            144.9597,
            -37.800152
          ],
          [
            144.959664,
            -37.800148
          ],
          [
            144.959659,
            -37.800179
          ],
          [
            144.959654,
            -37.800208
          ],
          [
            144.959576,
            -37.800199
          ],
          [
            144.959539,
            -37.800406
          ],
          [
            144.959517,
            -37.800404
          ],
          [
            144.959512,
            -37.800432
          ],
          [
            144.959361,
            -37.800415
          ],
          [
            144.95886,
            -37.800359
          ],
          [
            144.958866,
            -37.800331
          ],
          [
            144.958857,
            -37.80033
          ],
          [
            144.95886,
            -37.800314
          ],
          [
            144.958879,
            -37.800206
          ],
          [
            144.958888,
            -37.800207
          ]
        ]
      ]
    },
    "capacity": 130,
    "floor_level": 2,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true,
    "created_at": "2026-08-15T00:00:00.000Z"
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
            144.963453,
            -37.798754
          ],
          [
            144.963458,
            -37.798718
          ],
          [
            144.963469,
            -37.798719
          ],
          [
            144.96349,
            -37.798722
          ],
          [
            144.963513,
            -37.798724
          ],
          [
            144.963529,
            -37.798726
          ],
          [
            144.963528,
            -37.798734
          ],
          [
            144.963535,
            -37.798734
          ],
          [
            144.963533,
            -37.798747
          ],
          [
            144.963533,
            -37.798749
          ],
          [
            144.963536,
            -37.79875
          ],
          [
            144.963578,
            -37.798754
          ],
          [
            144.963577,
            -37.79876
          ],
          [
            144.963651,
            -37.798768
          ],
          [
            144.963656,
            -37.798767
          ],
          [
            144.963659,
            -37.798764
          ],
          [
            144.963661,
            -37.798749
          ],
          [
            144.963677,
            -37.79875
          ],
          [
            144.963675,
            -37.798766
          ],
          [
            144.96376,
            -37.798775
          ],
          [
            144.963763,
            -37.79876
          ],
          [
            144.963785,
            -37.798762
          ],
          [
            144.963822,
            -37.798541
          ],
          [
            144.963695,
            -37.798518
          ],
          [
            144.963571,
            -37.798514
          ],
          [
            144.963568,
            -37.798532
          ],
          [
            144.963551,
            -37.798524
          ],
          [
            144.963528,
            -37.798513
          ],
          [
            144.963401,
            -37.798499
          ],
          [
            144.963392,
            -37.798554
          ],
          [
            144.96339,
            -37.798568
          ],
          [
            144.963377,
            -37.798562
          ],
          [
            144.963327,
            -37.798636
          ],
          [
            144.963314,
            -37.798686
          ],
          [
            144.963262,
            -37.798691
          ],
          [
            144.963266,
            -37.798704
          ],
          [
            144.963269,
            -37.798713
          ],
          [
            144.96327,
            -37.798722
          ],
          [
            144.963267,
            -37.798732
          ],
          [
            144.963265,
            -37.798735
          ],
          [
            144.963262,
            -37.798739
          ],
          [
            144.963258,
            -37.798742
          ],
          [
            144.963254,
            -37.798745
          ],
          [
            144.963387,
            -37.798746
          ],
          [
            144.963453,
            -37.798754
          ]
        ]
      ]
    },
    "capacity": 160,
    "floor_level": 0,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true,
    "created_at": "2026-08-15T00:00:00.000Z"
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
            144.963453,
            -37.798754
          ],
          [
            144.963458,
            -37.798718
          ],
          [
            144.963469,
            -37.798719
          ],
          [
            144.96349,
            -37.798722
          ],
          [
            144.963513,
            -37.798724
          ],
          [
            144.963529,
            -37.798726
          ],
          [
            144.963528,
            -37.798734
          ],
          [
            144.963535,
            -37.798734
          ],
          [
            144.963533,
            -37.798747
          ],
          [
            144.963533,
            -37.798749
          ],
          [
            144.963536,
            -37.79875
          ],
          [
            144.963578,
            -37.798754
          ],
          [
            144.963577,
            -37.79876
          ],
          [
            144.963651,
            -37.798768
          ],
          [
            144.963656,
            -37.798767
          ],
          [
            144.963659,
            -37.798764
          ],
          [
            144.963661,
            -37.798749
          ],
          [
            144.963677,
            -37.79875
          ],
          [
            144.963675,
            -37.798766
          ],
          [
            144.96376,
            -37.798775
          ],
          [
            144.963763,
            -37.79876
          ],
          [
            144.963785,
            -37.798762
          ],
          [
            144.963822,
            -37.798541
          ],
          [
            144.963695,
            -37.798518
          ],
          [
            144.963571,
            -37.798514
          ],
          [
            144.963568,
            -37.798532
          ],
          [
            144.963551,
            -37.798524
          ],
          [
            144.963528,
            -37.798513
          ],
          [
            144.963401,
            -37.798499
          ],
          [
            144.963392,
            -37.798554
          ],
          [
            144.96339,
            -37.798568
          ],
          [
            144.963377,
            -37.798562
          ],
          [
            144.963327,
            -37.798636
          ],
          [
            144.963314,
            -37.798686
          ],
          [
            144.963262,
            -37.798691
          ],
          [
            144.963266,
            -37.798704
          ],
          [
            144.963269,
            -37.798713
          ],
          [
            144.96327,
            -37.798722
          ],
          [
            144.963267,
            -37.798732
          ],
          [
            144.963265,
            -37.798735
          ],
          [
            144.963262,
            -37.798739
          ],
          [
            144.963258,
            -37.798742
          ],
          [
            144.963254,
            -37.798745
          ],
          [
            144.963387,
            -37.798746
          ],
          [
            144.963453,
            -37.798754
          ]
        ]
      ]
    },
    "capacity": 140,
    "floor_level": 1,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true,
    "created_at": "2026-08-15T00:00:00.000Z"
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
            144.963752,
            -37.796838
          ],
          [
            144.963682,
            -37.79683
          ],
          [
            144.963691,
            -37.796773
          ],
          [
            144.963658,
            -37.796769
          ],
          [
            144.963657,
            -37.796776
          ],
          [
            144.963518,
            -37.796762
          ],
          [
            144.96352,
            -37.796749
          ],
          [
            144.963489,
            -37.796746
          ],
          [
            144.963488,
            -37.796752
          ],
          [
            144.963478,
            -37.796751
          ],
          [
            144.963498,
            -37.796634
          ],
          [
            144.963543,
            -37.796638
          ],
          [
            144.963542,
            -37.796646
          ],
          [
            144.963575,
            -37.796649
          ],
          [
            144.963577,
            -37.796642
          ],
          [
            144.963794,
            -37.796665
          ],
          [
            144.963793,
            -37.796673
          ],
          [
            144.963826,
            -37.796676
          ],
          [
            144.963827,
            -37.796669
          ],
          [
            144.963865,
            -37.796673
          ],
          [
            144.963859,
            -37.796707
          ],
          [
            144.963855,
            -37.796731
          ],
          [
            144.963854,
            -37.796739
          ],
          [
            144.963856,
            -37.796739
          ],
          [
            144.963855,
            -37.796746
          ],
          [
            144.963888,
            -37.796749
          ],
          [
            144.963889,
            -37.79674
          ],
          [
            144.964,
            -37.796752
          ],
          [
            144.963998,
            -37.796761
          ],
          [
            144.964031,
            -37.796764
          ],
          [
            144.964032,
            -37.796758
          ],
          [
            144.964038,
            -37.796758
          ],
          [
            144.964039,
            -37.796752
          ],
          [
            144.964134,
            -37.796762
          ],
          [
            144.964326,
            -37.796782
          ],
          [
            144.964325,
            -37.796791
          ],
          [
            144.96435,
            -37.796793
          ],
          [
            144.964355,
            -37.796794
          ],
          [
            144.964364,
            -37.796795
          ],
          [
            144.964361,
            -37.796817
          ],
          [
            144.964402,
            -37.796821
          ],
          [
            144.964394,
            -37.796868
          ],
          [
            144.964417,
            -37.796871
          ],
          [
            144.964412,
            -37.796901
          ],
          [
            144.964388,
            -37.796898
          ],
          [
            144.964381,
            -37.79694
          ],
          [
            144.96434,
            -37.796936
          ],
          [
            144.964336,
            -37.796962
          ],
          [
            144.964334,
            -37.796971
          ],
          [
            144.96433,
            -37.796995
          ],
          [
            144.964321,
            -37.797053
          ],
          [
            144.963775,
            -37.796996
          ],
          [
            144.963771,
            -37.797017
          ],
          [
            144.963723,
            -37.797012
          ],
          [
            144.963729,
            -37.796973
          ],
          [
            144.963737,
            -37.796931
          ],
          [
            144.963741,
            -37.796905
          ],
          [
            144.963752,
            -37.796838
          ]
        ]
      ]
    },
    "capacity": 100,
    "floor_level": 0,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true,
    "created_at": "2026-08-15T00:00:00.000Z"
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
            144.963752,
            -37.796838
          ],
          [
            144.963682,
            -37.79683
          ],
          [
            144.963691,
            -37.796773
          ],
          [
            144.963658,
            -37.796769
          ],
          [
            144.963657,
            -37.796776
          ],
          [
            144.963518,
            -37.796762
          ],
          [
            144.96352,
            -37.796749
          ],
          [
            144.963489,
            -37.796746
          ],
          [
            144.963488,
            -37.796752
          ],
          [
            144.963478,
            -37.796751
          ],
          [
            144.963498,
            -37.796634
          ],
          [
            144.963543,
            -37.796638
          ],
          [
            144.963542,
            -37.796646
          ],
          [
            144.963575,
            -37.796649
          ],
          [
            144.963577,
            -37.796642
          ],
          [
            144.963794,
            -37.796665
          ],
          [
            144.963793,
            -37.796673
          ],
          [
            144.963826,
            -37.796676
          ],
          [
            144.963827,
            -37.796669
          ],
          [
            144.963865,
            -37.796673
          ],
          [
            144.963859,
            -37.796707
          ],
          [
            144.963855,
            -37.796731
          ],
          [
            144.963854,
            -37.796739
          ],
          [
            144.963856,
            -37.796739
          ],
          [
            144.963855,
            -37.796746
          ],
          [
            144.963888,
            -37.796749
          ],
          [
            144.963889,
            -37.79674
          ],
          [
            144.964,
            -37.796752
          ],
          [
            144.963998,
            -37.796761
          ],
          [
            144.964031,
            -37.796764
          ],
          [
            144.964032,
            -37.796758
          ],
          [
            144.964038,
            -37.796758
          ],
          [
            144.964039,
            -37.796752
          ],
          [
            144.964134,
            -37.796762
          ],
          [
            144.964326,
            -37.796782
          ],
          [
            144.964325,
            -37.796791
          ],
          [
            144.96435,
            -37.796793
          ],
          [
            144.964355,
            -37.796794
          ],
          [
            144.964364,
            -37.796795
          ],
          [
            144.964361,
            -37.796817
          ],
          [
            144.964402,
            -37.796821
          ],
          [
            144.964394,
            -37.796868
          ],
          [
            144.964417,
            -37.796871
          ],
          [
            144.964412,
            -37.796901
          ],
          [
            144.964388,
            -37.796898
          ],
          [
            144.964381,
            -37.79694
          ],
          [
            144.96434,
            -37.796936
          ],
          [
            144.964336,
            -37.796962
          ],
          [
            144.964334,
            -37.796971
          ],
          [
            144.96433,
            -37.796995
          ],
          [
            144.964321,
            -37.797053
          ],
          [
            144.963775,
            -37.796996
          ],
          [
            144.963771,
            -37.797017
          ],
          [
            144.963723,
            -37.797012
          ],
          [
            144.963729,
            -37.796973
          ],
          [
            144.963737,
            -37.796931
          ],
          [
            144.963741,
            -37.796905
          ],
          [
            144.963752,
            -37.796838
          ]
        ]
      ]
    },
    "capacity": 100,
    "floor_level": 1,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true,
    "created_at": "2026-08-15T00:00:00.000Z"
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
            144.963752,
            -37.796838
          ],
          [
            144.963682,
            -37.79683
          ],
          [
            144.963691,
            -37.796773
          ],
          [
            144.963658,
            -37.796769
          ],
          [
            144.963657,
            -37.796776
          ],
          [
            144.963518,
            -37.796762
          ],
          [
            144.96352,
            -37.796749
          ],
          [
            144.963489,
            -37.796746
          ],
          [
            144.963488,
            -37.796752
          ],
          [
            144.963478,
            -37.796751
          ],
          [
            144.963498,
            -37.796634
          ],
          [
            144.963543,
            -37.796638
          ],
          [
            144.963542,
            -37.796646
          ],
          [
            144.963575,
            -37.796649
          ],
          [
            144.963577,
            -37.796642
          ],
          [
            144.963794,
            -37.796665
          ],
          [
            144.963793,
            -37.796673
          ],
          [
            144.963826,
            -37.796676
          ],
          [
            144.963827,
            -37.796669
          ],
          [
            144.963865,
            -37.796673
          ],
          [
            144.963859,
            -37.796707
          ],
          [
            144.963855,
            -37.796731
          ],
          [
            144.963854,
            -37.796739
          ],
          [
            144.963856,
            -37.796739
          ],
          [
            144.963855,
            -37.796746
          ],
          [
            144.963888,
            -37.796749
          ],
          [
            144.963889,
            -37.79674
          ],
          [
            144.964,
            -37.796752
          ],
          [
            144.963998,
            -37.796761
          ],
          [
            144.964031,
            -37.796764
          ],
          [
            144.964032,
            -37.796758
          ],
          [
            144.964038,
            -37.796758
          ],
          [
            144.964039,
            -37.796752
          ],
          [
            144.964134,
            -37.796762
          ],
          [
            144.964326,
            -37.796782
          ],
          [
            144.964325,
            -37.796791
          ],
          [
            144.96435,
            -37.796793
          ],
          [
            144.964355,
            -37.796794
          ],
          [
            144.964364,
            -37.796795
          ],
          [
            144.964361,
            -37.796817
          ],
          [
            144.964402,
            -37.796821
          ],
          [
            144.964394,
            -37.796868
          ],
          [
            144.964417,
            -37.796871
          ],
          [
            144.964412,
            -37.796901
          ],
          [
            144.964388,
            -37.796898
          ],
          [
            144.964381,
            -37.79694
          ],
          [
            144.96434,
            -37.796936
          ],
          [
            144.964336,
            -37.796962
          ],
          [
            144.964334,
            -37.796971
          ],
          [
            144.96433,
            -37.796995
          ],
          [
            144.964321,
            -37.797053
          ],
          [
            144.963775,
            -37.796996
          ],
          [
            144.963771,
            -37.797017
          ],
          [
            144.963723,
            -37.797012
          ],
          [
            144.963729,
            -37.796973
          ],
          [
            144.963737,
            -37.796931
          ],
          [
            144.963741,
            -37.796905
          ],
          [
            144.963752,
            -37.796838
          ]
        ]
      ]
    },
    "capacity": 100,
    "floor_level": 2,
    "is_quiet_zone": false,
    "has_power": true,
    "is_accessible": true,
    "created_at": "2026-08-15T00:00:00.000Z"
  }
]

export const SEED_TYPICAL_CURVES: GooglePopularTime[] = [
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 1,
    "hour_of_day": 8,
    "typical_popularity": 15,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 1,
    "hour_of_day": 9,
    "typical_popularity": 30,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 1,
    "hour_of_day": 10,
    "typical_popularity": 50,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 1,
    "hour_of_day": 11,
    "typical_popularity": 65,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 1,
    "hour_of_day": 12,
    "typical_popularity": 78,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 1,
    "hour_of_day": 13,
    "typical_popularity": 80,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 1,
    "hour_of_day": 14,
    "typical_popularity": 75,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 1,
    "hour_of_day": 15,
    "typical_popularity": 68,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 1,
    "hour_of_day": 16,
    "typical_popularity": 60,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 1,
    "hour_of_day": 17,
    "typical_popularity": 55,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 1,
    "hour_of_day": 18,
    "typical_popularity": 50,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 1,
    "hour_of_day": 19,
    "typical_popularity": 45,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 1,
    "hour_of_day": 20,
    "typical_popularity": 38,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 1,
    "hour_of_day": 21,
    "typical_popularity": 25,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 2,
    "hour_of_day": 8,
    "typical_popularity": 18,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 2,
    "hour_of_day": 9,
    "typical_popularity": 33,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 2,
    "hour_of_day": 10,
    "typical_popularity": 52,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 2,
    "hour_of_day": 11,
    "typical_popularity": 68,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 2,
    "hour_of_day": 12,
    "typical_popularity": 80,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 2,
    "hour_of_day": 13,
    "typical_popularity": 82,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 2,
    "hour_of_day": 14,
    "typical_popularity": 76,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 2,
    "hour_of_day": 15,
    "typical_popularity": 70,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 2,
    "hour_of_day": 16,
    "typical_popularity": 62,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 2,
    "hour_of_day": 17,
    "typical_popularity": 56,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 2,
    "hour_of_day": 18,
    "typical_popularity": 51,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 2,
    "hour_of_day": 19,
    "typical_popularity": 46,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 2,
    "hour_of_day": 20,
    "typical_popularity": 40,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 2,
    "hour_of_day": 21,
    "typical_popularity": 27,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 3,
    "hour_of_day": 8,
    "typical_popularity": 20,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 3,
    "hour_of_day": 9,
    "typical_popularity": 36,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 3,
    "hour_of_day": 10,
    "typical_popularity": 55,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 3,
    "hour_of_day": 11,
    "typical_popularity": 70,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 3,
    "hour_of_day": 12,
    "typical_popularity": 83,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 3,
    "hour_of_day": 13,
    "typical_popularity": 85,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 3,
    "hour_of_day": 14,
    "typical_popularity": 78,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 3,
    "hour_of_day": 15,
    "typical_popularity": 72,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 3,
    "hour_of_day": 16,
    "typical_popularity": 65,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 3,
    "hour_of_day": 17,
    "typical_popularity": 58,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 3,
    "hour_of_day": 18,
    "typical_popularity": 52,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 3,
    "hour_of_day": 19,
    "typical_popularity": 47,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 3,
    "hour_of_day": 20,
    "typical_popularity": 40,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 3,
    "hour_of_day": 21,
    "typical_popularity": 28,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 4,
    "hour_of_day": 8,
    "typical_popularity": 17,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 4,
    "hour_of_day": 9,
    "typical_popularity": 32,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 4,
    "hour_of_day": 10,
    "typical_popularity": 51,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 4,
    "hour_of_day": 11,
    "typical_popularity": 66,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 4,
    "hour_of_day": 12,
    "typical_popularity": 79,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 4,
    "hour_of_day": 13,
    "typical_popularity": 81,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 4,
    "hour_of_day": 14,
    "typical_popularity": 74,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 4,
    "hour_of_day": 15,
    "typical_popularity": 67,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 4,
    "hour_of_day": 16,
    "typical_popularity": 60,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 4,
    "hour_of_day": 17,
    "typical_popularity": 54,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 4,
    "hour_of_day": 18,
    "typical_popularity": 48,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 4,
    "hour_of_day": 19,
    "typical_popularity": 43,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 4,
    "hour_of_day": 20,
    "typical_popularity": 37,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 4,
    "hour_of_day": 21,
    "typical_popularity": 24,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 5,
    "hour_of_day": 8,
    "typical_popularity": 14,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 5,
    "hour_of_day": 9,
    "typical_popularity": 28,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 5,
    "hour_of_day": 10,
    "typical_popularity": 45,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 5,
    "hour_of_day": 11,
    "typical_popularity": 58,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 5,
    "hour_of_day": 12,
    "typical_popularity": 68,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 5,
    "hour_of_day": 13,
    "typical_popularity": 65,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 5,
    "hour_of_day": 14,
    "typical_popularity": 58,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 5,
    "hour_of_day": 15,
    "typical_popularity": 48,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 5,
    "hour_of_day": 16,
    "typical_popularity": 35,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 5,
    "hour_of_day": 17,
    "typical_popularity": 22,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 6,
    "hour_of_day": 10,
    "typical_popularity": 10,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 6,
    "hour_of_day": 11,
    "typical_popularity": 22,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 6,
    "hour_of_day": 12,
    "typical_popularity": 35,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 6,
    "hour_of_day": 13,
    "typical_popularity": 45,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 6,
    "hour_of_day": 14,
    "typical_popularity": 42,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 6,
    "hour_of_day": 15,
    "typical_popularity": 35,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 6,
    "hour_of_day": 16,
    "typical_popularity": 25,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 6,
    "hour_of_day": 17,
    "typical_popularity": 15,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 0,
    "hour_of_day": 12,
    "typical_popularity": 10,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 0,
    "hour_of_day": 13,
    "typical_popularity": 22,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 0,
    "hour_of_day": 14,
    "typical_popularity": 35,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 0,
    "hour_of_day": 15,
    "typical_popularity": 32,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 0,
    "hour_of_day": 16,
    "typical_popularity": 25,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000001",
    "day_of_week": 0,
    "hour_of_day": 17,
    "typical_popularity": 15,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 1,
    "hour_of_day": 8,
    "typical_popularity": 20,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 1,
    "hour_of_day": 9,
    "typical_popularity": 40,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 1,
    "hour_of_day": 10,
    "typical_popularity": 60,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 1,
    "hour_of_day": 11,
    "typical_popularity": 80,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 1,
    "hour_of_day": 12,
    "typical_popularity": 85,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 1,
    "hour_of_day": 13,
    "typical_popularity": 78,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 1,
    "hour_of_day": 14,
    "typical_popularity": 68,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 1,
    "hour_of_day": 15,
    "typical_popularity": 58,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 1,
    "hour_of_day": 16,
    "typical_popularity": 50,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 1,
    "hour_of_day": 17,
    "typical_popularity": 42,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 1,
    "hour_of_day": 18,
    "typical_popularity": 35,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 1,
    "hour_of_day": 19,
    "typical_popularity": 25,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 1,
    "hour_of_day": 20,
    "typical_popularity": 15,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 2,
    "hour_of_day": 8,
    "typical_popularity": 22,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 2,
    "hour_of_day": 9,
    "typical_popularity": 42,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 2,
    "hour_of_day": 10,
    "typical_popularity": 62,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 2,
    "hour_of_day": 11,
    "typical_popularity": 82,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 2,
    "hour_of_day": 12,
    "typical_popularity": 88,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 2,
    "hour_of_day": 13,
    "typical_popularity": 80,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 2,
    "hour_of_day": 14,
    "typical_popularity": 70,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 2,
    "hour_of_day": 15,
    "typical_popularity": 60,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 2,
    "hour_of_day": 16,
    "typical_popularity": 52,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 2,
    "hour_of_day": 17,
    "typical_popularity": 44,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 2,
    "hour_of_day": 18,
    "typical_popularity": 36,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 2,
    "hour_of_day": 19,
    "typical_popularity": 26,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 2,
    "hour_of_day": 20,
    "typical_popularity": 16,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 3,
    "hour_of_day": 8,
    "typical_popularity": 25,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 3,
    "hour_of_day": 9,
    "typical_popularity": 45,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 3,
    "hour_of_day": 10,
    "typical_popularity": 65,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 3,
    "hour_of_day": 11,
    "typical_popularity": 85,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 3,
    "hour_of_day": 12,
    "typical_popularity": 90,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 3,
    "hour_of_day": 13,
    "typical_popularity": 83,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 3,
    "hour_of_day": 14,
    "typical_popularity": 72,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 3,
    "hour_of_day": 15,
    "typical_popularity": 62,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 3,
    "hour_of_day": 16,
    "typical_popularity": 54,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 3,
    "hour_of_day": 17,
    "typical_popularity": 46,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 3,
    "hour_of_day": 18,
    "typical_popularity": 38,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 3,
    "hour_of_day": 19,
    "typical_popularity": 28,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 3,
    "hour_of_day": 20,
    "typical_popularity": 18,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 4,
    "hour_of_day": 8,
    "typical_popularity": 21,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 4,
    "hour_of_day": 9,
    "typical_popularity": 41,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 4,
    "hour_of_day": 10,
    "typical_popularity": 61,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 4,
    "hour_of_day": 11,
    "typical_popularity": 81,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 4,
    "hour_of_day": 12,
    "typical_popularity": 86,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 4,
    "hour_of_day": 13,
    "typical_popularity": 79,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 4,
    "hour_of_day": 14,
    "typical_popularity": 69,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 4,
    "hour_of_day": 15,
    "typical_popularity": 58,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 4,
    "hour_of_day": 16,
    "typical_popularity": 50,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 4,
    "hour_of_day": 17,
    "typical_popularity": 42,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 4,
    "hour_of_day": 18,
    "typical_popularity": 34,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 4,
    "hour_of_day": 19,
    "typical_popularity": 24,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 4,
    "hour_of_day": 20,
    "typical_popularity": 14,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 5,
    "hour_of_day": 8,
    "typical_popularity": 18,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 5,
    "hour_of_day": 9,
    "typical_popularity": 35,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 5,
    "hour_of_day": 10,
    "typical_popularity": 52,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 5,
    "hour_of_day": 11,
    "typical_popularity": 65,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 5,
    "hour_of_day": 12,
    "typical_popularity": 70,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 5,
    "hour_of_day": 13,
    "typical_popularity": 62,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 5,
    "hour_of_day": 14,
    "typical_popularity": 50,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 5,
    "hour_of_day": 15,
    "typical_popularity": 38,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 5,
    "hour_of_day": 16,
    "typical_popularity": 28,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 5,
    "hour_of_day": 17,
    "typical_popularity": 18,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 6,
    "hour_of_day": 10,
    "typical_popularity": 15,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 6,
    "hour_of_day": 11,
    "typical_popularity": 50,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 6,
    "hour_of_day": 12,
    "typical_popularity": 45,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 6,
    "hour_of_day": 13,
    "typical_popularity": 40,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 6,
    "hour_of_day": 14,
    "typical_popularity": 35,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 6,
    "hour_of_day": 15,
    "typical_popularity": 28,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000002",
    "day_of_week": 6,
    "hour_of_day": 16,
    "typical_popularity": 18,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 1,
    "hour_of_day": 8,
    "typical_popularity": 15,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 1,
    "hour_of_day": 9,
    "typical_popularity": 52,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 1,
    "hour_of_day": 10,
    "typical_popularity": 38,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 1,
    "hour_of_day": 11,
    "typical_popularity": 68,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 1,
    "hour_of_day": 12,
    "typical_popularity": 45,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 1,
    "hour_of_day": 13,
    "typical_popularity": 40,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 1,
    "hour_of_day": 14,
    "typical_popularity": 62,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 1,
    "hour_of_day": 15,
    "typical_popularity": 48,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 1,
    "hour_of_day": 16,
    "typical_popularity": 35,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 1,
    "hour_of_day": 17,
    "typical_popularity": 22,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 1,
    "hour_of_day": 18,
    "typical_popularity": 12,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 1,
    "hour_of_day": 19,
    "typical_popularity": 8,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 1,
    "hour_of_day": 20,
    "typical_popularity": 5,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 2,
    "hour_of_day": 8,
    "typical_popularity": 18,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 2,
    "hour_of_day": 9,
    "typical_popularity": 55,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 2,
    "hour_of_day": 10,
    "typical_popularity": 42,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 2,
    "hour_of_day": 11,
    "typical_popularity": 70,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 2,
    "hour_of_day": 12,
    "typical_popularity": 50,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 2,
    "hour_of_day": 13,
    "typical_popularity": 44,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 2,
    "hour_of_day": 14,
    "typical_popularity": 65,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 2,
    "hour_of_day": 15,
    "typical_popularity": 50,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 2,
    "hour_of_day": 16,
    "typical_popularity": 36,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 2,
    "hour_of_day": 17,
    "typical_popularity": 24,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 2,
    "hour_of_day": 18,
    "typical_popularity": 14,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 2,
    "hour_of_day": 19,
    "typical_popularity": 8,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 2,
    "hour_of_day": 20,
    "typical_popularity": 5,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 3,
    "hour_of_day": 8,
    "typical_popularity": 20,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 3,
    "hour_of_day": 9,
    "typical_popularity": 58,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 3,
    "hour_of_day": 10,
    "typical_popularity": 45,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 3,
    "hour_of_day": 11,
    "typical_popularity": 72,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 3,
    "hour_of_day": 12,
    "typical_popularity": 52,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 3,
    "hour_of_day": 13,
    "typical_popularity": 46,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 3,
    "hour_of_day": 14,
    "typical_popularity": 68,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 3,
    "hour_of_day": 15,
    "typical_popularity": 52,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 3,
    "hour_of_day": 16,
    "typical_popularity": 38,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 3,
    "hour_of_day": 17,
    "typical_popularity": 25,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 3,
    "hour_of_day": 18,
    "typical_popularity": 15,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 3,
    "hour_of_day": 19,
    "typical_popularity": 9,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 3,
    "hour_of_day": 20,
    "typical_popularity": 5,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 4,
    "hour_of_day": 8,
    "typical_popularity": 16,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 4,
    "hour_of_day": 9,
    "typical_popularity": 53,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 4,
    "hour_of_day": 10,
    "typical_popularity": 40,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 4,
    "hour_of_day": 11,
    "typical_popularity": 66,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 4,
    "hour_of_day": 12,
    "typical_popularity": 46,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 4,
    "hour_of_day": 13,
    "typical_popularity": 42,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 4,
    "hour_of_day": 14,
    "typical_popularity": 63,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 4,
    "hour_of_day": 15,
    "typical_popularity": 47,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 4,
    "hour_of_day": 16,
    "typical_popularity": 34,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 4,
    "hour_of_day": 17,
    "typical_popularity": 20,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 4,
    "hour_of_day": 18,
    "typical_popularity": 12,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 4,
    "hour_of_day": 19,
    "typical_popularity": 7,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 4,
    "hour_of_day": 20,
    "typical_popularity": 4,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 5,
    "hour_of_day": 8,
    "typical_popularity": 12,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 5,
    "hour_of_day": 9,
    "typical_popularity": 45,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 5,
    "hour_of_day": 10,
    "typical_popularity": 60,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 5,
    "hour_of_day": 11,
    "typical_popularity": 52,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 5,
    "hour_of_day": 12,
    "typical_popularity": 38,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 5,
    "hour_of_day": 13,
    "typical_popularity": 25,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 5,
    "hour_of_day": 14,
    "typical_popularity": 18,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 5,
    "hour_of_day": 15,
    "typical_popularity": 12,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 5,
    "hour_of_day": 16,
    "typical_popularity": 8,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000003",
    "day_of_week": 5,
    "hour_of_day": 17,
    "typical_popularity": 5,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 1,
    "hour_of_day": 8,
    "typical_popularity": 12,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 1,
    "hour_of_day": 9,
    "typical_popularity": 48,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 1,
    "hour_of_day": 10,
    "typical_popularity": 35,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 1,
    "hour_of_day": 11,
    "typical_popularity": 63,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 1,
    "hour_of_day": 12,
    "typical_popularity": 45,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 1,
    "hour_of_day": 13,
    "typical_popularity": 40,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 1,
    "hour_of_day": 14,
    "typical_popularity": 58,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 1,
    "hour_of_day": 15,
    "typical_popularity": 42,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 1,
    "hour_of_day": 16,
    "typical_popularity": 30,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 1,
    "hour_of_day": 17,
    "typical_popularity": 18,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 1,
    "hour_of_day": 18,
    "typical_popularity": 22,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 1,
    "hour_of_day": 19,
    "typical_popularity": 25,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 1,
    "hour_of_day": 20,
    "typical_popularity": 15,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 2,
    "hour_of_day": 8,
    "typical_popularity": 14,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 2,
    "hour_of_day": 9,
    "typical_popularity": 50,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 2,
    "hour_of_day": 10,
    "typical_popularity": 38,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 2,
    "hour_of_day": 11,
    "typical_popularity": 65,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 2,
    "hour_of_day": 12,
    "typical_popularity": 48,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 2,
    "hour_of_day": 13,
    "typical_popularity": 42,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 2,
    "hour_of_day": 14,
    "typical_popularity": 60,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 2,
    "hour_of_day": 15,
    "typical_popularity": 44,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 2,
    "hour_of_day": 16,
    "typical_popularity": 32,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 2,
    "hour_of_day": 17,
    "typical_popularity": 20,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 2,
    "hour_of_day": 18,
    "typical_popularity": 24,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 2,
    "hour_of_day": 19,
    "typical_popularity": 26,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 2,
    "hour_of_day": 20,
    "typical_popularity": 16,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 3,
    "hour_of_day": 8,
    "typical_popularity": 16,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 3,
    "hour_of_day": 9,
    "typical_popularity": 52,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 3,
    "hour_of_day": 10,
    "typical_popularity": 40,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 3,
    "hour_of_day": 11,
    "typical_popularity": 68,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 3,
    "hour_of_day": 12,
    "typical_popularity": 50,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 3,
    "hour_of_day": 13,
    "typical_popularity": 45,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 3,
    "hour_of_day": 14,
    "typical_popularity": 62,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 3,
    "hour_of_day": 15,
    "typical_popularity": 46,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 3,
    "hour_of_day": 16,
    "typical_popularity": 34,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 3,
    "hour_of_day": 17,
    "typical_popularity": 22,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 3,
    "hour_of_day": 18,
    "typical_popularity": 26,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 3,
    "hour_of_day": 19,
    "typical_popularity": 28,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 3,
    "hour_of_day": 20,
    "typical_popularity": 18,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 4,
    "hour_of_day": 8,
    "typical_popularity": 13,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 4,
    "hour_of_day": 9,
    "typical_popularity": 48,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 4,
    "hour_of_day": 10,
    "typical_popularity": 36,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 4,
    "hour_of_day": 11,
    "typical_popularity": 62,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 4,
    "hour_of_day": 12,
    "typical_popularity": 44,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 4,
    "hour_of_day": 13,
    "typical_popularity": 40,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 4,
    "hour_of_day": 14,
    "typical_popularity": 57,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 4,
    "hour_of_day": 15,
    "typical_popularity": 42,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 4,
    "hour_of_day": 16,
    "typical_popularity": 30,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 4,
    "hour_of_day": 17,
    "typical_popularity": 18,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 4,
    "hour_of_day": 18,
    "typical_popularity": 22,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 4,
    "hour_of_day": 19,
    "typical_popularity": 24,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 4,
    "hour_of_day": 20,
    "typical_popularity": 14,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 5,
    "hour_of_day": 8,
    "typical_popularity": 10,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 5,
    "hour_of_day": 9,
    "typical_popularity": 40,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 5,
    "hour_of_day": 10,
    "typical_popularity": 55,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 5,
    "hour_of_day": 11,
    "typical_popularity": 48,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 5,
    "hour_of_day": 12,
    "typical_popularity": 35,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 5,
    "hour_of_day": 13,
    "typical_popularity": 22,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 5,
    "hour_of_day": 14,
    "typical_popularity": 15,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 5,
    "hour_of_day": 15,
    "typical_popularity": 10,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 5,
    "hour_of_day": 16,
    "typical_popularity": 8,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000004",
    "day_of_week": 5,
    "hour_of_day": 17,
    "typical_popularity": 5,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 1,
    "hour_of_day": 8,
    "typical_popularity": 10,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 1,
    "hour_of_day": 9,
    "typical_popularity": 45,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 1,
    "hour_of_day": 10,
    "typical_popularity": 32,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 1,
    "hour_of_day": 11,
    "typical_popularity": 60,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 1,
    "hour_of_day": 12,
    "typical_popularity": 42,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 1,
    "hour_of_day": 13,
    "typical_popularity": 38,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 1,
    "hour_of_day": 14,
    "typical_popularity": 55,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 1,
    "hour_of_day": 15,
    "typical_popularity": 40,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 1,
    "hour_of_day": 16,
    "typical_popularity": 30,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 1,
    "hour_of_day": 17,
    "typical_popularity": 22,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 1,
    "hour_of_day": 18,
    "typical_popularity": 28,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 1,
    "hour_of_day": 19,
    "typical_popularity": 32,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 1,
    "hour_of_day": 20,
    "typical_popularity": 30,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 2,
    "hour_of_day": 8,
    "typical_popularity": 12,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 2,
    "hour_of_day": 9,
    "typical_popularity": 48,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 2,
    "hour_of_day": 10,
    "typical_popularity": 35,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 2,
    "hour_of_day": 11,
    "typical_popularity": 62,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 2,
    "hour_of_day": 12,
    "typical_popularity": 45,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 2,
    "hour_of_day": 13,
    "typical_popularity": 40,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 2,
    "hour_of_day": 14,
    "typical_popularity": 58,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 2,
    "hour_of_day": 15,
    "typical_popularity": 42,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 2,
    "hour_of_day": 16,
    "typical_popularity": 32,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 2,
    "hour_of_day": 17,
    "typical_popularity": 24,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 2,
    "hour_of_day": 18,
    "typical_popularity": 30,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 2,
    "hour_of_day": 19,
    "typical_popularity": 34,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 2,
    "hour_of_day": 20,
    "typical_popularity": 32,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 3,
    "hour_of_day": 8,
    "typical_popularity": 14,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 3,
    "hour_of_day": 9,
    "typical_popularity": 50,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 3,
    "hour_of_day": 10,
    "typical_popularity": 38,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 3,
    "hour_of_day": 11,
    "typical_popularity": 65,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 3,
    "hour_of_day": 12,
    "typical_popularity": 48,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 3,
    "hour_of_day": 13,
    "typical_popularity": 44,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 3,
    "hour_of_day": 14,
    "typical_popularity": 60,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 3,
    "hour_of_day": 15,
    "typical_popularity": 45,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 3,
    "hour_of_day": 16,
    "typical_popularity": 35,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 3,
    "hour_of_day": 17,
    "typical_popularity": 26,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 3,
    "hour_of_day": 18,
    "typical_popularity": 32,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 3,
    "hour_of_day": 19,
    "typical_popularity": 36,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 3,
    "hour_of_day": 20,
    "typical_popularity": 35,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 4,
    "hour_of_day": 8,
    "typical_popularity": 11,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 4,
    "hour_of_day": 9,
    "typical_popularity": 46,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 4,
    "hour_of_day": 10,
    "typical_popularity": 33,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 4,
    "hour_of_day": 11,
    "typical_popularity": 58,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 4,
    "hour_of_day": 12,
    "typical_popularity": 42,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 4,
    "hour_of_day": 13,
    "typical_popularity": 38,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 4,
    "hour_of_day": 14,
    "typical_popularity": 54,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 4,
    "hour_of_day": 15,
    "typical_popularity": 40,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 4,
    "hour_of_day": 16,
    "typical_popularity": 30,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 4,
    "hour_of_day": 17,
    "typical_popularity": 22,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 4,
    "hour_of_day": 18,
    "typical_popularity": 28,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 4,
    "hour_of_day": 19,
    "typical_popularity": 31,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 4,
    "hour_of_day": 20,
    "typical_popularity": 28,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 5,
    "hour_of_day": 8,
    "typical_popularity": 8,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 5,
    "hour_of_day": 9,
    "typical_popularity": 38,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 5,
    "hour_of_day": 10,
    "typical_popularity": 50,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 5,
    "hour_of_day": 11,
    "typical_popularity": 45,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 5,
    "hour_of_day": 12,
    "typical_popularity": 35,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 5,
    "hour_of_day": 13,
    "typical_popularity": 28,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 5,
    "hour_of_day": 14,
    "typical_popularity": 25,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 5,
    "hour_of_day": 15,
    "typical_popularity": 22,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 5,
    "hour_of_day": 16,
    "typical_popularity": 15,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000005",
    "day_of_week": 5,
    "hour_of_day": 17,
    "typical_popularity": 8,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 1,
    "hour_of_day": 8,
    "typical_popularity": 10,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 1,
    "hour_of_day": 9,
    "typical_popularity": 35,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 1,
    "hour_of_day": 10,
    "typical_popularity": 68,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 1,
    "hour_of_day": 11,
    "typical_popularity": 55,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 1,
    "hour_of_day": 12,
    "typical_popularity": 42,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 1,
    "hour_of_day": 13,
    "typical_popularity": 38,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 1,
    "hour_of_day": 14,
    "typical_popularity": 65,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 1,
    "hour_of_day": 15,
    "typical_popularity": 50,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 1,
    "hour_of_day": 16,
    "typical_popularity": 38,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 1,
    "hour_of_day": 17,
    "typical_popularity": 25,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 1,
    "hour_of_day": 18,
    "typical_popularity": 18,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 1,
    "hour_of_day": 19,
    "typical_popularity": 12,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 1,
    "hour_of_day": 20,
    "typical_popularity": 8,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 2,
    "hour_of_day": 8,
    "typical_popularity": 12,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 2,
    "hour_of_day": 9,
    "typical_popularity": 38,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 2,
    "hour_of_day": 10,
    "typical_popularity": 72,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 2,
    "hour_of_day": 11,
    "typical_popularity": 58,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 2,
    "hour_of_day": 12,
    "typical_popularity": 45,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 2,
    "hour_of_day": 13,
    "typical_popularity": 40,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 2,
    "hour_of_day": 14,
    "typical_popularity": 68,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 2,
    "hour_of_day": 15,
    "typical_popularity": 52,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 2,
    "hour_of_day": 16,
    "typical_popularity": 40,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 2,
    "hour_of_day": 17,
    "typical_popularity": 28,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 2,
    "hour_of_day": 18,
    "typical_popularity": 20,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 2,
    "hour_of_day": 19,
    "typical_popularity": 14,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 2,
    "hour_of_day": 20,
    "typical_popularity": 8,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 3,
    "hour_of_day": 8,
    "typical_popularity": 14,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 3,
    "hour_of_day": 9,
    "typical_popularity": 42,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 3,
    "hour_of_day": 10,
    "typical_popularity": 75,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 3,
    "hour_of_day": 11,
    "typical_popularity": 62,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 3,
    "hour_of_day": 12,
    "typical_popularity": 48,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 3,
    "hour_of_day": 13,
    "typical_popularity": 44,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 3,
    "hour_of_day": 14,
    "typical_popularity": 72,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 3,
    "hour_of_day": 15,
    "typical_popularity": 55,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 3,
    "hour_of_day": 16,
    "typical_popularity": 42,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 3,
    "hour_of_day": 17,
    "typical_popularity": 30,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 3,
    "hour_of_day": 18,
    "typical_popularity": 22,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 3,
    "hour_of_day": 19,
    "typical_popularity": 15,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 3,
    "hour_of_day": 20,
    "typical_popularity": 8,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 4,
    "hour_of_day": 8,
    "typical_popularity": 11,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 4,
    "hour_of_day": 9,
    "typical_popularity": 36,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 4,
    "hour_of_day": 10,
    "typical_popularity": 70,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 4,
    "hour_of_day": 11,
    "typical_popularity": 56,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 4,
    "hour_of_day": 12,
    "typical_popularity": 43,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 4,
    "hour_of_day": 13,
    "typical_popularity": 39,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 4,
    "hour_of_day": 14,
    "typical_popularity": 66,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 4,
    "hour_of_day": 15,
    "typical_popularity": 48,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 4,
    "hour_of_day": 16,
    "typical_popularity": 36,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 4,
    "hour_of_day": 17,
    "typical_popularity": 24,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 4,
    "hour_of_day": 18,
    "typical_popularity": 16,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 4,
    "hour_of_day": 19,
    "typical_popularity": 10,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 4,
    "hour_of_day": 20,
    "typical_popularity": 6,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 5,
    "hour_of_day": 8,
    "typical_popularity": 8,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 5,
    "hour_of_day": 9,
    "typical_popularity": 30,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 5,
    "hour_of_day": 10,
    "typical_popularity": 58,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 5,
    "hour_of_day": 11,
    "typical_popularity": 48,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 5,
    "hour_of_day": 12,
    "typical_popularity": 35,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 5,
    "hour_of_day": 13,
    "typical_popularity": 28,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 5,
    "hour_of_day": 14,
    "typical_popularity": 42,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 5,
    "hour_of_day": 15,
    "typical_popularity": 30,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 5,
    "hour_of_day": 16,
    "typical_popularity": 18,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 5,
    "hour_of_day": 17,
    "typical_popularity": 10,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 5,
    "hour_of_day": 18,
    "typical_popularity": 5,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 5,
    "hour_of_day": 19,
    "typical_popularity": 4,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 5,
    "hour_of_day": 20,
    "typical_popularity": 3,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 6,
    "hour_of_day": 10,
    "typical_popularity": 8,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 6,
    "hour_of_day": 11,
    "typical_popularity": 18,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 6,
    "hour_of_day": 12,
    "typical_popularity": 25,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 6,
    "hour_of_day": 13,
    "typical_popularity": 28,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 6,
    "hour_of_day": 14,
    "typical_popularity": 22,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000008",
    "day_of_week": 6,
    "hour_of_day": 15,
    "typical_popularity": 15,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 1,
    "hour_of_day": 8,
    "typical_popularity": 12,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 1,
    "hour_of_day": 9,
    "typical_popularity": 50,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 1,
    "hour_of_day": 10,
    "typical_popularity": 38,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 1,
    "hour_of_day": 11,
    "typical_popularity": 65,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 1,
    "hour_of_day": 12,
    "typical_popularity": 48,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 1,
    "hour_of_day": 13,
    "typical_popularity": 42,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 1,
    "hour_of_day": 14,
    "typical_popularity": 62,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 1,
    "hour_of_day": 15,
    "typical_popularity": 45,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 1,
    "hour_of_day": 16,
    "typical_popularity": 32,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 1,
    "hour_of_day": 17,
    "typical_popularity": 20,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 1,
    "hour_of_day": 18,
    "typical_popularity": 12,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 1,
    "hour_of_day": 19,
    "typical_popularity": 8,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 1,
    "hour_of_day": 20,
    "typical_popularity": 5,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 2,
    "hour_of_day": 8,
    "typical_popularity": 14,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 2,
    "hour_of_day": 9,
    "typical_popularity": 52,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 2,
    "hour_of_day": 10,
    "typical_popularity": 40,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 2,
    "hour_of_day": 11,
    "typical_popularity": 68,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 2,
    "hour_of_day": 12,
    "typical_popularity": 50,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 2,
    "hour_of_day": 13,
    "typical_popularity": 44,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 2,
    "hour_of_day": 14,
    "typical_popularity": 65,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 2,
    "hour_of_day": 15,
    "typical_popularity": 48,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 2,
    "hour_of_day": 16,
    "typical_popularity": 34,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 2,
    "hour_of_day": 17,
    "typical_popularity": 22,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 2,
    "hour_of_day": 18,
    "typical_popularity": 14,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 2,
    "hour_of_day": 19,
    "typical_popularity": 9,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 2,
    "hour_of_day": 20,
    "typical_popularity": 5,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 3,
    "hour_of_day": 8,
    "typical_popularity": 16,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 3,
    "hour_of_day": 9,
    "typical_popularity": 55,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 3,
    "hour_of_day": 10,
    "typical_popularity": 42,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 3,
    "hour_of_day": 11,
    "typical_popularity": 72,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 3,
    "hour_of_day": 12,
    "typical_popularity": 54,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 3,
    "hour_of_day": 13,
    "typical_popularity": 48,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 3,
    "hour_of_day": 14,
    "typical_popularity": 68,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 3,
    "hour_of_day": 15,
    "typical_popularity": 50,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 3,
    "hour_of_day": 16,
    "typical_popularity": 36,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 3,
    "hour_of_day": 17,
    "typical_popularity": 24,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 3,
    "hour_of_day": 18,
    "typical_popularity": 16,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 3,
    "hour_of_day": 19,
    "typical_popularity": 10,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 3,
    "hour_of_day": 20,
    "typical_popularity": 5,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 4,
    "hour_of_day": 8,
    "typical_popularity": 13,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 4,
    "hour_of_day": 9,
    "typical_popularity": 50,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 4,
    "hour_of_day": 10,
    "typical_popularity": 37,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 4,
    "hour_of_day": 11,
    "typical_popularity": 64,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 4,
    "hour_of_day": 12,
    "typical_popularity": 46,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 4,
    "hour_of_day": 13,
    "typical_popularity": 40,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 4,
    "hour_of_day": 14,
    "typical_popularity": 60,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 4,
    "hour_of_day": 15,
    "typical_popularity": 44,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 4,
    "hour_of_day": 16,
    "typical_popularity": 30,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 4,
    "hour_of_day": 17,
    "typical_popularity": 18,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 4,
    "hour_of_day": 18,
    "typical_popularity": 10,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 4,
    "hour_of_day": 19,
    "typical_popularity": 7,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 4,
    "hour_of_day": 20,
    "typical_popularity": 4,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 5,
    "hour_of_day": 8,
    "typical_popularity": 10,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 5,
    "hour_of_day": 9,
    "typical_popularity": 42,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 5,
    "hour_of_day": 10,
    "typical_popularity": 55,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 5,
    "hour_of_day": 11,
    "typical_popularity": 48,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 5,
    "hour_of_day": 12,
    "typical_popularity": 35,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 5,
    "hour_of_day": 13,
    "typical_popularity": 25,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 5,
    "hour_of_day": 14,
    "typical_popularity": 18,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 5,
    "hour_of_day": 15,
    "typical_popularity": 12,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 5,
    "hour_of_day": 16,
    "typical_popularity": 8,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000009",
    "day_of_week": 5,
    "hour_of_day": 17,
    "typical_popularity": 5,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 1,
    "hour_of_day": 7,
    "typical_popularity": 20,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 1,
    "hour_of_day": 8,
    "typical_popularity": 65,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 1,
    "hour_of_day": 9,
    "typical_popularity": 45,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 1,
    "hour_of_day": 10,
    "typical_popularity": 38,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 1,
    "hour_of_day": 11,
    "typical_popularity": 50,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 1,
    "hour_of_day": 12,
    "typical_popularity": 78,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 1,
    "hour_of_day": 13,
    "typical_popularity": 70,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 1,
    "hour_of_day": 14,
    "typical_popularity": 55,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 1,
    "hour_of_day": 15,
    "typical_popularity": 52,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 1,
    "hour_of_day": 16,
    "typical_popularity": 50,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 1,
    "hour_of_day": 17,
    "typical_popularity": 48,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 1,
    "hour_of_day": 18,
    "typical_popularity": 30,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 1,
    "hour_of_day": 19,
    "typical_popularity": 15,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 2,
    "hour_of_day": 7,
    "typical_popularity": 22,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 2,
    "hour_of_day": 8,
    "typical_popularity": 68,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 2,
    "hour_of_day": 9,
    "typical_popularity": 48,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 2,
    "hour_of_day": 10,
    "typical_popularity": 40,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 2,
    "hour_of_day": 11,
    "typical_popularity": 52,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 2,
    "hour_of_day": 12,
    "typical_popularity": 80,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 2,
    "hour_of_day": 13,
    "typical_popularity": 72,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 2,
    "hour_of_day": 14,
    "typical_popularity": 58,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 2,
    "hour_of_day": 15,
    "typical_popularity": 55,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 2,
    "hour_of_day": 16,
    "typical_popularity": 52,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 2,
    "hour_of_day": 17,
    "typical_popularity": 50,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 2,
    "hour_of_day": 18,
    "typical_popularity": 32,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 2,
    "hour_of_day": 19,
    "typical_popularity": 16,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 3,
    "hour_of_day": 7,
    "typical_popularity": 25,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 3,
    "hour_of_day": 8,
    "typical_popularity": 72,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 3,
    "hour_of_day": 9,
    "typical_popularity": 50,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 3,
    "hour_of_day": 10,
    "typical_popularity": 44,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 3,
    "hour_of_day": 11,
    "typical_popularity": 55,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 3,
    "hour_of_day": 12,
    "typical_popularity": 85,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 3,
    "hour_of_day": 13,
    "typical_popularity": 76,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 3,
    "hour_of_day": 14,
    "typical_popularity": 60,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 3,
    "hour_of_day": 15,
    "typical_popularity": 57,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 3,
    "hour_of_day": 16,
    "typical_popularity": 54,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 3,
    "hour_of_day": 17,
    "typical_popularity": 52,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 3,
    "hour_of_day": 18,
    "typical_popularity": 34,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 3,
    "hour_of_day": 19,
    "typical_popularity": 18,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 4,
    "hour_of_day": 7,
    "typical_popularity": 21,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 4,
    "hour_of_day": 8,
    "typical_popularity": 66,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 4,
    "hour_of_day": 9,
    "typical_popularity": 46,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 4,
    "hour_of_day": 10,
    "typical_popularity": 39,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 4,
    "hour_of_day": 11,
    "typical_popularity": 51,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 4,
    "hour_of_day": 12,
    "typical_popularity": 76,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 4,
    "hour_of_day": 13,
    "typical_popularity": 68,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 4,
    "hour_of_day": 14,
    "typical_popularity": 54,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 4,
    "hour_of_day": 15,
    "typical_popularity": 51,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 4,
    "hour_of_day": 16,
    "typical_popularity": 48,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 4,
    "hour_of_day": 17,
    "typical_popularity": 46,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 4,
    "hour_of_day": 18,
    "typical_popularity": 28,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 4,
    "hour_of_day": 19,
    "typical_popularity": 14,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 5,
    "hour_of_day": 7,
    "typical_popularity": 18,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 5,
    "hour_of_day": 8,
    "typical_popularity": 60,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 5,
    "hour_of_day": 9,
    "typical_popularity": 42,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 5,
    "hour_of_day": 10,
    "typical_popularity": 35,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 5,
    "hour_of_day": 11,
    "typical_popularity": 45,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 5,
    "hour_of_day": 12,
    "typical_popularity": 70,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 5,
    "hour_of_day": 13,
    "typical_popularity": 60,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 5,
    "hour_of_day": 14,
    "typical_popularity": 42,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 5,
    "hour_of_day": 15,
    "typical_popularity": 35,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 5,
    "hour_of_day": 16,
    "typical_popularity": 25,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 5,
    "hour_of_day": 17,
    "typical_popularity": 15,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 5,
    "hour_of_day": 18,
    "typical_popularity": 8,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000a",
    "day_of_week": 5,
    "hour_of_day": 19,
    "typical_popularity": 4,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 1,
    "hour_of_day": 8,
    "typical_popularity": 8,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 1,
    "hour_of_day": 9,
    "typical_popularity": 18,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 1,
    "hour_of_day": 10,
    "typical_popularity": 30,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 1,
    "hour_of_day": 11,
    "typical_popularity": 42,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 1,
    "hour_of_day": 12,
    "typical_popularity": 48,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 1,
    "hour_of_day": 13,
    "typical_popularity": 52,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 1,
    "hour_of_day": 14,
    "typical_popularity": 65,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 1,
    "hour_of_day": 15,
    "typical_popularity": 72,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 1,
    "hour_of_day": 16,
    "typical_popularity": 70,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 1,
    "hour_of_day": 17,
    "typical_popularity": 62,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 1,
    "hour_of_day": 18,
    "typical_popularity": 55,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 1,
    "hour_of_day": 19,
    "typical_popularity": 48,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 1,
    "hour_of_day": 20,
    "typical_popularity": 42,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 1,
    "hour_of_day": 21,
    "typical_popularity": 35,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 1,
    "hour_of_day": 22,
    "typical_popularity": 25,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 2,
    "hour_of_day": 8,
    "typical_popularity": 10,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 2,
    "hour_of_day": 9,
    "typical_popularity": 20,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 2,
    "hour_of_day": 10,
    "typical_popularity": 32,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 2,
    "hour_of_day": 11,
    "typical_popularity": 45,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 2,
    "hour_of_day": 12,
    "typical_popularity": 50,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 2,
    "hour_of_day": 13,
    "typical_popularity": 55,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 2,
    "hour_of_day": 14,
    "typical_popularity": 68,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 2,
    "hour_of_day": 15,
    "typical_popularity": 75,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 2,
    "hour_of_day": 16,
    "typical_popularity": 72,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 2,
    "hour_of_day": 17,
    "typical_popularity": 65,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 2,
    "hour_of_day": 18,
    "typical_popularity": 58,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 2,
    "hour_of_day": 19,
    "typical_popularity": 50,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 2,
    "hour_of_day": 20,
    "typical_popularity": 44,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 2,
    "hour_of_day": 21,
    "typical_popularity": 36,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 2,
    "hour_of_day": 22,
    "typical_popularity": 28,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 3,
    "hour_of_day": 8,
    "typical_popularity": 12,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 3,
    "hour_of_day": 9,
    "typical_popularity": 22,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 3,
    "hour_of_day": 10,
    "typical_popularity": 35,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 3,
    "hour_of_day": 11,
    "typical_popularity": 48,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 3,
    "hour_of_day": 12,
    "typical_popularity": 52,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 3,
    "hour_of_day": 13,
    "typical_popularity": 58,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 3,
    "hour_of_day": 14,
    "typical_popularity": 72,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 3,
    "hour_of_day": 15,
    "typical_popularity": 78,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 3,
    "hour_of_day": 16,
    "typical_popularity": 76,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 3,
    "hour_of_day": 17,
    "typical_popularity": 68,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 3,
    "hour_of_day": 18,
    "typical_popularity": 62,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 3,
    "hour_of_day": 19,
    "typical_popularity": 55,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 3,
    "hour_of_day": 20,
    "typical_popularity": 48,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 3,
    "hour_of_day": 21,
    "typical_popularity": 40,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 3,
    "hour_of_day": 22,
    "typical_popularity": 32,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 4,
    "hour_of_day": 8,
    "typical_popularity": 10,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 4,
    "hour_of_day": 9,
    "typical_popularity": 20,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 4,
    "hour_of_day": 10,
    "typical_popularity": 33,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 4,
    "hour_of_day": 11,
    "typical_popularity": 46,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 4,
    "hour_of_day": 12,
    "typical_popularity": 50,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 4,
    "hour_of_day": 13,
    "typical_popularity": 56,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 4,
    "hour_of_day": 14,
    "typical_popularity": 70,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 4,
    "hour_of_day": 15,
    "typical_popularity": 76,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 4,
    "hour_of_day": 16,
    "typical_popularity": 74,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 4,
    "hour_of_day": 17,
    "typical_popularity": 66,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 4,
    "hour_of_day": 18,
    "typical_popularity": 60,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 4,
    "hour_of_day": 19,
    "typical_popularity": 55,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 4,
    "hour_of_day": 20,
    "typical_popularity": 50,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 4,
    "hour_of_day": 21,
    "typical_popularity": 45,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 4,
    "hour_of_day": 22,
    "typical_popularity": 38,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 5,
    "hour_of_day": 8,
    "typical_popularity": 8,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 5,
    "hour_of_day": 9,
    "typical_popularity": 16,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 5,
    "hour_of_day": 10,
    "typical_popularity": 28,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 5,
    "hour_of_day": 11,
    "typical_popularity": 38,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 5,
    "hour_of_day": 12,
    "typical_popularity": 42,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 5,
    "hour_of_day": 13,
    "typical_popularity": 45,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 5,
    "hour_of_day": 14,
    "typical_popularity": 55,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 5,
    "hour_of_day": 15,
    "typical_popularity": 60,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 5,
    "hour_of_day": 16,
    "typical_popularity": 52,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 5,
    "hour_of_day": 17,
    "typical_popularity": 40,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 5,
    "hour_of_day": 18,
    "typical_popularity": 30,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 5,
    "hour_of_day": 19,
    "typical_popularity": 22,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 5,
    "hour_of_day": 20,
    "typical_popularity": 15,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 5,
    "hour_of_day": 21,
    "typical_popularity": 10,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000b",
    "day_of_week": 5,
    "hour_of_day": 22,
    "typical_popularity": 6,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 1,
    "hour_of_day": 8,
    "typical_popularity": 10,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 1,
    "hour_of_day": 9,
    "typical_popularity": 48,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 1,
    "hour_of_day": 10,
    "typical_popularity": 35,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 1,
    "hour_of_day": 11,
    "typical_popularity": 60,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 1,
    "hour_of_day": 12,
    "typical_popularity": 42,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 1,
    "hour_of_day": 13,
    "typical_popularity": 38,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 1,
    "hour_of_day": 14,
    "typical_popularity": 55,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 1,
    "hour_of_day": 15,
    "typical_popularity": 40,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 1,
    "hour_of_day": 16,
    "typical_popularity": 28,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 1,
    "hour_of_day": 17,
    "typical_popularity": 18,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 1,
    "hour_of_day": 18,
    "typical_popularity": 10,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 1,
    "hour_of_day": 19,
    "typical_popularity": 5,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 2,
    "hour_of_day": 8,
    "typical_popularity": 12,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 2,
    "hour_of_day": 9,
    "typical_popularity": 50,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 2,
    "hour_of_day": 10,
    "typical_popularity": 38,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 2,
    "hour_of_day": 11,
    "typical_popularity": 63,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 2,
    "hour_of_day": 12,
    "typical_popularity": 45,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 2,
    "hour_of_day": 13,
    "typical_popularity": 40,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 2,
    "hour_of_day": 14,
    "typical_popularity": 58,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 2,
    "hour_of_day": 15,
    "typical_popularity": 42,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 2,
    "hour_of_day": 16,
    "typical_popularity": 30,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 2,
    "hour_of_day": 17,
    "typical_popularity": 20,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 2,
    "hour_of_day": 18,
    "typical_popularity": 12,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 2,
    "hour_of_day": 19,
    "typical_popularity": 6,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 3,
    "hour_of_day": 8,
    "typical_popularity": 14,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 3,
    "hour_of_day": 9,
    "typical_popularity": 54,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 3,
    "hour_of_day": 10,
    "typical_popularity": 40,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 3,
    "hour_of_day": 11,
    "typical_popularity": 66,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 3,
    "hour_of_day": 12,
    "typical_popularity": 48,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 3,
    "hour_of_day": 13,
    "typical_popularity": 44,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 3,
    "hour_of_day": 14,
    "typical_popularity": 62,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 3,
    "hour_of_day": 15,
    "typical_popularity": 45,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 3,
    "hour_of_day": 16,
    "typical_popularity": 32,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 3,
    "hour_of_day": 17,
    "typical_popularity": 22,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 3,
    "hour_of_day": 18,
    "typical_popularity": 14,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 3,
    "hour_of_day": 19,
    "typical_popularity": 7,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 4,
    "hour_of_day": 8,
    "typical_popularity": 11,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 4,
    "hour_of_day": 9,
    "typical_popularity": 47,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 4,
    "hour_of_day": 10,
    "typical_popularity": 34,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 4,
    "hour_of_day": 11,
    "typical_popularity": 58,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 4,
    "hour_of_day": 12,
    "typical_popularity": 40,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 4,
    "hour_of_day": 13,
    "typical_popularity": 36,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 4,
    "hour_of_day": 14,
    "typical_popularity": 52,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 4,
    "hour_of_day": 15,
    "typical_popularity": 38,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 4,
    "hour_of_day": 16,
    "typical_popularity": 26,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 4,
    "hour_of_day": 17,
    "typical_popularity": 16,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 4,
    "hour_of_day": 18,
    "typical_popularity": 8,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 4,
    "hour_of_day": 19,
    "typical_popularity": 4,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 5,
    "hour_of_day": 8,
    "typical_popularity": 8,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 5,
    "hour_of_day": 9,
    "typical_popularity": 40,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 5,
    "hour_of_day": 10,
    "typical_popularity": 50,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 5,
    "hour_of_day": 11,
    "typical_popularity": 42,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 5,
    "hour_of_day": 12,
    "typical_popularity": 30,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 5,
    "hour_of_day": 13,
    "typical_popularity": 20,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 5,
    "hour_of_day": 14,
    "typical_popularity": 14,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 5,
    "hour_of_day": 15,
    "typical_popularity": 10,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 5,
    "hour_of_day": 16,
    "typical_popularity": 6,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000c",
    "day_of_week": 5,
    "hour_of_day": 17,
    "typical_popularity": 4,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 1,
    "hour_of_day": 8,
    "typical_popularity": 8,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 1,
    "hour_of_day": 9,
    "typical_popularity": 38,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 1,
    "hour_of_day": 10,
    "typical_popularity": 55,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 1,
    "hour_of_day": 11,
    "typical_popularity": 48,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 1,
    "hour_of_day": 12,
    "typical_popularity": 40,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 1,
    "hour_of_day": 13,
    "typical_popularity": 35,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 1,
    "hour_of_day": 14,
    "typical_popularity": 50,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 1,
    "hour_of_day": 15,
    "typical_popularity": 42,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 1,
    "hour_of_day": 16,
    "typical_popularity": 30,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 1,
    "hour_of_day": 17,
    "typical_popularity": 18,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 1,
    "hour_of_day": 18,
    "typical_popularity": 10,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 1,
    "hour_of_day": 19,
    "typical_popularity": 5,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 2,
    "hour_of_day": 8,
    "typical_popularity": 10,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 2,
    "hour_of_day": 9,
    "typical_popularity": 40,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 2,
    "hour_of_day": 10,
    "typical_popularity": 58,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 2,
    "hour_of_day": 11,
    "typical_popularity": 50,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 2,
    "hour_of_day": 12,
    "typical_popularity": 42,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 2,
    "hour_of_day": 13,
    "typical_popularity": 38,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 2,
    "hour_of_day": 14,
    "typical_popularity": 52,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 2,
    "hour_of_day": 15,
    "typical_popularity": 44,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 2,
    "hour_of_day": 16,
    "typical_popularity": 32,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 2,
    "hour_of_day": 17,
    "typical_popularity": 20,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 2,
    "hour_of_day": 18,
    "typical_popularity": 12,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 2,
    "hour_of_day": 19,
    "typical_popularity": 6,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 3,
    "hour_of_day": 8,
    "typical_popularity": 12,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 3,
    "hour_of_day": 9,
    "typical_popularity": 44,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 3,
    "hour_of_day": 10,
    "typical_popularity": 60,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 3,
    "hour_of_day": 11,
    "typical_popularity": 54,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 3,
    "hour_of_day": 12,
    "typical_popularity": 45,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 3,
    "hour_of_day": 13,
    "typical_popularity": 40,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 3,
    "hour_of_day": 14,
    "typical_popularity": 55,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 3,
    "hour_of_day": 15,
    "typical_popularity": 46,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 3,
    "hour_of_day": 16,
    "typical_popularity": 34,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 3,
    "hour_of_day": 17,
    "typical_popularity": 22,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 3,
    "hour_of_day": 18,
    "typical_popularity": 14,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 3,
    "hour_of_day": 19,
    "typical_popularity": 7,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 4,
    "hour_of_day": 8,
    "typical_popularity": 9,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 4,
    "hour_of_day": 9,
    "typical_popularity": 36,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 4,
    "hour_of_day": 10,
    "typical_popularity": 52,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 4,
    "hour_of_day": 11,
    "typical_popularity": 46,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 4,
    "hour_of_day": 12,
    "typical_popularity": 38,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 4,
    "hour_of_day": 13,
    "typical_popularity": 34,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 4,
    "hour_of_day": 14,
    "typical_popularity": 48,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 4,
    "hour_of_day": 15,
    "typical_popularity": 40,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 4,
    "hour_of_day": 16,
    "typical_popularity": 28,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 4,
    "hour_of_day": 17,
    "typical_popularity": 16,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 4,
    "hour_of_day": 18,
    "typical_popularity": 8,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 4,
    "hour_of_day": 19,
    "typical_popularity": 4,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 5,
    "hour_of_day": 8,
    "typical_popularity": 6,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 5,
    "hour_of_day": 9,
    "typical_popularity": 30,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 5,
    "hour_of_day": 10,
    "typical_popularity": 45,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 5,
    "hour_of_day": 11,
    "typical_popularity": 38,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 5,
    "hour_of_day": 12,
    "typical_popularity": 28,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 5,
    "hour_of_day": 13,
    "typical_popularity": 20,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 5,
    "hour_of_day": 14,
    "typical_popularity": 15,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 5,
    "hour_of_day": 15,
    "typical_popularity": 10,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 5,
    "hour_of_day": 16,
    "typical_popularity": 6,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000d",
    "day_of_week": 5,
    "hour_of_day": 17,
    "typical_popularity": 4,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 1,
    "hour_of_day": 8,
    "typical_popularity": 15,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 1,
    "hour_of_day": 9,
    "typical_popularity": 60,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 1,
    "hour_of_day": 10,
    "typical_popularity": 75,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 1,
    "hour_of_day": 11,
    "typical_popularity": 70,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 1,
    "hour_of_day": 12,
    "typical_popularity": 55,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 1,
    "hour_of_day": 13,
    "typical_popularity": 48,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 1,
    "hour_of_day": 14,
    "typical_popularity": 58,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 1,
    "hour_of_day": 15,
    "typical_popularity": 45,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 1,
    "hour_of_day": 16,
    "typical_popularity": 32,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 1,
    "hour_of_day": 17,
    "typical_popularity": 18,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 1,
    "hour_of_day": 18,
    "typical_popularity": 10,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 1,
    "hour_of_day": 19,
    "typical_popularity": 5,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 2,
    "hour_of_day": 8,
    "typical_popularity": 18,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 2,
    "hour_of_day": 9,
    "typical_popularity": 65,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 2,
    "hour_of_day": 10,
    "typical_popularity": 78,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 2,
    "hour_of_day": 11,
    "typical_popularity": 72,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 2,
    "hour_of_day": 12,
    "typical_popularity": 58,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 2,
    "hour_of_day": 13,
    "typical_popularity": 50,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 2,
    "hour_of_day": 14,
    "typical_popularity": 60,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 2,
    "hour_of_day": 15,
    "typical_popularity": 48,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 2,
    "hour_of_day": 16,
    "typical_popularity": 34,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 2,
    "hour_of_day": 17,
    "typical_popularity": 20,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 2,
    "hour_of_day": 18,
    "typical_popularity": 12,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 2,
    "hour_of_day": 19,
    "typical_popularity": 6,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 3,
    "hour_of_day": 8,
    "typical_popularity": 20,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 3,
    "hour_of_day": 9,
    "typical_popularity": 68,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 3,
    "hour_of_day": 10,
    "typical_popularity": 82,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 3,
    "hour_of_day": 11,
    "typical_popularity": 76,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 3,
    "hour_of_day": 12,
    "typical_popularity": 60,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 3,
    "hour_of_day": 13,
    "typical_popularity": 54,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 3,
    "hour_of_day": 14,
    "typical_popularity": 64,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 3,
    "hour_of_day": 15,
    "typical_popularity": 50,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 3,
    "hour_of_day": 16,
    "typical_popularity": 36,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 3,
    "hour_of_day": 17,
    "typical_popularity": 22,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 3,
    "hour_of_day": 18,
    "typical_popularity": 14,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 3,
    "hour_of_day": 19,
    "typical_popularity": 7,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 4,
    "hour_of_day": 8,
    "typical_popularity": 16,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 4,
    "hour_of_day": 9,
    "typical_popularity": 62,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 4,
    "hour_of_day": 10,
    "typical_popularity": 74,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 4,
    "hour_of_day": 11,
    "typical_popularity": 68,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 4,
    "hour_of_day": 12,
    "typical_popularity": 52,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 4,
    "hour_of_day": 13,
    "typical_popularity": 46,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 4,
    "hour_of_day": 14,
    "typical_popularity": 56,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 4,
    "hour_of_day": 15,
    "typical_popularity": 42,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 4,
    "hour_of_day": 16,
    "typical_popularity": 30,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 4,
    "hour_of_day": 17,
    "typical_popularity": 16,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 4,
    "hour_of_day": 18,
    "typical_popularity": 8,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 4,
    "hour_of_day": 19,
    "typical_popularity": 4,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 5,
    "hour_of_day": 8,
    "typical_popularity": 12,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 5,
    "hour_of_day": 9,
    "typical_popularity": 52,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 5,
    "hour_of_day": 10,
    "typical_popularity": 65,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 5,
    "hour_of_day": 11,
    "typical_popularity": 55,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 5,
    "hour_of_day": 12,
    "typical_popularity": 38,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 5,
    "hour_of_day": 13,
    "typical_popularity": 25,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 5,
    "hour_of_day": 14,
    "typical_popularity": 15,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 5,
    "hour_of_day": 15,
    "typical_popularity": 10,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 5,
    "hour_of_day": 16,
    "typical_popularity": 6,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000e",
    "day_of_week": 5,
    "hour_of_day": 17,
    "typical_popularity": 4,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 1,
    "hour_of_day": 8,
    "typical_popularity": 8,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 1,
    "hour_of_day": 9,
    "typical_popularity": 35,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 1,
    "hour_of_day": 10,
    "typical_popularity": 48,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 1,
    "hour_of_day": 11,
    "typical_popularity": 55,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 1,
    "hour_of_day": 12,
    "typical_popularity": 42,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 1,
    "hour_of_day": 13,
    "typical_popularity": 38,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 1,
    "hour_of_day": 14,
    "typical_popularity": 50,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 1,
    "hour_of_day": 15,
    "typical_popularity": 40,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 1,
    "hour_of_day": 16,
    "typical_popularity": 28,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 1,
    "hour_of_day": 17,
    "typical_popularity": 16,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 1,
    "hour_of_day": 18,
    "typical_popularity": 8,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 2,
    "hour_of_day": 8,
    "typical_popularity": 10,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 2,
    "hour_of_day": 9,
    "typical_popularity": 38,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 2,
    "hour_of_day": 10,
    "typical_popularity": 50,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 2,
    "hour_of_day": 11,
    "typical_popularity": 58,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 2,
    "hour_of_day": 12,
    "typical_popularity": 44,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 2,
    "hour_of_day": 13,
    "typical_popularity": 40,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 2,
    "hour_of_day": 14,
    "typical_popularity": 52,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 2,
    "hour_of_day": 15,
    "typical_popularity": 42,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 2,
    "hour_of_day": 16,
    "typical_popularity": 30,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 2,
    "hour_of_day": 17,
    "typical_popularity": 18,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 2,
    "hour_of_day": 18,
    "typical_popularity": 10,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 3,
    "hour_of_day": 8,
    "typical_popularity": 12,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 3,
    "hour_of_day": 9,
    "typical_popularity": 42,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 3,
    "hour_of_day": 10,
    "typical_popularity": 55,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 3,
    "hour_of_day": 11,
    "typical_popularity": 62,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 3,
    "hour_of_day": 12,
    "typical_popularity": 48,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 3,
    "hour_of_day": 13,
    "typical_popularity": 44,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 3,
    "hour_of_day": 14,
    "typical_popularity": 56,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 3,
    "hour_of_day": 15,
    "typical_popularity": 45,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 3,
    "hour_of_day": 16,
    "typical_popularity": 33,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 3,
    "hour_of_day": 17,
    "typical_popularity": 20,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 3,
    "hour_of_day": 18,
    "typical_popularity": 12,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 4,
    "hour_of_day": 8,
    "typical_popularity": 9,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 4,
    "hour_of_day": 9,
    "typical_popularity": 34,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 4,
    "hour_of_day": 10,
    "typical_popularity": 46,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 4,
    "hour_of_day": 11,
    "typical_popularity": 53,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 4,
    "hour_of_day": 12,
    "typical_popularity": 40,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 4,
    "hour_of_day": 13,
    "typical_popularity": 36,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 4,
    "hour_of_day": 14,
    "typical_popularity": 48,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 4,
    "hour_of_day": 15,
    "typical_popularity": 38,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 4,
    "hour_of_day": 16,
    "typical_popularity": 26,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 4,
    "hour_of_day": 17,
    "typical_popularity": 14,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 4,
    "hour_of_day": 18,
    "typical_popularity": 6,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 5,
    "hour_of_day": 8,
    "typical_popularity": 6,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 5,
    "hour_of_day": 9,
    "typical_popularity": 28,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 5,
    "hour_of_day": 10,
    "typical_popularity": 40,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 5,
    "hour_of_day": 11,
    "typical_popularity": 35,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 5,
    "hour_of_day": 12,
    "typical_popularity": 25,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 5,
    "hour_of_day": 13,
    "typical_popularity": 18,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 5,
    "hour_of_day": 14,
    "typical_popularity": 12,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 5,
    "hour_of_day": 15,
    "typical_popularity": 8,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 5,
    "hour_of_day": 16,
    "typical_popularity": 5,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-00000000000f",
    "day_of_week": 5,
    "hour_of_day": 17,
    "typical_popularity": 3,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 1,
    "hour_of_day": 8,
    "typical_popularity": 10,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 1,
    "hour_of_day": 9,
    "typical_popularity": 45,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 1,
    "hour_of_day": 10,
    "typical_popularity": 62,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 1,
    "hour_of_day": 11,
    "typical_popularity": 55,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 1,
    "hour_of_day": 12,
    "typical_popularity": 40,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 1,
    "hour_of_day": 13,
    "typical_popularity": 35,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 1,
    "hour_of_day": 14,
    "typical_popularity": 60,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 1,
    "hour_of_day": 15,
    "typical_popularity": 65,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 1,
    "hour_of_day": 16,
    "typical_popularity": 58,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 1,
    "hour_of_day": 17,
    "typical_popularity": 42,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 1,
    "hour_of_day": 18,
    "typical_popularity": 20,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 1,
    "hour_of_day": 19,
    "typical_popularity": 10,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 1,
    "hour_of_day": 20,
    "typical_popularity": 5,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 2,
    "hour_of_day": 8,
    "typical_popularity": 12,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 2,
    "hour_of_day": 9,
    "typical_popularity": 48,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 2,
    "hour_of_day": 10,
    "typical_popularity": 65,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 2,
    "hour_of_day": 11,
    "typical_popularity": 58,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 2,
    "hour_of_day": 12,
    "typical_popularity": 42,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 2,
    "hour_of_day": 13,
    "typical_popularity": 38,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 2,
    "hour_of_day": 14,
    "typical_popularity": 63,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 2,
    "hour_of_day": 15,
    "typical_popularity": 68,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 2,
    "hour_of_day": 16,
    "typical_popularity": 60,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 2,
    "hour_of_day": 17,
    "typical_popularity": 44,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 2,
    "hour_of_day": 18,
    "typical_popularity": 22,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 2,
    "hour_of_day": 19,
    "typical_popularity": 12,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 2,
    "hour_of_day": 20,
    "typical_popularity": 6,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 3,
    "hour_of_day": 8,
    "typical_popularity": 14,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 3,
    "hour_of_day": 9,
    "typical_popularity": 50,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 3,
    "hour_of_day": 10,
    "typical_popularity": 68,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 3,
    "hour_of_day": 11,
    "typical_popularity": 62,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 3,
    "hour_of_day": 12,
    "typical_popularity": 46,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 3,
    "hour_of_day": 13,
    "typical_popularity": 42,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 3,
    "hour_of_day": 14,
    "typical_popularity": 66,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 3,
    "hour_of_day": 15,
    "typical_popularity": 72,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 3,
    "hour_of_day": 16,
    "typical_popularity": 64,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 3,
    "hour_of_day": 17,
    "typical_popularity": 48,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 3,
    "hour_of_day": 18,
    "typical_popularity": 24,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 3,
    "hour_of_day": 19,
    "typical_popularity": 14,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 3,
    "hour_of_day": 20,
    "typical_popularity": 7,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 4,
    "hour_of_day": 8,
    "typical_popularity": 11,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 4,
    "hour_of_day": 9,
    "typical_popularity": 44,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 4,
    "hour_of_day": 10,
    "typical_popularity": 60,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 4,
    "hour_of_day": 11,
    "typical_popularity": 54,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 4,
    "hour_of_day": 12,
    "typical_popularity": 38,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 4,
    "hour_of_day": 13,
    "typical_popularity": 34,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 4,
    "hour_of_day": 14,
    "typical_popularity": 58,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 4,
    "hour_of_day": 15,
    "typical_popularity": 62,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 4,
    "hour_of_day": 16,
    "typical_popularity": 55,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 4,
    "hour_of_day": 17,
    "typical_popularity": 40,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 4,
    "hour_of_day": 18,
    "typical_popularity": 18,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 4,
    "hour_of_day": 19,
    "typical_popularity": 8,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 4,
    "hour_of_day": 20,
    "typical_popularity": 4,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 5,
    "hour_of_day": 8,
    "typical_popularity": 8,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 5,
    "hour_of_day": 9,
    "typical_popularity": 38,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 5,
    "hour_of_day": 10,
    "typical_popularity": 52,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 5,
    "hour_of_day": 11,
    "typical_popularity": 45,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 5,
    "hour_of_day": 12,
    "typical_popularity": 32,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 5,
    "hour_of_day": 13,
    "typical_popularity": 22,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 5,
    "hour_of_day": 14,
    "typical_popularity": 15,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 5,
    "hour_of_day": 15,
    "typical_popularity": 10,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 5,
    "hour_of_day": 16,
    "typical_popularity": 6,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000010",
    "day_of_week": 5,
    "hour_of_day": 17,
    "typical_popularity": 4,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 1,
    "hour_of_day": 8,
    "typical_popularity": 10,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 1,
    "hour_of_day": 9,
    "typical_popularity": 28,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 1,
    "hour_of_day": 10,
    "typical_popularity": 45,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 1,
    "hour_of_day": 11,
    "typical_popularity": 55,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 1,
    "hour_of_day": 12,
    "typical_popularity": 52,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 1,
    "hour_of_day": 13,
    "typical_popularity": 48,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 1,
    "hour_of_day": 14,
    "typical_popularity": 50,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 1,
    "hour_of_day": 15,
    "typical_popularity": 46,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 1,
    "hour_of_day": 16,
    "typical_popularity": 38,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 1,
    "hour_of_day": 17,
    "typical_popularity": 28,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 1,
    "hour_of_day": 18,
    "typical_popularity": 15,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 1,
    "hour_of_day": 19,
    "typical_popularity": 8,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 2,
    "hour_of_day": 8,
    "typical_popularity": 12,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 2,
    "hour_of_day": 9,
    "typical_popularity": 30,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 2,
    "hour_of_day": 10,
    "typical_popularity": 48,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 2,
    "hour_of_day": 11,
    "typical_popularity": 58,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 2,
    "hour_of_day": 12,
    "typical_popularity": 54,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 2,
    "hour_of_day": 13,
    "typical_popularity": 50,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 2,
    "hour_of_day": 14,
    "typical_popularity": 52,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 2,
    "hour_of_day": 15,
    "typical_popularity": 48,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 2,
    "hour_of_day": 16,
    "typical_popularity": 40,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 2,
    "hour_of_day": 17,
    "typical_popularity": 30,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 2,
    "hour_of_day": 18,
    "typical_popularity": 17,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 2,
    "hour_of_day": 19,
    "typical_popularity": 9,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 3,
    "hour_of_day": 8,
    "typical_popularity": 14,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 3,
    "hour_of_day": 9,
    "typical_popularity": 34,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 3,
    "hour_of_day": 10,
    "typical_popularity": 52,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 3,
    "hour_of_day": 11,
    "typical_popularity": 62,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 3,
    "hour_of_day": 12,
    "typical_popularity": 58,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 3,
    "hour_of_day": 13,
    "typical_popularity": 54,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 3,
    "hour_of_day": 14,
    "typical_popularity": 56,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 3,
    "hour_of_day": 15,
    "typical_popularity": 50,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 3,
    "hour_of_day": 16,
    "typical_popularity": 42,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 3,
    "hour_of_day": 17,
    "typical_popularity": 32,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 3,
    "hour_of_day": 18,
    "typical_popularity": 18,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 3,
    "hour_of_day": 19,
    "typical_popularity": 10,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 4,
    "hour_of_day": 8,
    "typical_popularity": 11,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 4,
    "hour_of_day": 9,
    "typical_popularity": 28,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 4,
    "hour_of_day": 10,
    "typical_popularity": 44,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 4,
    "hour_of_day": 11,
    "typical_popularity": 54,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 4,
    "hour_of_day": 12,
    "typical_popularity": 50,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 4,
    "hour_of_day": 13,
    "typical_popularity": 46,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 4,
    "hour_of_day": 14,
    "typical_popularity": 48,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 4,
    "hour_of_day": 15,
    "typical_popularity": 44,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 4,
    "hour_of_day": 16,
    "typical_popularity": 36,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 4,
    "hour_of_day": 17,
    "typical_popularity": 26,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 4,
    "hour_of_day": 18,
    "typical_popularity": 14,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 4,
    "hour_of_day": 19,
    "typical_popularity": 7,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 5,
    "hour_of_day": 8,
    "typical_popularity": 8,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 5,
    "hour_of_day": 9,
    "typical_popularity": 22,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 5,
    "hour_of_day": 10,
    "typical_popularity": 38,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 5,
    "hour_of_day": 11,
    "typical_popularity": 45,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 5,
    "hour_of_day": 12,
    "typical_popularity": 40,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 5,
    "hour_of_day": 13,
    "typical_popularity": 32,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 5,
    "hour_of_day": 14,
    "typical_popularity": 25,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 5,
    "hour_of_day": 15,
    "typical_popularity": 18,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 5,
    "hour_of_day": 16,
    "typical_popularity": 12,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000011",
    "day_of_week": 5,
    "hour_of_day": 17,
    "typical_popularity": 6,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 1,
    "hour_of_day": 8,
    "typical_popularity": 15,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 1,
    "hour_of_day": 9,
    "typical_popularity": 58,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 1,
    "hour_of_day": 10,
    "typical_popularity": 78,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 1,
    "hour_of_day": 11,
    "typical_popularity": 72,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 1,
    "hour_of_day": 12,
    "typical_popularity": 60,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 1,
    "hour_of_day": 13,
    "typical_popularity": 55,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 1,
    "hour_of_day": 14,
    "typical_popularity": 70,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 1,
    "hour_of_day": 15,
    "typical_popularity": 62,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 1,
    "hour_of_day": 16,
    "typical_popularity": 48,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 1,
    "hour_of_day": 17,
    "typical_popularity": 30,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 1,
    "hour_of_day": 18,
    "typical_popularity": 18,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 1,
    "hour_of_day": 19,
    "typical_popularity": 10,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 1,
    "hour_of_day": 20,
    "typical_popularity": 5,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 2,
    "hour_of_day": 8,
    "typical_popularity": 18,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 2,
    "hour_of_day": 9,
    "typical_popularity": 62,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 2,
    "hour_of_day": 10,
    "typical_popularity": 82,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 2,
    "hour_of_day": 11,
    "typical_popularity": 76,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 2,
    "hour_of_day": 12,
    "typical_popularity": 62,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 2,
    "hour_of_day": 13,
    "typical_popularity": 58,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 2,
    "hour_of_day": 14,
    "typical_popularity": 74,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 2,
    "hour_of_day": 15,
    "typical_popularity": 65,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 2,
    "hour_of_day": 16,
    "typical_popularity": 50,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 2,
    "hour_of_day": 17,
    "typical_popularity": 32,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 2,
    "hour_of_day": 18,
    "typical_popularity": 20,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 2,
    "hour_of_day": 19,
    "typical_popularity": 12,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 2,
    "hour_of_day": 20,
    "typical_popularity": 6,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 3,
    "hour_of_day": 8,
    "typical_popularity": 20,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 3,
    "hour_of_day": 9,
    "typical_popularity": 66,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 3,
    "hour_of_day": 10,
    "typical_popularity": 86,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 3,
    "hour_of_day": 11,
    "typical_popularity": 80,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 3,
    "hour_of_day": 12,
    "typical_popularity": 66,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 3,
    "hour_of_day": 13,
    "typical_popularity": 60,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 3,
    "hour_of_day": 14,
    "typical_popularity": 78,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 3,
    "hour_of_day": 15,
    "typical_popularity": 68,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 3,
    "hour_of_day": 16,
    "typical_popularity": 52,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 3,
    "hour_of_day": 17,
    "typical_popularity": 35,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 3,
    "hour_of_day": 18,
    "typical_popularity": 22,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 3,
    "hour_of_day": 19,
    "typical_popularity": 14,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 3,
    "hour_of_day": 20,
    "typical_popularity": 7,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 4,
    "hour_of_day": 8,
    "typical_popularity": 16,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 4,
    "hour_of_day": 9,
    "typical_popularity": 56,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 4,
    "hour_of_day": 10,
    "typical_popularity": 76,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 4,
    "hour_of_day": 11,
    "typical_popularity": 70,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 4,
    "hour_of_day": 12,
    "typical_popularity": 58,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 4,
    "hour_of_day": 13,
    "typical_popularity": 52,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 4,
    "hour_of_day": 14,
    "typical_popularity": 68,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 4,
    "hour_of_day": 15,
    "typical_popularity": 58,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 4,
    "hour_of_day": 16,
    "typical_popularity": 44,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 4,
    "hour_of_day": 17,
    "typical_popularity": 28,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 4,
    "hour_of_day": 18,
    "typical_popularity": 16,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 4,
    "hour_of_day": 19,
    "typical_popularity": 8,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 4,
    "hour_of_day": 20,
    "typical_popularity": 4,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 5,
    "hour_of_day": 8,
    "typical_popularity": 12,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 5,
    "hour_of_day": 9,
    "typical_popularity": 48,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 5,
    "hour_of_day": 10,
    "typical_popularity": 65,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 5,
    "hour_of_day": 11,
    "typical_popularity": 58,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 5,
    "hour_of_day": 12,
    "typical_popularity": 42,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 5,
    "hour_of_day": 13,
    "typical_popularity": 32,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 5,
    "hour_of_day": 14,
    "typical_popularity": 22,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 5,
    "hour_of_day": 15,
    "typical_popularity": 15,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 5,
    "hour_of_day": 16,
    "typical_popularity": 10,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 5,
    "hour_of_day": 17,
    "typical_popularity": 6,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 6,
    "hour_of_day": 9,
    "typical_popularity": 5,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 6,
    "hour_of_day": 10,
    "typical_popularity": 15,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 6,
    "hour_of_day": 11,
    "typical_popularity": 25,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 6,
    "hour_of_day": 12,
    "typical_popularity": 30,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 6,
    "hour_of_day": 13,
    "typical_popularity": 28,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 6,
    "hour_of_day": 14,
    "typical_popularity": 22,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 6,
    "hour_of_day": 15,
    "typical_popularity": 15,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000012",
    "day_of_week": 6,
    "hour_of_day": 16,
    "typical_popularity": 8,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 1,
    "hour_of_day": 8,
    "typical_popularity": 12,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 1,
    "hour_of_day": 9,
    "typical_popularity": 25,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 1,
    "hour_of_day": 10,
    "typical_popularity": 38,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 1,
    "hour_of_day": 11,
    "typical_popularity": 55,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 1,
    "hour_of_day": 12,
    "typical_popularity": 82,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 1,
    "hour_of_day": 13,
    "typical_popularity": 78,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 1,
    "hour_of_day": 14,
    "typical_popularity": 55,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 1,
    "hour_of_day": 15,
    "typical_popularity": 45,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 1,
    "hour_of_day": 16,
    "typical_popularity": 38,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 1,
    "hour_of_day": 17,
    "typical_popularity": 30,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 1,
    "hour_of_day": 18,
    "typical_popularity": 20,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 1,
    "hour_of_day": 19,
    "typical_popularity": 10,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 2,
    "hour_of_day": 8,
    "typical_popularity": 14,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 2,
    "hour_of_day": 9,
    "typical_popularity": 28,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 2,
    "hour_of_day": 10,
    "typical_popularity": 40,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 2,
    "hour_of_day": 11,
    "typical_popularity": 58,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 2,
    "hour_of_day": 12,
    "typical_popularity": 85,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 2,
    "hour_of_day": 13,
    "typical_popularity": 80,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 2,
    "hour_of_day": 14,
    "typical_popularity": 58,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 2,
    "hour_of_day": 15,
    "typical_popularity": 48,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 2,
    "hour_of_day": 16,
    "typical_popularity": 40,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 2,
    "hour_of_day": 17,
    "typical_popularity": 32,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 2,
    "hour_of_day": 18,
    "typical_popularity": 22,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 2,
    "hour_of_day": 19,
    "typical_popularity": 12,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 3,
    "hour_of_day": 8,
    "typical_popularity": 16,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 3,
    "hour_of_day": 9,
    "typical_popularity": 30,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 3,
    "hour_of_day": 10,
    "typical_popularity": 44,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 3,
    "hour_of_day": 11,
    "typical_popularity": 62,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 3,
    "hour_of_day": 12,
    "typical_popularity": 90,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 3,
    "hour_of_day": 13,
    "typical_popularity": 84,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 3,
    "hour_of_day": 14,
    "typical_popularity": 60,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 3,
    "hour_of_day": 15,
    "typical_popularity": 50,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 3,
    "hour_of_day": 16,
    "typical_popularity": 42,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 3,
    "hour_of_day": 17,
    "typical_popularity": 34,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 3,
    "hour_of_day": 18,
    "typical_popularity": 24,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 3,
    "hour_of_day": 19,
    "typical_popularity": 14,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 4,
    "hour_of_day": 8,
    "typical_popularity": 13,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 4,
    "hour_of_day": 9,
    "typical_popularity": 26,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 4,
    "hour_of_day": 10,
    "typical_popularity": 38,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 4,
    "hour_of_day": 11,
    "typical_popularity": 54,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 4,
    "hour_of_day": 12,
    "typical_popularity": 80,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 4,
    "hour_of_day": 13,
    "typical_popularity": 76,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 4,
    "hour_of_day": 14,
    "typical_popularity": 53,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 4,
    "hour_of_day": 15,
    "typical_popularity": 44,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 4,
    "hour_of_day": 16,
    "typical_popularity": 36,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 4,
    "hour_of_day": 17,
    "typical_popularity": 28,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 4,
    "hour_of_day": 18,
    "typical_popularity": 18,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 4,
    "hour_of_day": 19,
    "typical_popularity": 8,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 5,
    "hour_of_day": 8,
    "typical_popularity": 10,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 5,
    "hour_of_day": 9,
    "typical_popularity": 22,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 5,
    "hour_of_day": 10,
    "typical_popularity": 35,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 5,
    "hour_of_day": 11,
    "typical_popularity": 48,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 5,
    "hour_of_day": 12,
    "typical_popularity": 72,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 5,
    "hour_of_day": 13,
    "typical_popularity": 65,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 5,
    "hour_of_day": 14,
    "typical_popularity": 42,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 5,
    "hour_of_day": 15,
    "typical_popularity": 30,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 5,
    "hour_of_day": 16,
    "typical_popularity": 20,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 5,
    "hour_of_day": 17,
    "typical_popularity": 12,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 5,
    "hour_of_day": 18,
    "typical_popularity": 6,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 5,
    "hour_of_day": 19,
    "typical_popularity": 3,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 6,
    "hour_of_day": 10,
    "typical_popularity": 8,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 6,
    "hour_of_day": 11,
    "typical_popularity": 18,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 6,
    "hour_of_day": 12,
    "typical_popularity": 35,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 6,
    "hour_of_day": 13,
    "typical_popularity": 40,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 6,
    "hour_of_day": 14,
    "typical_popularity": 35,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 6,
    "hour_of_day": 15,
    "typical_popularity": 28,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 6,
    "hour_of_day": 16,
    "typical_popularity": 20,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000013",
    "day_of_week": 6,
    "hour_of_day": 17,
    "typical_popularity": 12,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 1,
    "hour_of_day": 8,
    "typical_popularity": 10,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 1,
    "hour_of_day": 9,
    "typical_popularity": 42,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 1,
    "hour_of_day": 10,
    "typical_popularity": 58,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 1,
    "hour_of_day": 11,
    "typical_popularity": 52,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 1,
    "hour_of_day": 12,
    "typical_popularity": 40,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 1,
    "hour_of_day": 13,
    "typical_popularity": 36,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 1,
    "hour_of_day": 14,
    "typical_popularity": 55,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 1,
    "hour_of_day": 15,
    "typical_popularity": 60,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 1,
    "hour_of_day": 16,
    "typical_popularity": 52,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 1,
    "hour_of_day": 17,
    "typical_popularity": 38,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 1,
    "hour_of_day": 18,
    "typical_popularity": 20,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 1,
    "hour_of_day": 19,
    "typical_popularity": 10,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 1,
    "hour_of_day": 20,
    "typical_popularity": 5,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 2,
    "hour_of_day": 8,
    "typical_popularity": 12,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 2,
    "hour_of_day": 9,
    "typical_popularity": 45,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 2,
    "hour_of_day": 10,
    "typical_popularity": 62,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 2,
    "hour_of_day": 11,
    "typical_popularity": 55,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 2,
    "hour_of_day": 12,
    "typical_popularity": 42,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 2,
    "hour_of_day": 13,
    "typical_popularity": 38,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 2,
    "hour_of_day": 14,
    "typical_popularity": 58,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 2,
    "hour_of_day": 15,
    "typical_popularity": 64,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 2,
    "hour_of_day": 16,
    "typical_popularity": 55,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 2,
    "hour_of_day": 17,
    "typical_popularity": 40,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 2,
    "hour_of_day": 18,
    "typical_popularity": 22,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 2,
    "hour_of_day": 19,
    "typical_popularity": 12,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 2,
    "hour_of_day": 20,
    "typical_popularity": 6,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 3,
    "hour_of_day": 8,
    "typical_popularity": 14,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 3,
    "hour_of_day": 9,
    "typical_popularity": 48,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 3,
    "hour_of_day": 10,
    "typical_popularity": 66,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 3,
    "hour_of_day": 11,
    "typical_popularity": 60,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 3,
    "hour_of_day": 12,
    "typical_popularity": 46,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 3,
    "hour_of_day": 13,
    "typical_popularity": 42,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 3,
    "hour_of_day": 14,
    "typical_popularity": 62,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 3,
    "hour_of_day": 15,
    "typical_popularity": 68,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 3,
    "hour_of_day": 16,
    "typical_popularity": 58,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 3,
    "hour_of_day": 17,
    "typical_popularity": 44,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 3,
    "hour_of_day": 18,
    "typical_popularity": 25,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 3,
    "hour_of_day": 19,
    "typical_popularity": 14,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 3,
    "hour_of_day": 20,
    "typical_popularity": 7,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 4,
    "hour_of_day": 8,
    "typical_popularity": 11,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 4,
    "hour_of_day": 9,
    "typical_popularity": 40,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 4,
    "hour_of_day": 10,
    "typical_popularity": 56,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 4,
    "hour_of_day": 11,
    "typical_popularity": 50,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 4,
    "hour_of_day": 12,
    "typical_popularity": 38,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 4,
    "hour_of_day": 13,
    "typical_popularity": 34,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 4,
    "hour_of_day": 14,
    "typical_popularity": 52,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 4,
    "hour_of_day": 15,
    "typical_popularity": 58,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 4,
    "hour_of_day": 16,
    "typical_popularity": 50,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 4,
    "hour_of_day": 17,
    "typical_popularity": 36,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 4,
    "hour_of_day": 18,
    "typical_popularity": 18,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 4,
    "hour_of_day": 19,
    "typical_popularity": 8,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 4,
    "hour_of_day": 20,
    "typical_popularity": 4,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 5,
    "hour_of_day": 8,
    "typical_popularity": 8,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 5,
    "hour_of_day": 9,
    "typical_popularity": 35,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 5,
    "hour_of_day": 10,
    "typical_popularity": 50,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 5,
    "hour_of_day": 11,
    "typical_popularity": 42,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 5,
    "hour_of_day": 12,
    "typical_popularity": 30,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 5,
    "hour_of_day": 13,
    "typical_popularity": 20,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 5,
    "hour_of_day": 14,
    "typical_popularity": 14,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 5,
    "hour_of_day": 15,
    "typical_popularity": 10,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 5,
    "hour_of_day": 16,
    "typical_popularity": 6,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "building_id": "b0000000-0000-0000-0000-000000000014",
    "day_of_week": 5,
    "hour_of_day": 17,
    "typical_popularity": 4,
    "seeded_at": "2026-08-15T00:00:00.000Z"
  }
]
