"use client";

import { Marquee } from "@/components/ui/Marquee";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { Asterisk } from "@/components/ui/Decorations";

export function AnnouncementBar() {
  const { t } = useLocale();

  return (
    <div className="border-b border-vss-smoke bg-vss-void">
      <Marquee speed="slow" className="py-2.5">
        {t.announcement.map((msg, i) => (
          <span
            key={i}
            className="inline-flex items-center mx-6 text-[10px] tracking-[0.3em] text-vss-paper font-mono font-bold"
          >
            <Asterisk className="w-2.5 h-2.5 text-vss-paper mr-2" />
            {msg}
          </span>
        ))}
      </Marquee>
    </div>
  );
}