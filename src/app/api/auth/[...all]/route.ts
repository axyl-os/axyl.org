import { auth } from "@/lib/auth"
import { toNextJsHandler } from "better-auth/next-js"

// Force dynamic rendering to ensure route executes on each request
export const dynamic = "force-dynamic"

// Convert better-auth handlers to Next.js API route handlers
export const { GET, POST } = toNextJsHandler(auth.handler)