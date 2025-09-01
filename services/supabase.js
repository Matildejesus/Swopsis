import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnon = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRole = process.env.EXPO_PRIVATE_SUPABASE_SERVICE_KEY;

const supabase = createClient(supabaseUrl, supabaseAnon);
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRole);

export default supabase;
export { supabaseAdmin };