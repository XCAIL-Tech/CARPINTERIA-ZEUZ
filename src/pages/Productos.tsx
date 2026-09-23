import { Link, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/products/PageHeader";
import { CategoryTabs } from "@/components/products/CategoryTabs";
import { ProductGrid } from "@/components/products/ProductGrid";
import { QuoteBanner } from "@/components/products/QuoteBanner";
import { CATEGORIES, findCategory } from "@/data/productos";
import NotFound from "./NotFound";

/** Vidriera virtual: /productos (ver todo) y /productos/:categoria. */
export default function Productos() {
  const { categoria } = useParams();
  const category = findCategory(categoria);
  const notFound = categoria !== undefined && !category;

  if (notFound) return <NotFound />;

  return (
    <Layout>
      <PageHeader
        crumbs={[
          { label: "Inicio", to: "/" },
          category ? { label: "Productos", to: "/productos" } : { label: "Productos" },
          ...(category ? [{ label: category.name }] : []),
        ]}
        eyebrow="Vidriera virtual"
        title={category ? category.name : "Vidriera virtual"}
        subtitle={
          category?.description ??
          "Recorré nuestros productos por ambiente. Todo se fabrica a medida: consultanos por WhatsApp y te pasamos tu cotización."
        }
      />

      <CategoryTabs />

      <div className="container space-y-16 py-12 sm:py-16">
        {category ? (
          <ProductGrid category={category} />
        ) : (
          CATEGORIES.map((c) => (
            <section key={c.slug}>
              <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
                <div>
                  <h2 className="font-display text-3xl font-semibold tracking-tight">{c.name}</h2>
                  <p className="mt-1 text-muted-foreground">{c.description}</p>
                </div>
                <Link
                  to={`/productos/${c.slug}`}
                  className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary hover:underline"
                >
                  Ver {c.name} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <ProductGrid category={c} />
            </section>
          ))
        )}

        <QuoteBanner title="¿No encontrás lo que buscás? También lo hacemos." />
      </div>
    </Layout>
  );
}
