import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');


const nextConfig = {
  transpilePackages: ["@tsparticles/react", "@tsparticles/engine", "@tsparticles/slim"],
  images: {
    formats: ['image/avif', 'image/webp'],
    // Le indico a Next.js que genere versiones optimizadas para tarjetas pequeñas (320px / 384px)
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 320, 384],
    deviceSizes: [640, 750, 828, 1080, 1200],
  },
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['./src']
  },
  experimental: {
    optimizeCss: true, // Inlinea el CSS crítico automáticamente
  }
};

export default withNextIntl(nextConfig);
