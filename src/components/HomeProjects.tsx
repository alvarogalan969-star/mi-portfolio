// src/components/HomeProjects.tsx
import Image from "next/image";
import { type Locale, getPathname } from "@/i18n/routing";
import { getHomeProjects } from "@/lib/content/projects";

function truncate(text?: string, max = 140): string {
  if (!text) return "";
  return text.length > max ? text.slice(0, max).trimEnd() + "…" : text;
}

export default async function HomeProjects({
  locale,
  limit = 6
}: { locale: Locale; limit?: number }) {
  const items = getHomeProjects(locale).slice(0, limit);
  if (items.length === 0) return null;

  const cta = locale === "en" ? "See project" : "Ver proyecto";

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => {
          const href = getPathname({
            locale,
            href: { pathname: "/projects/[slug]", params: { slug: p.slug } }
          });
          const excerpt = truncate(p.summary ?? p.description, 140);

          return (
            <div
              key={p.slug}
              className="rounded-2xl border border-app bg-card transition-shadow hover:shadow-md overflow-hidden"
            >
              <a href={href} aria-label={p.title} className="relative block aspect-[16/9]">
                <Image
                  src={p.cover}
                  alt={p.title}
                  fill
                  sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                  className="object-cover"
                />
              </a>

              <div className="p-4">
                <a href={href} className="block">
                  <h3 className="text-lg font-semibold text-app">{p.title}</h3>
                </a>

                {excerpt && (
                  <p className="mt-1 text-sm text-muted">
                    {excerpt}
                  </p>
                )}

                <div className="mt-4">
                  <a
                    href={href}
                    className="inline-flex items-center gap-1 rounded-xl border border-app px-3 py-2 text-sm font-semibold text-app transition hover:bg-card"
                    aria-label={`${cta}: ${p.title}`}
                  >
                    {cta} →
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
