import Image from "next/image";
import Link from "next/link";
import { getPathname, type Locale } from "@/i18n/routing";
import type { Project } from "contentlayer/generated";

export default function ProjectCard({ p, locale }: { p: Project; locale: Locale }) {
  const href = getPathname({
    locale,
    href: { pathname: "/projects/[slug]", params: { slug: p.slug } } // 👈 aquí
  });

  // Assets siguen en /public/projects/<slug>/...
  const coverSrc = p.coverUrl ?? `/projects/${p.slug}/${p.cover}`;

  return (
    <article className="group overflow-hidden rounded-2xl border hover:shadow-lg transition">
      <Link href={href} className="block">
        <div className="relative aspect-[16/9]">
          <Image
            src={coverSrc}
            alt={`Cover de ${p.title}`}
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 50vw"
            priority={false}
          />
        </div>
        <div className="p-4 space-y-2">
          <h3 className="text-lg font-semibold">{p.title}</h3>
          {p.summary && (
            <p className="text-sm text-zinc-600 dark:text-zinc-300 line-clamp-2">
              {p.summary}
            </p>
          )}
          {p.tech?.length ? (
            <ul className="flex flex-wrap gap-1 pt-1">
              {p.tech.slice(0, 6).map((t: string) => (
                <li key={t} className="text-xs px-2 py-0.5 rounded-full border">
                  {t}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </Link>
    </article>
  );
}
