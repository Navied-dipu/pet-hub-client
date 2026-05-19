/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ibb.co',
        port: '',
        pathname: '/**',
        search: '',
      },
    ],
  },

  reactCompiler: true,
};

export default nextConfig;
