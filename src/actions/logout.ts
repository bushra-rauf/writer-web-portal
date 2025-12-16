'use server'

import { createClient } from "@/utils/supabase/server-client"
import { redirect } from "next/navigation"

export const LogOut = async () => {
    const supabase = await createClient()
    const { error } = await supabase.auth.signOut()

    // Return a structured result to the client so it can handle navigation
    if (error) {
        return { ok: false, error }
    }

    return { ok: true }
}
