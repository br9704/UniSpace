// Edge Function: submit-feedback
//
// Accepts anonymous reports that our data is wrong.
//
// This exists because PRD § 13.4 treats incorrect accessibility data as
// harmful rather than merely inconvenient: telling someone who uses a
// wheelchair that a building has step-free access, when it does not, costs them
// a wasted trip they cannot easily afford. If the data can be wrong — and it
// can, it is manually maintained — there has to be a way to say so.
//
// PRIVACY INVARIANTS:
//   1. No user_id. The table has no such column, so there is nothing to fill in
//      later under pressure.
//   2. Raw IP is NEVER stored — only a salted SHA-256 hash, for rate limiting.
//   3. Nobody can read submissions back. There is no SELECT policy on the
//      table; only the service role, here, can write.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { z } from "https://esm.sh/zod@3";

const FeedbackSchema = z.object({
  building_id: z.string().uuid().nullable().optional(),
  category: z.enum([
    "hours_wrong",
    "amenity_wrong",
    "occupancy_wrong",
    "accessibility_wrong",
    "other",
  ]),
  message: z.string().max(500).nullable().optional(),
});

/** Generous — this is abuse protection, not a quota on being helpful. */
const MAX_SUBMISSIONS_PER_HOUR = 10;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

/**
 * Salted hash of the caller's IP.
 *
 * The salt matters: an unsalted hash of an IPv4 address is trivially reversible
 * by brute force — there are only four billion of them — which would make this
 * a stored identifier in all but name.
 */
async function hashIP(ip: string): Promise<string> {
  const salt = Deno.env.get("IP_HASH_SALT") ?? "";
  const data = new TextEncoder().encode(`${salt}:${ip}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return json({ success: false, error: "Method not allowed" }, 405);
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const parsed = FeedbackSchema.safeParse(await req.json());
    if (!parsed.success) {
      return json({ success: false, error: parsed.error.issues }, 400);
    }

    const { building_id, category, message } = parsed.data;

    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() ?? "unknown";
    const ipHash = await hashIP(ip);

    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count, error: countError } = await supabase
      .from("feedback")
      .select("id", { count: "exact", head: true })
      .eq("ip_hash", ipHash)
      .gte("created_at", oneHourAgo);

    if (countError) {
      return json({ success: false, error: countError.message }, 500);
    }

    if ((count ?? 0) >= MAX_SUBMISSIONS_PER_HOUR) {
      return json(
        { success: false, error: "Too many submissions. Try again later." },
        429,
      );
    }

    const { error: insertError } = await supabase.from("feedback").insert({
      building_id: building_id ?? null,
      category,
      message: message?.trim() || null,
      ip_hash: ipHash,
    });

    if (insertError) {
      return json({ success: false, error: insertError.message }, 500);
    }

    return json({ success: true });
  } catch (error) {
    return json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error" },
      500,
    );
  }
});
