import * as React from "react";
import type { MDXComponents } from "mdx/types";

/**
 * Mapea/estiliza componentes MDX si algún día activas MDX.
 * Con Next + @next/mdx, este helper será detectado automáticamente.
 * (Mientras tanto, no rompe nada y pasa ESLint.)
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
      <a {...props} className={["text-indigo-600 underline", props.className].filter(Boolean).join(" ")} />
    ),
    img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img {...props} />
    ),
    pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
      <pre {...props} className={["rounded-lg border border-zinc-200 p-4 bg-zinc-50 overflow-x-auto", props.className].filter(Boolean).join(" ")} />
    ),
    code: (props: React.HTMLAttributes<HTMLElement>) => (
      <code {...props} className={["rounded bg-zinc-100 px-1.5 py-0.5", props.className].filter(Boolean).join(" ")} />
    ),
    ...components,
  };
}
