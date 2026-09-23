// Genera todos los assets de marca a partir del logo original
// (branding/logo-zeuz.png, PNG con fondo transparente):
//
//   public/brand/logo-zeuz.webp     logo para la web (navbar, footer)
//   public/brand/logo-512.png       logo cuadrado para Google (schema.org "logo")
//   public/favicon-32.png           favicon de la pestaña
//   public/apple-touch-icon.png     ícono al agregar a inicio en iPhone (fondo oscuro)
//   public/icon-192.png, icon-512.png  íconos del manifest (Android)
//   public/og-image.jpg             vista previa al compartir en WhatsApp / redes (logo, 1200×1200)
//
// Uso: pnpm brand  (correr de nuevo si cambia el logo o el texto de la vista previa)

import { mkdir } from "node:fs/promises";
import sharp from "sharp";

const SRC = "branding/logo-zeuz.png";
const INK = { r: 26, g: 19, b: 14, alpha: 1 }; // #1A130E

await mkdir("public/brand", { recursive: true });

// Logo sin márgenes transparentes: el círculo ocupa todo el cuadro.
const logo = await sharp(SRC).trim().toBuffer();

const square = (size) => sharp(logo).resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } });

/** Logo centrado sobre fondo oscuro, con aire alrededor (íconos de app). */
const onInk = async (size, padding) => {
  const inner = Math.round(size * (1 - padding * 2));
  const img = await square(inner).png().toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: INK } }).composite([
    { input: img, gravity: "center" },
  ]);
};

await square(256).webp({ quality: 88 }).toFile("public/brand/logo-zeuz.webp");
await square(512).png({ palette: true, quality: 90, compressionLevel: 9 }).toFile("public/brand/logo-512.png");
await square(32).png().toFile("public/favicon-32.png");
await (await onInk(180, 0.06)).png({ palette: true, quality: 90 }).toFile("public/apple-touch-icon.png");
await (await onInk(192, 0.1)).png({ palette: true, quality: 90 }).toFile("public/icon-192.png");
await (await onInk(512, 0.1)).png({ palette: true, quality: 90 }).toFile("public/icon-512.png");

// ─── Vista previa para compartir (Open Graph) ──────────────────────────────
// La imagen del logo, cuadrada: WhatsApp muestra la vista previa como un
// cuadrado, así el logo se ve completo (sobre fondo oscuro, porque JPG no
// tiene transparencia).
await (await onInk(1200, 0.08)).jpeg({ quality: 88, mozjpeg: true }).toFile("public/og-image.jpg");

console.log("Assets de marca generados en public/ y public/brand/");
