// src/components/Timeline.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import type { Experience } from "@/data/cv";
import { motion, AnimatePresence } from "framer-motion";

type Props = { items: Experience[] };

export default function Timeline({ items }: Props) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="relative">
        <ol className="space-y-4">
            {items.map((exp, idx) => {
            const isOpen = openIndex === idx;
            return (
                <li
                key={`${exp.company}-${exp.role}-${idx}`}
                className="rounded-2xl border border-app bg-card p-4"
                >
                <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full text-left"
                    aria-expanded={isOpen}
                    aria-controls={`exp-${idx}`}
                >
                    <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                        {exp.logo ? (
                        <Image
                            src={exp.logo}
                            alt={`${exp.company} logo`}
                            width={64}
                            height={64}
                            className="h-16 w-16 object-contain" // sin fondo
                            priority={idx < 2}
                        />
                        ) : (
                        <div className="h-16 w-16 grid place-items-center text-sm rounded-md border border-app bg-card text-muted">
                            {exp.company?.[0] ?? "•"}
                        </div>
                        )}

                        <div>
                        <h3 className="text-base sm:text-lg font-semibold text-app">
                            {exp.role} · <span className="font-normal">{exp.company}</span>
                        </h3>
                        <p className="text-sm text-muted">
                            {exp.location} · {exp.start} — {exp.end}
                        </p>
                        </div>
                    </div>

                    <span className="shrink-0 rounded-full border border-app px-2 py-1 text-xs text-app">
                        {isOpen ? "Ocultar" : "Ver más"}
                    </span>
                    </div>
                </button>

                <AnimatePresence initial={false}>
                    {isOpen && (
                    <motion.div
                        id={`exp-${idx}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                    >
                        <ul className="mt-3 list-disc pl-5 space-y-1 text-sm leading-6 text-muted">
                        {exp.bullets.map((b, i) => (
                            <li key={i}>{b}</li>
                        ))}
                        </ul>
                    </motion.div>
                    )}
                </AnimatePresence>
                </li>
            );
            })}
        </ol>
        </div>
    );
}
