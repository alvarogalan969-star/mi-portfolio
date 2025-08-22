import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre mí",
  description: "Frontend con visión full-stack. Enfoque en UX, accesibilidad y rendimiento.",
  alternates: { canonical: "/sobre-mi" },
};

export default function SobreMiPage() {
  return (
    <>
      <section className="full-bleed border-b border-zinc-200 bg-gradient-to-b from-zinc-50 to-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900">Sobre mí</h1>
          <p className="mt-3 text-zinc-600 max-w-2xl">
            Frontend con base sólida en React/Next.js y sensibilidad de producto: accesibilidad, performance y micro-interacciones.
          </p>
        </div>
      </section>

      <section className="grid gap-12 py-16 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold text-zinc-900">Bio</h2>
          <p className="mt-3 leading-8 text-zinc-700">
            Me gusta convertir ideas complejas en interfaces simples. Tipado fuerte, componentes accesibles y diseño de sistemas.
          </p>

          <h3 className="mt-10 text-lg font-semibold text-zinc-900">Timeline</h3>
          <ul className="mt-4 space-y-4">
            <li className="rounded-xl border border-zinc-200 p-4">
              <p className="text-sm uppercase tracking-wide text-zinc-500">2024 — Actualidad</p>
              <p className="font-medium text-zinc-900">Proyectos freelance y productos personales</p>
            </li>
            <li className="rounded-xl border border-zinc-200 p-4">
              <p className="text-sm uppercase tracking-wide text-zinc-500">2022 — 2024</p>
              <p className="font-medium text-zinc-900">Desarrollo Frontend (React / Next.js)</p>
            </li>
          </ul>
        </div>

        <aside>
          <h2 className="text-2xl font-semibold text-zinc-900">Skills</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {["React", "Next.js", "TypeScript", "Tailwind", "Node", "UX/UI", "A11y", "Testing"].map((s) => (
              <li key={s} className="rounded-full border border-zinc-300 bg-zinc-50 px-3 py-1 text-sm text-zinc-700">
                {s}
              </li>
            ))}
          </ul>
          <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6">
            <p className="text-zinc-700">
              ¿Colaboramos?{" "}
              <a href="/contacto" className="font-medium text-indigo-600 hover:text-indigo-800">Escríbeme</a> y cuéntame tu idea.
            </p>
          </div>
        </aside>
      </section>
    </>
  );
}

