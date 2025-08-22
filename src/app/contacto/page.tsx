"use client";
import { useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactoPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    // Honeypot simple
    if ((payload as any).company) {
      setStatus("success");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        try {
          const data = await res.json();
          setError(data?.message || "No se pudo enviar el mensaje.");
        } catch {
          setError("No se pudo enviar el mensaje.");
        }
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("success");
    } catch {
      setError("Error de red. Inténtalo de nuevo.");
      setStatus("error");
    }
  }

  return (
    <>
      {/* Cabecera full-bleed para dar aire arriba */}
      <section className="full-bleed border-b border-zinc-200 bg-gradient-to-b from-zinc-50 to-white">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900">Contacto</h1>
          <p className="mt-3 text-zinc-600 max-w-2xl mx-auto">
            ¿Tienes una idea o proyecto? Escríbeme y te respondo lo antes posible.
          </p>
        </div>
      </section>

      {/* Contenido centrado y con buena separación vertical */}
      <section className="py-16">
        <div className="mx-auto w-full max-w-2xl">
          {status === "success" ? (
            <div
              className="rounded-2xl border border-green-200 bg-green-50 p-6 text-center"
              role="status"
              aria-live="polite"
            >
              <h2 className="text-2xl font-semibold text-green-800">¡Mensaje enviado!</h2>
              <p className="mt-2 text-green-700">
                Gracias por escribir. Te responderé muy pronto.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-6 inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition shadow-sm"
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
              <form onSubmit={onSubmit} className="space-y-5" noValidate>
                <div>
                  <label className="block text-sm font-medium text-zinc-800">
                    Nombre
                  </label>
                  <input
                    name="name"
                    required
                    placeholder="Tu nombre"
                    className="mt-1 w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder-zinc-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-800">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="tu@email.com"
                    className="mt-1 w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder-zinc-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-800">
                    Asunto
                  </label>
                  <input
                    name="subject"
                    required
                    placeholder="Asunto del mensaje"
                    className="mt-1 w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder-zinc-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-800">
                    Mensaje
                  </label>
                  <textarea
                    name="message"
                    rows={6}
                    required
                    placeholder="Cuéntame tu idea con un poco de contexto…"
                    className="mt-1 w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder-zinc-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
                  />
                </div>

                {/* Honeypot oculto para bots */}
                <input
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                />

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition shadow-sm"
                  >
                    {status === "sending" ? "Enviando…" : "Enviar"}
                  </button>
                </div>

                {status === "error" && (
                  <p
                    className="mt-3 text-sm text-red-600"
                    role="alert"
                    aria-live="assertive"
                  >
                    {error ?? "Ha ocurrido un error. Inténtalo de nuevo."}
                  </p>
                )}
              </form>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
