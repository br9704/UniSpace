-- Seed: University of Melbourne — Parkville Campus — Additional Buildings
-- 15 additional buildings (IDs 6-20), floor zones for each, occupancy init
-- Sources: Google Maps, OpenStreetMap, UniMelb campus maps, Mapcarta

-- ============================================================
-- Buildings
-- ============================================================

-- 8. Melbourne Law School (Building 106, 185 Pelham St)
INSERT INTO buildings (
  id, campus_id, slug, name, short_name, estimated_capacity,
  entrance_lat, entrance_lng, centroid_lat, centroid_lng,
  polygon, google_place_id,
  has_wifi, has_power, has_food_nearby, has_quiet_zone,
  has_group_seating, is_ground_floor_accessible, has_elevator,
  has_accessible_bathrooms, has_accessible_parking,
  hours_mon, hours_tue, hours_wed, hours_thu, hours_fri, hours_sat, hours_sun
) VALUES (
  'b0000000-0000-0000-0000-000000000008',
  'a1b2c3d4-0000-0000-0000-000000000001',
  'law-school',
  'Melbourne Law School',
  'Law',
  400,
  -37.8025, 144.9615,
  -37.8024, 144.9617,
  '{"type":"Polygon","coordinates":[[[144.9609,-37.8019],[144.9625,-37.8019],[144.9625,-37.8030],[144.9609,-37.8030],[144.9609,-37.8019]]]}',
  NULL,
  true, true, true, true,
  true, true, true,
  true, true,
  '07:30-22:00', '07:30-22:00', '07:30-22:00', '07:30-22:00', '07:30-18:00', '09:00-17:00', null
);

-- 9. FBE Building (Building 105, 111 Barry St)
INSERT INTO buildings (
  id, campus_id, slug, name, short_name, estimated_capacity,
  entrance_lat, entrance_lng, centroid_lat, centroid_lng,
  polygon, google_place_id,
  has_wifi, has_power, has_food_nearby, has_quiet_zone,
  has_group_seating, is_ground_floor_accessible, has_elevator,
  has_accessible_bathrooms, has_accessible_parking,
  hours_mon, hours_tue, hours_wed, hours_thu, hours_fri, hours_sat, hours_sun
) VALUES (
  'b0000000-0000-0000-0000-000000000009',
  'a1b2c3d4-0000-0000-0000-000000000001',
  'fbe-building',
  'FBE Building',
  'FBE',
  350,
  -37.8014, 144.9594,
  -37.8013, 144.9595,
  '{"type":"Polygon","coordinates":[[[144.9587,-37.8008],[144.9601,-37.8008],[144.9601,-37.8019],[144.9587,-37.8019],[144.9587,-37.8008]]]}',
  'ChIJ9eRvaS1d1moRVgtCTzcGEuU',
  true, true, true, false,
  true, true, true,
  true, true,
  '07:30-21:00', '07:30-21:00', '07:30-21:00', '07:30-21:00', '07:30-18:00', null, null
);

-- 10. The Spot (Building 110, 198 Berkeley St corner Pelham St)
INSERT INTO buildings (
  id, campus_id, slug, name, short_name, estimated_capacity,
  entrance_lat, entrance_lng, centroid_lat, centroid_lng,
  polygon, google_place_id,
  has_wifi, has_power, has_food_nearby, has_quiet_zone,
  has_group_seating, is_ground_floor_accessible, has_elevator,
  has_accessible_bathrooms, has_accessible_parking,
  hours_mon, hours_tue, hours_wed, hours_thu, hours_fri, hours_sat, hours_sun
) VALUES (
  'b0000000-0000-0000-0000-00000000000a',
  'a1b2c3d4-0000-0000-0000-000000000001',
  'the-spot',
  'The Spot',
  'The Spot',
  150,
  -37.8020, 144.9580,
  -37.8019, 144.9581,
  '{"type":"Polygon","coordinates":[[[144.9574,-37.8015],[144.9588,-37.8015],[144.9588,-37.8025],[144.9574,-37.8025],[144.9574,-37.8015]]]}',
  NULL,
  true, true, true, false,
  true, true, true,
  true, false,
  '07:00-22:00', '07:00-22:00', '07:00-22:00', '07:00-22:00', '07:00-18:00', '09:00-17:00', null
);

