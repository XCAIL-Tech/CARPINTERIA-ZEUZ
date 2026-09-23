import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { Category } from "@/data/productos";
import { getCategoryCover } from "@/data/productos";
import { CoverImage } from "./CoverImage";
import { CATEGORY_ICONS } from "./categoryIcons";

/** Tarjeta de categoría: foto grande + nombre sobre degradado. */
export function CategoryCard({ category, className = "" }: { category: Category; className?: string }) {
  return (
    <Link
      to={`/productos/${category.slug}`}
      className={`group relative block overflow-hidden rounded-lg bg-secondary shadow-md ring-1 ring-black/5 ${className}`}
    >
      <CoverImage src={getCategoryCover(category)} alt={category.name} icon={CATEGORY_ICONS[category.slug]} />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1A130E]/90 via-[#1A130E]/20 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
        <div className="flex items-end justify-between gap-3">
          <h3 className="font-display text-2xl font-semibold leading-tight">{category.name}</h3>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/30 transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-[#1A130E]">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/70">{category.description}</p>
      </div>
    </Link>
  );
}
