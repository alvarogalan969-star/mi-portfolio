'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useMDXComponent } from 'next-contentlayer/hooks';
import type { MDXComponents } from 'mdx/types';

/* ===========================
   Componentes MDX tipados
   =========================== */

type FigureProps = { src: string; alt?: string; caption?: string };
function Figure({ src, alt = '', caption }: FigureProps) {
  return (
    <figure className="my-6">
      <div className="relative aspect-[16/9] overflow-hidden rounded-xl border">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-sm text-zinc-500">{caption}</figcaption>
      )}
    </figure>
  );
}

type GalleryProps = { images: string[]; altBase?: string };
function Gallery({ images, altBase = '' }: GalleryProps) {
  return (
    <div className="my-6 grid gap-3 sm:grid-cols-2">
      {images.map((src, i) => (
        <div
          key={src}
          className="relative aspect-[16/10] overflow-hidden rounded-xl border"
        >
          <Image
            src={src}
            alt={altBase ? `${altBase} ${i + 1}` : ''}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      ))}
    </div>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-4 rounded-xl border border-amber-300/40 bg-amber-50 px-4 py-3 text-amber-900 dark:bg-amber-950/40 dark:text-amber-100">
      {children}
    </div>
  );
}

/** Enlaces internos con <Link> y externos con <a target="_blank"> */
function A(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { href = '#', children, ...rest } = props;
  const isInternal =
    typeof href === 'string' && (href.startsWith('/') || href.startsWith('#'));

  if (isInternal) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} {...rest} rel="noopener noreferrer" target="_blank">
      {children}
    </a>
  );
}

/** <pre> con scroll horizontal y esquinas redondeadas */
function Pre(props: React.HTMLAttributes<HTMLPreElement>) {
  const { className, ...rest } = props;
  return (
    <pre
      className={
        'overflow-x-auto rounded-lg border bg-zinc-50 p-4 dark:bg-zinc-900 ' +
        (className ?? '')
      }
      {...rest}
    />
  );
}

/** <img> nativo para casos donde el MDX use <img> (mejor lazy + decoding) */
function Img(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const { className, loading = 'lazy', decoding = 'async', ...rest } = props;
  return (
    <img
      loading={loading}
      decoding={decoding as 'auto' | 'sync' | 'async'}
      className={'rounded-lg ' + (className ?? '')}
      {...rest}
    />
  );
}

/* ===========================
   Mapa de componentes MDX
   =========================== */

const components = {
  a: A,
  pre: Pre,
  img: Img,
  Figure,
  Gallery,
  Callout,
} satisfies MDXComponents;

/* ===========================
   Renderer MDX
   =========================== */

export function MDXContent({ code }: { code?: string | null }) {
  if (!code) return null; // evita errores si no hay body.code
  const Component = useMDXComponent(code);
  return <Component components={components} />;
}
