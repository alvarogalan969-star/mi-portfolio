import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { siteConfig } from "@/config/site.config";
import Providers from "./providers";
import { Figtree } from "next/font/google"; // ← NUEVO

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-sans", // exportamos a CSS var
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: { default: siteConfig.name, template: siteConfig.titleTemplate },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage }],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
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
      </body>
    </html>
  );
}