-- 11. Melbourne School of Design — Glyn Davis Building (Building 133, Masson Rd)
INSERT INTO buildings (
  id, campus_id, slug, name, short_name, estimated_capacity,
  entrance_lat, entrance_lng, centroid_lat, centroid_lng,
  polygon, google_place_id,
  has_wifi, has_power, has_food_nearby, has_quiet_zone,
  has_group_seating, is_ground_floor_accessible, has_elevator,
  has_accessible_bathrooms, has_accessible_parking,
  hours_mon, hours_tue, hours_wed, hours_thu, hours_fri, hours_sat, hours_sun
) VALUES (
  'b0000000-0000-0000-0000-00000000000b',
  'a1b2c3d4-0000-0000-0000-000000000001',
  'melbourne-school-of-design',
  'Melbourne School of Design',
  'MSD',
  300,
  -37.7975, 144.9582,
  -37.7974, 144.9584,
  '{"type":"Polygon","coordinates":[[[144.9576,-37.7970],[144.9592,-37.7970],[144.9592,-37.7980],[144.9576,-37.7980],[144.9576,-37.7970]]]}',
  NULL,
  true, true, true, false,
  true, true, true,
  true, true,
  '07:30-21:00', '07:30-21:00', '07:30-21:00', '07:30-21:00', '07:30-18:00', null, null
);

-- 12. Kwong Lee Dow Building (Building 263, 234 Queensberry St)
INSERT INTO buildings (
  id, campus_id, slug, name, short_name, estimated_capacity,
  entrance_lat, entrance_lng, centroid_lat, centroid_lng,
  polygon, google_place_id,
  has_wifi, has_power, has_food_nearby, has_quiet_zone,
  has_group_seating, is_ground_floor_accessible, has_elevator,
  has_accessible_bathrooms, has_accessible_parking,
  hours_mon, hours_tue, hours_wed, hours_thu, hours_fri, hours_sat, hours_sun
) VALUES (
  'b0000000-0000-0000-0000-00000000000c',
  'a1b2c3d4-0000-0000-0000-000000000001',
  'kwong-lee-dow',
  'Kwong Lee Dow Building',
  'KLD',
  250,
  -37.8040, 144.9608,
  -37.8039, 144.9610,
  '{"type":"Polygon","coordinates":[[[144.9603,-37.8035],[144.9617,-37.8035],[144.9617,-37.8044],[144.9603,-37.8044],[144.9603,-37.8035]]]}',
  NULL,
  true, true, false, false,
  true, true, true,
  true, false,
  '07:30-21:00', '07:30-21:00', '07:30-21:00', '07:30-21:00', '07:30-18:00', null, null
);

-- 13. Old Arts Building (Building 149, Professors Walk, central campus)
INSERT INTO buildings (
  id, campus_id, slug, name, short_name, estimated_capacity,
  entrance_lat, entrance_lng, centroid_lat, centroid_lng,
  polygon, google_place_id,
  has_wifi, has_power, has_food_nearby, has_quiet_zone,
  has_group_seating, is_ground_floor_accessible, has_elevator,
  has_accessible_bathrooms, has_accessible_parking,
  hours_mon, hours_tue, hours_wed, hours_thu, hours_fri, hours_sat, hours_sun
) VALUES (
  'b0000000-0000-0000-0000-00000000000d',
  'a1b2c3d4-0000-0000-0000-000000000001',
  'old-arts',
  'Old Arts Building',
  'Old Arts',
  300,
  -37.7975, 144.9612,
  -37.7974, 144.9614,
  '{"type":"Polygon","coordinates":[[[144.9607,-37.7970],[144.9621,-37.7970],[144.9621,-37.7980],[144.9607,-37.7980],[144.9607,-37.7970]]]}',
  NULL,
  true, true, true, false,
  true, true, true,
  true, false,
  '07:30-21:00', '07:30-21:00', '07:30-21:00', '07:30-21:00', '07:30-18:00', null, null
);

