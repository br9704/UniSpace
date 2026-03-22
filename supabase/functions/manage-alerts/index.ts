// Edge Function: manage-alerts
// CRUD operations for occupancy alerts via Web Push subscriptions.
// All operations filtered by push_subscription endpoint to ensure
// users can only manage their own alerts (no accounts required).

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { z } from "https://esm.sh/zod@3";

const PushSubscriptionSchema = z.object({
  endpoint: z.string().url(),
  keys: z.object({
    p256dh: z.string(),
    auth: z.string(),
  }),
});

const CreateAlertSchema = z.object({
  action: z.literal("create"),
  building_id: z.string().uuid(),
  push_subscription: PushSubscriptionSchema,
  threshold_pct: z.number().int().min(1).max(100),
});

const UpdateAlertSchema = z.object({
  action: z.literal("update"),
  alert_id: z.string().uuid(),
  push_subscription: PushSubscriptionSchema,
  threshold_pct: z.number().int().min(1).max(100).optional(),
  is_active: z.boolean().optional(),
});

const DeleteAlertSchema = z.object({
  action: z.literal("delete"),
  alert_id: z.string().uuid(),
  push_subscription: PushSubscriptionSchema,
});

const ListAlertSchema = z.object({
  action: z.literal("list"),
  push_subscription: PushSubscriptionSchema,
});

const RequestSchema = z.discriminatedUnion("action", [
  CreateAlertSchema,
  UpdateAlertSchema,
  DeleteAlertSchema,
  ListAlertSchema,
]);

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const body = await req.json();
  const parsed = RequestSchema.safeParse(body);

  if (!parsed.success) {
    return new Response(
      JSON.stringify({ error: "Validation failed", details: parsed.error.issues }),
      { status: 400, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } },
    );
  }

  const data = parsed.data;
  const endpoint = data.push_subscription.endpoint;

  try {
    if (data.action === "create") {
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

      const { data: alert, error } = await supabase
        .from("user_alerts")
        .insert({
          building_id: data.building_id,
          push_token: endpoint,
          push_subscription: data.push_subscription,
          threshold_pct: data.threshold_pct,
          expires_at: expiresAt,
          is_active: true,
        })
        .select()
        .single();

      if (error) throw error;
      return new Response(JSON.stringify({ alert }), {
        status: 201,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }

    if (data.action === "update") {
      const updates: Record<string, unknown> = {};
      if (data.threshold_pct !== undefined) updates.threshold_pct = data.threshold_pct;
      if (data.is_active !== undefined) updates.is_active = data.is_active;

      const { data: alert, error } = await supabase
        .from("user_alerts")
        .update(updates)
        .eq("id", data.alert_id)
        .eq("push_token", endpoint)
        .select()
        .single();

      if (error) throw error;
      return new Response(JSON.stringify({ alert }), {
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }

    if (data.action === "delete") {
      const { error } = await supabase
        .from("user_alerts")
        .delete()
        .eq("id", data.alert_id)
        .eq("push_token", endpoint);

      if (error) throw error;
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }

    if (data.action === "list") {
      const { data: alerts, error } = await supabase
        .from("user_alerts")
        .select("*")
        .eq("push_token", endpoint)
        .eq("is_active", true)
        .gt("expires_at", new Date().toISOString())
        .order("created_at", { ascending: false });

      if (error) throw error;
      return new Response(JSON.stringify({ alerts }), {
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ error: "Unknown action" }), {
    status: 400,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
  });
});
