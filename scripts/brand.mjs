// Genera todos los assets de marca a partir del logo original
// (branding/logo-zeuz.png, PNG con fondo transparente):
//
//   public/brand/logo-zeuz.webp     logo para la web (navbar, footer)
//   public/brand/logo-512.png       logo cuadrado para Google (schema.org "logo")
//   public/favicon-32.png           favicon de la pestaña
//   public/apple-touch-icon.png     ícono al agregar a inicio en iPhone (fondo oscuro)
//   public/icon-192.png, icon-512.png  íconos del manifest (Android)
//   public/og-image.jpg             vista previa al compartir en WhatsApp / redes (1200×630)
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
const W = 1200;
const H = 630;
const LOGO = 440;

const text = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#2A1D14"/><stop offset="1" stop-color="#120D09"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.27" cy="0.5" r="0.45">
      <stop offset="0" stop-color="#D69A55" stop-opacity="0.28"/><stop offset="1" stop-color="#D69A55" stop-opacity="0"/>
    </radialGradient>
    <filter id="wood">
      <feTurbulence type="fractalNoise" baseFrequency="0.0035 0.11" numOctaves="4" seed="7"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0.84  0 0 0 0 0.60  0 0 0 0 0.33  1.6 0 0 0 -0.55"/>
    </filter>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" filter="url(#wood)" opacity="0.16"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  <g font-family="Georgia, 'Times New Roman', serif">
    <text x="600" y="190" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="700" letter-spacing="7" fill="#D69A55">CARPINTERÍA ZEUZ</text>
    <text x="600" y="268" font-size="64" font-weight="600" fill="#FFFFFF">Muebles hechos</text>
    <text x="600" y="342" font-size="64" font-style="italic" fill="#D69A55">a tu medida</text>
  </g>
  <g font-family="Arial, Helvetica, sans-serif" fill="#FFFFFF">
    <text x="602" y="400" font-size="24" fill-opacity="0.72">Living · Dormitorio · Cocina · Baño</text>
    <text x="602" y="432" font-size="24" fill-opacity="0.72">Infantil · Home Office · Reparaciones</text>
    <rect x="600" y="470" width="300" height="52" rx="26" fill="#25D366"/>
    <text x="750" y="504" font-size="22" font-weight="700" fill="#0B2915" text-anchor="middle">Pedí tu cotización</text>
    <text x="602" y="572" font-size="20" fill-opacity="0.55">Pablo Podestá, Tres de Febrero · Hacemos envíos</text>
  </g>
</svg>`;

const ogLogo = await square(LOGO).png().toBuffer();
// Sombra suave bajo el logo para despegarlo del fondo.
const shadow = await sharp({
  create: { width: LOGO + 80, height: LOGO + 80, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
})
  .composite([
    {
      input: Buffer.from(
        `<svg xmlns="http://www.w3.org/2000/svg" width="${LOGO + 80}" height="${LOGO + 80}"><circle cx="${(LOGO + 80) / 2}" cy="${(LOGO + 80) / 2 + 14}" r="${LOGO / 2}" fill="black" fill-opacity="0.55"/></svg>`,
      ),
    },
  ])
  .blur(18)
  .png()
  .toBuffer();

await sharp(Buffer.from(text))
  .composite([
    { input: shadow, left: 90 - 40, top: (H - LOGO) / 2 - 40 },
    { input: ogLogo, left: 90, top: (H - LOGO) / 2 },
  ])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile("public/og-image.jpg");

console.log("Assets de marca generados en public/ y public/brand/");
