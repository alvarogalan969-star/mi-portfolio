import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { siteConfig } from "@/config/site.config";
import Providers from "./providers";
import { Figtree } from "next/font/google";
import { jsonLd } from "@/lib/structured-data";

const ogAbsolute =
  siteConfig.ogImage.startsWith("http")
    ? siteConfig.ogImage
    : new URL(siteConfig.ogImage, siteConfig.siteUrl).toString();

function isHttpUrl(u: unknown): u is string {
  return typeof u === "string" && /^https?:\/\//.test(u);
}

const sameAs = Object.values(siteConfig.social ?? {}).filter(isHttpUrl);

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.author.name,
  url: siteConfig.siteUrl,
  image: ogAbsolute,
  description: siteConfig.description,
  sameAs,
  // email en Person (mejor aquí que en sameAs)
  email: siteConfig.social?.email || undefined,
};

const webSiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.siteUrl,
  inLanguage: "es-ES",
  publisher: { "@type": "Person", name: siteConfig.author.name, url: siteConfig.siteUrl },
};

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: { default: siteConfig.name, template: siteConfig.titleTemplate },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg" }],
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    siteName: siteConfig.name,
    images: [{ url: ogAbsolute }],
    locale: "es_ES",
    type: "website",
  },
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": "/feed.xml" },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gh = siteConfig.social?.github;
  const li = siteConfig.social?.linkedin;
  const mail = siteConfig.social?.email; // ej: "mailto:hola@tu-dominio.com"

  return (
    <html lang="es" suppressHydrationWarning className={figtree.variable}>
      <head>
        {gh && <link rel="me" href={gh} />}
        {li && <link rel="me" href={li} />}
        {mail && <link rel="me" href={mail} />}
      </head>
      <body className="font-sans">
        <Providers>
          <Header />
          <main className="container mx-auto w-full max-w-6xl px-6 sm:px-8">
            {children}
          </main>
          <Footer />
        </Providers>

        {/* JSON-LD global */}
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(personLd)} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(webSiteLd)} />
      </body>
    </html>
  );
}
