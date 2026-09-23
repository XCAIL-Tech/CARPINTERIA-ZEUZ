/**
 * SEO / GEO por ruta — fuente única.
 *
 * - En el build, `scripts/prerender.mjs` escribe estos datos en el <head> del
 *   HTML de cada ruta (lo que leen WhatsApp, Facebook, Google y los buscadores
 *   con IA, que no ejecutan JavaScript).
 * - En el navegador, `Layout` actualiza título / description al navegar.
 */
import { CATEGORIES, findCategory, getCategoryShareImage, getProductImage } from "@/data/productos";
import { FAQ } from "@/data/faq";
import { SITE, ZONE_LABEL } from "@/config/site";

export type RouteMeta = {
  path: string;
  title: string;
  description: string;
  /** Imagen de categoría para compartir: JPG 1200×630, absoluta. Default: logo (/og-image.jpg) */
  image?: string;
  imageAlt?: string;
  jsonLd: object[];
};

const BUSINESS_ID = `${SITE.url}/#business`;
// ?v= fuerza a WhatsApp / Facebook a pedir la imagen de nuevo cuando cambia (cachean por URL).
const DEFAULT_IMAGE = `${SITE.url}/og-image.jpg?v=2`;
const DEFAULT_IMAGE_ALT = "Carpintería Zeuz — muebles a medida";
const HOME_TITLE = "Carpintería Zeuz — Muebles a medida en Tres de Febrero";

const abs = (path: string) => `${SITE.url}${path === "/" ? "" : path}`;

function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

function productList(categorySlug: string) {
  const category = findCategory(categorySlug);
  if (!category) return [];
  return category.products.map((p, i) => {
    const img = getProductImage(category.slug, p.id);
    return {
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: `${p.title} a medida`,
        description: p.description,
        category: category.name,
        brand: { "@type": "Brand", name: SITE.name },
        ...(img ? { image: abs(img) } : {}),
        url: `${abs(`/productos/${category.slug}`)}#${category.slug}-${p.id}`,
      },
    };
  });
}

const HOME: RouteMeta = {
  path: "/",
  title: HOME_TITLE,
  description:
    "Carpintería Zeuz: muebles a medida para living, dormitorio, cocina, baño, infantil y home office en Pablo Podestá, Tres de Febrero. Reparaciones y envíos. Pedí tu cotización por WhatsApp.",
  jsonLd: [],
};

const STATIC_ROUTES: RouteMeta[] = [
  HOME,
  {
    path: "/productos",
    title: "Vidriera virtual — Muebles a medida | Carpintería Zeuz",
    description:
      "Vidriera virtual de Carpintería Zeuz: racks de TV, placares, vestidores, mesas de luz flotantes, alacenas, bajo mesadas, vanitorys, escritorios y muebles infantiles a medida.",
    jsonLd: [
      breadcrumbs([
        { name: "Inicio", path: "/" },
        { name: "Productos", path: "/productos" },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Vidriera virtual",
        url: abs("/productos"),
        about: { "@id": BUSINESS_ID },
        hasPart: CATEGORIES.map((c) => ({ "@type": "CollectionPage", name: c.name, url: abs(`/productos/${c.slug}`) })),
      },
    ],
  },
  ...CATEGORIES.map<RouteMeta>((c) => {
    const cover = getCategoryShareImage(c.slug);
    return {
    path: `/productos/${c.slug}`,
    // Con fotos cargadas, el link de la categoría se comparte con su propia portada.
    ...(cover ? { image: abs(cover), imageAlt: `Muebles de ${c.name.toLowerCase()} a medida — Carpintería Zeuz` } : {}),
    title: `Muebles de ${c.name.toLowerCase()} a medida | Carpintería Zeuz`,
    description: `Muebles de ${c.name.toLowerCase()} a medida en ${SITE.zone.locality}, ${SITE.zone.partido}: ${c.products
      .slice(0, 5)
      .map((p) => p.title.toLowerCase())
      .join(", ")} y más. Pedí tu cotización por WhatsApp. Hacemos envíos.`,
    jsonLd: [
      breadcrumbs([
        { name: "Inicio", path: "/" },
        { name: "Productos", path: "/productos" },
        { name: c.name, path: `/productos/${c.slug}` },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: `Muebles de ${c.name.toLowerCase()} a medida`,
        itemListElement: productList(c.slug),
      },
    ],
    };
  }),
  {
    path: "/acerca-de",
    title: "Acerca de | Carpintería Zeuz",
    description: `Carpintería Zeuz es una carpintería de muebles a medida en ${ZONE_LABEL}. Diseñamos y fabricamos cada mueble según tu espacio.`,
    jsonLd: [
      breadcrumbs([
        { name: "Inicio", path: "/" },
        { name: "Acerca de", path: "/acerca-de" },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        url: abs("/acerca-de"),
        about: { "@id": BUSINESS_ID },
      },
    ],
  },
  {
    path: "/contacto",
    title: "Contacto | Carpintería Zeuz",
    description: `Escribinos por WhatsApp al ${SITE.phoneDisplay} o a ${SITE.email}. ${ZONE_LABEL}. Hacemos envíos.`,
    jsonLd: [
      breadcrumbs([
        { name: "Inicio", path: "/" },
        { name: "Contacto", path: "/contacto" },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        url: abs("/contacto"),
        about: { "@id": BUSINESS_ID },
      },
    ],
  },
  {
    path: "/preguntas-frecuentes",
    title: "Preguntas frecuentes | Carpintería Zeuz",
    description: "Preguntas frecuentes sobre muebles a medida, cotizaciones, reparaciones y envíos de Carpintería Zeuz.",
    jsonLd: [
      breadcrumbs([
        { name: "Inicio", path: "/" },
        { name: "Preguntas frecuentes", path: "/preguntas-frecuentes" },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQ.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  },
];

export const NOT_FOUND_META: RouteMeta = {
  path: "/404",
  title: "Página no encontrada | Carpintería Zeuz",
  description: "La página que buscás no existe. Recorré la vidriera virtual de Carpintería Zeuz.",
  jsonLd: [],
};

/** Todas las rutas indexables (prerender + sitemap). */
export const ROUTES = STATIC_ROUTES;

export function getRouteMeta(pathname: string): RouteMeta {
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return ROUTES.find((r) => r.path === clean) ?? NOT_FOUND_META;
}

export const DEFAULTS = { image: DEFAULT_IMAGE, imageAlt: DEFAULT_IMAGE_ALT, url: SITE.url };
