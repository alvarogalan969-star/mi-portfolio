export default function HomePage() {
  return (
    <>
      {/* HERO a todo el ancho */}
      <section className="full-bleed border-b border-zinc-200 bg-gradient-to-b from-zinc-50 to-white">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-28 text-center">
          <p className="uppercase tracking-[0.18em] text-xs text-zinc-500">portfolio</p>
          <h1 className="mt-2 text-5xl sm:text-6xl font-extrabold tracking-tight text-zinc-900">
            Hola, soy{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent">
              Álvaro
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
            Frontend developer con visión full-stack. Experiencias minimalistas, rápidas y accesibles.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="/proyectos" className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition shadow-sm">
              Ver proyectos
            </a>
            <a href="/contacto" className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold border border-zinc-300 text-zinc-800 hover:bg-zinc-50 transition">
              Contactar
            </a>
          </div>
        </div>
      </section>

      {/* PROYECTOS (centrado por el layout) */}
      <section id="proyectos" className="py-20">
        <h2 className="text-3xl font-bold text-zinc-900 text-center mb-12">Proyectos destacados</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <article className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-zinc-800">Portfolio Minimalista</h3>
            <p className="mt-2 text-zinc-600">Portfolio con Next.js, rendimiento top y UX limpia.</p>
            <div className="mt-4 flex gap-4 text-sm">
              <a href="/proyectos/portfolio" className="font-medium text-indigo-600 hover:text-indigo-800">Detalles →</a>
              <a href="https://github.com/tuusuario/portfolio" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-zinc-800">Código</a>
            </div>
          </article>

          <article className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-zinc-800">App de Tareas</h3>
            <p className="mt-2 text-zinc-600">Aplicación full-stack para gestionar tareas con buenas prácticas.</p>
            <div className="mt-4 flex gap-4 text-sm">
              <a href="/proyectos/tareas" className="font-medium text-indigo-600 hover:text-indigo-800">Detalles →</a>
              <a href="https://github.com/tuusuario/tareas" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-zinc-800">Código</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
