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
    const { id, status, numberOfMem } = await req.json();
    if (!id) return new Response("id required", { status: 400, headers: cors });

    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const patch: Record<string, any> = {};
    if (status !== undefined) patch.status = status;
    if (numberOfMem !== undefined) patch.numberOfMem = Number(numberOfMem);

    if (Object.keys(patch).length === 0) {
      return new Response("no fields to update", { status: 400, headers: cors });
    }

    const { data, error } = await admin
      .from("Groups")
      .update(patch)
      .eq("id", id)
      .select()
      .single();

    if (error) return new Response(error.message, { status: 400, headers: cors });
    return new Response(JSON.stringify({ data }), {
      headers: cors,
      status: 200,
    });
  } catch (err) {
    return new Response(String(err?.message ?? err), { status: 400, headers: cors });
  }
});
