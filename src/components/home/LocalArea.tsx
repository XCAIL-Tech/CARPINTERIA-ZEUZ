import { MapPin, Truck } from "lucide-react";
import { SITE } from "@/config/site";
import { WhatsAppButton } from "../WhatsAppButton";

/**
 * Sección local (SEO / GEO): texto visible con la ubicación y las localidades
 * de envío. Google y los buscadores con IA priorizan lo que está en la página,
 * no solo en los metadatos.
 */
export function LocalArea() {
  const { locality, partido, nearby, neighbors } = SITE.zone;

  return (
    <section id="zona" className="border-t border-border bg-muted/50 py-20 sm:py-24">
      <div className="container grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-primary/50" />
            <span className="eyebrow">Dónde estamos</span>
          </div>
          <h2 className="font-display text-3xl font-semibold leading-[1.1] tracking-tight sm:text-[2.6rem]">
            Carpintería en {locality}, {partido}
          </h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            <p>
              Somos una carpintería de muebles a medida en <strong className="text-foreground">{locality}</strong>,
              partido de <strong className="text-foreground">{partido}</strong>, provincia de Buenos Aires. Diseñamos
              y fabricamos placares, cocinas, vanitorys, escritorios y muebles para cada ambiente.
            </p>
            <p>
              Hacemos envíos a todo {partido} y alrededores, incluyendo los partidos vecinos de{" "}
              {neighbors.join(" y ")}.
            </p>
          </div>
          <WhatsAppButton
            message={`Hola Carpintería Zeuz, quería consultar por un mueble a medida y envío a mi zona.`}
            className="mt-8"
          >
            Consultar por mi zona
          </WhatsAppButton>
        </div>

        <div className="panel p-7 sm:p-8">
          <p className="flex items-center gap-2 font-display text-xl font-semibold">
            <MapPin className="h-5 w-5 text-primary" /> {locality}, {partido}
          </p>
          <p className="mt-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-primary">
            <Truck className="h-4 w-4" /> Hacemos envíos a
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {[...nearby, ...neighbors].map((place) => (
              <li
                key={place}
                className="rounded-full border border-border bg-background px-3.5 py-1.5 text-sm text-foreground/80"
              >
                {place}
              </li>
            ))}
            <li className="rounded-full border border-dashed border-primary/40 px-3.5 py-1.5 text-sm text-primary">
              y alrededores
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
