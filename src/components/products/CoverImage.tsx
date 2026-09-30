import type { LucideIcon } from "lucide-react";
import { ImageIcon } from "lucide-react";
import { WoodTexture } from "../WoodTexture";

/**
 * Foto con relleno: mientras un producto no tenga su foto se ve un panel de
 * veta de madera con el ícono de la categoría, no un hueco roto.
 *
 * fit="cover"   → llena el recuadro recortando lo que sobre (banners, collage).
 * fit="contain" → la foto se ve COMPLETA, sin recorte ni efecto zoom; si no
 *                 coincide con el recuadro, el espacio libre se rellena con la
 *                 misma foto desenfocada (fotos de producto).
 */
export function CoverImage({
  src,
  alt,
  icon: Icon = ImageIcon,
  label,
  fit = "cover",
  className = "",
  loading = "lazy",
}: {
  src?: string;
  alt: string;
  icon?: LucideIcon;
  label?: string;
  fit?: "cover" | "contain";
  className?: string;
  loading?: "lazy" | "eager";
}) {
  if (src && fit === "contain") {
    return (
      <div className={`relative h-full w-full overflow-hidden bg-white ${className}`}>
        {/* Relleno: la misma foto (ya cacheada), ampliada y desenfocada */}
        <img
          src={src}
          alt=""
          aria-hidden="true"
          loading={loading}
          decoding="async"
          className="absolute inset-0 h-full w-full scale-110 object-cover opacity-60 blur-2xl"
        />
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          className="relative h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </div>
    );
  }

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] ${className}`}
      />
    );
  }

  return (
    <div className={`photo-placeholder relative flex h-full w-full items-center justify-center ${className}`}>
      <WoodTexture opacity={0.5} />
      <span className="relative flex flex-col items-center gap-3 px-4 text-center text-white/90">
        <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm">
          <Icon className="h-8 w-8" strokeWidth={1.4} />
        </span>
        {label && <span className="text-[0.65rem] font-semibold uppercase tracking-[0.16em]">{label}</span>}
      </span>
    </div>
  );
}
