import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";
// import { SUPABASE_URL, SUPABASE_KEY } from "@env";

const supabaseUrl = "https://ojtjdcpqkljyiralrflf.supabase.co";
const supabaseKey = "sb_publishable_MtG-AX6nsuE7GgT8-PtYOg_a-7KIYEu";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;