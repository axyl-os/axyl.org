import { betterAuth } from "better-auth";

export const auth = betterAuth({
  database: {
    provider: "sqlite",
    url: ":memory:", // Use in-memory database to avoid file system issues
  },
  socialProviders: {
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID || "placeholder-client-id",
      clientSecret:
        process.env.DISCORD_CLIENT_SECRET || "placeholder-client-secret",
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
  debug: process.env.NODE_ENV !== "production", // Enable debug mode for development
});
