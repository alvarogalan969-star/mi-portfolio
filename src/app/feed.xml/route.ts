import { siteConfig } from "@/config/site.config";
import { NextResponse } from "next/server";
// import { getAllPosts } from "@/lib/content/blog";

export async function GET() {
    const base = siteConfig.siteUrl;
    // const posts = await getAllPosts();
    const posts: Array<{ title: string; slug: string; date: string; excerpt: string }> = [];

    const items = posts.map((p) => `
        <item>
        <title>${p.title}</title>
        <link>${base}/blog/${p.slug}</link>
        <guid>${base}/blog/${p.slug}</guid>
        <pubDate>${new Date(p.date).toUTCString()}</pubDate>
        <description><![CDATA[${p.excerpt}]]></description>
        </item>`).join("");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0"><channel>
    <title>${siteConfig.name} — Blog</title>
    <link>${base}</link>
    <description>${siteConfig.description}</description>
    ${items}
    </channel></rss>`;

    return new NextResponse(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
