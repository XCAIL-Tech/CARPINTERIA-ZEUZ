import { Link } from "react-router-dom";
import { Mail, MapPin, Truck } from "lucide-react";
import { CATEGORIES } from "@/data/productos";
import { SITE, ZONE_LABEL, whatsappUrl } from "@/config/site";
import { Logo } from "./Logo";
import { SocialLinks } from "./SocialLinks";
import { WhatsAppIcon } from "./icons";
import { WoodTexture } from "./WoodTexture";

const titleClass = "mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-accent";
const linkClass = "text-sm text-white/60 transition-colors hover:text-white";

export function Footer() {
  return (
    <footer className="on-dark relative isolate overflow-hidden border-t border-white/10 bg-hero text-white">
      <WoodTexture opacity={0.08} />
      <div className="container relative pt-16">
        <div className="mb-12 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Marca */}
          <div className="flex flex-col gap-4">
            <Link to="/" aria-label="Carpintería Zeuz — Inicio" className="w-fit">
              <Logo />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-white/60">
              Muebles a medida para living, dormitorio, cocina, baño, cuartos infantiles y home office. Diseñamos y fabricamos a la medida de tu espacio.
            </p>
            <SocialLinks />
          </div>

          {/* Productos */}
          <div>
            <p className={titleClass}>Productos</p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 sm:grid-cols-1">
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link to={`/productos/${c.slug}`} className={linkClass}>
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <p className={titleClass}>Contacto</p>
            <ul className="space-y-3">
              <li>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${linkClass} inline-flex items-center gap-2`}
                >
                  <WhatsAppIcon className="h-4 w-4 text-whatsapp" /> {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className={`${linkClass} inline-flex items-center gap-2 break-all`}>
                  <Mail className="h-4 w-4 shrink-0" /> {SITE.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Zona */}
          <div>
            <p className={titleClass}>Zona</p>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" /> {ZONE_LABEL}
              </li>
              <li className="flex gap-2">
                <Truck className="mt-0.5 h-4 w-4 shrink-0" /> Hacemos envíos
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-2 border-t border-white/10 py-7 text-xs text-white/45 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE.name}. Todos los derechos reservados.
          </p>
          <nav className="flex gap-5">
            <Link to="/acerca-de" className="transition-colors hover:text-white">
              Acerca de
            </Link>
            <Link to="/contacto" className="transition-colors hover:text-white">
              Contacto
            </Link>
            <Link to="/preguntas-frecuentes" className="transition-colors hover:text-white">
              Preguntas frecuentes
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
