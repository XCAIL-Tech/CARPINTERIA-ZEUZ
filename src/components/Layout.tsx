import { useEffect } from "react";
import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ScrollToTop } from "./ScrollToTop";
import { WhatsAppFloat } from "./WhatsAppFloat";
import { DEFAULTS, getRouteMeta } from "@/seo/meta";

/**
 * En cada navegación: si la URL trae #ancla, scrollea a esa sección
 * (links "/#servicios" desde cualquier página); si no, vuelve arriba.
 */
function useScrollOnNavigate() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Esperar un frame a que la página destino esté montada.
      requestAnimationFrame(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
      });
      return;
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash]);
}

/**
 * Título / description / canonical al navegar dentro de la SPA. El HTML
 * inicial de cada ruta ya viene con todo esto desde el prerender.
 */
function useRouteMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = getRouteMeta(pathname);
    document.title = meta.title;
    document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute("content", meta.description);
    document
      .querySelector<HTMLLinkElement>('link[rel="canonical"]')
      ?.setAttribute("href", `${DEFAULTS.url}${meta.path === "/" ? "/" : meta.path}`);
  }, [pathname]);
}

export function Layout({ children, whatsappMessage }: { children: ReactNode; whatsappMessage?: string }) {
  useScrollOnNavigate();
  useRouteMeta();

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <ScrollToTop />
      <WhatsAppFloat message={whatsappMessage} />
    </>
  );
}
