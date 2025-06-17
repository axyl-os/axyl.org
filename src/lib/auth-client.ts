"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { useAuth } from "@/components/auth-provider";

// Create the Supabase client for browser components
const supabase = createClientComponentClient();

// Session hook for components that need auth state
// This implementation uses the AuthProvider context instead of duplicating logic
export function useSession() {
  // Get auth state from the AuthProvider context
  const { user, isLoading } = useAuth();

  // Create a session object from the user to maintain compatibility
  // with components expecting the session structure
  const session = user
    ? ({
        user,
        access_token: "", // These fields aren't used directly in components
        refresh_token: "", // but included for type compatibility
        expires_in: 0,
        expires_at: 0,
        token_type: "bearer",
      } as Session)
    : null;

  return { session, user, isLoading };
}

// Sign in with email/password
export async function signIn({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  return await supabase.auth.signInWithPassword({ email, password });
}

// Sign in with social providers
export async function signInWithProvider(
  provider: "discord" | "github" | "google",
) {
  return await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
}

// Sign up with email/password
export async function signUp({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  });
}

// Sign out
export async function signOut() {
  return await supabase.auth.signOut();
}
