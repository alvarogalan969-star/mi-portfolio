// src/app/[locale]/blog/page.tsx
import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link, getPathname, type Locale } from "@/i18n/routing";
import { jsonLd } from "@/lib/structured-data";
import { siteConfig } from "@/config/site.config";
import { getPostMeta } from "@/lib/content/blog";

export const revalidate = 0;

export async function generateMetadata(
  { params: { locale } }: { params: { locale: Locale } }
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Blog" });

  const BASE = siteConfig.siteUrl.replace(/\/$/, "");
  const pathname = getPathname({ locale, href: "/blog" });
  const canonical =
    locale === "en" ? `${BASE}/en${pathname}` : `${BASE}${pathname}`;

  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical },
  };
}

export default async function BlogPage(
  { params: { locale } }: { params: { locale: Locale } }
) {
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Blog" });
  const tCommon = await getTranslations({ locale, namespace: "Common" });

  const posts = await getPostMeta();
  const isEmpty = posts.length === 0;

  const BASE = siteConfig.siteUrl.replace(/\/$/, "");
  const pathname = "/blog";
  const blogUrl =
    locale === "en" ? `${BASE}/en${pathname}` : `${BASE}${pathname}`;
  const inLanguage = locale === "en" ? "en-US" : "es-ES";

  const blogLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: t("title"),
    url: blogUrl,
    description: t("descriptionLd"),
    inLanguage,
    publisher: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.siteUrl,
    },
  };

  const breadcrumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: tCommon("siteName"),
        item: siteConfig.siteUrl,
      },
      { "@type": "ListItem", position: 2, name: t("title"), item: blogUrl },
    ],
  };

  return (
    <>
      <section className="full-bleed border-b border-app bg-gradient-to-b from-zinc-50 to-white">
        <div className="mx-auto max-w-6xl px-6 py-16 bg-app text-app">
          <h1 className="text-4xl font-extrabold tracking-tight text-app">
            {t("title")}
          </h1>
          <p className="mt-3 text-muted max-w-2xl">{t("lead")}</p>
        </div>
      </section>

      <section className="py-16">
        {isEmpty ? (
          <div
            className="rounded-2xl border border-dashed border-app bg-card p-10 text-center"
            role="status"
            aria-live="polite"
          >
            <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-card shadow-sm ring-1 ring-zinc-200">
              <span className="text-xl" aria-hidden="true">
                ✍️
              </span>
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-app">
              {t("empty.title")}
            </h2>
            <p className="mt-2 text-muted">
              {t("empty.description")}{" "}
              <Link
                href="/contact"
                className="font-medium text-indigo-600 hover:text-indigo-800"
              >
                {t("empty.cta")}
              </Link>{" "}
              {t("empty.suffix")}
            </p>
          </div>
        ) : (
          <ul className="mx-auto max-w-6xl divide-y divide-zinc-200 rounded-2xl border border-app bg-card">
            {posts.map((post) => {
              const iso = (post.updatedAt || post.date) ?? undefined;
              const human = iso
                ? new Date(iso).toLocaleDateString(locale, {
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                  })
                : "";
              return (
                <li key={post.slug} className="p-6 flex gap-4">
                  {post.cover && (
                    <img
                      src={post.cover}
                      alt={post.title}
                      className="w-32 h-20 object-cover rounded-lg border"
                    />
                  )}
                  <article>
                    <h2 className="text-xl font-semibold text-app">
                      <Link
                        href={{
                          pathname: "/blog/[slug]",
                          params: { slug: post.slug },
                        }}
                        className="hover:underline"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    {post.summary && (
                      <p className="mt-1 text-muted">{post.summary}</p>
                    )}
                    {iso && (
                      <time
                        className="mt-2 block text-sm text-muted"
                        dateTime={iso}
                      >
                        {human}
                      </time>
                    )}
                  </article>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(blogLd)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(breadcrumbsLd)}
      />
    </>
  );
}
