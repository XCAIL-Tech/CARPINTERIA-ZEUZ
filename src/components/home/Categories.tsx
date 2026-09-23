import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/data/productos";
import { SectionHeader } from "../SectionHeader";
import { CategoryCard } from "../products/CategoryCard";

export function Categories() {
  return (
    <section id="productos" className="py-20 sm:py-28">
      <div className="container">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeader
            eyebrow="Productos"
            title="Un mueble para cada ambiente"
            subtitle="Elegí una categoría y recorré la vidriera virtual. Todo se fabrica a medida."
            className="mb-0"
          />
          <Link
            to="/productos"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            Ir a la vidriera virtual <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c) => (
            <CategoryCard key={c.slug} category={c} className="aspect-[4/3]" />
          ))}
        </div>
      </div>
    </section>
  );
}
