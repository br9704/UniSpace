-- Seed: University of Melbourne — Parkville Campus
-- 1 campus, 5 buildings, floor zones for each
-- Source: PRD Q1 resolved decision — Baillieu, ERC, Arts West, Engineering 1, ICT

-- ============================================================
-- Campus
-- ============================================================
INSERT INTO campuses (id, slug, name, city, country, center_lat, center_lng, default_zoom)
VALUES (
  'a1b2c3d4-0000-0000-0000-000000000001',
  'unimelb',
  'University of Melbourne — Parkville',
  'Melbourne',
  'AU',
  -37.7964,
  144.9631,
  15
);

-- ============================================================
-- Buildings
-- ============================================================

-- 1. Baillieu Library
INSERT INTO buildings (
  id, campus_id, slug, name, short_name, estimated_capacity,
  entrance_lat, entrance_lng, centroid_lat, centroid_lng,
  polygon, google_place_id,
  has_wifi, has_power, has_food_nearby, has_quiet_zone,
  has_group_seating, is_ground_floor_accessible, has_elevator,
  has_accessible_bathrooms, has_accessible_parking,
  hours_mon, hours_tue, hours_wed, hours_thu, hours_fri, hours_sat, hours_sun
) VALUES (
  'b0000000-0000-0000-0000-000000000001',
  'a1b2c3d4-0000-0000-0000-000000000001',
  'baillieu-library',
  'Baillieu Library',
  'Baillieu',
  800,
  -37.7981, 144.9596,
  -37.7980, 144.9598,
  '{"type":"Polygon","coordinates":[[[144.9590,-37.7976],[144.9606,-37.7976],[144.9606,-37.7985],[144.9590,-37.7985],[144.9590,-37.7976]]]}',
  'ChIJPwNPm9FC1moRkG1VFmxXBBM',
  true, true, true, true,
  true, true, true,
  true, false,
  '09:00-20:00', '09:00-20:00', '09:00-20:00', '09:00-20:00', '09:00-17:00', '11:00-17:00', '10:00-17:00'
);

-- 2. ERC Library (Eastern Resource Centre)
INSERT INTO buildings (
  id, campus_id, slug, name, short_name, estimated_capacity,
  entrance_lat, entrance_lng, centroid_lat, centroid_lng,
  polygon, google_place_id,
  has_wifi, has_power, has_food_nearby, has_quiet_zone,
  has_group_seating, is_ground_floor_accessible, has_elevator,
  has_accessible_bathrooms, has_accessible_parking,
  hours_mon, hours_tue, hours_wed, hours_thu, hours_fri, hours_sat, hours_sun
) VALUES (
  'b0000000-0000-0000-0000-000000000002',
  'a1b2c3d4-0000-0000-0000-000000000001',
  'erc-library',
  'Eastern Resource Centre',
  'ERC',
  300,
  -37.7973, 144.9640,
  -37.7972, 144.9641,
  '{"type":"Polygon","coordinates":[[[144.9636,-37.7969],[144.9646,-37.7969],[144.9646,-37.7976],[144.9636,-37.7976],[144.9636,-37.7969]]]}',
  'ChIJF6_Pm9FC1moRqKtVFmxXBBM',
  true, true, false, true,
  false, true, true,
  true, false,
  '09:00-20:00', '09:00-20:00', '09:00-20:00', '09:00-20:00', '09:00-17:00', '11:00-17:00', '10:00-17:00'
);

-- 3. Arts West
INSERT INTO buildings (
  id, campus_id, slug, name, short_name, estimated_capacity,
  entrance_lat, entrance_lng, centroid_lat, centroid_lng,
  polygon, google_place_id,
  has_wifi, has_power, has_food_nearby, has_quiet_zone,
  has_group_seating, is_ground_floor_accessible, has_elevator,
  has_accessible_bathrooms, has_accessible_parking,
  hours_mon, hours_tue, hours_wed, hours_thu, hours_fri, hours_sat, hours_sun
) VALUES (
  'b0000000-0000-0000-0000-000000000003',
  'a1b2c3d4-0000-0000-0000-000000000001',
  'arts-west',
  'Arts West',
  'Arts W',
  400,
  -37.7958, 144.9586,
  -37.7957, 144.9588,
  '{"type":"Polygon","coordinates":[[[144.9582,-37.7954],[144.9594,-37.7954],[144.9594,-37.7962],[144.9582,-37.7962],[144.9582,-37.7954]]]}',
  'ChIJLQcmm9FC1moRYOJzVmxXBBM',
  true, true, true, false,
  true, true, true,
  true, true,
  '07:30-21:00', '07:30-21:00', '07:30-21:00', '07:30-21:00', '07:30-18:00', null, null
);

