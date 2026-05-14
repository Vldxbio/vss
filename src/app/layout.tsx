import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { LocaleProvider } from "@/lib/i18n/LocaleProvider";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vss.ua"),
  title: {
    default: "VSS — Vision. Style. Status.",
    template: "%s — VSS",
  },
  description: "VSS — український streetwear бренд з Харкова. Лімітовані дропи, преміум матеріали, all-black естетика. Худі, футболки, джинси, шорти, шкарпетки.",
  keywords: ["VSS", "streetwear", "Україна", "Харків", "одяг", "худі", "футболки", "джинси", "шорти", "дроп", "all black", "nothing"],
  authors: [{ name: "VSS" }],
  creator: "VSS",
  publisher: "VSS",
  openGraph: {
    title: "VSS — Vision. Style. Status.",
    description: "Український streetwear бренд. Лімітовані дропи. All-black естетика.",
    url: "https://vss.ua",
    siteName: "VSS",
    type: "website",
    locale: "uk_UA",
    images: [
      {
        url: "/images/brand/og-image.png",
        width: 1200,
        height: 630,
        alt: "VSS — Vision. Style. Status.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VSS — Vision. Style. Status.",
    description: "Український streetwear бренд. Лімітовані дропи.",
    images: ["/images/brand/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="grain">
        <LocaleProvider>
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}