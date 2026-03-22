// Edge Function: send-alerts
// Checks occupancy against alert thresholds and sends Web Push notifications.
// Intended to be invoked every 2 minutes via pg_cron or HTTP cron.
//
// Cooldown: 15 minutes per alert to prevent notification spam.
// Expired alerts (expires_at < NOW()) are cleaned up on each run.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const COOLDOWN_MS = 15 * 60 * 1000; // 15 minutes

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey",
};

/** Build a VAPID-signed Web Push request (simplified implementation). */
async function sendWebPush(
  subscription: { endpoint: string; keys: { p256dh: string; auth: string } },
  payload: string,
): Promise<boolean> {
  // Use the web-push library via esm.sh for VAPID signing
  try {
    const webpush = await import("https://esm.sh/web-push@3");

    webpush.setVapidDetails(
      `mailto:${Deno.env.get("VAPID_EMAIL") ?? "noreply@example.com"}`,
      Deno.env.get("VAPID_PUBLIC_KEY") ?? "",
      Deno.env.get("VAPID_PRIVATE_KEY") ?? "",
    );

    await webpush.sendNotification(subscription, payload);
    return true;
  } catch (err) {
    console.error("Push failed:", err);
    return false;
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const now = new Date();

  // 1. Clean up expired alerts
  await supabase
    .from("user_alerts")
    .delete()
    .lt("expires_at", now.toISOString());

  // 2. Fetch active alerts with building occupancy
  const { data: alerts, error } = await supabase
    .from("user_alerts")
    .select("*, buildings!inner(short_name, name)")
    .eq("is_active", true)
    .gt("expires_at", now.toISOString());

  if (error || !alerts) {
    return new Response(
      JSON.stringify({ error: error?.message ?? "No alerts found" }),
      { status: 500, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } },
    );
  }

  // 3. Get current occupancy for all buildings with alerts
  const buildingIds = [...new Set(alerts.map((a: Record<string, unknown>) => a.building_id as string))];
  const { data: occupancies } = await supabase
    .from("zone_occupancy")
    .select("building_id, occupancy_pct")
    .in("building_id", buildingIds);

  // Build a map of building_id → average occupancy
  const occMap = new Map<string, number>();
  if (occupancies) {
    const grouped = new Map<string, number[]>();
    for (const row of occupancies) {
      const arr = grouped.get(row.building_id as string) ?? [];
      arr.push(Number(row.occupancy_pct));
      grouped.set(row.building_id as string, arr);
    }
    for (const [bid, vals] of grouped) {
      occMap.set(bid, vals.reduce((a, b) => a + b, 0) / vals.length);
    }
  }

  let sent = 0;
  let skipped = 0;

  for (const alert of alerts) {
    const buildingId = alert.building_id as string;
    const threshold = alert.threshold_pct as number;
    const subscription = alert.push_subscription as { endpoint: string; keys: { p256dh: string; auth: string } } | null;
    const lastNotified = alert.last_notified_at as string | null;
    const building = alert.buildings as { short_name: string | null; name: string };

    if (!subscription) { skipped++; continue; }

    const currentPct = occMap.get(buildingId);
    if (currentPct === undefined || currentPct > threshold) { skipped++; continue; }

    // Check cooldown
    if (lastNotified) {
      const elapsed = now.getTime() - new Date(lastNotified).getTime();
      if (elapsed < COOLDOWN_MS) { skipped++; continue; }
    }

    const buildingName = building.short_name ?? building.name;
    const payload = JSON.stringify({
      title: "UniSpace",
      body: `${buildingName} is at ${Math.round(currentPct)}% — below your ${threshold}% alert`,
      url: `/map?building=${buildingId}`,
    });

    const success = await sendWebPush(subscription, payload);

    if (success) {
      sent++;
      await supabase
        .from("user_alerts")
        .update({
          last_notified_at: now.toISOString(),
          triggered_at: now.toISOString(),
        })
        .eq("id", alert.id as string);
    }
  }

  return new Response(
    JSON.stringify({ processed: alerts.length, sent, skipped }),
    { headers: { ...CORS_HEADERS, "Content-Type": "application/json" } },
  );
});
