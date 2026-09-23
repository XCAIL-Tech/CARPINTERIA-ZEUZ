import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/** Botón "volver arriba" — abajo a la izquierda (a la derecha está el globo de WhatsApp). */
export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Volver arriba"
      className="fixed bottom-6 left-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/90 text-muted-foreground shadow-md backdrop-blur-sm transition-colors hover:border-primary hover:text-primary sm:left-6"
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
}
