import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { usePageMeta } from "@/lib/usePageMeta";

export default function NotFound() {
  usePageMeta("Página no encontrada");

  return (
    <Layout>
      <div className="container flex min-h-[55vh] flex-col items-center justify-center py-20 text-center">
        <p className="eyebrow mb-3">Error 404</p>
        <h1 className="font-display text-4xl font-semibold">No encontramos esta página</h1>
        <p className="mt-3 max-w-md text-muted-foreground">Puede que el enlace haya cambiado. Te invitamos a recorrer la vidriera virtual.</p>
        <Link to="/productos" className="btn-primary mt-8 rounded-md px-6 py-3.5 text-sm font-semibold">
          Ver productos
        </Link>
      </div>
    </Layout>
  );
}
