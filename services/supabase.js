import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ubohapcfavgltukxiirg.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVib2hhcGNmYXZnbHR1a3hpaXJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk0OTYxMjIsImV4cCI6MjAxNTA3MjEyMn0.x8iemsbERUbX6TP-4Ragqi07-LTXZE-s-bb2PkSfBDc";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
