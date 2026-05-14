import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { NewDrop } from "@/components/home/NewDrop";
import { SectionDivider, DoubleMarquee, StatsBlock } from "@/components/home/Atmosphere";
import { CategoriesGrid } from "@/components/home/CategoriesGrid";
import { BrandStory } from "@/components/home/BrandStory";
import { WhyVSS } from "@/components/home/WhyVSS";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <SectionDivider text="NOTHING DROP" number="001" />
      <NewDrop />
      <DoubleMarquee />
      <CategoriesGrid />
      <BrandStory />
      <StatsBlock />
      <WhyVSS />
    </>
  );
}