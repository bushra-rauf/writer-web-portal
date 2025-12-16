import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Create a Supabase client for server-side operations
 * Handles cookies properly for server components and actions
 */
export const createClient = async () => {
  const cookiesStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookiesStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookiesStore.set(name, value, options)
            })
          } catch {
            // Handle cookie setting errors silently
          }
        }
      }
    }
  )
}
