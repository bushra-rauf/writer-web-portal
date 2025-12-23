'use server'

import { createClient } from "@/utils/supabase/server-client"
import { redirect } from "next/navigation"

export const LogOut = async () => {
    const supabase = await createClient()
    const { error } = await supabase.auth.signOut()

    if (error) {
        throw error
    }

    // Redirect to home page after successful logout
    redirect('/')
}
