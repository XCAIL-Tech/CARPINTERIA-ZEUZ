# Carpintería Zeuz — sitio web

Vidriera virtual de muebles a medida. Sin precios ni formulario: todos los CTA
llevan a WhatsApp con un mensaje precargado según el producto.

**Stack:** Vite 5 · React 18 · TypeScript · Tailwind 3 · react-router 7. Deploy en Vercel.

## Desarrollo

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # tsc + vite build + prerender de cada ruta → dist/
pnpm lint
```

## Cargar fotos de la vidriera

Categorías: `living` · `dormitorio` · `cocina` · `bano` · `infantil` · `home-office`
(6 productos cada una, definidos en `src/data/productos.ts`).

1. Copiar las fotos en `fotos-originales/<categoría>/` con el **número de producto
   al principio del nombre**: `1-vanitory_flotante.jpg` → producto `01`,
   `5-columna.webp` → producto `05`. Si falta un número, ese producto sigue con
   relleno. Esa carpeta no se sube al repo.
2. `pnpm fotos` → genera `src/assets/productos/<categoría>/01.webp …` optimizadas
   (máx. 1600px, WebP) y la vista previa para WhatsApp de la categoría (si alguna
   foto tiene al menos 1000px de ancho).
3. Editar título y descripción del producto en `src/data/productos.ts`.

Un producto sin foto muestra un relleno de madera con el ícono de la categoría.

> **Fotos:** usar trabajos propios o bancos con licencia comercial libre
> (Unsplash, Pexels). No usar fotos bajadas de Google: tienen derechos de autor.

## Editar datos

- Teléfono, mail, zona, redes: `src/config/site.ts`
- Categorías y productos (títulos, descripciones): `src/data/productos.ts`
  - Al sumar una categoría: agregar su ícono en `src/components/products/categoryIcons.ts`
    (rutas, sitemap y SEO se generan solos).
- SEO por página (título, descripción, vista previa, datos estructurados): `src/seo/meta.ts`.
- Preguntas frecuentes: `src/data/faq.ts`.

## Logo y vista previa para WhatsApp

- Logo original: `branding/logo-zeuz.png` (PNG con fondo transparente).
- `pnpm brand` genera desde ahí el logo web, favicon, íconos de celular y
  `public/og-image.jpg` (la tarjeta 1200×630 que se ve al compartir el link).
- Al cargar fotos (`pnpm fotos`) se genera además la vista previa de cada
  categoría: compartir `/productos/cocina` muestra la foto 1 de Cocina.

## SEO / GEO

`pnpm build` prerenderiza cada ruta (`scripts/prerender.mjs`): el HTML ya trae
el contenido y su `<head>` propio, así WhatsApp, Facebook, Google y los
buscadores con IA lo leen sin ejecutar JavaScript. También genera
`sitemap.xml`, `llms.txt` y `404.html`.

Para compartir un link y ver la vista previa nueva en WhatsApp después de un
cambio, puede tardar: WhatsApp cachea las vistas previas por URL.

## Deploy

Vercel importa el repo y deploya en cada push a `main` (preset Vite, sin
variables de entorno). Si cambia el dominio, reemplazar `carpinteriazeuz.vercel.app`
en `index.html`, `src/config/site.ts` y `public/robots.txt` (el sitemap se genera solo).
