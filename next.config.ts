import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/talleres",
        destination: "/#talleres",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
