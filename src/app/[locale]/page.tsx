import HeroPortrait from "@/components/HeroPortrait";
import ProyectosEmptyState from "@/components/ProyectosEmptyState";
import { jsonLd } from "@/lib/structured-data";
import { siteConfig } from "@/config/site.config";

import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link, type Locale } from "@/i18n/routing";

/** SEO por idioma */
export async function generateMetadata(
  { params: { locale } }: { params: { locale: Locale } }
): Promise<Metadata> {
  const tSEO = await getTranslations({ locale, namespace: "SEO" });
  return {
    title: tSEO("homeTitle"),
    description: tSEO("defaultDescription"),
    alternates: { canonical: "/" } // el layout ya añade hreflang/canonicals
  };
}

export default async function HomePage(
  { params: { locale } }: { params: { locale: Locale } }
) {
  setRequestLocale(locale);

  const tHero = await getTranslations({ locale, namespace: "Hero" });
  const tProj = await getTranslations({ locale, namespace: "Projects" });

  const isEmpty = true; // cuando tengas proyectos destacados, cámbialo o pinta las cards

  const homeLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: (await getTranslations({ locale, namespace: "SEO" }))("homeTitle"),
    url: siteConfig.siteUrl,
    description: `${siteConfig.author.name} — ${tHero("subtitle")}`,
    isPartOf: { "@type": "WebSite", url: siteConfig.siteUrl }
  };

  return (
    <>
      {/* HERO a todo el ancho */}
      <section className="full-bleed border-b border-app bg-gradient-to-b from-zinc-50 to-white">
        {/* grid: texto + imagen */}
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-28 grid md:grid-cols-2 gap-12 items-center bg-app text-app">
          {/* Columna texto */}
          <div className="text-center md:text-left">
            <p className="uppercase tracking-[0.18em] text-xs text-muted">portfolio</p>

            <h1 className="mt-2 text-5xl sm:text-6xl font-extrabold tracking-tight text-app">
              {tHero("introPrefix")}{" "}
              <span
                className="
                  bg-gradient-to-r from-indigo-600 to-teal-500
                  bg-clip-text text-transparent
                  [-webkit-text-fill-color:transparent]
                  [-webkit-background-clip:text]
                "
              >
                {tHero("firstName")}
              </span>
            </h1>

            <p className="mx-auto md:mx-0 mt-6 max-w-2xl text-lg leading-8 text-muted">
              {tHero("subtitle")}
            </p>

            <div className="mt-8 flex flex-wrap items-center md:justify-start justify-center gap-3">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition shadow-sm"
              >
                {tHero("ctaProjects")}
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold border border-app text-muted hover:bg-card transition"
              >
                {tHero("ctaContact")}
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
          <h2 className="text-3xl font-bold text-app text-center md:text-left">
            {tProj("title")}
          </h2>

          <p className="mt-3 text-muted max-w-2xl text-center md:text-left mx-auto md:mx-0">
            {/* Si no hay contenido aún, mostramos el aviso traducido */}
            {isEmpty ? tProj("empty") : " "}
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
            <Link
              href="/projects"
              className="font-medium text-indigo-600 hover:text-indigo-800"
            >
              {locale === "en" ? "See all projects →" : "Ver todos los proyectos →"}
            </Link>
          </div>
        </div>
      </section>

      {/* JSON-LD de la Home */}
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(homeLd)} />
    </>
  );
}
