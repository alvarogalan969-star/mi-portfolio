// src/app/[locale]/feed.xml/route.ts
import { NextResponse } from "next/server";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { siteConfig } from "@/config/site.config";

export const runtime = "nodejs";
export const revalidate = 86400;

function escapeXml(s: string) {
    return s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}
const rfc2822 = (d: Date) => d.toUTCString();

export async function GET(
    _req: Request,
    { params: { locale } }: { params: { locale: Locale } }
    ) {
    // fija locale (por si en el futuro tiras de traducciones de títulos/descr.)
    setRequestLocale(locale);

    const base = siteConfig.siteUrl.replace(/\/$/, "");
    const isEN = locale === "en";
    const title = isEN ? `${siteConfig.name} — Blog` : `${siteConfig.name} — Blog`;
    const desc  = isEN ? siteConfig.description /* en inglés si la tienes */ : siteConfig.description;
    const language = isEN ? "en-US" : "es-ES";

    // TODO: items por idioma si procede (slug /en/... o mismo slug con contenido EN)
    const items: Array<{ title: string; link: string; description?: string; pubDate: Date; guid?: string }> = [];

    const itemsXml = items.map((it) => {
        const link = it.link.startsWith("http") ? it.link : `${base}${it.link}`;
        const guid = it.guid ?? link;
        return `
        <item>
            <title>${escapeXml(it.title)}</title>
            <link>${escapeXml(link)}</link>
            <guid isPermaLink="false">${escapeXml(guid)}</guid>
            <pubDate>${rfc2822(it.pubDate)}</pubDate>
            ${it.description ? `<description>${escapeXml(it.description)}</description>` : ""}
        </item>
        `.trim();
    }).join("");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
        <channel>
            <title>${escapeXml(title)}</title>
            <link>${escapeXml(base)}</link>
            <description>${escapeXml(desc)}</description>
            <language>${language}</language>
            <lastBuildDate>${rfc2822(new Date())}</lastBuildDate>
            <ttl>60</ttl>
            ${itemsXml}
        </channel>
    </rss>`.trim();

    return new NextResponse(xml, {
    headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200"
        }
    });
}
