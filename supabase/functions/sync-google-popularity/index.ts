// Edge Function: sync-google-popularity
// Invoked every 30 minutes via pg_cron or HTTP cron.
//
// For each building with a google_place_id:
//   1. Calls Google Places API for current_popularity and opening_hours
//   2. Upserts google_popularity_cache (skips write if unchanged)
//
// SECURITY:
//   - GOOGLE_PLACES_API_KEY is a server-side secret (Edge Function env)
//   - NEVER exposed to the client (no VITE_ prefix)
//
// COST MANAGEMENT:
//   - Skips write if popularity value hasn't changed
//   - ~480 requests/day for 10 buildings = ~$8/month

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

interface BuildingWithPlaceId {
  id: string;
  name: string;
  google_place_id: string;
}

interface GooglePlaceResult {
  current_popularity?: number;
  opening_hours?: {
    open_now?: boolean;
  };
}

interface SyncResult {
  building_id: string;
  building_name: string;
  status: "updated" | "unchanged" | "error";
  error?: string;
}

Deno.serve(async (_req) => {
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const googleApiKey = Deno.env.get("GOOGLE_PLACES_API_KEY");

    if (!googleApiKey) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "GOOGLE_PLACES_API_KEY not configured in Edge Function secrets",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // --- Step 1: Fetch buildings with Google Place IDs ---
    const { data: buildings, error: buildingsError } = await supabase
      .from("buildings")
      .select("id, name, google_place_id")
      .not("google_place_id", "is", null);

    if (buildingsError) {
      throw new Error(`Failed to fetch buildings: ${buildingsError.message}`);
    }

    if (!buildings || buildings.length === 0) {
      return new Response(
        JSON.stringify({ success: true, message: "No buildings with Google Place IDs" }),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    // --- Step 2: Fetch current cache values (for skip-if-unchanged) ---
    const { data: currentCache } = await supabase
      .from("google_popularity_cache")
      .select("building_id, current_popularity, is_open_now");

    const cacheMap = new Map<string, { popularity: number | null; isOpen: boolean | null }>();
    if (currentCache) {
      for (const row of currentCache) {
        cacheMap.set(row.building_id, {
          popularity: row.current_popularity,
          isOpen: row.is_open_now,
        });
      }
    }

    // --- Step 3: Sync each building (independent — one failure doesn't block others) ---
    const results: SyncResult[] = [];

    for (const building of buildings as BuildingWithPlaceId[]) {
      try {
        // Call Google Places API (legacy Place Details)
        // NOTE: current_popularity is NOT available via the official API — it's
        // a Google Maps internal feature. We fetch opening_hours for is_open_now
        // and store current_popularity as null. The column is retained for future use.
        const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
        url.searchParams.set("place_id", building.google_place_id);
        url.searchParams.set("fields", "opening_hours,utc_offset");
        url.searchParams.set("key", googleApiKey);

        const response = await fetch(url.toString());
        const data = await response.json();

        if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
          results.push({
            building_id: building.id,
            building_name: building.name,
            status: "error",
            error: `Google API status: ${data.status}`,
          });
          continue;
        }

        const result: GooglePlaceResult = data.result ?? {};

        const newPopularity = result.current_popularity ?? null;
        const newIsOpen = result.opening_hours?.open_now ?? null;

        // Skip write if values haven't changed
        const cached = cacheMap.get(building.id);
        if (
          cached &&
          cached.popularity === newPopularity &&
          cached.isOpen === newIsOpen
        ) {
          results.push({
            building_id: building.id,
            building_name: building.name,
            status: "unchanged",
          });
          continue;
        }

        // Upsert cache
        const { error: upsertError } = await supabase
          .from("google_popularity_cache")
          .upsert(
            {
              building_id: building.id,
              current_popularity: newPopularity,
              is_open_now: newIsOpen,
              synced_at: new Date().toISOString(),
            },
            { onConflict: "building_id" }
          );

        if (upsertError) {
          results.push({
            building_id: building.id,
            building_name: building.name,
            status: "error",
            error: upsertError.message,
          });
          continue;
        }

        results.push({
          building_id: building.id,
          building_name: building.name,
          status: "updated",
        });
      } catch (err) {
        // Per-building error handling — one failure doesn't stop others
        results.push({
          building_id: building.id,
          building_name: building.name,
          status: "error",
          error: String(err),
        });
      }
    }

    const updated = results.filter((r) => r.status === "updated").length;
    const unchanged = results.filter((r) => r.status === "unchanged").length;
    const errors = results.filter((r) => r.status === "error").length;

    return new Response(
      JSON.stringify({
        success: true,
        summary: { updated, unchanged, errors, total: results.length },
        results,
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("sync-google-popularity error:", error);
    return new Response(
      JSON.stringify({ success: false, error: String(error) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
