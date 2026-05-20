import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Booking = {
  id?: string;
  service_id: string;
  service_name: string;
  date: string;
  start_time: string;
  name: string;
  email: string;
  phone?: string;
  notes?: string;
  status?: string;
  created_at?: string;
};
