// app/sobre-mi/page.tsx
import { aboutText, skills, timeline } from "@/data/cv";
import Timeline from "@/components/Timeline";
import { SkillChips } from "@/components/SkillChips";

export const metadata = {
  title: "Sobre mí",
  description: "Perfil, habilidades y experiencia.",
  alternates: { canonical: "/sobre-mi" },
};

export default function SobreMiPage() {
  return (
    <>
      {/* Cabecera con el mismo patrón que Proyectos */}
      <section className="full-bleed border-b border-app bg-gradient-to-b from-zinc-50 to-white">
        <div className="mx-auto max-w-6xl px-6 py-16 bg-app text-app">
          <h1 className="text-4xl font-extrabold tracking-tight text-app">Sobre mí</h1>
          <div className="mt-3 max-w-2xl space-y-3">
            {aboutText.map((p, i) => (
              <p key={i} className="text-muted">{p}</p>
            ))}
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-6 py-16 space-y-12">
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-app">Skills</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <SkillChips title="Lenguajes" items={skills.lenguajes} />
            <SkillChips title="Frameworks" items={skills.frameworks} />
            <SkillChips title="Herramientas" items={skills.herramientas} />
            <SkillChips title="Metodologías" items={skills.metodologias} />
            <SkillChips title="Soft skills" items={skills.soft} />
            <SkillChips title="Idiomas" items={skills.idiomas} />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-app">Experiencia</h2>
          <p className="text-sm text-muted">Pulsa en cada experiencia para ver las responsabilidades del puesto.</p>
          <Timeline items={timeline} />
        </section>
      </main>
    </>
  );
}
