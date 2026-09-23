import { Mail, MapPin, Truck } from "lucide-react";
import { SITE, ZONE_LABEL } from "@/config/site";
import { WoodTexture } from "../WoodTexture";
import { WhatsAppButton } from "../WhatsAppButton";
import { SocialLinks } from "../SocialLinks";

export function Contact() {
  return (
    <section id="contacto" className="on-dark relative isolate overflow-hidden bg-hero text-white">
      <WoodTexture opacity={0.2} />
      <div className="pointer-events-none absolute -left-[10%] bottom-0 h-[70%] w-[45%] rounded-full bg-accent/10 blur-[140px]" />

      <div className="container relative grid gap-12 py-20 sm:py-28 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div>
          <p className="eyebrow mb-4">Contacto</p>
          <h2 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
            Contanos tu idea y te pasamos <span className="italic text-accent">tu cotización.</span>
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg">
            Los precios varían según medidas, materiales y terminaciones. Escribinos por WhatsApp y te respondemos
            con un presupuesto a medida.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <WhatsAppButton variant="whatsapp">Escribinos al {SITE.phoneDisplay}</WhatsAppButton>
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm">
          <ul className="space-y-5 text-[15px]">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <div>
                <p className="font-semibold">Zona</p>
                <p className="text-white/65">{ZONE_LABEL}</p>
              </div>
            </li>
            <li className="flex gap-3">
              <Truck className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <div>
                <p className="font-semibold">Hacemos envíos</p>
                <p className="text-white/65">Consultanos por tu zona.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <div>
                <p className="font-semibold">Correo</p>
                <a href={`mailto:${SITE.email}`} className="break-all text-white/65 transition-colors hover:text-white">
                  {SITE.email}
                </a>
              </div>
            </li>
          </ul>

          <div className="mt-7 border-t border-white/10 pt-6">
            <p className="mb-3 text-sm text-white/65">Mirá nuestros trabajos en redes</p>
            <SocialLinks />
          </div>
        </div>
      </div>
    </section>
  );
}
