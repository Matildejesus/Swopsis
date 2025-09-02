import { serve } from "https://deno.land/std@0.192.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
    try {
        const supabaseAdmin = createClient(
            Deno.env.get("SUPABASE_URL")!,
            Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
        );

        const { data, error } = await supabaseAdmin
            .from("Items")
            .select(`
                id, created_at, userId, category, image, title, description, method, available, tradeCount, unavailableDates,
                Shoes!itemId (*),
                Clothing!itemId (*),
                Accessories!itemId (*)`)
            .order("created_at", { ascending: false });

        if (error) throw error;

        return new Response(JSON.stringify({ data }), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            headers: { "Content-Type": "application/json" },
            status: 400,
        });
    }
});