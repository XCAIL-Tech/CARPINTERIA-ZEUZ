import type { LucideIcon } from "lucide-react";
import { ImageIcon } from "lucide-react";
import { WoodTexture } from "../WoodTexture";

/**
 * Foto con relleno: mientras un producto no tenga su foto se ve un panel de
 * veta de madera con el ícono de la categoría, no un hueco roto.
 */
export function CoverImage({
  src,
  alt,
  icon: Icon = ImageIcon,
  label,
  className = "",
  loading = "lazy",
}: {
  src?: string;
  alt: string;
  icon?: LucideIcon;
  label?: string;
  className?: string;
  loading?: "lazy" | "eager";
}) {
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
