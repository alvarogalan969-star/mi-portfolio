// src/components/HomeProjects.tsx
import Image from "next/image";
import { type Locale, getPathname } from "@/i18n/routing";
import { getHomeProjects } from "@/lib/content/projects";

export default async function HomeProjects({
    locale,
    limit = 2
}: { locale: Locale; limit?: number }) {
    const items = getHomeProjects(locale).slice(0, limit);

    if (items.length === 0) return null;

    return (
        <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl font-bold">Proyectos destacados</h2>
            <a
            href={getPathname({ locale, href: "/projects" })}
            className="text-sm underline"
            >
            Ver todos
            </a>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => {
            const href = getPathname({
                locale,
                href: { pathname: "/projects/[slug]", params: { slug: p.slug } }
            });
            return (
                <a
                key={p.slug}
                href={href}
                className="group rounded-2xl border border-zinc-200 hover:border-zinc-300 hover:shadow-md transition overflow-hidden"
                >
                <div className="relative aspect-[16/9]">
                    <Image
                    src={p.cover}
                    alt={p.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                    />
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-semibold">{p.title}</h3>
                    <p className="mt-1 text-sm text-muted">{p.description}</p>
                </div>
                </a>
            );
            })}
        </div>
        </section>
    );
}
