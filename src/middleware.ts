import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  localePrefix: 'always' // URLs del tipo /es/... y /en/...
});

export const config = {
  // Excluye estáticos y API
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
