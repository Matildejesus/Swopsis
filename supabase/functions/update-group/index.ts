import { serve } from "https://deno.land/std@0.192.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  try {
    const { id, status, numberOfMem } = await req.json();
    if (!id) return new Response("id required", { status: 400 });

    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const patch: Record<string, any> = {};
    if (status !== undefined) patch.status = status;
    if (numberOfMem !== undefined) patch.numberOfMem = Number(numberOfMem);

    if (Object.keys(patch).length === 0) {
      return new Response("no fields to update", { status: 400 });
    }

    const { data, error } = await admin
      .from("Groups")
      .update(patch)
      .eq("id", id)
      .select()
      .single();

    if (error) return new Response(error.message, { status: 400 });
    return new Response(JSON.stringify({ data }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err) {
    return new Response(String(err?.message ?? err), { status: 400 });
  }
});
