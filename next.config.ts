import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "localhost:3002", "axyl.org"],
    },
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
  webpack: (config, { isServer }) => {
    // Alias styled-jsx imports to our local implementation
    const localStyledJsxPath = path.join(__dirname, "src/lib/styled-jsx");

    config.resolve.alias = {
      ...config.resolve.alias,
      "styled-jsx": localStyledJsxPath,
      "styled-jsx/style": path.join(localStyledJsxPath, "style.js"),
      "styled-jsx/babel": path.join(localStyledJsxPath, "babel.js"),
      "styled-jsx/macro": path.join(localStyledJsxPath, "macro.js"),
      // Have client-side code reference the same instance of React as server
      react: require.resolve("react"),
      "react-dom": require.resolve("react-dom"),
    };

    return config;
  },
};

export default nextConfig;
