import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const TABLE = "gym_pr_board_lifts";

export const isConfigured = Boolean(url && anon);

let cached: SupabaseClient | null = null;

export function supabase(): SupabaseClient {
  if (!isConfigured) {
    throw new Error("Supabase env vars are not set. See .env.example");
  }
  if (!cached) {
    cached = createClient(url as string, anon as string, {
      auth: { persistSession: false },
    });
  }
  return cached;
}

export type Row = Record<string, unknown> & { id: string; created_at: string };
