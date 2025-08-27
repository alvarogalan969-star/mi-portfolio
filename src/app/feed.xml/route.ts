// app/feed.xml/route.ts
import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site.config";

export const runtime = "nodejs";     // literal
export const revalidate = 86400;     // literal (no 60*60*24)

export async function GET() {
    const base = siteConfig.siteUrl;
    const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel>
        <title>${siteConfig.name} — Blog</title>
        <link>${base}</link>
        <description>${siteConfig.description}</description>
    </channel></rss>`;
    return new NextResponse(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
