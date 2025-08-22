// Tipos fuertes para el contenido del sitio

export type ISODate = string; // e.g. '2025-08-21'

export interface Project {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  repoUrl?: string;
  demoUrl?: string;
  cover?: string; // ruta relativa en /public/images/proyectos
  updatedAt?: ISODate;
  createdAt?: ISODate;
}

export interface PostMeta {
  slug: string;
  title: string;
  summary?: string;
  tags?: string[];
  date?: ISODate;
  updatedAt?: ISODate;
}