-- 14. Redmond Barry Building (Building 115, 17 Spencer Rd)
INSERT INTO buildings (
  id, campus_id, slug, name, short_name, estimated_capacity,
  entrance_lat, entrance_lng, centroid_lat, centroid_lng,
  polygon, google_place_id,
  has_wifi, has_power, has_food_nearby, has_quiet_zone,
  has_group_seating, is_ground_floor_accessible, has_elevator,
  has_accessible_bathrooms, has_accessible_parking,
  hours_mon, hours_tue, hours_wed, hours_thu, hours_fri, hours_sat, hours_sun
) VALUES (
  'b0000000-0000-0000-0000-00000000000e',
  'a1b2c3d4-0000-0000-0000-000000000001',
  'redmond-barry',
  'Redmond Barry Building',
  'RBB',
  350,
  -37.7967, 144.9627,
  -37.7966, 144.9628,
  '{"type":"Polygon","coordinates":[[[144.9622,-37.7963],[144.9634,-37.7963],[144.9634,-37.7972],[144.9622,-37.7972],[144.9622,-37.7963]]]}',
  'ChIJC0qI6NRCd0gRr7ZEi3c93fA',
  true, true, false, false,
  true, true, true,
  true, false,
  '07:30-21:00', '07:30-21:00', '07:30-21:00', '07:30-21:00', '07:30-18:00', null, null
);

-- 15. John Medley Building (Building 191, Kernot Rd)
INSERT INTO buildings (
  id, campus_id, slug, name, short_name, estimated_capacity,
  entrance_lat, entrance_lng, centroid_lat, centroid_lng,
  polygon, google_place_id,
  has_wifi, has_power, has_food_nearby, has_quiet_zone,
  has_group_seating, is_ground_floor_accessible, has_elevator,
  has_accessible_bathrooms, has_accessible_parking,
  hours_mon, hours_tue, hours_wed, hours_thu, hours_fri, hours_sat, hours_sun
) VALUES (
  'b0000000-0000-0000-0000-00000000000f',
  'a1b2c3d4-0000-0000-0000-000000000001',
  'john-medley',
  'John Medley Building',
  'Medley',
  250,
  -37.7992, 144.9604,
  -37.7991, 144.9606,
  '{"type":"Polygon","coordinates":[[[144.9599,-37.7988],[144.9611,-37.7988],[144.9611,-37.7997],[144.9599,-37.7997],[144.9599,-37.7988]]]}',
  NULL,
  true, true, true, false,
  true, true, true,
  true, false,
  '07:30-21:00', '07:30-21:00', '07:30-21:00', '07:30-21:00', '07:30-18:00', null, null
);

-- 16. Chemistry Building (Building 153, Masson Rd)
INSERT INTO buildings (
  id, campus_id, slug, name, short_name, estimated_capacity,
  entrance_lat, entrance_lng, centroid_lat, centroid_lng,
  polygon, google_place_id,
  has_wifi, has_power, has_food_nearby, has_quiet_zone,
  has_group_seating, is_ground_floor_accessible, has_elevator,
  has_accessible_bathrooms, has_accessible_parking,
  hours_mon, hours_tue, hours_wed, hours_thu, hours_fri, hours_sat, hours_sun
) VALUES (
  'b0000000-0000-0000-0000-000000000010',
  'a1b2c3d4-0000-0000-0000-000000000001',
  'chemistry-building',
  'Chemistry Building',
  'Chem',
  300,
  -37.7975, 144.9625,
  -37.7974, 144.9627,
  '{"type":"Polygon","coordinates":[[[144.9620,-37.7970],[144.9634,-37.7970],[144.9634,-37.7980],[144.9620,-37.7980],[144.9620,-37.7970]]]}',
  NULL,
  true, true, false, false,
  true, true, true,
  true, false,
  '07:30-21:00', '07:30-21:00', '07:30-21:00', '07:30-21:00', '07:30-18:00', null, null
);

-- 17. Peter Hall Building (Building 160, Monash Rd — School of Mathematics & Statistics)
INSERT INTO buildings (
  id, campus_id, slug, name, short_name, estimated_capacity,
  entrance_lat, entrance_lng, centroid_lat, centroid_lng,
  polygon, google_place_id,
  has_wifi, has_power, has_food_nearby, has_quiet_zone,
  has_group_seating, is_ground_floor_accessible, has_elevator,
  has_accessible_bathrooms, has_accessible_parking,
  hours_mon, hours_tue, hours_wed, hours_thu, hours_fri, hours_sat, hours_sun
) VALUES (
  'b0000000-0000-0000-0000-000000000011',
  'a1b2c3d4-0000-0000-0000-000000000001',
  'peter-hall',
  'Peter Hall Building',
  'Peter Hall',
  250,
  -37.7970, 144.9637,
  -37.7969, 144.9638,
  '{"type":"Polygon","coordinates":[[[144.9632,-37.7965],[144.9644,-37.7965],[144.9644,-37.7974],[144.9632,-37.7974],[144.9632,-37.7965]]]}',
  NULL,
  true, true, false, false,
  true, true, true,
  true, false,
  '07:30-21:00', '07:30-21:00', '07:30-21:00', '07:30-21:00', '07:30-18:00', null, null
);

