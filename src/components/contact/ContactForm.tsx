"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

type ContactPayload = {
    name: string;
    email: string;
    subject: string;
    message: string;
    company?: string; // honeypot
};

function toStr(v: FormDataEntryValue | null | undefined) {
    return typeof v === "string" ? v : "";
}

export default function ContactForm() {
    const [status, setStatus] = useState<Status>("idle");
    const [error, setError] = useState<string | null>(null);

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (status === "sending") return; // evita doble submit
        setStatus("sending");
        setError(null);

        const form = e.currentTarget;
        const formData = new FormData(form);

        const data: ContactPayload = {
        name: toStr(formData.get("name")),
        email: toStr(formData.get("email")),
        subject: toStr(formData.get("subject")),
        message: toStr(formData.get("message")),
        company: toStr(formData.get("company")) || undefined,
        };

        // Honeypot: si está relleno, asumimos bot y "OK" silencioso
        if (data.company) {
        setStatus("success");
        return;
        }

        try {
        const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            try {
            const body = (await res.json()) as { message?: string };
            setError(body?.message || "No se pudo enviar el mensaje.");
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
            <div className="rounded-2xl border border-app bg-card p-6 shadow-sm md:p-8">
            <form
                onSubmit={onSubmit}
                className="space-y-5"
                noValidate
                aria-busy={status === "sending"}
            >
                {/* Nombre */}
                <div>
                <label htmlFor="name" className="block text-sm font-medium text-muted">
                    Nombre
                </label>
                <input
                    id="name"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Tu nombre"
                    aria-invalid={status === "error" ? true : undefined}
                    className="mt-1 w-full rounded-xl border border-app bg-card px-3 py-2 text-app placeholder-zinc-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
                />
                </div>

                {/* Email */}
                <div>
                <label htmlFor="email" className="block text-sm font-medium text-muted">
                    Email
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="tu@email.com"
                    aria-invalid={status === "error" ? true : undefined}
                    className="mt-1 w-full rounded-xl border border-app bg-card px-3 py-2 text-app placeholder-zinc-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
                />
                </div>

                {/* Asunto */}
                <div>
                <label htmlFor="subject" className="block text-sm font-medium text-muted">
                    Asunto
                </label>
                <input
                    id="subject"
                    name="subject"
                    required
                    autoComplete="off"
                    placeholder="Asunto del mensaje"
                    aria-invalid={status === "error" ? true : undefined}
                    className="mt-1 w-full rounded-xl border border-app bg-card px-3 py-2 text-app placeholder-zinc-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
                />
                </div>

                {/* Mensaje */}
                <div>
                <label htmlFor="message" className="block text-sm font-medium text-muted">
                    Mensaje
                </label>
                <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    autoComplete="off"
                    placeholder="Cuéntame tu idea con un poco de contexto…"
                    aria-invalid={status === "error" ? true : undefined}
                    aria-describedby={status === "error" ? "contact-error" : undefined}
                    className="mt-1 w-full rounded-xl border border-app bg-card px-3 py-2 text-app placeholder-zinc-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
                />
                </div>

                {/* Honeypot accesible para bots (no usar display:none) */}
                <div
                style={{
                    position: "absolute",
                    left: "-10000px",
                    top: "auto",
                    width: 1,
                    height: 1,
                    overflow: "hidden",
                }}
                aria-hidden="true"
                >
                <label htmlFor="company">Empresa</label>
                <input id="company" name="company" tabIndex={-1} autoComplete="off" />
                </div>

                {/* Botón de enviar */}
                <div className="flex justify-end gap-3 pt-2">
                <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition shadow-sm"
                >
                    {status === "sending" ? "Enviando…" : "Enviar"}
                </button>
                </div>

                {/* Mensaje de error */}
                {status === "error" && (
                <p
                    id="contact-error"
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
        </>
    );
}
