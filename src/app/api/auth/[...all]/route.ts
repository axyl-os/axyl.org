import { auth } from "@/lib/auth"
import { toNextJsHandler } from "better-auth/next-js"

// Force dynamic rendering to ensure route executes on each request
export const dynamic = "force-dynamic"
export const runtime = "nodejs"

// Create Next.js API route handlers from better-auth
const { GET, POST } = toNextJsHandler(auth.handler)

// Export the handlers
export { GET, POST }

// Options handler for CORS preflight requests
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      "Allow": "GET, POST, OPTIONS",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  })
}