-- 18. Alan Gilbert Building (Building 104, 161 Barry St — corner Barry & Grattan)
INSERT INTO buildings (
  id, campus_id, slug, name, short_name, estimated_capacity,
  entrance_lat, entrance_lng, centroid_lat, centroid_lng,
  polygon, google_place_id,
  has_wifi, has_power, has_food_nearby, has_quiet_zone,
  has_group_seating, is_ground_floor_accessible, has_elevator,
  has_accessible_bathrooms, has_accessible_parking,
  hours_mon, hours_tue, hours_wed, hours_thu, hours_fri, hours_sat, hours_sun
) VALUES (
  'b0000000-0000-0000-0000-000000000012',
  'a1b2c3d4-0000-0000-0000-000000000001',
  'alan-gilbert',
  'Alan Gilbert Building',
  'Alan Gilbert',
  400,
  -37.8002, 144.9596,
  -37.8001, 144.9598,
  '{"type":"Polygon","coordinates":[[[144.9590,-37.7997],[144.9606,-37.7997],[144.9606,-37.8007],[144.9590,-37.8007],[144.9590,-37.7997]]]}',
  NULL,
  true, true, true, true,
  true, true, true,
  true, true,
  '07:00-22:00', '07:00-22:00', '07:00-22:00', '07:00-22:00', '07:00-18:00', '09:00-17:00', null
);

-- 19. Student Pavilion (Building 162, Monash Rd — Student Precinct)
INSERT INTO buildings (
  id, campus_id, slug, name, short_name, estimated_capacity,
  entrance_lat, entrance_lng, centroid_lat, centroid_lng,
  polygon, google_place_id,
  has_wifi, has_power, has_food_nearby, has_quiet_zone,
  has_group_seating, is_ground_floor_accessible, has_elevator,
  has_accessible_bathrooms, has_accessible_parking,
  hours_mon, hours_tue, hours_wed, hours_thu, hours_fri, hours_sat, hours_sun
) VALUES (
  'b0000000-0000-0000-0000-000000000013',
  'a1b2c3d4-0000-0000-0000-000000000001',
  'student-pavilion',
  'Student Pavilion',
  'Student Pav',
  300,
  -37.7968, 144.9633,
  -37.7967, 144.9634,
  '{"type":"Polygon","coordinates":[[[144.9627,-37.7963],[144.9641,-37.7963],[144.9641,-37.7972],[144.9627,-37.7972],[144.9627,-37.7963]]]}',
  NULL,
  true, true, true, false,
  true, true, true,
  true, false,
  '07:00-22:00', '07:00-22:00', '07:00-22:00', '07:00-22:00', '07:00-18:00', '09:00-17:00', null
);

-- 20. David Caro Building (Building 192, Tin Alley / Swanston St — School of Physics)
INSERT INTO buildings (
  id, campus_id, slug, name, short_name, estimated_capacity,
  entrance_lat, entrance_lng, centroid_lat, centroid_lng,
  polygon, google_place_id,
  has_wifi, has_power, has_food_nearby, has_quiet_zone,
  has_group_seating, is_ground_floor_accessible, has_elevator,
  has_accessible_bathrooms, has_accessible_parking,
  hours_mon, hours_tue, hours_wed, hours_thu, hours_fri, hours_sat, hours_sun
) VALUES (
  'b0000000-0000-0000-0000-000000000014',
  'a1b2c3d4-0000-0000-0000-000000000001',
  'david-caro',
  'David Caro Building',
  'Physics',
  300,
  -37.7975, 144.9640,
  -37.7974, 144.9642,
  '{"type":"Polygon","coordinates":[[[144.9635,-37.7970],[144.9649,-37.7970],[144.9649,-37.7980],[144.9635,-37.7980],[144.9635,-37.7970]]]}',
  NULL,
  true, true, false, false,
  true, true, true,
  true, false,
  '07:30-21:00', '07:30-21:00', '07:30-21:00', '07:30-21:00', '07:30-18:00', null, null
);

