"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Terminal,
  FileText,
  BookOpen,
  LogIn,
  LogOut,
  User,
  Download,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { AuthErrorBoundary } from "@/components/error-boundary";
import { useEffect, useState } from "react";
import { supabase, signInWithDiscord, signOut } from "@/lib/supabase";

function NavigationContent() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Initialize user state from session
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setLoading(false);

      // Listen for auth changes
      const { data: authListener } = supabase.auth.onAuthStateChange(
        (event: string, session: { user: any } | null) => {
          setUser(session?.user || null);
        },
      );

      return () => {
        authListener.subscription.unsubscribe();
      };
    };

    fetchUser();
  }, []);

  const handleSignIn = async () => {
    try {
      await signInWithDiscord();
    } catch (error) {
      console.error("Sign in error:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      window.location.href = "/";
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link
            href="/"
            className="flex items-center space-x-2 font-bold text-xl"
          >
            <Terminal className="h-6 w-6 text-primary" />
            <span>AxylOS</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/download"
              className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Download</span>
            </Link>
            <Link
              href="/docs"
              className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <FileText className="h-4 w-4" />
              <span>Docs</span>
            </Link>
            <Link
              href="/blog"
              className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <BookOpen className="h-4 w-4" />
              <span>Blog</span>
            </Link>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          {loading ? (
            <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
          ) : user ? (
            <div className="flex items-center space-x-3">
              <div className="hidden sm:flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={user.user_metadata?.avatar_url || ""}
                    alt={user.user_metadata?.full_name || ""}
                  />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">
                  {user.user_metadata?.full_name || user.email}
                </span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          ) : (
            <Button onClick={handleSignIn} size="sm">
              <LogIn className="h-4 w-4 mr-2" />
              Sign In with Discord
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}

export function Navigation() {
  return (
    <AuthErrorBoundary>
      <NavigationContent />
    </AuthErrorBoundary>
  );
}
