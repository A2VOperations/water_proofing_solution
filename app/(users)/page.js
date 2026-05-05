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

export default function Home() {
  return (
    <>
      <Hero />
      <IsHeroProduct
        title="Our Featured Solutions"
        subtitle="Handpicked premium waterproofing systems for maximum protection."
      />
      <Section2 />  
      <InfiniteMarquee />
      <ProductCards solution="RESIDENTIAL SOLUTIONS" />
      <ProductCards solution="COMMERCIAL SOLUTIONS" />
      <ProductCards solution="INDUSTRIAL SOLUTIONS" />
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
