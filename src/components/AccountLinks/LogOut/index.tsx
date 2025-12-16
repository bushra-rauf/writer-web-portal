// 'use client'

// import { LogOut } from "@/actions/logout"
// import { useLanguage } from '@/contexts/LanguageContext'
// import { t } from '@/utils/translations'
// import { useTransition } from 'react'
// import { useRouter } from 'next/navigation'
// import { toast } from 'sonner'
// import { createClient } from '@/utils/supabase/browser-client'
// import { useQueryClient } from '@tanstack/react-query'

// const LogOutButton = () => {
//     const { language } = useLanguage()
//     const [isPending, startTransition] = useTransition()
//     const router = useRouter()
//     const queryClient = useQueryClient()

//     const handleClick = () => {
//         startTransition(async () => {
//             try {
//                 const res: any = await LogOut()
//                 if (res?.ok) {
//                     // Also sign out on the browser client and invalidate current-user cache
//                         try {
//                             const supabase = createClient()
//                             await supabase.auth.signOut()
//                             // Immediately update cache so UI reflects logged-out state
//                             queryClient.setQueryData(['current-user'], null)
//                             queryClient.invalidateQueries({ queryKey: ['current-user'] })
//                         } catch (e) {
//                         // If client sign out fails, still proceed to navigate
//                         console.error('Client signOut failed', e)
//                     }

//                     toast.success('Logged out')
//                     router.push('/')
//                 } else {
//                     throw res?.error || new Error('Logout failed')
//                 }
//             } catch (err: any) {
//                 console.error('Logout error', err)
//                 toast.error(err?.message || 'Could not log out')
//             }
//         })
//     }

//     return(
//         <button
//             onClick={handleClick}
//             disabled={isPending}
//             className="bg-accent hover:bg-opacity-90 text-white px-3 py-2 sm:px-4 font-semibold rounded-lg transition-colors duration-200 text-xs sm:text-sm md:text-base whitespace-nowrap disabled:opacity-50"
//         >
//             {isPending ? (t('nav.loggingOut', language) || 'Logging out...') : t('nav.logout', language) || 'Log Out'}
//         </button>
//     )
// }

// export default LogOutButton

'use client'

import { LogOut } from '@/actions/logout'

// Minimal logout button: call server action, then reload the page so UI updates.
const LogOutButton = () => {
    const handleClick = async () => {
        try {
            await LogOut()
        } finally {
            // Simple and reliable: reload the page so auth/UI state reflects logged-out
            if (typeof window !== 'undefined') window.location.reload()
        }
    }

    return (
        <button
            onClick={handleClick}
            className="bg-accent hover:bg-opacity-90 text-white px-3 py-2 sm:px-4 font-semibold rounded-lg transition-colors duration-200 text-xs sm:text-sm md:text-base whitespace-nowrap disabled:opacity-50"
        >
            Log Out
        </button>
    )
}

export default LogOutButton