-- ============================================================
-- Building Zones (floor-level)
-- Each building gets 2-3 zones per floor with approximate polygons
-- Zone UUID pattern: c0000000-0000-0000-{zone_group}-00000000000{zone_num}
-- ============================================================

-- Melbourne Law School — 3 floors
INSERT INTO building_zones (id, building_id, zone_slug, zone_name, polygon, capacity, floor_level, is_quiet_zone, has_power, is_accessible) VALUES
  ('c0000000-0000-0000-0008-000000000001', 'b0000000-0000-0000-0000-000000000008', 'law-ground', 'Ground Floor', '{"type":"Polygon","coordinates":[[[144.9609,-37.8019],[144.9625,-37.8019],[144.9625,-37.8030],[144.9609,-37.8030],[144.9609,-37.8019]]]}', 130, 0, false, true, true),
  ('c0000000-0000-0000-0008-000000000002', 'b0000000-0000-0000-0000-000000000008', 'law-level1', 'Level 1', '{"type":"Polygon","coordinates":[[[144.9609,-37.8019],[144.9625,-37.8019],[144.9625,-37.8030],[144.9609,-37.8030],[144.9609,-37.8019]]]}', 140, 1, false, true, true),
  ('c0000000-0000-0000-0008-000000000003', 'b0000000-0000-0000-0000-000000000008', 'law-level2', 'Level 2 — Law Library', '{"type":"Polygon","coordinates":[[[144.9609,-37.8019],[144.9625,-37.8019],[144.9625,-37.8030],[144.9609,-37.8030],[144.9609,-37.8019]]]}', 130, 2, true, true, true);

-- FBE Building — 3 floors
INSERT INTO building_zones (id, building_id, zone_slug, zone_name, polygon, capacity, floor_level, is_quiet_zone, has_power, is_accessible) VALUES
  ('c0000000-0000-0000-0009-000000000001', 'b0000000-0000-0000-0000-000000000009', 'fbe-ground', 'Ground Floor', '{"type":"Polygon","coordinates":[[[144.9587,-37.8008],[144.9601,-37.8008],[144.9601,-37.8019],[144.9587,-37.8019],[144.9587,-37.8008]]]}', 120, 0, false, true, true),
  ('c0000000-0000-0000-0009-000000000002', 'b0000000-0000-0000-0000-000000000009', 'fbe-level1', 'Level 1', '{"type":"Polygon","coordinates":[[[144.9587,-37.8008],[144.9601,-37.8008],[144.9601,-37.8019],[144.9587,-37.8019],[144.9587,-37.8008]]]}', 120, 1, false, true, true),
  ('c0000000-0000-0000-0009-000000000003', 'b0000000-0000-0000-0000-000000000009', 'fbe-level2', 'Level 2', '{"type":"Polygon","coordinates":[[[144.9587,-37.8008],[144.9601,-37.8008],[144.9601,-37.8019],[144.9587,-37.8019],[144.9587,-37.8008]]]}', 110, 2, false, true, true);

-- The Spot — 2 floors
INSERT INTO building_zones (id, building_id, zone_slug, zone_name, polygon, capacity, floor_level, is_quiet_zone, has_power, is_accessible) VALUES
  ('c0000000-0000-0000-000a-000000000001', 'b0000000-0000-0000-0000-00000000000a', 'the-spot-ground', 'Ground Floor — Cafe & Study', '{"type":"Polygon","coordinates":[[[144.9574,-37.8015],[144.9588,-37.8015],[144.9588,-37.8025],[144.9574,-37.8025],[144.9574,-37.8015]]]}', 80, 0, false, true, true),
  ('c0000000-0000-0000-000a-000000000002', 'b0000000-0000-0000-0000-00000000000a', 'the-spot-level1', 'Level 1 — Study Space', '{"type":"Polygon","coordinates":[[[144.9574,-37.8015],[144.9588,-37.8015],[144.9588,-37.8025],[144.9574,-37.8025],[144.9574,-37.8015]]]}', 70, 1, false, true, true);

