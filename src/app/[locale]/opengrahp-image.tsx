// src/app/[locale]/opengraph-image.tsx
import { ImageResponse } from "next/og";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

export const runtime = "edge"; // recomendado para next/og
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG({
    params: { locale }
    }: { params: { locale: Locale } }) {
    // Fija el locale para que getTranslations use el idioma correcto
    setRequestLocale(locale);
    const tCommon = await getTranslations({ locale, namespace: "Common" });
    const tHero = await getTranslations({ locale, namespace: "Hero" });

    const title = tCommon("siteName");     // p.ej.: "Álvaro Galán — Portfolio"
    const subtitle = tHero("subtitle");    // p.ej.: "Desarrollador web..." | "Web developer..."

    return new ImageResponse(
        (
        <div
            style={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#111827",
            color: "#fff",
            fontSize: 72
            }}
        >
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div>{title}</div>
            <div style={{ fontSize: 36, opacity: 0.8 }}>{subtitle}</div>
            </div>
        </div>
        ),
        size
    );
}
