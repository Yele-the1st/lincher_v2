/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/dzxkmtek7/**",
      },
    ],
  },
};

export default nextConfig;
