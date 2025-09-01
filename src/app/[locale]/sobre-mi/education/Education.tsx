// src/app/[locale]/sobre-mi/education/Education.tsx
import Timeline from "@/components/Timeline";
import { education } from "./education.data";
import type { Experience } from "@/data/cv"; // SOLO tipo; no afecta al runtime

function fmt(iso: string) {
  return new Intl.DateTimeFormat("es-ES", { month: "short", year: "numeric" })
    .format(new Date(iso));
}
function host(url?: string) {
  if (!url) return;
  try { return new URL(url).hostname.replace(/^www\./, ""); } catch { return;
  }
}

const items: Experience[] = education.map((ed) => ({
  company: ed.institution,
  role: ed.title,
  location: ed.location,
  start: fmt(ed.start),
  end: ed.end ? fmt(ed.end) : "Actual",
  logo: ed.logo ?? "", 
  bullets: [
    ed.eqfLevel ? `EQF-MEC nivel ${ed.eqfLevel}` : undefined,
    ed.website ? `Sitio: ${host(ed.website)}` : undefined,
  ].filter(Boolean) as string[],
}));

export default function EducationSection() {
  return (
    <section className="space-y-4" aria-labelledby="education-heading">
      <h2 id="education-heading" className="text-2xl font-semibold text-app">Educación</h2>
      <Timeline items={items} />
    </section>
  );
}
