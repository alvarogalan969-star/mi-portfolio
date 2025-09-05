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
            onClick={() => ref.current?.openAt(0)}
            className="mt-6 relative aspect-[16/9] rounded-2xl overflow-hidden border w-full cursor-pointer"
            aria-label="Ampliar imagen de portada"
            title="Ampliar"
        >
            <Image
            src={cover}
            alt={title}
            fill
            sizes="(min-width: 1024px) 80vw, 100vw"
            className="object-cover"
            />
        </button>

        {/* Miniaturas + Lightbox controlado */}
        <GalleryLightbox ref={ref} images={all} title={title} />
        </>
    );
}
