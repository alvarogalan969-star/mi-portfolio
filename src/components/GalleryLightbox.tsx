"use client";

import Image from "next/image";
import {
    forwardRef, useCallback, useEffect, useImperativeHandle, useState
} from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

type Props = { images: string[]; title: string };
export type GalleryLightboxHandle = { openAt: (i: number) => void };

export default forwardRef<GalleryLightboxHandle, Props>(function GalleryLightbox(
    { images, title }, ref
    ) {
    const isMobile = useIsMobile(640);
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);
    if (!images?.length) return null;

    const openAt = (i: number) => { setIndex(i); setOpen(true); };
    const close = useCallback(() => setOpen(false), []);
    const prev = useCallback(() => setIndex(i => (i - 1 + images.length) % images.length), [images.length]);
    const next = useCallback(() => setIndex(i => (i + 1) % images.length), [images.length]);

    useImperativeHandle(ref, () => ({ openAt }), [openAt]);

    // En móvil: solo grid estática, sin clics/hover/overlay
    if (isMobile) {
        return (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((src) => (
            <div key={src} className="relative aspect-[16/10] rounded-xl overflow-hidden border">
                <Image src={src} alt={title} fill sizes="100vw" className="object-cover" />
            </div>
            ))}
        </div>
        );
    }

    // Desktop: lightbox completo
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") close();
        if (e.key === "ArrowLeft") prev();
        if (e.key === "ArrowRight") next();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, close, prev, next]);

    useEffect(() => {
        if (!open) return;
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = prevOverflow; };
    }, [open]);

    return (
        <>
        {/* Miniaturas clicables con hover (solo desktop) */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((src, i) => (
            <button
                key={src}
                onClick={() => openAt(i)}
                className="group relative aspect-[16/10] rounded-xl overflow-hidden border focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 cursor-pointer"
                aria-label={`Abrir imagen ${i + 1}`}
            >
                <Image
                src={src}
                alt={`${title} — ${i + 1}`}
                fill
                sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
                draggable={false}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="7" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                </div>
            </button>
            ))}
        </div>

        {open && (
            <div
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center cursor-pointer"
            onClick={close}
            aria-modal="true"
            role="dialog"
            >
            <div
                className="relative w-[min(92vw,1400px)] h-[min(88vh,900px)] cursor-default"
                onClick={(e) => e.stopPropagation()}
            >
                <Image
                src={images[index]}
                alt={`${title} — ${index + 1}/${images.length}`}
                fill
                sizes="100vw"
                className="object-contain"
                priority
                draggable={false}
                />

                <button
                onClick={close}
                className="absolute top-4 right-4 rounded-full bg-white/90 px-3 py-2 text-black shadow cursor-pointer"
                aria-label="Cerrar"
                title="Cerrar (Esc)"
                >
                ✕
                </button>
                <button
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-3 py-2 text-black shadow cursor-pointer"
                aria-label="Anterior"
                title="Anterior (←)"
                >
                ‹
                </button>
                <button
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-3 py-2 text-black shadow cursor-pointer"
                aria-label="Siguiente"
                title="Siguiente (→)"
                >
                ›
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/90 text-sm">
                {index + 1} / {images.length}
                </div>
            </div>
            </div>
        )}
        </>
    );
});
