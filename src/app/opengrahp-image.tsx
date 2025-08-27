import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
    return new ImageResponse(
        (
        <div style={{
            height: "100%", width: "100%", display: "flex",
            alignItems: "center", justifyContent: "center",
            background: "#111827", color: "#fff", fontSize: 72
        }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div>Mi Portfolio</div>
            <div style={{ fontSize: 36, opacity: 0.8 }}>Álvaro Galán — Frontend & SEO</div>
            </div>
        </div>
        ),
        size
    );
}
