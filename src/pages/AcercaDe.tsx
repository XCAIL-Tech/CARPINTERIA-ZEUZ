import { HeartHandshake, Ruler, Truck, Wrench } from "lucide-react";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/products/PageHeader";
import { QuoteBanner } from "@/components/products/QuoteBanner";
import { SectionHeader } from "@/components/SectionHeader";
import { Process } from "@/components/home/Process";
import { Services } from "@/components/home/Services";
import { SITE } from "@/config/site";

const VALUES = [
  { Icon: Ruler, title: "Todo a medida", desc: "Cada mueble se diseña para tu espacio, tus medidas y tu forma de usarlo." },
  { Icon: HeartHandshake, title: "Atención personalizada", desc: "Hablás directo con nosotros, de la primera consulta a la entrega." },
  { Icon: Wrench, title: "Oficio y detalle", desc: "Cuidamos las terminaciones, los herrajes y cada unión." },
  { Icon: Truck, title: "Hacemos envíos", desc: "Te llevamos el mueble terminado. Consultanos por tu zona." },
];

export default function AcercaDe() {
  return (
    <Layout>
      <PageHeader
        crumbs={[{ label: "Inicio", to: "/" }, { label: "Acerca de" }]}
        eyebrow="Acerca de"
        title="Carpintería Zeuz"
        subtitle={`Somos una carpintería de ${SITE.zone.locality}, ${SITE.zone.partido}, dedicada a diseñar y fabricar muebles a medida para cada ambiente de tu casa.`}
      />

      <section className="py-20 sm:py-24">
        <div className="container grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div>
            <img
              src="/brand/logo-zeuz.webp"
              alt="Logo de Carpintería Zeuz"
              width={256}
              height={256}
              className="mb-8 h-36 w-36 drop-shadow-[0_12px_24px_rgba(26,19,14,0.35)]"
            />
            <SectionHeader eyebrow="Quiénes somos" title="Muebles pensados para tu espacio" className="mb-6" />
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              <p>
                En Carpintería Zeuz creemos que un buen mueble tiene que adaptarse a tu casa, y no al revés. Por eso
                no trabajamos con medidas estándar: cada pieza se diseña y se fabrica según el espacio, las necesidades
                y el estilo de cada cliente.
              </p>
              <p>
                Hacemos muebles para living, dormitorio, cocina, baño, cuartos infantiles y home office. También
                reparamos muebles y encaramos proyectos especiales.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {VALUES.map(({ Icon, title, desc }) => (
              <div key={title} className="panel p-6">
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" strokeWidth={1.7} />
                </span>
                <h3 className="font-display text-lg font-semibold">{title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Services />
      <Process />

      <div className="container pb-20">
        <QuoteBanner title="¿Tenés un proyecto en mente? Hablemos." />
      </div>
    </Layout>
  );
}
