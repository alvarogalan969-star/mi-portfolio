import { getProjects, getProjectBySlug } from '@/lib/content/projects';
export function generateStaticParams(){ return getProjects().map(p => ({ slug: p.slug })); }
export default function ProjectPage({ params }: { params: { slug: string } }){
  const project = getProjectBySlug(params.slug);
  if(!project) return <p>Proyecto no encontrado.</p>;
  return (<article className="prose max-w-none"><h1>{project.title}</h1><p>{project.summary}</p></article>);
}
