import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

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
    await supabase.auth.exchangeCodeForSession(code);

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
