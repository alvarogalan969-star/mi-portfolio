// src/components/SkillChips.tsx
"use client";

type Props = { title: string; items: string[] };

export function SkillChips({ title, items }: Props) {
    return (
        <section className="space-y-2">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-app">{title}</h3>
        <div className="flex flex-wrap gap-2">
            {items.map((t) => (
            <span
                key={t}
                className="rounded-2xl border border-app bg-card px-3 py-1 text-xs text-app"
            >
                {t}
            </span>
            ))}
        </div>
        </section>
    );
}
