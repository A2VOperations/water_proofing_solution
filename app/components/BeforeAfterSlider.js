"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export default function BeforeAfterSlider() {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);

  const handleMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches
      ? e.touches[0].clientX - rect.left
      : e.clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(position);
  };

  return (
    <section className="pt-10 bg-white overflow-hidden">
      <div className="w-full mx-auto">
        <div className="text-center">
          <p className="text-[#0088ff] text-sm font-bold tracking-[0.3em] uppercase mb-4">
            VISIBLE RESULTS
          </p>
          <h2 className="text-[36px] md:text-[64px] font-black text-[#111] uppercase leading-tight tracking-tight">
            THE TRANSFORMATION
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto mt-6 font-medium">
            From structural decay to engineering-grade protection. Slide to see
            how we restore and seal compromised surfaces.
          </p>
        </div>

        {/* Macro Beading Shot with CTA */}
        <div className="mt-24 relative overflow-hidden bg-[#031b33] text-white">
          <div className="grid md:grid-cols-2 items-stretch md:min-h-[650px]">
            <div className="p-12 lg:p-20 relative z-10">
              <span className="bg-[#0088ff] text-white px-4 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 inline-block">
                THE LOTUS EFFECT
              </span>
              <h2 className="text-[32px] md:text-[48px] font-black uppercase leading-tight tracking-tight mb-6">
                WATER BEADING TECHNOLOGY
              </h2>
              <p className="text-gray-300 text-lg mb-10 leading-relaxed">
                <span className="text-[#0088ff]">
                  Are you tired of seeing your expensive paint peel off or white
                  salty powder ruining your walls every rainy season?
                </span>
                At RAS Care, we give your home a complete recovery using our
                special Water-Beading Technology.
              </p>
              <button
                onClick={() => (window.location.href = "/contact")}
                className="bg-white text-[#031b33] px-8 py-5 md:mt-10 rounded-lg font-bold uppercase tracking-widest text-sm hover:bg-[#0088ff] hover:text-white transition-all shadow-xl"
              >
                Book Transformation
              </button>
            </div>
            <div className="relative h-full">
              <div
                ref={containerRef}
                className="relative w-full h-full min-h-[400px] md:min-h-full overflow-hidden shadow-2xl cursor-ew-resize group"
                onMouseMove={handleMove}
                onTouchMove={handleMove}
              >
                {/* Left Edge Soft Blur/Fade Overlay */}
                <div className="absolute top-0 bottom-0 left-0 w-20 bg-gradient-to-r from-[#031b33] via-[#031b33]/40 to-transparent z-30 pointer-events-none hidden md:block backdrop-blur-[1px]" />

                {/* Before Image */}
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src="/assets/industry/before.png"
                    alt="Before Waterproofing"
                    width={1300}
                    height={900}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-8 left-120 bg-black/60 backdrop-blur-md text-white px-6 py-2 rounded-full text-sm font-bold tracking-widest uppercase">
                    BEFORE: COMPROMISED
                  </div>
                </div>

                {/* After Image (Clipped) */}
                <div
                  className="absolute inset-0 w-full h-full z-10"
                  style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                >
                  <Image
                    src="/assets/industry/after.png"
                    alt="After Waterproofing"
                    className="w-full h-full object-cover grayscale-0"
                    width={1300}
                    height={900}
                    style={{ filter: "brightness(1.1) contrast(1.05)" }}
                  />
                  <div className="absolute top-8 right-120 bg-[#0088ff] text-white px-6 py-2 rounded-full text-sm font-bold tracking-widest uppercase">
                    AFTER: PROTECTED
                  </div>
                </div>

                {/* Slider Line */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white z-20 shadow-[0_0_15px_rgba(0,0,0,0.3)]"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#0088ff"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 8L22 12L18 16M6 8L2 12L6 16" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
