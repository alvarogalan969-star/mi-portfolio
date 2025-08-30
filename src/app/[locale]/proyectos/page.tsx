// src/app/[locale]/projects/page.tsx
import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { getPathname, type Locale } from "@/i18n/routing";

import ProyectosEmptyState from "@/components/ProyectosEmptyState";
import { jsonLd } from "@/lib/structured-data";
import { siteConfig } from "@/config/site.config";

/** SEO por idioma */
export async function generateMetadata(
  { params: { locale } }: { params: { locale: Locale } }
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Projects" });

  // Canonical por idioma (respeta localePrefix: 'as-needed')
  const BASE = siteConfig.siteUrl.replace(/\/$/, "");
  const pathname = getPathname({ locale, href: "/projects" }); // '/projects' interno → '/proyectos' en ES
  const canonical = locale === "en" ? `${BASE}/en${pathname}` : `${BASE}${pathname}`;

  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical }
  };
}

export default async function ProjectsPage(
  { params: { locale } }: { params: { locale: Locale } }
) {
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Projects" });
  const tCommon = await getTranslations({ locale, namespace: "Common" });

  // Cuando tengas loader real:
  // const projects = await getProjects();
  // const isEmpty = projects.length === 0;
  const isEmpty = true;

  // URLs y JSON-LD localizados
  const BASE = siteConfig.siteUrl.replace(/\/$/, "");
  const pathname = getPathname({ locale, href: "/projects" });
  const url = locale === "en" ? `${BASE}/en${pathname}` : `${BASE}${pathname}`;
  const inLanguage = locale === "en" ? "en-US" : "es-ES";

  const proyectosLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t("title"),
    url,
    inLanguage,
    isPartOf: { "@type": "WebSite", url: siteConfig.siteUrl },
    about: { "@type": "Person", name: siteConfig.author.name, url: siteConfig.siteUrl }
  };

  const breadcrumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: tCommon("siteName"), item: siteConfig.siteUrl },
      { "@type": "ListItem", position: 2, name: t("title"), item: url }
    ]
  };

  return (
    <>
      <section className="full-bleed border-b border-app bg-gradient-to-b from-zinc-50 to-white">
        <div className="mx-auto max-w-6xl px-6 py-16 bg-app text-app">
          <h1 className="text-4xl font-extrabold tracking-tight text-app">{t("title")}</h1>
          <p className="mt-3 text-muted max-w-2xl">
            {t("lead")} {isEmpty && t("empty")}
          </p>
        </div>
      </section>

      <section className="py-16">
        {isEmpty ? (
          <ProyectosEmptyState />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {/* cards aquí */}
          </div>
        )}
      </section>

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(proyectosLd)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbsLd)} />
    </>
  );
}
