"use client";

import Hero from "./home/hero";
import Section2 from "./home/section2";
import Section3 from "@/app/components/Testimonials";
import Services from "./home/services";
import Section5 from "./home/section5";
import Section7 from "./home/section7";
import IsHeroProduct from "@/app/components/isHeroProduct";
import ProductCards from "../components/productCards";
import BlogSection from "./home/section8";
import InfiniteMarquee from "../components/InfiniteMarquee";
import BeforeAfterSlider from "../components/BeforeAfterSlider";
import TechnicalProof from "../components/TechnicalProof";
import TrustBadges from "../components/TrustBadges";
import Youtube from "../components/Youtube";

export default function Home() {
  return (
    <>
      <Hero />
      <IsHeroProduct
        title="Hero Solutions"
        subtitle="Technical waterproofing systems designed for maximum structural longevity."
      />
      <BeforeAfterSlider />
      <TrustBadges />
      <Section2 />

      <InfiniteMarquee />
      <ProductCards solution="RESIDENTIAL SOLUTIONS" />
      <ProductCards solution="SPECIALIZED SOLUTIONS" />
      <TechnicalProof />
      <ProductCards solution="TECHNICAL SOLUTIONS" />
      <ProductCards solution="PREMIUM FINISHES" />
      <Services />
      <Section5 />

      <Section7 />
      <Section3 />
      
      <BlogSection />
      <Youtube />
    </>
  );
}
