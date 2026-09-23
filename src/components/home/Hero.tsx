import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Ruler, Truck } from "lucide-react";
import { CATEGORIES, getCategoryCover } from "@/data/productos";
import { SITE } from "@/config/site";
import { WoodTexture } from "../WoodTexture";
import { WhatsAppButton } from "../WhatsAppButton";
import { CoverImage } from "../products/CoverImage";
import { CATEGORY_ICONS } from "../products/categoryIcons";

const BADGES = [
  { Icon: Ruler, label: "100% a medida" },
  { Icon: Truck, label: "Hacemos envíos" },
  { Icon: MapPin, label: `${SITE.zone.locality}, ${SITE.zone.partido}` },
];

export function Hero() {
  // Collage con la portada de las primeras tres categorías.
  const collage = CATEGORIES.slice(0, 3).map((c) => ({ name: c.name, slug: c.slug, cover: getCategoryCover(c) }));

  return (
    <section
      id="inicio"
      className="on-dark relative isolate overflow-hidden bg-gradient-to-br from-[#2A1D14] via-[#1A130E] to-[#120D09] text-white"
    >
      <WoodTexture opacity={0.18} />
      <div className="pointer-events-none absolute -right-[10%] top-0 h-[60%] w-[50%] rounded-full bg-accent/15 blur-[140px]" />

      <div className="container relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
        <div className="max-w-2xl animate-fade-up">
          <p className="eyebrow mb-5">Carpintería · Muebles a medida</p>
          <h1 className="font-display text-[2.6rem] font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.2rem]">
            Muebles hechos <span className="italic text-accent">a la medida</span> de tu espacio.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            Living, dormitorio, cocina, baño, infantil y home office. Diseñamos y fabricamos cada pieza según tus
            medidas y tu estilo.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/productos"
              className="btn-primary inline-flex items-center justify-center gap-2 rounded-md px-6 py-3.5 text-sm font-semibold"
            >
              Ver productos <ArrowRight className="h-4 w-4" />
            </Link>
            <WhatsAppButton variant="line">Pedir cotización</WhatsAppButton>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/65">
            {BADGES.map(({ Icon, label }) => (
              <li key={label} className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-accent" /> {label}
              </li>
            ))}
          </ul>
        </div>

        {/* Collage */}
        <div className="grid h-[420px] grid-cols-2 grid-rows-2 gap-3 animate-fade-up sm:h-[520px]">
          {collage.map((item, i) => (
            <Link
              key={item.slug}
              to={`/productos/${item.slug}`}
              className={`group relative overflow-hidden rounded-lg ring-1 ring-white/10 ${i === 0 ? "row-span-2" : ""}`}
            >
              <CoverImage src={item.cover} alt={item.name} icon={CATEGORY_ICONS[item.slug]} loading="eager" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-4 font-display text-lg font-semibold">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
