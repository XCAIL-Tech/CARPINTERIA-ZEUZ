const EMBLEM = "/brand/logo-zeuz.webp";

/**
 * Isologo: emblema de madera (logo real, generado por `pnpm brand`) + nombre.
 * El texto del emblema no se lee a tamaño de navbar, por eso va el nombre al lado.
 */
export function Logo({
  tone = "light",
  size = "md",
  className = "",
}: {
  tone?: "light" | "dark";
  size?: "md" | "lg";
  className?: string;
}) {
  const main = tone === "light" ? "text-white" : "text-foreground";
  const sub = tone === "light" ? "text-accent" : "text-primary";
  const emblem = size === "lg" ? "h-16 w-16" : "h-12 w-12";

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <img
        src={EMBLEM}
        alt=""
        aria-hidden="true"
        width={128}
        height={128}
        className={`${emblem} shrink-0 drop-shadow-[0_4px_10px_rgba(0,0,0,0.45)]`}
      />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[1.45rem] font-semibold tracking-[0.08em] ${main}`}>ZEUZ</span>
        <span className={`mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.34em] ${sub}`}>Carpintería</span>
      </span>
    </span>
  );
}
