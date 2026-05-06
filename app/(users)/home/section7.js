"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";

const section7 = ({ speed = 8000 }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const marqueeItems = [
    { img: "/home/Dr.-Fix-It-logo.png" },
    { img: "/home/fosroc-logo.png" },
    { img: "/home/asian-logo.jpg" },
    { img: "/home/Basf-logo.png" },
    { img: "/home/berger-paints-logo.png" },
    { img: "/home/sika-logo.png" },
    { img: "/home/ac-tech-logo.jpg" },
    { img: "/home/awc-logo.webp" },
    { img: "/home/chembond-logo.png" },
    { img: "/home/buildcare-logo.png" },
  ];

  // We repeat the items to ensure smooth infinite scrolling
  const items = [...marqueeItems, ...marqueeItems];

  if (!mounted) return <div className="h-[150px] bg-white border-y border-gray-100" />;

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
            <div className="flex items-center">
              <Image
                src={item.img}
                alt="infinite-img"
                width={80}
                height={80}
                className="object-contain opacity-80 mx-8 md:mx-14"
              />
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

export default section7;
