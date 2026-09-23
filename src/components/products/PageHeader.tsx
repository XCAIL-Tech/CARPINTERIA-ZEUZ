import { Fragment } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { WoodTexture } from "../WoodTexture";

export type Crumb = { label: string; to?: string };

/** Cabecera oscura de las páginas internas, con migas de pan. */
export function PageHeader({
  crumbs,
  eyebrow,
  title,
  subtitle,
  children,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-hero text-white">
      <WoodTexture opacity={0.16} />
      <div className="container relative py-12 sm:py-16">
        <nav aria-label="Migas de pan" className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-white/55">
          {crumbs.map((c, i) => (
            <Fragment key={c.label}>
              {i > 0 && <ChevronRight className="h-3.5 w-3.5" />}
              {c.to ? (
                <Link to={c.to} className="transition-colors hover:text-white">
                  {c.label}
                </Link>
              ) : (
                <span className="text-white/85">{c.label}</span>
              )}
            </Fragment>
          ))}
        </nav>
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">{subtitle}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
