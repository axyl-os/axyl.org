# AxylOS Website

A beautiful, modern website for AxylOS - an Arch-based Linux distribution designed for desktop users who want power and simplicity.

## Features

- **Modern Design**: Clean, responsive UI built with Next.js and Tailwind CSS
- **Documentation**: Comprehensive docs section for users
- **Blog**: News and updates from the AxylOS team
- **Community Focus**: Built to connect and support the AxylOS community

## Tech Stack

- **Framework**: Next.js 15.3 with App Router
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with custom styling
- **Database**: PostgreSQL
- **Icons**: Lucide React
- **Animations**: Framer Motion

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

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

3. Set up environment variables if needed:
```bash
cp .env.example .env
```

Edit `.env` with your environment settings.

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
│   │   ├── blog/            # Blog pages
│   │   ├── docs/            # Documentation pages
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Homepage
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Base UI components (Radix)
│   │   └── navigation.tsx   # Main navigation
│   └── lib/                # Utility functions and configurations
│       └── utils.ts        # General utilities
├── public/                 # Static assets
└── ...config files
```


## Development

### Adding New Pages

Pages are created in the `src/app/` directory following Next.js App Router conventions.

### Styling

The project uses Tailwind CSS with a custom design system. Colors and spacing are defined in `src/app/globals.css`.

### Components

UI components are built using Radix UI primitives and are located in `src/components/ui/`.

### Environment Variables

- Configure appropriate environment variables based on your deployment needs.

## Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy

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

For support, please open an issue on GitHub.

---

Built with ❤️ for the AxylOS community