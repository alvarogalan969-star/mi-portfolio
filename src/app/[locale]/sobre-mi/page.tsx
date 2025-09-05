// src/app/[locale]/about/page.tsx
import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { getPathname, type Locale } from "@/i18n/routing";

import { aboutText, skills, timeline } from "@/data/cv";
import Timeline from "@/components/Timeline";
import { SkillChips } from "@/components/SkillChips";
import { jsonLd } from "@/lib/structured-data";
import { siteConfig } from "@/config/site.config";

import EducationSection from "./education/Education";
import CVSection from "@/components/CVSection";

/** SEO por idioma */
export async function generateMetadata(
  { params: { locale } }: { params: { locale: Locale } }
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "About" });

  // Canonical por idioma (respeta localePrefix: 'as-needed')
  const BASE = siteConfig.siteUrl.replace(/\/$/, "");
  const pathname = getPathname({ locale, href: "/about" }); // '/sobre-mi' en ES si lo mapeas en routing.ts
  const canonical = locale === "en" ? `${BASE}/en${pathname}` : `${BASE}${pathname}`;

  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical }
  };
}

export default async function AboutPage(
  { params }: { params: Promise<{ locale: Locale }> }
) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "About" });
  const tCommon = await getTranslations({ locale, namespace: "Common" });

  // URLs + JSON-LD localizados
  const BASE = siteConfig.siteUrl.replace(/\/$/, "");
  const pathname = getPathname({ locale, href: "/about" });
  const url = locale === "en" ? `${BASE}/en${pathname}` : `${BASE}${pathname}`;
  const inLanguage = locale === "en" ? "en-US" : "es-ES";

  const aboutLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: t("title"),
    url,
    inLanguage,
    mainEntity: { "@type": "Person", name: siteConfig.author.name, url: siteConfig.siteUrl }
  };

  const breadcrumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: tCommon("siteName"), item: siteConfig.siteUrl },
      { "@type": "ListItem", position: 2, name: t("title"), item: url }
    ]
  };

  // Nota: 'aboutText', 'skills' y 'timeline' provienen de /data/cv.
  // Si quieres localizarlos, ver guía al final.
  const isArray = Array.isArray(aboutText);

  return (
    <>
      {/* Cabecera */}
      <section className="full-bleed border-b border-app bg-gradient-to-b from-zinc-50 to-white">
        <div className="mx-auto max-w-6xl px-6 py-16 bg-app text-app">
          <h1 className="text-4xl font-extrabold tracking-tight text-app">{t("title")}</h1>
          <div className="mt-3 max-w-2xl space-y-3">
            {isArray
              ? (aboutText as string[]).map((p, i) => (
                  <p key={i} className="text-muted">{p}</p>
                ))
              : <p className="text-muted">{String(aboutText)}</p>}
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-6 py-16 space-y-12">
        {/* Skills */}
        <section className="space-y-6" aria-labelledby="skills-heading">
          <h2 id="skills-heading" className="text-2xl font-semibold text-app">{t("skills.title")}</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <SkillChips title={t("skills.categories.languages")}    items={skills.lenguajes} />
            <SkillChips title={t("skills.categories.frameworks")}   items={skills.frameworks} />
            <SkillChips title={t("skills.categories.tools")}        items={skills.herramientas} />
            <SkillChips title={t("skills.categories.methods")}      items={skills.metodologias} />
            <SkillChips title={t("skills.categories.soft")}         items={skills.soft} />
            <SkillChips title={t("skills.categories.i18nLanguages")} items={skills.idiomas} />
          </div>
        </section>

        {/* Experiencia */}
        <section className="space-y-4" aria-labelledby="experience-heading">
          <h2 id="experience-heading" className="text-2xl font-semibold text-app">{t("experience.title")}</h2>
          <p className="text-sm text-muted">{t("experience.hint")}</p>
          <Timeline items={Array.isArray(timeline) ? timeline : []} />
        </section>

        <EducationSection />

        <div className="mt-6">
          <CVSection
            locale={locale}
            titleAs="h2"
            titleClassName="text-4xl font-extrabold"  // ← mismo tamaño que tus otros h2
            leadClassName="text-lg"                   // ← mismo tamaño que tus párrafos de sección
          />
        </div>
      </main>

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(aboutLd)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbsLd)} />
    </>
  );
}
