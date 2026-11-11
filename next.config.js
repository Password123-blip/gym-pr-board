/** @type {import('next').NextConfig} */
const isPages = process.env.GITHUB_PAGES === "1";

const nextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: false },
  ...(isPages
    ? {
        output: "export",
        images: { unoptimized: true },
        basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
        assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || "",
      }
    : {}),
};

module.exports = nextConfig;
