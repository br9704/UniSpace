-- S13.1: Manual crowd reporting table
CREATE TABLE occupancy_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  building_id UUID REFERENCES buildings(id) ON DELETE CASCADE NOT NULL,
  occupancy_level SMALLINT NOT NULL CHECK (occupancy_level BETWEEN 1 AND 5),
  noise_level SMALLINT CHECK (noise_level BETWEEN 1 AND 5),
  ip_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 minutes') NOT NULL
);

CREATE INDEX idx_reports_building_expires ON occupancy_reports(building_id, expires_at DESC);
CREATE INDEX idx_reports_ip_hash_created ON occupancy_reports(ip_hash, created_at DESC);

ALTER TABLE occupancy_reports ENABLE ROW LEVEL SECURITY;

-- Anon can SELECT (client reads reports for blending)
CREATE POLICY "reports_select_all" ON occupancy_reports FOR SELECT USING (true);
-- Anon can INSERT (fallback; primary path is Edge Function with service_role)
CREATE POLICY "reports_insert_anon" ON occupancy_reports FOR INSERT WITH CHECK (true);
-- Only service_role can DELETE (cleanup)
CREATE POLICY "reports_delete_service" ON occupancy_reports FOR DELETE USING (auth.role() = 'service_role');

-- Enable Realtime so useRecentReports gets live updates
ALTER PUBLICATION supabase_realtime ADD TABLE occupancy_reports;
