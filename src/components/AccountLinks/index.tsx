'use client'

import Link from "next/link"
import LogOutButton from "./LogOut"
import LanguageToggle from "./LanguageToggle"
import NavLinks from "./NavLinks"
import { useLanguage } from "@/contexts/LanguageContext"
import { t } from "@/utils/translations"
import { useQuery } from "@tanstack/react-query"
import { createClient } from "@/utils/supabase/browser-client"

const AccountLinks = () => {
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

    return (
       <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
        {/* Navigation Links */}
        <NavLinks />

        {/* Auth Buttons */}
        {user ?
        <>
            <LogOutButton/>
        </>
        :
        <div className="flex items-center gap-2">
            {/* <Link href='/auth/login'
                className='text-white hover:text-gray-200 px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg font-medium transition-colors duration-200 text-xs sm:text-sm md:text-base whitespace-nowrap'>
                {t('nav.login', language)}
            </Link> */}
            <Link href='/auth/login' className='bg-accent hover:bg-opacity-90 px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 rounded-lg font-semibold text-white transition-colors duration-200 text-xs sm:text-sm md:text-base whitespace-nowrap'>
                {t('nav.login', language)}
            </Link>
        </div>
        }

        {/* Language Toggle */}
        <LanguageToggle />
       </div>

    )
}

export default AccountLinks
