import { cn } from "@/lib/utils";

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";

  return (
    <div className={cn("mb-12 max-w-2xl", centered && "mx-auto text-center", className)}>
      {eyebrow && (
        <div className={`mb-4 flex items-center gap-3 ${centered ? "justify-center" : ""}`}>
          <span className="h-px w-8 bg-primary/50" />
          <span className="eyebrow">{eyebrow}</span>
          {centered && <span className="h-px w-8 bg-primary/50" />}
        </div>
      )}
      <h2 className="font-display text-3xl font-semibold leading-[1.1] tracking-tight sm:text-[2.6rem]">{title}</h2>
      {subtitle && <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{subtitle}</p>}
    </div>
  );
}
