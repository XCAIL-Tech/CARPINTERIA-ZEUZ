import { Ruler } from "lucide-react";
import { WhatsAppButton } from "../WhatsAppButton";

/** Recordatorio de que todo es a medida + CTA de cotización. */
export function QuoteBanner({ message, title = "¿Te gusta alguno? Lo hacemos a tu medida." }: { message?: string; title?: string }) {
  return (
    <div className="panel flex flex-col items-start gap-5 p-7 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
          <Ruler className="h-6 w-6" strokeWidth={1.7} />
        </span>
        <div>
          <h2 className="font-display text-xl font-semibold">{title}</h2>
          <p className="mt-1 text-[15px] text-muted-foreground">
            Los precios dependen de medidas, materiales y terminaciones. Pedinos tu cotización sin compromiso.
          </p>
        </div>
      </div>
      <WhatsAppButton message={message} className="w-full shrink-0 sm:w-auto">
        Pedir cotización
      </WhatsAppButton>
    </div>
  );
}
