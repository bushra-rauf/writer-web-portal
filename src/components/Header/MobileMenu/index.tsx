'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { t } from '@/utils/translations'
import { useQuery } from '@tanstack/react-query'
import { createClient } from '@/utils/supabase/browser-client'

const MobileMenu = () => {
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()
    const { language, changeLanguage } = useLanguage()
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

    // Get user's full name from metadata
    const userName = user?.user_metadata?.fullName || user?.email?.split('@')[0] || 'User'

    const handleSignOut = async () => {
        setIsOpen(false)
        await supabase.auth.signOut()
        window.location.href = '/'
    }

    return (
        <>
            {/* Hamburger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-white"
                aria-label="Toggle menu"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
            </button>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="absolute top-16 left-0 right-0 bg-primary shadow-lg pb-4 px-4">
                    <div className="space-y-2">
                        {/* User Name Display - Mobile */}
                        {user && (
                            <div className="py-2 px-2 border-b border-white border-opacity-20">
                                <span className="text-white font-semibold text-sm">
                                    {userName}
                                </span>
                            </div>
                        )}
                        <Link
                            href="/"
                            className="block hover:text-gray-200 transition py-2"
                            onClick={() => setIsOpen(false)}
                        >
                            {t('nav.home', language)}
                        </Link>
                        <Link
                            href="/books"
                            className="block hover:text-gray-200 transition py-2"
                            onClick={() => setIsOpen(false)}
                        >
                            {t('nav.books', language)}
                        </Link>

                        {user ? (
                            <>
                                {isWriter && (
                                    <Link
                                        href="/dashboard"
                                        className="block hover:text-gray-200 transition py-2"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {t('nav.dashboard', language)}
                                    </Link>
                                )}
                                <button
                                    onClick={handleSignOut}
                                    className="w-full text-left bg-accent px-4 py-2 rounded-lg hover:bg-opacity-90 transition"
                                >
                                    {t('nav.logout', language)}
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/auth/login"
                                    className="block hover:text-gray-200 transition py-2"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {t('nav.login', language)}
                                </Link>
                                <Link
                                    href="/auth/signup"
                                    className="block bg-accent px-4 py-2 rounded-lg hover:bg-opacity-90 transition"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {t('nav.signup', language)}
                                </Link>
                            </>
                        )}

                        {/* Language Toggle - Mobile */}
                        <button
                            onClick={() => changeLanguage(language === 'english' ? 'urdu' : 'english')}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition mt-2"
                        >
                            <span className="text-sm font-medium">
                                {language === 'english' ? 'Switch to اردو' : 'Switch to English'}
                            </span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default MobileMenu
