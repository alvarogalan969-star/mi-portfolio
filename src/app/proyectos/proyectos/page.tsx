import { getProjects } from '@/lib/content/projects';
import ProjectCard from '@/components/shared/ProjectCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Proyectos',
  description: 'Selección de proyectos destacados y casos reales.',
  alternates: { canonical: '/proyectos' },
};

export default function ProyectosIndex() {
  const projects = getProjects();
  return (
    <section>
      <h1 className="text-3xl font-bold mb-4">Proyectos</h1>
      <p className="text-gray-700 mb-6">Algunos trabajos y side‑projects.</p>
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map(p => (
          <ProjectCard key={p.slug} project={p} />
        ))}
        {projects.length === 0 && (
          <p className="text-gray-600">Aún no hay proyectos cargados.</p>
        )}
      </div>
    </section>
  );
}
