'use client';

import {useEffect, useState} from 'react';
import {useLocale, useTranslations} from 'next-intl';
import {Link, usePathname} from '@/i18n/routing';
import Logo from '@/components/Logo';
import QuickMenu from '../QuickMenu';

// Lo que puede devolver tu usePathname tipado para rutas dinámicas
type DynamicPath = {
  pathname: string;
  params?: Record<string, string | string[]>;
  query?: Record<string, string | string[]>;
};

// Derivamos el tipo de href a partir de Link
type LinkHref = React.ComponentProps<typeof Link>['href'];

// Normaliza a LinkHref (estáticas -> literal; dinámicas -> objeto)
function toLinkHref(p: string | DynamicPath): LinkHref {
  if (typeof p !== 'string') {
    return {
      pathname: p.pathname as never, // literal dinámico generado (p.ej., '/projects/[slug]')
      params: p.params as never,
      query: p.query as never
    } as LinkHref;
  }
  switch (p) {
    case '/':
    case '/about':
    case '/projects':
    case '/contact':
    case '/blog':
    case '/cv':
      return p;
    default:
      // Fallback: deja pasar el pathname actual (localizado o no).
      // TS no lo tiene en el union → cast explícito.
    return p as unknown as LinkHref;  }
}

export default function Header() {
  const [open, setOpen] = useState(false);

  // Puede ser string o DynamicPath
  const rawPathname = usePathname() as string | DynamicPath;
  const hrefActual: LinkHref = toLinkHref(rawPathname);

  const locale = useLocale();
  const tNav = useTranslations('Nav');
  const t = useTranslations('Header');

  // Cierra el panel móvil al navegar
  useEffect(() => { setOpen(false); }, [rawPathname]);

  // Cierra con Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') setOpen(false); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header className="full-bleed sticky top-0 z-50 border-b border-app bg-app-80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 sm:h-18 sm:px-8">
        {/* Logo / Marca */}
        <Logo className="h-7 w-auto" />

        {/* Navegación desktop */}
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link href="/about" className="text-muted hover:text-app">{tNav('about')}</Link>
          <Link href="/projects" className="text-muted hover:text-app">{tNav('projects')}</Link>
          <Link href="/blog" className="text-muted hover:text-app">{tNav('blog')}</Link>
          <Link
            href="/contact"
            className="rounded-lg bg-indigo-600 px-3 py-2 text-white transition hover:bg-indigo-700"
          >
            {tNav('contact')}
          </Link>

          {/* Selector de idioma (conserva la ruta actual) */}
          <div className="ml-2 flex items-center gap-1" aria-label={t('lang.label')}>
            <Link
              href={hrefActual}
              locale="es"
              aria-current={locale === 'es' ? 'true' : undefined}
              className={`rounded-md px-2 py-1 text-xs font-semibold transition ${
                locale === 'es' ? 'bg-card text-app border border-app' : 'text-muted hover:text-app'
              }`}
            >
              {t('lang.es')}
            </Link>
            <span className="text-zinc-300">/</span>
            <Link
              href={hrefActual}
              locale="en"
              aria-current={locale === 'en' ? 'true' : undefined}
              className={`rounded-md px-2 py-1 text-xs font-semibold transition ${
                locale === 'en' ? 'bg-card text-app border border-app' : 'text-muted hover:text-app'
              }`}
            >
              {t('lang.en')}
            </Link>
          </div>

          <QuickMenu className="ml-2" />
        </nav>

        {/* Botón hamburguesa (solo móvil) */}
        <button
          type="button"
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-app bg-card outline-none hover:bg-card focus-visible:ring-2 focus-visible:ring-indigo-300"
          aria-label={open ? t('menu.close') : t('menu.open')}
          aria-controls="mobile-menu"
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
        >
          {/* Iconos */}
          <svg className={`h-5 w-5 text-app transition ${open ? 'hidden' : 'block'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="3" x2="21" y1="6" y2="6" />
            <line x1="3" x2="21" y1="12" y2="12" />
            <line x1="3" x2="21" y1="18" y2="18" />
          </svg>
          <svg className={`h-5 w-5 text-app transition ${open ? 'block' : 'hidden'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Overlay clicable para cerrar */}
      <div className={`md:hidden ${open ? 'fixed inset-0 z-40 bg-black/20' : 'hidden'}`} onClick={() => setOpen(false)} />

      {/* Panel móvil */}
      <div
        id="mobile-menu"
        className={`absolute inset-x-0 top-16 z-50 origin-top transition md:hidden ${
          open ? 'scale-y-100 opacity-100' : 'pointer-events-none scale-y-95 opacity-0'
        }`}
        aria-hidden={!open}
      >
        <nav className="mx-4 rounded-2xl border border-app bg-card p-2 shadow-xl" role="menu">
          <Link href="/about" className="block rounded-lg px-4 py-3 text-muted hover:bg-card hover:text-app" role="menuitem">
            {tNav('about')}
          </Link>
          <Link href="/projects" className="block rounded-lg px-4 py-3 text-muted hover:bg-card hover:text-app" role="menuitem">
            {tNav('projects')}
          </Link>
          <Link href="/blog" className="block rounded-lg px-4 py-3 text-muted hover:bg-card hover:text-app" role="menuitem">
            {tNav('blog')}
          </Link>
          <Link href="/contact" className="mt-2 block rounded-lg bg-indigo-600 px-4 py-3 text-center font-medium text-white hover:bg-indigo-700" role="menuitem">
            {tNav('contact')}
          </Link>

          {/* Ajustes rápidos */}
          <div className="mt-2 rounded-lg bg-card p-2">
            <div className="px-2 pb-1 text-xs font-semibold uppercase tracking-wide text-muted">
              {t('quick.title')}
            </div>

            {/* Selector de idioma en móvil */}
            <div className="mb-2 flex w-full items-center justify-between gap-2">
              <Link
                href={hrefActual}
                locale="es"
                aria-current={locale === 'es' ? 'true' : undefined}
                className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition ${
                  locale === 'es' ? 'border-app bg-card text-app' : 'border-app text-muted hover:text-app'
                }`}
              >
                {t('lang.es')}
              </Link>
              <Link
                href={hrefActual}
                locale="en"
                aria-current={locale === 'en' ? 'true' : undefined}
                className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition ${
                  locale === 'en' ? 'border-app bg-card text-app' : 'border-app text-muted hover:text-app'
                }`}
              >
                {t('lang.en')}
              </Link>
            </div>

            <QuickMenu className="w-full" />
          </div>
        </nav>
      </div>
    </header>
  );
}