-- Melbourne School of Design — 3 floors
INSERT INTO building_zones (id, building_id, zone_slug, zone_name, polygon, capacity, floor_level, is_quiet_zone, has_power, is_accessible) VALUES
  ('c0000000-0000-0000-000b-000000000001', 'b0000000-0000-0000-0000-00000000000b', 'msd-ground', 'Ground Floor — Gallery', '{"type":"Polygon","coordinates":[[[144.9576,-37.7970],[144.9592,-37.7970],[144.9592,-37.7980],[144.9576,-37.7980],[144.9576,-37.7970]]]}', 100, 0, false, true, true),
  ('c0000000-0000-0000-000b-000000000002', 'b0000000-0000-0000-0000-00000000000b', 'msd-level1', 'Level 1 — Studios', '{"type":"Polygon","coordinates":[[[144.9576,-37.7970],[144.9592,-37.7970],[144.9592,-37.7980],[144.9576,-37.7980],[144.9576,-37.7970]]]}', 100, 1, false, true, true),
  ('c0000000-0000-0000-000b-000000000003', 'b0000000-0000-0000-0000-00000000000b', 'msd-level2', 'Level 2 — Crit Spaces', '{"type":"Polygon","coordinates":[[[144.9576,-37.7970],[144.9592,-37.7970],[144.9592,-37.7980],[144.9576,-37.7980],[144.9576,-37.7970]]]}', 100, 2, false, true, true);

-- Kwong Lee Dow Building — 3 floors
INSERT INTO building_zones (id, building_id, zone_slug, zone_name, polygon, capacity, floor_level, is_quiet_zone, has_power, is_accessible) VALUES
  ('c0000000-0000-0000-000c-000000000001', 'b0000000-0000-0000-0000-00000000000c', 'kld-ground', 'Ground Floor', '{"type":"Polygon","coordinates":[[[144.9603,-37.8035],[144.9617,-37.8035],[144.9617,-37.8044],[144.9603,-37.8044],[144.9603,-37.8035]]]}', 80, 0, false, true, true),
  ('c0000000-0000-0000-000c-000000000002', 'b0000000-0000-0000-0000-00000000000c', 'kld-level1', 'Level 1', '{"type":"Polygon","coordinates":[[[144.9603,-37.8035],[144.9617,-37.8035],[144.9617,-37.8044],[144.9603,-37.8044],[144.9603,-37.8035]]]}', 90, 1, false, true, true),
  ('c0000000-0000-0000-000c-000000000003', 'b0000000-0000-0000-0000-00000000000c', 'kld-level2', 'Level 2 — Lecture Theatre', '{"type":"Polygon","coordinates":[[[144.9603,-37.8035],[144.9617,-37.8035],[144.9617,-37.8044],[144.9603,-37.8044],[144.9603,-37.8035]]]}', 80, 2, false, true, true);

-- Old Arts Building — 2 floors
INSERT INTO building_zones (id, building_id, zone_slug, zone_name, polygon, capacity, floor_level, is_quiet_zone, has_power, is_accessible) VALUES
  ('c0000000-0000-0000-000d-000000000001', 'b0000000-0000-0000-0000-00000000000d', 'old-arts-ground', 'Ground Floor', '{"type":"Polygon","coordinates":[[[144.9607,-37.7970],[144.9621,-37.7970],[144.9621,-37.7980],[144.9607,-37.7980],[144.9607,-37.7970]]]}', 150, 0, false, true, true),
  ('c0000000-0000-0000-000d-000000000002', 'b0000000-0000-0000-0000-00000000000d', 'old-arts-level1', 'Level 1', '{"type":"Polygon","coordinates":[[[144.9607,-37.7970],[144.9621,-37.7970],[144.9621,-37.7980],[144.9607,-37.7980],[144.9607,-37.7970]]]}', 150, 1, false, true, true);

-- Redmond Barry Building — 3 floors
INSERT INTO building_zones (id, building_id, zone_slug, zone_name, polygon, capacity, floor_level, is_quiet_zone, has_power, is_accessible) VALUES
  ('c0000000-0000-0000-000e-000000000001', 'b0000000-0000-0000-0000-00000000000e', 'rbb-ground', 'Ground Floor', '{"type":"Polygon","coordinates":[[[144.9622,-37.7963],[144.9634,-37.7963],[144.9634,-37.7972],[144.9622,-37.7972],[144.9622,-37.7963]]]}', 120, 0, false, true, true),
  ('c0000000-0000-0000-000e-000000000002', 'b0000000-0000-0000-0000-00000000000e', 'rbb-level1', 'Level 1', '{"type":"Polygon","coordinates":[[[144.9622,-37.7963],[144.9634,-37.7963],[144.9634,-37.7972],[144.9622,-37.7972],[144.9622,-37.7963]]]}', 120, 1, false, true, true),
  ('c0000000-0000-0000-000e-000000000003', 'b0000000-0000-0000-0000-00000000000e', 'rbb-level2', 'Level 2', '{"type":"Polygon","coordinates":[[[144.9622,-37.7963],[144.9634,-37.7963],[144.9634,-37.7972],[144.9622,-37.7972],[144.9622,-37.7963]]]}', 110, 2, false, true, true);

