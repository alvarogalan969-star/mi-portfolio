// src/app/[locale]/blog/[slug]/page.tsx
import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link, getPathname, type Locale } from "@/i18n/routing";
import { siteConfig } from "@/config/site.config";

export async function generateMetadata(
  { params: { locale, slug } }: { params: { locale: Locale; slug: string } }
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Blog" });

  // Canonical por idioma (respeta localePrefix: 'as-needed')
  const BASE = siteConfig.siteUrl.replace(/\/$/, "");
  // ❌ Antes: href: `/blog/${slug}`
  // ✅ Ahora: href como objeto dinámico
  const pathname = getPathname({
    locale,
    href: { pathname: "/blog/[slug]", params: { slug } }
  }); // -> '/blog/mi-slug' según localePrefix
  const canonical = locale === "en" ? `${BASE}/en${pathname}` : `${BASE}${pathname}`;

  return {
    title: `${t("title")} — ${slug}`,
    description: t("post.preparingDesc"),
    alternates: { canonical },
    robots: { index: false, follow: true }
  };
}

export default async function PostPage(
  { params: { locale, slug } }: { params: { locale: Locale; slug: string } }
) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Blog" });

  return (
    <main className="py-16">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-app">
          {t("post.title", { slug })}
        </h1>
        <p className="mt-2 text-muted">{t("post.preparingLead")}</p>
      </header>

      <div
        className="rounded-2xl border border-dashed border-app bg-card p-10 text-center"
        role="status"
        aria-live="polite"
      >
        <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-card shadow-sm ring-1 ring-zinc-200">
          <span className="text-xl" aria-hidden="true">✍️</span>
        </div>
        <h2 className="mt-4 text-2xl font-semibold text-app">{t("empty.title")}</h2>
        <p className="mt-2 text-muted">
          {t("post.preparingHint")}{" "}
          <Link href="/blog" className="font-medium text-indigo-600 hover:text-indigo-800">
            {t("post.backToBlog")}
          </Link>.
        </p>
      </div>
    </main>
  );
}
