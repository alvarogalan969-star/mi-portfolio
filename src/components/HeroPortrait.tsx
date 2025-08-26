import Image from "next/image";

export default function HeroPortrait() {
    return (
        <div className="relative w-full max-w-[320px] sm:max-w-[380px] mx-auto">
        <Image
            src="/images/alvaro_pixar.png"
            alt="Álvaro Galán — Desarrollador web"
            width={760}
            height={760}
            priority
            sizes="(max-width: 640px) 80vw, 380px"
            className="w-full h-auto rounded-2xl shadow-xl ring-1 ring-black/5"
        />
        </div>
    );
}
