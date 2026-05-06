"use client";

import Hero from "./home/hero";
import Section2 from "./home/section2";
import Section3 from "./home/section3";
import Services from "./home/services";
import Section5 from "./home/section5";
import Section6 from "./home/section6";
import Section7 from "./home/section7";
import IsHeroProduct from "@/app/components/isHeroProduct";
import ProductCards from "../components/productCards";
import BlogSection from "./home/section8";
import InfiniteMarquee from "../components/InfiniteMarquee";
import BeforeAfterSlider from "../components/BeforeAfterSlider";
import TechnicalProof from "../components/TechnicalProof";
import TrustBadges from "../components/TrustBadges";

export default function Home() {
  return (
    <>
      <Hero />
      <BeforeAfterSlider />
      <TrustBadges />
      <IsHeroProduct
        title="Engineering-Grade Solutions"
        subtitle="Technical waterproofing systems designed for maximum structural longevity."
      />
      <Section2 />  
      <TechnicalProof />
      <InfiniteMarquee />
      <ProductCards solution="RESIDENTIAL SOLUTIONS" />
      <ProductCards solution="SPECIALIZED SOLUTIONS" />
      <ProductCards solution="TECHNICAL SOLUTIONS" />
      <ProductCards solution="PREMIUM FINISHES" />
      <Services />
      <Section5 />
      <Section6 />
      <Section3 />
      <Section7 />
      <BlogSection />
    </>
  );
}
