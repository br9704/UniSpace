// Edge Function: submit-report
// Accepts manual crowd reports of building busyness (1-5 scale).
//
// PRIVACY INVARIANTS:
//   1. Raw IP is NEVER stored — only a SALTED SHA-256 hash, for rate limiting
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

/**
 * Called from the browser, so the preflight has to be answered here — Supabase
 * adds no CORS headers of its own. Without them the OPTIONS request comes back
 * without `Access-Control-Allow-Origin` and the POST is blocked before it is
 * ever sent.
 */
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey",
};

const JSON_HEADERS = { ...CORS_HEADERS, "Content-Type": "application/json" };

/**
 * The salt is load-bearing. An *unsalted* SHA-256 of an IPv4 address is
 * trivially reversible by brute force — there are only four billion of them, so
 * the whole space can be enumerated in seconds — which would make this column a
 * stored identifier in all but name, and PRD § 13.1 promises there are none.
 *
 * So a missing secret must not degrade to an empty salt, which is exactly the
 * unsalted case the paragraph above rules out, and would do so silently. It
 * falls back to a random per-instance salt instead: hashes stay unreversible
 * (the privacy invariant holds), and what degrades is rate limiting, which
 * resets on every cold start. That is the right way round — a deployment that
 * forgets the secret gets weaker abuse protection, not a de-anonymised table.
 */
const IP_HASH_SALT: string = Deno.env.get("IP_HASH_SALT") || (() => {
  console.error(
    "[submit-report] IP_HASH_SALT is not set. Using a random per-instance " +
    "salt: IP hashes remain unreversible, but rate limiting resets on every " +
    "cold start. Set the Edge Function secret.",
  );
  return crypto.randomUUID();
})();

/** Salted hash of the caller's IP, for rate limiting only. */
async function hashIP(ip: string): Promise<string> {
  const salt = IP_HASH_SALT;
  const data = new TextEncoder().encode(`${salt}:${ip}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ success: false, error: "Method not allowed" }),
      { status: 405, headers: JSON_HEADERS },
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
        { status: 400, headers: JSON_HEADERS },
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
        { status: 429, headers: JSON_HEADERS },
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
      { status: 201, headers: JSON_HEADERS },
    );
  } catch (error) {
    console.error("submit-report error:", error);
    return new Response(
      JSON.stringify({ success: false, error: String(error) }),
      { status: 500, headers: JSON_HEADERS },
    );
  }
});
