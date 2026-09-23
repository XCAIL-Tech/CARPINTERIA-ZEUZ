// Prerender (SSG) — corre después de `vite build` y `vite build --ssr`.
//
// Para cada ruta de src/seo/meta.ts escribe dist/<ruta>/index.html con:
//   · el HTML real de la página (renderizado con React en el servidor)
//   · <title>, description, canonical, Open Graph y JSON-LD propios de la ruta
// Así WhatsApp / Facebook muestran la vista previa correcta de cada link, y
// Google y los buscadores con IA (que no ejecutan JS) leen el contenido.
//
// También genera dist/404.html, dist/sitemap.xml y dist/llms.txt.

import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const DIST = "dist";
const SSR_ENTRY = path.resolve("dist-ssr/entry-server.js");

const { render, ROUTES, NOT_FOUND_META, DEFAULTS, CATEGORIES, FAQ, SITE, ZONE_LABEL } = await import(
  pathToFileURL(SSR_ENTRY).href
);

const template = await readFile(path.join(DIST, "index.html"), "utf-8");

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// JSON dentro de <script>: evitar que un "</script>" en un texto cierre el tag.
const jsonLd = (obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, "\\u003c")}</script>`;

const urlFor = (p) => `${DEFAULTS.url}${p === "/" ? "/" : p}`;

function headFor(meta, { indexable = true } = {}) {
  const url = urlFor(meta.path);
  // Imagen propia de la ruta (portada de la categoría) o la vista previa general 1200×630.
  const image = meta.image ?? DEFAULTS.image;
  const alt = meta.imageAlt ?? DEFAULTS.imageAlt;
  return [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    indexable ? `<link rel="canonical" href="${url}" />` : `<meta name="robots" content="noindex" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:secure_url" content="${image}" />`,
    // Todas las vistas previas son JPG 1200×630 (scripts/brand.mjs y scripts/optimizar-imagenes.mjs).
    `<meta property="og:image:type" content="image/jpeg" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(alt)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    ...meta.jsonLd.map(jsonLd),
  ].join("\n  ");
}

function page(meta, url, opts) {
  const html = template
    .replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, headFor(meta, opts))
    .replace("<!--app-html-->", render(url));
  if (html.includes("<!--app-html-->") || !html.includes(`<title>${esc(meta.title)}</title>`)) {
    throw new Error(`Prerender falló para ${url}: el template no tiene los marcadores esperados`);
  }
  return html;
}

// ─── Rutas ───────────────────────────────────────────────────────────────────
for (const meta of ROUTES) {
  const file = meta.path === "/" ? path.join(DIST, "index.html") : path.join(DIST, meta.path, "index.html");
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, page(meta, meta.path));
  console.log(`  ✓ ${meta.path}`);
}

// 404 real (Vercel lo sirve con status 404 para cualquier ruta inexistente)
await writeFile(path.join(DIST, "404.html"), page(NOT_FOUND_META, "/404", { indexable: false }));
console.log("  ✓ 404.html");

// ─── sitemap.xml ─────────────────────────────────────────────────────────────
const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map(
  (r) =>
    `  <url><loc>${urlFor(r.path)}</loc><lastmod>${today}</lastmod><priority>${
      r.path === "/" ? "1.0" : r.path.startsWith("/productos") ? "0.9" : "0.6"
    }</priority></url>`,
).join("\n")}
</urlset>
`;
await writeFile(path.join(DIST, "sitemap.xml"), sitemap);
console.log("  ✓ sitemap.xml");

// ─── llms.txt (GEO: resumen para buscadores / asistentes con IA) ─────────────
const llms = `# ${SITE.name}

> Carpintería de muebles a medida en ${ZONE_LABEL} (Argentina). Diseña y fabrica muebles para living, dormitorio, cocina, baño, cuartos infantiles y home office. También hace reparaciones de muebles y envíos. Los precios se cotizan a medida por WhatsApp.

## Contacto

- WhatsApp: +54 9 ${SITE.phoneDisplay} (https://wa.me/${SITE.whatsapp})
- Email: ${SITE.email}
- Zona: ${ZONE_LABEL}. Hace envíos.
- Instagram: ${SITE.social.instagram.url}
- TikTok: ${SITE.social.tiktok.url}
- Facebook: ${SITE.social.facebook.url}

## Productos (todos a medida)

${CATEGORIES.map(
  (c) =>
    `- [${c.name}](${urlFor(`/productos/${c.slug}`)}): ${c.description} Incluye: ${c.products.map((p) => p.title).join(", ")}.`,
).join("\n")}

## Páginas

- [Inicio](${urlFor("/")})
- [Vidriera virtual](${urlFor("/productos")})
- [Acerca de](${urlFor("/acerca-de")})
- [Contacto](${urlFor("/contacto")})
- [Preguntas frecuentes](${urlFor("/preguntas-frecuentes")})

## Preguntas frecuentes

${FAQ.map((f) => `### ${f.question}\n${f.answer}`).join("\n\n")}
`;
await writeFile(path.join(DIST, "llms.txt"), llms);
console.log("  ✓ llms.txt");

await rm("dist-ssr", { recursive: true, force: true });
