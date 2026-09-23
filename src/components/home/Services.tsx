import { Hammer, PencilRuler, Wrench } from "lucide-react";
import { SectionHeader } from "../SectionHeader";
import { WhatsAppButton } from "../WhatsAppButton";

const SERVICES = [
  {
    Icon: PencilRuler,
    title: "Proyectos a medida",
    desc: "¿Tenés una idea o una foto de referencia? La adaptamos a tus medidas, materiales y presupuesto.",
    message: "Hola Carpintería Zeuz, tengo un proyecto a medida y quería consultarles.",
  },
  {
    Icon: Wrench,
    title: "Reparaciones",
    desc: "Arreglamos puertas, bisagras, cajones, correderas y estructuras. Le damos una segunda vida a tus muebles.",
    message: "Hola Carpintería Zeuz, necesito una reparación y quería consultarles.",
  },
  {
    Icon: Hammer,
    title: "Presupuestos según demanda",
    desc: "Cada trabajo es distinto: te cotizamos según medidas, materiales y terminaciones. Sin compromiso.",
    message: "Hola Carpintería Zeuz, quería pedir un presupuesto.",
  },
];

export function Services() {
  return (
    <section id="servicios" className="border-y border-border bg-muted/50 py-20 sm:py-28">
      <div className="container">
        <SectionHeader
          eyebrow="Servicios"
          title="Mucho más que un catálogo"
          subtitle="Lo que ves en el catálogo es un punto de partida. Hacemos también trabajos especiales y reparaciones."
          align="center"
        />

        <div className="grid gap-5 md:grid-cols-3">
          {SERVICES.map(({ Icon, title, desc, message }) => (
            <article key={title} className="panel panel-hover flex flex-col p-7">
              <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Icon className="h-6 w-6" strokeWidth={1.7} />
              </span>
              <h3 className="font-display text-xl font-semibold">{title}</h3>
              <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted-foreground">{desc}</p>
              <WhatsAppButton message={message} variant="line" size="sm" className="mt-6 self-start">
                Consultar
              </WhatsAppButton>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
