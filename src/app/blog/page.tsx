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
      <section className="full-bleed border-b border-zinc-200 bg-gradient-to-b from-zinc-50 to-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900">Blog</h1>
          <p className="mt-3 text-zinc-600 max-w-2xl">Notas de frontend, UX/UI y performance.</p>
        </div>
      </section>

      <section className="py-16">
        {isEmpty ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-10 text-center">
            <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-zinc-200">
              <span className="text-xl">✍️</span>
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-zinc-900">Próximamente</h2>
            <p className="mt-2 text-zinc-600">
              Estoy preparando los primeros artículos.{" "}
              <a href="/contacto" className="font-medium text-indigo-600 hover:text-indigo-800">Escríbeme</a> si te interesa un tema.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-zinc-200 rounded-2xl border border-zinc-200 bg-white">{/* items */}</ul>
        )}
      </section>
    </>
  );
}
