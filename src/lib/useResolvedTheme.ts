"use client";

import { useEffect, useState } from "react";

type ThemeChoice = "light" | "dark" | "system";
type Resolved = "light" | "dark";

/**
 * Resuelve el tema actual observando:
 * - class="dark" en <html>
 * - data-theme="dark" en <html> (si lo usas)
 * - localStorage.theme === 'light' | 'dark' | 'system'
 * - prefers-color-scheme cuando elijas 'system'
 */
export function useResolvedTheme(): Resolved {
  const [resolved, setResolved] = useState<Resolved>("light");

  useEffect(() => {
    const root = document.documentElement;

    const getResolved = (): Resolved => {
      // 1) Señales directas en <html>
      if (root.classList.contains("dark")) return "dark";
      // Opcional: si usas atributo
      const dataTheme = root.getAttribute("data-theme");
      if (dataTheme === "dark") return "dark";
      if (dataTheme === "light") return "light";

      // 2) Preferencia de la app
      const stored = (localStorage.getItem("theme") as ThemeChoice | null) ?? "system";
      if (stored === "dark") return "dark";
      if (stored === "light") return "light";

      // 3) Sistema (system)
      const sysDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      return sysDark ? "dark" : "light";
    };

    // Inicial
    setResolved(getResolved());

    // Reaccionar a cambios del sistema si estás en 'system'
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onMedia = () => {
      const stored = (localStorage.getItem("theme") as ThemeChoice | null) ?? "system";
      if (stored === "system") setResolved(getResolved());
    };
    mql.addEventListener("change", onMedia);

    // Observar cambios en <html> (class/data-theme) desde tu toggle
    const obs = new MutationObserver(() => setResolved(getResolved()));
    obs.observe(root, { attributes: true, attributeFilter: ["class", "data-theme"] });

    return () => {
      mql.removeEventListener("change", onMedia);
      obs.disconnect();
    };
  }, []);

  return resolved;
}
