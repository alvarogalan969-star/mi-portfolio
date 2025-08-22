import './globals.css';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { siteConfig } from '@/config/site.config';

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
    locale: 'es_ES',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: siteConfig.name, description: siteConfig.description, images: [siteConfig.ogImage] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Header />
        <main className="container mx-auto w-full max-w-6xl px-6 sm:px-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
