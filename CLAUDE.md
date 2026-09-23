# CLAUDE.md — Carpintería Zeuz

## Qué es

Catálogo web de **Carpintería Zeuz** (con Z), carpintería de muebles a medida en
Pablo Podestá, Tres de Febrero (Buenos Aires). Objetivo: mostrar productos por
categoría ("vidriera virtual") con imagen profesional y derivar toda consulta a WhatsApp.

## Reglas de negocio

- **Sin precios** en el sitio: todo es a medida, el precio se habla por WhatsApp.
- **Sin formulario:** todo CTA usa `WhatsAppButton` / `whatsappUrl()` (`src/config/site.ts`)
  con mensaje precargado (`quoteMessage()` por producto).
- No afirmar servicios no confirmados (instalación, medición a domicilio,
  garantías, plazos, materiales específicos). Confirmados: fabricación a
  medida, reparaciones, presupuestos según demanda, envíos.
- Fotos: solo trabajos propios o licencia comercial libre (Unsplash/Pexels). Nunca fotos de Google.

## Comandos

```bash
pnpm dev | build | lint | preview
pnpm fotos   # fotos-originales/<cat>/N-nombre.ext → src/assets/productos/<cat>/0N.webp
pnpm brand   # branding/logo-zeuz.png → logo web, favicon, íconos, public/og-image.jpg
```

## Arquitectura

- `src/config/site.ts` — datos del negocio (teléfono, mail, zona, redes) + helpers de WhatsApp.
- `src/data/productos.ts` — Categoría → Productos (id "01".."06", título, descripción).
  Foto de cada producto = `src/assets/productos/<categoria>/<id>.webp`, asociada
  sola con `import.meta.glob`. Sin foto → relleno con ícono (`categoryIcons.ts`).
- Navbar: Inicio · Productos (desplegable: Ver todo + categorías) · Acerca de · Contacto.
- Rutas: `/` · `/productos` (vidriera virtual, ver todo) · `/productos/:categoria` ·
  `/acerca-de` · `/contacto` · `/preguntas-frecuentes` · `*` (404). Todas usan `Layout`
  (Navbar + Footer + globo WhatsApp + volver arriba).
- Cada tarjeta de producto: foto (ampliable) + título + descripción + botón WhatsApp
  con `quoteMessage(producto, categoría)`.
- **SEO / prerender:** `src/seo/meta.ts` es la fuente única de title / description /
  og:image / JSON-LD por ruta. `pnpm build` = vite build + build SSR de
  `src/entry-server.tsx` + `scripts/prerender.mjs` → `dist/<ruta>/index.html` con HTML
  real + head propio, `404.html`, `sitemap.xml`, `llms.txt`. El cliente hidrata
  (`main.tsx`); `Layout` actualiza title/description al navegar.
- Rutas en `src/AppRoutes.tsx` (compartidas por BrowserRouter y StaticRouter). Nueva
  ruta → agregarla también en `src/seo/meta.ts`.
- `vercel.json` sin rewrite catch-all a propósito: cada ruta tiene su HTML y lo
  inexistente devuelve 404 real. No verificar hidratación con `vite preview` (sirve
  siempre el index del home); usar `npx serve dist`.
- Vista previa para WhatsApp: siempre JPG 1200×630 (WhatsApp no muestra bien WebP).
  General: `public/og-image.jpg`; por categoría: `src/assets/og/<cat>.jpg` (lo genera `pnpm fotos`).
- Todo el render inicial debe ser determinístico (sin `window`/fechas variables fuera de
  efectos) para que la hidratación coincida.

## Convenciones

- TS strict, `@/` → `src/`, `err: unknown` en catch.
- **Tema:** claro cálido único. Tokens en `src/App.css` (crema / carbón / roble
  `--primary` / nogal `--secondary` / miel `--accent`). Franjas oscuras = `bg-hero` + `.on-dark`.
- **Madera como acento, no como fondo:** `WoodTexture` (filtro SVG) solo en franjas oscuras y placeholders.
- **Tipografía:** Fraunces (títulos, `font-display`) + Outfit (texto).
- Verde WhatsApp (`bg-whatsapp`) solo en el globo y CTAs principales de WhatsApp.
- Assets con hash (default de Vite): no volver a `assets/[name].[ext]`, las fotos se llaman igual en cada carpeta.
