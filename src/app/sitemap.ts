// src/app/sitemap.ts
import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site.config';
import fs from 'node:fs';
import path from 'node:path';

// ─── Tipos y type guards ───────────────────────────────────────────────────────
/*type ProjectLike = {
  slug?: unknown;
  url?: unknown;
  updatedAt?: unknown;
  date?: unknown;
};*/

type ProjectEntry = { slug: string; lastMod?: Date };

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null;
}

function toDateSafe(v: unknown): Date | undefined {
  if (typeof v === 'string' || v instanceof Date) {
    const d = new Date(v);
    return Number.isNaN(d.getTime()) ? undefined : d;
  }
  return undefined;
}

function parseProject(obj: unknown): ProjectEntry | null {
  if (!isRecord(obj)) return null;

  const slug =
    typeof obj.slug === 'string'
      ? obj.slug
      : typeof obj.url === 'string'
      ? obj.url
      : '';

  if (!slug) return null;

  const lastMod =
    toDateSafe(obj.updatedAt) ??
    toDateSafe(obj.date);

  return { slug, lastMod };
}

function normalizeProjects(input: unknown): ProjectEntry[] {
  // Admite: Array<ProjectLike> o { projects: Array<ProjectLike> }
  if (Array.isArray(input)) {
    return input.map(parseProject).filter((v): v is ProjectEntry => v !== null);
  }

  if (isRecord(input) && Array.isArray((input as Record<string, unknown>).projects)) {
    const list = (input as { projects: unknown[] }).projects;
    return list.map(parseProject).filter((v): v is ProjectEntry => v !== null);
  }

  return [];
}

// ─── Lectura de datos locales ──────────────────────────────────────────────────
function readProjectSlugs(): ProjectEntry[] {
  try {
    const file = path.join(process.cwd(), 'src', 'data', 'proyectos.json');
    if (!fs.existsSync(file)) return [];
    const raw = fs.readFileSync(file, 'utf8');
    const json = JSON.parse(raw) as unknown;
    return normalizeProjects(json);
  } catch {
    return [];
  }
}

function readBlogSlugs(): ProjectEntry[] {
  try {
    const dir = path.join(process.cwd(), 'src', 'content', 'blog');
    if (!fs.existsSync(dir)) return [];
    const entries = fs
      .readdirSync(dir, { withFileTypes: true })
      .filter((d) => d.isFile() && /\.(md|mdx)$/i.test(d.name))
      .map((d) => {
        const file = path.join(dir, d.name);
        const stat = fs.statSync(file);
        const slug = d.name.replace(/\.(md|mdx)$/i, '');
        return { slug, lastMod: stat.mtime } satisfies ProjectEntry;
      });
    return entries;
  } catch {
    return [];
  }
}

// ─── Sitemap ───────────────────────────────────────────────────────────────────
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.siteUrl.replace(/\/$/, '');
  const now = new Date();

  const baseEntries: MetadataRoute.Sitemap = [
    { url: `${base}/`,          lastModified: now, changeFrequency: 'weekly',  priority: 1 },
    { url: `${base}/sobre-mi`,  lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/proyectos`, lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/blog`,      lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${base}/contacto`,  lastModified: now, changeFrequency: 'yearly',  priority: 0.7 },
  ];

  const projects = readProjectSlugs().map(({ slug, lastMod }) => ({
    url: `${base}/proyectos/${slug}`,
    lastModified: lastMod ?? now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const posts = readBlogSlugs().map(({ slug, lastMod }) => ({
    url: `${base}/blog/${slug}`,
    lastModified: lastMod ?? now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...baseEntries, ...projects, ...posts];
}
