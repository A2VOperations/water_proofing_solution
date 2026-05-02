"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const ROW_1_IMAGES = [
  "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1541888087854-4712850a9dcc?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1534398079543-7ae6d016b86a?auto=format&fit=crop&w=800&q=80"
];

const ROW_2_IMAGES = [
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1541888087854-4712850a9dcc?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1534398079543-7ae6d016b86a?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80"
];

const STACK_IMAGES = [
  "https://images.unsplash.com/photo-1541888087854-4712850a9dcc?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80"
];

export default function Work() {
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const stackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Dual Carousel Logic
      if (row1Ref.current && row2Ref.current) {
        row1Ref.current.style.transform = `translateX(calc(-100px - ${scrollY * 0.45}px))`;
        row2Ref.current.style.transform = `translateX(calc(-1500px + ${scrollY * 0.45}px))`;
      }

      // Card Stash Logic
      if (stackRef.current) {
        const rect = stackRef.current.getBoundingClientRect();
        const scrollableDistance = rect.height - window.innerHeight;
        
        if (scrollableDistance > 0) {
          const scrolled = -rect.top;
          if (scrolled >= 0 && scrolled <= scrollableDistance) {
            const progress = scrolled / scrollableDistance;
            // Determine active index based on progress
            const index = Math.min(STACK_IMAGES.length - 1, Math.floor(progress * STACK_IMAGES.length));
            setActiveIndex(index);
          } else if (scrolled > scrollableDistance) {
            setActiveIndex(STACK_IMAGES.length - 1);
          } else if (scrolled < 0) {
            setActiveIndex(0);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); 
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-white font-sans text-gray-900 pt-32 pb-24">
      
      {/* ── HEADER ── */}
      <section className="max-w-4xl mx-auto px-6 text-center mb-16 mt-10">
        <p className="text-[#0088ff] text-sm font-bold tracking-widest uppercase mb-4">
          OUR PORTFOLIO
        </p>
        <h1 className="text-[40px] md:text-[64px] font-black uppercase tracking-tight leading-[1.05] mb-6 text-[#111]">
          DISCOVER OUR<br/>RECENT PROJECTS.
        </h1>
        <p className="text-gray-600 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-10">
          Explore the quality and craftsmanship we bring to every job. Scroll down to view the magic in action.
        </p>
      </section>

      {/* ── DUAL CAROUSEL SECTION ── */}
      <section className="relative w-full py-10 flex flex-col gap-4 sm:gap-6 bg-[#f9f9f9] border-y border-gray-100 overflow-hidden">
        
        {/* Top Row - Moves Left */}
        <div className="w-full">
          <div 
            ref={row1Ref} 
            className="flex gap-4 sm:gap-6 w-max will-change-transform"
          >
            {[...ROW_1_IMAGES, ...ROW_1_IMAGES, ...ROW_1_IMAGES].map((src, i) => (
              <div key={i} className="relative w-[240px] sm:w-[320px] md:w-[420px] aspect-[4/3] rounded-2xl overflow-hidden shrink-0 shadow-sm border border-gray-200 bg-white">
                <Image src={src} alt={`Project ${i}`} fill className="object-cover" priority={i === 0} />
              </div>
            ))}
          </div>
        </div>

        {/* Center Badge Overlapping */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
          <div className="bg-[#0088ff] text-white w-[140px] h-[140px] sm:w-[200px] sm:h-[200px] rounded-full flex flex-col items-center justify-center text-center p-4 shadow-2xl border-[6px] border-white">
            <span className="font-bold text-xs sm:text-[17px] leading-tight tracking-wide">
              Showcasing our<br/>recent projects
            </span>
          </div>
        </div>

        {/* Bottom Row - Moves Right */}
        <div className="w-full">
          <div 
            ref={row2Ref} 
            className="flex gap-4 sm:gap-6 w-max will-change-transform"
          >
            {[...ROW_2_IMAGES, ...ROW_2_IMAGES, ...ROW_2_IMAGES].map((src, i) => (
              <div key={i} className="relative w-[240px] sm:w-[320px] md:w-[420px] aspect-[4/3] rounded-2xl overflow-hidden shrink-0 shadow-sm border border-gray-200 bg-white">
                <Image src={src} alt={`Project ${i}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STICKY CARD STASH SECTION ── */}
      <section ref={stackRef} className="relative w-full h-[400vh]">
        {/* Sticky Container */}
        <div className="sticky top-0 h-screen w-full flex items-center bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center w-full">
            
            {/* Left Content */}
            <div className="flex flex-col gap-6 relative z-10">
              <div className="border border-gray-300 rounded-full px-4 py-1.5 w-fit text-xs font-bold tracking-widest text-[#0088ff] mb-2 uppercase">
                WHY CHOOSE US
              </div>
              <h2 className="text-4xl md:text-5xl font-black uppercase text-[#111] leading-tight">
                EXCELLENCE IN EVERY DETAIL
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Our commitment to quality extends beyond the visible surfaces. We pride ourselves on using industry-leading materials and techniques to ensure your projects stand the test of time.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2 border-l-4 border-[#0088ff] pl-4">
                  <h3 className="text-3xl font-black text-[#111]">150+</h3>
                  <p className="text-gray-500 font-medium">Projects Completed</p>
                </div>
                <div className="flex flex-col gap-2 border-l-4 border-[#0088ff] pl-4">
                  <h3 className="text-3xl font-black text-[#111]">100%</h3>
                  <p className="text-gray-500 font-medium">Client Satisfaction</p>
                </div>
              </div>
            </div>
            
            {/* Right Stack of Cards */}
            <div className="relative w-full aspect-[4/3] md:aspect-auto md:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl bg-gray-100 border border-gray-200">
              {STACK_IMAGES.map((img, i) => (
                <div 
                  key={i} 
                  className="absolute inset-0 transition-all duration-700 ease-out origin-bottom"
                  style={{
                    transform: activeIndex >= i ? 'translateY(0) scale(1)' : 'translateY(100%) scale(0.95)',
                    opacity: activeIndex >= i ? 1 : 0,
                    zIndex: i
                  }}
                >
                  <Image src={img} alt={`Excellence ${i}`} fill className="object-cover" priority={i === 0} sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}