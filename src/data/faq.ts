import { SITE, ZONE_LABEL } from "@/config/site";

const { locality, partido, nearby, neighbors } = SITE.zone;

/**
 * Preguntas frecuentes: las usa la página y el schema FAQPage (SEO / buscadores
 * con IA). Las locales están redactadas como las busca la gente.
 */
export const FAQ = [
  {
    question: `¿Dónde hay una carpintería de muebles a medida en ${partido}?`,
    answer: `Carpintería Zeuz es una carpintería de muebles a medida en ${ZONE_LABEL}. Diseñamos y fabricamos muebles para living, dormitorio, cocina, baño, cuartos infantiles y home office, y hacemos envíos a todo ${partido}.`,
  },
  {
    question: "¿Qué muebles hace Carpintería Zeuz?",
    answer:
      "Hacemos muebles a medida para living, dormitorio, cocina, baño, cuartos infantiles y home office: racks de TV, placares, vestidores, mesas de luz flotantes, alacenas, bajo mesadas, vanitorys, escritorios y más. También hacemos reparaciones.",
  },
  {
    question: `¿Hacen envíos a ${nearby.slice(0, 3).join(", ")} u otras localidades?`,
    answer: `Sí. Estamos en ${locality} y hacemos envíos a todo ${partido} (${nearby.join(", ")}) y a partidos vecinos como ${neighbors.join(" y ")}. Consultanos por tu zona.`,
  },
  {
    question: "¿Puedo pedir un mueble que no esté en la vidriera?",
    answer:
      "Sí. La vidriera virtual es una muestra de lo que hacemos. Si tenés una idea o una foto de referencia, la adaptamos a tu espacio.",
  },
  {
    question: `¿Hacen reparaciones de muebles en ${locality} y ${partido}?`,
    answer:
      "Sí, reparamos muebles de madera: puertas, bisagras, cajones, correderas y estructuras. Mandanos fotos por WhatsApp y te decimos cómo lo resolvemos.",
  },
  {
    question: "¿Cómo pido una cotización?",
    answer: `Escribinos por WhatsApp al ${SITE.phoneDisplay} contándonos qué necesitás. Si tenés medidas aproximadas o fotos del espacio, nos ayuda a cotizar más rápido.`,
  },
];
