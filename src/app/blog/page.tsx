import type { Metadata } from "next";
import Link from "next/link";
import { jsonLd } from "@/lib/structured-data";
import { siteConfig } from "@/config/site.config";
// import { getPostMeta } from "@/lib/content/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notas y artículos sobre frontend, UX/UI y performance. React, Next.js, accesibilidad y SEO técnico.",
  alternates: { canonical: "/blog" },
};

const blogUrl = new URL("/blog", siteConfig.siteUrl).toString();

const blogLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Blog",
  url: blogUrl,
  description:
    "Notas y artículos sobre frontend, UX/UI y performance de " + siteConfig.author.name,
  inLanguage: "es-ES",
  publisher: { "@type": "Person", name: siteConfig.author.name, url: siteConfig.siteUrl },
};

const breadcrumbsLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: siteConfig.siteUrl },
    { "@type": "ListItem", position: 2, name: "Blog", item: blogUrl },
  ],
};

export default function BlogPage() {
  // const posts = await getPostMeta();
  // const isEmpty = posts.length === 0;
  const isEmpty = true;

  return (
    <>
      <section className="full-bleed border-b border-app bg-gradient-to-b from-zinc-50 to-white">
        <div className="mx-auto max-w-6xl px-6 py-16 bg-app text-app">
          <h1 className="text-4xl font-extrabold tracking-tight text-app">Blog</h1>
          <p className="mt-3 text-muted max-w-2xl">
            Notas de frontend, UX/UI y performance.
          </p>
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
              <span className="text-xl" aria-hidden="true">✍️</span>
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-app">Próximamente</h2>
            <p className="mt-2 text-muted">
              Estoy preparando los primeros artículos.{" "}
              <Link href="/contacto" className="font-medium text-indigo-600 hover:text-indigo-800">
                Escríbeme
              </Link>{" "}
              si te interesa un tema.
            </p>
          </div>
        ) : (
          <ul className="mx-auto max-w-6xl divide-y divide-zinc-200 rounded-2xl border border-app bg-card">
            {/* {posts.map((post) => (
              <li key={post.slug} className="p-6">
                <article>
                  <h2 className="text-xl font-semibold text-app">
                    <Link href={`/blog/${post.slug}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-1 text-muted">{post.excerpt}</p>
                  <time className="mt-2 block text-sm text-muted" dateTime={post.dateISO}>
                    {post.dateHuman}
                  </time>
                </article>
              </li>
            ))} */}
          </ul>
        )}
      </section>

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(blogLd)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbsLd)} />
    </>
  );
}
