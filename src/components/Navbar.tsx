import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronDown, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { CATEGORIES } from "@/data/productos";
import { Logo } from "./Logo";
import { WhatsAppButton } from "./WhatsAppButton";

const PRODUCT_LINKS = [
  { to: "/productos", label: "Ver todo" },
  ...CATEGORIES.map((c) => ({ to: `/productos/${c.slug}`, label: c.name })),
];

const baseLink =
  "inline-flex items-center gap-1 rounded-md px-3 py-2 text-[14px] font-medium tracking-wide transition-colors hover:bg-white/5 hover:text-white";

/** Desplegable "Productos" (desktop): abre con hover o click, cierra con Esc / click afuera. */
function ProductsMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const active = pathname.startsWith("/productos");

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((o) => !o)}
        className={`${baseLink} ${active ? "text-white" : "text-white/65"}`}
      >
        Productos
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        // pt-2 = puente invisible para que el hover no se corte entre botón y panel
        <div className="absolute left-1/2 top-full z-50 w-60 -translate-x-1/2 pt-2">
          <div className="overflow-hidden rounded-lg border border-border bg-card p-2 text-foreground shadow-xl animate-in fade-in-0 zoom-in-95">
            {PRODUCT_LINKS.map((l, i) => (
              <NavLink
                key={l.to}
                to={l.to}
                end
                className={({ isActive }) =>
                  `block rounded-md px-3 py-2.5 text-sm transition-colors hover:bg-muted ${
                    isActive ? "font-semibold text-primary" : "text-foreground/80"
                  } ${i === 0 ? "mb-1 border-b border-border pb-3" : ""}`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navClass = ({ isActive }: { isActive: boolean }) => `${baseLink} ${isActive ? "text-white" : "text-white/65"}`;
  const mobileLink =
    "block rounded-md px-3 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground";

  return (
    <header
      className={`on-dark sticky top-0 z-40 w-full border-b bg-hero/95 text-white backdrop-blur transition-shadow duration-300 ${
        scrolled ? "border-white/10 shadow-lg shadow-black/25" : "border-white/[0.06]"
      }`}
    >
      <div className="container flex h-20 items-center justify-between">
        <Link to="/" aria-label="Carpintería Zeuz — Inicio">
          <Logo />
        </Link>

        {/* Desktop */}
        <nav className="hidden items-center gap-1 lg:flex">
          <NavLink to="/" end className={navClass}>
            Inicio
          </NavLink>
          <ProductsMenu />
          <NavLink to="/acerca-de" className={navClass}>
            Acerca de
          </NavLink>
          <NavLink to="/contacto" className={navClass}>
            Contacto
          </NavLink>
        </nav>

        <div className="hidden lg:block">
          <WhatsAppButton size="sm">Pedir cotización</WhatsAppButton>
        </div>

        {/* Mobile */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger className="px-2 text-white lg:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Menú</span>
          </SheetTrigger>

          <SheetContent side="right" className="overflow-y-auto border-l border-border bg-background text-foreground">
            <SheetHeader>
              <SheetTitle className="flex">
                <Logo tone="dark" />
              </SheetTitle>
            </SheetHeader>

            <nav className="mt-8 flex flex-col gap-1" onClick={() => setIsOpen(false)}>
              <Link to="/" className={mobileLink}>
                Inicio
              </Link>
              <p className="px-3 pb-1 pt-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary">Productos</p>
              {PRODUCT_LINKS.map((l) => (
                <Link key={l.to} to={l.to} className={`${mobileLink} py-2.5 pl-6 text-[15px]`}>
                  {l.label}
                </Link>
              ))}
              <div className="my-2 border-t border-border" />
              <Link to="/acerca-de" className={mobileLink}>
                Acerca de
              </Link>
              <Link to="/contacto" className={mobileLink}>
                Contacto
              </Link>
              <WhatsAppButton className="mt-6">Pedir cotización</WhatsAppButton>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
