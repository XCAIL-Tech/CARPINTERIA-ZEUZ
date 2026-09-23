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
pnpm fotos   # fotos-originales/<cat>/N.jpg → src/assets/productos/<cat>/0N.webp
pnpm og      # regenera public/og-image.jpg
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
- `usePageMeta(title, description)` en cada página.

## Convenciones

- TS strict, `@/` → `src/`, `err: unknown` en catch.
- **Tema:** claro cálido único. Tokens en `src/App.css` (crema / carbón / roble
  `--primary` / nogal `--secondary` / miel `--accent`). Franjas oscuras = `bg-hero` + `.on-dark`.
- **Madera como acento, no como fondo:** `WoodTexture` (filtro SVG) solo en franjas oscuras y placeholders.
- **Tipografía:** Fraunces (títulos, `font-display`) + Outfit (texto).
- Verde WhatsApp (`bg-whatsapp`) solo en el globo y CTAs principales de WhatsApp.
- Assets con hash (default de Vite): no volver a `assets/[name].[ext]`, las fotos se llaman igual en cada carpeta.
