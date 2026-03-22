-- S20: Extend user_alerts for Web Push
-- Add push_subscription JSONB (endpoint + keys), is_active toggle, last_notified_at tracking

ALTER TABLE user_alerts ADD COLUMN IF NOT EXISTS push_subscription JSONB;
ALTER TABLE user_alerts ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
ALTER TABLE user_alerts ADD COLUMN IF NOT EXISTS last_notified_at TIMESTAMPTZ;
ALTER TABLE user_alerts ALTER COLUMN push_token DROP NOT NULL;
