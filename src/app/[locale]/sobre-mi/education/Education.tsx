"use client";

import React from "react";
import { education, type EducationItem } from "./education.data";

function formatRange({ start, end }: { start: string; end?: string }) {
    const fmt = new Intl.DateTimeFormat("es-ES", { month: "short", year: "numeric" });
    const s = fmt.format(new Date(start));
    const e = end ? fmt.format(new Date(end)) : "Actual";
    return `${s} — ${e}`;
}

function Item({ item }: { item: EducationItem }) {
    const range = formatRange(item);
    return (
        <li className="relative rounded-xl border p-4 md:p-5">
        <div className="flex flex-col gap-1">
            <h3 className="text-base font-semibold leading-tight">
            {item.title}
            </h3>
            <p className="text-sm text-muted-foreground">
            <span className="font-medium">{item.institution}</span>
            {item.website && (
                <>
                {" "}&middot;{" "}
                <a
                    href={item.website}
                    className="underline underline-offset-2 hover:no-underline"
                    target="_blank" rel="noreferrer"
                >
                    {new URL(item.website).hostname.replace("www.", "")}
                </a>
                </>
            )}
            </p>

            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center rounded-full border px-2 py-0.5">
                {item.location}
            </span>
            <span className="inline-flex items-center rounded-full border px-2 py-0.5">
                {range}
            </span>
            {typeof item.eqfLevel !== "undefined" && (
                <span className="inline-flex items-center rounded-full border px-2 py-0.5">
                EQF-MEC Nivel {item.eqfLevel}
                </span>
            )}
            </div>
        </div>

        {/* Marcado semántico de fechas */}
        <time className="sr-only" dateTime={item.start}>Inicio: {item.start}</time>
        <time className="sr-only" dateTime={item.end ?? ""}>
            Fin: {item.end ?? "Actual"}
        </time>
        </li>
    );
}

export default function EducationSection() {
  // Orden cronológico descendente por fecha de inicio
    const items = [...education].sort(
        (a, b) => +new Date(b.start) - +new Date(a.start)
    );

    return (
        <section aria-labelledby="edu-title" className="mt-10 scroll-mt-24">
        <h2 id="edu-title" className="text-2xl font-bold tracking-tight">
            Educación
        </h2>

        <ol className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {items.map((it) => (
            <Item key={`${it.institution}-${it.title}`} item={it} />
            ))}
        </ol>

        {/* JSON-LD para SEO de Educación */}
        <script
            type="application/ld+json"
            // Nota: JSON.stringify sin saltos para evitar warnings de Next
            dangerouslySetInnerHTML={{
            __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "ItemList",
                itemListElement: items.map((it, index) => ({
                "@type": "EducationalOccupationalProgram",
                position: index + 1,
                name: it.title,
                provider: {
                    "@type": "Organization",
                    name: it.institution,
                    url: it.website,
                },
                startDate: it.start,
                endDate: it.end ?? undefined,
                educationalLevel:
                    typeof it.eqfLevel !== "undefined"
                    ? `EQF Level ${it.eqfLevel}`
                    : undefined,
                location: it.location,
                })),
            }),
            }}
        />
        </section>
    );
}
