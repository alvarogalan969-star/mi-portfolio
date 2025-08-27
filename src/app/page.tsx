import HeroPortrait from "@/components/HeroPortrait";
import ProyectosEmptyState from "@/components/ProyectosEmptyState";
import Link from "next/link";
import { jsonLd } from "@/lib/structured-data";
import { siteConfig } from "@/config/site.config";

export const metadata = {
  title: "Inicio",
  description:
    "Álvaro Galán, desarrollador frontend especializado en React, Next.js y SEO técnico. Portafolio con proyectos centrados en rendimiento, accesibilidad y UX.",
  alternates: { canonical: "/" },
};

const homeLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Inicio",
  url: siteConfig.siteUrl,
  description: "Portafolio y proyectos de " + siteConfig.author.name,
  isPartOf: { "@type": "WebSite", url: siteConfig.siteUrl },
};

export default function HomePage() {
  const isEmpty = true; // cuando tengas proyectos destacados, cámbialo o pinta las cards

  return (
    <>
      {/* HERO a todo el ancho */}
      <section className="full-bleed border-b border-app bg-gradient-to-b from-zinc-50 to-white">
        {/* convertimos a grid para colocar texto + imagen */}
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-28 grid md:grid-cols-2 gap-12 items-center bg-app text-app">
          {/* Columna texto */}
          <div className="text-center md:text-left">
            <p className="uppercase tracking-[0.18em] text-xs text-muted">portfolio</p>
            <h1 className="mt-2 text-5xl sm:text-6xl font-extrabold tracking-tight text-app">
              Hola, soy{" "}
              <span
                className="
                  bg-gradient-to-r from-indigo-600 to-teal-500
                  bg-clip-text text-transparent
                  [-webkit-text-fill-color:transparent]
                  [-webkit-background-clip:text]
                "
              >
                Álvaro
              </span>
            </h1>
            <p className="mx-auto md:mx-0 mt-6 max-w-2xl text-lg leading-8 text-muted">
              Frontend developer con experiencia en QA y proyectos para grandes compañías. Actualmente en MB3-Gestión y, además, desarrollando proyectos personales relacionados con IA, automatización y desarrollo web.
            </p>
            <div className="mt-8 flex flex-wrap items-center md:justify-start justify-center gap-3">
              <Link
                href="/proyectos"
                className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition shadow-sm"
              >
                Ver proyectos
              </Link>
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold border border-app text-muted hover:bg-card transition"
              >
                Contactar
              </Link>
            </div>
          </div>

          {/* Columna imagen (Hero con efecto) */}
          <div className="justify-self-center">
            <HeroPortrait />
          </div>
        </div>
      </section>

      {/* PROYECTOS (mismo mensaje que en /proyectos) */}
      <section id="proyectos" className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-app text-center md:text-left">Proyectos</h2>
          <p className="mt-3 text-muted max-w-2xl text-center md:text-left mx-auto md:mx-0">
            Selección de trabajos con foco en rendimiento y UX. {isEmpty && "Estoy preparando el material…"}
          </p>

          <div className="mt-8">
            {isEmpty ? (
              <ProyectosEmptyState />
            ) : (
              <div className="grid gap-6 sm:grid-cols-2">
                {/* aquí irían tus cards destacadas cuando tengas contenido */}
              </div>
            )}
          </div>

          <div className="mt-6 text-center md:text-left">
            <Link href="/proyectos" className="font-medium text-indigo-600 hover:text-indigo-800">
              Ver todos los proyectos →
            </Link>
          </div>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(homeLd)}
      />
    </>
  );
}
