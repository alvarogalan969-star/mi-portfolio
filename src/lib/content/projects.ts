import fs from 'node:fs';
import path from 'node:path';
import type { Project } from '@/types/content';

const dataFile = path.join(process.cwd(), 'src', 'data', 'proyectos.json');

export function getProjects(): Project[] {
  try {
    const raw = fs.readFileSync(dataFile, 'utf8');
    const json = JSON.parse(raw) as { projects?: Project[] } | Project[];
    const arr = Array.isArray(json) ? json : json.projects ?? [];
    // orden por fecha (updatedAt || createdAt) descendente
    return [...arr].sort((a, b) => {
      const da = new Date(a.updatedAt || a.createdAt || 0).getTime();
      const db = new Date(b.updatedAt || b.createdAt || 0).getTime();
      return db - da;
    });
  } catch {
    return [];
  }
}

export function getProjectBySlug(slug: string): Project | null {
  return getProjects().find(p => p.slug === slug) ?? null;
}
