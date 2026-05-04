"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";

const section7 = ({ speed = 8000 }) => {
  const marqueeItems = [
    { img: "/home/infinite-1.png" },
    { img: "/home/infinite-2.png" },
    { img: "/home/infinite-3.png" },
    { img: "/home/infinite-4.png" },
    { img: "/home/infinite-5.png" },
    { img: "/home/infinite-6.png" },
    { img: "/home/infinite-7.png" },
    { img: "/home/infinite-8.png" },
  ];

  // We repeat the items to ensure smooth infinite scrolling
  const items = [...marqueeItems, ...marqueeItems];

  return (
    <div className="relative w-full bg-white py-12 md:py-5 border-y border-gray-100 select-none overflow-hidden">
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
                  width={150}
                  height={150}
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