-- John Medley Building — 2 floors
INSERT INTO building_zones (id, building_id, zone_slug, zone_name, polygon, capacity, floor_level, is_quiet_zone, has_power, is_accessible) VALUES
  ('c0000000-0000-0000-000f-000000000001', 'b0000000-0000-0000-0000-00000000000f', 'medley-ground', 'Ground Floor', '{"type":"Polygon","coordinates":[[[144.9599,-37.7988],[144.9611,-37.7988],[144.9611,-37.7997],[144.9599,-37.7997],[144.9599,-37.7988]]]}', 130, 0, false, true, true),
  ('c0000000-0000-0000-000f-000000000002', 'b0000000-0000-0000-0000-00000000000f', 'medley-level1', 'Level 1', '{"type":"Polygon","coordinates":[[[144.9599,-37.7988],[144.9611,-37.7988],[144.9611,-37.7997],[144.9599,-37.7997],[144.9599,-37.7988]]]}', 120, 1, false, true, true);

-- Chemistry Building — 3 floors
INSERT INTO building_zones (id, building_id, zone_slug, zone_name, polygon, capacity, floor_level, is_quiet_zone, has_power, is_accessible) VALUES
  ('c0000000-0000-0000-0010-000000000001', 'b0000000-0000-0000-0000-000000000010', 'chem-ground', 'Ground Floor', '{"type":"Polygon","coordinates":[[[144.9620,-37.7970],[144.9634,-37.7970],[144.9634,-37.7980],[144.9620,-37.7980],[144.9620,-37.7970]]]}', 100, 0, false, true, true),
  ('c0000000-0000-0000-0010-000000000002', 'b0000000-0000-0000-0000-000000000010', 'chem-level1', 'Level 1 — Labs', '{"type":"Polygon","coordinates":[[[144.9620,-37.7970],[144.9634,-37.7970],[144.9634,-37.7980],[144.9620,-37.7980],[144.9620,-37.7970]]]}', 100, 1, false, true, true),
  ('c0000000-0000-0000-0010-000000000003', 'b0000000-0000-0000-0000-000000000010', 'chem-level2', 'Level 2 — Lecture Theatres', '{"type":"Polygon","coordinates":[[[144.9620,-37.7970],[144.9634,-37.7970],[144.9634,-37.7980],[144.9620,-37.7980],[144.9620,-37.7970]]]}', 100, 2, false, true, true);

-- Peter Hall Building — 2 floors
INSERT INTO building_zones (id, building_id, zone_slug, zone_name, polygon, capacity, floor_level, is_quiet_zone, has_power, is_accessible) VALUES
  ('c0000000-0000-0000-0011-000000000001', 'b0000000-0000-0000-0000-000000000011', 'peter-hall-ground', 'Ground Floor', '{"type":"Polygon","coordinates":[[[144.9632,-37.7965],[144.9644,-37.7965],[144.9644,-37.7974],[144.9632,-37.7974],[144.9632,-37.7965]]]}', 130, 0, false, true, true),
  ('c0000000-0000-0000-0011-000000000002', 'b0000000-0000-0000-0000-000000000011', 'peter-hall-level1', 'Level 1', '{"type":"Polygon","coordinates":[[[144.9632,-37.7965],[144.9644,-37.7965],[144.9644,-37.7974],[144.9632,-37.7974],[144.9632,-37.7965]]]}', 120, 1, false, true, true);

