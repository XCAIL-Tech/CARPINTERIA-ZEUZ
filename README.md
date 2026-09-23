# Carpintería Zeuz — sitio web

Vidriera virtual de muebles a medida. Sin precios ni formulario: todos los CTA
llevan a WhatsApp con un mensaje precargado según el producto.

**Stack:** Vite 5 · React 18 · TypeScript · Tailwind 3 · react-router 7. Deploy en Vercel.

## Desarrollo

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # tsc + vite build → dist/
pnpm lint
```

## Cargar fotos de la vidriera

Categorías: `living` · `dormitorio` · `cocina` · `bano` · `infantil` · `home-office`
(6 productos cada una, definidos en `src/data/productos.ts`).

1. Copiar las fotos en `fotos-originales/<categoría>/` nombradas `1.jpg` … `6.jpg`
   (la 1 corresponde al producto `01`, y así). Esa carpeta no se sube al repo.
2. `pnpm fotos` → genera `src/assets/productos/<categoría>/01.webp …` optimizadas
   (1600px, WebP). Cada foto se asocia sola a su producto por el número.
3. Editar título y descripción del producto en `src/data/productos.ts`.

Un producto sin foto muestra un relleno de madera con el ícono de la categoría.

> **Fotos:** usar trabajos propios o bancos con licencia comercial libre
> (Unsplash, Pexels). No usar fotos bajadas de Google: tienen derechos de autor.

## Editar datos

- Teléfono, mail, zona, redes: `src/config/site.ts`
- Categorías y productos (títulos, descripciones): `src/data/productos.ts`
  - Al sumar una categoría: agregar su ícono en `src/components/products/categoryIcons.ts`
    y su URL en `public/sitemap.xml`.
- Imagen para compartir en redes: `pnpm og` regenera `public/og-image.jpg`.

## Deploy

Vercel importa el repo y deploya en cada push a `main` (preset Vite, sin
variables de entorno). Si cambia el dominio, reemplazar `carpinteriazeuz.vercel.app`
en `index.html`, `src/config/site.ts`, `public/robots.txt` y `public/sitemap.xml`.
