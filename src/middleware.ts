// src/middleware.ts
import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
    matcher: [
        // redirige la raíz al locale preferido o por defecto
        '/',
        // aplica i18n a todas las rutas de páginas, excluyendo estáticos y _next
        '/((?!api|_next|.*\\..*).*)'
    ]
};
