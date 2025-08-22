"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="full-bleed mt-20 border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* CTA superior */}
        <section className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 sm:p-8 text-center">
          <h2 className="text-2xl font-semibold text-zinc-900">¿Hablamos?</h2>
          <p className="mt-2 text-zinc-600">Disponible para proyectos y colaboraciones.</p>
          <div className="mt-4 flex justify-center gap-3">
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition shadow-sm"
            >
              Contacto
            </Link>
            <Link
              href="/sobre-mi"
              className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold border border-zinc-300 text-zinc-800 hover:bg-zinc-50 transition"
            >
              Sobre mí
            </Link>
          </div>
        </section>

        {/* Bloque principal */}
        <div className="mt-12 grid gap-10 sm:grid-cols-2">
          <div>
            <Link href="/" className="font-extrabold tracking-tight text-zinc-900">
              Álvaro.dev
            </Link>
            <p className="mt-3 max-w-sm text-zinc-600">
              Frontend con visión full-stack. UX, accesibilidad y rendimiento.
            </p>
          </div>

          <div className="sm:text-right">
            <nav className="flex items-center gap-5 justify-start sm:justify-end">
              <Link href="/sobre-mi" className="text-zinc-700 hover:text-zinc-900">Sobre mí</Link>
              <Link href="/proyectos" className="text-zinc-700 hover:text-zinc-900">Proyectos</Link>
              <Link href="/blog" className="text-zinc-700 hover:text-zinc-900">Blog</Link>
              <Link href="/contacto" className="text-zinc-700 hover:text-zinc-900">Contacto</Link>
            </nav>

            {/* Sociales */}
            <div className="mt-5 flex gap-4 justify-start sm:justify-end">
              <a
                href="https://github.com/tuusuario"
                aria-label="GitHub"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-300 hover:bg-zinc-50"
              >
                <svg className="h-5 w-5 text-zinc-700 group-hover:text-zinc-900" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 .5C5.73.5.99 5.24.99 11.5c0 4.85 3.15 8.97 7.52 10.42.55.1.75-.24.75-.53 0-.26-.01-1.12-.02-2.03-3.06.66-3.71-1.3-3.71-1.3-.5-1.28-1.23-1.62-1.23-1.62-.99-.67.08-.66.08-.66 1.09.08 1.66 1.12 1.66 1.12.98 1.66 2.58 1.18 3.22.9.1-.71.38-1.18.69-1.45-2.44-.28-5-1.22-5-5.42 0-1.2.43-2.19 1.13-2.96-.11-.28-.49-1.4.11-2.92 0 0 .93-.3 3.04 1.13.89-.25 1.84-.37 2.79-.37.94 0 1.9.12 2.79.37 2.1-1.44 3.03-1.13 3.03-1.13.6 1.52.22 2.64.11 2.92.7.77 1.13 1.76 1.13 2.96 0 4.21-2.57 5.14-5.02 5.41.39.34.74 1.01.74 2.04 0 1.47-.01 2.65-.01 3.01 0 .29.2.64.75.53A10.99 10.99 0 0 0 23 11.5C23 5.24 18.27.5 12 .5Z"/>
                </svg>
              </a>

              <a
                href="https://www.linkedin.com/in/tuusuario"
                aria-label="LinkedIn"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-300 hover:bg-zinc-50"
              >
                <svg className="h-5 w-5 text-zinc-700 group-hover:text-zinc-900" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zM8.5 8.5h3.83v1.98h.05c.53-1 1.82-2.06 3.75-2.06 4.01 0 4.75 2.64 4.75 6.07V23h-4v-5.92c0-1.41-.03-3.22-1.96-3.22-1.96 0-2.26 1.53-2.26 3.12V23h-4V8.5z"/>
                </svg>
              </a>

              <a
                href="mailto:tu@email.com"
                aria-label="Email"
                className="group inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-300 hover:bg-zinc-50"
              >
                <svg className="h-5 w-5 text-zinc-700 group-hover:text-zinc-900" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 13.065 0 6V4l12 7 12-7v2l-12 7.065ZM0 8l12 7 12-7v12H0V8Z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Línea inferior */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-zinc-200 pt-6 sm:flex-row">
          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} Álvaro. Todos los derechos reservados.
          </p>
          <p className="text-sm text-zinc-500">
            Hecho con{" "}
            <a href="https://nextjs.org" target="_blank" rel="noreferrer" className="underline decoration-zinc-300 hover:decoration-zinc-500">
              Next.js
            </a>{" "}
            +{" "}
            <a href="https://tailwindcss.com" target="_blank" rel="noreferrer" className="underline decoration-zinc-300 hover:decoration-zinc-500">
              Tailwind
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
