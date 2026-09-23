import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/products/PageHeader";
import { QuoteBanner } from "@/components/products/QuoteBanner";
import { FAQ } from "@/data/faq";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
                {/* Respuesta siempre en el HTML (SEO); solo se oculta visualmente */}
                <p hidden={!open} className="px-6 pb-5 leading-relaxed text-muted-foreground">
                  {item.answer}
                </p>
              </div>
            );
          })}
        </div>

        <QuoteBanner title="¿Te quedó alguna duda? Escribinos." />
      </div>
    </Layout>
  );
}
