
# Mi Portafolio — Next.js + TypeScript

Una web de portafolio personal hecha con **Next.js (App Router)**, **TypeScript** y **Tailwind CSS**. Incluye páginas de proyectos, contacto por email y animaciones sutiles.

> **Demo**: _(añade aquí la URL de producción, por ejemplo de Vercel)_

## 🧱 Stack

- **Next.js 14+ (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animaciones)
- **ESLint + Prettier**
- **Env vars** para email (p. ej. `CONTACT_TO_EMAIL`)

## ✅ Requisitos

- Node.js 18+
- pnpm 8+

## 🚀 Empezar

```bash
# Instalar dependencias
pnpm install

# Servidor de desarrollo
pnpm dev

# Linter y tipos
pnpm lint
pnpm typecheck

# Build y preview de producción
pnpm build
pnpm start
```

## 🔧 Variables de entorno

Crea un archivo `.env.local` en la raíz tomando como referencia `.env.example`:

```
CONTACT_TO_EMAIL="tu-correo@ejemplo.com"
# Añade aquí otras credenciales (Resend/SMTP) si las usas en el backend de contacto
```

> **Importante:** Nunca subas `.env.local` al repositorio. Mantén las claves sólo en los entornos de despliegue.

## 🗂️ Estructura recomendada

```
.
├─ app/                 # Rutas (App Router), layouts y páginas
├─ components/          # Componentes UI reutilizables
├─ lib/                 # Utilidades, hooks, helpers
├─ public/              # Imágenes y assets estáticos
├─ styles/              # Tailwind y estilos globales
├─ package.json
├─ next.config.mjs
└─ tailwind.config.ts
```

## 🧰 Scripts (package.json)

- `dev`: inicia el servidor de desarrollo
- `build`: genera el build de producción
- `start`: arranca el servidor con el build generado
- `lint`: ejecuta ESLint
- `typecheck`: verifica tipos con TypeScript

## 🌐 Despliegue

La forma más sencilla es **Vercel**:

1. Conecta tu repo.
2. Configura las variables de entorno (`CONTACT_TO_EMAIL`, etc.).
3. Deploy automático en cada push a `main`.

También puedes desplegar en otras plataformas (Netlify, Render…) ajustando `build` y `output`.

## ♿ Accesibilidad y SEO

- Texto alternativo en imágenes (`alt`).
- Un `h1` por página y jerarquía correcta de encabezados.
- `metadata` en `app/layout.tsx` (title/description/Open Graph).
- Colores con suficiente contraste y foco visible.

## 🤝 Contribuir

1. Crea una rama: `git checkout -b feat/mi-mejora`
2. Haz commits claros.
3. Abre un Pull Request describiendo cambios y screenshots si aplica.

## 📄 Licencia

Este proyecto se publica bajo la licencia **MIT**. Consulta el archivo `LICENSE` si lo incluyes.

---

**Autor:** _(tu nombre y enlaces a redes)_
