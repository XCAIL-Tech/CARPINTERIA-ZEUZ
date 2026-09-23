import { Baby, Bath, BedDouble, ChefHat, Laptop, Sofa } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/** Ícono por categoría — se usa en el relleno de las fotos pendientes. */
export const CATEGORY_ICONS: Record<string, LucideIcon> = {
  living: Sofa,
  dormitorio: BedDouble,
  cocina: ChefHat,
  bano: Bath,
  infantil: Baby,
  "home-office": Laptop,
};
