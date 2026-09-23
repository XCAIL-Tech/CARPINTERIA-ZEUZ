// Genera public/og-image.jpg (1200×630): la vista previa al compartir el
// sitio en WhatsApp / Facebook. Correr con `node scripts/og-image.mjs`
// si cambia la marca o el texto.

import sharp from "sharp";

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#2A1D14"/><stop offset="1" stop-color="#120D09"/>
    </linearGradient>
    <linearGradient id="z" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#D69A55"/><stop offset="1" stop-color="#7A4A22"/>
    </linearGradient>
    <filter id="wood">
      <feTurbulence type="fractalNoise" baseFrequency="0.0035 0.11" numOctaves="4" seed="7"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0.84  0 0 0 0 0.60  0 0 0 0 0.33  1.6 0 0 0 -0.55"/>
    </filter>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" filter="url(#wood)" opacity="0.2"/>
  <rect x="90" y="150" width="120" height="120" rx="22" fill="url(#z)"/>
  <text x="150" y="243" text-anchor="middle" font-family="Georgia, serif" font-size="80" font-weight="700" fill="#1A130E">Z</text>
  <text x="240" y="228" font-family="Georgia, serif" font-size="92" font-weight="600" letter-spacing="8" fill="#FFFFFF">ZEUZ</text>
  <text x="244" y="268" font-family="Arial, sans-serif" font-size="22" font-weight="700" letter-spacing="10" fill="#D69A55">CARPINTERÍA</text>
  <text x="90" y="390" font-family="Georgia, serif" font-size="58" fill="#FFFFFF">Muebles hechos <tspan font-style="italic" fill="#D69A55">a medida</tspan></text>
  <text x="90" y="450" font-family="Arial, sans-serif" font-size="28" fill="#FFFFFF" fill-opacity="0.7">Living · Dormitorio · Cocina · Baño · Infantil · Home Office</text>
  <text x="90" y="550" font-family="Arial, sans-serif" font-size="24" fill="#FFFFFF" fill-opacity="0.55">Pablo Podestá, Tres de Febrero · Hacemos envíos · 11 3330-1482</text>
</svg>`;

await sharp(Buffer.from(svg)).jpeg({ quality: 86 }).toFile("public/og-image.jpg");
console.log("public/og-image.jpg generado");
