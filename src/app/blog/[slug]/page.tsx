// src/app/blog/[slug]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

// Cuando tengas loader real, podrás volver a usar PostMeta y post.*
// type PostMeta = {
//   slug: string;
//   title: string;
//   excerpt?: string;
//   date: string;
//   updatedAt?: string;
//   cover?: string;
// };
// async function getPostBySlug(slug: string): Promise<PostMeta | null> { /* ... */ }

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const { slug } = params;

  // TODO: cuando tengas contenido, carga el post aquí.
  // const post = await getPostBySlug(slug);
  // if (post) { ...metas completas... }

  // Mientras no hay contenido, evita thin content:
  return {
    title: `Blog — ${slug}`,
    description: "Artículo en preparación.",
    alternates: { canonical: `/blog/${slug}` },
    robots: { index: false, follow: true },
  };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  return (
    <main className="py-16">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-app">Artículo: {slug}</h1>
        <p className="mt-2 text-muted">Contenido próximamente.</p>
      </header>

      <div
        className="rounded-2xl border border-dashed border-app bg-card p-10 text-center"
        role="status"
        aria-live="polite"
      >
        <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-card shadow-sm ring-1 ring-zinc-200">
          <span className="text-xl" aria-hidden="true">✍️</span>
        </div>
        <h2 className="mt-4 text-2xl font-semibold text-app">Próximamente</h2>
        <p className="mt-2 text-muted">
          Estoy preparando este artículo. Mientras tanto, vuelve al{" "}
          <Link href="/blog" className="font-medium text-indigo-600 hover:text-indigo-800">
            blog
          </Link>.
        </p>
      </div>
    </main>
  );
}
