import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
  async redirects() {
    return [
      {
        source: "/encyclopaedia",
        destination: "/deities",
        permanent: true,
      },
      {
        source: "/encyclopaedia/deities",
        destination: "/deities",
        permanent: true,
      },
      {
        source: "/encyclopaedia/deities/:slug",
        destination: "/deities/:slug",
        permanent: true,
      },
      {
        source: "/atlas",
        destination: "/temples",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
