// src/i18n/request.ts
import {getRequestConfig} from 'next-intl/server';

const SUPPORTED_LOCALES = ['es', 'en'] as const;
type Locale = typeof SUPPORTED_LOCALES[number];

function normalizeLocale(input?: string): Locale {
    return input && (SUPPORTED_LOCALES as readonly string[]).includes(input)
        ? (input as Locale)
        : 'es';
}

export default getRequestConfig(async ({locale}) => {
    const l = normalizeLocale(locale);
    const messages = (await import(`../messages/${l}.json`)).default;

    return {
        locale: l,    // <- requerido por next-intl v4
        messages
    };
});