-- 4. Engineering Building 1 (Block B)
INSERT INTO buildings (
  id, campus_id, slug, name, short_name, estimated_capacity,
  entrance_lat, entrance_lng, centroid_lat, centroid_lng,
  polygon, google_place_id,
  has_wifi, has_power, has_food_nearby, has_quiet_zone,
  has_group_seating, is_ground_floor_accessible, has_elevator,
  has_accessible_bathrooms, has_accessible_parking,
  hours_mon, hours_tue, hours_wed, hours_thu, hours_fri, hours_sat, hours_sun
) VALUES (
  'b0000000-0000-0000-0000-000000000004',
  'a1b2c3d4-0000-0000-0000-000000000001',
  'engineering-1',
  'Engineering Building 1',
  'Eng 1',
  350,
  -37.7990, 144.9635,
  -37.7991, 144.9637,
  '{"type":"Polygon","coordinates":[[[144.9631,-37.7987],[144.9643,-37.7987],[144.9643,-37.7996],[144.9631,-37.7996],[144.9631,-37.7987]]]}',
  'ChIJP7_PnNFC1moRABDVFmxXBBM',
  true, true, true, false,
  true, false, true,
  true, false,
  '07:30-21:00', '07:30-21:00', '07:30-21:00', '07:30-21:00', '07:30-18:00', null, null
);

-- 5. ICT Building (Doug McDonell)
INSERT INTO buildings (
  id, campus_id, slug, name, short_name, estimated_capacity,
  entrance_lat, entrance_lng, centroid_lat, centroid_lng,
  polygon, google_place_id,
  has_wifi, has_power, has_food_nearby, has_quiet_zone,
  has_group_seating, is_ground_floor_accessible, has_elevator,
  has_accessible_bathrooms, has_accessible_parking,
  hours_mon, hours_tue, hours_wed, hours_thu, hours_fri, hours_sat, hours_sun
) VALUES (
  'b0000000-0000-0000-0000-000000000005',
  'a1b2c3d4-0000-0000-0000-000000000001',
  'ict-building',
  'Doug McDonell Building (ICT)',
  'ICT',
  250,
  -37.7987, 144.9627,
  -37.7988, 144.9628,
  '{"type":"Polygon","coordinates":[[[144.9623,-37.7984],[144.9633,-37.7984],[144.9633,-37.7992],[144.9623,-37.7992],[144.9623,-37.7984]]]}',
  'ChIJbRbSm9FC1moRmNdVFmxXBBM',
  true, true, false, false,
  true, true, true,
  true, false,
  '07:30-21:00', '07:30-21:00', '07:30-21:00', '07:30-21:00', '07:30-18:00', null, null
);

-- ============================================================
-- Building Zones (floor-level)
-- Each building gets zones per floor with approximate polygons
-- ============================================================

-- Baillieu Library — 3 floors
INSERT INTO building_zones (id, building_id, zone_slug, zone_name, polygon, capacity, floor_level, is_quiet_zone, has_power, is_accessible) VALUES
  ('c0000000-0000-0000-0001-000000000001', 'b0000000-0000-0000-0000-000000000001', 'baillieu-ground', 'Ground Floor', '{"type":"Polygon","coordinates":[[[144.9590,-37.7976],[144.9606,-37.7976],[144.9606,-37.7985],[144.9590,-37.7985],[144.9590,-37.7976]]]}', 250, 0, false, true, true),
  ('c0000000-0000-0000-0001-000000000002', 'b0000000-0000-0000-0000-000000000001', 'baillieu-level1', 'Level 1', '{"type":"Polygon","coordinates":[[[144.9590,-37.7976],[144.9606,-37.7976],[144.9606,-37.7985],[144.9590,-37.7985],[144.9590,-37.7976]]]}', 300, 1, true, true, true),
  ('c0000000-0000-0000-0001-000000000003', 'b0000000-0000-0000-0000-000000000001', 'baillieu-level2', 'Level 2 — Reading Room', '{"type":"Polygon","coordinates":[[[144.9590,-37.7976],[144.9606,-37.7976],[144.9606,-37.7985],[144.9590,-37.7985],[144.9590,-37.7976]]]}', 250, 2, true, true, true);

