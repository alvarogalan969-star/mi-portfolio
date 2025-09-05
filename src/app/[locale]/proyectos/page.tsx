// src/app/[locale]/projects/page.tsx
import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { getPathname, type Locale } from "@/i18n/routing";

import ProyectosEmptyState from "@/components/ProyectosEmptyState";
import { jsonLd } from "@/lib/structured-data";
import { siteConfig } from "@/config/site.config";

import { getProjects } from "@/lib/content/projects";
import Image from "next/image";

/** SEO por idioma */
export async function generateMetadata(
  { params }: { params: Promise<{ locale: Locale }> }
): Promise<Metadata> {
  const { locale } = await params;
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
  { params }: { params: Promise<{ locale: Locale }> }
) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Projects" });
  const tCommon = await getTranslations({ locale, namespace: "Common" });

  // 👉 Cargamos los proyectos desde /content/projects/<locale>/*.json
  const projects = getProjects(locale);
  const isEmpty = projects.length === 0;

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
  console.log("jsonLd typeof:", typeof jsonLd);
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
          <div className="mx-auto max-w-6xl px-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => {
              const href = getPathname({
                locale,
                href: { pathname: "/projects/[slug]", params: { slug: p.slug } }
              });
              return (
                <a
                  key={p.slug}
                  href={href}
                  className="group rounded-2xl border border-zinc-200 hover:border-zinc-300 hover:shadow-md transition overflow-hidden"
                >
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={p.cover}
                      alt={p.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-lg font-semibold">{p.title}</h2>
                    <p className="mt-1 text-sm text-muted">{p.description}</p>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </section>

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(proyectosLd)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbsLd)} />
    </>
  );
}
