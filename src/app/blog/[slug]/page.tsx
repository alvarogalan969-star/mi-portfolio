import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { Metadata } from 'next';
import { MDXRenderer } from '@/lib/mdx';
import { getPostMeta } from '@/lib/content/blog';

const blogDir = path.join(process.cwd(), 'src', 'content', 'blog');

export function generateStaticParams() {
  return getPostMeta().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const file = path.join(blogDir, `${params.slug}.mdx`);
  if (!fs.existsSync(file)) return { title: 'Artículo no encontrado' };
  const raw = fs.readFileSync(file, 'utf8');
  const { data } = matter(raw);
  return {
    title: (data.title as string) ?? params.slug,
    description: (data.summary as string) ?? undefined,
    alternates: { canonical: `/blog/${params.slug}` },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const file = path.join(blogDir, `${params.slug}.mdx`);
  if (!fs.existsSync(file)) return <p>Artículo no encontrado.</p>;
  const raw = fs.readFileSync(file, 'utf8');
  const { content, data } = matter(raw);
  return (
    <article className="prose prose-neutral max-w-none">
      <h1>{(data.title as string) ?? params.slug}</h1>
      {data.summary && <p className="text-gray-600">{String(data.summary)}</p>}
      <MDXRenderer source={content} />
    </article>
  );
}
