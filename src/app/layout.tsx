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
  sameAs
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
  variable: "--font-sans", // exportamos a CSS var
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
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [ogAbsolute]
  },
  alternates: {
    canonical: "/",                         // Se sobreescribe por página si hace falta
  },
  robots: {
    index: true,
    follow: true,
    // Cambia a false en previews/deploys temporales
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
  return (
    <html lang="es" suppressHydrationWarning className={figtree.variable}>
      <body className="font-sans">
        <Providers>
          <Header />
          <main className="container mx-auto w-full max-w-6xl px-6 sm:px-8">
            {children}
          </main>
          <Footer />
        </Providers>

        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(personLd)} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(webSiteLd)} />
      </body>
    </html>
  );
}
