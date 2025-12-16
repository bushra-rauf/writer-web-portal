'use client'

import { useQuery } from "@tanstack/react-query"
import { createClient } from "@/utils/supabase/browser-client"

/**
 * Custom hook to get the current authenticated user
 * Uses React Query for caching and automatic refetching
 */
export const useCurrentUser = () => {
  const supabase = createClient()

  return useQuery({
    queryKey: ['current-user'],
    queryFn: async () => {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error) throw error
      return user
    },
    staleTime: Infinity, // User data doesn't change often
    retry: false
  })
}
