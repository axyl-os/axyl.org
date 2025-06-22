# AxylOS Website Installation Guide

This guide provides step-by-step instructions for setting up and running the AxylOS website locally.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [pnpm](https://pnpm.io/installation) (v8 or later)
- [Git](https://git-scm.com/downloads)

## Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/axyl.org.git
cd axyl.org
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Set up environment variables**

Copy the example environment file and update it with your values:

```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in the following variables:

```
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Supabase Setup

We use Supabase for authentication and database services. Follow these steps to set up your Supabase project:

1. Create a new project on [Supabase](https://supabase.com/)
2. Set up Discord OAuth integration by following the instructions in `SUPABASE-SETUP.md`
3. Add the Supabase project URL and anon key to your `.env.local` file

## Development

Start the development server:

```bash
pnpm dev
```

This will start the Next.js development server at [http://localhost:3000](http://localhost:3000).

## Building for Production

Build the project for production:

```bash
pnpm build
```

## Testing Production Build Locally

To test the production build locally:

```bash
pnpm build
pnpm start
```

## Deployment

The site is configured for deployment on Vercel. Connect your GitHub repository to Vercel and it will automatically deploy when you push to the main branch.

Make sure to add the environment variables to your Vercel project settings.

## Troubleshooting

### Authentication Issues

If you're experiencing authentication issues:

1. Ensure your Supabase URL and anon key are correctly set in your environment
2. Verify that Discord OAuth is properly configured in Supabase
3. Check the browser console for any error messages

### Build Errors

If you encounter build errors related to missing dependencies:

```bash
pnpm install
```

If you're still experiencing issues, try clearing the Next.js cache:

```bash
rm -rf .next
pnpm dev
```

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Discord Developer Portal](https://discord.com/developers/applications)