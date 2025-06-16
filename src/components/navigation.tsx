"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSession, signIn, signOut } from "@/lib/auth-client"
import { Terminal, FileText, BookOpen, LogIn, LogOut, User } from "lucide-react"
import { AuthErrorBoundary } from "@/components/error-boundary"

function NavigationContent() {
  const { data: session, isPending } = useSession()

  const handleSignIn = () => {
    signIn.social({
      provider: "discord",
      callbackURL: "/",
    })
  }

  const handleSignOut = () => {
    signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/"
        },
      },
    })
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center space-x-2 font-bold text-xl">
            <Terminal className="h-6 w-6 text-primary" />
            <span>AxylOS</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
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
          {isPending ? (
            <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
          ) : session?.user ? (
            <div className="flex items-center space-x-3">
              <div className="hidden sm:flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={session.user.image || ""} alt={session.user.name || ""} />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{session.user.name}</span>
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
  )
}

export function Navigation() {
  return (
    <AuthErrorBoundary>
      <NavigationContent />
    </AuthErrorBoundary>
  )
}