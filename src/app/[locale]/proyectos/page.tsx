// src/app/[locale]/projects/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { getPathname, type Locale } from "@/i18n/routing";

import { jsonLd } from "@/lib/structured-data";
import { siteConfig } from "@/config/site.config";
import { getProjects, getProjectBySlug } from "@/lib/content/projects";

import ClientOnly from "@/components/ClientOnly";
import ProjectMedia from "@/components/ProjectMedia";

const DEFAULT_COVER = "/images/placeholder/cover.jpg";

type Params = { locale: Locale; slug: string };

/** SSG de slugs (por defecto ES) */
export function generateStaticParams() {
  return getProjects("es").map((p) => ({ slug: p.slug }));
}

/** Metadata por idioma + canonical correcto */
export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "Projects" });
  const project = getProjectBySlug(slug, locale);

  const BASE = siteConfig.siteUrl.replace(/\/$/, "");
  const pathname = getPathname({
    locale,
    href: { pathname: "/projects/[slug]", params: { slug } }
  });
  const canonical = locale === "en" ? `${BASE}/en${pathname}` : `${BASE}${pathname}`;

  if (!project) {
    return {
      title: `${t("title")} — ${slug}`,
      description: t("detail.notFound", { slug }),
      alternates: { canonical },
      robots: { index: false, follow: true }
    };
  }

  const desc = project.summary ?? project.description ?? t("detail.descriptionFallback");

  return {
    title: project.title,
    description: desc,
    alternates: { canonical },
    openGraph: {
      title: project.title,
      description: desc,
      url: canonical,
      type: "article",
      images: project.cover ? [{ url: project.cover }] : undefined
    }
  };
}

export default async function ProjectPage(
  { params }: { params: Promise<Params> }
) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Projects" });
  const tCommon = await getTranslations({ locale, namespace: "Common" });

  const project = getProjectBySlug(slug, locale);
  if (!project) return notFound();

  const BASE = siteConfig.siteUrl.replace(/\/$/, "");
  const pathname = getPathname({
    locale,
    href: { pathname: "/projects/[slug]", params: { slug } }
  });
  const url = locale === "en" ? `${BASE}/en${pathname}` : `${BASE}${pathname}`;
  const inLanguage = locale === "en" ? "en-US" : "es-ES";
  const desc = project.summary ?? project.description ?? t("detail.descriptionFallback");

  const projectLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: desc,
    url,
    inLanguage,
    image: [project.cover ?? DEFAULT_COVER, ...(project.images ?? [])],
    author: { "@type": "Person", name: siteConfig.author.name, url: siteConfig.siteUrl },
    isPartOf: { "@type": "WebSite", url: siteConfig.siteUrl }
  };

  const breadcrumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: tCommon("siteName"), item: siteConfig.siteUrl },
      {
        "@type": "ListItem", position: 2, name: t("title"),
        item: `${BASE}${locale === "en" ? "/en" : ""}${getPathname({ locale, href: "/projects" })}`
      },
      { "@type": "ListItem", position: 3, name: project.title, item: url }
    ]
  };

  return (
    <>
      <main className="mx-auto max-w-6xl px-6 py-12">
        <a href={getPathname({ locale, href: "/projects" })} className="text-sm underline opacity-80">
          {locale === "en" ? "← Back to projects" : "← Volver a proyectos"}
        </a>

        <h1 className="mt-3 text-3xl font-bold">{project.title}</h1>
        {desc && <p className="mt-2 text-muted max-w-2xl">{desc}</p>}

        {/* Media: solo cliente para evitar hydration issues en móvil */}
        <div suppressHydrationWarning>
          <ClientOnly>
            <ProjectMedia
              cover={project.cover ?? DEFAULT_COVER}
              images={project.images ?? []}
              title={project.title}
            />
          </ClientOnly>
        </div>
      </main>

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(projectLd)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbsLd)} />
    </>
  );
}
