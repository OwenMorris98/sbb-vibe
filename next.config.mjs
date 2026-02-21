/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "shipbottombrewery.com",
      },
    ],
  },
};

export default nextConfig;