-- ERC Library — 2 floors
INSERT INTO building_zones (id, building_id, zone_slug, zone_name, polygon, capacity, floor_level, is_quiet_zone, has_power, is_accessible) VALUES
  ('c0000000-0000-0000-0002-000000000001', 'b0000000-0000-0000-0000-000000000002', 'erc-ground', 'Ground Floor', '{"type":"Polygon","coordinates":[[[144.9636,-37.7969],[144.9646,-37.7969],[144.9646,-37.7976],[144.9636,-37.7976],[144.9636,-37.7969]]]}', 150, 0, false, true, true),
  ('c0000000-0000-0000-0002-000000000002', 'b0000000-0000-0000-0000-000000000002', 'erc-level1', 'Level 1 — Quiet Study', '{"type":"Polygon","coordinates":[[[144.9636,-37.7969],[144.9646,-37.7969],[144.9646,-37.7976],[144.9636,-37.7976],[144.9636,-37.7969]]]}', 150, 1, true, true, true);

-- Arts West — 3 floors
INSERT INTO building_zones (id, building_id, zone_slug, zone_name, polygon, capacity, floor_level, is_quiet_zone, has_power, is_accessible) VALUES
  ('c0000000-0000-0000-0003-000000000001', 'b0000000-0000-0000-0000-000000000003', 'arts-west-ground', 'Ground Floor — Forum', '{"type":"Polygon","coordinates":[[[144.9582,-37.7954],[144.9594,-37.7954],[144.9594,-37.7962],[144.9582,-37.7962],[144.9582,-37.7954]]]}', 150, 0, false, true, true),
  ('c0000000-0000-0000-0003-000000000002', 'b0000000-0000-0000-0000-000000000003', 'arts-west-level1', 'Level 1', '{"type":"Polygon","coordinates":[[[144.9582,-37.7954],[144.9594,-37.7954],[144.9594,-37.7962],[144.9582,-37.7962],[144.9582,-37.7954]]]}', 130, 1, false, true, true),
  ('c0000000-0000-0000-0003-000000000003', 'b0000000-0000-0000-0000-000000000003', 'arts-west-level2', 'Level 2', '{"type":"Polygon","coordinates":[[[144.9582,-37.7954],[144.9594,-37.7954],[144.9594,-37.7962],[144.9582,-37.7962],[144.9582,-37.7954]]]}', 120, 2, false, false, true);

-- Engineering Building 1 — 3 floors
INSERT INTO building_zones (id, building_id, zone_slug, zone_name, polygon, capacity, floor_level, is_quiet_zone, has_power, is_accessible) VALUES
  ('c0000000-0000-0000-0004-000000000001', 'b0000000-0000-0000-0000-000000000004', 'eng1-ground', 'Ground Floor', '{"type":"Polygon","coordinates":[[[144.9631,-37.7987],[144.9643,-37.7987],[144.9643,-37.7996],[144.9631,-37.7996],[144.9631,-37.7987]]]}', 120, 0, false, true, false),
  ('c0000000-0000-0000-0004-000000000002', 'b0000000-0000-0000-0000-000000000004', 'eng1-level1', 'Level 1', '{"type":"Polygon","coordinates":[[[144.9631,-37.7987],[144.9643,-37.7987],[144.9643,-37.7996],[144.9631,-37.7996],[144.9631,-37.7987]]]}', 120, 1, false, true, true),
  ('c0000000-0000-0000-0004-000000000003', 'b0000000-0000-0000-0000-000000000004', 'eng1-level2', 'Level 2', '{"type":"Polygon","coordinates":[[[144.9631,-37.7987],[144.9643,-37.7987],[144.9643,-37.7996],[144.9631,-37.7996],[144.9631,-37.7987]]]}', 110, 2, false, true, true);

-- ICT Building — 2 floors
INSERT INTO building_zones (id, building_id, zone_slug, zone_name, polygon, capacity, floor_level, is_quiet_zone, has_power, is_accessible) VALUES
  ('c0000000-0000-0000-0005-000000000001', 'b0000000-0000-0000-0000-000000000005', 'ict-ground', 'Ground Floor', '{"type":"Polygon","coordinates":[[[144.9623,-37.7984],[144.9633,-37.7984],[144.9633,-37.7992],[144.9623,-37.7992],[144.9623,-37.7984]]]}', 130, 0, false, true, true),
  ('c0000000-0000-0000-0005-000000000002', 'b0000000-0000-0000-0000-000000000005', 'ict-level1', 'Level 1', '{"type":"Polygon","coordinates":[[[144.9623,-37.7984],[144.9633,-37.7984],[144.9633,-37.7992],[144.9623,-37.7992],[144.9623,-37.7984]]]}', 120, 1, false, true, true);

-- ============================================================
-- Initialise zone_occupancy rows (all zones start at 0)
-- ============================================================
INSERT INTO zone_occupancy (zone_id, building_id, occupancy_count, occupancy_pct, trend, data_quality)
SELECT id, building_id, 0, 0, 'stable', 'none'
FROM building_zones;
