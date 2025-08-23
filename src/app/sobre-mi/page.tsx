import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre mí",
  description: "Frontend con visión full-stack. Enfoque en UX, accesibilidad y rendimiento.",
  alternates: { canonical: "/sobre-mi" },
};

export default function SobreMiPage() {
  return (
    <>
      <section className="full-bleed border-b border-app bg-gradient-to-b from-zinc-50 to-white">
        <div className="mx-auto max-w-6xl px-6 py-16 bg-app text-app">
          <h1 className="text-4xl font-extrabold tracking-tight text-app">Sobre mí</h1>
          <p className="mt-3 text-muted max-w-2xl">
            Frontend con base sólida en React/Next.js y sensibilidad de producto: accesibilidad, performance y micro-interacciones.
          </p>
        </div>
      </section>

      <section className="grid gap-12 py-16 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold text-app">Bio</h2>
          <p className="mt-3 leading-8 text-muted">
            Me gusta convertir ideas complejas en interfaces simples. Tipado fuerte, componentes accesibles y diseño de sistemas.
          </p>

          <h3 className="mt-10 text-lg font-semibold text-app">Timeline</h3>
          <ul className="mt-4 space-y-4">
            <li className="rounded-xl border border-app p-4">
              <p className="text-sm uppercase tracking-wide text-muted">2024 — Actualidad</p>
              <p className="font-medium text-app">Proyectos freelance y productos personales</p>
            </li>
            <li className="rounded-xl border border-app p-4">
              <p className="text-sm uppercase tracking-wide text-muted">2022 — 2024</p>
              <p className="font-medium text-app">Desarrollo Frontend (React / Next.js)</p>
            </li>
          </ul>
        </div>

        <aside>
          <h2 className="text-2xl font-semibold text-app">Skills</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {["React", "Next.js", "TypeScript", "Tailwind", "Node", "UX/UI", "A11y", "Testing"].map((s) => (
              <li key={s} className="rounded-full border border-app bg-card px-3 py-1 text-sm text-muted">
                {s}
              </li>
            ))}
          </ul>
          <div className="mt-8 rounded-2xl border border-app bg-card p-6">
            <p className="text-muted">
              ¿Colaboramos?{" "}
              <a href="/contacto" className="font-medium text-indigo-600 hover:text-indigo-800">Escríbeme</a> y cuéntame tu idea.
            </p>
          </div>
        </aside>
      </section>
    </>
  );
}

