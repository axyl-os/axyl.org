import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This middleware refreshes the user's session and must be run
// for any Server Component route that uses authenticated data
export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req, res })

  // Refresh session if expired - required for Server Components
  // to work correctly with authenticated data
  await supabase.auth.getSession()

  return res
}

// Specify which routes this middleware should run on
export const config = {
  matcher: [
    // Apply to all routes except for:
    // - _next files
    // - static files
    // - favicon
    // - auth related routes
    '/((?!_next|static|favicon|auth/callback|api/auth).*)',
  ],
}
