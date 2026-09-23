import { useEffect } from "react";

const DEFAULT_TITLE = "Carpintería Zeuz — Muebles a medida en Tres de Febrero";

/** Título y description por página (Google ejecuta JS al indexar una SPA). */
export function usePageMeta(title?: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} | Carpintería Zeuz` : DEFAULT_TITLE;

    if (!description) return;
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) return;
    const previous = meta.content;
    meta.content = description;
    return () => {
      meta.content = previous;
    };
  }, [title, description]);
}
