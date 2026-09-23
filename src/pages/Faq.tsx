import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/products/PageHeader";
import { QuoteBanner } from "@/components/products/QuoteBanner";
import { SITE, ZONE_LABEL } from "@/config/site";
import { usePageMeta } from "@/lib/usePageMeta";

const FAQ = [
  {
    question: "¿Por qué no hay precios en el catálogo?",
    answer:
      "Porque todos nuestros muebles son a medida: el precio depende de las medidas, los materiales y las terminaciones que elijas. Escribinos por WhatsApp y te pasamos una cotización sin compromiso.",
  },
  {
    question: "¿Puedo pedir un mueble que no esté en el catálogo?",
    answer:
      "Sí. El catálogo es una muestra de lo que hacemos. Si tenés una idea o una foto de referencia, la adaptamos a tu espacio.",
  },
  {
    question: "¿Hacen reparaciones?",
    answer:
      "Sí, reparamos muebles de madera: puertas, bisagras, cajones, correderas y estructuras. Mandanos fotos por WhatsApp y te decimos cómo lo resolvemos.",
  },
  {
    question: "¿Dónde están y hasta dónde llegan?",
    answer: `Estamos en ${ZONE_LABEL}. Hacemos envíos: consultanos por tu zona.`,
  },
  {
    question: "¿Cómo pido una cotización?",
    answer: `Escribinos por WhatsApp al ${SITE.phoneDisplay} contándonos qué necesitás. Si tenés medidas aproximadas o fotos del espacio, nos ayuda a cotizar más rápido.`,
  },
];

function buildFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  usePageMeta("Preguntas frecuentes", "Preguntas frecuentes sobre muebles a medida, cotizaciones, reparaciones y envíos.");

  // FAQPage schema — Googlebot ejecuta JS al renderizar, así que sirve para resultados enriquecidos.
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(buildFaqJsonLd());
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <Layout>
      <PageHeader crumbs={[{ label: "Inicio", to: "/" }, { label: "Preguntas frecuentes" }]} title="Preguntas frecuentes" />

      <div className="container max-w-3xl space-y-12 py-16">
        <div className="space-y-3">
          {FAQ.map((item, i) => {
            const open = openIndex === i;
            return (
              <div key={item.question} className="panel overflow-hidden">
                <button
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-3 px-6 py-5 text-left"
                >
                  <span className="font-display text-lg font-semibold">{item.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-primary transition-transform ${open ? "rotate-180" : ""}`}
                  />
                </button>
                {open && <p className="px-6 pb-5 leading-relaxed text-muted-foreground">{item.answer}</p>}
              </div>
            );
          })}
        </div>

        <QuoteBanner title="¿Te quedó alguna duda? Escribinos." />
      </div>
    </Layout>
  );
}
