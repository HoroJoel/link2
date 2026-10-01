import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/talleres",
        destination: "/cursos",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
