import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let _client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!_client) {
    _client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }
  return _client;
}

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
