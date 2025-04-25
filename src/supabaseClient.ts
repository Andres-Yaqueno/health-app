import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://jowwaquzicuwjzldscay.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impvd3dhcXV6aWN1d2p6bGRzY2F5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1NjE4OTYsImV4cCI6MjA1OTEzNzg5Nn0.cYI48kM9dOH8P1wt3aD1779GbWqjOsAPb0CEvPTqrPI";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
