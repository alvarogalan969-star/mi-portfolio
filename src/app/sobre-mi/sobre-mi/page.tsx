import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sobre mí',
  description: 'Quién soy, experiencia y enfoque de trabajo.',
  alternates: { canonical: '/sobre-mi' },
};

export default function SobreMi() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Sobre mí</h1>
        <p className="text-gray-700 max-w-3xl">
          Soy desarrollador Frontend con visión Full Stack. Me enfoco en construir interfaces accesibles, 
          rápidas y mantenibles. Disfruto trabajar con React/Next.js, TypeScript y diseño de sistemas UI.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-4 border rounded-xl">
          <h2 className="font-semibold mb-2">Habilidades clave</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>React, Next.js (App Router)</li>
            <li>TypeScript, Node.js</li>
            <li>Tailwind CSS, Accesibilidad (a11y)</li>
            <li>Testing (Vitest/Playwright)</li>
          </ul>
        </div>
        <div className="p-4 border rounded-xl">
          <h2 className="font-semibold mb-2">Lo que ofrezco</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Desarrollo de productos web end‑to‑end</li>
            <li>Optimización de performance y SEO técnico</li>
            <li>Diseño y documentación de componentes</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
