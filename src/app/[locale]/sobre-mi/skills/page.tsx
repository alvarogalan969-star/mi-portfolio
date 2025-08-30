// src/app/[locale]/about/skills/page.tsx
import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { getPathname, type Locale } from "@/i18n/routing";
import { siteConfig } from "@/config/site.config";

export async function generateMetadata(
  { params: { locale } }: { params: { locale: Locale } }
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Skills" });
  const BASE = siteConfig.siteUrl.replace(/\/$/, "");
  const pathname = getPathname({ locale, href: "/about/skills" }); // mapeado a /sobre-mi/skills en ES
  const canonical = locale === "en" ? `${BASE}/en${pathname}` : `${BASE}${pathname}`;

  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical }
  };
}

export default async function SkillsPage(
  { params: { locale } }: { params: { locale: Locale } }
) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Skills" });
  const items = (t.raw("items") as string[]) ?? [];

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">{t("title")}</h1>
      <ul className="list-disc pl-5">
        {items.map((it, i) => (
          <li key={i}>{it}</li>
        ))}
      </ul>
    </section>
  );
}
