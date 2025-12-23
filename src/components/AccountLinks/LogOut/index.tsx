'use client'

import { createClient } from '@/utils/supabase/browser-client'
import { useCart } from '@/contexts/CartContext'

// Logout button: signs out using Supabase and redirects to home page
const LogOutButton = () => {
    const supabase = createClient()
    const { clearCart } = useCart()

    const handleClick = async () => {
        // Clear the cart before logging out
        clearCart()
        await supabase.auth.signOut()
        window.location.href = '/'
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