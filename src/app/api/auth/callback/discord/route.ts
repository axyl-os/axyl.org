import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Handle Discord OAuth callback
export async function GET(request: Request) {
  try {
    // Forward the request to the auth handler
    const response = await auth.handler(request);

    // Return the response directly
    return response;
  } catch (error) {
    console.error("Discord callback error:", error);
    return NextResponse.redirect(
      new URL(
        `/login?error=${encodeURIComponent("Authentication callback error")}`,
        request.url,
      ),
    );
  }
}
