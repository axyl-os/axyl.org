import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ResponseCookies } from "next/dist/compiled/@edge-runtime/cookies";

export const dynamic = "force-dynamic";

// Handle Discord OAuth callback
export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(
      new URL(
        `/login?error=${encodeURIComponent("Missing authorization code")}`,
        requestUrl.origin,
      ),
    );
  }

  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    // Exchange the authorization code for a session
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error || !data.session) {
      console.error("Failed to exchange code for session:", error);
      return NextResponse.redirect(
        new URL(
          `/login?error=${encodeURIComponent("Failed to authenticate")}`,
          requestUrl.origin,
        ),
      );
    }

    // Don't manually set cookies - Supabase auth helpers already handle this
    // The exchangeCodeForSession function above sets the necessary cookies

    // Redirect to the home page or dashboard after successful authentication
    return NextResponse.redirect(new URL("/", requestUrl.origin));
  } catch (error) {
    console.error("Discord callback error:", error);
    return NextResponse.redirect(
      new URL(
        `/login?error=${encodeURIComponent("Authentication callback error")}`,
        requestUrl.origin,
      ),
    );
  }
}
