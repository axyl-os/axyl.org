import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
  // Force use of the React builds from the same location to avoid duplicates
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Have client-side code reference the same instance of React as server
      config.resolve.alias = {
        ...config.resolve.alias,
        react: require.resolve("react"),
        "react-dom": require.resolve("react-dom"),
        "styled-jsx": require.resolve("styled-jsx"),
      };
    }
    return config;
  },
};

export default nextConfig;
