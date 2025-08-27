// src/app/[locale]/layout.tsx
import type {Metadata} from 'next';
import {NextIntlClientProvider} from 'next-intl';
import { setRequestLocale, getMessages } from 'next-intl/server';
import {routing, Locale} from '@/i18n/routing';
import '../globals.css';

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Portfolio — Álvaro Galán',
        description: 'Desarrollador web. Proyectos, experiencia y contacto.'
    };
}

export function generateStaticParams() {
    return routing.locales.map((locale) => ({locale}));
}

export const dynamic = 'force-static'; // opcional, mantén SSG

export default async function LocaleLayout({
    children,
    params: {locale}
    }: Readonly<{children: React.ReactNode; params: {locale: Locale}}>) {
    // Evita que la página se vuelva dinámica al usar next-intl en Server Components
    setRequestLocale(locale);
    const messages = await getMessages();

    return (
        <html lang={locale}>
        <body>
            <NextIntlClientProvider messages={messages} locale={locale}>
            {children}
            </NextIntlClientProvider>
        </body>
        </html>
    );
}
