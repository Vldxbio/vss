"use client";

import { motion } from "framer-motion";

// Штрих-код
export function Barcode({ className = "" }: { className?: string }) {
  const bars = [3, 1, 2, 1, 3, 2, 1, 3, 1, 2, 3, 1, 2, 1, 3, 1, 2, 3, 1, 2, 1, 3, 2, 1, 3];
  return (
    <div className={`inline-flex flex-col items-start gap-0.5 ${className}`}>
      <div className="flex items-end gap-px h-8">
        {bars.map((w, i) => (
          <div
            key={i}
            className="bg-vss-paper"
            style={{ width: `${w}px`, height: "100%" }}
          />
        ))}
      </div>
      <span className="text-[8px] font-mono tracking-widest text-vss-paper">
        VSS · 0024 · NTH
      </span>
    </div>
  );
}

// Care symbols (символы ухода)
export function CareSymbols({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Wash 30 */}
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M3 8 L21 8 L19 20 L5 20 Z" />
        <path d="M3 8 Q12 4 21 8" />
        <text x="12" y="16" fontSize="7" fill="currentColor" textAnchor="middle" stroke="none">30</text>
      </svg>
      {/* No bleach */}
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M4 4 L20 4 L12 20 Z" />
        <line x1="4" y1="4" x2="20" y2="20" />
      </svg>
      {/* Iron low */}
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M3 16 L21 16 L19 10 L5 10 Z" />
        <circle cx="12" cy="14" r="0.8" fill="currentColor" />
      </svg>
      {/* Dry */}
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
      </svg>
    </div>
  );
}

// Crosshair / target
export function Crosshair({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" className={className}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
      <line x1="12" y1="0" x2="12" y2="6" />
      <line x1="12" y1="18" x2="12" y2="24" />
      <line x1="0" y1="12" x2="6" y2="12" />
      <line x1="18" y1="12" x2="24" y2="12" />
    </svg>
  );
}

// Corner brackets (рамка из уголков)
export function CornerBrackets({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <div className="absolute top-0 left-0 w-3 h-3 border-l border-t border-current" />
      <div className="absolute top-0 right-0 w-3 h-3 border-r border-t border-current" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-l border-b border-current" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-current" />
    </div>
  );
}

// Stamp (печать "AUTHENTIC")
export function Stamp({ text = "AUTHENTIC", className = "" }: { text?: string; className?: string }) {
  return (
    <div className={`inline-flex items-center justify-center relative ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0">
        <defs>
          <path id="circle" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
        </defs>
        <text fontSize="11" fill="currentColor" letterSpacing="2" fontFamily="var(--font-mono)">
          <textPath href="#circle" startOffset="0">
            {`✦ ${text} · VSS · ORIGINAL · `}
          </textPath>
        </text>
      </svg>
      <div className="w-1.5 h-1.5 rounded-full bg-current" />
    </div>
  );
}

// Animated stamp rotating
export function RotatingStamp({ text = "AUTHENTIC · VSS · ORIGINAL · ", className = "" }: { text?: string; className?: string }) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className={`relative ${className}`}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <path id={`circle-${text}`} d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
        </defs>
        <text fontSize="9" fill="currentColor" letterSpacing="3" fontFamily="var(--font-mono)">
          <textPath href={`#circle-${text}`} startOffset="0">
            {text.repeat(3)}
          </textPath>
        </text>
      </svg>
    </motion.div>
  );
}

// Care label / wash tag
export function WashLabel({ className = "" }: { className?: string }) {
  return (
    <div className={`inline-block bg-vss-graphite border border-vss-smoke p-3 max-w-[180px] ${className}`}>
      <div className="text-[8px] font-mono tracking-widest text-vss-mist mb-2">
        VSS / CARE INSTRUCTIONS
      </div>
      <CareSymbols className="text-vss-bone mb-2" />
      <div className="text-[7px] font-mono leading-tight text-vss-fog">
        100% COTTON · MADE IN UA<br />
        DO NOT TUMBLE DRY<br />
        IRON ON LOW HEAT
      </div>
    </div>
  );
}

// Price tag (как на одежде)
export function PriceTag({ price, className = "" }: { price: string; className?: string }) {
  return (
    <div className={`relative inline-block ${className}`}>
      {/* String hole */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-vss-fog" />
      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full border border-vss-fog bg-vss-void" />
      <div className="bg-vss-void border border-vss-paper px-4 py-3 relative">
        <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-vss-paper" />
        <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-vss-paper" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-vss-paper" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-vss-paper" />
        <div className="text-[8px] font-mono tracking-widest text-vss-mist">VSS · 24</div>
        <div className="text-vss-paper font-mono font-bold text-lg">{price}</div>
        <div className="text-[8px] font-mono tracking-widest text-vss-mist mt-0.5">UAH</div>
      </div>
    </div>
  );
}

// Size grid mini
export function SizeGridMini({ className = "" }: { className?: string }) {
  return (
    <div className={`flex gap-px ${className}`}>
      {["XS", "S", "M", "L", "XL"].map((s, i) => (
        <div
          key={s}
          className={`w-6 h-6 border border-vss-smoke flex items-center justify-center text-[9px] font-mono ${
            i === 2 ? "bg-vss-paper text-vss-void" : "text-vss-mist"
          }`}
        >
          {s}
        </div>
      ))}
    </div>
  );
}

// Spec line (тех. характеристика)
export function SpecLine({ label, value, className = "" }: { label: string; value: string; className?: string }) {
  return (
    <div className={`flex items-baseline gap-2 ${className}`}>
      <span className="text-[9px] font-mono tracking-widest text-vss-fog uppercase">{label}</span>
      <div className="flex-1 border-b border-dashed border-vss-smoke" />
      <span className="text-[10px] font-mono text-vss-bone">{value}</span>
    </div>
  );
}

// Plus marker
export function PlusMarker({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-4 h-4 ${className}`}>
      <div className="absolute top-1/2 left-0 right-0 h-px bg-current -translate-y-1/2" />
      <div className="absolute top-0 bottom-0 left-1/2 w-px bg-current -translate-x-1/2" />
    </div>
  );
}

// Asterisk decorative
export function Asterisk({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="currentColor">
      <path d="M10 0 L11 8 L19 5 L13 11 L19 15 L11 12 L10 20 L9 12 L1 15 L7 11 L1 5 L9 8 Z" />
    </svg>
  );
}

// Coords / GPS
export function CoordsBlock({ className = "" }: { className?: string }) {
  return (
    <div className={`text-[9px] font-mono tracking-widest text-vss-fog ${className}`}>
      <div className="flex items-center gap-2 mb-1">
        <Crosshair size={10} />
        <span>49.9935° N</span>
      </div>
      <div className="flex items-center gap-2">
        <Crosshair size={10} />
        <span>36.2304° E</span>
      </div>
      <div className="mt-1 text-vss-fog/60">KHARKIV / UA</div>
    </div>
  );
}

// Tech grid pattern
export function TechGrid({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }}
    />
  );
}

// Marquee divider
export function MarqueeDivider({ text = "VSS" }: { text?: string }) {
  return (
    <div className="flex items-center gap-3 text-vss-fog/40">
      <div className="flex-1 h-px bg-current" />
      <Asterisk className="w-3 h-3" />
      <span className="text-[9px] font-mono tracking-widest">{text}</span>
      <Asterisk className="w-3 h-3" />
      <div className="flex-1 h-px bg-current" />
    </div>
  );
}