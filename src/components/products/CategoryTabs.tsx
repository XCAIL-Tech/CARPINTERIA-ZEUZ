import { NavLink } from "react-router-dom";
import { CATEGORIES } from "@/data/productos";

const TABS = [{ to: "/productos", label: "Ver todo" }, ...CATEGORIES.map((c) => ({ to: `/productos/${c.slug}`, label: c.name }))];

/** Filtro de categorías de la vidriera (fijo arriba al scrollear). */
export function CategoryTabs() {
  return (
    <div className="sticky top-20 z-30 border-b border-border bg-background/95 backdrop-blur">
      <nav
        aria-label="Categorías"
        className="container flex gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {TABS.map((t) => (
          <NavLink
            key={t.to}
            to={t.to}
            end
            className={({ isActive }) =>
              `shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`
            }
          >
            {t.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
