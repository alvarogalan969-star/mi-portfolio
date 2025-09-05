import { type Locale } from "@/i18n/routing";

const CV_BY_LOCALE: Record<string, string> = {
  es: "/cv/CV_Alvaro_Galan.pdf",
  en: "/cv/CV_Alvaro_Galan.pdf"
};

export default function CVSection({
  locale,
  title,
  lead,
  cta
}: {
  locale: Locale;
  title?: string;
  lead?: string;
  cta?: string;
}) {
  const href = CV_BY_LOCALE[locale] ?? CV_BY_LOCALE.es;

  const tTitle = title ?? (locale === "en" ? "Want my résumé?" : "¿Quieres mi CV?");
  const tLead =
    lead ??
    (locale === "en"
      ? "Download an up-to-date copy in PDF."
      : "Descarga una copia actualizada en PDF.");
  const tCta = cta ?? (locale === "en" ? "Download CV" : "Descargar CV");

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl font-bold text-app">{tTitle}</h2>
        <p className="mt-2 text-muted max-w-2xl">{tLead}</p>

        <div className="mt-6">
          <a
            href={href}
            download
            type="application/pdf"
            className="inline-flex items-center gap-2 rounded-xl border
                       border-zinc-200 dark:border-zinc-700
                       px-4 py-2 text-sm font-medium
                       text-zinc-900 dark:text-white
                       hover:bg-zinc-100 dark:hover:bg-zinc-800
                       transition-colors"
            aria-label={tCta}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            {tCta}
          </a>
        </div>
      </div>
    </section>
  );
}
