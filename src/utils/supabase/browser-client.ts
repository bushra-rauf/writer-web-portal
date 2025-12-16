import { createBrowserClient } from "@supabase/ssr";

/**
 * Create a Supabase client for browser-side operations
 * Uses @supabase/ssr for better cookie handling
 */
export const createClient = () => {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
