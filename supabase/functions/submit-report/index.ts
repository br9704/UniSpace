// Edge Function: submit-report
// Accepts manual crowd reports of building busyness (1-5 scale).
//
// PRIVACY INVARIANTS:
//   1. Raw IP is NEVER stored — only SHA-256 hash for rate limiting
//   2. No session_id stored in database
//   3. Reports expire after 30 minutes

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { z } from "https://esm.sh/zod@3";

const ReportSchema = z.object({
  building_id: z.string().uuid(),
  occupancy_level: z.number().int().min(1).max(5),
  noise_level: z.number().int().min(1).max(5).nullable().optional(),
});

const MAX_REPORTS_PER_HOUR = 5;

async function hashIP(ip: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(ip);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ success: false, error: "Method not allowed" }),
      { status: 405, headers: { "Content-Type": "application/json" } },
    );
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Parse and validate body
    const body = await req.json();
    const parsed = ReportSchema.safeParse(body);

    if (!parsed.success) {
      return new Response(
        JSON.stringify({ success: false, error: parsed.error.issues }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const { building_id, occupancy_level, noise_level } = parsed.data;

    // Hash IP for rate limiting (raw IP never stored)
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() ?? "unknown";
    const ipHash = await hashIP(ip);

    // Rate limit: max 5 reports per IP per hour
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count, error: countError } = await supabase
      .from("occupancy_reports")
      .select("id", { count: "exact", head: true })
      .eq("ip_hash", ipHash)
      .gte("created_at", oneHourAgo);

    if (countError) {
      throw new Error(`Rate limit check failed: ${countError.message}`);
    }

    if ((count ?? 0) >= MAX_REPORTS_PER_HOUR) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Rate limit exceeded. Maximum 5 reports per hour.",
        }),
        { status: 429, headers: { "Content-Type": "application/json" } },
      );
    }

    // Insert report
    const { data: report, error: insertError } = await supabase
      .from("occupancy_reports")
      .insert({
        building_id,
        occupancy_level,
        noise_level: noise_level ?? null,
        ip_hash: ipHash,
      })
      .select("id, created_at, expires_at")
      .single();

    if (insertError) {
      throw new Error(`Insert failed: ${insertError.message}`);
    }

    return new Response(
      JSON.stringify({
        success: true,
        report: {
          id: report.id,
          created_at: report.created_at,
          expires_at: report.expires_at,
        },
      }),
      { status: 201, headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("submit-report error:", error);
    return new Response(
      JSON.stringify({ success: false, error: String(error) }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
});
