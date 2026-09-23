import { useEffect, useRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export type LightboxItem = { src: string; title: string };

/**
 * Visor de fotos a pantalla completa. Teclado (← → Esc), swipe en mobile y
 * foco atrapado (Radix Dialog).
 */
export function Lightbox({
  items,
  index,
  onIndexChange,
  onClose,
}: {
  items: LightboxItem[];
  index: number | null;
  onIndexChange: (i: number) => void;
  onClose: () => void;
}) {
  const touchX = useRef<number | null>(null);
  const total = items.length;
  const current = index !== null ? items[index] : undefined;

  const go = (delta: number) => {
    if (index === null) return;
    onIndexChange((index + delta + total) % total);
  };

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <Dialog.Root open={current !== undefined} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-[#0d0906]/95 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content
          className="fixed inset-0 z-[61] flex flex-col outline-none"
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <div className="flex items-center justify-between gap-4 px-4 py-3 text-white sm:px-6">
            <Dialog.Title className="truncate font-display text-lg">{current?.title}</Dialog.Title>
            <div className="flex shrink-0 items-center gap-4">
              <span className="text-sm tabular-nums text-white/60">
                {index !== null ? index + 1 : 0} / {total}
              </span>
              <Dialog.Close
                aria-label="Cerrar"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </Dialog.Close>
            </div>
          </div>
          <Dialog.Description className="sr-only">Foto ampliada del producto</Dialog.Description>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 pb-6 sm:px-16">
            {current && (
              <img
                key={current.src}
                src={current.src}
                alt={current.title}
                className="max-h-full max-w-full rounded-md object-contain shadow-2xl animate-in fade-in-0 zoom-in-95"
              />
            )}

            {total > 1 && (
              <>
                <button
                  onClick={() => go(-1)}
                  aria-label="Foto anterior"
                  className="absolute left-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:flex"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={() => go(1)}
                  aria-label="Foto siguiente"
                  className="absolute right-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:flex"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
