import HeroPortrait from "@/components/HeroPortrait";
import ProyectosEmptyState from "@/components/ProyectosEmptyState";

export default function HomePage() {
  const isEmpty = true; // cuando tengas proyectos destacados, cámbialo o pinta las cards

  return (
    <>
      {/* HERO a todo el ancho */}
      <section className="full-bleed border-b border-app bg-gradient-to-b from-zinc-50 to-white">
        {/* convertimos a grid para colocar texto + imagen */}
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-28 grid md:grid-cols-2 gap-12 items-center bg-app text-app">
          {/* Columna texto */}
          <div className="text-center md:text-left">
            <p className="uppercase tracking-[0.18em] text-xs text-muted">portfolio</p>
            <h1 className="mt-2 text-5xl sm:text-6xl font-extrabold tracking-tight text-app">
              Hola, soy{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent">
                Álvaro
              </span>
            </h1>
            <p className="mx-auto md:mx-0 mt-6 max-w-2xl text-lg leading-8 text-muted">
              Frontend developer con visión full-stack. Experiencias minimalistas, rápidas y accesibles.
            </p>
            <div className="mt-8 flex flex-wrap items-center md:justify-start justify-center gap-3">
              <a
                href="/proyectos"
                className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition shadow-sm"
              >
                Ver proyectos
              </a>
              <a
                href="/contacto"
                className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold border border-app text-muted hover:bg-card transition"
              >
                Contactar
              </a>
            </div>
          </div>

          {/* Columna imagen (Hero con efecto) */}
          <div className="justify-self-center">
            <HeroPortrait />
          </div>
        </div>
      </section>

      {/* PROYECTOS (mismo mensaje que en /proyectos) */}
      <section id="proyectos" className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-app text-center md:text-left">Proyectos</h2>
          <p className="mt-3 text-muted max-w-2xl text-center md:text-left mx-auto md:mx-0">
            Selección de trabajos con foco en rendimiento y UX. {isEmpty && "Estoy preparando el material…"}
          </p>

          <div className="mt-8">
            {isEmpty ? (
              <ProyectosEmptyState />
            ) : (
              <div className="grid gap-6 sm:grid-cols-2">
                {/* aquí irían tus cards destacadas cuando tengas contenido */}
              </div>
            )}
          </div>

          <div className="mt-6 text-center md:text-left">
            <a href="/proyectos" className="font-medium text-indigo-600 hover:text-indigo-800">
              Ver todos los proyectos →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
