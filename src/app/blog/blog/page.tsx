import type { Metadata } from 'next';
import { getPostMeta } from '@/lib/content/blog';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Artículos técnicos, tutoriales y notas.',
  alternates: { canonical: '/blog' },
};

export default function BlogIndex() {
  const posts = getPostMeta();
  return (
    <section>
      <h1 className="text-3xl font-bold mb-4">Blog</h1>
      <ul className="space-y-3">
        {posts.map(p => (
          <li key={p.slug} className="border-b border-gray-200 pb-3">
            <a className="no-underline text-black" href={`/blog/${p.slug}`}>
              <span className="font-medium">{p.title}</span>
            </a>
            {p.summary && <p className="text-sm text-gray-600">{p.summary}</p>}
          </li>
        ))}
        {posts.length === 0 && <p className="text-gray-600">Aún no hay artículos.</p>}
      </ul>
    </section>
  );
}
