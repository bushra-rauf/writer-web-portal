import { createServerClient } from "@supabase/ssr"
import { NextRequest, NextResponse } from "next/server"

export const middleware = async (request: NextRequest) => {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
        }
      }
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // Protected routes - require authentication
  const protectedRoutes = [
    /^\/dashboard$/,           // Dashboard
    /^\/dashboard\/.*$/,       // All dashboard sub-routes
    /^\/books\/create$/,       // Create book
    /^\/books\/[^\/]+\/edit$/, // Edit book
  ]

  // Public routes - accessible without authentication
  const publicRoutes = [
    /^\/$/,                    // Homepage
    /^\/auth\/login$/,         // Login page
    /^\/auth\/signup$/,        // Signup page
    /^\/books$/,               // Browse books
    /^\/books\/[^\/]+$/,       // Single book page (not edit)

  ]

  // Allow access to public routes
  if (publicRoutes.some(route => route.test(request.nextUrl.pathname))) {
    return supabaseResponse
  }

  // Redirect to login if user is not authenticated and trying to access protected routes
  if (!user && protectedRoutes.some(route => route.test(request.nextUrl.pathname))) {
    const newUrl = request.nextUrl.clone()
    newUrl.pathname = "/auth/login"
    return NextResponse.redirect(newUrl)
  }

  // If user is authenticated and trying to access login/signup, redirect to dashboard
  if (user && (request.nextUrl.pathname === '/auth/login' || request.nextUrl.pathname === '/auth/signup')) {
    const newUrl = request.nextUrl.clone()
    newUrl.pathname = "/dashboard"
    return NextResponse.redirect(newUrl)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
