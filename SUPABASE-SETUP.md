# Supabase Authentication Setup for AxylOS Website

This document provides instructions for setting up Supabase authentication for the AxylOS website.

## Prerequisites

1. A [Supabase](https://supabase.com/) account
2. A [Discord Developer](https://discord.com/developers/applications) account for OAuth integration

## Setup Steps

### 1. Create a Supabase Project

1. Log in to the [Supabase Dashboard](https://app.supabase.com/)
2. Click "New Project" and follow the setup wizard
3. Note your project's URL and anon/public API key for later use

### 2. Set up Discord OAuth Provider

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application or use an existing one
3. Navigate to the "OAuth2" section
4. Add a redirect URI: `https://[YOUR_SUPABASE_PROJECT_REF].supabase.co/auth/v1/callback`
5. Save the changes
6. Note your Client ID and Client Secret

### 3. Configure Supabase Auth

1. In the Supabase dashboard, go to Authentication > Providers
2. Find Discord in the list and enable it
3. Enter your Discord Client ID and Client Secret
4. Save the changes

### 4. Configure Environment Variables

Add the following environment variables to your Vercel project (or .env.local file for local development):

```env
NEXT_PUBLIC_SUPABASE_URL=https://[YOUR_SUPABASE_PROJECT_REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[YOUR_SUPABASE_ANON_KEY]
```

### 5. Test Authentication Flow

1. Deploy your changes
2. Try logging in with Discord
3. Check the Supabase Authentication dashboard to confirm user creation

## Common Issues and Solutions

### Callback URL Issues

If you encounter redirect errors, ensure:
- The redirect URL in Discord exactly matches your Supabase callback URL
- Your application domain is correctly set in Discord developer settings

### Session Not Persisting

Ensure middleware is correctly set up to handle session refreshes (see `src/middleware.ts`).

### User Profile Information Missing

Discord provides user profile data in the `user_metadata` field. Access it like:
```tsx
const userName = user.user_metadata?.full_name;
const avatarUrl = user.user_metadata?.avatar_url;
```

## Additional Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Next.js with Supabase Auth Helpers](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
- [Discord OAuth Documentation](https://discord.com/developers/docs/topics/oauth2)