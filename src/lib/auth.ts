import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { cache } from "react";
import { type User, type Session } from "@supabase/supabase-js";

// Use React cache to avoid multiple Supabase clients being created
export const createSupabaseServerClient = cache(() => {
  const cookieStore = cookies();
  return createServerComponentClient({ cookies: () => cookieStore });
});

// Get the current session from server components
export async function getSession(): Promise<Session | null> {
  const supabase = createSupabaseServerClient();
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error("Error getting session:", error);
      return null;
    }
    return data.session;
  } catch (err) {
    console.error("Unexpected error getting session:", err);
    return null;
  }
}

// Get the current user from server components
export async function getUser(): Promise<User | null> {
  const session = await getSession();
  return session?.user ?? null;
}

// Check if the user is authenticated in server components
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return !!session;
}

// Get the user's role for authorization purposes
export async function getUserRole(): Promise<string | null> {
  const user = await getUser();
  return user?.user_metadata?.role ?? null;
}

// Configuration for Auth
export const authConfig = {
  providers: {
    discord: {
      enabled: true,
      clientId: process.env.DISCORD_CLIENT_ID || "",
      clientSecret: process.env.DISCORD_CLIENT_SECRET || "",
    },
    github: {
      enabled: false, // Enable by setting to true and configuring credentials
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    },
    google: {
      enabled: false, // Enable by setting to true and configuring credentials
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  redirects: {
    login: "/login",
    callback: "/auth/callback",
    afterLogin: "/",
    afterLogout: "/",
  },
};
