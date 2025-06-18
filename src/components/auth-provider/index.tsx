"use client";

import {
  useEffect,
  useState,
  createContext,
  useContext,
  useCallback,
  useRef,
} from "react";
import { useRouter } from "next/navigation";
import { supabase, signOut, refreshSession } from "@/lib/supabase";
import type { User, Session, AuthChangeEvent } from "@supabase/supabase-js";

// Define the auth context type
type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  logout: () => Promise<void>;
};

// Create a context to provide authentication-related information
export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  logout: async () => {},
});

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  // Define authentication state with proper types
  const [state, setState] = useState<Omit<AuthContextType, "logout">>({
    isAuthenticated: false,
    isLoading: true,
    user: null,
  });

  // Handle session refresh
  const refreshTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Update state when session changes
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setState((prev) => ({ ...prev, isLoading: true }));
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.access_token) {
          // Session exists with valid token
          setState({
            isAuthenticated: true,
            isLoading: false,
            user: session?.user || null,
          });

          // Set up refresh timer (every 50 minutes)
          if (refreshTimerRef.current) {
            clearInterval(refreshTimerRef.current);
          }
          refreshTimerRef.current = setInterval(
            async () => {
              console.log("Refreshing auth session");
              await refreshSession();
            },
            50 * 60 * 1000,
          );
        } else if (session) {
          // Session exists but token might be invalid
          console.log("Session exists but needs refresh");
          const refreshedSession = await refreshSession();
          setState({
            isAuthenticated: !!refreshedSession?.user,
            isLoading: false,
            user: refreshedSession?.user || null,
          });
        } else {
          // No session
          setState({
            isAuthenticated: false,
            isLoading: false,
            user: null,
          });
        }
      } catch (error) {
        console.error("Error fetching session:", error);
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    };

    fetchUser();

    // Listen for auth state changes with proper types
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, session: Session | null) => {
        console.log("Auth state changed:", event);

        // Special handling for token refresh events
        if (event === "TOKEN_REFRESHED") {
          console.log("Token refreshed successfully");
        }

        setState({
          isAuthenticated: !!session?.user && !!session?.access_token,
          isLoading: false,
          user: session?.user || null,
        });
      },
    );

    return () => {
      if (refreshTimerRef.current) {
        clearInterval(refreshTimerRef.current);
      }
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Logout function with cleanup
  const logout = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true }));

      // Clear refresh timer if it exists
      if (refreshTimerRef.current) {
        clearInterval(refreshTimerRef.current);
        refreshTimerRef.current = null;
      }

      await signOut();

      setState({
        isAuthenticated: false,
        isLoading: false,
        user: null,
      });

      // Clear any auth cookies from browser
      document.cookie =
        "supabase-auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie =
        "supabase-auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

      router.push("/");
    } catch (error) {
      console.error("Sign out error:", error);
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, [router]);

  return (
    <AuthContext.Provider value={{ ...state, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
