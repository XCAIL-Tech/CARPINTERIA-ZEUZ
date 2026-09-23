import { SectionHeader } from "../SectionHeader";

const STEPS = [
  {
    title: "Nos escribís",
    desc: "Contanos qué necesitás por WhatsApp. Si tenés fotos del espacio o medidas aproximadas, mejor.",
  },
  {
    title: "Te asesoramos",
    desc: "Definimos juntos diseño, materiales, colores y terminaciones.",
  },
  {
    title: "Cotizamos",
    desc: "Te pasamos un presupuesto claro según tus medidas. Sin compromiso.",
  },
  {
    title: "Fabricamos y entregamos",
    desc: "Fabricamos tu mueble a medida y te lo enviamos.",
  },
];

export function Process() {
  return (
    <section id="como-trabajamos" className="py-20 sm:py-28">
      <div className="container">
        <SectionHeader
          eyebrow="Cómo trabajamos"
          title="De la idea al mueble terminado"
          subtitle="Un proceso simple y directo, con atención personalizada en cada paso."
        />

        <ol className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <li key={step.title} className="bg-card p-7">
              <span className="font-display text-5xl font-semibold text-primary/25">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 font-display text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{step.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
