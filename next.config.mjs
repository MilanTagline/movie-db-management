/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: '*.*.*',
          },
          {
            protocol: 'https',
            hostname: '*.*.*',
          },
          {
            protocol: 'http',
            hostname: '*.*',
          },
          {
            protocol: 'https',
            hostname: '*.*',
          },
        ],
        path: `/_next/image`,
      },
};

export default nextConfig;
