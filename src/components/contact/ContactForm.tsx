'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

type Status = 'idle' | 'sending' | 'success' | 'error';

type ContactPayload = {
    name: string;
    email: string;
    subject: string;
    message: string;
};

type ContactResponse = {
    ok: boolean;
    error?: string;
};

function toStr(v: FormDataEntryValue | null | undefined) {
    return typeof v === 'string' ? v : '';
}

export default function ContactForm() {
    const tf = useTranslations('Contact.form');
    const tv = useTranslations('Contact.validation');

    const [status, setStatus] = useState<Status>('idle');
    const [error, setError] = useState<string | null>(null);

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (status === 'sending') return;

        setStatus('sending');
        setError(null);

        const form = e.currentTarget;
        const formData = new FormData(form);

        const data: ContactPayload = {
        name: toStr(formData.get('name')),
        email: toStr(formData.get('email')),
        subject: toStr(formData.get('subject')),
        message: toStr(formData.get('message'))
        };

        // Validación mínima en cliente (localizada)
        if (!data.name.trim() || !data.email.trim() || !data.message.trim()) {
        setError(tv('requiredAll'));
        setStatus('error');
        return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        setError(tv('emailInvalid'));
        setStatus('error');
        return;
        }
        if (data.name.trim().length < 2) {
        setError(tv('nameMin'));
        setStatus('error');
        return;
        }
        if (data.message.trim().length < 10) {
        setError(tv('messageMin'));
        setStatus('error');
        return;
        }

        try {
        const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        let payload: ContactResponse | null = null;
        try {
            payload = (await res.json()) as ContactResponse;
        } catch {
            // La respuesta podría no ser JSON; lo ignoramos.
        }

        if (!res.ok || !payload?.ok) {
            setError(payload?.error || tf('error'));
            setStatus('error');
            return;
        }

        form.reset();
        setStatus('success');
        } catch {
        setError(tf('error'));
        setStatus('error');
        }
    }

    return (
        <>
        {status === 'success' ? (
            <div
            className="rounded-2xl border border-green-200 bg-green-50 p-6 text-center"
            role="status"
            aria-live="polite"
            >
            <h2 className="text-2xl font-semibold text-green-800">{tf('success')}</h2>
            <p className="mt-2 text-green-700">{tf('successLead')}</p>
            <button
                onClick={() => setStatus('idle')}
                className="mt-6 inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition shadow-sm"
            >
                {tf('sendAnother')}
            </button>
            </div>
        ) : (
            <div className="rounded-2xl border border-app bg-card p-6 shadow-sm md:p-8">
            <form
                onSubmit={onSubmit}
                className="space-y-5"
                noValidate
                aria-busy={status === 'sending'}
            >
                {/* Nombre */}
                <div>
                <label htmlFor="name" className="block text-sm font-medium text-muted">
                    {tf('name.label')}
                </label>
                <input
                    id="name"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder={tf('name.placeholder')}
                    aria-invalid={status === 'error' ? true : undefined}
                    className="mt-1 w-full rounded-xl border border-app bg-card px-3 py-2 text-app placeholder-zinc-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
                />
                </div>

                {/* Email */}
                <div>
                <label htmlFor="email" className="block text-sm font-medium text-muted">
                    {tf('email.label')}
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder={tf('email.placeholder')}
                    aria-invalid={status === 'error' ? true : undefined}
                    className="mt-1 w-full rounded-xl border border-app bg-card px-3 py-2 text-app placeholder-zinc-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
                />
                </div>

                {/* Asunto */}
                <div>
                <label htmlFor="subject" className="block text-sm font-medium text-muted">
                    {tf('subject.label')}
                </label>
                <input
                    id="subject"
                    name="subject"
                    required
                    autoComplete="off"
                    placeholder={tf('subject.placeholder')}
                    aria-invalid={status === 'error' ? true : undefined}
                    className="mt-1 w-full rounded-xl border border-app bg-card px-3 py-2 text-app placeholder-zinc-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
                />
                </div>

                {/* Mensaje */}
                <div>
                <label htmlFor="message" className="block text-sm font-medium text-muted">
                    {tf('message.label')}
                </label>
                <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    autoComplete="off"
                    placeholder={tf('message.placeholder')}
                    aria-invalid={status === 'error' ? true : undefined}
                    aria-describedby={status === 'error' ? 'contact-error' : undefined}
                    className="mt-1 w-full rounded-xl border border-app bg-card px-3 py-2 text-app placeholder-zinc-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
                />
                </div>

                {/* Botón de enviar */}
                <div className="flex justify-end gap-3 pt-2">
                <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition shadow-sm"
                >
                    {status === 'sending' ? tf('submitting') : tf('submit')}
                </button>
                </div>

                {/* Mensaje de error */}
                {status === 'error' && (
                <p
                    id="contact-error"
                    className="mt-3 text-sm text-red-600"
                    role="alert"
                    aria-live="assertive"
                >
                    {error ?? tf('error')}
                </p>
                )}
            </form>
            </div>
        )}
        </>
    );
}
