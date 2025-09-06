// src/app/[locale]/blog/[slug]/page.tsx
import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link, getPathname, type Locale } from "@/i18n/routing";
import { siteConfig } from "@/config/site.config";

import { notFound } from "next/navigation";
import MDX from "@/components/MDX";
import { getPostBySlug } from "@/lib/content/blog";

export async function generateMetadata(
  { params: { locale, slug } }: { params: { locale: Locale; slug: string } }
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Blog" });
  const post = getPostBySlug(slug);

  const BASE = siteConfig.siteUrl.replace(/\/$/, "");
  const pathname = getPathname({ locale, href: { pathname: "/blog/[slug]", params: { slug } } });
  const canonical = locale === "en" ? `${BASE}/en${pathname}` : `${BASE}${pathname}`;

  if (!post) {
    return {
      title: `${t("title")} — ${slug}`,
      description: t("post.preparingDesc"),
      alternates: { canonical },
      robots: { index: false, follow: true }
    };
  }

  const title = post.meta.title ?? slug;
  const description = post.meta.summary ?? t("description");

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description }
  };
}

export default async function PostPage(
  { params: { locale, slug } }: { params: { locale: Locale; slug: string } }
) {
  setRequestLocale(locale);
  const post = getPostBySlug(slug);
  if (!post) return notFound();

  const iso = post.meta.updatedAt || post.meta.date;

  return (
    <main className="py-16">
      <article className="prose prose-neutral max-w-3xl mx-auto px-6">
        <h1>{post.meta.title}</h1>
        {iso && (
          <time className="text-sm opacity-60" dateTime={iso}>
            {new Date(iso).toLocaleDateString(locale, { year: "numeric", month: "long", day: "2-digit" })}
          </time>
        )}
        <MDX source={post.content} />
        <p className="mt-8">
          <Link href={{ pathname: "/blog" }} className="font-medium text-indigo-600 hover:text-indigo-800">
            ← Volver al blog
          </Link>
        </p>
      </article>
    </main>
  );
}
