import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ojtjdcpqkljyiralrflf.supabase.co";
const supabaseKey = "sb_publishable_MtG-AX6nsuE7GgT8-PtYOg_a-7KIYEu";

const supabaseStateless = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
    // storage: undefined is implied, but you can set it explicitly:
    storage: undefined,
  },
});

export default supabaseStateless;