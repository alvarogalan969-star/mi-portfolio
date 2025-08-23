import type { Metadata } from "next";
// Si tienes el loader, úsalo. Si no, comenta la línea siguiente.
// import { getProjects } from "@/lib/content/projects";

export const metadata: Metadata = {
  title: "Proyectos",
  description: "Selección de proyectos y trabajos. Próximamente.",
  alternates: { canonical: "/proyectos" },
};

export default function ProyectosPage() {
  const isEmpty = true; // cuando tengas proyectos, ponlos aquí

  return (
    <>
      <section className="full-bleed border-b border-app bg-gradient-to-b from-zinc-50 to-white">
        <div className="mx-auto max-w-6xl px-6 py-16 bg-app text-app">
          <h1 className="text-4xl font-extrabold tracking-tight text-app">Proyectos</h1>
          <p className="mt-3 text-muted max-w-2xl">
            Selección de trabajos con foco en rendimiento y UX. {isEmpty && "Estoy preparando el material…"}
          </p>
        </div>
      </section>

      <section className="py-16">
        {isEmpty ? (
          <div className="rounded-2xl border border-dashed border-app bg-card p-10 text-center">
            <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-card shadow-sm ring-1 ring-zinc-200">
              <span className="text-xl">🛠️</span>
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-app">Próximamente</h2>
            <p className="mt-2 text-muted">
              Estoy puliendo los primeros proyectos.{" "}
              <a href="/contacto" className="font-medium text-indigo-600 hover:text-indigo-800">Contáctame</a> para ver demos privadas.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">{/* cards aquí */}</div>
        )}
      </section>
    </>
  );
}

