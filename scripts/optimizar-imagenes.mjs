// Optimiza las fotos de la vidriera.
//
// Uso:
//   1. Copiar las fotos originales (jpg/png/webp, cualquier tamaño) en
//      fotos-originales/<categoria>/   (living, dormitorio, cocina, bano,
//      infantil, home-office). Esa carpeta está en .gitignore.
//   2. Nombrarlas 1.jpg, 2.jpg… en el orden de los productos de
//      src/data/productos.ts (la 1 = producto "01", y es la portada).
//   3. pnpm fotos
//
// Resultado: src/assets/productos/<categoria>/01.webp, 02.webp… (máx. 1600px
// de ancho, WebP calidad 78). Solo se tocan las categorías que tengan
// originales; en ellas se regeneran todas las fotos.

import { mkdir, readdir, rm } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = "fotos-originales";
const OUT = "src/assets/productos";
const EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".heic"]);

const categories = await readdir(SRC, { withFileTypes: true }).catch(() => {
  console.error(`No existe la carpeta "${SRC}/". Creala con una subcarpeta por categoría.`);
  process.exit(1);
});

for (const dir of categories.filter((d) => d.isDirectory())) {
  const files = (await readdir(path.join(SRC, dir.name)))
    .filter((f) => EXT.has(path.extname(f).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, "es", { numeric: true }));
  if (files.length === 0) continue;

  const outDir = path.join(OUT, dir.name);
  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });

  for (const [i, file] of files.entries()) {
    const name = `${String(i + 1).padStart(2, "0")}.webp`;
    const info = await sharp(path.join(SRC, dir.name, file))
      .rotate() // respeta la orientación EXIF de fotos de celular
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(path.join(outDir, name));
    console.log(`${dir.name}/${name}  ←  ${file}  (${Math.round(info.size / 1024)} KB)`);
  }
}