-- Alan Gilbert Building — 3 floors
INSERT INTO building_zones (id, building_id, zone_slug, zone_name, polygon, capacity, floor_level, is_quiet_zone, has_power, is_accessible) VALUES
  ('c0000000-0000-0000-0012-000000000001', 'b0000000-0000-0000-0000-000000000012', 'alan-gilbert-ground', 'Ground Floor — Gilbert at Grattan Cafe', '{"type":"Polygon","coordinates":[[[144.9590,-37.7997],[144.9606,-37.7997],[144.9606,-37.8007],[144.9590,-37.8007],[144.9590,-37.7997]]]}', 130, 0, false, true, true),
  ('c0000000-0000-0000-0012-000000000002', 'b0000000-0000-0000-0000-000000000012', 'alan-gilbert-level1', 'Level 1 — Learning Spaces', '{"type":"Polygon","coordinates":[[[144.9590,-37.7997],[144.9606,-37.7997],[144.9606,-37.8007],[144.9590,-37.8007],[144.9590,-37.7997]]]}', 140, 1, true, true, true),
  ('c0000000-0000-0000-0012-000000000003', 'b0000000-0000-0000-0000-000000000012', 'alan-gilbert-level2', 'Level 2', '{"type":"Polygon","coordinates":[[[144.9590,-37.7997],[144.9606,-37.7997],[144.9606,-37.8007],[144.9590,-37.8007],[144.9590,-37.7997]]]}', 130, 2, false, true, true);

-- Student Pavilion — 2 floors
INSERT INTO building_zones (id, building_id, zone_slug, zone_name, polygon, capacity, floor_level, is_quiet_zone, has_power, is_accessible) VALUES
  ('c0000000-0000-0000-0013-000000000001', 'b0000000-0000-0000-0000-000000000013', 'student-pav-ground', 'Ground Floor — Food Court & Social', '{"type":"Polygon","coordinates":[[[144.9627,-37.7963],[144.9641,-37.7963],[144.9641,-37.7972],[144.9627,-37.7972],[144.9627,-37.7963]]]}', 160, 0, false, true, true),
  ('c0000000-0000-0000-0013-000000000002', 'b0000000-0000-0000-0000-000000000013', 'student-pav-level1', 'Level 1 — Study & Events', '{"type":"Polygon","coordinates":[[[144.9627,-37.7963],[144.9641,-37.7963],[144.9641,-37.7972],[144.9627,-37.7972],[144.9627,-37.7963]]]}', 140, 1, false, true, true);

-- David Caro Building — 3 floors
INSERT INTO building_zones (id, building_id, zone_slug, zone_name, polygon, capacity, floor_level, is_quiet_zone, has_power, is_accessible) VALUES
  ('c0000000-0000-0000-0014-000000000001', 'b0000000-0000-0000-0000-000000000014', 'physics-ground', 'Ground Floor', '{"type":"Polygon","coordinates":[[[144.9635,-37.7970],[144.9649,-37.7970],[144.9649,-37.7980],[144.9635,-37.7980],[144.9635,-37.7970]]]}', 100, 0, false, true, true),
  ('c0000000-0000-0000-0014-000000000002', 'b0000000-0000-0000-0000-000000000014', 'physics-level1', 'Level 1 — Labs', '{"type":"Polygon","coordinates":[[[144.9635,-37.7970],[144.9649,-37.7970],[144.9649,-37.7980],[144.9635,-37.7980],[144.9635,-37.7970]]]}', 100, 1, false, true, true),
  ('c0000000-0000-0000-0014-000000000003', 'b0000000-0000-0000-0000-000000000014', 'physics-level2', 'Level 2 — Lecture Theatres', '{"type":"Polygon","coordinates":[[[144.9635,-37.7970],[144.9649,-37.7970],[144.9649,-37.7980],[144.9635,-37.7980],[144.9635,-37.7970]]]}', 100, 2, false, true, true);

-- ============================================================
-- Initialise zone_occupancy rows (all new zones start at 0)
-- ============================================================
INSERT INTO zone_occupancy (zone_id, building_id, occupancy_count, occupancy_pct, trend, data_quality)
SELECT id, building_id, 0, 0, 'stable', 'none'
FROM building_zones
WHERE building_id IN (
  'b0000000-0000-0000-0000-000000000008',
  'b0000000-0000-0000-0000-000000000009',
  'b0000000-0000-0000-0000-00000000000a',
  'b0000000-0000-0000-0000-00000000000b',
  'b0000000-0000-0000-0000-00000000000c',
  'b0000000-0000-0000-0000-00000000000d',
  'b0000000-0000-0000-0000-00000000000e',
  'b0000000-0000-0000-0000-00000000000f',
  'b0000000-0000-0000-0000-000000000010',
  'b0000000-0000-0000-0000-000000000011',
  'b0000000-0000-0000-0000-000000000012',
  'b0000000-0000-0000-0000-000000000013',
  'b0000000-0000-0000-0000-000000000014'
);
