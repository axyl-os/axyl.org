"use client"

import { useEffect, useState, createContext, useContext } from "react"
import { useSession, signOut } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

// Create a context to provide authentication-related information
export const AuthContext = createContext<{
  isAuthenticated: boolean
  isLoading: boolean
  user: Record<string, unknown> | null
  logout: () => Promise<void>
}>({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  logout: async () => {},
})

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession()
  const router = useRouter()
  
  // Define authentication state
  const [state, setState] = useState({
    isAuthenticated: !!session?.user,
    isLoading: isPending,
    user: session?.user || null,
  })

  // Update state when session changes
  useEffect(() => {
    setState({
      isAuthenticated: !!session?.user,
      isLoading: isPending,
      user: session?.user || null,
    })
  }, [session, isPending])

  // Logout function
  const logout = async () => {
    await signOut()
    setState((prev) => ({ ...prev, isAuthenticated: false, user: null }))
    router.push("/")
  }

  // Create the context value
  const contextValue = {
    ...state,
    logout,
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}