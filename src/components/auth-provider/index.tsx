"use client";

import {
  useEffect,
  useState,
  createContext,
  useContext,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { supabase, signOut } from "@/lib/supabase";

// Create a context to provide authentication-related information
export const AuthContext = createContext<{
  isAuthenticated: boolean;
  isLoading: boolean;
  user: Record<string, unknown> | null;
  logout: () => Promise<void>;
}>({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  logout: async () => {},
});

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  // Define authentication state with proper fallbacks
  const [state, setState] = useState({
    isAuthenticated: false,
    isLoading: true,
    user: null as Record<string, unknown> | null,
  });

  // Update state when session changes
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setState((prev) => ({ ...prev, isLoading: true }));
        const {
          data: { session },
        } = await supabase.auth.getSession();

        setState({
          isAuthenticated: !!session?.user,
          isLoading: false,
          user: session?.user || null,
        });
      } catch (error) {
        console.error("Error fetching session:", error);
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    };

    fetchUser();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event: string, session: { user: any } | null) => {
        setState({
          isAuthenticated: !!session?.user,
          isLoading: false,
          user: session?.user || null,
        });
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Simple logout function
  const logout = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true }));
      await signOut();
      setState({
        isAuthenticated: false,
        isLoading: false,
        user: null,
      });
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
