import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */

const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/en/login", // default locale
        permanent: true,
      },
      {
        source: "/ar",
        destination: "/ar/login",
        permanent: true,
      },
      {
        source: "/en",
        destination: "/en/login",
        permanent: true,
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "exam.elevateegy.com",
        pathname: "/**",
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
