// Edge Function: compute-predictions
// Phase 1: Copies google_popular_times data into occupancy_predictions
// with data_source = 'google' and confidence = 'google-estimated'.
//
// Phase 3 (S25) will add EWMA blending with occupancy_history when
// sample_count >= 14 days for a given day/hour slot.
//
// Triggered manually via HTTP or a future cron schedule.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

interface GooglePopularTimeRow {
  building_id: string;
  day_of_week: number;
  hour_of_day: number;
  typical_popularity: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
Deno.serve(async (_req) => {
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // --- Step 1: Fetch all Google Popular Times rows ---
    const { data: typicalRows, error: fetchError } = await supabase
      .from("google_popular_times")
      .select("building_id, day_of_week, hour_of_day, typical_popularity");

    if (fetchError) {
      throw new Error(`Failed to fetch google_popular_times: ${fetchError.message}`);
    }

    if (!typicalRows || typicalRows.length === 0) {
      return new Response(
        JSON.stringify({ success: true, message: "No google_popular_times data to process" }),
        { headers: { "Content-Type": "application/json" } },
      );
    }

    // --- Step 2: Map to occupancy_predictions format ---
    const now = new Date().toISOString();
    const predictions = (typicalRows as GooglePopularTimeRow[]).map((row) => ({
      building_id: row.building_id,
      day_of_week: row.day_of_week,
      hour_of_day: row.hour_of_day,
      predicted_pct: row.typical_popularity,
      confidence: "google-estimated",
      sample_count: 0,
      data_source: "google",
      computed_at: now,
    }));

    // --- Step 3: Batch upsert into occupancy_predictions ---
    // Supabase upsert handles the UNIQUE(building_id, day_of_week, hour_of_day) constraint
    const BATCH_SIZE = 500;
    let totalUpserted = 0;
    let totalErrors = 0;

    for (let i = 0; i < predictions.length; i += BATCH_SIZE) {
      const batch = predictions.slice(i, i + BATCH_SIZE);
      const { error: upsertError } = await supabase
        .from("occupancy_predictions")
        .upsert(batch, {
          onConflict: "building_id,day_of_week,hour_of_day",
        });

      if (upsertError) {
        console.error(`Batch ${i / BATCH_SIZE} error:`, upsertError.message);
        totalErrors += batch.length;
      } else {
        totalUpserted += batch.length;
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        summary: {
          rows_processed: predictions.length,
          rows_upserted: totalUpserted,
          errors: totalErrors,
        },
      }),
      { headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("compute-predictions error:", error);
    return new Response(
      JSON.stringify({ success: false, error: String(error) }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
});
