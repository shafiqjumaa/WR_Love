import { createClient } from "@supabase/supabase-js";

// هاي القيم بتنجيب من ملف .env.local (ما بتنكتب هون أبدًا لأسباب أمان)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
