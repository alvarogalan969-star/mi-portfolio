import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';

// Componentes MDX (puedes extenderlos)
function H2(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 {...props} className="mt-10 text-2xl font-semibold scroll-mt-24" />;
}
function P(props: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p {...props} className="my-4" />;
}
function Pre(props: React.HTMLAttributes<HTMLPreElement>) {
  return <pre {...props} className="rounded-lg border border-gray-200 p-4 overflow-x-auto" />;
}
function Code(props: React.HTMLAttributes<HTMLElement>) {
  return <code {...props} className="px-1 py-0.5 rounded bg-gray-100" />;
}
const components = { h2: H2, p: P, pre: Pre, code: Code };

export function MDXRenderer({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: 'wrap' }],
            rehypeHighlight,
          ],
          format: 'mdx',
        },
      }}
      components={components as any}
    />
  );
}
