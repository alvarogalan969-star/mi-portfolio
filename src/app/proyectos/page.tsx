import type { Metadata } from "next";
import ProyectosEmptyState from "@/components/ProyectosEmptyState";
// Si tienes el loader, úsalo. Si no, deja comentada la línea siguiente.
// import { getProjects } from "@/lib/content/projects";

export const metadata: Metadata = {
  title: "Proyectos",
  description: "Selección de proyectos y trabajos. Próximamente.",
  alternates: { canonical: "/proyectos" },
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
    </>
  );
}
