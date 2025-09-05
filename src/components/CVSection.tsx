// src/components/sections/CVSection.tsx
import { createElement } from "react";
import type { Locale } from "@/i18n/routing";

const CV_BY_LOCALE: Record<string, string> = {
  es: "/cv/alvaro-galan-es.pdf",
  en: "/cv/alvaro-galan-en.pdf",
};

function cx(...cls: Array<string | false | null | undefined>) {
  return cls.filter(Boolean).join(" ");
}

type Props = {
  locale: Locale;
  title?: string;
  lead?: string;
  cta?: string;
  titleAs?: "h2" | "h3";
  titleClassName?: string;
  leadClassName?: string;
};

export default function CVSection({
  locale,
  title,
  lead,
  cta,
  titleAs = "h2",
  titleClassName = "text-2xl font-semibold", // ajusta al tamaño de tus secciones
  leadClassName = "text-sm",           // ajusta al tamaño de tus párrafos
}: Props) {
  const href = CV_BY_LOCALE[locale] ?? CV_BY_LOCALE.es;

  const tTitle = title ?? (locale === "en" ? "Want my résumé?" : "¿Quieres mi CV?");
  const tLead =
    lead ??
    (locale === "en"
      ? "Download an up-to-date copy in PDF."
      : "Descarga una copia actualizada en PDF.");
  const tCta = cta ?? (locale === "en" ? "Download CV" : "Descargar CV");

  const HeadingTag = titleAs === "h3" ? "h3" : "h2";

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-6">
        {createElement(HeadingTag, { className: cx(titleClassName, "text-app") }, tTitle)}
        <p className={cx("mt-2 max-w-2xl", leadClassName, "text-muted")}>{tLead}</p>

        <div className="mt-6">
          <a
            href={href}
            download
            type="application/pdf"
            className="inline-flex items-center gap-2 rounded-xl border border-app px-4 py-2
              text-sm font-semibold text-app bg-transparent
              transition-colors hover:bg-card"
            aria-label={tCta}
          >
            <svg
              width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            {tCta}
          </a>
        </div>
      </div>
    </section>
  );
}
