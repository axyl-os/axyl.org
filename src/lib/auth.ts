import { betterAuth } from "better-auth"
import { join } from "path"

// Create a persistent database file in the project directory instead of in-memory
const DB_PATH = join(process.cwd(), "auth.db")

export const auth = betterAuth({
  database: {
    provider: "sqlite",
    url: DB_PATH,
  },
  socialProviders: {
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID || "placeholder-client-id",
      clientSecret: process.env.DISCORD_CLIENT_SECRET || "placeholder-client-secret",
    },
  },
  secret: process.env.BETTER_AUTH_SECRET || "fallback-secret-key",
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  cookies: {
    options: {
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    },
  },
  debug: true,
})