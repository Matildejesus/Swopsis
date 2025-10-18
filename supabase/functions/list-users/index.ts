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
        
        const { data, error } = await supabaseAdmin.auth.admin.listUsers();
    
        if (error) throw error;

        return new Response(JSON.stringify({ users: data.users }), {
            headers: cors,
        });

    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            headers: cors,
            status: 400,
        });
    }
});