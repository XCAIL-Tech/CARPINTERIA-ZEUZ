import { useState } from "react";
import type { Category } from "@/data/productos";
import { getProductImages } from "@/data/productos";
import { quoteMessage } from "@/config/site";
import { WhatsAppButton } from "../WhatsAppButton";
import { Lightbox } from "./Lightbox";
import { ProductMedia } from "./ProductMedia";
import { CATEGORY_ICONS } from "./categoryIcons";

/**
 * Grilla de la vidriera: cada producto = foto (o carrusel) + título +
 * descripción + botón a WhatsApp. Las fotos se amplían en un visor común que
 * recorre todas las fotos de la categoría.
 */
export function ProductGrid({ category, showCategory = false }: { category: Category; showCategory?: boolean }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Todas las fotos de la categoría en orden, para el visor.
  const items = category.products.map((p) => ({ ...p, images: getProductImages(category.slug, p.id) }));
  const lightboxItems = items.flatMap((p) =>
    p.images.map((src, i) => ({ src, title: p.imageLabels?.[i] ? `${p.title} — ${p.imageLabels[i]}` : p.title })),
  );
  const offsets = items.map((_, i) => items.slice(0, i).reduce((n, p) => n + p.images.length, 0));

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p, pi) => (
          <article
            key={p.id}
            id={`${category.slug}-${p.id}`}
            className="panel group flex scroll-mt-40 flex-col overflow-hidden"
          >
            <ProductMedia
              images={p.images}
              labels={p.imageLabels}
              title={p.title}
              icon={CATEGORY_ICONS[category.slug]}
              onOpen={(i) => setOpenIndex(offsets[pi] + i)}
            />

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
        ))}
      </div>

      <Lightbox items={lightboxItems} index={openIndex} onIndexChange={setOpenIndex} onClose={() => setOpenIndex(null)} />
    </>
  );
}
