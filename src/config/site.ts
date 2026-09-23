/**
 * Datos del negocio. Única fuente de verdad para teléfono, mail, zona y redes:
 * si algo cambia, se cambia acá y se actualiza en todo el sitio.
 */
export const SITE = {
  name: "Carpintería Zeuz",
  tagline: "Muebles a medida",
  url: "https://carpinteriazeuz.vercel.app",

  // WhatsApp en formato internacional sin "+" ni espacios (54 9 11 …).
  whatsapp: "5491133301482",
  phoneDisplay: "11 3330-1482",
  email: "carpinteriazeuz@gmail.com",

  zone: {
    locality: "Pablo Podestá",
    partido: "Tres de Febrero",
    province: "Buenos Aires",
  },

  social: {
    instagram: { handle: "@carpinteriazeuz", url: "https://www.instagram.com/carpinteriazeuz" },
    tiktok: { handle: "@carpinteriazeuz", url: "https://www.tiktok.com/@carpinteriazeuz" },
    facebook: { handle: "carpinteriazeuz", url: "https://www.facebook.com/carpinteriazeuz" },
  },
} as const;

export const ZONE_LABEL = `${SITE.zone.locality}, ${SITE.zone.partido}, ${SITE.zone.province}`;

const DEFAULT_MESSAGE = "Hola Carpintería Zeuz, quería hacer una consulta.";

/** Link a WhatsApp con mensaje precargado. */
export function whatsappUrl(message: string = DEFAULT_MESSAGE): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Mensaje de cotización para un producto de la vidriera. */
export function quoteMessage(product: string, category?: string): string {
  const where = category ? ` (${category})` : "";
  return `Hola Carpintería Zeuz, vi en la web el producto "${product}"${where} y quiero pedir una cotización a medida.`;
}
