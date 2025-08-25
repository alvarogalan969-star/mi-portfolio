"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useResolvedTheme } from "@/lib/useResolvedTheme";

export default function Logo({
  className = "h-7",  // controlamos ALTURA por CSS
  priority = true,
}: { className?: string; priority?: boolean }) {
  const resolved = useResolvedTheme();
  const [mounted, setMounted] = useState(false);

  // Evita desajustes de hidratación: renderizamos tras montar
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return (
      <Link href="/" aria-label="Ir a inicio" className="inline-flex items-center">
        <span style={{ display: "inline-block", height: "1.75rem", width: "auto" }} />
      </Link>
    );
  }

  const src = resolved === "dark" ? "/logo-light.png" : "/logo-dark.png";

  return (
    <Link href="/" aria-label="Ir a inicio" className="inline-flex items-center">
      <Image
        src={src}
        alt="Logotipo Álvaro.dev"
        width={112}
        height={28}
        priority={priority}
        sizes="112px"
        className={`${className} select-none pointer-events-none`}
        style={{ width: "auto" }}  // 👈 evita el warning de Next al fijar altura por CSS
      />
    </Link>
  );
}
