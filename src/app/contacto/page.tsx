import ContactForm from "@/components/contact/ContactForm";
import { jsonLd } from "@/lib/structured-data";
import { siteConfig } from "@/config/site.config";

export const metadata = {
  title: "Contacto",
  description:
    "Escríbeme para colaborar en desarrollo frontend, optimización de rendimiento y SEO técnico. Respondo pronto.",
  alternates: { canonical: "/contacto" },
};

const contactUrl = new URL("/contacto", siteConfig.siteUrl).toString();

const contactLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contacto",
  url: contactUrl,
  about: { "@type": "Person", name: siteConfig.author.name, url: siteConfig.siteUrl },
};

// (Opcional) Migas de pan
const breadcrumbsLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: siteConfig.siteUrl },
    { "@type": "ListItem", position: 2, name: "Contacto", item: contactUrl },
  ],
};

export default function ContactoPage() {
  return (
    <>
      {/* Hero / encabezado */}
      <section className="full-bleed border-b border-app bg-gradient-to-b from-zinc-50 to-white">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center bg-app text-app">
          <h1 className="text-4xl font-extrabold tracking-tight text-app">Contacto</h1>
          <p className="mt-3 text-muted mx-auto max-w-2xl">
            ¿Tienes una idea o proyecto? Escríbeme y te respondo lo antes posible.
          </p>
        </div>
      </section>

      {/* Formulario */}
      <section className="py-16">
        <div className="mx-auto w-full max-w-2xl">
          <ContactForm />
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(contactLd)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbsLd)} />
    </>
  );
}
