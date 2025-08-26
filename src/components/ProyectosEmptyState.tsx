// src/components/ProyectosEmptyState.tsx
export default function ProyectosEmptyState() {
    return (
        <div className="rounded-2xl border border-dashed border-app bg-card p-10 text-center">
        <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-card shadow-sm ring-1 ring-zinc-200">
            <span className="text-xl">🛠️</span>
        </div>
        <h2 className="mt-4 text-2xl font-semibold text-app">Próximamente</h2>
        <p className="mt-2 text-muted">
            Estoy puliendo los primeros proyectos.{" "}
            <a
            href="/contacto"
            className="font-medium text-indigo-600 hover:text-indigo-800"
            >
            Contáctame
            </a>{" "}
            para ver demos privadas.
        </p>
        </div>
    );
}
