import type { Metadata } from 'next';
import { siteConfig } from '@/config/site.config';
import Hero from '@/components/home/Hero';
import Section from '@/components/shared/Section';
import FeaturedProjects from '@/components/home/FeaturedProjects';

export const metadata: Metadata = {
  title: 'Inicio',
  description: siteConfig.description,
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Section title="Proyectos destacados" subtitle="Algunos trabajos recientes.">
        <FeaturedProjects limit={4} />
      </Section>
    </>
  );
}
