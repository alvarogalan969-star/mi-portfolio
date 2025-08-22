import { getProjects, getProjectBySlug } from '@/lib/content/projects';
import type { Metadata } from 'next';

type Params = { slug: string };

export function generateStaticParams() {
  return getProjects().map(p => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const proj = getProjectBySlug(params.slug);
  if (!proj) return { title: 'Proyecto no encontrado' };
  return {
    title: proj.title,
    description: proj.summary,
    alternates: { canonical: `/proyectos/${proj.slug}` },
    openGraph: { images: proj.cover ? [proj.cover] : [] },
  };
}

export default function ProjectPage({ params }: { params: Params }) {
  const project = getProjectBySlug(params.slug);
  if (!project) {
    return <p>Proyecto no encontrado.</p>;
  }
  return (
    <article className="prose max-w-none">
      <h1>{project.title}</h1>
      <p>{project.summary}</p>
      {project.demoUrl && (
        <p>
          <a href={project.demoUrl} target="_blank" rel="noreferrer">Ver demo</a>
        </p>
      )}
      {project.repoUrl && (
        <p>
          <a href={project.repoUrl} target="_blank" rel="noreferrer">Ver repositorio</a>
        </p>
      )}
    </article>
  );
}
