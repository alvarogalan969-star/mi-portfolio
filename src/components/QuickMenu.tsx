'use client';

import {useEffect, useRef, useState} from 'react';
import {useTheme} from 'next-themes';
import {useLocale, useTranslations} from 'next-intl';
import {Link, usePathname} from '@/i18n/routing';

type Props = {
  className?: string;
  showLabelOnMdUp?: boolean;
};

type DynamicPath = {
  pathname: string;
  params?: Record<string, string | string[]>;
  query?: Record<string, string | string[]>;
};

type LinkHref = React.ComponentProps<typeof Link>['href'];

// Normaliza a LinkHref (estáticas -> literal; dinámicas -> objeto)
function toLinkHref(p: string | DynamicPath): LinkHref {
  if (typeof p !== 'string') {
    return {
      pathname: p.pathname as never,
      params: p.params as never,
      query: p.query as never
    } as LinkHref;
  }
  // Asegura que si cae algo no soportado, volvemos a home
  switch (p) {
    case '/':
    case '/about':
    case '/about/skills':
    case '/projects':
    case '/projects/[slug]':
    case '/contact':
    case '/blog':
    case '/blog/[slug]':
    case '/cv':
    default:
      return '/';
  }
}

export default function QuickMenu({className = '', showLabelOnMdUp = false}: Props) {
  const {theme, setTheme, resolvedTheme} = useTheme();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // i18n
  const locale = useLocale();
  const tHeader = useTranslations('Header'); // usa Header.lang.label / es / en
  const t = {
    appearance: tHeader('quick.title', {default: 'Ajustes'}),
    light: 'Claro',
    dark: 'Oscuro',
    system: 'Sistema',
    langLabel: tHeader('lang.label'),
    es: tHeader('lang.es'),
    en: tHeader('lang.en')
  };

  // Ruta actual (localizada) -> LinkHref, para conservarla al cambiar de idioma
  const rawPathname = usePathname() as string | DynamicPath;
  const hrefActual: LinkHref = toLinkHref(rawPathname);

  useEffect(() => setMounted(true), []);

  // Cerrar al hacer click fuera
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open]);

  // Cerrar con Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  if (!mounted) return null;

  const active = (theme ?? resolvedTheme ?? 'system') as 'light' | 'dark' | 'system';

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="group inline-flex items-center gap-2 rounded-lg border border-app bg-card px-3 py-2 text-sm text-muted hover:bg-zinc-200 dark:hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
      >
        {/* Icono sol/luna según tema resuelto */}
        <span className="h-4 w-4 shrink-0 text-inherit transition-colors group-hover:text-white [&>svg]:h-4 [&>svg]:w-4">
          {active === 'dark' ? <MoonIcon /> : active === 'light' ? <SunIcon /> : <SystemIcon />}
        </span>
        {showLabelOnMdUp && <span className="hidden md:inline">{t.appearance}</span>}
        <span className="h-4 w-4 shrink-0 opacity-70 text-inherit transition-colors group-hover:text-white [&>svg]:h-4 [&>svg]:w-4">
          <ChevronDown />
        </span>
      </button>

      {/* Dropdown */}
      <div
        role="menu"
        aria-hidden={!open}
        className={`absolute right-0 z-[60] mt-2 w-56 origin-top-right rounded-xl border border-app bg-card p-1 shadow-xl transition 
        ${open ? 'scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0'}`}
      >
        {/* Apariencia */}
        <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-muted">
          {t.appearance}
        </div>
        <MenuItem
          active={active === 'light'}
          onClick={() => { setTheme('light'); setOpen(false); }}
          icon={<SunIcon />}
          label={t.light}
        />
        <MenuItem
          active={active === 'dark'}
          onClick={() => { setTheme('dark'); setOpen(false); }}
          icon={<MoonIcon />}
          label={t.dark}
        />
        <MenuItem
          active={active === 'system'}
          onClick={() => { setTheme('system'); setOpen(false); }}
          icon={<SystemIcon />}
          label={t.system}
        />

        {/* Idioma */}
        <div className="my-2 border-t border-app" />
        <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-muted">
          {t.langLabel}
        </div>
        <LangItemLink
          href={hrefActual}
          locale="es"
          current={locale === 'es'}
          icon={<GlobeIcon />}
          label={t.es}
          onSelect={() => setOpen(false)}
        />
        <button
          type="button"
          disabled
          role="menuitem"
          className="group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors
                    opacity-50 cursor-not-allowed text-app"
        >
          <span className="h-4 w-4 shrink-0 text-inherit [&>svg]:h-4 [&>svg]:w-4">
            <GlobeIcon />
          </span>
          <span className="flex-1">{t.en} (pronto)</span>
        </button>
      </div>
    </div>
  );
}

function MenuItem({
  icon,
  label,
  active,
  onClick,
  disabled = false
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      role="menuitem"
      className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-zinc-200 dark:hover:bg-zinc-700'}
        text-app hover:text-white`}
    >
      {/* Wrapper para colorear el SVG en hover */}
      <span className="h-4 w-4 shrink-0 text-inherit transition-colors group-hover:text-white [&>svg]:h-4 [&>svg]:w-4">
        {icon}
      </span>

      <span className="flex-1">{label}</span>

      {active ? (
        <span className="h-4 w-4 shrink-0 opacity-80 text-inherit transition-colors group-hover:text-white [&>svg]:h-4 [&>svg]:w-4">
          <CheckIcon />
        </span>
      ) : null}
    </button>
  );
}

/** Item de idioma como Link, visualmente igual que MenuItem */
function LangItemLink({
  href,
  locale,
  current,
  icon,
  label,
  onSelect
}: {
  href: LinkHref;
  locale: 'es' | 'en';
  current: boolean;
  icon: React.ReactNode;
  label: string;
  onSelect?: () => void;
}) {
  return (
    <Link
      href={href}
      locale={locale}
      aria-current={current ? 'true' : undefined}
      role="menuitem"
      className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors
        hover:bg-zinc-200 dark:hover:bg-zinc-700
        text-app hover:text-white`}
      onClick={onSelect}
    >
      <span className="h-4 w-4 shrink-0 text-inherit transition-colors group-hover:text-white [&>svg]:h-4 [&>svg]:w-4">
        {icon}
      </span>
      <span className="flex-1">{label}</span>
      {current ? (
        <span className="h-4 w-4 shrink-0 opacity-80 text-inherit transition-colors group-hover:text-white [&>svg]:h-4 [&>svg]:w-4">
          <CheckIcon />
        </span>
      ) : null}
    </Link>
  );
}

/* ====== Iconos (SVG inline) ====== */
function SunIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <circle cx="12" cy="12" r="4" strokeWidth="2" />
      <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function MoonIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function SystemIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <rect x="3" y="4" width="18" height="14" rx="2" strokeWidth="2" />
      <path d="M8 20h8" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function ChevronDown(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M20 6 9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function GlobeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <circle cx="12" cy="12" r="9" strokeWidth="2" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
