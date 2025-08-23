"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import QuickMenu from "../QuickMenu";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Cierra el menú al navegar
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Cierra con Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="full-bleed sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
      {/* Contenedor centrado + padding lateral */}
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 sm:h-18 sm:px-8">
        {/* Logo / Marca */}
        <Link href="/" className="font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
          Álvaro.dev
          <span className="sr-only">Inicio</span>
        </Link>

        {/* Navegación desktop */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/sobre-mi" className="text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white">Sobre mí</Link>
          <Link href="/proyectos" className="text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white">Proyectos</Link>
          <Link href="/blog" className="text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white">Blog</Link>
          <Link
            href="/contacto"
            className="rounded-lg bg-indigo-600 px-3 py-2 text-white transition hover:bg-indigo-700"
          >
            Contacto
          </Link>

          {/* Botón de ajustes (tema ahora, idioma después) */}
          <QuickMenu className="ml-2" />
        </nav>

        {/* Botón hamburguesa (solo móvil) */}
        <button
          type="button"
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-300 bg-white hover:bg-zinc-50 outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800"
          aria-label="Abrir menú"
          aria-controls="mobile-menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {/* Icono hamburguesa / cerrar */}
          <svg
            className={`h-5 w-5 text-zinc-900 dark:text-zinc-100 transition ${open ? "hidden" : "block"}`}
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <line x1="3" x2="21" y1="6" y2="6" />
            <line x1="3" x2="21" y1="12" y2="12" />
            <line x1="3" x2="21" y1="18" y2="18" />
          </svg>
          <svg
            className={`h-5 w-5 text-zinc-900 dark:text-zinc-100 transition ${open ? "block" : "hidden"}`}
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Overlay + panel móvil */}
      <div
        className={`md:hidden ${open ? "fixed inset-0 z-40 bg-black/20" : "hidden"}`}
        onClick={() => setOpen(false)}
      />

      <div
        id="mobile-menu"
        className={`md:hidden absolute inset-x-0 top-16 z-50 origin-top transition
          ${open ? "scale-y-100 opacity-100" : "pointer-events-none scale-y-95 opacity-0"}`}
        aria-hidden={!open}
      >
        <nav
          className="mx-4 rounded-2xl border border-zinc-200 bg-white p-2 shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
          role="menu"
        >
          <Link
            href="/sobre-mi"
            className="block rounded-lg px-4 py-3 text-zinc-800 hover:bg-zinc-50 dark:text-zinc-100 dark:hover:bg-zinc-800"
            role="menuitem"
          >
            Sobre mí
          </Link>
          <Link
            href="/proyectos"
            className="block rounded-lg px-4 py-3 text-zinc-800 hover:bg-zinc-50 dark:text-zinc-100 dark:hover:bg-zinc-800"
            role="menuitem"
          >
            Proyectos
          </Link>
          <Link
            href="/blog"
            className="block rounded-lg px-4 py-3 text-zinc-800 hover:bg-zinc-50 dark:text-zinc-100 dark:hover:bg-zinc-800"
            role="menuitem"
          >
            Blog
          </Link>
          <Link
            href="/contacto"
            className="mt-2 block rounded-lg bg-indigo-600 px-4 py-3 text-center font-medium text-white hover:bg-indigo-700"
            role="menuitem"
          >
            Contacto
          </Link>

          {/* Bloque de ajustes (móvil) */}
          <div className="mt-2 rounded-lg bg-zinc-50 p-2 dark:bg-zinc-800/50">
            <div className="px-2 pb-1 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Ajustes rápidos
            </div>
            <QuickMenu className="w-full" />
          </div>
        </nav>
      </div>
    </header>
  );
}
