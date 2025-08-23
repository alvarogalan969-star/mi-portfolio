import type { Metadata } from "next";
// import { getPostMeta } from "@/lib/content/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notas y artículos sobre frontend, UX/UI y performance. Próximamente.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const isEmpty = true;

  return (
    <>
      <section className="full-bleed border-b border-app bg-gradient-to-b from-zinc-50 to-white">
        <div className="mx-auto max-w-6xl px-6 py-16 bg-app text-app">
          <h1 className="text-4xl font-extrabold tracking-tight text-app">Blog</h1>
          <p className="mt-3 text-muted max-w-2xl">Notas de frontend, UX/UI y performance.</p>
        </div>
      </section>

      <section className="py-16">
        {isEmpty ? (
          <div className="rounded-2xl border border-dashed border-app bg-card p-10 text-center">
            <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-card shadow-sm ring-1 ring-zinc-200">
              <span className="text-xl">✍️</span>
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-app">Próximamente</h2>
            <p className="mt-2 text-muted">
              Estoy preparando los primeros artículos.{" "}
              <a href="/contacto" className="font-medium text-indigo-600 hover:text-indigo-800">Escríbeme</a> si te interesa un tema.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-zinc-200 rounded-2xl border border-app bg-card">{/* items */}</ul>
        )}
      </section>
    </>
  );
}
