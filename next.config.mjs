// next.config.mjs - Configuration for Next.js with styled-jsx workaround

/**
 * This configuration file addresses the styled-jsx/React 19 compatibility issue
 * by aliasing the styled-jsx imports to our local implementation
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "localhost:3002", "axyl.org"],
    },
    // Ensure transpilation of styled-jsx
    transpilePackages: ["styled-jsx"],
  },
  images: {
    domains: ["cdn.discordapp.com"],
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET, POST, OPTIONS" },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Configure webpack to use local styled-jsx implementation
//  webpack: (config, { isServer }) => {
    // Alias styled-jsx imports to our local implementation
    //    config.resolve.alias = {
    //  ...config.resolve.alias,
    //  "styled-jsx": require.resolve("./src/lib/styled-jsx"),
    //  "styled-jsx/style": require.resolve("./src/lib/styled-jsx/style"),
    //  "styled-jsx/babel": require.resolve("./src/lib/styled-jsx/babel"),
    //  "styled-jsx/macro": require.resolve("./src/lib/styled-jsx/macro"),
    //};

    // Skip next-client-pages-loader for styled-jsx
    if (config.module && config.module.rules) {
      config.module.rules.forEach(rule => {
        if (rule.use && Array.isArray(rule.use)) {
          rule.use.forEach(use => {
            if (use.loader === 'next-client-pages-loader') {
              use.options = use.options || {};
              use.options.handledStyles = true; // Skip styled-jsx handling
            }
          });
        }
      });
    }

    return config;
  },
};

export default nextConfig;
