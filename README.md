# Mi Portfolio — Next.js (App Router)

Proyecto de portfolio personal con estructura en silo.

## Requisitos
- Node 18+ (recomendado 20+)
- pnpm / npm / yarn

## Primeros pasos

```bash
# 1) Instalar dependencias
pnpm i   # o npm i / yarn

# 2) Scripts útiles
pnpm dev         # arranca en localhost:3000
pnpm build       # build de producción
pnpm start       # ejecuta build
pnpm lint        # lint del proyecto
pnpm typecheck   # chequeo de tipos
pnpm format      # formatea con Prettier
```

## Estructura de carpetas (resumen)
- `src/app` — páginas (App Router)
- `src/components` — UI y layout
- `src/content` — contenido (MD/MDX opcional)
- `src/data` — JSON de proyectos/social
- `src/lib` — utilidades, validaciones, email
- `src/styles` — estilos globales
- `src/config` — configuración del sitio y navegación

## Variables de entorno

Copia `.env.example` a `.env` y completa valores:
```env
# Resend (opcional)
RESEND_API_KEY=
MAIL_DOMAIN=
CONTACT_TO_EMAIL=

# SMTP (alternativa opcional)
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
SMTP_FROM=
```

## Notas
- Este repo usa ESLint (config mínima flat) y Prettier (en package.json).
- Ajusta `eslint.config.mjs` si añades React/JSX A11y plugins.
- En `tsconfig.json` está activado `strict` y path alias `@/*` -> `src/*`.
