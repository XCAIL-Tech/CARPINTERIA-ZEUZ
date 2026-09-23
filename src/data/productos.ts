/**
 * Productos: Categoría → Productos.
 *
 * Cada producto tiene su foto en `src/assets/productos/<categoria>/<id>.webp`
 * (ej: living/01.webp es el primer producto de Living). La foto se asocia sola
 * por el id; mientras no exista se muestra un relleno con el ícono de la categoría.
 *
 * Para cambiar un producto: editar su `title` / `description` acá y reemplazar
 * su foto (ver `pnpm fotos` en el README).
 */

export type Product = {
  /** Número de foto: "01" → <categoria>/01.webp */
  id: string;
  title: string;
  description: string;
};

export type Category = {
  slug: string;
  name: string;
  description: string;
  products: Product[];
};

export const CATEGORIES: Category[] = [
  {
    slug: "living",
    name: "Living",
    description: "Racks de TV, mesas, bibliotecas y muebles para el corazón de tu casa.",
    products: [
      { id: "01", title: "Rack de TV flotante", description: "Suspendido, con cajones y pasacables ocultos." },
      { id: "02", title: "Mesa ratona", description: "Madera maciza o melamina, en la medida justa para tu living." },
      { id: "03", title: "Biblioteca", description: "Estantes a medida para libros, decoración y guardado." },
      { id: "04", title: "Aparador / vajillero", description: "Guardado con puertas y cajones para el comedor." },
      { id: "05", title: "Mesa de comedor", description: "Para 4, 6 u 8 personas, en el diseño que elijas." },
      { id: "06", title: "Estantería de pared", description: "Estantes flotantes y módulos para ordenar y decorar." },
    ],
  },
  {
    slug: "dormitorio",
    name: "Dormitorio",
    description: "Placares, vestidores y mesas de luz que aprovechan cada centímetro.",
    products: [
      { id: "01", title: "Placard a medida", description: "Puertas corredizas o batientes, interior a tu gusto." },
      { id: "02", title: "Vestidor", description: "Abierto o cerrado, con barrales, estantes y cajoneras." },
      { id: "03", title: "Mesa de luz flotante", description: "Suspendida, liviana a la vista y firme en la pared." },
      { id: "04", title: "Respaldo de cama", description: "Respaldos de madera, lisos o con estantes integrados." },
      { id: "05", title: "Cómoda / cajonera", description: "Cajones amplios con correderas de calidad." },
      { id: "06", title: "Cama con cajones", description: "Guardado extra debajo de la cama." },
    ],
  },
  {
    slug: "cocina",
    name: "Cocina",
    description: "Alacenas, bajo mesadas y despenseros diseñados para tu cocina real.",
    products: [
      { id: "01", title: "Alacena", description: "Puertas batientes, rebatibles o vidriadas." },
      { id: "02", title: "Bajo mesada", description: "Cajoneras, especieros y guardado optimizado." },
      { id: "03", title: "Despensero", description: "Columna de guardado para ordenar la mercadería." },
      { id: "04", title: "Isla de cocina", description: "Superficie de trabajo con guardado integrado." },
      { id: "05", title: "Barra desayunador", description: "Ideal para cocinas integradas o espacios chicos." },
      { id: "06", title: "Mueble para microondas / horno", description: "Columnas y módulos para electrodomésticos." },
    ],
  },
  {
    slug: "bano",
    name: "Baño",
    description: "Vanitorys y espejos resistentes a la humedad, con terminaciones prolijas.",
    products: [
      { id: "01", title: "Vanitory suspendido", description: "Flotante, con puerta y bacha. Ideal para baños chicos." },
      { id: "02", title: "Vanitory de pie", description: "Con puerta y cajones, a la medida de tu bacha." },
      { id: "03", title: "Espejo con repisa", description: "Espejo con marco y repisa inferior, en el tamaño que necesites." },
      { id: "04", title: "Botiquín con espejo y luces", description: "Guardado detrás del espejo, con estantes e iluminación." },
      { id: "05", title: "Columna de baño", description: "Estantes abiertos para toallas, canastos y productos." },
      { id: "06", title: "Estante de baño", description: "Estantes y repisas para aprovechar la pared." },
    ],
  },
  {
    slug: "infantil",
    name: "Infantil",
    description: "Muebles seguros y funcionales para que crezcan con los chicos.",
    products: [
      { id: "01", title: "Cama infantil", description: "Camas a medida, con o sin baranda." },
      { id: "02", title: "Cucheta", description: "Dos camas en el espacio de una, con escalera segura." },
      { id: "03", title: "Escritorio infantil", description: "Para estudiar y dibujar, a la altura justa." },
      { id: "04", title: "Juguetero / organizador", description: "Cajones y estantes para ordenar juguetes." },
      { id: "05", title: "Placard infantil", description: "Placares pensados para el cuarto de los chicos." },
      { id: "06", title: "Biblioteca infantil", description: "Estantes al alcance de los más chicos." },
    ],
  },
  {
    slug: "home-office",
    name: "Home Office",
    description: "Escritorios y guardado para trabajar cómodo en casa.",
    products: [
      { id: "01", title: "Escritorio a medida", description: "Adaptado a tu espacio, con pasacables y cajones." },
      { id: "02", title: "Escritorio flotante", description: "Suspendido en la pared, ideal para espacios chicos." },
      { id: "03", title: "Biblioteca de oficina", description: "Estantes y puertas para libros y carpetas." },
      { id: "04", title: "Cajonera", description: "Cajonera fija o con ruedas, bajo escritorio." },
      { id: "05", title: "Estantería de pared", description: "Módulos para tener todo a mano." },
      { id: "06", title: "Mueble archivo / impresora", description: "Guardado para documentos y equipos." },
    ],
  },
];

// ─── Fotos (asociación automática por id) ──────────────────────────────────

const imageModules = import.meta.glob<string>(
  "/src/assets/productos/*/*.{webp,jpg,jpeg,png,avif}",
  { eager: true, query: "?url", import: "default" },
);

const imagesByKey: Record<string, string> = {};
for (const path of Object.keys(imageModules)) {
  const parts = path.split("/");
  const category = parts[parts.length - 2];
  const id = parts[parts.length - 1].replace(/\.[^.]+$/, "");
  imagesByKey[`${category}/${id}`] = imageModules[path];
}

export function getProductImage(categorySlug: string, productId: string): string | undefined {
  return imagesByKey[`${categorySlug}/${productId}`];
}

/** Portada de categoría: la primera foto disponible entre sus productos. */
export function getCategoryCover(category: Category): string | undefined {
  for (const p of category.products) {
    const img = getProductImage(category.slug, p.id);
    if (img) return img;
  }
  return undefined;
}

const ogModules = import.meta.glob<string>("/src/assets/og/*.jpg", { eager: true, query: "?url", import: "default" });

/** Vista previa 1200×630 de la categoría para compartir (la genera `pnpm fotos`). */
export function getCategoryShareImage(categorySlug: string): string | undefined {
  return ogModules[`/src/assets/og/${categorySlug}.jpg`];
}

export function findCategory(slug: string | undefined): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
