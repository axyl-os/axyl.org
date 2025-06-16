import { createAuthClient } from "better-auth/react"

// Create the auth client with proper configuration
export const authClient = createAuthClient({
  // Use the public URL for client-side requests
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000",
  
  // Configure routes for authentication
  routes: {
    signIn: "/api/auth/signin",
    signOut: "/api/auth/signout",
    callback: "/api/auth/callback",
    error: "/api/auth/error",
  },
  
  // Add default configuration for providers
  defaultCallbackURL: "/",
})

// Export the auth utilities for use throughout the application
export const { signIn, signOut, signUp, useSession } = authClient