"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";

const InfiniteMarquee = ({ speed = 8000 }) => {
  const items = [
    "Dampness Audit™", 
    "Thermal Imaging", 
    "Liquid Membrane", 
    "Crystal-Shield", 
    "Basement Waterproofing", 
    "Terrace Specialist",
    "10 Year Warranty"
  ];

  return (
    <div className="relative w-full bg-white py-8 md:py-12 border-y border-gray-100 select-none overflow-hidden">
      <Swiper
        loop={true}
        speed={speed}
        spaceBetween={0}
        slidesPerView="auto"
        freeMode={true}
        allowTouchMove={false}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, FreeMode]}
        className="marquee-swiper"
      >
        {items.map((item, i) => (
          <SwiperSlide key={i} style={{ width: "auto" }}>
            <div className="flex items-center px-4 md:px-8">
              <span
                className="text-5xl md:text-8xl font-bold uppercase tracking-tighter"
                style={{
                  WebkitTextStroke: "1px black",
                  textStroke: "1px black",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                }}
              >
                {item}
              </span>
              <div className="mx-6 md:mx-10">
                <Image
                  src="/66fbdb1bef45fc7aef87e5f0_marquee-star.png"
                  alt="Star"
                  width={80}
                  height={80}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .marquee-swiper .swiper-wrapper {
          transition-timing-function: linear !important;
        }
      `}</style>
    </div>
  );
};

export default InfiniteMarquee;
