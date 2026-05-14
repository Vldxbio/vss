"use client";

export function BigMarquee() {
  return (
    <section className="py-12 md:py-16 bg-vss-void overflow-hidden border-y border-vss-smoke">
      <div className="flex whitespace-nowrap animate-marquee">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center shrink-0">
            <span className="text-display text-7xl md:text-9xl font-bold tracking-tightest text-vss-paper px-8">
              VSS
            </span>
            <span className="text-vss-fog text-5xl md:text-7xl mx-4">✦</span>
            <span className="text-display text-7xl md:text-9xl font-bold tracking-tightest text-stroke px-8">
              NOTHING
            </span>
            <span className="text-vss-fog text-5xl md:text-7xl mx-4">✦</span>
            <span className="text-display text-7xl md:text-9xl font-bold tracking-tightest text-vss-paper px-8">
              SHADOW
            </span>
            <span className="text-vss-fog text-5xl md:text-7xl mx-4">✦</span>
            <span className="text-display text-7xl md:text-9xl font-bold tracking-tightest text-stroke px-8">
              ALL BLACK
            </span>
            <span className="text-vss-fog text-5xl md:text-7xl mx-4">✦</span>
          </div>
        ))}
      </div>
    </section>
  );
}