import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let _client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!_client) {
    const url =
      process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
    const key =
      process.env.SUPABASE_ANON_KEY ??
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
      "";
    _client = createClient(url, key);
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
