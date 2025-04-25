import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://xjfvkodpzlugwrpehkbw.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqZnZrb2Rwemx1Z3dycGVoa2J3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1NDQ0NDEsImV4cCI6MjA1OTEyMDQ0MX0.sbes16-1JEPvGNJ0QABKNjrPTdzaWXIf-0kWUHWShgg";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
