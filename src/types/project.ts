export type Project = {
  slug: string;
  title: string;
  description: string;
  cover: string;       // ruta pública, p.ej. /images/projects/mi-proyecto/cover.jpg
  images: string[];    // rutas públicas
  order: number;       // menor = aparece antes
  showOnHome: boolean; // true = aparece en la home
};
