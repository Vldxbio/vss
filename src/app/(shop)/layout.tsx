import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { PageTransition } from "@/components/ui/PageTransition";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main>
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}