"use client";

import Image from "next/image";

export default function TrustBadges() {
  const LOGOS = [
    { name: "Dr. Fixit", color: "#eab308", img: "/home/Dr.-Fix-It-logo.png" },
    { name: "Fosroc", color: "#2563eb", img: "/home/fosroc-logo.png" },
    { name: "Asian Paints", color: "#dc2626", img: "/home/kisspng-logo.webp" },
    { name: "BASF", color: "#1d4ed8", img: "/home/Basf-logo.png" },
    { name: "Berger", color: "#9333ea", img: "/home/berger-paints-logo.png" },
    { name: "Sika", color: "#ea580c", img: "/home/sika-logo.png" },
    { name: "Ac Tech", color: "#050e37", img: "/home/ac-tech-logo.jpg" },
    { name: "AWC", color: "#050e37", img: "/home/awc-logo.webp" },
    { name: "Chembond", color: "#050e37", img: "/home/chembond-logo.png" },
    { name: "Buildcare", color: "#050e37", img: "/home/buildcare-logo.png" },
  ];

  return (
    <section className=" bg-white">
      <div className=" mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 border-y border-gray-100 py-16">


          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 justify-center gap-4 items-center justify-items-center">
            {LOGOS.map((logo) => (
              <div
                key={logo.name}
                className="flex flex-col items-center gap-2"
              >
                <Image
                  src={logo.img}
                  alt={logo.name}
                  width={100}
                  height={100}
                  className="object-contain"
                  unoptimized
                />
                <span className="text-[14px] font-bold uppercase tracking-widest text-gray-400">
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
