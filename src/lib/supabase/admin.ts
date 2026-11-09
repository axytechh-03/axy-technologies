import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client.
 * Uses the privileged SERVICE_ROLE_KEY if configured (for server-side public submission or admin checks),
 * or falls back to the publishable/anon key. Never exported or bundled into client components.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error("Missing Supabase configuration for admin client.");
  }

  return createSupabaseClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
