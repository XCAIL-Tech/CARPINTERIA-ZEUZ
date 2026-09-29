// Optimiza las fotos de la vidriera.
//
// Uso:
//   1. Copiar las fotos originales (jpg/png/webp, cualquier tamaño) en
//      fotos-originales/<categoria>/   (living, dormitorio, cocina, bano,
//      infantil, home-office). Esa carpeta está en .gitignore.
//   2. Empezar el nombre con el número del producto de src/data/productos.ts:
//      "1-vanitory_flotante.jpg" → producto "01", "5-columna.webp" → "05".
//      Si falta un número (ej: no hay foto del 6), ese producto sigue con relleno.
//      Varias fotos con el mismo número = carrusel en ese producto, en orden
//      alfabético ("5-placar_nena.jpg", "5-placar_nene.jpg").
//   3. pnpm fotos
//
// Resultado: src/assets/productos/<categoria>/01.webp, 02.webp… y, si hay
// carrusel, 05.webp, 05-2.webp, 05-3.webp… (máx. 1600px de ancho, WebP calidad
// 80). Solo se tocan las categorías que tengan originales; en ellas se
// regeneran todas las fotos.
//
// Además: src/assets/og/<categoria>.jpg (1200×630, a partir de la primera foto con buena
// resolución, desde 1000px) — la vista previa al compartir el link de esa
// categoría por WhatsApp / redes (WhatsApp no muestra bien las vistas previas en WebP).

import { mkdir, readdir, rm } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = "fotos-originales";
const OUT = "src/assets/productos";
const OG = "src/assets/og";
const EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".heic"]);
const MIN_OG_WIDTH = 1000;

const categories = await readdir(SRC, { withFileTypes: true }).catch(() => {
  console.error(`No existe la carpeta "${SRC}/". Creala con una subcarpeta por categoría.`);
  process.exit(1);
});

for (const dir of categories.filter((d) => d.isDirectory())) {
  const files = (await readdir(path.join(SRC, dir.name))).filter((f) => EXT.has(path.extname(f).toLowerCase()));
  if (files.length === 0) continue;

  // Número de producto = número al principio del nombre ("5-columna.webp" → "05").
  const photos = [];
  for (const file of files) {
    const match = file.match(/^(\d+)/);
    if (!match) {
      console.error(`✗ ${dir.name}/${file}: el nombre tiene que empezar con el número de producto (ej: "1-${file}")`);
      process.exitCode = 1;
      continue;
    }
    photos.push({ id: match[1].padStart(2, "0"), file });
  }
  if (process.exitCode) continue;
  photos.sort((a, b) => a.id.localeCompare(b.id) || a.file.localeCompare(b.file, "es", { numeric: true }));
  // Nombre de salida: la 1ª foto de cada producto es "05", las siguientes "05-2", "05-3"…
  const seen = {};
  for (const p of photos) {
    seen[p.id] = (seen[p.id] ?? 0) + 1;
    p.name = seen[p.id] === 1 ? p.id : `${p.id}-${seen[p.id]}`;
  }

  const outDir = path.join(OUT, dir.name);
  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });

  for (const { name, file } of photos) {
    const info = await sharp(path.join(SRC, dir.name, file))
      .rotate() // respeta la orientación EXIF de fotos de celular
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(path.join(outDir, `${name}.webp`));
    console.log(`${dir.name}/${name}.webp  ←  ${file}  (${info.width}×${info.height}, ${Math.round(info.size / 1024)} KB)`);
  }

  // Vista previa para compartir: la primera foto (en orden de producto; la 01 es
  // la portada) que dé para 1200×630 sin verse borrosa. Si ninguna alcanza, se
  // comparte el logo.
  const ogFile = path.join(OG, `${dir.name}.jpg`);
  await rm(ogFile, { force: true });
  const sized = await Promise.all(
    photos.map(async (p) => ({ ...p, width: (await sharp(path.join(SRC, dir.name, p.file)).metadata()).width ?? 0 })),
  );
  const best = sized.find((p) => p.width >= MIN_OG_WIDTH);
  if (best) {
    await mkdir(OG, { recursive: true });
    await sharp(path.join(SRC, dir.name, best.file))
      .rotate()
      .resize(1200, 630, { fit: "cover", position: "attention" })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(ogFile);
    console.log(`og/${dir.name}.jpg  ←  ${best.file}`);
  } else {
    console.log(`og/${dir.name}: ninguna foto llega a ${MIN_OG_WIDTH}px de ancho → se comparte el logo`);
  }
}
