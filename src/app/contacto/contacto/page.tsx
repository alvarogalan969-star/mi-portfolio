import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Envíame un mensaje para colaborar o contratar.',
  alternates: { canonical: '/contacto' },
};

export default function ContactoPage() {
  return (
    <section className="max-w-xl">
      <h1 className="text-3xl font-bold mb-4">Contacto</h1>
      <p className="text-gray-700 mb-6">Completa el formulario para ponerte en contacto. (Funcionalidad se añade en el paso 6)</p>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nombre</label>
          <input className="w-full border p-2 rounded" placeholder="Tu nombre" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input type="email" className="w-full border p-2 rounded" placeholder="tu@email.com" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Asunto</label>
          <input className="w-full border p-2 rounded" placeholder="Asunto" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Mensaje</label>
          <textarea rows={6} className="w-full border p-2 rounded" placeholder="Cuéntame tu idea..." />
        </div>
        <button className="px-4 py-2 rounded bg-black text-white" type="button" disabled>
          Enviar (próximamente)
        </button>
      </form>
    </section>
  );
}
