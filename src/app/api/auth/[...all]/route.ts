import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// Force dynamic rendering to ensure route executes on each request
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  // If there's a code, we're handling a callback from a social provider
  if (code) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    // Exchange the code for a session
    await supabase.auth.exchangeCodeForSession(code);

    // Redirect to the app after successful auth
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If no code, return error
  return NextResponse.json({ error: "Invalid request" }, { status: 400 });
}

export async function POST(request: Request) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const body = await request.json();
  const { path, action, ...data } = body;

  let response;

  switch (action) {
    case "signIn":
      response = await supabase.auth.signInWithPassword(data);
      break;
    case "signOut":
      response = await supabase.auth.signOut();
      break;
    case "signUp":
      response = await supabase.auth.signUp({
        ...data,
        options: {
          emailRedirectTo: `${new URL(request.url).origin}/auth/callback`,
        },
      });
      break;
    default:
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  return NextResponse.json(response);
}
