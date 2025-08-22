import ProjectCard from '@/components/shared/ProjectCard';
import { getProjects } from '@/lib/content/projects';

export default function FeaturedProjects({ limit = 4 }: { limit?: number }) {
  const projects = getProjects().slice(0, limit);
  if (projects.length === 0) return null;
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {projects.map(p => (
        <ProjectCard key={p.slug} project={p} />
      ))}
    </div>
  );
}
