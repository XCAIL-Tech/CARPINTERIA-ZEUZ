import { Link } from "react-router-dom";
import { ArrowRight, Mail, MapPin, Truck } from "lucide-react";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/products/PageHeader";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { FacebookIcon, InstagramIcon, TikTokIcon, WhatsAppIcon } from "@/components/icons";
import { SITE, ZONE_LABEL } from "@/config/site";

const NETWORKS = [
  { label: "Instagram", Icon: InstagramIcon, ...SITE.social.instagram },
  { label: "TikTok", Icon: TikTokIcon, ...SITE.social.tiktok },
  { label: "Facebook", Icon: FacebookIcon, ...SITE.social.facebook },
];

export default function Contacto() {
  return (
    <Layout>
      <PageHeader
        crumbs={[{ label: "Inicio", to: "/" }, { label: "Contacto" }]}
        eyebrow="Contacto"
        title="Hablemos de tu proyecto"
        subtitle="La forma más rápida de consultarnos es por WhatsApp. Contanos qué necesitás y te pasamos tu cotización."
      >
        <WhatsAppButton variant="whatsapp">Escribinos al {SITE.phoneDisplay}</WhatsAppButton>
      </PageHeader>

      <div className="container grid gap-5 py-16 sm:py-20 md:grid-cols-2 lg:grid-cols-4">
        <div className="panel flex flex-col p-7">
          <WhatsAppIcon className="mb-4 h-8 w-8 text-whatsapp" />
          <h2 className="font-display text-xl font-semibold">WhatsApp</h2>
          <p className="mt-1 flex-1 text-muted-foreground">{SITE.phoneDisplay}</p>
          <WhatsAppButton variant="whatsapp" size="sm" className="mt-5 h-11">
            Abrir chat
          </WhatsAppButton>
        </div>

        <div className="panel flex flex-col p-7">
          <Mail className="mb-4 h-8 w-8 text-primary" strokeWidth={1.6} />
          <h2 className="font-display text-xl font-semibold">Correo</h2>
          <a href={`mailto:${SITE.email}`} className="mt-1 break-all text-muted-foreground hover:text-primary">
            {SITE.email}
          </a>
        </div>

        <div className="panel flex flex-col p-7">
          <MapPin className="mb-4 h-8 w-8 text-primary" strokeWidth={1.6} />
          <h2 className="font-display text-xl font-semibold">Zona</h2>
          <p className="mt-1 text-muted-foreground">{ZONE_LABEL}</p>
        </div>

        <div className="panel flex flex-col p-7">
          <Truck className="mb-4 h-8 w-8 text-primary" strokeWidth={1.6} />
          <h2 className="font-display text-xl font-semibold">Hacemos envíos</h2>
          <p className="mt-1 text-muted-foreground">Consultanos por tu zona.</p>
        </div>
      </div>

      <section className="border-t border-border bg-muted/50 py-16 sm:py-20">
        <div className="container text-center">
          <p className="eyebrow mb-3">Redes</p>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Mirá nuestros trabajos</h2>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            Subimos videos del taller, procesos de fabricación y trabajos terminados.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {NETWORKS.map(({ label, Icon, url, handle }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-line inline-flex items-center gap-2.5 rounded-full px-5 py-3 text-sm font-medium"
              >
                <Icon className="h-5 w-5" /> {label} <span className="text-muted-foreground">{handle}</span>
              </a>
            ))}
          </div>
          <Link
            to="/preguntas-frecuentes"
            className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            Ver preguntas frecuentes <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
