import type { ReactNode } from "react";
import { whatsappUrl } from "@/config/site";
import { WhatsAppIcon } from "./icons";

type Variant = "primary" | "line" | "whatsapp";

const VARIANTS: Record<Variant, string> = {
  primary: "btn-primary",
  line: "btn-line",
  whatsapp: "bg-whatsapp text-[#0B2915] transition hover:brightness-105",
};

/** Todo CTA del sitio termina en WhatsApp: este es el único botón para eso. */
export function WhatsAppButton({
  message,
  children,
  variant = "primary",
  size = "md",
  className = "",
}: {
  message?: string;
  children: ReactNode;
  variant?: Variant;
  size?: "sm" | "md";
  className?: string;
}) {
  const sizing = size === "sm" ? "h-9 px-4 text-[13px]" : "px-6 py-3.5 text-sm";

  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-md font-semibold ${sizing} ${VARIANTS[variant]} ${className}`}
    >
      <WhatsAppIcon className={size === "sm" ? "h-4 w-4" : "h-[18px] w-[18px]"} />
      {children}
    </a>
  );
}
