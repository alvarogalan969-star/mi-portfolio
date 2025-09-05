// src/lib/content/projects.ts
import fs from "fs";
import path from "path";

export type Project = {
  slug: string;
  title: string;
  description?: string;
  summary?: string;
  cover: string;        // ⬅️ requerido
  images: string[];     // ⬅️ requerido
  order: number;
  showOnHome: boolean;
};

const BASE_DIR = path.join(process.cwd(), "content", "projects");
const DEFAULT_LOCALE = "es";

/** Lee y parsea todos los proyectos de un locale */
function readProjects(locale: string): Project[] {
  const dir = path.join(BASE_DIR, locale);
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter(f => f.endsWith(".json"));

  const items = files.map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), "utf-8");
    const data = JSON.parse(raw) as Project;

    // fallback: si solo hay description, también úsalo como summary
    if (!data.summary && data.description) {
      data.summary = data.description;
    }
    return data;
  });

  return items.sort((a, b) => a.order - b.order);
}

/** Lista de proyectos del locale (por defecto ES) */
export function getProjects(locale: string = DEFAULT_LOCALE): Project[] {
  return readProjects(locale);
}

/** Proyectos visibles en Home (showOnHome = true) */
export function getHomeProjects(locale: string = DEFAULT_LOCALE): Project[] {
  return readProjects(locale).filter(p => p.showOnHome);
}

/** Proyecto por slug en un locale */
export function getProjectBySlug(slug: string, locale: string = DEFAULT_LOCALE): Project | undefined {
  const found = readProjects(locale).find(p => p.slug === slug);
  if (found) return found;

  // fallback: busca en todos los locales disponibles
  const locales = fs.readdirSync(BASE_DIR).filter((f) =>
    fs.statSync(path.join(BASE_DIR, f)).isDirectory()
  );

  for (const loc of locales) {
    const project = readProjects(loc).find(p => p.slug === slug);
    if (project) return project;
  }

  return undefined;
}
