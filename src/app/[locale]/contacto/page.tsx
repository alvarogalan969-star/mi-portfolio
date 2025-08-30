// src/app/[locale]/contact/page.tsx
import ContactForm from "@/components/contact/ContactForm";
import { jsonLd } from "@/lib/structured-data";
import { siteConfig } from "@/config/site.config";

import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { getPathname, type Locale } from "@/i18n/routing";

/** SEO por idioma */
export async function generateMetadata(
  { params: { locale } }: { params: { locale: Locale } }
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Contact" });

  // Canonical por idioma (respeta localePrefix:'as-needed')
  const BASE = siteConfig.siteUrl.replace(/\/$/, "");
  const pathname = getPathname({ locale, href: "/contact" }); // "/contact" (interno)
  const canonical = locale === "en" ? `${BASE}/en${pathname}` : `${BASE}${pathname.replace("/contact", "/contacto")}`;

  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical }
  };
}

export default async function ContactPage(
  { params: { locale } }: { params: { locale: Locale } }
) {
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Contact" });
  const tCommon = await getTranslations({ locale, namespace: "Common" });

  // URLs y LD localizados
  const BASE = siteConfig.siteUrl.replace(/\/$/, "");
  const contactPath = locale === "en" ? "/contact" : "/contacto";
  const contactUrl = `${BASE}${locale === "en" ? `/en${contactPath}` : contactPath}`;
  const inLanguage = locale === "en" ? "en-US" : "es-ES";

  const contactLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: t("title"),
    url: contactUrl,
    inLanguage,
    about: { "@type": "Person", name: siteConfig.author.name, url: siteConfig.siteUrl }
  };

  const breadcrumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: tCommon("siteName"), item: siteConfig.siteUrl },
      { "@type": "ListItem", position: 2, name: t("title"), item: contactUrl }
    ]
  };

  return (
    <>
      {/* Hero / encabezado */}
      <section className="full-bleed border-b border-app bg-gradient-to-b from-zinc-50 to-white">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center bg-app text-app">
          <h1 className="text-4xl font-extrabold tracking-tight text-app">{t("title")}</h1>
          <p className="mt-3 text-muted mx-auto max-w-2xl">{t("description")}</p>
        </div>
      </section>

      {/* Formulario */}
      <section className="py-16">
        <div className="mx-auto w-full max-w-2xl">
          <ContactForm />
        </div>
      </section>

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(contactLd)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbsLd)} />
    </>
  );
}
