import type { Metadata } from 'next';
import { getPostMeta } from '@/lib/content/blog';

type Params = { slug: string };

export function generateStaticParams() {
  return getPostMeta().map(p => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const post = getPostMeta().find(p => p.slug === params.slug);
  if (!post) return { title: 'Artículo no encontrado' };
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default function BlogPostPage({ params }: { params: Params }) {
  const post = getPostMeta().find(p => p.slug === params.slug);
  if (!post) return <p>Artículo no encontrado.</p>;
  return (
    <article className="prose max-w-none">
      <h1>{post.title}</h1>
      <p className="text-gray-600">{post.summary ?? ''}</p>
      <p>(Render MDX pendiente de integración)</p>
    </article>
  );
}
