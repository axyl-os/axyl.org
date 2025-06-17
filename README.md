# AxylOS Website

A beautiful, modern website for AxylOS - an Arch-based Linux distribution designed for desktop users who want power and simplicity.

## Features

- **Modern Design**: Clean, responsive UI built with Next.js and Tailwind CSS
- **Discord Authentication**: Secure login using Discord OAuth via Supabase Auth
- **Documentation**: Comprehensive docs section for users
- **Blog**: News and updates from the AxylOS team
- **Community Focus**: Built to connect and support the AxylOS community

## Tech Stack

- **Framework**: Next.js 15.3 with App Router
- **Authentication**: Supabase Auth with Discord provider
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with custom styling
- **Database**: PostgreSQL with Supabase
- **Icons**: Lucide React
- **Animations**: Framer Motion

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Discord Application (for OAuth)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd axyl.org
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your Discord OAuth credentials:
```env
BETTER_AUTH_SECRET=your-secret-key-here
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
DISCORD_CLIENT_ID=your-discord-client-id
DISCORD_CLIENT_SECRET=your-discord-client-secret
```

### Discord OAuth Setup

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application
3. Go to OAuth2 settings
4. Add redirect URI: `http://localhost:3000/api/auth/callback/discord`
5. Copy Client ID and Client Secret to your `.env` file

### Running the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
pnpm build
pnpm start
```

## Project Structure

```
axyl.org/
├── src/
│   ├── app/                  # Next.js app router pages
│   │   ├── api/auth/        # Authentication API routes
│   │   ├── blog/            # Blog pages
│   │   ├── docs/            # Documentation pages
│   │   ├── login/           # Login page
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Homepage
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Base UI components (Radix)
│   │   ├── navigation.tsx   # Main navigation
│   │   └── login-form.tsx   # Login form
│   └── lib/                # Utility functions and configurations
│       ├── auth.ts         # Supabase auth configuration
│       ├── auth-client.ts  # Client-side auth helpers
│       └── utils.ts        # General utilities
├── public/                 # Static assets
└── ...config files
```

## Authentication Flow

The website uses Supabase Auth with Discord OAuth:


1. User clicks "Sign In with Discord"
2. Redirects to Discord OAuth
3. Discord redirects back with authorization code
4. Supabase Auth exchanges code for user info
5. User session is created and stored
6. User can access authenticated features

## Development

### Adding New Pages

Pages are created in the `src/app/` directory following Next.js App Router conventions.

### Styling

The project uses Tailwind CSS with a custom design system. Colors and spacing are defined in `src/app/globals.css`.

### Components

UI components are built using Radix UI primitives and are located in `src/components/ui/`.

### Environment Variables

- `BETTER_AUTH_SECRET`: Secret key for authentication
- `BETTER_AUTH_URL`: Base URL of your application
- `NEXT_PUBLIC_BETTER_AUTH_URL`: Public-facing auth URL
- `DISCORD_CLIENT_ID`: Discord OAuth client ID
- `DISCORD_CLIENT_SECRET`: Discord OAuth client secret

## Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Update Discord OAuth redirect URI to your domain
4. Deploy

### Other Platforms

The application is a standard Next.js app and can be deployed to any platform that supports Node.js.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

[Your License Here]

## Support

For support, please join our Discord community or open an issue on GitHub.

---

Built with ❤️ for the AxylOS community