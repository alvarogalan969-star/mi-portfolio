import React from "react";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-gradient-to-b from-gray-50 to-white">
      <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 tracking-tight">
        Hola, soy <span className="text-indigo-600">Álvaro</span>
      </h1>
      <p className="mt-6 text-lg text-gray-600 max-w-xl">
        Desarrollador Frontend con visión Fullstack, apasionado por crear
        experiencias digitales minimalistas y funcionales.
      </p>
      <div className="mt-8 flex gap-4">
        <a
          href="#proyectos"
          className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
        >
          Ver proyectos
        </a>
        <a
          href="/contacto"
          className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
        >
          Contactar
        </a>
      </div>
    </section>
  );
}
