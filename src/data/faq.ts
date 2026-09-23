import { SITE, ZONE_LABEL } from "@/config/site";

/** Preguntas frecuentes: las usa la página y el schema FAQPage (SEO / buscadores con IA). */
export const FAQ = [
  {
    question: "¿Qué muebles hace Carpintería Zeuz?",
    answer:
      "Hacemos muebles a medida para living, dormitorio, cocina, baño, cuartos infantiles y home office: racks de TV, placares, vestidores, mesas de luz flotantes, alacenas, bajo mesadas, vanitorys, escritorios y más. También hacemos reparaciones.",
  },
  {
    question: "¿Por qué no hay precios en la web?",
    answer:
      "Porque todos nuestros muebles son a medida: el precio depende de las medidas, los materiales y las terminaciones que elijas. Escribinos por WhatsApp y te pasamos una cotización sin compromiso.",
  },
  {
    question: "¿Puedo pedir un mueble que no esté en la vidriera?",
    answer:
      "Sí. La vidriera virtual es una muestra de lo que hacemos. Si tenés una idea o una foto de referencia, la adaptamos a tu espacio.",
  },
  {
    question: "¿Hacen reparaciones?",
    answer:
      "Sí, reparamos muebles de madera: puertas, bisagras, cajones, correderas y estructuras. Mandanos fotos por WhatsApp y te decimos cómo lo resolvemos.",
  },
  {
    question: "¿Dónde están y hasta dónde llegan?",
    answer: `Estamos en ${ZONE_LABEL}. Hacemos envíos: consultanos por tu zona.`,
  },
  {
    question: "¿Cómo pido una cotización?",
    answer: `Escribinos por WhatsApp al ${SITE.phoneDisplay} contándonos qué necesitás. Si tenés medidas aproximadas o fotos del espacio, nos ayuda a cotizar más rápido.`,
  },
];
