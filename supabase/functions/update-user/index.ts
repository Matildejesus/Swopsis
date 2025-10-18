import { serve } from "https://deno.land/std@0.192.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const ALLOWED_ORIGINS = new Set([
    "http://localhost:8081",
    "http://localhost:3000",
    "https://swopsis.expo.app"
])

function corsFor(req) {
    const origin = req.headers.get("Origin") || ""
    const allow = ALLOWED_ORIGINS.has(origin) ? origin : null

    const headers = {
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
        "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
        "Access-Control-Allow-Credentials": "true",
        "Vary": "Origin",
        "Content-Type": "application/json"
    }
    if (allow) headers["Access-Control-Allow-Origin"] = allow
    return headers
}

serve(async (req) => {
   const cors = corsFor(req)
        if (req.method === "OPTIONS") {
        return new Response("ok", { headers: cors })
    }
  try {
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const {
      id,
      groupId,
      ambassador,
      coins,
      totalLitres,
      totalCarbon,
      totalWeight,
      itemsSwapped,
      newCoins,
    } = await req.json();

    // build metadata object dynamically
    const user_metadata: Record<string, any> = {};

    if (groupId !== undefined) user_metadata.group = groupId;
    if (ambassador !== undefined) user_metadata.ambassador = ambassador;
    if (coins !== undefined) user_metadata.coins = Number(coins);
    if (newCoins !== undefined) user_metadata.coins = newCoins;

    if (totalLitres !== undefined) user_metadata.totalLitres = totalLitres;
    if (totalCarbon !== undefined) user_metadata.totalCarbon = totalCarbon;
    if (totalWeight !== undefined) user_metadata.totalWeight = totalWeight;
    if (itemsSwapped !== undefined) user_metadata.itemsSwapped = itemsSwapped;

    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(id, {
      user_metadata,
    });

    if (error) throw error;

    return new Response(JSON.stringify({ user: data.user }), {
      headers: cors,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      headers: cors,
      status: 400,
    });
  }
});
