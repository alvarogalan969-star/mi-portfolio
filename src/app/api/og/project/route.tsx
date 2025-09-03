/* src/app/api/og/project/route.tsx */
import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { allProjects } from "contentlayer/generated";

export const runtime = "edge";
export const alt = "Open Graph — Proyecto";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug") ?? "";
  const p = allProjects.find((x) => x.slug === slug);

  const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://alvarogalanpascual.es";
  const title = p?.title ?? "Proyecto";
  const summary = p?.summary ?? "";
  const cover = p?.coverUrl ? new URL(p.coverUrl, SITE).toString() : null;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 64,
          background:
            "linear-gradient(135deg,#0b1220 0%,#0b1220 30%,#241a36 100%)",
          color: "white",
          position: "relative",
          fontFamily: "system-ui, Segoe UI, Roboto, Inter, sans-serif",
        }}
      >
        {cover && (
          <img
            src={cover}
            width={1200}
            height={630}
            style={{
              position: "absolute",
              inset: 0,
              objectFit: "cover",
              opacity: 0.32,
              filter: "saturate(0.9) contrast(1.05)",
            }}
          />
        )}
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            lineHeight: 1.1,
            textShadow: "0 2px 18px rgba(0,0,0,.4)",
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
        {summary && (
          <div
            style={{
              fontSize: 28,
              marginTop: 12,
              opacity: 0.9,
              maxWidth: 1000,
            }}
          >
            {summary}
          </div>
        )}
        <div
          style={{
            position: "absolute",
            top: 32,
            right: 40,
            fontSize: 20,
            opacity: 0.9,
          }}
        >
          {new URL(SITE).hostname}
        </div>
      </div>
    ),
    { ...size }
  );
}
