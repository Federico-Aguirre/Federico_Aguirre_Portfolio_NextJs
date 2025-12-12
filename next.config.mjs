import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');


const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['./src']
  }
};

export default withNextIntl(nextConfig);
