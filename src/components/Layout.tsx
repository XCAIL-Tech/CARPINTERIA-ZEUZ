import { useEffect } from "react";
import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ScrollToTop } from "./ScrollToTop";
import { WhatsAppFloat } from "./WhatsAppFloat";

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

export function Layout({ children, whatsappMessage }: { children: ReactNode; whatsappMessage?: string }) {
  useScrollOnNavigate();

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
