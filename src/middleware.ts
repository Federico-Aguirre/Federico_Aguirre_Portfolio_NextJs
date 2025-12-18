import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'es'],
  defaultLocale: 'en',
  // Esto ayuda a que si entras a / solo, te mande a /en o /es
  localePrefix: 'always' 
});

export const config = {
  // Matcher optimizado
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};