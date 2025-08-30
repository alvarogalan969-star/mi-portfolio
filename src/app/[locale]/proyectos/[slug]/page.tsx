// src/app/[locale]/projects/[slug]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { getPathname, type Locale } from '@/i18n/routing';

import { jsonLd } from '@/lib/structured-data';
import { siteConfig } from '@/config/site.config';
import { getProjects, getProjectBySlug } from '@/lib/content/projects';

/** SSG de slugs (se combinará con los locales del layout) */
export function generateStaticParams() {
  return getProjects().map(p => ({ slug: p.slug }));
}

/** Metadata por idioma + canonical correcto */
export async function generateMetadata(
  { params: { locale, slug } }: { params: { locale: Locale; slug: string } }
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Projects' });
  const project = getProjectBySlug(slug);

  const BASE = siteConfig.siteUrl.replace(/\/$/, '');

  // ❌ Antes: href: `/projects/${slug}`
  // ✅ Ahora: objeto dinámico
  const pathname = getPathname({
    locale,
    href: { pathname: '/projects/[slug]', params: { slug } }
  });
  const canonical = locale === 'en' ? `${BASE}/en${pathname}` : `${BASE}${pathname}`;

  if (!project) {
    return {
      title: `${t('title')} — ${slug}`,
      description: t('detail.notFound', { slug }),
      alternates: { canonical },
      robots: { index: false, follow: true }
    };
  }

  return {
    title: project.title,
    description: project.summary ?? t('detail.descriptionFallback'),
    alternates: { canonical },
    openGraph: {
      title: project.title,
      description: project.summary ?? t('detail.descriptionFallback'),
      url: canonical,
      type: 'article',
      images: project.cover ? [{ url: project.cover }] : undefined
    }
  };
}

export default async function ProjectPage(
  { params: { locale, slug } }: { params: { locale: Locale; slug: string } }
) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Projects' });

  const project = getProjectBySlug(slug);
  if (!project) return notFound();

  const BASE = siteConfig.siteUrl.replace(/\/$/, '');

  // ❌ Antes: href: `/projects/${slug}`
  // ✅ Ahora: objeto dinámico
  const pathname = getPathname({
    locale,
    href: { pathname: '/projects/[slug]', params: { slug } }
  });
  const url = locale === 'en' ? `${BASE}/en${pathname}` : `${BASE}${pathname}`;
  const inLanguage = locale === 'en' ? 'en-US' : 'es-ES';

  const projectLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.summary ?? t('detail.descriptionFallback'),
    url,
    inLanguage,
    author: { '@type': 'Person', name: siteConfig.author.name, url: siteConfig.siteUrl }
  };

  const breadcrumbsLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: siteConfig.name, item: siteConfig.siteUrl },
      // Aquí puedes dejar `/projects` estático (no dinámico) para que se localice solo
      { '@type': 'ListItem', position: 2, name: t('title'), item: `${BASE}${locale === 'en' ? '/en' : ''}${getPathname({ locale, href: '/projects' })}` },
      { '@type': 'ListItem', position: 3, name: project.title, item: url }
    ]
  };

  return (
    <>
      <article className="prose max-w-none">
        <h1>{project.title}</h1>
        {project.summary && <p>{project.summary}</p>}
        {/* más campos del proyecto */}
      </article>

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(projectLd)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbsLd)} />
    </>
  );
}
