// src/app/[locale]/about/education/Education.tsx
// (Server Component por defecto: NO "use client")

import type { ComponentProps } from "react";
import Timeline from "@/components/Timeline";
import { education } from "./education.data";

// 1) Inferimos el tipo del item DESDE el componente Timeline (solo tipos)
type TimelineProps = ComponentProps<typeof Timeline>;
type TimelineItem = TimelineProps extends { items: Array<infer I> } ? I : never;

// 2) Utilidad para formatear el rango de fechas con es-ES
function formatRange(startISO: string, endISO?: string) {
    const fmt = new Intl.DateTimeFormat("es-ES", { month: "short", year: "numeric" });
    const s = fmt.format(new Date(startISO));
    const e = endISO ? fmt.format(new Date(endISO)) : "Actual";
    return `${s} — ${e}`;
}

// 3) Adaptador: EducationItem -> TimelineItem
//    ⚠️ Si tu <Timeline /> no usa "date" sino "period"/"dateRange", cambia la clave abajo.
const items: TimelineItem[] = education.map((ed) => {
    const date = formatRange(ed.start, ed.end);
    return {
        title: ed.title,
        subtitle: `${ed.institution} · ${ed.location}`,
        date,                         // ← renombra a 'period' si tu Timeline lo llama así
        href: ed.website,
        description: ed.eqfLevel ? `EQF-MEC Nivel ${ed.eqfLevel}` : undefined,
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
