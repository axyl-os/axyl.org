import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This middleware refreshes the user's session and must be run
// for any Server Component route that uses authenticated data
export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req, res });

  try {
    // Refresh session if expired - required for Server Components
    // to work correctly with authenticated data
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // If session exists but is about to expire, refresh it
    if (session) {
      const expiresAt = session.expires_at
        ? new Date(session.expires_at * 1000)
        : null;
      const now = new Date();

      // If token expires in less than 1 hour, refresh it
      if (expiresAt && expiresAt.getTime() - now.getTime() < 60 * 60 * 1000) {
        await supabase.auth.refreshSession();
      }
    }
  } catch (error) {
    console.error("Error in auth middleware:", error);
  }

  return res;
}

// Specify which routes this middleware should run on
export const config = {
  matcher: [
    // Apply to all routes except for:
    // - _next files
    // - static files
    // - favicon
    // - auth related routes
    "/((?!_next|static|favicon|auth/callback|api/auth).*)",
  ],
};
