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
      <section className="full-bleed border-b border-zinc-200 bg-gradient-to-b from-zinc-50 to-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900">Proyectos</h1>
          <p className="mt-3 text-zinc-600 max-w-2xl">
            Selección de trabajos con foco en rendimiento y UX. {isEmpty && "Estoy preparando el material…"}
          </p>
        </div>
      </section>

      <section className="py-16">
        {isEmpty ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-10 text-center">
            <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-zinc-200">
              <span className="text-xl">🛠️</span>
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-zinc-900">Próximamente</h2>
            <p className="mt-2 text-zinc-600">
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

