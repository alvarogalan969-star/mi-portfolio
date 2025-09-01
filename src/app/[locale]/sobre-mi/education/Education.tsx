// src/app/[locale]/about/education/Education.tsx
"use client";

import Timeline from "@/components/Timeline";
import { education } from "./education.data";

// 1) Inferimos el tipo exacto que espera <Timeline />
//    Suponiendo que en /data/cv exportas "timeline" (experiencia).
//    Esto evita desajustes si el Timeline cambia en el futuro.
import { timeline } from "@/data/cv";
type TimelineItem = (typeof timeline)[number];

// 2) Utilidad para formatear el rango de fechas con es-ES
function formatRange(startISO: string, endISO?: string) {
  const fmt = new Intl.DateTimeFormat("es-ES", { month: "short", year: "numeric" });
  const s = fmt.format(new Date(startISO));
  const e = endISO ? fmt.format(new Date(endISO)) : "Actual";
  return `${s} — ${e}`;
}

// 3) Adaptador: EducationItem -> TimelineItem
//    OJO: si tu <Timeline /> usa otro nombre de clave para la fecha
//    (p. ej. "period" en vez de "date", o "dateRange"), cambia abajo UNA línea.
const items: TimelineItem[] = education.map((ed) => {
  const dateFormatted = formatRange(ed.start, ed.end);
  return {
    // Campos seguros que casi todos los timelines leen:
    title: ed.title,
    // "subtitle" suele mostrar entidad + lugar
    subtitle: `${ed.institution} · ${ed.location}`,
    // ⬇️ Ajusta esta línea si tu Timeline no usa "date"
    date: dateFormatted,
    // Enlace a la institución
    href: ed.website,
    // Texto opcional (EQF)
    description: typeof ed.eqfLevel !== "undefined" ? `EQF-MEC Nivel ${ed.eqfLevel}` : undefined,
  } as unknown as TimelineItem;
});

export default function EducationSection() {
  return (
    <section className="space-y-4" aria-labelledby="education-heading">
      <h2 id="education-heading" className="text-2xl font-semibold text-app">
        Educación
      </h2>
      <Timeline items={items} />
    </section>
  );
}
