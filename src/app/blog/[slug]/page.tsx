// src/app/blog/[slug]/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Próximamente",
  description: "Artículos en preparación.",
};

export default function PostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  return (
    <main className="py-16">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900">Artículo: {slug}</h1>
        <p className="mt-2 text-zinc-600">Contenido próximamente.</p>
      </header>

      <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-10 text-center">
        <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-zinc-200">
          <span className="text-xl">✍️</span>
        </div>
        <h2 className="mt-4 text-2xl font-semibold text-zinc-900">Próximamente</h2>
        <p className="mt-2 text-zinc-600">
          Estoy preparando este artículo. Mientras tanto, vuelve al{" "}
          <a href="/blog" className="font-medium text-indigo-600 hover:text-indigo-800">blog</a>.
        </p>
      </div>
    </main>
  );
}
