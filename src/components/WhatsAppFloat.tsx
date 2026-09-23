import { whatsappUrl } from "@/config/site";
import { WhatsAppIcon } from "./icons";

/** Globo flotante de WhatsApp — visible en todas las páginas. */
export function WhatsAppFloat({ message }: { message?: string }) {
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-2 sm:bottom-6 sm:right-6"
    >
      <span className="pointer-events-none hidden rounded-full bg-white px-3.5 py-2 text-sm font-medium text-foreground shadow-lg ring-1 ring-black/5 transition-opacity sm:block sm:opacity-0 sm:group-hover:opacity-100">
        ¿Consultas? Escribinos
      </span>
      <span className="animate-wa-pulse flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-xl shadow-black/25 transition-transform group-hover:scale-105">
        <WhatsAppIcon className="h-7 w-7" />
      </span>
    </a>
  );
}
