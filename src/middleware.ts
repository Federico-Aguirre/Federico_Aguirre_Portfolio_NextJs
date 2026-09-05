import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

// Inicializa el middleware utilizando la fuente única de verdad para i18n
export default createMiddleware(routing);

export const config = {
  matcher: [
    // Coincide con la raíz del sitio '/'
    '/',

    // Coincide con todas las rutas que ya tengan prefijo de idioma '/es/...' o '/en/...'
    '/(es|en)/:path*',

    // Excluye api, _next, _vercel, archivos con extensión y rutas puente
    '/((?!api|_next|_vercel|github|certificados|.*\\..*).*)'
  ]
};