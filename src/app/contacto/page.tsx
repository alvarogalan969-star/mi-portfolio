import ContactForm from "@/components/contact/ContactForm";

export const metadata = {
  title: "Contacto",
  description:
    "Escríbeme para colaborar en desarrollo frontend, optimización de rendimiento y SEO técnico. Respondo pronto.",
  alternates: { canonical: "/contacto" },
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
    </>
  );
}
