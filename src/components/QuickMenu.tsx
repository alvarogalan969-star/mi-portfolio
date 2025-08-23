'use client';

import {useEffect, useRef, useState} from 'react';
import {useTheme} from 'next-themes';

type Props = {
  className?: string;
  showLabelOnMdUp?: boolean; // si quieres texto al lado del icono en desktop
};

export default function QuickMenu({className = '', showLabelOnMdUp = false}: Props) {
  const {theme, setTheme, resolvedTheme} = useTheme();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
        className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-800 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
      >
        {/* Icono sol/luna según tema resuelto */}
        {active === 'dark' ? (
          <MoonIcon className="h-4 w-4" />
        ) : active === 'light' ? (
          <SunIcon className="h-4 w-4" />
        ) : (
          <SystemIcon className="h-4 w-4" />
        )}
        {showLabelOnMdUp && <span className="hidden md:inline">Ajustes</span>}
        <ChevronDown className="h-4 w-4 opacity-70" />
      </button>

      {/* Dropdown */}
      <div
        role="menu"
        aria-hidden={!open}
        className={`absolute right-0 z-[60] mt-2 w-56 origin-top-right rounded-xl border border-zinc-200 bg-white p-1 shadow-xl transition 
        dark:border-zinc-700 dark:bg-zinc-900 ${open ? 'scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0'}`}
      >
        <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
          Apariencia
        </div>
        <MenuItem
          active={active === 'light'}
          onClick={() => { setTheme('light'); setOpen(false); }}
          icon={<SunIcon className="h-4 w-4" />}
          label="Claro"
        />
        <MenuItem
          active={active === 'dark'}
          onClick={() => { setTheme('dark'); setOpen(false); }}
          icon={<MoonIcon className="h-4 w-4" />}
          label="Oscuro"
        />
        <MenuItem
          active={active === 'system'}
          onClick={() => { setTheme('system'); setOpen(false); }}
          icon={<SystemIcon className="h-4 w-4" />}
          label="Sistema"
        />

        {/* Separador y bloque futuro de idioma */}
        <div className="my-2 border-t border-zinc-200 dark:border-zinc-700" />
        <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
          Idioma
        </div>
        {/* Placeholder por ahora; cuando hagamos i18n lo conectamos */}
        <MenuItem disabled icon={<GlobeIcon className="h-4 w-4" />} label="Pronto: Español / English" />
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
      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm
        ${disabled ? 'opacity-50' : 'hover:bg-zinc-50 dark:hover:bg-zinc-800'}
        ${active ? 'bg-zinc-100 dark:bg-zinc-800/70 font-medium' : 'text-zinc-800 dark:text-zinc-100'}`}
    >
      {icon}
      <span className="flex-1">{label}</span>
      {active ? <CheckIcon className="h-4 w-4 opacity-80" /> : null}
    </button>
  );
}

/* ====== Iconos (SVG inline, sin dependencias) ====== */
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
