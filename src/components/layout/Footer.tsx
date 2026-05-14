"use client";

import Link from "next/link";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { Asterisk, MarqueeDivider } from "@/components/ui/Decorations";

export function Footer() {
  const { t, locale } = useLocale();

  return (
    <footer className="bg-vss-void border-t border-vss-smoke mt-20">
      <div className="container-vss py-16 md:py-20">
        {/* Big VSS bg */}
        <div className="mb-12">
          <h2 className="text-display text-[20vw] md:text-[16vw] leading-none font-bold tracking-tightest text-vss-paper/5 select-none">
            VSS
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div>
            <h4 className="text-[11px] tracking-widest uppercase text-vss-paper mb-4 font-mono font-bold flex items-center gap-2">
              <Asterisk className="w-2.5 h-2.5" />
              {t.footer.about}
            </h4>
            <ul className="space-y-2.5">
              <li><Link href="/about" className="text-sm text-vss-bone hover:text-vss-paper transition-colors">{t.nav.about}</Link></li>
              <li><Link href="/catalog" className="text-sm text-vss-bone hover:text-vss-paper transition-colors">{t.nav.catalog}</Link></li>
              <li><Link href="/catalog?drop=nothing" className="text-sm text-vss-bone hover:text-vss-paper transition-colors">NOTHING DROP</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] tracking-widest uppercase text-vss-paper mb-4 font-mono font-bold flex items-center gap-2">
              <Asterisk className="w-2.5 h-2.5" />
              {t.footer.help}
            </h4>
            <ul className="space-y-2.5">
              <li><Link href="/delivery" className="text-sm text-vss-bone hover:text-vss-paper transition-colors">{t.nav.delivery}</Link></li>
              <li><Link href="/faq" className="text-sm text-vss-bone hover:text-vss-paper transition-colors">FAQ</Link></li>
              <li><Link href="/account" className="text-sm text-vss-bone hover:text-vss-paper transition-colors">{t.nav.account}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] tracking-widest uppercase text-vss-paper mb-4 font-mono font-bold flex items-center gap-2">
              <Asterisk className="w-2.5 h-2.5" />
              {t.footer.contact}
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="https://t.me/vss_kh" target="_blank" rel="noreferrer" className="text-sm text-vss-bone hover:text-vss-paper transition-colors">
                  Telegram →
                </a>
              </li>
              <li>
                <a href="mailto:hello@vss.ua" className="text-sm text-vss-bone hover:text-vss-paper transition-colors">
                  hello@vss.ua
                </a>
              </li>
              <li className="text-sm text-vss-mist">
                {locale === "uk" ? "Харків, Україна" : "Харьков, Украина"}
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] tracking-widest uppercase text-vss-paper mb-4 font-mono font-bold flex items-center gap-2">
              <Asterisk className="w-2.5 h-2.5" />
              {locale === "uk" ? "ГРАФІК" : "ГРАФИК"}
            </h4>
            <div className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <span className="text-vss-bone">{locale === "uk" ? "ПН" : "ПН"}</span>
                <span className="text-vss-paper font-mono">11:00–18:00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-vss-bone">{locale === "uk" ? "ВТ" : "ВТ"}</span>
                <span className="text-vss-paper font-mono">11:00–18:00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-vss-fog line-through">{locale === "uk" ? "СР" : "СР"}</span>
                <span className="text-vss-fog font-mono line-through">—</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-vss-bone">{locale === "uk" ? "ЧТ" : "ЧТ"}</span>
                <span className="text-vss-paper font-mono">11:00–18:00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-vss-bone">{locale === "uk" ? "ПТ" : "ПТ"}</span>
                <span className="text-vss-paper font-mono">11:00–18:00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-vss-fog line-through">{locale === "uk" ? "СБ" : "СБ"}</span>
                <span className="text-vss-fog font-mono line-through">—</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-vss-fog line-through">{locale === "uk" ? "НД" : "ВС"}</span>
                <span className="text-vss-fog font-mono line-through">—</span>
              </div>
            </div>
          </div>
        </div>

        <MarqueeDivider text="VSS · NOTHING · 001" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pt-8 gap-4">
          <p className="text-[10px] tracking-widest uppercase text-vss-fog font-mono">
            © {new Date().getFullYear()} VSS — {t.footer.rights}
          </p>
          <p className="text-[10px] tracking-widest uppercase text-vss-fog font-mono">
            {t.footer.crafted} 🇺🇦
          </p>
        </div>
      </div>
    </footer>
  );
}