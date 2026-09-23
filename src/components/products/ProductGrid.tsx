import { useState } from "react";
import { Expand } from "lucide-react";
import type { Category } from "@/data/productos";
import { getProductImage } from "@/data/productos";
import { quoteMessage } from "@/config/site";
import { WhatsAppButton } from "../WhatsAppButton";
import { CoverImage } from "./CoverImage";
import { Lightbox } from "./Lightbox";
import { CATEGORY_ICONS } from "./categoryIcons";

/**
 * Grilla de la vidriera: cada producto = foto + título + descripción + botón a
 * WhatsApp. Las fotos que existen se pueden ampliar (visor con swipe).
 */
export function ProductGrid({ category, showCategory = false }: { category: Category; showCategory?: boolean }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = category.products.map((p) => ({ ...p, src: getProductImage(category.slug, p.id) }));
  const withImage = items.filter((p): p is typeof p & { src: string } => Boolean(p.src));

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => {
          const zoomIndex = withImage.findIndex((w) => w.id === p.id);
          return (
            <article key={p.id} className="panel group flex flex-col overflow-hidden">
              <button
                type="button"
                disabled={zoomIndex < 0}
                onClick={() => setOpenIndex(zoomIndex)}
                aria-label={zoomIndex >= 0 ? `Ampliar foto: ${p.title}` : p.title}
                className="relative aspect-[4/3] overflow-hidden bg-muted disabled:cursor-default"
              >
                <CoverImage
                  src={p.src}
                  alt={p.title}
                  icon={CATEGORY_ICONS[category.slug]}
                  label="Foto próximamente"
                />
                {p.src && (
                  <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                    <Expand className="h-4 w-4" />
                  </span>
                )}
              </button>

              <div className="flex flex-1 flex-col p-5">
                {showCategory && <p className="eyebrow mb-1.5 text-[0.65rem]">{category.name}</p>}
                <h3 className="font-display text-xl font-semibold leading-snug">{p.title}</h3>
                <p className="mt-1.5 flex-1 text-[15px] leading-relaxed text-muted-foreground">{p.description}</p>
                <WhatsAppButton
                  message={quoteMessage(p.title, category.name)}
                  variant="whatsapp"
                  size="sm"
                  className="mt-5 h-11 w-full"
                >
                  Consultar por WhatsApp
                </WhatsAppButton>
              </div>
            </article>
          );
        })}
      </div>

      <Lightbox items={withImage} index={openIndex} onIndexChange={setOpenIndex} onClose={() => setOpenIndex(null)} />
    </>
  );
}
