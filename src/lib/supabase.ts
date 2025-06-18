import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for the entire application
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storageKey: "supabase-auth",
    flowType: "pkce",
  },
});

// Helper functions for auth
export async function signInWithDiscord() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "discord",
    options: {
      redirectTo: `${window.location.origin}/api/auth/callback/discord`,
      skipBrowserRedirect: false,
    },
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }

  return true;
}

export async function getCurrentUser() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.error("Error getting session:", error);
    return null;
  }

  if (!session?.access_token) {
    console.warn("Session exists but no access token found");
  }

  return session?.user || null;
}

export async function refreshSession() {
  const { data, error } = await supabase.auth.refreshSession();

  if (error) {
    console.error("Error refreshing session:", error);
    return null;
  }

  return data.session;
}
