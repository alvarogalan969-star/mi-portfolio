// src/app/robots.ts
import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site.config";

export default function robots(): MetadataRoute.Robots {
  // Base: primero env, si no el siteConfig
  const baseRaw = (process.env.NEXT_PUBLIC_SITE_URL || siteConfig.siteUrl || "").trim();
  const base = baseRaw.replace(/\/$/, ""); // sin barra final

  // Hostname para decisiones
  let host = "";
  try {
    host = new URL(base).host;
  } catch {
    // si base no es URL válida, host quedará vacío
  }

  // Detecta entornos donde NO debes indexar
  const isPreview =
    process.env.VERCEL_ENV === "preview" ||             // Vercel preview
    process.env.NODE_ENV !== "production" ||            // dev/test
    host.endsWith("vercel.app") ||                      // dominios vercel
    host === "localhost:3000" || host === "127.0.0.1" ||// local
    /(^|\.)(example\.com)$/i.test(host);                // placeholder

  // Rutas que no quieres que crawleen (ajústalas si hace falta)
  const disallowCommon = ["/api/", "/opengraph-image", "/_next/", "/favicon.ico"];

  if (isPreview || !host) {
    // En preview/staging: bloquea indexación
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
      sitemap: base ? `${base}/sitemap.xml` : undefined,
      host: host || undefined,
    };
  }

  // Producción: permite todo salvo rutas técnicas
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: disallowCommon }],
    sitemap: `${base}/sitemap.xml`,
    host,
  };
}
