import { useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { CoverImage } from "./CoverImage";

/**
 * Foto(s) de una tarjeta de producto. Con una foto: imagen ampliable. Con
 * varias: carrusel (flechas, puntos, swipe) con etiqueta opcional por foto.
 * Tocar la foto abre el visor en esa imagen.
 */
export function ProductMedia({
  images,
  labels,
  title,
  icon,
  onOpen,
}: {
  images: string[];
  labels?: string[];
  title: string;
  icon?: LucideIcon;
  /** Abre el visor en la foto `i` de este producto. */
  onOpen: (i: number) => void;
}) {
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);
  const total = images.length;
  const go = (delta: number) => setIndex((i) => (i + delta + total) % total);

  if (total === 0) {
    return (
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <CoverImage alt={title} icon={icon} label="Foto próximamente" />
      </div>
    );
  }

  const label = labels?.[index];

  return (
    <div
      className="relative aspect-[4/5] overflow-hidden bg-white"
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null || total < 2) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      {/* Tira de fotos: se desplaza según el índice */}
      <div
        className="flex h-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => onOpen(i)}
            aria-label={`Ampliar foto${labels?.[i] ? ` (${labels[i]})` : ""}: ${title}`}
            tabIndex={i === index ? 0 : -1}
            className="h-full w-full shrink-0"
          >
            <CoverImage src={src} alt={labels?.[i] ? `${title} — ${labels[i]}` : title} />
          </button>
        ))}
      </div>

      {label && (
        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/55 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
          {label}
        </span>
      )}
      <span className="pointer-events-none absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
        <Expand className="h-4 w-4" />
      </span>

      {total > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Foto anterior"
            className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-foreground shadow-md transition hover:bg-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Foto siguiente"
            className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-foreground shadow-md transition hover:bg-white"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Ver foto ${i + 1}${labels?.[i] ? ` (${labels[i]})` : ""}`}
                aria-current={i === index}
                className={`h-2 rounded-full shadow transition-all ${
                  i === index ? "w-6 bg-primary" : "w-2 bg-foreground/30 ring-1 ring-white/80 hover:bg-foreground/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
