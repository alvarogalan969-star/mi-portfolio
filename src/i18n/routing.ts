// src/i18n/routing.ts
import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['es', 'en'] as const,
  defaultLocale: 'es',
  // 'as-needed' → la home en ES no lleva /es, pero EN sí usa /en
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',

    // Sobre mí
    '/about': { es: '/sobre-mi', en: '/about' },
    '/about/skills': { es: '/sobre-mi/skills', en: '/about/skills' },

    // Proyectos
    '/projects': { es: '/proyectos', en: '/projects' },
    '/projects/[slug]': { es: '/proyectos/[slug]', en: '/projects/[slug]' },

    // Contacto
    '/contact': { es: '/contacto', en: '/contact' },

    // Blog
    '/blog': { es: '/blog', en: '/blog' },
    '/blog/[slug]': { es: '/blog/[slug]', en: '/blog/[slug]' },

    // CV / Resume (elige si quieres /resume en EN)
    '/cv': { es: '/cv', en: '/resume' } // o { es: '/cv', en: '/cv' }
  }
});

export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);

export type Locale = (typeof routing.locales)[number];
