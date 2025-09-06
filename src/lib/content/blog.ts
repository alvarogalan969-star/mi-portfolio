import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { PostMeta } from '@/types/content';

const blogDir = path.join(process.cwd(), "content", "blog", "posts");

export function getPostMeta(): PostMeta[] {
  try {
    if (!fs.existsSync(blogDir)) return [];
    const files = fs.readdirSync(blogDir).filter(n => /\.(md|mdx)$/i.test(n));
    const metas: PostMeta[] = files.map(name => {
      const slug = name.replace(/\.(md|mdx)$/i, '');
      const full = path.join(blogDir, name);
      const raw = fs.readFileSync(full, 'utf8');
      const { data } = matter(raw);
      return {
        slug,
        title: (data.title as string) || slug,
        summary: data.summary as string | undefined,
        tags: Array.isArray(data.tags) ? (data.tags as string[]) : undefined,
        date: typeof data.date === 'string' ? data.date : undefined,
        updatedAt: typeof data.updatedAt === 'string' ? data.updatedAt : undefined,
      };
    });
    return metas.sort((a, b) => {
      const da = new Date(a.updatedAt || a.date || 0).getTime();
      const db = new Date(b.updatedAt || b.date || 0).getTime();
      return db - da;
    });
  } catch {
    return [];
  }
}

export function getPostBySlug(slug: string) {
  const tryExt = (ext: "md" | "mdx") => path.join(blogDir, `${slug}.${ext}`);
  const file = [tryExt("mdx"), tryExt("md")].find(fs.existsSync);
  if (!file) return null;

  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);

  return {
    meta: {
      slug,
      title: (data.title as string) || slug,
      summary: data.summary as string | undefined,
      tags: Array.isArray(data.tags) ? (data.tags as string[]) : undefined,
      date: typeof data.date === "string" ? data.date : undefined,
      updatedAt: typeof data.updatedAt === "string" ? data.updatedAt : undefined,
    },
    content,
  };
}
