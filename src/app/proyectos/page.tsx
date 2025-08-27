import type { Metadata } from "next";
import ProyectosEmptyState from "@/components/ProyectosEmptyState";
import { jsonLd } from "@/lib/structured-data";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Proyectos frontend con React y Next.js, optimizados en rendimiento, accesibilidad y SEO. Casos reales, UI limpia y buenas prácticas.",
  alternates: { canonical: "/proyectos" },
};

const proyectosUrl = new URL("/proyectos", siteConfig.siteUrl).toString();

const proyectosLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Proyectos",
  url: proyectosUrl,
  isPartOf: { "@type": "WebSite", url: siteConfig.siteUrl },
  about: { "@type": "Person", name: siteConfig.author.name, url: siteConfig.siteUrl },
};

const breadcrumbsLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: siteConfig.siteUrl },
    { "@type": "ListItem", position: 2, name: "Proyectos", item: proyectosUrl },
  ],
};

export default function ProyectosPage() {
  // Cuando tengas loader:
  // const projects = await getProjects();
  // const isEmpty = projects.length === 0;
  const isEmpty = true;

  return (
    <>
      <section className="full-bleed border-b border-app bg-gradient-to-b from-zinc-50 to-white">
        <div className="mx-auto max-w-6xl px-6 py-16 bg-app text-app">
          <h1 className="text-4xl font-extrabold tracking-tight text-app">Proyectos</h1>
          <p className="mt-3 text-muted max-w-2xl">
            Selección de trabajos con foco en rendimiento y UX.{" "}
            {isEmpty && "Estoy preparando el material…"}
          </p>
        </div>
      </section>

      <section className="py-16">
        {isEmpty ? (
          <ProyectosEmptyState />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {/* cards aquí */}
          </div>
        )}
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(proyectosLd)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbsLd)} />
    </>
  );
}
