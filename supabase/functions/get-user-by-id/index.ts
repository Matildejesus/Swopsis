// supabase/functions/get-user-by-id/index.ts
import { serve } from "https://deno.land/std@0.192.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
	try {
		const supabaseAdmin = createClient(
		Deno.env.get("SUPABASE_URL")!,
		Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
		);

		const { id } = await req.json();
		console.log("Fetching user with ID INSIDE THE EDGE FUNCTION:", id);
		const { data, error } = await supabaseAdmin.auth.admin.getUserById(id);

		if (error) throw error;

		return new Response(JSON.stringify({ user: data.user }), {
		headers: { "Content-Type": "application/json" },
		});

	} catch (err) {
		return new Response(JSON.stringify({ error: err.message }), {
		headers: { "Content-Type": "application/json" },
		status: 400,
		});
	}
});
