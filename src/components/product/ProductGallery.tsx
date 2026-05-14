"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SafeImage } from "@/components/ui/SafeImage";
import { Crosshair, CornerBrackets, PlusMarker } from "@/components/ui/Decorations";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

export function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  // Если только одно изображение — дублируем для разнообразия
  const allImages = images.length > 1 ? images : [images[0], images[0], images[0]];

  const next = () => setActive((p) => (p + 1) % allImages.length);
  const prev = () => setActive((p) => (p - 1 + allImages.length) % allImages.length);

  return (
    <>
      <div className="space-y-3">
        {/* Main image */}
        <div className="relative aspect-[4/5] bg-vss-graphite overflow-hidden border border-vss-smoke group">
          <CornerBrackets className="text-vss-fog/40 z-10" />

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <SafeImage
                src={allImages[active]}
                alt={alt}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </AnimatePresence>

          {/* Glow */}
          <div className="absolute inset-0 bg-radial-glow opacity-30 pointer-events-none" />

          {/* Top: index + zoom */}
          <div className="absolute top-4 left-4 right-4 flex items-start justify-between z-10">
            <div className="bg-vss-void/70 backdrop-blur-md border border-vss-smoke px-2.5 py-1">
              <span className="text-[10px] font-mono tracking-widest text-vss-paper font-bold tabular-nums">
                {String(active + 1).padStart(2, "0")} / {String(allImages.length).padStart(2, "0")}
              </span>
            </div>

            <button
              onClick={() => setZoomed(true)}
              className="w-9 h-9 bg-vss-void/70 backdrop-blur-md border border-vss-smoke hover:border-vss-paper text-vss-bone hover:text-vss-paper flex items-center justify-center transition-all"
              aria-label="Zoom"
              title="Zoom"
            >
              <Maximize2 size={13} strokeWidth={1.5} />
            </button>
          </div>

          {/* Bottom-right: crosshair detail */}
          <div className="absolute bottom-4 right-4 z-10 hidden md:block">
            <div className="bg-vss-void/70 backdrop-blur-md border border-vss-smoke p-2 flex items-center gap-2">
              <Crosshair size={11} className="text-vss-paper" />
              <span className="text-[9px] font-mono tracking-widest text-vss-mist">DETAIL VIEW</span>
            </div>
          </div>

          {/* Side arrows */}
          {allImages.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-vss-void/70 backdrop-blur-md border border-vss-smoke hover:border-vss-paper text-vss-bone hover:text-vss-paper flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                aria-label="Previous"
              >
                <ChevronLeft size={16} strokeWidth={1.5} />
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-vss-void/70 backdrop-blur-md border border-vss-smoke hover:border-vss-paper text-vss-bone hover:text-vss-paper flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                aria-label="Next"
              >
                <ChevronRight size={16} strokeWidth={1.5} />
              </button>
            </>
          )}
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-4 gap-3">
          {allImages.slice(0, 4).map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={cn(
                "relative aspect-square bg-vss-graphite overflow-hidden border transition-all",
                i === active
                  ? "border-vss-paper"
                  : "border-vss-smoke hover:border-vss-fog opacity-60 hover:opacity-100"
              )}
            >
              <SafeImage src={img} alt="" fill className="object-cover" sizes="120px" />
              {i === active && (
                <div className="absolute inset-0 border-2 border-vss-paper pointer-events-none" />
              )}
              <div className="absolute top-1 left-1 text-[8px] font-mono tracking-widest text-vss-paper font-bold bg-vss-void/70 px-1">
                0{i + 1}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Zoom modal */}
      <AnimatePresence>
        {zoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomed(false)}
            className="fixed inset-0 z-[100] bg-vss-void/95 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full h-full max-w-5xl max-h-[90vh]"
            >
              <SafeImage
                src={allImages[active]}
                alt={alt}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </motion.div>
            <button
              className="absolute top-6 right-6 w-10 h-10 bg-vss-graphite border border-vss-smoke text-vss-paper flex items-center justify-center"
              aria-label="Close"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}