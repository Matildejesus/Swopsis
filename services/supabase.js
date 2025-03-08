import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_KEY, SUPABASE_SERVICE_ROLE } from "@env";

const supabaseUrl = SUPABASE_URL;
const supabaseServiceRole =
    SUPABASE_SERVICE_ROLE
const supabaseKey = SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRole);

export default supabase;
export { supabaseAdmin };
