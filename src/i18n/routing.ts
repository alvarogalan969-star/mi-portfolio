// src/i18n/routing.ts
import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
    locales: ['es', 'en'] as const,
    defaultLocale: 'es',
    // Oculta el prefijo en el idioma por defecto: "/" para ES, "/en" para inglés
    localePrefix: 'as-needed',
    // Opcional: slugs localizados
    // pathnames: {
    //   '/projects': {
    //     es: '/proyectos',
    //     en: '/projects'
    //   }
    // }
});

// Helpers tipados que respetan el locale actual
export const {Link, redirect, usePathname, useRouter, getPathname} =
    createNavigation(routing);
export type Locale = (typeof routing.locales)[number];
