import { Asterisk } from "@/components/ui/Decorations";

export default function CatalogLoading() {
  return (
    <div className="bg-vss-obsidian min-h-screen relative">
      <div className="container-vss py-10 md:py-14">
        <div className="flex items-center gap-3 mb-8">
          <span className="h-px w-8 bg-vss-paper animate-pulse" />
          <Asterisk className="w-3 h-3 text-vss-paper animate-pulse" />
          <span className="text-[10px] tracking-[0.4em] text-vss-paper font-mono font-bold uppercase">
            LOADING...
          </span>
        </div>

        <div className="h-16 w-2/3 bg-vss-graphite animate-pulse mb-10" />

        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          <div className="hidden lg:block space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-32 bg-vss-graphite animate-pulse" />
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 md:gap-x-6 gap-y-12">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i}>
                <div className="aspect-[3/4] bg-vss-graphite animate-pulse mb-3" />
                <div className="h-3 w-1/3 bg-vss-graphite animate-pulse mb-2" />
                <div className="h-4 w-2/3 bg-vss-graphite animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}