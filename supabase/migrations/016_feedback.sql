-- ============================================================================
-- 016 — Feedback
--
-- S25. A way to tell us the data is wrong.
--
-- This matters more than a suggestion box. PRD § 13.4 is explicit that
-- incorrect accessibility data is harmful — someone who uses a wheelchair and
-- is told a building has step-free access has been actively misled, and every
-- failed trip costs them ten to fifteen minutes. If the data can be wrong,
-- there has to be a way to say so.
--
-- Anonymous by construction: no user_id column exists to fill in later.
-- ============================================================================

CREATE TABLE IF NOT EXISTS feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Nullable: some feedback is about the app rather than a building.
  building_id UUID REFERENCES buildings(id) ON DELETE CASCADE,

  category TEXT NOT NULL CHECK (
    category IN (
      'hours_wrong',
      'amenity_wrong',
      'occupancy_wrong',
      'accessibility_wrong',
      'other'
    )
  ),

  -- Capped in the Edge Function too. Short enough to read, long enough to be
  -- useful.
  message TEXT CHECK (message IS NULL OR length(message) <= 500),

  -- Salted SHA-256, for rate limiting only. Never a raw address, and never
  -- reversible to one — the same guarantee occupancy_reports makes.
  ip_hash TEXT,

  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_feedback_unresolved
  ON feedback (created_at DESC)
  WHERE resolved_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_feedback_building ON feedback (building_id);

ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Write-only from the client's perspective: submissions go through the
-- submit-feedback Edge Function under the service role, and nobody can read
-- what anyone else has reported. There is no SELECT policy on purpose.
