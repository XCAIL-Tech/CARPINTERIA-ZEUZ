/**
 * Logo tipográfico provisorio: "ZEUZ" en serif + "CARPINTERÍA" espaciado.
 * Reemplazar por el logo definitivo cuando exista (mantener la misma API).
 */
export function Logo({ tone = "light", className = "" }: { tone?: "light" | "dark"; className?: string }) {
  const main = tone === "light" ? "text-white" : "text-foreground";
  const sub = tone === "light" ? "text-accent" : "text-primary";

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <span
        aria-hidden="true"
        className="flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-br from-[#D69A55] to-[#7A4A22] font-display text-xl font-bold text-[#1A130E] shadow-inner"
      >
        Z
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[1.45rem] font-semibold tracking-[0.08em] ${main}`}>ZEUZ</span>
        <span className={`mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.34em] ${sub}`}>Carpintería</span>
      </span>
    </span>
  );
}
