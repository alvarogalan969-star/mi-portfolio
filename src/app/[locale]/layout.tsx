// src/app/[locale]/layout.tsx
import '../globals.css';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale, getMessages } from 'next-intl/server';
import { routing, type Locale } from '@/i18n/routing';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Providers from '../providers';

import { siteConfig } from '@/config/site.config';
import { jsonLd } from '@/lib/structured-data';
import { Figtree } from 'next/font/google';

const figtree = Figtree({
    subsets: ['latin'],
    variable: '--font-sans',
    display: 'swap'
});

function isHttpUrl(u: unknown): u is string {
    return typeof u === 'string' && /^https?:\/\//.test(u);
}

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export const dynamic = 'force-static';

/**
 * Metadata por idioma (incluye icons, robots, alternates y OG)
 * Ajusta BASE_URL desde siteConfig.
 */
export async function generateMetadata(
    { params: { locale } }: { params: { locale: Locale } }
    ): Promise<Metadata> {
    const BASE_URL = siteConfig.siteUrl.replace(/\/$/, '');
    const path = '/'; // si usas pathnames localizados, cámbialo dinámicamente
    const canonical = locale === 'en' ? `${BASE_URL}/en${path}` : `${BASE_URL}${path}`;

    const ogImageAbs = siteConfig.ogImage.startsWith('http')
        ? siteConfig.ogImage
        : new URL(siteConfig.ogImage, siteConfig.siteUrl).toString();

    const ogLocale = locale === 'en' ? 'en_US' : 'es_ES';

    return {
        metadataBase: new URL(BASE_URL),
        title: { default: siteConfig.name, template: siteConfig.titleTemplate },
        description: siteConfig.description,
        icons: {
        icon: [
            { url: '/favicon.ico' },
            { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
            { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' }
        ],
        apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
        other: [{ rel: 'mask-icon', url: '/safari-pinned-tab.svg' }]
        },
        openGraph: {
        title: siteConfig.name,
        description: siteConfig.description,
        url: canonical,
        siteName: siteConfig.name,
        images: [{ url: ogImageAbs }],
        locale: ogLocale,
        type: 'website'
        },
        alternates: {
        canonical,
        languages: {
            es: `${BASE_URL}${path}`,
            en: `${BASE_URL}/en${path}`
        },
        types: { 'application/rss+xml': '/feed.xml' }
        },
        robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-video-preview': -1,
            'max-snippet': -1
        }
        }
    };
}

export default async function LocaleLayout({
    children,
    params: { locale }
    }: Readonly<{ children: React.ReactNode; params: { locale: Locale } }>) {
    // Fija el locale para mantener SSG y cargar mensajes correctos
    setRequestLocale(locale);
    const messages = await getMessages();

    // Enlaces "me"
    const gh = siteConfig.social?.github;
    const li = siteConfig.social?.linkedin;
    const mail = siteConfig.social?.email;

    // Datos para JSON-LD (aprovechamos la OG absoluta)
    const ogAbsolute = siteConfig.ogImage.startsWith('http')
        ? siteConfig.ogImage
        : new URL(siteConfig.ogImage, siteConfig.siteUrl).toString();

    const sameAs = Object.values(siteConfig.social ?? {}).filter(isHttpUrl);

    const personLd = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: siteConfig.author.name,
        url: siteConfig.siteUrl,
        image: ogAbsolute,
        description: siteConfig.description,
        sameAs,
        email: siteConfig.social?.email || undefined
    };

    const webSiteLd = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteConfig.name,
        url: siteConfig.siteUrl,
        inLanguage: locale === 'en' ? 'en-US' : 'es-ES',
        publisher: { '@type': 'Person', name: siteConfig.author.name, url: siteConfig.siteUrl }
    };

    return (
        <html lang={locale} suppressHydrationWarning className={figtree.variable}>
        <head>
            {gh && <link rel="me" href={gh} />}
            {li && <link rel="me" href={li} />}
            {mail && <link rel="me" href={mail} />}
        </head>
        <body className="font-sans">
            <Providers>
            {/* Ponemos Intl alrededor de toda la UI por si Header/Footer también traducen */}
            <NextIntlClientProvider messages={messages} locale={locale}>
                <Header />
                <main className="container mx-auto w-full max-w-6xl px-6 sm:px-8">
                {children}
                </main>
                <Footer />
            </NextIntlClientProvider>
            </Providers>

            {/* JSON-LD global */}
            <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(personLd)} />
            <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(webSiteLd)} />
        </body>
        </html>
    );
}
