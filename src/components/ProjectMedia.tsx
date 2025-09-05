"use client";

import Image from "next/image";
import { useRef } from "react";
import GalleryLightbox, { type GalleryLightboxHandle } from "@/components/GalleryLightbox";

export default function ProjectMedia({
    cover,
    images,
    title
}: { cover: string; images: string[]; title: string }) {
    const ref = useRef<GalleryLightboxHandle>(null);
    const all = [cover, ...(images ?? [])];

    return (
        <>
        {/* COVER clicable */}
        <button
            type="button"
            onClick={() => ref.current?.openAt(0)}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && ref.current?.openAt(0)}
            className="group mt-6 relative aspect-[16/9] rounded-2xl overflow-hidden border w-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            aria-label="Ampliar imagen de portada"
            title="Ampliar"
            >
            <Image
                src={cover}
                alt={title}
                fill
                sizes="(min-width: 1024px) 80vw, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                draggable={false}
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100" />
            <div
                className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100"
                aria-hidden="true"
            >
                <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
            </div>
        </button>

        {/* Miniaturas + Lightbox controlado */}
        <GalleryLightbox ref={ref} images={all} title={title} />
        </>
    );
}
