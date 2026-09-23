import { useId } from "react";

/**
 * Veta de madera generada con un filtro SVG (ruido estirado en horizontal).
 * Sin imágenes: pesa nada y escala a cualquier tamaño. Se usa como capa
 * absoluta sobre franjas oscuras (Hero, CTA, Footer).
 */
export function WoodTexture({ className = "", opacity = 0.22 }: { className?: string; opacity?: number }) {
  const id = useId().replace(/:/g, "");

  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{ opacity }}
      preserveAspectRatio="none"
    >
      <filter id={`wood-${id}`} x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.0035 0.11" numOctaves={4} seed={7} />
        {/* Ruido → alfa; color miel constante */}
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.84
                  0 0 0 0 0.60
                  0 0 0 0 0.33
                  1.6 0 0 0 -0.55"
        />
      </filter>
      <rect width="100%" height="100%" filter={`url(#wood-${id})`} />
    </svg>
  );
}
