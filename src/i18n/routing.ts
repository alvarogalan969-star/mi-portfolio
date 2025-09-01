// src/i18n/routing.ts
import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  // 'as-needed' → la home en ES no lleva /es, pero EN sí usa /en
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/about': { es: '/sobre-mi', en: '/about' },
    '/projects': { es: '/proyectos', en: '/projects' },
    '/projects/[slug]': { es: '/proyectos/[slug]', en: '/projects/[slug]' },
    '/contact': { es: '/contacto', en: '/contact' },
    '/blog': { es: '/blog', en: '/blog' },
    '/blog/[slug]': { es: '/blog/[slug]', en: '/blog/[slug]' },
    '/cv': { es: '/cv', en: '/resume' }
  }
});

export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);

export type Locale = (typeof routing.locales)[number];
