"use client";

import { whatsappUrl } from "@/lib/data";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp ile Onur Kutluksaman’a yazın"
      className="group fixed right-4 bottom-[calc(5.75rem+env(safe-area-inset-bottom))] z-[45] flex items-center gap-3 lg:right-6 lg:bottom-24"
    >
      <span className="hidden rounded-full border border-gold/35 bg-canvas/90 px-3 py-2 text-[10px] tracking-[0.22em] text-gold uppercase shadow-[0_12px_40px_-20px_rgba(0,0,0,0.8)] backdrop-blur-md sm:block">
        WhatsApp
      </span>
      <span className="wa-float-orb grid h-14 w-14 place-items-center rounded-full border border-gold bg-gold text-canvas">
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden>
          <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.14 6.45 2.14 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.39a9.86 9.86 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7zM12.05 20.15h-.01a8.18 8.18 0 0 1-4.16-1.14l-.3-.18-3.15.82.84-3.07-.2-.32a8.18 8.18 0 0 1-1.26-4.35c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.22-8.24 8.22zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.8-.79.97-.15.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74 1.48.64 1.84.7 2.5.59.4-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.17-.48-.29z" />
        </svg>
      </span>
    </a>
  );
}
