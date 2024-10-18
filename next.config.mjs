/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d3n79iv3agr9k3.cloudfront.net",
        port: "",
        //   pathname: '/my-bucket/**',
      },
    ],
  },
};

export default nextConfig;
