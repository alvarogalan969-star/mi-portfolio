// src/app/[locale]/cv/page.tsx
import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { getPathname, type Locale } from "@/i18n/routing";
import { siteConfig } from "@/config/site.config";

export async function generateMetadata(
  { params: { locale } }: { params: { locale: Locale } }
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "CV" });
  const BASE = siteConfig.siteUrl.replace(/\/$/, "");
  const pathname = getPathname({ locale, href: "/cv" }); // puedes mapear a '/resume' en EN
  const canonical = locale === "en" ? `${BASE}/en${pathname}` : `${BASE}${pathname}`;

  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical }
  };
}

export default async function CVPage(
  { params: { locale } }: { params: { locale: Locale } }
) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "CV" });

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">{t("title")}</h1>
      <p>{t("lead")}</p>
    </section>
  );
}
