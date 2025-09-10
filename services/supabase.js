import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { SUPABASE_URL, SUPABASE_KEY } from "@env";

const supabaseUrl = "https://ojtjdcpqkljyiralrflf.supabase.co";
const supabaseKey = "sb_publishable_MtG-AX6nsuE7GgT8-PtYOg_a-7KIYEu";
const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        storage: AsyncStorage,         
        autoRefreshToken: true,       
        persistSession: true,         
        detectSessionInUrl: false,     
    },
});

supabase.auth.getSession().then(({ data }) => {
    console.log('session exists?', !!data.session);
});


export default supabase;