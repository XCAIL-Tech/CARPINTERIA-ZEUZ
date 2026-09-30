/**
 * SEO / GEO por ruta — fuente única.
 *
 * - En el build, `scripts/prerender.mjs` escribe estos datos en el <head> del
 *   HTML de cada ruta (lo que leen WhatsApp, Facebook, Google y los buscadores
 *   con IA, que no ejecutan JavaScript).
 * - En el navegador, `Layout` actualiza título / description al navegar.
 */
import { CATEGORIES, findCategory, getCategoryShareImage, getProductImages } from "@/data/productos";
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
const HOME_TITLE = "Carpintería Zeuz — Carpintería en Pablo Podestá, Tres de Febrero";

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
    const imgs = getProductImages(category.slug, p.id);
    return {
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: `${p.title} a medida`,
        description: p.description,
        category: category.name,
        brand: { "@type": "Brand", name: SITE.name },
        ...(imgs.length ? { image: imgs.map(abs) } : {}),
        url: `${abs(`/productos/${category.slug}`)}#${category.slug}-${p.id}`,
      },
    };
  });
}

const localityName = SITE.zone.locality;
const partido = SITE.zone.partido;
/** "Carpintería en Pablo Podestá, Tres de Febrero" — la frase local clave. */
const LOCAL = `Carpintería en ${localityName}, ${partido}`;

/**
 * Ficha del negocio para Google / buscadores con IA. Va en todas las páginas
 * (scripts/prerender.mjs). Se genera desde src/config/site.ts.
 */
export const BUSINESS_JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
      "@id": BUSINESS_ID,
      name: SITE.name,
      alternateName: [`Zeuz Carpintería`, `Carpintería Zeuz ${localityName}`],
      description: `${LOCAL}, provincia de Buenos Aires. Diseñamos y fabricamos muebles a medida para living, dormitorio, cocina, baño, cuartos infantiles y home office. También hacemos reparaciones de muebles y envíos a todo ${partido} y alrededores.`,
      slogan: "Muebles hechos a tu medida",
      url: SITE.url,
      logo: `${SITE.url}/brand/logo-512.png`,
      image: [`${SITE.url}/brand/logo-512.png`, ...CATEGORIES.map((c) => getCategoryShareImage(c.slug)).filter(Boolean).map((u) => abs(u as string))],
      telephone: `+54 9 ${SITE.phoneDisplay}`,
      email: SITE.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: localityName,
        addressRegion: "Provincia de Buenos Aires",
        addressCountry: "AR",
      },
      areaServed: [
        { "@type": "City", name: localityName },
        { "@type": "AdministrativeArea", name: `Partido de ${partido}` },
        ...SITE.zone.nearby.map((name) => ({ "@type": "City", name })),
        ...SITE.zone.neighbors.map((name) => ({ "@type": "AdministrativeArea", name: `Partido de ${name}` })),
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: `+54 9 ${SITE.phoneDisplay}`,
        contactType: "sales",
        availableLanguage: "es",
        url: `https://wa.me/${SITE.whatsapp}`,
      },
      knowsAbout: [
        "Carpintería",
        "Muebles a medida",
        "Reparación de muebles",
        ...CATEGORIES.flatMap((c) => c.products.map((p) => p.title)),
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Muebles a medida",
        itemListElement: CATEGORIES.map((c) => ({
          "@type": "OfferCatalog",
          name: `Muebles de ${c.name.toLowerCase()} a medida`,
          url: abs(`/productos/${c.slug}`),
        })),
      },
      sameAs: [SITE.social.instagram.url, SITE.social.tiktok.url, SITE.social.facebook.url],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      name: SITE.name,
      url: SITE.url,
      inLanguage: "es-AR",
      publisher: { "@id": BUSINESS_ID },
    },
  ],
};

const HOME: RouteMeta = {
  path: "/",
  title: HOME_TITLE,
  description:
    "Carpintería en Pablo Podestá, Tres de Febrero (Buenos Aires): muebles a medida para cocina, dormitorio, baño, living, infantil y home office. Reparaciones y envíos a Caseros, El Palomar, Ciudadela y alrededores. Cotizá por WhatsApp.",
  jsonLd: [],
};

const STATIC_ROUTES: RouteMeta[] = [
  HOME,
  {
    path: "/productos",
    title: "Muebles a medida en Tres de Febrero — Vidriera virtual | Carpintería Zeuz",
    description:
      "Vidriera virtual de Carpintería Zeuz, carpintería en Pablo Podestá (Tres de Febrero): racks de TV, placares, vestidores, alacenas, bajo mesadas, vanitorys, escritorios y muebles infantiles a medida.",
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
    title: `Muebles de ${c.name.toLowerCase()} a medida en Tres de Febrero | Carpintería Zeuz`,
    description: `Muebles de ${c.name.toLowerCase()} a medida. ${LOCAL}: ${c.products
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
    title: `Acerca de — ${LOCAL} | Carpintería Zeuz`,
    description: `Carpintería Zeuz es una carpintería de muebles a medida en ${ZONE_LABEL}. Diseñamos y fabricamos cada mueble según tu espacio, con envíos a todo ${partido}.`,
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
    title: `Contacto — ${LOCAL} | Carpintería Zeuz`,
    description: `${LOCAL}. Escribinos por WhatsApp al ${SITE.phoneDisplay} o a ${SITE.email}. Hacemos envíos a todo ${partido} y alrededores.`,
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
    description: `Preguntas frecuentes de Carpintería Zeuz, carpintería en ${localityName}, ${partido}: muebles a medida, cotizaciones, reparaciones y envíos.`,
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
