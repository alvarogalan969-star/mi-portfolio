// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="mx-auto max-w-6xl px-6 py-24 text-center">
        <h1 className="text-4xl font-bold">Página no encontrada</h1>
        <p className="mt-2 text-muted">Quizá te interesen mis <Link href="/proyectos" className="text-indigo-600">proyectos</Link>.</p>
        </div>
    );
}
