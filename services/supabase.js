import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ojtjdcpqkljyiralrflf.supabase.co";
const supabaseAnon = "sb_publishable_MtG-AX6nsuE7GgT8-PtYOg_a-7KIYEu";

const supabase = createClient(supabaseUrl, supabaseAnon);

export default supabase;
