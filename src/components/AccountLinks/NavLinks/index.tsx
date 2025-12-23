'use client'

import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"
import { t } from "@/utils/translations"
import { useQuery } from "@tanstack/react-query"
import { createClient } from "@/utils/supabase/browser-client"

const NavLinks = () => {
    const { language } = useLanguage()
    const supabase = createClient()

    const { data: user } = useQuery({
        queryKey: ['current-user'],
        queryFn: async () => {
            const { data: { user }, error } = await supabase.auth.getUser()
            if (error) throw error
            return user
        },
        staleTime: Infinity,
        retry: false
    })

    // Check if user exists in writers table
    const { data: writerData } = useQuery({
        queryKey: ['writer-check', user?.id],
        queryFn: async () => {
            if (!user?.id) return null
            const { data, error } = await supabase
                .from('writers')
                .select('id')
                .eq('id', user.id)
                .single()
            if (error) return null
            return data
        },
        enabled: !!user?.id,
        staleTime: Infinity,
        retry: false
    })

    // Check if user is a writer (check both metadata and database)
    const isWriter = user?.user_metadata?.userType === 'writer' || !!writerData

    return (
        <div className="hidden md:flex items-center gap-4 text-white">
            <Link href="/" className="hover:text-gray-200 transition">
                {t('nav.home', language)}
            </Link>
            <Link href="/books" className="hover:text-gray-200 transition">
                {t('nav.books', language)}
            </Link>
            {isWriter && (
                <Link href="/dashboard" className="hover:text-gray-200 transition">
                    {t('nav.dashboard', language)}
                </Link>
            )}
        </div>
    )
}

export default NavLinks
