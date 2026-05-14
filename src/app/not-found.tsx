"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Asterisk, CornerBrackets, RotatingStamp, PlusMarker, Crosshair } from "@/components/ui/Decorations";

export default function NotFound() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="min-h-[80vh] flex items-center justify-center bg-vss-void relative overflow-hidden">
        {/* BG */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute inset-0 bg-radial-glow opacity-30" />

        {/* Decorations */}
        <div className="absolute top-20 left-10 w-20 h-20 text-vss-fog/40 hidden lg:block">
          <RotatingStamp text="ERROR · 404 · NOT FOUND · " />
        </div>
        <div className="absolute bottom-20 right-10 w-20 h-20 text-vss-fog/40 hidden lg:block">
          <RotatingStamp text="VSS · ARCHIVE · LOST · " />
        </div>

        <div className="absolute top-1/2 left-2 -translate-y-1/2 text-[10px] font-mono tracking-widest text-vss-fog/50 rotate-90 origin-center hidden xl:block whitespace-nowrap">
          ERROR · 404 · PAGE NOT FOUND
        </div>
        <div className="absolute top-1/2 right-2 -translate-y-1/2 text-[10px] font-mono tracking-widest text-vss-fog/50 -rotate-90 origin-center hidden xl:block whitespace-nowrap">
          NOTHING LASTS · NOT EVEN URLS
        </div>

        <div className="container-vss relative z-10 text-center max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-center gap-3 mb-8">
              <span className="h-px w-10 bg-vss-paper" />
              <Asterisk className="w-3 h-3 text-vss-paper" />
              <span className="text-[10px] tracking-[0.4em] text-vss-paper font-mono font-bold uppercase">
                ERROR · 404 · NULL
              </span>
              <Asterisk className="w-3 h-3 text-vss-paper" />
              <span className="h-px w-10 bg-vss-paper" />
            </div>

            <div className="relative inline-block">
              <h1 className="text-display text-[28vw] md:text-[18vw] leading-[0.85] font-bold tracking-tightest text-vss-paper glow-text-strong">
                404
              </h1>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                transition={{ duration: 2, delay: 0.5 }}
                className="absolute inset-0 text-display text-[28vw] md:text-[18vw] leading-[0.85] font-bold tracking-tightest text-stroke-thick pointer-events-none"
                style={{ transform: "translate(8px, 8px)" }}
              >
                404
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="mt-8 mb-10 max-w-md mx-auto"
            >
              <p className="text-lg md:text-xl text-vss-paper font-bold leading-snug glow-text">
                Сторінку не знайдено.
              </p>
              <p className="text-sm md:text-base text-vss-mist mt-2 leading-relaxed">
                Можливо, її забрали з архіву. Або такої адреси ніколи не було.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <Link href="/">
                <Button variant="primary" size="lg" arrow>
                  <ArrowLeft size={14} strokeWidth={2} className="mr-1" />
                  НА ГОЛОВНУ
                </Button>
              </Link>
              <Link href="/catalog">
                <Button variant="outline" size="lg" arrow>
                  КАТАЛОГ
                </Button>
              </Link>
            </motion.div>

            {/* Bottom info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="mt-14 flex flex-wrap items-center justify-center gap-6 text-[10px] font-mono tracking-widest text-vss-fog uppercase"
            >
              <div className="flex items-center gap-1.5">
                <Crosshair size={11} className="text-vss-paper" />
                <span>STATUS: 404</span>
              </div>
              <div className="flex items-center gap-1.5">
                <PlusMarker className="w-2 h-2" />
                <span>VSS · 2026 · KH</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}